import { configurado } from './supabase.js';
import { sesionActual, miPerfil, salir } from './datos.js';
import { rutaActual, pantallaDe } from './rutas.js';
import { pantallaEntrar } from './pantallas/entrar.js';
import { pantallaAvisos } from './pantallas/avisos.js';

const app = document.querySelector('#app');
const zonaSesion = document.querySelector('#sesion');

// Las pantallas de la aplicación, por ruta. Añadid aquí las vuestras.
const PANTALLAS = {
  '/': pantallaAvisos,
};

async function pintar() {
  if (!configurado) {
    app.textContent = 'Falta configurar Supabase: VITE_SUPABASE_URL y VITE_SUPABASE_PUBLISHABLE_KEY (mira el README).';
    return;
  }
  const sesion = await sesionActual();
  if (!sesion) {
    zonaSesion.replaceChildren();
    pantallaEntrar(app, { alEntrar: pintar });
    return;
  }
  const perfil = await miPerfil(sesion.user.id);
  const boton = document.createElement('button');
  boton.textContent = `Salir (${perfil?.usuario ?? 'sin perfil'})`;
  boton.addEventListener('click', async () => {
    await salir();
    await pintar();
  });
  zonaSesion.replaceChildren(boton);
  const pantalla = pantallaDe(rutaActual(location.hash), PANTALLAS);
  await pantalla(app, { perfil });
}

window.addEventListener('hashchange', pintar);
pintar();
