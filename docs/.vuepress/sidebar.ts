import { defineSidebarConfig } from "vuepress-theme-hope";

export default defineSidebarConfig({

  // 教你炒股
  "/stock/basic-knowledge/": [
    {
      text: "基础知识",
      icon: "creative",
      collapsable: true,
      children: ["k-line"],
    }
  ],

  // 学习笔记
  '/note/front-end/': [
    {
      text: '前端技术',
      collapsable: true,
      children: [
        'deploy-vuepress-from-github-to-ecs',
        'vue-ba-baidutongji',
      ]
    },
  ],
  '/note/back-end/': [
    {
      text: '后端技术',
      collapsable: true,
      children: [

      ]
    },
  ],
  '/note/algorithm/': [
    {
      text: '算法技术',
      collapsable: true,
      children: [
        "embedding",
      ]
    },
  ],
  '/note/crawler/': [
    {
      text: '爬虫技术',
      collapsable: true,
      children: [
        'image-baidu-crawler',
        'book-crawler',
      ]
    },
  ],
  '/note/data/': [
    {
      text: '数据查询',
      collapsable: true,
      children: [
        'list-map-sql-hive',
        'url-parse-sql-hive',
      ]
    },
  ],
  '/note/tool/': [
    {
      text: "常用工具",
      collapsable: true,
      children: ["docker-for-nginx"],
    }
  ],
});
