import type { ComponentResolver } from 'unplugin-vue-components'

export function AutomneComponentResolver(): ComponentResolver {
  return {
    type: 'component',
    resolve: (name: string) => {
      if (name.match(/^A[A-Z]/))
        return { name, from: 'automne-vue' }
    },
  }
}
