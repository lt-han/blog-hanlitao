import { defineThemeConfig } from "vuepress-theme-hope";
import navbar from "./navbar";
import sidebar from "./sidebar";

export default defineThemeConfig({
  // pure: true, // 纯净模式
  // darkmode: "auto-switch",

  // 是否在导航栏内显示仓库链接，默认为 `true`
  // repoDisplay: false,
  // "GitHub" / "GitLab" / "Gitee" / "Bitbucket" 其中之一，或是 "Source"。
  // repoLabel: "GitHub",
  // 默认为 GitHub. 同时也可以是一个完整的 URL
  // repo: "https://github.com/lt-han",

  hostname: "https://www.hanlitao.com",

  author: {
    name: "hanlitao",
    url: "https://www.hanlitao.com",
  },

  blog: {
    avatar: "/logo.png",
    name: "小妖",
    roundAvatar: true,
    sidebarDisplay: "mobile",
    medias: {
      // Zhihu: "https://www.zhihu.com/people/lthan",
      // Github: "https://github.com/lt-han",
    },
  },

  iconPrefix: "iconfont icon-",

  logo: "/logo.svg",



  // docsDir: "demo/src",

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

  // 加密文档
  // encrypt: {
  //   config: {
  //     "/stock/basic-knowledge": ["1234"],
  //   },
  // },

  plugins: {
    blog: {
      autoExcerpt: true,
    },

    // pwa: true, // 渐进式网络应用程序

    // 暂时禁用评价
    comment: false,

    mdEnhance: {
      enableAll: true,
      presentation: {
        plugins: ["highlight", "math", "search", "notes", "zoom"],
      },
    },
  },
});
