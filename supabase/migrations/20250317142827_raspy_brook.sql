/*
  # Make additional user super admin

  1. Changes
    - Update jberner30@gmail.com to be super admin
    - Update profile to ensure admin role
    - Add additional admin privileges
*/

-- Set proper search path
SET search_path TO auth, public;

DO $$ 
DECLARE
  admin_email text := 'jberner30@gmail.com';
  user_id uuid;
BEGIN
  -- Get the user's ID
  SELECT id INTO user_id FROM auth.users WHERE email = admin_email;

  IF user_id IS NULL THEN
    RAISE EXCEPTION 'User not found';
  END IF;

  -- Update auth.users to make the user a super admin
  UPDATE auth.users
  SET 
    is_super_admin = true,
    raw_app_meta_data = raw_app_meta_data || '{"is_super_admin":true}'::jsonb,
    updated_at = now()
  WHERE id = user_id;

  -- Ensure user has admin profile
  UPDATE profiles
  SET role = 'admin'
  WHERE id = user_id;

END $$;

-- Reset search path
SET search_path TO public;