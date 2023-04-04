import type { ExtractPropTypes, PropType } from 'vue'

export type DataProp = Array<Record<string, any>>

export const waterfallsFlowProps = {
  data: {
    type: Array as PropType<DataProp>,
    required: true,
  },
  nodeKey: {
    type: String,
  },
  column: {
    type: Number,
    default: 2,
  },
  columnSpacing: {
    type: Number,
    default: 20,
  },
  rowSpacing: {
    type: Number,
    default: 20,
  },
  // 需要图片预加载（图片高度未知），不需要图片预加载（图片高度已知）
  preLoad: {
    type: Boolean,
    default: true,
  },
  imgSelector: {
    type: String,
    required: true,
  },
} as const

export type AWaterfallsFlowProps = ExtractPropTypes<typeof waterfallsFlowProps>
