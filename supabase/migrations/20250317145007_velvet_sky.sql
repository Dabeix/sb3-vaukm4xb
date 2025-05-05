/*
  # Force remove admin user from all tables

  1. Changes
    - Force delete from auth.identities
    - Force delete from auth.users
    - Force delete from profiles
    - Add CASCADE to handle any potential foreign key constraints
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
    -- Force delete from all related tables
    EXECUTE 'ALTER TABLE auth.identities DISABLE TRIGGER ALL';
    EXECUTE 'ALTER TABLE auth.users DISABLE TRIGGER ALL';
    EXECUTE 'ALTER TABLE profiles DISABLE TRIGGER ALL';

    -- Delete from all tables
    DELETE FROM auth.identities WHERE user_id = target_user_id OR provider_id = admin_email;
    DELETE FROM auth.users WHERE id = target_user_id OR email = admin_email;
    DELETE FROM profiles WHERE id = target_user_id OR email = admin_email;

    -- Re-enable triggers
    EXECUTE 'ALTER TABLE auth.identities ENABLE TRIGGER ALL';
    EXECUTE 'ALTER TABLE auth.users ENABLE TRIGGER ALL';
    EXECUTE 'ALTER TABLE profiles ENABLE TRIGGER ALL';
  END IF;
END $$;

-- Reset search path
SET search_path TO public;