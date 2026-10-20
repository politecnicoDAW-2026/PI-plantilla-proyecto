import { describe, expect, test } from 'vitest';
import { pantallaDe, rutaActual } from '../src/rutas.js';

describe('rutaActual', () => {
  test('sin hash es la portada', () => {
    expect(rutaActual('')).toBe('/');
    expect(rutaActual('#')).toBe('/');
    expect(rutaActual('#/')).toBe('/');
  });

  test('quita la almohadilla y asegura la barra inicial', () => {
    expect(rutaActual('#/avisos')).toBe('/avisos');
    expect(rutaActual('#avisos')).toBe('/avisos');
  });
});

describe('pantallaDe', () => {
  const pantallas = { '/': 'portada', '/avisos': 'avisos' };

  test('devuelve la pantalla de la ruta', () => {
    expect(pantallaDe('/avisos', pantallas)).toBe('avisos');
  });

  test('una ruta que no existe lleva a la portada', () => {
    expect(pantallaDe('/no-existe', pantallas)).toBe('portada');
  });
});
