import { resolve } from 'node:path'
import { URL, fileURLToPath } from 'node:url'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import AutoImport from 'unplugin-auto-import/vite'
import { defineConfig } from 'vitest/config'
import UnoCSS from 'unocss/vite'
// @ts-expect-error: something wrong, but I need it
import DefineOptions from 'unplugin-vue-define-options/vite'

const externals = [
  'vue',
  'defu',
  'uuid',
]

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    // target: 'esnext',
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'automne-vue',
      fileName: 'automne-vue',
    },
    emptyOutDir: false,
    outDir: 'dist',
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: externals,
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          vue: 'Vue',
          defu: 'Defu',
          uuid: 'Uuid',
        },
      },
    },
  },
  // https://cn.vitejs.dev/config/shared-options.html#esbuild
  // https://esbuild.github.io/api/#keep-names
  // BUG(暂时不知道怎么解决啊):
  // vite默认打包使用的esbuild，打包后会自动压缩标识符，我们需要保留原有名字避免生成 标识符h 与 h函数冲突
  esbuild: {
    minifyIdentifiers: false,
    keepNames: true,
  },
  plugins: [
    vue(),
    vueJsx(),
    UnoCSS(),
    AutoImport({
      imports: ['vue', '@vueuse/core'],
    }),
    DefineOptions(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    // setupFiles: ['./test/setup.vitest.ts'],
    transformMode: {
      web: [/.[tj]sx$/],
    },
  },
})
