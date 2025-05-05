/*
  # Fix site settings table

  1. Changes
    - Ensure site_settings table has exactly one row
    - Add default values if no row exists
*/

-- Set proper search path
SET search_path TO public;

-- First, ensure we have exactly one row
DELETE FROM site_settings WHERE id NOT IN (
  SELECT id FROM site_settings LIMIT 1
);

-- If no rows exist, insert the default row
INSERT INTO site_settings (
  id,
  floating_bubble_active,
  floating_bubble_text,
  updated_at
)
SELECT 
  gen_random_uuid(),
  true,
  'Nouveauté ! Mardis Chill !',
  now()
WHERE NOT EXISTS (
  SELECT 1 FROM site_settings
);

-- Add a constraint to ensure only one row can exist
CREATE UNIQUE INDEX IF NOT EXISTS site_settings_singleton_idx ON site_settings ((true));