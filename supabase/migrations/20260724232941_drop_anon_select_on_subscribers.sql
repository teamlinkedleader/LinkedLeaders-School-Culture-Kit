/*
# Remove public read access to the subscribers table

## Problem
The initial migration created this policy:

    CREATE POLICY "anon_select_subscribers"
    ON subscribers FOR SELECT
    TO anon, authenticated
    USING (true);

The Supabase anon key is embedded in the client bundle by design, so this policy let
anyone who loaded the site read every row and every column of `subscribers` — each
subscriber's email, name, role, and school name. The original intent was to allow an
"is this email already subscribed?" check, and the comment on that migration noted that
only the email field was meant to be readable, but the policy granted the whole table.

## Why dropping it is safe
The application never issues a SELECT against `subscribers`. Its only database call is
the INSERT in `src/components/SubscribeModal.tsx`. Duplicate emails are already handled
correctly there by catching Postgres error `23505` (unique_violation) on that INSERT,
which the existing UNIQUE constraint on `subscribers.email` raises. No read is required
for that flow, so removing this policy costs no functionality.

## Result
- SELECT: no policy. With RLS enabled, anon and authenticated clients can read nothing.
- INSERT: unchanged. Anyone can still subscribe.
- UPDATE / DELETE: unchanged. Still no policies, so still disallowed via the anon key.

Reads for admin purposes should go through the service-role key server-side, or a
SECURITY DEFINER function that returns only what the caller needs, never a table-wide
policy on the anon role.
*/

DROP POLICY IF EXISTS "anon_select_subscribers" ON subscribers;
