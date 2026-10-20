// Todo lo que la web pide a Supabase pasa por aquí. Los permisos no se comprueban en este fichero: los deciden
// las políticas de la base de datos (supabase/migrations/). Si algo no está permitido, Supabase lo rechaza.
import { supabase } from './supabase.js';

export async function sesionActual() {
  const { data } = await supabase.auth.getSession();
  return data.session;
}

export async function entrar(correo, contrasena) {
  const { error } = await supabase.auth.signInWithPassword({ email: correo, password: contrasena });
  return error;
}

export async function salir() {
  await supabase.auth.signOut();
}

export async function miPerfil(idUsuario) {
  // Filtramos por id: admin ve todos los perfiles (su política lo permite) y aquí solo queremos el suyo
  const { data, error } = await supabase.from('perfiles').select('usuario, rol').eq('id', idUsuario).maybeSingle();
  if (error) throw error;
  return data;
}

export async function listarAvisos() {
  const { data, error } = await supabase
    .from('avisos')
    .select('id, titulo, texto, creado_en')
    .order('creado_en', { ascending: false });
  if (error) throw error;
  return data;
}

export async function publicarAviso(titulo, texto) {
  const { error } = await supabase.from('avisos').insert({ titulo, texto });
  return error;
}
