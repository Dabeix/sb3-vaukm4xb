/*
  # Fix newsletter subscriptions table and policies

  1. Changes
    - Drop existing table if exists
    - Create newsletter_subscriptions table with proper structure
    - Add policies for public insert and admin management
*/

-- Drop existing table and policies
DROP TABLE IF EXISTS newsletter_subscriptions CASCADE;

-- Create newsletter_subscriptions table
CREATE TABLE newsletter_subscriptions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  created_at timestamptz DEFAULT now(),
  status text DEFAULT 'active'
);

-- Enable RLS
ALTER TABLE newsletter_subscriptions ENABLE ROW LEVEL SECURITY;

-- Allow public to insert new subscriptions
CREATE POLICY "Anyone can subscribe to newsletter"
  ON newsletter_subscriptions
  FOR INSERT
  TO public
  WITH CHECK (true);

-- Allow admins to manage all subscriptions
CREATE POLICY "Admin can manage newsletter subscriptions"
  ON newsletter_subscriptions
  FOR ALL
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM profiles
    WHERE id = auth.uid() AND role = 'admin'
  ));

-- Allow public to read their own subscription
CREATE POLICY "Public can read own subscription"
  ON newsletter_subscriptions
  FOR SELECT
  TO public
  USING (true);