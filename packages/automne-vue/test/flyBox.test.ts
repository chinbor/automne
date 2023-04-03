import { describe, expect, test } from 'vitest'
import { mount } from '@vue/test-utils'
import { AFlyBox } from '../src/components'

describe('ASvgLoading', () => {
  // NOTE: 属性的测试用例类似，选中dom元素然后判断属性值是否跟传入相等
  test('ASvgLoading render test', () => {
    const wrapper = mount(AFlyBox, {
      slots: {
        default: () => 'content',
      },
    })

    expect(wrapper.find('.a-flyBox-content').text()).toBe('content')
  })
})
