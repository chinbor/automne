import { execSync } from 'node:child_process'
import consola from 'consola'
import { repoRoot } from './paths'

execSync('pnpm run clean', { stdio: 'inherit', cwd: repoRoot })
execSync('pnpm --filter automne-vue build', { stdio: 'inherit', cwd: repoRoot })

consola.success('Build complete!')
