/*
  # Create Admin User

  1. Changes
    - Create or update admin user in auth.users
    - Create or update admin profile
    - Create or update auth identity without generated columns
    
  2. Security
    - Properly handle password encryption
    - Set up proper authentication metadata
*/

DO $$ 
DECLARE
  admin_email text := 'rbuffetto@gmail.com';
  admin_password text := 'Admin123!';
  new_user_id uuid;
BEGIN
  -- First, check if the user already exists in auth.users
  IF EXISTS (SELECT 1 FROM auth.users WHERE email = admin_email) THEN
    -- If exists, get the user id
    SELECT id INTO new_user_id FROM auth.users WHERE email = admin_email;
    
    -- Update the existing user
    UPDATE auth.users SET
      encrypted_password = crypt(admin_password, gen_salt('bf')),
      email_confirmed_at = now(),
      updated_at = now(),
      raw_app_meta_data = '{"provider":"email","providers":["email"]}'::jsonb,
      raw_user_meta_data = '{}'::jsonb,
      is_super_admin = false,
      role = 'authenticated',
      aud = 'authenticated'
    WHERE id = new_user_id;
  ELSE
    -- Create new user id
    new_user_id := gen_random_uuid();
    
    -- Insert new user into auth.users
    INSERT INTO auth.users (
      id,
      instance_id,
      email,
      encrypted_password,
      email_confirmed_at,
      created_at,
      updated_at,
      raw_app_meta_data,
      raw_user_meta_data,
      is_super_admin,
      role,
      aud,
      confirmation_token
    ) VALUES (
      new_user_id,
      '00000000-0000-0000-0000-000000000000',
      admin_email,
      crypt(admin_password, gen_salt('bf')),
      now(),
      now(),
      now(),
      '{"provider":"email","providers":["email"]}'::jsonb,
      '{}'::jsonb,
      false,
      'authenticated',
      'authenticated',
      encode(gen_random_bytes(32), 'hex')
    );
  END IF;

  -- Ensure user exists in profiles table with admin role
  INSERT INTO profiles (
    id,
    email,
    role,
    created_at
  ) VALUES (
    new_user_id,
    admin_email,
    'admin',
    now()
  )
  ON CONFLICT (id) DO UPDATE SET
    role = 'admin';

  -- Delete existing identity if exists
  DELETE FROM auth.identities 
  WHERE user_id = new_user_id AND provider = 'email';

  -- Create new identity
  INSERT INTO auth.identities (
    id,
    user_id,
    identity_data,
    provider,
    provider_id,
    created_at,
    updated_at,
    last_sign_in_at
  ) VALUES (
    new_user_id,
    new_user_id,
    jsonb_build_object('sub', new_user_id::text, 'email', admin_email),
    'email',
    admin_email,
    now(),
    now(),
    now()
  );

END $$;