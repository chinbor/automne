import { defineConfig, presetAttributify, presetIcons, presetTypography, presetUno, transformerDirectives, transformerVariantGroup } from 'unocss'

export default defineConfig({
  presets: [
    presetUno({ preflight: false }),
    presetAttributify(),
    presetIcons({
      scale: 1.1,
      cdn: 'https://esm.sh/',
    }),
    presetTypography(),
  ],
  transformers: [transformerVariantGroup(), transformerDirectives()],
  shortcuts: {
    'fcc': 'flex justify-center items-center',
    'button-base': 'fcc p8px gap-1 inline-flex cursor-pointer rounded leading-none bg-transparent text-[#606266] border border-[#dcdfe6] font-medium whitespace-nowrap text-center box-border select-none !focus:outline-none',
  },
})
