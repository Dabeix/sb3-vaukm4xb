/*
  # Initialize Auth Schema and Tables

  1. Changes
    - Create auth schema with proper structure
    - Set up auth.users table with correct columns
    - Set up auth.identities table with correct structure
    - Grant proper permissions
*/

-- Set proper search path
SET search_path TO auth, public;

-- Create auth schema if not exists
CREATE SCHEMA IF NOT EXISTS auth;

-- Create auth.users table if not exists
CREATE TABLE IF NOT EXISTS auth.users (
    id uuid NOT NULL PRIMARY KEY,
    instance_id uuid,
    aud character varying(255),
    role character varying(255),
    email character varying(255),
    encrypted_password character varying(255),
    email_confirmed_at timestamp with time zone,
    invited_at timestamp with time zone,
    confirmation_token character varying(255),
    confirmation_sent_at timestamp with time zone,
    recovery_token character varying(255),
    recovery_sent_at timestamp with time zone,
    email_change_token_new character varying(255),
    email_change character varying(255),
    email_change_sent_at timestamp with time zone,
    last_sign_in_at timestamp with time zone,
    raw_app_meta_data jsonb,
    raw_user_meta_data jsonb,
    is_super_admin boolean,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    phone character varying(255) DEFAULT NULL::character varying,
    phone_confirmed_at timestamp with time zone,
    phone_change character varying(255) DEFAULT ''::character varying,
    phone_change_token character varying(255) DEFAULT ''::character varying,
    phone_change_sent_at timestamp with time zone,
    confirmed_at timestamp with time zone GENERATED ALWAYS AS (LEAST(email_confirmed_at, phone_confirmed_at)) STORED,
    email_change_token_current character varying(255) DEFAULT ''::character varying,
    email_change_confirm_status smallint DEFAULT 0,
    banned_until timestamp with time zone,
    reauthentication_token character varying(255) DEFAULT ''::character varying,
    reauthentication_sent_at timestamp with time zone,
    is_sso_user boolean DEFAULT false,
    deleted_at timestamp with time zone
);

-- Create auth.identities table if not exists
CREATE TABLE IF NOT EXISTS auth.identities (
    id uuid NOT NULL,
    user_id uuid NOT NULL,
    identity_data jsonb NOT NULL,
    provider character varying(255) NOT NULL,
    last_sign_in_at timestamp with time zone,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    email character varying(255) GENERATED ALWAYS AS (lower(identity_data->>'email'::text)) STORED,
    CONSTRAINT identities_pkey PRIMARY KEY (provider, id),
    CONSTRAINT identities_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE
);

-- Create necessary indices
CREATE INDEX IF NOT EXISTS identities_email_idx ON auth.identities (email);
CREATE INDEX IF NOT EXISTS identities_user_id_idx ON auth.identities (user_id);

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

-- Reset search path
SET search_path TO public;