import { expect, test } from 'vitest';
import { mensajeDeError } from '../src/errores.js';

test('sin error no hay mensaje', () => {
  expect(mensajeDeError(null)).toBe('');
});

test('traduce los códigos de Postgres que devuelve Supabase', () => {
  expect(mensajeDeError({ code: '42501', message: 'permission denied for table avisos' }))
    .toBe('No tienes permiso para hacer esto.');
  expect(mensajeDeError({ code: '23514', message: 'new row violates check constraint' }))
    .toBe('Hay algún dato que no es válido. Revísalo.');
});

test('las credenciales incorrectas tienen su propio mensaje', () => {
  expect(mensajeDeError({ code: 'invalid_credentials', message: 'Invalid login credentials' }))
    .toBe('Usuario o contraseña incorrectos.');
});

test('un error desconocido no enseña detalles internos', () => {
  const mensaje = mensajeDeError({ code: 'XX000', message: 'detalle interno de Postgres' });
  expect(mensaje).not.toContain('Postgres');
});
