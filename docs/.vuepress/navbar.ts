import { defineNavbarConfig } from "vuepress-theme-hope";

export default defineNavbarConfig([
  "/",
  {
    text: "学习笔记",
    icon: "note",
    prefix: "/note",
    children: [
      {
        text: "前端技术",
        icon: "diagram",
        link: "/front-end/"
      },
      {
        text: "后端技术",
        icon: "customize",
        link: "/back-end/"
      },
      {
        text: "数据查询",
        icon: "mysql",
        link: "/data/"
      },
      {
        text: "爬虫技术",
        icon: "debug",
        link: "/crawler/"
      },
      // {
      //   text: "算法技术",
      //   icon: "creative",
      //   link: "/algorithm/"
      // },
      {
        text: "常用工具",
        icon: "tool",
        link: "/tool/"
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
