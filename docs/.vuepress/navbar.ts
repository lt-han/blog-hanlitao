import { defineNavbarConfig } from "vuepress-theme-hope";

export default defineNavbarConfig([
  "/",
  {
    text: "算法工程师",
    icon: "debug",
    link: "/algorithm-engineer/README.md"
  },
  {
    text: "律师",
    icon: "config",
    link: "/lawyer/README.md"
  }
  ,
  {
    text: "金融分析师",
    icon: "launch",
    link: "/financial-analyst/README.md"
  }
]);
