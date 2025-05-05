/*
  # Fix password reset functionality

  1. Changes
    - Drop existing password reset functions
    - Create new password reset functions with proper parameters
    - Create email templates table with proper constraints
    - Add password reset email template
*/

-- Set proper search path
SET search_path TO auth, public;

-- Drop existing functions to avoid conflicts
DROP FUNCTION IF EXISTS auth.request_password_reset(text, text);
DROP FUNCTION IF EXISTS auth.handle_password_reset(text, text);

-- Create email templates table if not exists
CREATE TABLE IF NOT EXISTS auth.email_templates (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    template_type text UNIQUE NOT NULL,
    subject text NOT NULL,
    content text NOT NULL,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

-- Create or replace the password reset function with proper parameters
CREATE OR REPLACE FUNCTION auth.handle_password_reset(
    reset_token text,
    new_password text
) RETURNS void
    LANGUAGE plpgsql
    SECURITY DEFINER
    SET search_path = auth, public
AS $$
DECLARE
    _user_id uuid;
    _now timestamp with time zone := now();
BEGIN
    -- Get user from reset token
    SELECT id INTO _user_id
    FROM auth.users
    WHERE recovery_token = reset_token
    AND recovery_sent_at >= _now - interval '24 hours';

    IF _user_id IS NULL THEN
        RAISE EXCEPTION 'Invalid or expired reset token';
    END IF;

    -- Update user password and clear reset token
    UPDATE auth.users
    SET 
        encrypted_password = crypt(new_password, gen_salt('bf')),
        recovery_token = NULL,
        recovery_sent_at = NULL,
        updated_at = _now,
        last_sign_in_at = _now
    WHERE id = _user_id;
END;
$$;

-- Create or replace the password reset request function with proper parameters
CREATE OR REPLACE FUNCTION auth.request_password_recovery(
    user_email text,
    redirect_to text DEFAULT NULL
) RETURNS void
    LANGUAGE plpgsql
    SECURITY DEFINER
    SET search_path = auth, public
AS $$
DECLARE
    _user_id uuid;
    _token text;
    _now timestamp with time zone := now();
BEGIN
    -- Get user by email
    SELECT id INTO _user_id
    FROM auth.users
    WHERE lower(users.email) = lower(user_email);

    IF _user_id IS NULL THEN
        -- Return silently to prevent email enumeration
        RETURN;
    END IF;

    -- Generate reset token
    _token := encode(gen_random_bytes(32), 'hex');

    -- Update user with reset token
    UPDATE auth.users
    SET 
        recovery_token = _token,
        recovery_sent_at = _now
    WHERE id = _user_id;

    -- Note: Email sending is handled by Supabase service
END;
$$;

-- Ensure proper permissions
GRANT EXECUTE ON FUNCTION auth.handle_password_reset(text, text) TO service_role;
GRANT EXECUTE ON FUNCTION auth.request_password_recovery(text, text) TO service_role;

-- Delete existing template if exists
DELETE FROM auth.email_templates WHERE template_type = 'recovery';

-- Insert password reset email template
INSERT INTO auth.email_templates (
    template_type,
    subject,
    content
) VALUES (
    'recovery',
    'Réinitialisation de votre mot de passe - Aquabike Center',
    '<!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
    </head>
    <body style="font-family: sans-serif; padding: 20px;">
        <h2>Réinitialisation de votre mot de passe</h2>
        <p>Bonjour,</p>
        <p>Nous avons reçu une demande de réinitialisation de mot de passe pour votre compte Aquabike Center.</p>
        <p>Si vous êtes à l''origine de cette demande, cliquez sur le lien ci-dessous pour définir un nouveau mot de passe :</p>
        <p>
            <a href="{{ .ConfirmationURL }}" style="background-color: #3b82f6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
                Réinitialiser mon mot de passe
            </a>
        </p>
        <p>Si vous n''avez pas demandé cette réinitialisation, vous pouvez ignorer cet email en toute sécurité.</p>
        <p>Ce lien expirera dans 24 heures.</p>
        <p>Cordialement,<br>L''équipe Aquabike Center</p>
    </body>
    </html>'
);

-- Create indices for better performance
CREATE INDEX IF NOT EXISTS idx_users_recovery_token ON auth.users(recovery_token);
CREATE INDEX IF NOT EXISTS idx_users_recovery_sent_at ON auth.users(recovery_sent_at);

-- Reset search path
SET search_path TO public;