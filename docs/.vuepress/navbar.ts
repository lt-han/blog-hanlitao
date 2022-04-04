import { defineNavbarConfig } from "vuepress-theme-hope";

export default defineNavbarConfig([
  "/",
  {
    text: "学习笔记",
    icon: "note",
    prefix: "/note",
    children: [
      {
        text: "nginx",
        link: "/nginx/"
      },
      {
        text: "爬虫",
        link: "/crawler/"
      },
      {
        text: "Hive",
        link: "/hive/"
      },
      {
        text: "vuepress",
        link: "/vuepress/"
      },
      {
        text: "vue",
        link: "/vue/"
      },
    ]
  },
  {
    text: "教你炒股",
    icon: "launch",
    prefix: "/stock",
    children: [
      {
        text: "基础知识",
        link: "/basic-knowledge/"
      },
      {
        text: "技术指标",
        link: "/basic-knowledge/"
      }
    ]
  },
  {
    text: '法律小工具',
    link: 'http://lawyer.hanlitao.com'
  }
]);
