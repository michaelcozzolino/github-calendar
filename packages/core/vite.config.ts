import { resolve }      from 'node:path';
import tailwindcss      from '@tailwindcss/vite';
import vue              from '@vitejs/plugin-vue';
import { defineConfig } from 'vite';

export default defineConfig({
    plugins: [
        vue(),
        tailwindcss({ optimize: { minify: false } }),
    ],
    resolve: {
        alias: {
            '@': resolve(__dirname, './src'),
        },
    },
    build: {
        outDir:       'dist',
        emptyOutDir:  false,
        cssCodeSplit: true,
        target:       'ESNext',
        lib:          {
            entry: resolve(__dirname, './src/index.ts'),
            name:  'github-calendar',
        },
    },
});
