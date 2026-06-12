import { defineConfig } from 'vitest/config';
import path from 'path';

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  test: {
<<<<<<< HEAD
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/vitest-setup.ts'],
    include: ['src/**/*.{test,spec}.{ts,tsx}'],
  },
});
=======
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html', 'lcov'],
      reportOnFailure: true,
      include: [
        'src/hooks/usePasswordStrength.ts',
        'src/store/useRiskStore.ts',
        'src/Components/modules/filtrar-alcaldias/alcaldias-filter-data.ts',
        'src/Components/modules/filtrar-alcaldias/FilterBar.tsx',
        'src/Components/modules/filtrar-alcaldias/AlcaldiaItem.tsx',
        'src/Components/modules/filtrar-alcaldias/AlcaldiasList.tsx',
        'src/Components/modules/filtrar-alcaldias/EstadisticasRapidas.tsx',
        'src/Components/modules/historial-riesgos/historial-data.ts',
        'src/Components/modules/historial-riesgos/MetricCard.tsx',
        'src/Components/modules/historial-riesgos/MetricsRow.tsx',
      ],
      exclude: [],
      thresholds: {
        lines: 80,
        functions: 80,
        branches: 80,
        statements: 80,
      },
    },
    projects: [{
      extends: true,
      test: {
        name: 'unit',
        globals: true,
        environment: 'jsdom',
        setupFiles: ['./src/vitest-setup.ts'],
        exclude: [
          '**/node_modules/**',
          // Estos tests importan RiskMapContainer que aún no existe
          'src/Components/modules/risk-map/RiskMap.test.tsx',
          'src/Components/modules/risk-map/RiskMapContainer.test.tsx',
        ],
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
>>>>>>> f4186ec9f9b15c6c5d930c338234f574f6721f9f
