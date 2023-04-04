<script setup lang="ts">
import { listEmits, listProps } from './props'

const props = defineProps(listProps)

const emits = defineEmits(listEmits)

const loading = useVModel(props)

const anchor = ref<null | HTMLDivElement>(null)

useIntersectionObserver(anchor, ([{ isIntersecting }]) => {
  if (isIntersecting && !loading.value && !props.isFinished) {
    loading.value = true
    emits('onload')
  }
})

defineOptions({
  name: 'AList',
})
</script>

<template>
  <div>
    <slot />
    <div ref="anchor" h6 py4>
      <!-- loading -->
      <div v-show="loading" class="flex justify-center">
        <slot name="loading">
          <p text-center text-base text-zinc-400>
            loading...
          </p>
        </slot>
      </div>
      <!-- loaded -->
      <div v-if="isFinished" class="flex justify-center">
        <slot name="loaded">
          <p text-center text-base text-zinc-400>
            no more data ^.^
          </p>
        </slot>
      </div>
    </div>
  </div>
</template>
