/*
# Create subscribers table for the 52 Culture Activities lead magnet

## Purpose
Stores email subscriptions for the "Build the School People Are Proud to Belong To" lead magnet.
Each subscriber receives one culture-building activity per week for 52 weeks.

## New Tables
- `subscribers`
  - `id` (uuid, primary key)
  - `email` (text, unique, not null) — the subscriber's email address
  - `name` (text, not null) — the subscriber's name (used for personalization)
  - `role` (text, nullable) — their role (e.g., Principal, Teacher, Administrator)
  - `school_name` (text, nullable) — their school or district name
  - `unlocked` (boolean, default true) — whether they've unlocked the 52 activities
  - `current_week` (integer, default 1) — which weekly activity they're on (1-52)
  - `created_at` (timestamptz, default now()) — subscription timestamp

## Security
- RLS enabled on `subscribers`.
- This is a no-auth lead-magnet landing page, so the anon-key client must be able to
  insert new subscriptions and check if an email is already subscribed.
- SELECT: anyone (anon + authenticated) can check if an email exists (needed for
  "already subscribed" validation). Only the email field is needed publicly.
- INSERT: anyone can subscribe (insert their own email/name).
- UPDATE/DELETE: disabled — no one should modify or remove subscriptions via the
  anon key. Admin operations happen server-side.

## Important Notes
1. The `email` column has a UNIQUE constraint to prevent duplicate subscriptions.
2. `unlocked` defaults to true so that immediately after subscribing, the user
   sees all 52 activity cards unlocked on the page.
3. `current_week` tracks the weekly email drip campaign progress (1 through 52).
*/

CREATE TABLE IF NOT EXISTS subscribers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  name text NOT NULL,
  role text,
  school_name text,
  unlocked boolean NOT NULL DEFAULT true,
  current_week integer NOT NULL DEFAULT 1,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE subscribers ENABLE ROW LEVEL SECURITY;

-- Allow anyone to check if an email is already subscribed (SELECT)
DROP POLICY IF EXISTS "anon_select_subscribers" ON subscribers;
CREATE POLICY "anon_select_subscribers"
ON subscribers FOR SELECT
TO anon, authenticated
USING (true);

-- Allow anyone to subscribe (INSERT)
DROP POLICY IF EXISTS "anon_insert_subscribers" ON subscribers;
CREATE POLICY "anon_insert_subscribers"
ON subscribers FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- No UPDATE or DELETE policies: subscriptions cannot be modified or removed via the anon key
