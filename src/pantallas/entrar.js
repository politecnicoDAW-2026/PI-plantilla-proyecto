import { entrar } from '../datos.js';
import { mensajeDeError } from '../errores.js';

export function pantallaEntrar(contenedor, { alEntrar }) {
  const formulario = document.createElement('form');
  formulario.innerHTML = `
    <h2>Entrar</h2>
    <label>Correo <input name="correo" type="email" autocomplete="username" required></label>
    <label>Contraseña <input name="contrasena" type="password" autocomplete="current-password" required></label>
    <button type="submit">Entrar</button>
    <p class="error" role="alert"></p>`;
  formulario.addEventListener('submit', async (evento) => {
    evento.preventDefault();
    const datos = new FormData(formulario);
    const error = await entrar(datos.get('correo'), datos.get('contrasena'));
    // textContent, nunca innerHTML, con lo que viene de fuera: así no hay XSS
    formulario.querySelector('.error').textContent = mensajeDeError(error);
    if (!error) alEntrar();
  });
  contenedor.replaceChildren(formulario);
}
