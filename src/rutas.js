// Navegación con # (#/avisos, #/entrar): funciona en GitHub Pages sin configurar nada en el servidor.

/** Convierte el hash de la URL en una ruta: '' → '/', '#/avisos' → '/avisos', '#entrar' → '/entrar'. */
export function rutaActual(hash) {
  const ruta = (hash ?? '').replace(/^#/, '');
  if (ruta === '' || ruta === '/') return '/';
  return ruta.startsWith('/') ? ruta : `/${ruta}`;
}

/** Elige la pantalla de una ruta; si no existe, la de '/'. */
export function pantallaDe(ruta, pantallas) {
  return pantallas[ruta] ?? pantallas['/'];
}
