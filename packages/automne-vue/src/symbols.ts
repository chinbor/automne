import type { InjectionKey } from 'vue'
import type { PluginOptions } from '@/plugin'

export const AUTOMNE_CONFIG = Symbol('AUTOMNE_CONFIG') as InjectionKey<PluginOptions>
