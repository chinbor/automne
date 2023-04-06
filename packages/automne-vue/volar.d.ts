declare module 'vue' {
  export interface GlobalComponents {
    AFlyBox: typeof import('automne-vue')['AFlyBox']
    AFullContainer: typeof import('automne-vue')['AFullContainer']
    AList: typeof import('automne-vue')['AList']
    ASvgLoading: typeof import('automne-vue')['ASvgLoading']
    AWaterfallsFlow: typeof import('automne-vue')['AWaterfallsFlow']
  }
}

export  {}