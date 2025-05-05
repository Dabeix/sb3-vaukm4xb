/*
  # Fix Authentication Schema and Permissions

  1. Changes
    - Ensure auth schema exists and has proper permissions
    - Fix user authentication tables and policies
    - Add missing indices
*/

-- Ensure proper schema permissions
GRANT USAGE ON SCHEMA auth TO postgres, anon, authenticated, service_role;
GRANT ALL ON ALL TABLES IN SCHEMA auth TO postgres, service_role;
GRANT ALL ON ALL SEQUENCES IN SCHEMA auth TO postgres, service_role;
GRANT ALL ON ALL ROUTINES IN SCHEMA auth TO postgres, service_role;

-- Ensure proper public schema permissions for auth-related tables
GRANT USAGE ON SCHEMA public TO anon, authenticated, service_role;

-- Grant access to profiles table
GRANT ALL ON TABLE public.profiles TO authenticated, service_role;
GRANT SELECT ON TABLE public.profiles TO anon;

-- Create index on profiles email if not exists
CREATE INDEX IF NOT EXISTS idx_profiles_email ON public.profiles(email);

-- Ensure proper RLS policies
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Recreate policies to ensure they exist with proper conditions
DO $$ BEGIN
  DROP POLICY IF EXISTS "Users can read own profile" ON public.profiles;
  DROP POLICY IF EXISTS "Admin can manage all profiles" ON public.profiles;
  
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
END $$;