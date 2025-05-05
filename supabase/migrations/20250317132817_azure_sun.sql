/*
  # Initial Database Setup

  1. Tables Created:
    - profiles (user profiles with roles)
    - site_settings (global site configuration)
    - schedules (activity schedules)
    - pricing (activity pricing)
    - bookings (user bookings)
    - payment_transactions (payment history)
    - subscriptions (user subscriptions)
    - user_credits (activity credits)
    - messages (contact form messages)
    - newsletter_subscriptions (newsletter subscribers)
    - reservations (activity reservations)

  2. Views Created:
    - booking_analytics (materialized view for booking statistics)

  3. Security:
    - RLS enabled on all tables
    - Appropriate policies for users and admins
*/

-- Clean up existing objects
DROP MATERIALIZED VIEW IF EXISTS booking_analytics CASCADE;
DROP TABLE IF EXISTS user_credits CASCADE;
DROP TABLE IF EXISTS subscriptions CASCADE;
DROP TABLE IF EXISTS payment_transactions CASCADE;
DROP TABLE IF EXISTS bookings CASCADE;
DROP TABLE IF EXISTS reservations CASCADE;
DROP TABLE IF EXISTS messages CASCADE;
DROP TABLE IF EXISTS newsletter_subscriptions CASCADE;
DROP TABLE IF EXISTS pricing CASCADE;
DROP TABLE IF EXISTS schedules CASCADE;
DROP TABLE IF EXISTS site_settings CASCADE;
DROP TABLE IF EXISTS profiles CASCADE;

-- Create profiles table
CREATE TABLE profiles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  role text DEFAULT 'user',
  first_name text,
  last_name text,
  phone text,
  birth_date date,
  created_at timestamptz DEFAULT now()
);

-- Create site_settings table
CREATE TABLE site_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  floating_bubble_active boolean DEFAULT true,
  floating_bubble_text text DEFAULT 'Nouveauté ! Mardis Chill !',
  updated_at timestamptz DEFAULT now()
);

-- Create schedules table
CREATE TABLE schedules (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  activity text NOT NULL,
  day text NOT NULL,
  time text NOT NULL,
  location text NOT NULL,
  capacity integer DEFAULT 10,
  created_at timestamptz DEFAULT now()
);

-- Create pricing table
CREATE TABLE pricing (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  activity text NOT NULL,
  name text NOT NULL,
  price numeric NOT NULL,
  description text,
  created_at timestamptz DEFAULT now()
);

-- Create bookings table
CREATE TABLE bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id),
  activity text NOT NULL,
  date timestamptz NOT NULL,
  status text DEFAULT 'pending',
  created_at timestamptz DEFAULT now()
);

-- Create payment_transactions table
CREATE TABLE payment_transactions (
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

-- Create subscriptions table
CREATE TABLE subscriptions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id),
  plan_type text NOT NULL,
  start_date timestamptz NOT NULL,
  end_date timestamptz,
  status text DEFAULT 'active',
  auto_renew boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create user_credits table
CREATE TABLE user_credits (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id),
  activity text NOT NULL,
  credits_remaining integer NOT NULL,
  expires_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create messages table
CREATE TABLE messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text NOT NULL,
  content text NOT NULL,
  created_at timestamptz DEFAULT now(),
  read boolean DEFAULT false
);

-- Create newsletter_subscriptions table
CREATE TABLE newsletter_subscriptions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  created_at timestamptz DEFAULT now(),
  status text DEFAULT 'active'
);

-- Create reservations table
CREATE TABLE reservations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  activity text NOT NULL,
  date timestamptz NOT NULL,
  user_email text NOT NULL,
  status text DEFAULT 'pending',
  created_at timestamptz DEFAULT now()
);

-- Create booking_analytics materialized view
CREATE MATERIALIZED VIEW booking_analytics AS
SELECT 
  date_trunc('month', b.date) as month,
  b.activity,
  COUNT(*) as total_bookings,
  COUNT(DISTINCT b.user_id) as unique_users,
  AVG(pt.amount) as average_revenue
FROM bookings b
LEFT JOIN payment_transactions pt ON b.user_id = pt.user_id
GROUP BY date_trunc('month', b.date), b.activity
WITH DATA;

-- Create index for the materialized view
CREATE UNIQUE INDEX booking_analytics_idx ON booking_analytics (month, activity);

-- Enable RLS on all tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE schedules ENABLE ROW LEVEL SECURITY;
ALTER TABLE pricing ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE payment_transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_credits ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE newsletter_subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE reservations ENABLE ROW LEVEL SECURITY;

-- Create policies for profiles
CREATE POLICY "Users can read own profile"
  ON profiles FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Admin can manage all profiles"
  ON profiles FOR ALL
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'
  ));

-- Create policies for site_settings
CREATE POLICY "Admin can manage site settings"
  ON site_settings FOR ALL
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'
  ));

-- Create policies for schedules
CREATE POLICY "Public can read schedules"
  ON schedules FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Admin can manage schedules"
  ON schedules FOR ALL
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'
  ));

-- Create policies for pricing
CREATE POLICY "Public can read pricing"
  ON pricing FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Admin can manage pricing"
  ON pricing FOR ALL
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'
  ));

-- Create policies for bookings
CREATE POLICY "Users can read own bookings"
  ON bookings FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can create own bookings"
  ON bookings FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Admin can manage all bookings"
  ON bookings FOR ALL
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'
  ));

-- Create policies for payment_transactions
CREATE POLICY "Users can read own transactions"
  ON payment_transactions FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can create own transactions"
  ON payment_transactions FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Admin can manage all transactions"
  ON payment_transactions FOR ALL
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'
  ));

-- Create policies for subscriptions
CREATE POLICY "Users can read own subscriptions"
  ON subscriptions FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Admin can manage all subscriptions"
  ON subscriptions FOR ALL
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'
  ));

-- Create policies for user_credits
CREATE POLICY "Users can read own credits"
  ON user_credits FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Admin can manage all credits"
  ON user_credits FOR ALL
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'
  ));

-- Create policies for messages
CREATE POLICY "Admin can read all messages"
  ON messages FOR ALL
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'
  ));

-- Create policies for newsletter_subscriptions
CREATE POLICY "Anyone can subscribe to newsletter"
  ON newsletter_subscriptions FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Public can read own subscription"
  ON newsletter_subscriptions FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Admin can manage newsletter subscriptions"
  ON newsletter_subscriptions FOR ALL
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'
  ));

-- Create policies for reservations
CREATE POLICY "Admin can manage all reservations"
  ON reservations FOR ALL
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'
  ));

-- Function to refresh analytics
CREATE OR REPLACE FUNCTION refresh_booking_analytics()
RETURNS trigger AS $$
BEGIN
  REFRESH MATERIALIZED VIEW CONCURRENTLY booking_analytics;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Trigger to refresh analytics
CREATE TRIGGER refresh_booking_analytics_trigger
AFTER INSERT OR UPDATE OR DELETE ON bookings
FOR EACH STATEMENT
EXECUTE FUNCTION refresh_booking_analytics();

-- Insert default site settings
INSERT INTO site_settings (
  floating_bubble_active,
  floating_bubble_text,
  updated_at
) VALUES (
  true,
  'Nouveauté ! Mardis Chill !',
  now()
);

-- Create singleton constraint for site_settings
CREATE UNIQUE INDEX site_settings_singleton_idx ON site_settings ((true));