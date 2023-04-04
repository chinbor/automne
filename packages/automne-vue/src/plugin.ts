import { defu } from 'defu'
import type { PartialDeep } from 'type-fest'
import type { App } from 'vue'
import * as components from '@/components'
import * as directives from '@/directives'
import { AUTOMNE_CONFIG } from '@/symbols'

export interface PluginOptions {
  registerComponents: boolean
}

const configDefaults: PluginOptions = {
  registerComponents: true,
  // TODO: add others props
}

export const plugin = {
  install(app: App, options: PartialDeep<PluginOptions> = {}) {
    const config = defu(options, configDefaults)

    if (config.registerComponents) {
      for (const prop in components) {
      // @ts-expect-error: I want to index import using string
        const component = components[prop]
        app.component(component.name, component)
      }
    }

    if (!config.registerComponents) {
      for (const prop in directives) {
        // @ts-expect-error: I want to index import using string
        const directive = directives[prop]
        app.directive(prop, directive)
      }
    }

    app.provide(AUTOMNE_CONFIG, config)
  },
}
