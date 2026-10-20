-- Datos de prueba para la base de datos LOCAL (supabase start y supabase db reset). Todo inventado.
-- Nunca se carga en el proyecto de la nube. La contraseña de los dos usuarios: prueba-1234

insert into auth.users (instance_id, id, aud, role, email, encrypted_password, email_confirmed_at,
                        raw_app_meta_data, raw_user_meta_data, created_at, updated_at,
                        confirmation_token, email_change, email_change_token_new, recovery_token)
values
  ('00000000-0000-0000-0000-000000000000', '11111111-1111-1111-1111-111111111111', 'authenticated',
   'authenticated', 'usuario.prueba@example.invalid', extensions.crypt('prueba-1234', extensions.gen_salt('bf')),
   now(), '{"provider":"email","providers":["email"]}', '{}', now(), now(), '', '', '', ''),
  ('00000000-0000-0000-0000-000000000000', '22222222-2222-2222-2222-222222222222', 'authenticated',
   'authenticated', 'admin.prueba@example.invalid', extensions.crypt('prueba-1234', extensions.gen_salt('bf')),
   now(), '{"provider":"email","providers":["email"]}', '{}', now(), now(), '', '', '', '');

insert into auth.identities (id, user_id, provider_id, identity_data, provider, last_sign_in_at, created_at, updated_at)
select gen_random_uuid(), id, id::text, jsonb_build_object('sub', id::text, 'email', email), 'email', now(), now(), now()
from auth.users
where email like '%.prueba@example.invalid';

-- El trigger ya ha creado los perfiles con el rol por defecto: el segundo es admin
update public.perfiles set rol = 'admin' where usuario = 'admin.prueba';

insert into public.avisos (titulo, texto, autor_id) values
  ('Bienvenida', 'Este aviso viene de la semilla de datos de prueba.', '22222222-2222-2222-2222-222222222222');
