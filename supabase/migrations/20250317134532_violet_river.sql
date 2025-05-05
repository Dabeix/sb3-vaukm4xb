/*
  # Fix Auth Schema and Functions

  1. Changes
    - Add provider_id column to auth.identities
    - Create essential auth functions
    - Fix permissions and ownership
*/

-- Set proper search path
SET search_path TO auth, public;

-- Add provider_id column to auth.identities if it doesn't exist
DO $$ 
BEGIN
  ALTER TABLE auth.identities ADD COLUMN provider_id text;
EXCEPTION
  WHEN duplicate_column THEN NULL;
END $$;

-- Create essential auth functions
CREATE OR REPLACE FUNCTION auth.uid() RETURNS uuid
    LANGUAGE sql STABLE
    AS $$
  SELECT 
    coalesce(
        current_setting('request.jwt.claim.sub', true),
        (current_setting('request.jwt.claims', true)::jsonb ->> 'sub')
    )::uuid
$$;

CREATE OR REPLACE FUNCTION auth.role() RETURNS text
    LANGUAGE sql STABLE
    AS $$
  SELECT 
    coalesce(
        current_setting('request.jwt.claim.role', true),
        (current_setting('request.jwt.claims', true)::jsonb ->> 'role')
    )::text
$$;

CREATE OR REPLACE FUNCTION auth.email() RETURNS text
    LANGUAGE sql STABLE
    AS $$
  SELECT 
    coalesce(
        current_setting('request.jwt.claim.email', true),
        (current_setting('request.jwt.claims', true)::jsonb ->> 'email')
    )::text
$$;

CREATE OR REPLACE FUNCTION auth.jwt() RETURNS jsonb
    LANGUAGE sql STABLE
    AS $$
  SELECT 
    coalesce(
        current_setting('request.jwt.claims', true)::jsonb,
        '{}'::jsonb
    )
$$;

-- Set proper ownership and permissions
ALTER FUNCTION auth.uid() OWNER TO postgres;
ALTER FUNCTION auth.role() OWNER TO postgres;
ALTER FUNCTION auth.email() OWNER TO postgres;
ALTER FUNCTION auth.jwt() OWNER TO postgres;

ALTER FUNCTION auth.uid() SECURITY DEFINER;
ALTER FUNCTION auth.role() SECURITY DEFINER;
ALTER FUNCTION auth.email() SECURITY DEFINER;
ALTER FUNCTION auth.jwt() SECURITY DEFINER;

-- Grant execute permissions
GRANT EXECUTE ON FUNCTION auth.uid() TO postgres, anon, authenticated, service_role;
GRANT EXECUTE ON FUNCTION auth.role() TO postgres, anon, authenticated, service_role;
GRANT EXECUTE ON FUNCTION auth.email() TO postgres, anon, authenticated, service_role;
GRANT EXECUTE ON FUNCTION auth.jwt() TO postgres, anon, authenticated, service_role;

-- Reset search path
SET search_path TO public;