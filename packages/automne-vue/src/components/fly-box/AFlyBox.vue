<script setup lang="ts">
import { v4 as uuidv4 } from 'uuid'
import { flyBoxProps } from './props'

defineProps(flyBoxProps)

const width = ref(0)
const height = ref(0)
const maskID = `fly-box-mask-${uuidv4()}`
const flyBoxRef = ref<null | HTMLDivElement>(null)
const path = computed(() => {
  return `M0 0 L${width.value} 0 L${width.value} ${height.value} L0 ${height.value} Z`
})

onMounted(() => {
  width.value = flyBoxRef.value?.clientWidth as number
  height.value = flyBoxRef.value?.clientHeight as number
})

defineOptions({
  name: 'AFlyBox',
})
</script>

<template>
  <div ref="flyBoxRef" class="relative w100% h100%">
    <svg class="absolute top-0 left-0 w100% h100%" :width="width" :height="height">
      <defs>
        <path
          id="fly-box-path"
          :d="path"
          fill="none"
        />
        <radialGradient
          id="fly-box-light"
          cx="50%"
          cy="50%"
          fy="50%"
          fx="100%"
          r="50%"
        >
          <stop offset="0%" stop-color="#fff" stop-opacity="1" />
          <stop offset="100%" stop-color="#fff" stop-opacity="0" />
        </radialGradient>
        <mask :id="maskID">
          <circle :r="thumbLength" cx="0" cy="0" fill="url(#fly-box-light)">
            <animateMotion
              :dur="duration"
              :path="path"
              rotate="auto"
              repeatCount="indefinite"
            />
          </circle>
        </mask>
      </defs>
      <use
        href="#fly-box-path"
        :stroke-width="trackWidth"
        :stroke="trackColor"
      />
      <use
        href="#fly-box-path"
        :stroke-width="thumbWidth"
        :stroke="thumbColor"
        :mask="`url(#${maskID})`"
      />
    </svg>
    <div class="a-flyBox-content w100% h100%">
      <slot />
    </div>
  </div>
</template>
