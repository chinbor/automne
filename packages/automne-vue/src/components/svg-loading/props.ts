import type { ExtractPropTypes } from 'vue'

export const svgLoadingProps = {
  width: {
    type: String || Number,
    default: '',
  },
  height: {
    type: String,
    default: '',
  },
}

export type ASvgLoadingProps = ExtractPropTypes<typeof svgLoadingProps>
