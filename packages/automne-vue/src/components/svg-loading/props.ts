import type { ExtractPropTypes } from 'vue'

export const svgLoadingProps = {
  width: {
    type: [Number, String] as PropType<string | number>,
    default: 50,
  },
  height: {
    type: [Number, String] as PropType<string | number>,
    default: 50,
  },
  outSideColor: {
    type: String,
    default: '#3be6cb',
  },
  inSideColor: {
    type: String,
    default: '#02bcfe',
  },
  duration: {
    type: [Number, String] as PropType<string | number>,
    default: 2,
  },
} as const

export type ASvgLoadingProps = ExtractPropTypes<typeof svgLoadingProps>
