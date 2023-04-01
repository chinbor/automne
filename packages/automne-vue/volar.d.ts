declare module 'vue' {
  export interface GlobalComponents {
    AWaterflow: typeof import('automne-vue')['AWaterflow']
  }
}

export  {}