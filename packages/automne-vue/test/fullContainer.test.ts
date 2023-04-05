import { describe, expect, test, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { AFullContainer } from '../src/components'

describe('AFullContainer', () => {
  test('exist options props', async () => {
    const wrapper = mount(AFullContainer, {
      props: {
        options: {
          width: 3840,
          height: 2160,
        },

      },
    })

    // 因为 mount 需要使用 document.createElement，所以不能放在 beforeEach中
    vi.stubGlobal('document', { documentElement: { clientWidth: 100, clientHeight: 200 } })

    const evt = new CustomEvent('resize')

    window.dispatchEvent(evt)

    expect(wrapper.find('.a-full-container').attributes().style).toBe('width: 3840px; height: 2160px; transform: scale(0.026041666666666668, 0.09259259259259259);')

    vi.unstubAllGlobals()
  })

  test('no options props', async () => {
    const wrapper = mount(AFullContainer)

    vi.stubGlobal('document', { documentElement: { clientWidth: 100, clientHeight: 200 } })
    vi.stubGlobal('screen', { width: 2560, height: 1440 })

    const evt = new CustomEvent('resize')

    window.dispatchEvent(evt)

    expect(wrapper.find('.a-full-container').attributes().style).toBe('width: 2560px; height: 1440px; transform: scale(0.0390625, 0.1388888888888889);')

    vi.unstubAllGlobals()
  })
})
