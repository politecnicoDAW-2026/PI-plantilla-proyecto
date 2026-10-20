import { expect, test } from '@playwright/test';

// Necesita Supabase en local con la semilla (npm run db:start). Usuarios inventados de supabase/seed.sql.
const CONTRASENA = 'prueba-1234';

async function entrarComo(page, correo) {
  await page.goto('./');
  await page.getByLabel('Correo').fill(correo);
  await page.getByLabel('Contraseña').fill(CONTRASENA);
  await page.getByRole('button', { name: 'Entrar' }).click();
}

test('un usuario entra y lee los avisos, pero no puede publicar', async ({ page }) => {
  await entrarComo(page, 'usuario.prueba@example.invalid');
  await expect(page.getByRole('heading', { name: 'Avisos' })).toBeVisible();
  await expect(page.getByText('Bienvenida')).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Publicar un aviso' })).toHaveCount(0);
});

test('admin publica un aviso y aparece en la lista', async ({ page }) => {
  const titulo = `Aviso de prueba ${Date.now()}`;
  await entrarComo(page, 'admin.prueba@example.invalid');
  await page.getByLabel('Título').fill(titulo);
  await page.getByRole('button', { name: 'Publicar' }).click();
  await expect(page.getByText(titulo)).toBeVisible();
});
