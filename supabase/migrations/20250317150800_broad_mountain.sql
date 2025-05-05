-- Set proper search path
SET search_path TO public;

-- Add new columns to site_settings table
ALTER TABLE site_settings 
ADD COLUMN IF NOT EXISTS mardi_chill_text text DEFAULT 'Nouveauté ! Mardis Chill !',
ADD COLUMN IF NOT EXISTS mardi_chill_color text DEFAULT 'blue',
ADD COLUMN IF NOT EXISTS mardi_chill_icon text DEFAULT 'sparkles';

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