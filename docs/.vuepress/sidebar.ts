import { defineSidebarConfig } from "vuepress-theme-hope";

export default defineSidebarConfig({

  "/basic-knowledge/": [
    {
      text: "基础知识",
      icon: "creative",
      collapsable: true,
      children: ["k-line"],
    }
  ]
});
