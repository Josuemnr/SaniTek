import { defineConfig } from 'vitest/config';
import path from 'path';
import { fileURLToPath } from 'node:url';
import { storybookTest } from '@storybook/addon-vitest/vitest-plugin';
const dirname = typeof __dirname !== 'undefined' ? __dirname : path.dirname(fileURLToPath(import.meta.url));

// More info at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon
export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src")
    }
  },
  test: {
    // ── Cobertura de código ────────────────────────────────────────────────
    // Ejecutar con: npx vitest run --coverage
    // El reporte HTML queda en ./coverage/index.html
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html'],   // tabla en terminal + HTML navegable
      include: ['src/Components/**/*.tsx'],
      exclude: [
        'src/Components/**/*.stories.tsx', // excluir stories de Storybook
        'src/Components/**/*.test.tsx',    // excluir los propios tests
        'src/Components/ui/**',            // excluir componentes de shadcn/ui generados
      ],
    },
    workspace: [{
      extends: true,
      test: {
        name: 'unit',   // ← nombre para poder filtrarlo con --project unit
        globals: true,
        environment: 'jsdom',
        setupFiles: ['./src/vitest-setup.ts']
      }
    }, {
      extends: true,
      plugins: [
      // The plugin will run tests for the stories defined in your Storybook config
      // See options at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon#storybooktest
      storybookTest({
        configDir: path.join(dirname, '.storybook')
      })],
      test: {
        name: 'storybook',
        browser: {
          enabled: true,
          headless: true,
          provider: 'playwright',
          instances: [{
            browser: 'chromium'
          }]
        }
      }
    }]
  }
});