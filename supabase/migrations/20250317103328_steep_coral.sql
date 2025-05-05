/*
  # Add new admin user

  1. Changes
    - Add rbuffetto@gmail.com as an admin user
*/

DO $$ 
DECLARE
  new_user_id uuid := gen_random_uuid();
BEGIN
  -- Create new admin user
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
    aud
  ) VALUES (
    new_user_id,
    '00000000-0000-0000-0000-000000000000',
    'rbuffetto@gmail.com',
    crypt('Admin123!', gen_salt('bf')),
    now(),
    now(),
    now(),
    '{"provider":"email","providers":["email"]}'::jsonb,
    '{}'::jsonb,
    false,
    'authenticated',
    'authenticated'
  );

  -- Create admin profile
  INSERT INTO profiles (
    id,
    email,
    role,
    created_at
  ) VALUES (
    new_user_id,
    'rbuffetto@gmail.com',
    'admin',
    now()
  );
END $$;