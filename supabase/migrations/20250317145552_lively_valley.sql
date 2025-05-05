-- Set proper search path
SET search_path TO auth, public;

-- Create auth schema if not exists
CREATE SCHEMA IF NOT EXISTS auth;

-- Reset and grant proper schema permissions
GRANT USAGE ON SCHEMA auth TO postgres, anon, authenticated, service_role;
GRANT ALL ON ALL TABLES IN SCHEMA auth TO postgres, service_role;
GRANT ALL ON ALL SEQUENCES IN SCHEMA auth TO postgres, service_role;
GRANT ALL ON ALL ROUTINES IN SCHEMA auth TO postgres, service_role;

-- Grant specific permissions for user authentication
GRANT SELECT, INSERT, UPDATE, DELETE ON auth.users TO service_role;
GRANT SELECT, INSERT, UPDATE, DELETE ON auth.identities TO service_role;
GRANT USAGE ON ALL SEQUENCES IN SCHEMA auth TO service_role;

-- Grant public schema permissions
GRANT USAGE ON SCHEMA public TO anon, authenticated, service_role;
GRANT ALL ON ALL TABLES IN SCHEMA public TO authenticated, service_role;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO authenticated, service_role;

-- Create essential auth functions if they don't exist
CREATE OR REPLACE FUNCTION auth.uid() RETURNS uuid
    LANGUAGE sql STABLE
    SECURITY DEFINER
    SET search_path = auth, public
    AS $$
  SELECT COALESCE(
    current_setting('request.jwt.claim.sub', true),
    (current_setting('request.jwt.claims', true)::jsonb ->> 'sub')
  )::uuid
$$;

CREATE OR REPLACE FUNCTION auth.role() RETURNS text
    LANGUAGE sql STABLE
    SECURITY DEFINER
    SET search_path = auth, public
    AS $$
  SELECT COALESCE(
    current_setting('request.jwt.claim.role', true),
    (current_setting('request.jwt.claims', true)::jsonb ->> 'role')
  )::text
$$;

CREATE OR REPLACE FUNCTION auth.email() RETURNS text
    LANGUAGE sql STABLE
    SECURITY DEFINER
    SET search_path = auth, public
    AS $$
  SELECT COALESCE(
    current_setting('request.jwt.claim.email', true),
    (current_setting('request.jwt.claims', true)::jsonb ->> 'email')
  )::text
$$;

-- Grant execute permissions on auth functions
GRANT EXECUTE ON FUNCTION auth.uid() TO postgres, anon, authenticated, service_role;
GRANT EXECUTE ON FUNCTION auth.role() TO postgres, anon, authenticated, service_role;
GRANT EXECUTE ON FUNCTION auth.email() TO postgres, anon, authenticated, service_role;

-- Create or replace trigger function for new user handling
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, email, role)
  VALUES (new.id, new.email, 'user')
  ON CONFLICT (id) DO NOTHING;
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = auth, public;

-- Recreate trigger for automatic profile creation
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Ensure proper RLS policies for profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

DO $$ BEGIN
  -- Drop existing policies
  DROP POLICY IF EXISTS "Users can read own profile" ON public.profiles;
  DROP POLICY IF EXISTS "Admin can manage all profiles" ON public.profiles;
  DROP POLICY IF EXISTS "Enable insert for authenticated users only" ON public.profiles;
  DROP POLICY IF EXISTS "Enable update for users based on email" ON public.profiles;
  DROP POLICY IF EXISTS "Public can read profiles" ON public.profiles;
  
  -- Recreate policies with proper conditions
  CREATE POLICY "Users can read own profile"
    ON public.profiles
    FOR SELECT
    TO authenticated
    USING (auth.uid() = id);

  CREATE POLICY "Admin can manage all profiles"
    ON public.profiles
    FOR ALL
    TO authenticated
    USING (EXISTS (
      SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'
    ));

  CREATE POLICY "Enable insert for authenticated users only"
    ON public.profiles
    FOR INSERT
    TO authenticated
    WITH CHECK (true);

  CREATE POLICY "Enable update for users based on email"
    ON public.profiles
    FOR UPDATE
    TO authenticated
    USING (auth.uid() = id)
    WITH CHECK (auth.uid() = id);

  CREATE POLICY "Public can read profiles"
    ON public.profiles
    FOR SELECT
    TO anon
    USING (true);
END $$;

-- Create indices for better performance
CREATE INDEX IF NOT EXISTS users_instance_id_idx ON auth.users(instance_id);
CREATE INDEX IF NOT EXISTS users_email_idx ON auth.users(email);
CREATE INDEX IF NOT EXISTS identities_user_id_idx ON auth.identities(user_id);
CREATE INDEX IF NOT EXISTS identities_email_idx ON auth.identities(email);

-- Reset search path
SET search_path TO public;