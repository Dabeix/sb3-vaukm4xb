/*
  # Add Password Recovery Functionality

  1. Changes
    - Add password recovery functions
    - Add email templates table
    - Add proper indices and triggers
    - Set correct permissions
*/

-- Set proper search path
SET search_path TO auth, public;

-- Create email templates table if not exists
CREATE TABLE IF NOT EXISTS auth.mfa_factors (
    id uuid NOT NULL PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    friendly_name text,
    factor_type auth.factor_type NOT NULL,
    status auth.factor_status NOT NULL,
    created_at timestamp with time zone NOT NULL DEFAULT now(),
    updated_at timestamp with time zone NOT NULL DEFAULT now(),
    secret text
);

-- Create password recovery functions
CREATE OR REPLACE FUNCTION auth.handle_recovery_token(
    recovery_token text,
    new_password text
) RETURNS void
    LANGUAGE plpgsql
    SECURITY DEFINER
    SET search_path = auth, public
AS $$
DECLARE
    _user_id uuid;
    _email text;
BEGIN
    -- Get user from recovery token
    SELECT id, email INTO _user_id, _email
    FROM auth.users
    WHERE recovery_token = handle_recovery_token.recovery_token
    AND recovery_sent_at >= now() - interval '24 hours';

    IF _user_id IS NULL THEN
        RAISE EXCEPTION 'Invalid recovery token';
    END IF;

    -- Update password and clear recovery token
    UPDATE auth.users
    SET 
        encrypted_password = crypt(new_password, gen_salt('bf')),
        recovery_token = NULL,
        recovery_sent_at = NULL,
        updated_at = now()
    WHERE id = _user_id;
END;
$$;

CREATE OR REPLACE FUNCTION auth.request_password_reset(
    email text,
    base_url text DEFAULT NULL
) RETURNS void
    LANGUAGE plpgsql
    SECURITY DEFINER
    SET search_path = auth, public
AS $$
DECLARE
    _user_id uuid;
    _token text;
BEGIN
    -- Get user id from email
    SELECT id INTO _user_id
    FROM auth.users
    WHERE lower(auth.users.email) = lower(request_password_reset.email);

    IF _user_id IS NULL THEN
        -- Return without error to prevent email enumeration
        RETURN;
    END IF;

    -- Generate recovery token
    _token := encode(gen_random_bytes(32), 'hex');

    -- Update user with recovery token
    UPDATE auth.users
    SET 
        recovery_token = _token,
        recovery_sent_at = now()
    WHERE id = _user_id;
END;
$$;

-- Create indices for better performance
CREATE INDEX IF NOT EXISTS users_recovery_token_idx ON auth.users(recovery_token);
CREATE INDEX IF NOT EXISTS users_recovery_sent_at_idx ON auth.users(recovery_sent_at);
CREATE INDEX IF NOT EXISTS mfa_factors_user_id_idx ON auth.mfa_factors(user_id);

-- Grant proper permissions
GRANT EXECUTE ON FUNCTION auth.handle_recovery_token(text, text) TO postgres, service_role;
GRANT EXECUTE ON FUNCTION auth.request_password_reset(text, text) TO postgres, service_role;

-- Reset search path
SET search_path TO public;