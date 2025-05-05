/*
  # Initialize Auth Schema and Fix Permissions

  1. Changes
    - Initialize auth schema if not exists
    - Set proper schema search path
    - Grant essential permissions
    - Fix sequence ownership
*/

-- Set proper search path
SET search_path TO auth, public;

-- Create auth schema if not exists
CREATE SCHEMA IF NOT EXISTS auth;

-- Reset and grant proper schema permissions
GRANT USAGE ON SCHEMA auth TO postgres, anon, authenticated, service_role;
GRANT ALL ON ALL TABLES IN SCHEMA auth TO postgres, service_role;
GRANT ALL ON ALL SEQUENCES IN SCHEMA auth TO postgres, service_role;
GRANT ALL ON ALL ROUTINES IN SCHEMA auth TO postgres, service_role;

-- Grant specific permissions to auth schema objects
GRANT SELECT, INSERT, UPDATE ON auth.users TO postgres, service_role;
GRANT SELECT, INSERT, UPDATE ON auth.identities TO postgres, service_role;
GRANT SELECT ON auth.users TO authenticated;
GRANT SELECT ON auth.identities TO authenticated;

-- Ensure proper sequence ownership
ALTER SEQUENCE IF EXISTS auth.users_id_seq OWNER TO postgres;
ALTER SEQUENCE IF EXISTS auth.identities_id_seq OWNER TO postgres;

-- Grant execute permissions on essential auth functions
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

-- Ensure proper public schema permissions
GRANT USAGE ON SCHEMA public TO anon, authenticated, service_role;
GRANT ALL ON ALL TABLES IN SCHEMA public TO authenticated, service_role;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO authenticated, service_role;
GRANT ALL ON ALL ROUTINES IN SCHEMA public TO authenticated, service_role;

-- Reset search path
SET search_path TO public;