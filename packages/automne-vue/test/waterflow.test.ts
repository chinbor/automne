import { describe, expect, test } from 'vitest'
import { mount } from '@vue/test-utils'
import { AWaterflow } from '../src/components'

const title = '瀑布流组件'
const description = '我是一个基于unocss、vue3实现的瀑布流组件'

describe('a-waterflow', () => {
  test('waterflow render test', () => {
    const wrapper = mount(AWaterflow, {
      props: {
        title,
        description,
      },
    })

    expect(wrapper.find('.a-waterflow-content').text()).toBe(title + description)
  })
})
