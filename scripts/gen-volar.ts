import path from 'node:path'
import * as url from 'node:url'
import fs from 'fs-extra'
import { globbySync } from 'globby'
import { indent } from './utils'

const __dirname = url.fileURLToPath(new URL('.', import.meta.url))

const content = `declare module 'vue' {
  export interface GlobalComponents {
$components
  }
}

export  {}`

function genImportString(componentName: string) {
  return `${indent(4)}${componentName}: typeof import('automne-vue')['${componentName}']`
}

const automneVuePkgRoot = path.join(__dirname, '..', 'packages', 'automne-vue')

const automneVueComponentsDir = path.join(automneVuePkgRoot, 'src', 'components')

// NOTE: make sure "packages/automne-vue/src/components" has vue file
const componentsPath = globbySync(['**/*.vue'], { cwd: automneVueComponentsDir, absolute: true })
const componentNames = componentsPath.map(c => path.parse(c).name)

const imports = componentNames.map(c => genImportString(c))
const volarDTSContent = content.replace('$components', imports.join('\n'))

// Write files
fs.writeFileSync(path.join(automneVuePkgRoot, 'volar.d.ts'), volarDTSContent, { encoding: 'utf-8' })
