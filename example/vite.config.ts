import { URL, fileURLToPath } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import UnoCSS from 'unocss/vite'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import { AutomneComponentResolver } from 'automne-vue'
import Layouts from 'vite-plugin-vue-layouts'
import Pages from 'vite-plugin-pages'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    UnoCSS(),
    AutoImport({
      imports: ['vue', 'vue-router', '@vueuse/core'],
      vueTemplate: true,
      dts: 'src/auto-imports.d.ts',
    }),
    Components({
      resolvers: [AutomneComponentResolver()],
      dts: 'src/components.d.ts',
    }),
    Layouts(),
    Pages(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
