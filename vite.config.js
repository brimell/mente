import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import checker from 'vite-plugin-checker';

// ----------------------------------------------------------------------

export default defineConfig({
  plugins: [
    react(),
    checker({
      eslint: {
        lintCommand: 'eslint "./src/**/*.{js,jsx,ts,tsx}"',
      },
    }),
  ],
  optimizeDeps: {
    include: ['@emotion/react', '@emotion/styled', "@mui/material/Tooltip", "@mui/material/Unstable_Grid2"],
  },
  resolve: {
    alias: {
      '@': '/src',
      '@components': '/src/components',
      '@utils': '/src/utils',
      '@hooks': '/src/hooks',
      '@contexts': '/src/contexts',
      '@sections': '/src/sections',
      '@theme': '/src/theme',
      '@layouts': '/src/layouts',
      '@routes': '/src/routes',
      '@types': '/src/types',
      '@pages': '/src/pages',
    },
  },
  server: {
    port: 3030,
  },
  preview: {
    port: 3030,
  },
  build: {
    minify: 'terser', // Use terser for minification
    sourcemap: false, // Toggle source maps
    chunkSizeWarningLimit: 500, // Increase limit to 500kb before warning about chunk size
  },
});
