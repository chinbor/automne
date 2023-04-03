<script setup lang="ts">
import { fullContainerProps } from './props'

const props = defineProps(fullContainerProps)

defineOptions({
  name: 'AFullContainer',
})

const wrapperRef = ref<null | HTMLDivElement>(null)
let screenWidth = 0
let screenHeight = 0
let realWidth = 0
let realHeight = 0

function updateScale() {
  if (!screenWidth || !screenHeight) {
    screenWidth = window.screen.width
    screenHeight = window.screen.height
  }

  if (!realWidth || !realHeight) {
    realWidth = props.options ? Number(props.options.width) : screenWidth
    realHeight = props.options ? Number(props.options.height) : screenHeight
    wrapperRef.value!.style.width = `${realWidth}px`
    wrapperRef.value!.style.height = `${realHeight}px`
  }

  const docWidth = document.documentElement.clientWidth
  const docHeight = document.documentElement.clientHeight

  const widthScale = docWidth / realWidth
  const heightScale = docHeight / realHeight

  wrapperRef.value!.style.transform = `scale(${widthScale}, ${heightScale})`
}

onMounted(() => {
  updateScale()
  window.addEventListener('resize', updateScale)
})

onUnmounted(() => {
  window.removeEventListener('resize', updateScale)
})
</script>

<template>
  <div ref="wrapperRef" class="a-full-container z999 fixed top-0 left-0 overflow-hidden transform-origin-lt">
    <slot />
  </div>
</template>
