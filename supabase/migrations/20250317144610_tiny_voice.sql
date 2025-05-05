/*
  # Remove default admin user

  1. Changes
    - Remove admin@aquabike-center.fr from auth.identities
    - Remove admin@aquabike-center.fr from auth.users
    - Remove corresponding profile from profiles table
*/

-- Set proper search path
SET search_path TO auth, public;

DO $$ 
DECLARE
  admin_email text := 'admin@aquabike-center.fr';
  target_user_id uuid;
BEGIN
  -- Get the user ID
  SELECT id INTO target_user_id 
  FROM auth.users 
  WHERE email = admin_email;

  IF target_user_id IS NOT NULL THEN
    -- Delete from auth.identities first (due to foreign key constraint)
    DELETE FROM auth.identities 
    WHERE user_id = target_user_id;

    -- Delete from auth.users
    DELETE FROM auth.users 
    WHERE id = target_user_id;

    -- Delete from profiles
    DELETE FROM profiles 
    WHERE id = target_user_id;
  END IF;
END $$;

-- Reset search path
SET search_path TO public;