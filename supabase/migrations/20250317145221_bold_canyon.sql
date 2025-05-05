/*
  # Fix auth schema permissions for user creation

  1. Changes
    - Grant proper permissions to auth schema
    - Fix user creation related permissions
    - Add missing auth schema objects
*/

-- Set proper search path
SET search_path TO auth, public;

-- Reset and grant proper schema permissions
GRANT USAGE ON SCHEMA auth TO postgres, anon, authenticated, service_role;
GRANT ALL ON ALL TABLES IN SCHEMA auth TO postgres, service_role;
GRANT ALL ON ALL SEQUENCES IN SCHEMA auth TO postgres, service_role;
GRANT ALL ON ALL ROUTINES IN SCHEMA auth TO postgres, service_role;

-- Grant specific permissions for user creation
GRANT INSERT, SELECT ON auth.users TO service_role;
GRANT INSERT, SELECT ON auth.identities TO service_role;
GRANT USAGE ON ALL SEQUENCES IN SCHEMA auth TO service_role;

-- Ensure proper RLS policies for profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

DO $$ BEGIN
  DROP POLICY IF EXISTS "Enable insert for authenticated users only" ON public.profiles;
  DROP POLICY IF EXISTS "Enable update for users based on email" ON public.profiles;
  
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

-- Create trigger function for profile creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, email, role)
  VALUES (new.id, new.email, 'user')
  ON CONFLICT (id) DO NOTHING;
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for automatic profile creation
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Reset search path
SET search_path TO public;