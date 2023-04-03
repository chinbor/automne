import type { ExtractPropTypes } from 'vue'

export const flyBoxProps = {
  trackColor: {
    type: String,
    default: '#235fa7',
  },
  trackWidth: {
    type: [Number, String] as PropType<string | number>,
    default: 1,
  },
  thumbColor: {
    type: String,
    default: '#4fd2dd',
  },
  thumbWidth: {
    type: [Number, String] as PropType<string | number>,
    default: 3,
  },
  thumbLength: {
    type: [Number, String] as PropType<string | number>,
    default: 50,
  },
  duration: {
    type: [Number, String] as PropType<string | number>,
    default: 3,
  },
} as const

export type AFlyBoxProps = ExtractPropTypes<typeof flyBoxProps>
