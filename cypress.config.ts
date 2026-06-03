import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:5173',
    specPattern: 'cypress/e2e/**/*.cy.{ts,tsx}',
    supportFile: 'cypress/support/e2e.ts',
    viewportWidth: 1280,
    viewportHeight: 800,
    video: false,
    screenshotOnRunFailure: true,
    defaultCommandTimeout: 8000,
    requestTimeout: 10000,
    env: {
      // Credenciales de prueba
      TEST_USER_EMAIL: 'testuser@sanitek.com',
      TEST_USER_PASSWORD: 'TestPassword123!',
      TEST_ADMIN_EMAIL: 'admin@sanitek.com',
      TEST_ADMIN_PASSWORD: 'AdminPassword123!',
    },
  },
});
