import { describe, test } from 'vitest'
import { mount } from '@vue/test-utils'
import { ASvgLoading } from '../src/components'

const title = 'svgLoading组件'
const description = '我是一个基于unocss、vue3实现的svgLoading组件'

describe('a-waterflow', () => {
  test('waterflow render test', () => {
    const wrapper = mount(ASvgLoading, {
      props: {
        title,
        description,
      },
    })
  })
})
