/*
  # Ajout d'un compte administrateur par défaut

  1. Changements
    - Création d'un utilisateur admin avec email et mot de passe prédéfinis
    - Attribution du rôle admin dans la table profiles
*/

-- Créer l'utilisateur admin via auth.users
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
  role
) VALUES (
  '00000000-0000-0000-0000-000000000000',
  '00000000-0000-0000-0000-000000000000',
  'admin@aquabike-center.fr',
  crypt('admin123', gen_salt('bf')),
  now(),
  now(),
  now(),
  '{"provider":"email","providers":["email"]}',
  '{}',
  false,
  'authenticated'
) ON CONFLICT (id) DO NOTHING;

-- Ajouter l'entrée correspondante dans profiles
INSERT INTO profiles (
  id,
  email,
  role,
  created_at
) VALUES (
  '00000000-0000-0000-0000-000000000000',
  'admin@aquabike-center.fr',
  'admin',
  now()
) ON CONFLICT (id) DO NOTHING;