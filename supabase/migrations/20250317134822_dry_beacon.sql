/*
  # Add Email Templates and Password Recovery Configuration

  1. Changes
    - Add email templates table
    - Add password reset email template
    - Configure password recovery settings
*/

-- Set proper search path
SET search_path TO auth, public;

-- Create email templates table
CREATE TABLE IF NOT EXISTS auth.email_templates (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    template_type text NOT NULL,
    subject text NOT NULL,
    content text NOT NULL,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

-- Create password reset email template
INSERT INTO auth.email_templates (template_type, subject, content)
VALUES (
    'password_reset',
    'Réinitialisation de votre mot de passe',
    '<!DOCTYPE html>
    <html>
    <body>
        <p>Bonjour,</p>
        <p>Vous avez demandé la réinitialisation de votre mot de passe.</p>
        <p>Cliquez sur le lien ci-dessous pour choisir un nouveau mot de passe :</p>
        <p><a href="{{ .ConfirmationURL }}">Réinitialiser mon mot de passe</a></p>
        <p>Si vous n''avez pas demandé cette réinitialisation, ignorez cet email.</p>
        <p>Cordialement,<br>L''équipe Aquabike Center</p>
    </body>
    </html>'
) ON CONFLICT DO NOTHING;

-- Add configuration for password recovery
CREATE TABLE IF NOT EXISTS auth.config (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    config_type text NOT NULL,
    config_value jsonb NOT NULL,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

-- Insert password recovery configuration
INSERT INTO auth.config (config_type, config_value)
VALUES (
    'password_recovery',
    '{
        "token_expiry_hours": 24,
        "minimum_password_length": 8,
        "require_confirmation": false
    }'::jsonb
) ON CONFLICT DO NOTHING;

-- Create function to handle password reset requests with proper error handling
CREATE OR REPLACE FUNCTION auth.handle_password_reset_request(
    user_email text,
    redirect_url text
) RETURNS void
    LANGUAGE plpgsql
    SECURITY DEFINER
    SET search_path = auth, public
AS $$
DECLARE
    _user_id uuid;
    _token text;
    _config jsonb;
BEGIN
    -- Get password recovery config
    SELECT config_value INTO _config
    FROM auth.config
    WHERE config_type = 'password_recovery'
    LIMIT 1;

    -- Get user by email
    SELECT id INTO _user_id
    FROM auth.users
    WHERE email = lower(user_email);

    IF _user_id IS NULL THEN
        -- Return silently to prevent email enumeration
        RETURN;
    END IF;

    -- Generate new recovery token
    _token := encode(gen_random_bytes(32), 'hex');

    -- Update user with recovery token
    UPDATE auth.users
    SET 
        recovery_token = _token,
        recovery_sent_at = now()
    WHERE id = _user_id;

    -- Note: Email sending is handled by Supabase service
END;
$$;

-- Grant necessary permissions
GRANT USAGE ON SCHEMA auth TO postgres, anon, authenticated, service_role;
GRANT ALL ON ALL TABLES IN SCHEMA auth TO postgres, service_role;
GRANT EXECUTE ON FUNCTION auth.handle_password_reset_request(text, text) TO postgres, service_role;

-- Create indices for better performance
CREATE INDEX IF NOT EXISTS email_templates_type_idx ON auth.email_templates(template_type);
CREATE INDEX IF NOT EXISTS config_type_idx ON auth.config(config_type);

-- Reset search path
SET search_path TO public;