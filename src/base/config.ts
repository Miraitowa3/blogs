export type NavbarItem = {
  text: string
  icon?: string
  link?: string
  children?: NavbarItem[]
}

export type ConfigType = {
  navbar: NavbarItem[]
}

export const config: ConfigType = {
  navbar: [
    { text: '搜索', link: '/', icon: 'sousuo' },

    { text: '首页', link: '/', icon: 'home' },
    {
      text: '娱乐', icon: 'yule', children: [
        { text: '娱乐', icon: 'yule', link: '/' },
        { text: 'youlian', icon: 'youlian', link: '/' }
      ]
    },
    { text: '友链', link: '/', icon: 'youlian' },

    { text: '后台', link: '/', icon: 'houtaiguanli-houtaiguanli' },
    { text: '登录', link: '/', icon: 'denglu' },


  ]
}
