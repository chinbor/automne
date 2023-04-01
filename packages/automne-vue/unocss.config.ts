import { defineConfig, presetAttributify, presetIcons, presetUno, transformerDirectives, transformerVariantGroup } from 'unocss'

export default defineConfig({
  presets: [
    presetAttributify(),
    presetIcons({
      cdn: 'https://esm.sh/',
    }),
    presetUno(),
  ],
  transformers: [transformerDirectives(), transformerVariantGroup()],
})
