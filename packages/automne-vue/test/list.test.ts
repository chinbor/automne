import { afterAll, beforeAll, describe, expect, test, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { nextTick, ref } from 'vue'
import { AList } from '../src/components'

const observeFn = vi.fn()
const entries = [{ isIntersecting: true }]

class MockObserver {
  constructor(fn) {
    fn(entries, this)
  }

  observe() {
    observeFn()
  }
}

beforeAll(() => {
  vi.stubGlobal('IntersectionObserver', MockObserver)
})

afterAll(() => {
  vi.unstubAllGlobals()
})

describe('AList', () => {
  test('IntersectionObserver', async () => {
    const observeOnload = vi.fn(() => 0)

    const wrapper = mount(
      {
        template: `
        <AList v-model="loading" @onload="onload" :isFinished="isFinished">
          <div class="list-item" v-for="item in data">{{item}}</div>
        </AList>
      `,
        components: {
          AList,
        },
        setup() {
          const loading = ref(false)
          const isFinished = ref(false)
          const test = [1, 2, 3, 4]
          const data = ref(test)

          const onload = () => {
            observeOnload()
            data.value.push(...test)
          }

          return { loading, isFinished, data, onload }
        },
      }, {
        attachTo: document.body,
      })

    const ele = wrapper.element
    expect(ele.getElementsByClassName('list-item').length).toBe(4)

    await nextTick()

    expect(observeOnload).toHaveBeenCalled()
    expect(observeFn).toHaveBeenCalled()
    expect(ele.getElementsByClassName('list-item').length).toBe(8)
  })
})
