/*
  # Système de paiement et réservation

  1. Nouvelles Tables
    - `payment_transactions`
      - Stocke l'historique des paiements
    - `subscriptions`
      - Gère les abonnements des utilisateurs
    - `user_credits`
      - Gère les crédits/séances restantes

  2. Modifications
    - Ajout de colonnes à la table `profiles`
    - Mise à jour des politiques de sécurité

  3. Sécurité
    - RLS pour toutes les nouvelles tables
    - Politiques pour utilisateurs et administrateurs
*/

-- Extend profiles table
ALTER TABLE profiles
ADD COLUMN IF NOT EXISTS first_name text,
ADD COLUMN IF NOT EXISTS last_name text,
ADD COLUMN IF NOT EXISTS phone text,
ADD COLUMN IF NOT EXISTS birth_date date;

-- Payment transactions
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

-- Subscriptions
CREATE TABLE IF NOT EXISTS subscriptions (
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

-- User credits
CREATE TABLE IF NOT EXISTS user_credits (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id),
  activity text NOT NULL,
  credits_remaining integer NOT NULL,
  expires_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Materialized view for analytics
CREATE MATERIALIZED VIEW IF NOT EXISTS booking_analytics AS
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
CREATE UNIQUE INDEX IF NOT EXISTS booking_analytics_idx ON booking_analytics (month, activity);

-- Enable RLS
ALTER TABLE payment_transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_credits ENABLE ROW LEVEL SECURITY;

-- Policies for payment_transactions
CREATE POLICY "Users can view own transactions"
  ON payment_transactions
  FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Admin can manage all transactions"
  ON payment_transactions
  FOR ALL
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM profiles
    WHERE id = auth.uid() AND role = 'admin'
  ));

-- Policies for subscriptions
CREATE POLICY "Users can view own subscriptions"
  ON subscriptions
  FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Admin can manage all subscriptions"
  ON subscriptions
  FOR ALL
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM profiles
    WHERE id = auth.uid() AND role = 'admin'
  ));

-- Policies for user_credits
CREATE POLICY "Users can view own credits"
  ON user_credits
  FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Admin can manage all credits"
  ON user_credits
  FOR ALL
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM profiles
    WHERE id = auth.uid() AND role = 'admin'
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