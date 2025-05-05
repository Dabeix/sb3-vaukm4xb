/*
  # Schéma pour la gestion du contenu du site

  1. New Tables
    - `site_settings`
      - `id` (uuid, primary key)
      - `floating_bubble_active` (boolean)
      - `floating_bubble_text` (text)
      - `updated_at` (timestamp)
    - `schedules`
      - `id` (uuid, primary key)
      - `activity` (text)
      - `day` (text)
      - `time` (text)
      - `location` (text)
    - `pricing`
      - `id` (uuid, primary key)
      - `activity` (text)
      - `name` (text)
      - `price` (numeric)
      - `description` (text)
    - `reservations`
      - `id` (uuid, primary key)
      - `activity` (text)
      - `date` (timestamp)
      - `user_email` (text)
      - `status` (text)

  2. Security
    - Enable RLS on all tables
    - Add admin-only policies
*/

-- Site Settings
CREATE TABLE IF NOT EXISTS site_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  floating_bubble_active boolean DEFAULT true,
  floating_bubble_text text DEFAULT 'Nouveauté ! Mardis Chill !',
  updated_at timestamptz DEFAULT now()
);

-- Schedules
CREATE TABLE IF NOT EXISTS schedules (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  activity text NOT NULL,
  day text NOT NULL,
  time text NOT NULL,
  location text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Pricing
CREATE TABLE IF NOT EXISTS pricing (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  activity text NOT NULL,
  name text NOT NULL,
  price numeric NOT NULL,
  description text,
  created_at timestamptz DEFAULT now()
);

-- Reservations
CREATE TABLE IF NOT EXISTS reservations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  activity text NOT NULL,
  date timestamptz NOT NULL,
  user_email text NOT NULL,
  status text DEFAULT 'pending',
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE schedules ENABLE ROW LEVEL SECURITY;
ALTER TABLE pricing ENABLE ROW LEVEL SECURITY;
ALTER TABLE reservations ENABLE ROW LEVEL SECURITY;

-- Admin Policies
CREATE POLICY "Admin can manage site settings"
  ON site_settings
  FOR ALL
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM profiles
    WHERE id = auth.uid() AND role = 'admin'
  ));

CREATE POLICY "Admin can manage schedules"
  ON schedules
  FOR ALL
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM profiles
    WHERE id = auth.uid() AND role = 'admin'
  ));

CREATE POLICY "Admin can manage pricing"
  ON pricing
  FOR ALL
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM profiles
    WHERE id = auth.uid() AND role = 'admin'
  ));

CREATE POLICY "Admin can manage reservations"
  ON reservations
  FOR ALL
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM profiles
    WHERE id = auth.uid() AND role = 'admin'
  ));

-- Public read policies for certain tables
CREATE POLICY "Public can read schedules"
  ON schedules
  FOR SELECT
  TO PUBLIC
  USING (true);

CREATE POLICY "Public can read pricing"
  ON pricing
  FOR SELECT
  TO PUBLIC
  USING (true);