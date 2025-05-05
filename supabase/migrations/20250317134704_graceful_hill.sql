/*
  # Fix Auth Functions and Permissions

  1. Changes
    - Add missing auth functions for password reset and token handling
    - Fix permissions for auth schema objects
    - Add proper indices for performance
*/

-- Set proper search path
SET search_path TO auth, public;

-- Create or replace auth functions
CREATE OR REPLACE FUNCTION auth.check_role_exists() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_roles AS r WHERE r.rolname = NEW.role) THEN
    RAISE foreign_key_violation USING message = 'Invalid role';
    RETURN NULL;
  END IF;
  RETURN NEW;
END
$$;

CREATE OR REPLACE FUNCTION auth.set_role(role text) RETURNS text
    LANGUAGE plpgsql
    SECURITY DEFINER
    SET search_path = auth, public
    AS $$
BEGIN
  IF role IS NULL THEN
    RAISE invalid_parameter_value USING message = 'Role cannot be null';
  END IF;

  IF NOT EXISTS (SELECT 1 FROM pg_roles AS r WHERE r.rolname = role) THEN
    RAISE invalid_parameter_value USING message = 'Invalid role';
  END IF;

  RETURN role;
END;
$$;

-- Create trigger for role checking
DROP TRIGGER IF EXISTS ensure_user_role_exists ON auth.users;
CREATE TRIGGER ensure_user_role_exists
  BEFORE INSERT OR UPDATE ON auth.users
  FOR EACH ROW
  EXECUTE PROCEDURE auth.check_role_exists();

-- Create indices for better performance
CREATE INDEX IF NOT EXISTS users_instance_id_idx ON auth.users(instance_id);
CREATE INDEX IF NOT EXISTS users_email_idx ON auth.users(email);
CREATE INDEX IF NOT EXISTS users_confirmation_token_idx ON auth.users(confirmation_token);
CREATE INDEX IF NOT EXISTS users_recovery_token_idx ON auth.users(recovery_token);
CREATE INDEX IF NOT EXISTS identities_user_id_idx ON auth.identities(user_id);

-- Grant proper permissions
GRANT USAGE ON SCHEMA auth TO postgres, anon, authenticated, service_role;
GRANT ALL ON ALL TABLES IN SCHEMA auth TO postgres, service_role;
GRANT ALL ON ALL SEQUENCES IN SCHEMA auth TO postgres, service_role;
GRANT ALL ON ALL ROUTINES IN SCHEMA auth TO postgres, service_role;

-- Grant specific permissions
GRANT SELECT, INSERT, UPDATE ON auth.users TO postgres, service_role;
GRANT SELECT, INSERT, UPDATE ON auth.identities TO postgres, service_role;
GRANT SELECT ON auth.users TO authenticated;
GRANT SELECT ON auth.identities TO authenticated;

-- Grant execute permissions on functions
GRANT EXECUTE ON FUNCTION auth.uid() TO postgres, anon, authenticated, service_role;
GRANT EXECUTE ON FUNCTION auth.role() TO postgres, anon, authenticated, service_role;
GRANT EXECUTE ON FUNCTION auth.email() TO postgres, anon, authenticated, service_role;
GRANT EXECUTE ON FUNCTION auth.jwt() TO postgres, anon, authenticated, service_role;
GRANT EXECUTE ON FUNCTION auth.set_role(text) TO postgres, service_role;

-- Reset search path
SET search_path TO public;