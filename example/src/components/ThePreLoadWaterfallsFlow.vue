<script setup lang="ts">
import type { DataProp } from 'automne-vue/dist/types/components/waterfalls-flow'

function randomRGB() {
  const r = Math.floor(Math.random() * 255)
  const g = Math.floor(Math.random() * 255)
  const b = Math.floor(Math.random() * 255)

  return `rgb(${r}, ${g}, ${b})`
}

const temp = [
  {
    name: '1',
    url: 'https://images.pexels.com/photos/15500487/pexels-photo-15500487.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  },
  {
    name: '2',
    url: 'https://images.pexels.com/photos/13562061/pexels-photo-13562061.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load',
  },
  {
    name: '3',
    url: 'https://images.pexels.com/photos/15656117/pexels-photo-15656117.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load',
  },
  {
    name: '4',
    url: 'https://images.pexels.com/photos/4916123/pexels-photo-4916123.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load',
  },
  {
    name: '5',
    url: 'https://images.pexels.com/photos/14737351/pexels-photo-14737351.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load',
  },
  {
    name: '6',
    url: 'https://images.pexels.com/photos/15953937/pexels-photo-15953937.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load',
  },
  {
    name: '7',
    url: 'https://images.pexels.com/photos/15804967/pexels-photo-15804967.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load',
  },
]

const data = ref<DataProp>([])
const loading = ref(false)
const isFinished = ref(false)

const imgSelector = 'a-waterfalls-img'
const { width } = useWindowSize()

const isPC = computed(() => {
  return width.value > 1280
})

function onload() {
  if (isFinished.value)
    return

  let timer: NodeJS.Timeout | null = setTimeout(() => {
    clearTimeout(timer!)
    timer = null
    const temp1 = JSON.parse(JSON.stringify(data.value))
    const temp2 = JSON.parse(JSON.stringify(temp))

    data.value = temp1.concat(...temp2)

    data.value.forEach((item, index) => {
      item.id = index
    })

    if (data.value.length > 70)
      isFinished.value = true

    loading.value = false
  }, 1500)
}

let timer: NodeJS.Timeout | null = setTimeout(() => {
  clearTimeout(timer!)
  timer = null

  const temp1 = JSON.parse(JSON.stringify(temp))

  temp1.forEach((item, index) => {
    item.id = index
  })

  data.value = temp1
}, 1000)
</script>

<template>
  <div class="max-w1280px mx-auto mt100px p10px box-border">
    <AList v-model="loading" :is-finished="isFinished" @onload="onload">
      <AWaterfallsFlow :data="data" node-key="id" :column="isPC ? 5 : 2" :pre-load="true" :img-selector="imgSelector">
        <template #default="{ columnWidth, index, item }">
          <div class="text-white rounded overflow-hidden" :style="{ backgroundColor: randomRGB() }">
            <!-- NOTE: 不能使用v-lazy指令（内部将img.src置为''），因为preload模式动态计算高度依赖于图片的加载完成！！ -->
            <img :class="imgSelector" :src="item.url" :alt="item.name">
            <span block text-white>index: {{ index }}</span>
            <span block text-white>columnWidth: {{ columnWidth }}</span>
            <span block text-white>name: {{ item.name }}</span>
          </div>
        </template>
      </AWaterfallsFlow>
      <template #loading>
        <ASvgLoading />
      </template>
    </AList>
  </div>
</template>
