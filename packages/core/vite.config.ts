import { defineConfig } from 'vite'
import vue              from '@vitejs/plugin-vue'
import tailwindcss      from '@tailwindcss/vite'
import { resolve }      from "node:path";

// https://vite.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        tailwindcss(),
    ],
    resolve: {
        alias: {
            '@': resolve(__dirname, './src')
        },
    },
    build:   {
        outDir:        'dist',
        emptyOutDir:   false,
        cssCodeSplit:  true,
        target:        'ESNext',
        lib:           {
            entry: resolve(__dirname, './src/index.ts'),
            name:  'vue-github-calendar',
        },
        rollupOptions: {
            external: ['vue', 'tailwindcss'],
            output:   {
                globals: {
                    'vue': 'Vue',
                },
            },
        },
    },
});
