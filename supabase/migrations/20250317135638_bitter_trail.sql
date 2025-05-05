-- Set proper search path
SET search_path TO auth, public;

DO $$ 
DECLARE
  admin_email text := 'jberner30@gmail.com';
  admin_password text := 'Admin123!';
  new_user_id uuid;
BEGIN
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
    -- Use a pre-hashed password instead of gen_salt
    '$2a$10$RiUI.c6PvWMBEbQtIZJ3b.FT7wMdR1Hy/XZnUVHI.oICMYJUHEkqO',
    now(),
    now(),
    now(),
    '{"provider":"email","providers":["email"]}'::jsonb,
    '{}'::jsonb,
    false,
    'authenticated',
    'authenticated',
    md5(random()::text) -- Use md5 instead of gen_random_bytes
  );

  -- Create profile with admin role
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
  );

  -- Create identity
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

-- Reset search path
SET search_path TO public;