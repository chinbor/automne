<script setup lang="ts">
import { svgLoadingProps } from './props'
defineProps(svgLoadingProps)

defineOptions({
  name: 'ASvgLoading',
})

defineSlots<{

  /**
 * Default slot for rendering alert content
 */
  default: {}
}>()
</script>

<template>
  <div>
    <svg width="200" height="200" view-box="0 0 50 50">
      <circle
        cx="25"
        cy="25"
        r="22"
        fill="none"
        stroke-width="3"
        stroke="#3be6cb"
        stroke-dasharray="34"
      />
      <circle
        cx="25"
        cy="25"
        r="12"
        fill="none"
        stroke-width="3"
        stroke="#02bcfe"
      />
    </svg>
  </div>
</template>
