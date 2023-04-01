<script setup lang="ts">
import { waterflowProps } from './props'
defineProps(waterflowProps)

defineOptions({
  name: 'AWaterflow',
})
</script>

<template>
  <div text-amber class="a-waterflow-content">
    {{ title + description }}
  </div>
</template>
