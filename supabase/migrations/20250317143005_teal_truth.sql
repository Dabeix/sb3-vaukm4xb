/*
  # Fix Authentication Schema and Permissions

  1. Changes
    - Reset and properly configure auth schema permissions
    - Fix identity provider configuration
    - Ensure proper function access
*/

-- Set proper search path
SET search_path TO auth, public;

-- Reset and grant proper schema permissions
GRANT USAGE ON SCHEMA auth TO postgres, anon, authenticated, service_role;
GRANT ALL ON ALL TABLES IN SCHEMA auth TO postgres, service_role;
GRANT ALL ON ALL SEQUENCES IN SCHEMA auth TO postgres, service_role;
GRANT ALL ON ALL ROUTINES IN SCHEMA auth TO postgres, service_role;

-- Grant specific permissions to auth schema objects
GRANT SELECT ON auth.users TO postgres, authenticated, service_role;
GRANT SELECT ON auth.identities TO postgres, authenticated, service_role;

-- Grant execute permissions on auth functions
DO $$ 
BEGIN
  IF EXISTS (SELECT 1 FROM pg_proc WHERE proname = 'uid' AND pronamespace = 'auth'::regnamespace) THEN
    GRANT EXECUTE ON FUNCTION auth.uid() TO postgres, anon, authenticated, service_role;
  END IF;
  
  IF EXISTS (SELECT 1 FROM pg_proc WHERE proname = 'role' AND pronamespace = 'auth'::regnamespace) THEN
    GRANT EXECUTE ON FUNCTION auth.role() TO postgres, anon, authenticated, service_role;
  END IF;
  
  IF EXISTS (SELECT 1 FROM pg_proc WHERE proname = 'email' AND pronamespace = 'auth'::regnamespace) THEN
    GRANT EXECUTE ON FUNCTION auth.email() TO postgres, anon, authenticated, service_role;
  END IF;
  
  IF EXISTS (SELECT 1 FROM pg_proc WHERE proname = 'jwt' AND pronamespace = 'auth'::regnamespace) THEN
    GRANT EXECUTE ON FUNCTION auth.jwt() TO postgres, anon, authenticated, service_role;
  END IF;
END $$;

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
  DROP POLICY IF EXISTS "Enable update for users based on email" ON public.profiles;
  
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

  CREATE POLICY "Enable update for users based on email"
    ON public.profiles
    FOR INSERT
    TO public
    WITH CHECK ((auth.jwt() ->> 'email'::text) = email);
END $$;

-- Reset search path
SET search_path TO public;