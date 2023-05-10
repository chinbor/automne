<script setup lang="ts">
import { waterfallsFlowProps } from './props'
import { getMaxHeight, getMinHeight, getMinHeightColumn } from './utils'
import { getAllImgLinks, getImgs, onImgsLoaded } from '@/utils/helpers'

const props = defineProps(waterfallsFlowProps)

defineOptions({
  name: 'AWaterfallsFlow',
})

// 容器对象dom节点
const containerRef = ref<HTMLDivElement | null>(null)

// 容器总高度 & 宽度（不包含padding，margin，border）
const containerHeight = ref(0)
const containerWidth = ref(0)

// 容器的左边距，计算item的left值需要
const containerLeft = ref(0)

// 记录每列高度的容器
const columnHeightsObj = ref<Record<string, number>>({})

// item高度集合
let itemHeights: Array<number> = []

// 每列的宽度
const columnWidth = ref(0)

// 所有列间距的综合
const columnSpacingTotal = computed(() => {
  return (props.column - 1) * props.columnSpacing
})

// 初始化列高度容器对象
function initColumnHeightsObj() {
  columnHeightsObj.value = {}

  for (let i = 0; i < props.column; i++)
    columnHeightsObj.value[i] = 0
}

// 计算容器的宽度
function getContainerWidth() {
  const { paddingLeft, paddingRight } = getComputedStyle(containerRef.value!, null)

  containerLeft.value = parseFloat(paddingLeft)
  containerWidth.value = containerRef.value?.offsetWidth as number - parseFloat(paddingLeft) - parseFloat(paddingRight)
}

// 计算列宽
function getColumnWidth() {
  getContainerWidth()

  columnWidth.value = (containerWidth.value - columnSpacingTotal.value) / props.column
}

// 监听图片加载完成（需要图片预加载，没办法指定img标签的宽高！！）
function imgLoaded() {
  itemHeights = []

  // 拿到所有的list-item元素
  const itemElements = Array.from<HTMLDivElement>(document.getElementsByClassName('a-waterfall-item') as unknown as HTMLDivElement[])

  // 拿到所有的list-item中的img元素
  // NOTE: what if list-item contains many imgs ?
  const imgs = getImgs(itemElements, props.imgSelector)

  // 获取到所有图片链接
  const links = getAllImgLinks(imgs)

  // 等待图片加载完成
  onImgsLoaded(links).then(() => {
    itemElements.forEach((el) => {
      itemHeights.push(el.offsetHeight)
    })

    renderItemLocation()
  })
}

// 不需要图片预加载（外部编写img组件显示的传入了宽高！！）
function initItemHeight() {
  itemHeights = []

  const itemElements = Array.from<HTMLDivElement>(document.getElementsByClassName('a-waterfall-item') as unknown as HTMLDivElement[])

  itemElements.forEach((el) => {
    itemHeights.push(el.offsetHeight)
  })

  renderItemLocation()
}

function renderItemLocation() {
  props.data.forEach((item, index) => {
    if (!item._style) {
      item._style = {}
      item._style.left = getItemLeft()
      item._style.top = getItemTop()
      increasingColumnHeight(index)
    }
  })

  containerHeight.value = getMaxHeight(columnHeightsObj.value)
}

function increasingColumnHeight(index: number) {
  const column = getMinHeightColumn(columnHeightsObj.value)

  columnHeightsObj.value[column] += (itemHeights[index] + props.rowSpacing)
}

function getItemLeft() {
  const column = getMinHeightColumn(columnHeightsObj.value)

  return Number(column) * (columnWidth.value + props.columnSpacing) + containerLeft.value
}

function getItemTop() {
  return getMinHeight(columnHeightsObj.value)
}

onMounted(() => {
  getColumnWidth()
})

onUnmounted(() => {
  props.data.forEach((item) => {
    delete item._style
  })
})

// 当数据变化需要触发重新计算高度
watch(() => props.data, async (newVal) => {
  await nextTick()

  // 只有所有元素不存在_style才触发initColumnHeightsObj，分页加载后续的元素不会触发！
  const isReset = newVal.every(item => !item._style)

  if (isReset)
    initColumnHeightsObj()

  if (props.preLoad) {
    imgLoaded()
    return
  }

  initItemHeight()
}, {
  deep: true,
  immediate: true,
})

function reset() {
  columnWidth.value = 0

  // HACK: to repaint
  let timer: NodeJS.Timeout | null = setTimeout(() => {
    clearTimeout(timer!)
    timer = null

    // 重新计算列宽
    getColumnWidth()
    props.data.forEach((item) => {
      item._style = null
    })
  }, 100)
}

// 监听列数的改变（处理移动端，pc端切换适配问题）
watch(() => props.column, async () => {
  reset()
})

// NOTE: https://github.com/vuejs/language-tools/pull/3116
defineSlots<{
  // slot name
  default: (_: {
    item: Record<string, any>
    columnWidth: number
    index: number
  }) => any
}>()
</script>

<template>
  <div ref="containerRef" class="relative" :style="{ height: `${containerHeight}px` }">
    <template v-if="columnWidth && data.length">
      <div
        v-for="(item, index) in data"
        :key="nodeKey ? item[nodeKey] : index"
        class="a-waterfall-item absolute duration-3000  "
        :style="{
          width: `${columnWidth}px`,
          left: `${item._style?.left}px`,
          top: `${item._style?.top}px`,
        }"
      >
        <slot :item="item" :column-width="columnWidth" :index="index" />
      </div>
    </template>
  </div>
</template>
