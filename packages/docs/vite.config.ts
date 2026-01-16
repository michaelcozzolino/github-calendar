import { resolve } from 'node:path';

import tailwindcss      from '@tailwindcss/vite';
import vue              from '@vitejs/plugin-vue';
import { defineConfig } from 'vite';

export default defineConfig({
    plugins: [
        vue({
            template: {
                compilerOptions: {
                    isCustomElement: (tag: string): boolean => tag === 'github-calendar',
                },
            },
        }),
        tailwindcss(),
    ],
    resolve: {
        alias: {
            '@': resolve(__dirname, './src'),
        },
    },
});
