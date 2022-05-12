import { defineSidebarConfig } from "vuepress-theme-hope";

export default defineSidebarConfig({

  // 教你炒股
  "/stock/basic-knowledge/": [
    {
      text: "基础知识",
      icon: "creative",
      collapsable: false,
      children: ["k-line"],
    }
  ],

  // 学习笔记
  '/note/front-end/': [
    {
      text: '前端技术',
      collapsable: false,
      children: [
        'deploy-vuepress-from-github-to-ecs',
        'vue-ba-baidutongji',
      ]
    },
  ],
  // 后端技术
  '/note/back-end/': [
    {
      text: '后端技术',
      collapsable: false,
      children: [
        'elasticsearch/nested-query-and-or'
      ]
    },
  ],
  '/note/algorithm/': [
    {
      text: '算法技术',
      collapsable: false,
      children: [
        "embedding",
      ]
    },
  ],
  '/note/crawler/': [
    {
      text: '爬虫技术',
      collapsable: false,
      children: [
        'image-baidu-crawler',
        'book-crawler',
      ]
    },
  ],
  '/note/data/': [
    {
      text: '数据查询',
      collapsable: false,
      children: [
        'list-map-sql-hive',
        'url-parse-sql-hive',
      ]
    },
  ],
  '/note/tool/': [
    {
      text: "常用工具",
      collapsable: false,
      children: [
        "docker-for-nginx",
        "docker-for-mongo",
        "docker-for-mysql",
        "docker-for-kafka"
      ],
    }
  ],
});
