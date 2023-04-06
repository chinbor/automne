# Automne

Implement some more creative components by vue3 and unocss.

## Usage

### Full Import

```sh
pnpm i automne-vue -S
```

Add `automne-vue` in your main entry file.

```ts
// main.ts
import { createApp } from 'vue'
import { automne } from 'automne-vue'
import 'automne-vue/dist/style.css'
import App from './App.vue'

createApp(App).use(automne).mount('#app')
```

### On-demand Import

You need to use an additional plugin to import components you used. First you need to install [unplugin-vue-components](https://www.npmjs.com/package/unplugin-vue-components).

```sh
pnpm i -D unplugin-vue-components
```

Then add the code below into your Vite config file.

```ts
// vite.config.ts
import { defineConfig } from 'vite'
import Components from 'unplugin-vue-components/vite'
import { AutomneComponentResolver } from 'automne-vue'

export default defineConfig({
  // ...
  plugins: [
    // ...
    Components({
      resolvers: [AutomneComponentResolver()],
    }),
  ],
})
```

## License

[MIT](https://github.com/chinbor/automne/blob/main/LICENSE) License © 2023 [chinbor](https://github.com/chinbor)
