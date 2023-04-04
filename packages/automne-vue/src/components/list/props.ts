import type { ExtractPropTypes } from 'vue'

export const listProps = {
  modelValue: {
    type: Boolean,
    required: true,
  },
  isFinished: {
    type: Boolean,
    default: false,
  },
} as const

export type AListProps = ExtractPropTypes<typeof listProps>

export const listEmits = {
  'update:modelValue': (_value: Boolean) => true,
  'onload': () => true,
}
