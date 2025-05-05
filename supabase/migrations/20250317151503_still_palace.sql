-- Set proper search path
SET search_path TO public;

-- Drop existing table and recreate with all columns
DROP TABLE IF EXISTS site_settings;

CREATE TABLE site_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  floating_bubble_active boolean DEFAULT true,
  floating_bubble_text text DEFAULT 'Nouveauté ! Mardis Chill !',
  mardi_chill_text text DEFAULT 'Nouveauté ! Mardis Chill !',
  mardi_chill_subtitle text DEFAULT 'Nouvelle activité relaxante',
  mardi_chill_schedule text DEFAULT E'Tous les mardis\n19h - 20h30',
  mardi_chill_color text DEFAULT 'blue',
  mardi_chill_icon text DEFAULT 'sparkles',
  updated_at timestamptz DEFAULT now()
);

-- Create singleton constraint
CREATE UNIQUE INDEX site_settings_singleton_idx ON site_settings ((true));

-- Insert default row
INSERT INTO site_settings (
  floating_bubble_active,
  floating_bubble_text,
  mardi_chill_text,
  mardi_chill_subtitle,
  mardi_chill_schedule,
  mardi_chill_color,
  mardi_chill_icon,
  updated_at
) VALUES (
  true,
  'Nouveauté ! Mardis Chill !',
  'Nouveauté ! Mardis Chill !',
  'Nouvelle activité relaxante',
  E'Tous les mardis\n19h - 20h30',
  'blue',
  'sparkles',
  now()
);

-- Enable RLS
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

-- Create policies
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