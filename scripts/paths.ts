import path from 'node:path'
import * as url from 'node:url'

const __dirname = url.fileURLToPath(new URL('.', import.meta.url))

export const repoRoot = path.join(__dirname, '..')
export const automneVuePkgRoot = path.join(__dirname, '..', 'packages', 'automne-vue')
export const automneVueComponentsDir = path.join(automneVuePkgRoot, 'src', 'components')
