import type { ExtractPropTypes } from 'vue'

export const waterflowProps = {
  title: {
    type: String,
    default: '',
  },
  description: {
    type: String,
    default: '',
  },
}

export type AWaterflowProps = ExtractPropTypes<typeof waterflowProps>
