/// <reference types="vitest" />
import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv } from 'vite'
import dotenv from 'dotenv'
import tsconfigPaths from 'vite-tsconfig-paths'
import { resolve } from 'path'
import dynamicImport from 'vite-plugin-dynamic-import'

dotenv.config()

export default ({ mode }) => {
  // import.meta.env.VITE_PORT available here with: process.env.VITE_PORT
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) }

  return defineConfig({
    base: '/',
    plugins: [
      // react({
      //   jsxImportSource: '@emotion/react',
      //   jsxRuntime: 'automatic',
      //   babel: {
      //     plugins: ['@emotion/babel-plugin'],
      //   },
      // }),
      tsconfigPaths({ root: '.' }),
      dynamicImport({}),
    ],
    server: {
      port: Number(process.env.VITE_PORT) || 5143,
      strictPort: true,
      // hmr: {
      //   protocol: 'wss',
      //   clientPort: 9443,
      // },
    },
    define: {
      'process.env.NODE_ENV': `"${mode}"`,
    },
    build: {
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true,
        },
      },
      outDir: './build',
      rollupOptions: {
        input: {
          main: resolve(__dirname, 'index.html'),
          // nested: resolve(__dirname, 'nested/index.html')
        },
        external: ['src/index.tsx'],
      },
      dynamicImportVarsOptions: {
        exclude: [],
      },
    },
  })
}
