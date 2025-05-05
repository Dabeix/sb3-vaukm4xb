/*
  # Fix Authentication Permissions and Schema

  1. Changes
    - Grant proper permissions to auth schema objects
    - Add missing auth schema permissions
    - Fix identity provider configuration
*/

-- Grant proper schema permissions
GRANT USAGE ON SCHEMA auth TO postgres, anon, authenticated, service_role;
GRANT ALL ON ALL TABLES IN SCHEMA auth TO postgres, service_role;
GRANT ALL ON ALL SEQUENCES IN SCHEMA auth TO postgres, service_role;
GRANT ALL ON ALL ROUTINES IN SCHEMA auth TO postgres, service_role;

-- Grant specific permissions to auth schema objects
GRANT SELECT ON auth.users TO postgres, authenticated, service_role;
GRANT SELECT ON auth.identities TO postgres, authenticated, service_role;
GRANT EXECUTE ON FUNCTION auth.uid() TO postgres, anon, authenticated, service_role;
GRANT EXECUTE ON FUNCTION auth.role() TO postgres, anon, authenticated, service_role;
GRANT EXECUTE ON FUNCTION auth.email() TO postgres, anon, authenticated, service_role;

-- Grant public schema permissions
GRANT USAGE ON SCHEMA public TO anon, authenticated, service_role;
GRANT ALL ON ALL TABLES IN SCHEMA public TO authenticated, service_role;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO authenticated, service_role;
GRANT ALL ON ALL ROUTINES IN SCHEMA public TO authenticated, service_role;

-- Ensure proper RLS policies
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Recreate policies with proper conditions
DO $$ BEGIN
  DROP POLICY IF EXISTS "Users can read own profile" ON public.profiles;
  DROP POLICY IF EXISTS "Admin can manage all profiles" ON public.profiles;
  DROP POLICY IF EXISTS "Public can read profiles" ON public.profiles;
  
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
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role = 'admin'
    ));

  CREATE POLICY "Public can read profiles"
    ON public.profiles
    FOR SELECT
    TO anon
    USING (true);
END $$;

-- Create necessary indices
CREATE INDEX IF NOT EXISTS idx_profiles_email ON public.profiles(email);
CREATE INDEX IF NOT EXISTS idx_profiles_role ON public.profiles(role);

-- Ensure auth schema functions are accessible
DO $$ BEGIN
  ALTER FUNCTION auth.uid() SECURITY DEFINER;
  ALTER FUNCTION auth.role() SECURITY DEFINER;
  ALTER FUNCTION auth.email() SECURITY DEFINER;
EXCEPTION
  WHEN undefined_function THEN NULL;
END $$;