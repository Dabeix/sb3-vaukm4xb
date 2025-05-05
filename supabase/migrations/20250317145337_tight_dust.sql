/*
  # Fix auth schema setup and permissions

  1. Changes
    - Reset and properly configure auth schema
    - Grant necessary permissions for user authentication
    - Fix trigger functions and policies
*/

-- Set proper search path
SET search_path TO auth, public;

-- Reset and grant proper schema permissions
GRANT USAGE ON SCHEMA auth TO postgres, anon, authenticated, service_role;
GRANT ALL ON ALL TABLES IN SCHEMA auth TO postgres, service_role;
GRANT ALL ON ALL SEQUENCES IN SCHEMA auth TO postgres, service_role;
GRANT ALL ON ALL ROUTINES IN SCHEMA auth TO postgres, service_role;

-- Grant specific permissions for user authentication
GRANT SELECT, INSERT, UPDATE ON auth.users TO service_role;
GRANT SELECT, INSERT, UPDATE ON auth.identities TO service_role;
GRANT USAGE ON ALL SEQUENCES IN SCHEMA auth TO service_role;

-- Ensure auth schema functions are accessible
DO $$ BEGIN
  ALTER FUNCTION auth.uid() SECURITY DEFINER;
  ALTER FUNCTION auth.role() SECURITY DEFINER;
  ALTER FUNCTION auth.email() SECURITY DEFINER;
EXCEPTION
  WHEN undefined_function THEN NULL;
END $$;

-- Grant execute permissions on auth functions
GRANT EXECUTE ON FUNCTION auth.uid() TO postgres, anon, authenticated, service_role;
GRANT EXECUTE ON FUNCTION auth.role() TO postgres, anon, authenticated, service_role;
GRANT EXECUTE ON FUNCTION auth.email() TO postgres, anon, authenticated, service_role;

-- Ensure proper RLS policies for profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

DO $$ BEGIN
  DROP POLICY IF EXISTS "Users can read own profile" ON public.profiles;
  DROP POLICY IF EXISTS "Admin can manage all profiles" ON public.profiles;
  DROP POLICY IF EXISTS "Enable insert for authenticated users only" ON public.profiles;
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
END $$;

-- Create or replace trigger function for new user handling
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, email, role)
  VALUES (new.id, new.email, 'user')
  ON CONFLICT (id) DO NOTHING;
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Recreate trigger for automatic profile creation
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Reset search path
SET search_path TO public;