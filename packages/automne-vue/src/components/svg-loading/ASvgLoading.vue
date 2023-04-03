<script setup lang="ts">
import { svgLoadingProps } from './props'

defineProps(svgLoadingProps)

defineOptions({
  name: 'ASvgLoading',
})
</script>

<template>
  <div class="flex flex-col justify-center items-center">
    <svg :width="width" :height="height" viewBox="0 0 50 50">
      <circle
        cx="25"
        cy="25"
        r="22"
        fill="none"
        stroke-width="3"
        :stroke="outSideColor"
        stroke-dasharray="34"
        stroke-linecap="round"
      >
        <animateTransform
          attributeName="transform"
          type="rotate"
          values="0 25 25;360 25 25"
          :dur="duration"
          repeatCount="indefinite"
        />
        <animate
          attributeName="stroke"
          :values="`${outSideColor};${inSideColor};${outSideColor}`"
          :dur="duration"
          repeatCount="indefinite"
        />
      </circle>
      <circle
        cx="25"
        cy="25"
        r="12"
        fill="none"
        stroke-width="3"
        :stroke="inSideColor"
        stroke-dasharray="19"
        stroke-linecap="round"
      >
        <animateTransform
          attributeName="transform"
          type="rotate"
          values="360 25 25;0 25 25"
          :dur="duration"
          repeatCount="indefinite"
        />
        <animate
          attributeName="stroke"
          :values="`${inSideColor};${outSideColor};${outSideColor}`"
          :dur="duration"
          repeatCount="indefinite"
        />
      </circle>
    </svg>
    <div class="a-loading-content">
      <slot />
    </div>
  </div>
</template>
