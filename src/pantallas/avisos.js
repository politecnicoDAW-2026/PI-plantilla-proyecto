import { listarAvisos, publicarAviso } from '../datos.js';
import { mensajeDeError } from '../errores.js';

// Pantalla de ejemplo de la plantilla: en la K04 la cambiáis por la de vuestra primera historia.
export async function pantallaAvisos(contenedor, { perfil }) {
  const seccion = document.createElement('section');
  const titulo = document.createElement('h2');
  titulo.textContent = 'Avisos';
  const lista = document.createElement('ul');
  lista.className = 'avisos';
  seccion.append(titulo, lista);

  async function pintar() {
    try {
      const avisos = await listarAvisos();
      lista.replaceChildren(...avisos.map((aviso) => {
        const elemento = document.createElement('li');
        const cabecera = document.createElement('strong');
        cabecera.textContent = aviso.titulo; // textContent: el texto de un aviso nunca se interpreta como HTML
        const texto = document.createElement('p');
        texto.textContent = aviso.texto;
        elemento.append(cabecera, texto);
        return elemento;
      }));
      if (avisos.length === 0) lista.textContent = 'No hay avisos.';
    } catch (error) {
      lista.textContent = mensajeDeError(error);
    }
  }

  // El formulario solo se enseña a admin por comodidad: lo que impide publicar a los demás es la política
  if (perfil?.rol === 'admin') {
    const formulario = document.createElement('form');
    formulario.innerHTML = `
      <h3>Publicar un aviso</h3>
      <label>Título <input name="titulo" required maxlength="120"></label>
      <label>Texto <textarea name="texto" maxlength="2000"></textarea></label>
      <button type="submit">Publicar</button>
      <p class="error" role="alert"></p>`;
    formulario.addEventListener('submit', async (evento) => {
      evento.preventDefault();
      const datos = new FormData(formulario);
      const error = await publicarAviso(datos.get('titulo'), datos.get('texto'));
      formulario.querySelector('.error').textContent = mensajeDeError(error);
      if (!error) {
        formulario.reset();
        await pintar();
      }
    });
    seccion.append(formulario);
  }

  contenedor.replaceChildren(seccion);
  await pintar();
}
