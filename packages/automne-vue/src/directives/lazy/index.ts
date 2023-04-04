import type { Directive } from 'vue'

export const lazy: Directive = {
  mounted(el) {
    // 1. 拿到当前 img 标签的 src
    const imgSrc = el.src

    // 2. 把 img 标签的 src 替换为本地地址
    el.src = ''

    const { stop } = useIntersectionObserver(el, ([{ isIntersecting }]) => {
      if (isIntersecting) {
        el.src = imgSrc
        stop()
      }
    })
  },
}
