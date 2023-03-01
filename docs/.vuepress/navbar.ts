import { defineNavbarConfig } from "vuepress-theme-hope";

export default defineNavbarConfig([
  "/",
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
        link: "/indicator/"
      }
    ]
  }
]);
