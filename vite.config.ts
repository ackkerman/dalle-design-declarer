import { defineConfig } from 'vite';
import { builtinModules } from 'module';

export default defineConfig({
  build: {
    target: 'node16',
    lib: {
      entry: 'src/main.ts',
      formats: ['cjs'],
    },
    rollupOptions: {
      external: [
        ...builtinModules,         // fs, path, events, etc.
        'openai',
        'commander',
        'dotenv',
      ],
      output: {
        entryFileNames: 'main.js',
        banner: '#!/usr/bin/env node'
      }
    },
    outDir: 'dist',
    emptyOutDir: true,
    minify: false
  }
});
