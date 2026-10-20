// Traduce los errores de Supabase a un mensaje para la persona. Cuando escribáis funciones en la base de datos
// que lancen errores con nombre (raise exception 'TAQUILLA_NO_DISPONIBLE'), añadid aquí su mensaje.

const POR_CODIGO = {
  23505: 'Eso ya existe.',
  23514: 'Hay algún dato que no es válido. Revísalo.',
  42501: 'No tienes permiso para hacer esto.',
};

const POR_NOMBRE = {
  // EJEMPLO_DE_ERROR: 'Mensaje para la persona',
};

export function mensajeDeError(error) {
  if (!error) return '';
  if (POR_NOMBRE[error.message]) return POR_NOMBRE[error.message];
  if (POR_CODIGO[error.code]) return POR_CODIGO[error.code];
  if (error.code === 'invalid_credentials') return 'Usuario o contraseña incorrectos.';
  return 'Algo ha fallado. Inténtalo de nuevo y, si sigue pasando, avisa al grupo.';
}
