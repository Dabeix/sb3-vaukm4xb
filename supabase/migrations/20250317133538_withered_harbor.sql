/*
  # Add newsletter subscriptions table

  1. New Tables
    - `newsletter_subscriptions`
      - `id` (uuid, primary key)
      - `email` (text, unique)
      - `created_at` (timestamp)
      - `status` (text)

  2. Security
    - Enable RLS
    - Add policies for admin access
*/

-- Drop existing policy if it exists
DO $$ BEGIN
  DROP POLICY IF EXISTS "Admin can manage newsletter subscriptions" ON newsletter_subscriptions;
EXCEPTION
  WHEN undefined_table THEN NULL;
END $$;

-- Create or update the table
CREATE TABLE IF NOT EXISTS newsletter_subscriptions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  created_at timestamptz DEFAULT now(),
  status text DEFAULT 'active'
);

-- Enable RLS
ALTER TABLE newsletter_subscriptions ENABLE ROW LEVEL SECURITY;

-- Create the policy
CREATE POLICY "Admin can manage newsletter subscriptions"
  ON newsletter_subscriptions
  FOR ALL
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM profiles
    WHERE id = auth.uid() AND role = 'admin'
  ));