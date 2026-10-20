import { defineConfig, devices } from '@playwright/test';

// Los tests de extremo a extremo necesitan Supabase en local (npm run db:start) y estas dos variables,
// que el CI saca de «supabase status». Ver AGENTS.md.
const PUERTO = 4173;

export default defineConfig({
  testDir: 'e2e',
  use: { baseURL: `http://127.0.0.1:${PUERTO}` },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
  webServer: {
    command: `npm run build && npm run preview -- --host 127.0.0.1 --port ${PUERTO} --strictPort`,
    url: `http://127.0.0.1:${PUERTO}`,
    reuseExistingServer: false,
  },
});
