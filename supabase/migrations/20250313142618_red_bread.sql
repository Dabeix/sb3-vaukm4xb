/*
  # Add default site settings

  1. Changes
    - Insert default site settings data
*/

INSERT INTO site_settings (
  floating_bubble_active,
  floating_bubble_text,
  updated_at
)
VALUES (
  true,
  'Nouveauté ! Mardis Chill !',
  now()
)
ON CONFLICT (id) DO NOTHING;