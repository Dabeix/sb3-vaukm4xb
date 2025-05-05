/*
  # Fix site settings RLS policies

  1. Changes
    - Add RLS policies for site_settings table
    - Allow public read access
    - Allow public write access
*/

-- Set proper search path
SET search_path TO public;

-- Enable RLS on site_settings table
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Public can read site settings" ON site_settings;
DROP POLICY IF EXISTS "Public can update site settings" ON site_settings;

-- Create policies for public access
CREATE POLICY "Public can read site settings"
  ON site_settings
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Public can update site settings"
  ON site_settings
  FOR ALL
  TO public
  USING (true)
  WITH CHECK (true);

-- Reset search path
SET search_path TO public;