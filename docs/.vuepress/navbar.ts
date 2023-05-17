import { defineNavbarConfig } from "vuepress-theme-hope";

export default defineNavbarConfig([
  "/",
  {
    text: "教你炒股",
    icon: "launch",
    link: "/stock/README.md"
  },
  {
    text: "律师工具",
    icon: "config",
    link: "/lowyer/README.md"
  },
  {
    text: "程序员工具",
    icon: "debug",
    link: "/coder/README.md"
  }
]);
