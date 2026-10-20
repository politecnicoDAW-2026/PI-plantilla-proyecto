import { createClient } from '@supabase/supabase-js';

// La dirección del proyecto y la clave PÚBLICA llegan como variables de Vite (.env en local; variables del
// repositorio en GitHub para el despliegue). La clave secreta nunca va en la web: se salta todas las políticas.
const url = import.meta.env.VITE_SUPABASE_URL;
const clavePublica = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

export const configurado = Boolean(url && clavePublica);
export const supabase = configurado ? createClient(url, clavePublica) : null;
