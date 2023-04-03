import { describe, expect, test } from 'vitest'
import { mount } from '@vue/test-utils'
import { ASvgLoading } from '../src/components'

describe('ASvgLoading', () => {
  // NOTE: 属性的测试用例类似，不过选中元素然后判断属性值是否跟传入相等
  test('ASvgLoading render slot', () => {
    const wrapper = mount(ASvgLoading, {
      slots: {
        default: () => 'content',
      },
    })

    expect(wrapper.find('.a-loading-content').text()).toBe('content')
  })
})
