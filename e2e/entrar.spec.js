import { expect, test } from '@playwright/test';

// Entrar y salir no depende de ninguna tabla vuestra: este test se queda cuando quitéis los avisos.
// Necesita Supabase en local con la semilla (npm run db:start). Usuario inventado de supabase/seed.sql.
const CORREO = 'usuario.prueba@example.invalid';
const USUARIO = 'usuario.prueba';

async function rellenar(page, contrasena) {
  await page.goto('./');
  await page.getByLabel('Correo').fill(CORREO);
  await page.getByLabel('Contraseña').fill(contrasena);
  await page.getByRole('button', { name: 'Entrar' }).click();
}

test('un usuario de prueba entra y sale', async ({ page }) => {
  await rellenar(page, 'prueba-1234');
  await page.getByRole('button', { name: `Salir (${USUARIO})` }).click();
  await expect(page.getByRole('heading', { name: 'Entrar' })).toBeVisible();
});

test('con una contraseña equivocada no entra y lo dice', async ({ page }) => {
  await rellenar(page, 'no-es-la-contrasena');
  await expect(page.getByRole('alert')).toHaveText('Usuario o contraseña incorrectos.');
  await expect(page.getByRole('button', { name: /^Salir/ })).toHaveCount(0);
});
