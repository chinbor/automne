import { automne } from 'automne-vue'
import type { UserModule } from '../types'

export const install: UserModule = app => app.use(automne)
