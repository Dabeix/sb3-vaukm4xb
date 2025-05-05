-- Set proper search path
SET search_path TO public;

-- Add new columns to site_settings table
ALTER TABLE site_settings 
ADD COLUMN IF NOT EXISTS mardi_chill_subtitle text DEFAULT 'Nouvelle activité relaxante',
ADD COLUMN IF NOT EXISTS mardi_chill_schedule text DEFAULT E'Tous les mardis\n19h - 20h30';

-- Reset search path
SET search_path TO public;