import { defineSidebarConfig } from "vuepress-theme-hope";

export default defineSidebarConfig({

  "/stock/basic-knowledge/": [
    {
      text: "基础知识",
      icon: "creative",
      collapsable: true,
      children: ["k-line"],
    }
  ],
  '/note/nginx/': [
    {
      text: "nginx 笔记",
      collapsable: true,
      children: ["docker-for-nginx"],
    }
  ],
  '/note/crawler/': [
    {
      text: '爬虫笔记',
      collapsable: true,
      children: [
        'image-baidu-crawler',
        'book-crawler',
      ]
    },
  ],
  '/note/hive/': [
    {
      text: 'hive查询',
      collapsable: true,
      children: [
        'list-map-sql-hive',
        'url-parse-sql-hive',
      ]
    },
  ],
  '/note/vuepress/': [
    {
      text: 'vuepress建站',
      collapsable: true,
      children: [
        'deploy-vuepress-from-github-to-ecs',
      ]
    },
  ],
  '/note/vue/': [
    {
      text: 'vue建站',
      collapsable: true,
      children: [
        'vue-ba-baidutongji',
      ]
    },
  ]
});
