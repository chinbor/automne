import type { ExtractPropTypes, PropType } from 'vue'

export interface optionsType {
  width: string | number
  height: string | number
}

export const fullContainerProps = {
  options: {
    type: [Object, undefined] as PropType<optionsType | undefined>,
  },
} as const

export type AFullContainerProps = ExtractPropTypes<typeof fullContainerProps>
