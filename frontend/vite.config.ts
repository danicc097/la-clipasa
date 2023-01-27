/// <reference types="vitest" />
import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv } from 'vite'
import dotenv from 'dotenv'
import tsconfigPaths from 'vite-tsconfig-paths'
import { resolve } from 'path'
import path from 'path'
import fs from 'fs'
import dynamicImport from 'vite-plugin-dynamic-import'

dotenv.config()

export default ({ mode }) => {
  // import.meta.env.VITE_PORT available here with: process.env.VITE_PORT
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) }

  return defineConfig({
    base: '/',
    plugins: [
      react({
        jsxImportSource: '@emotion/react',
        jsxRuntime: 'automatic',
        babel: {
          plugins: ['@emotion/babel-plugin'],
        },
      }),
      tsconfigPaths({ root: '.' }),
      dynamicImport({}),
      reactVirtualized(),
      reactTwitterEmbed(),
    ],
    server: {
      port: 5143,
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
      outDir: './dist',
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

// https://github.com/uber/baseweb/issues/4129#issuecomment-1208168306
const WRONG_CODE = `import { bpfrpt_proptype_WindowScroller } from "../WindowScroller.js";`
export function reactVirtualized() {
  return {
    name: 'my:react-virtualized',
    configResolved() {
      const file = require
        .resolve('react-virtualized')
        .replace(
          path.join('dist', 'commonjs', 'index.js'),
          path.join('dist', 'es', 'WindowScroller', 'utils', 'onScroll.js'),
        )
      const code = fs.readFileSync(file, 'utf-8')
      const modified = code.replace(WRONG_CODE, '')
      fs.writeFileSync(file, modified)
    },
  }
}

// https://github.com/uber/baseweb/issues/4129#issuecomment-1208168306
export function reactTwitterEmbed() {
  return {
    name: 'my:react-virtualized',
    configResolved() {
      const file = require
        .resolve('react-virtualized')
        .replace(
          path.join('dist', 'commonjs', 'index.js'),
          path.join('dist', 'es', 'WindowScroller', 'utils', 'onScroll.js'),
        )
      const code = fs.readFileSync(file, 'utf-8')
      const modified = code
        .replace(`require("scriptjs")`, `import('scriptjs')`)
        .replace(`require('scriptjs')`, `import('scriptjs')`)
      fs.writeFileSync(file, modified)
    },
  }
}
