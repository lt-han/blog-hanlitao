import { defineThemeConfig } from "vuepress-theme-hope";
import navbar from "./navbar";
import sidebar from "./sidebar";

export default defineThemeConfig({
  hostname: "https://vuepress-theme-hope-v2-demo.mrhope.site",

  author: {
    name: "hanlitao",
    url: "https://hanlitao.com",
  },

  iconPrefix: "iconfont icon-",

  logo: "/logo.svg",

  repo: "https://github.com/vuepress-theme-hope/vuepress-theme-hope",

  docsDir: "demo/src",

  // navbar
  navbar: navbar,

  // sidebar
  sidebar: sidebar,

  footer: '<a href="https://beian.miit.gov.cn/">京ICP备2021015740号-2</a>',

  displayFooter: true,

  lastUpdated: false,
  contributors: false,
  editLink: false,

  pageInfo: ["Author", "Original", "Date", "Category", "Tag", "ReadingTime"],
  encrypt: {
    config: {
      "/guide/encrypt.html": ["1234"],
    },
  },

  plugins: {
    blog: {
      autoExcerpt: true,
    },

    // 你也可以使用 Waline
    comment: {
      type: "giscus",
      repo: "vuepress-theme-hope/giscus-discussions",
      repoId: "R_kgDOG_Pt2A",
      category: "Announcements",
      categoryId: "DIC_kwDOG_Pt2M4COD69",
    },

    mdEnhance: {
      enableAll: true,
      presentation: {
        plugins: ["highlight", "math", "search", "notes", "zoom"],
      },
    },
  },
});
