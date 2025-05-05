/*
  # Create booking and payment related tables

  1. New Tables
    - `bookings`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references profiles)
      - `activity` (text)
      - `date` (timestamp with time zone)
      - `status` (text)
      - `created_at` (timestamp with time zone)
    
    - `payment_transactions`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references profiles)
      - `amount` (numeric)
      - `currency` (text)
      - `status` (text)
      - `payment_method` (text)
      - `description` (text)
      - `metadata` (jsonb)
      - `created_at` (timestamp with time zone)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Create bookings table if it doesn't exist
DO $$ BEGIN
  CREATE TABLE IF NOT EXISTS bookings (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid REFERENCES profiles(id),
    activity text NOT NULL,
    date timestamptz NOT NULL,
    status text DEFAULT 'pending',
    created_at timestamptz DEFAULT now()
  );
EXCEPTION
  WHEN duplicate_table THEN NULL;
END $$;

-- Create payment_transactions table if it doesn't exist
DO $$ BEGIN
  CREATE TABLE IF NOT EXISTS payment_transactions (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid REFERENCES profiles(id),
    amount numeric NOT NULL,
    currency text DEFAULT 'EUR',
    status text DEFAULT 'pending',
    payment_method text,
    description text,
    metadata jsonb DEFAULT '{}',
    created_at timestamptz DEFAULT now()
  );
EXCEPTION
  WHEN duplicate_table THEN NULL;
END $$;

-- Enable RLS if not already enabled
DO $$ BEGIN
  ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  ALTER TABLE payment_transactions ENABLE ROW LEVEL SECURITY;
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;

-- Drop existing policies if they exist and create new ones
DO $$ BEGIN
  DROP POLICY IF EXISTS "Users can read own bookings" ON bookings;
  DROP POLICY IF EXISTS "Users can create own bookings" ON bookings;
  DROP POLICY IF EXISTS "Users can read own transactions" ON payment_transactions;
  DROP POLICY IF EXISTS "Users can create own transactions" ON payment_transactions;
  
  CREATE POLICY "Users can read own bookings"
    ON bookings
    FOR SELECT
    TO authenticated
    USING (auth.uid() = user_id);

  CREATE POLICY "Users can create own bookings"
    ON bookings
    FOR INSERT
    TO authenticated
    WITH CHECK (auth.uid() = user_id);

  CREATE POLICY "Users can read own transactions"
    ON payment_transactions
    FOR SELECT
    TO authenticated
    USING (auth.uid() = user_id);

  CREATE POLICY "Users can create own transactions"
    ON payment_transactions
    FOR INSERT
    TO authenticated
    WITH CHECK (auth.uid() = user_id);
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;