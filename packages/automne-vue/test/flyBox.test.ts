import { describe, expect, test } from 'vitest'
import { mount } from '@vue/test-utils'
import { AFlyBox } from '../src/components'

describe('AFlyBox', () => {
  // NOTE: 属性的测试用例类似，选中dom元素然后判断属性值是否跟传入相等
  test('AFlyBox render slot', () => {
    const wrapper = mount(AFlyBox, {
      slots: {
        default: () => 'content 123',
      },
    })

    expect(wrapper.find('.a-flyBox-content').text()).toBe('content 123')
  })

  test('ID unique', () => {
    const wrapper1 = mount(AFlyBox, {
      slots: {
        default: () => 'content 123',
      },
    })

    const wrapper2 = mount(AFlyBox, {
      slots: {
        default: () => 'content 123',
      },
    })

    const path1ID = wrapper1.find('path').attributes().id
    const light1ID = wrapper1.find('radialGradient').attributes().id
    const mask1ID = wrapper1.find('mask').attributes().id
    const path2ID = wrapper2.find('path').attributes().id
    const light2ID = wrapper2.find('radialGradient').attributes().id
    const mask2ID = wrapper2.find('mask').attributes().id

    expect(path1ID !== path2ID).toBeTruthy()
    expect(light1ID !== light2ID).toBeTruthy()
    expect(mask1ID !== mask2ID).toBeTruthy()
  })
})
