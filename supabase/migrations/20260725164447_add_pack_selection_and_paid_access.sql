/*
# Three-pack selection and paid unlock

## What this supports
The lead magnet changes shape. A visitor now chooses one theme and gets a free
three-pack from it in exchange for their details. Full access to every activity
becomes a one-time paid unlock.

## Changes

### `pack_theme`
Which theme's three-pack the subscriber chose. Nullable, because rows created
before this migration have no pack, and because a subscriber who pays without
first claiming a pack is a legitimate path.

### `paid_at`
Null until the subscriber completes payment. Deliberately a timestamp rather
than a boolean: "when did they pay" answers "did they pay" and also supports
refunds, reconciliation and cohort analysis. A boolean answers one question and
throws away the rest.

### `unlocked` default changes from true to false
This is the important one. The column defaulted to `true`, so every new
subscriber was granted full access on insert. That was harmless while all
content was free. With a paid tier it would hand over the paid product to
anyone who filled in the form. Existing rows are left alone rather than being
retroactively locked, since those people signed up under the old terms.

### `has_full_access(text)`
Anon has no SELECT on `subscribers` and must not get one — a table-wide read is
exactly the hole closed in the previous migration. But the app still has to
answer "has this person paid?". This SECURITY DEFINER function answers only
that, for one email, returning a single boolean and never exposing a row.

## Security notes
- No new SELECT policy. The function is the only read path.
- The function is deliberately narrow: one argument, boolean out. It cannot be
  used to enumerate subscribers or read any other column.
- `paid_at` must only ever be written server-side, from a verified payment
  webhook. There is no anon UPDATE policy and there must not be one, or the
  paywall is decorative.
*/

ALTER TABLE subscribers ADD COLUMN IF NOT EXISTS pack_theme text;
ALTER TABLE subscribers ADD COLUMN IF NOT EXISTS paid_at timestamptz;

-- New signups start locked. Existing rows keep whatever they have.
ALTER TABLE subscribers ALTER COLUMN unlocked SET DEFAULT false;

-- Answers "has this email paid?" without exposing any subscriber data.
CREATE OR REPLACE FUNCTION has_full_access(check_email text)
RETURNS boolean
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
STABLE
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM subscribers
    WHERE email = lower(trim(check_email))
      AND (paid_at IS NOT NULL OR unlocked = true)
  );
$$;

REVOKE ALL ON FUNCTION has_full_access(text) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION has_full_access(text) TO anon, authenticated;

COMMENT ON FUNCTION has_full_access(text) IS
  'Returns whether an email has full access. The only read path into subscribers for the anon role; there is deliberately no SELECT policy on the table.';

COMMENT ON COLUMN subscribers.pack_theme IS
  'Theme of the free three-pack the subscriber claimed. Null if they never claimed one.';

COMMENT ON COLUMN subscribers.paid_at IS
  'When the one-time unlock was paid. Must only ever be set server-side from a verified payment webhook.';
