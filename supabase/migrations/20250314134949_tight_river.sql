/*
  # Add schedules table and policies

  1. New Tables
    - `schedules`
      - `id` (uuid, primary key)
      - `activity` (text)
      - `day` (text)
      - `time` (text)
      - `location` (text)
      - `capacity` (integer)
      - `created_at` (timestamp with time zone)

  2. Security
    - Enable RLS
    - Add policies for public read access
    - Add policies for admin management
*/

-- Create schedules table if it doesn't exist
DO $$ BEGIN
  CREATE TABLE IF NOT EXISTS schedules (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    activity text NOT NULL,
    day text NOT NULL,
    time text NOT NULL,
    location text NOT NULL,
    capacity integer DEFAULT 10,
    created_at timestamptz DEFAULT now()
  );
EXCEPTION
  WHEN duplicate_table THEN NULL;
END $$;

-- Enable RLS if not already enabled
DO $$ BEGIN
  ALTER TABLE schedules ENABLE ROW LEVEL SECURITY;
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;

-- Drop existing policies if they exist and create new ones
DO $$ BEGIN
  DROP POLICY IF EXISTS "Public can read schedules" ON schedules;
  DROP POLICY IF EXISTS "Admin can manage schedules" ON schedules;
  
  CREATE POLICY "Public can read schedules"
    ON schedules
    FOR SELECT
    TO public
    USING (true);

  CREATE POLICY "Admin can manage schedules"
    ON schedules
    FOR ALL
    TO authenticated
    USING (
      EXISTS (
        SELECT 1 FROM profiles
        WHERE profiles.id = auth.uid()
        AND profiles.role = 'admin'
      )
    );
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;