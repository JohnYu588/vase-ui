module.exports = {
  base: '/vase-ui/',
  title: 'Vase UI',
  description: 'Inspiration from heian vase',
  head: [['link', { rel: 'icon', href: '/favicon.ico' }]],
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Github', link: 'https://github.com/JohnYu588/vase-ui/' },
    ],
    sidebar: [
      {
        title: '开发指南',
        collapsable: true,
        children: ['views/guide/install.md', 'views/guide/get-started.md'],
      },
      {
        title: '组件',
        collapsable: true,
        children: ['views/components/basic/'],
      },
    ],
  },
};
