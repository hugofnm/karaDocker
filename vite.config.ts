import react from '@vitejs/plugin-react';
import path from 'node:path';
import * as process from 'process';
import { visualizer } from 'rollup-plugin-visualizer';
import tsconfigPaths from 'vite-tsconfig-paths';
import { defineConfig } from 'vitest/config';
import routePaths from './src/routes/routePaths';
import { htmlPrerender } from './vite-plugin-html-prerender/src/index';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [
          '@emotion',
          // https://mui.com/material-ui/guides/minimizing-bundle-size/
          [
            'transform-imports',
            {
              '@mui/icons-material': {
                transform: '@mui/icons-material/${member}',
                preventFullImport: true,
              },
              '@mui/material': {
                transform: '@mui/material/${member}',
                preventFullImport: true,
              },
              'lodash-es': {
                transform: 'lodash-es/${member}',
                preventFullImport: true,
              },
            },
          ],
        ],
      },
      jsxImportSource: process.env.NODE_ENV === 'development' ? '@welldone-software/why-did-you-render' : undefined,
    }),
    tsconfigPaths(),
    visualizer(),

    process.env.VITE_APP_PRERENDER
      ? htmlPrerender({
          staticDir: path.join(__dirname, 'build'),
          routes: Object.values(routePaths).map((route) => `/${route}`),
          minify: {
            collapseBooleanAttributes: true,
            collapseWhitespace: true,
            decodeEntities: true,
            keepClosingSlash: true,
            sortAttributes: true,
          },
        })
      : null,
  ],
  base: '/',
  build: {
    outDir: 'build',
    sourcemap: !process.env.FAST_BUILD,
    reportCompressedSize: !process.env.FAST_BUILD,
  },
  server: {
    port: 3000,
    host: true,
    open: false
  },

  test: {
    include: ['**/*.test.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    globals: true,
    environment: 'happy-dom',
    setupFiles: 'src/setupTests.ts',
  },
});
