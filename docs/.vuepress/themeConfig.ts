import { defineThemeConfig } from "vuepress-theme-hope";
import navbar from "./navbar";
import sidebar from "./sidebar";

export default defineThemeConfig({
  // pure: true, // 纯净模式
  // darkmode: "auto-switch",

  // 是否在导航栏内显示仓库链接，默认为 `true`
  repoDisplay: false,
  // "GitHub" / "GitLab" / "Gitee" / "Bitbucket" 其中之一，或是 "Source"。
  repoLabel: "GitHub",
  // 默认为 GitHub. 同时也可以是一个完整的 URL
  repo: "https://github.com/lt-han",

  hostname: "https://www.hanlitao.com",

  author: {
    name: "hanlitao",
    url: "https://www.hanlitao.com",
  },

  blog: {
    avatar: "/logo.png",
    name: "LT.Han",
    roundAvatar: true,
    sidebarDisplay: "mobile",
    medias: {
      Zhihu: "https://www.zhihu.com/people/lthan",
      Github: "https://github.com/lt-han",
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

    docsearch: {
      appId: "6SHIGH4EG7",
      apiKey: "8ba166c8831f1e88f086d3c55b45f82a",
      indexName: "hanlitao",
      locales: {
        "/": {
          placeholder: "搜索文档",
          translations: {
            button: {
              buttonText: "搜索文档",
              buttonAriaLabel: "搜索文档",
            },
            modal: {
              searchBox: {
                resetButtonTitle: "清除查询条件",
                resetButtonAriaLabel: "清除查询条件",
                cancelButtonText: "取消",
                cancelButtonAriaLabel: "取消",
              },
              startScreen: {
                recentSearchesTitle: "搜索历史",
                noRecentSearchesText: "没有搜索历史",
                saveRecentSearchButtonTitle: "保存至搜索历史",
                removeRecentSearchButtonTitle: "从搜索历史中移除",
                favoriteSearchesTitle: "收藏",
                removeFavoriteSearchButtonTitle: "从收藏中移除",
              },
              errorScreen: {
                titleText: "无法获取结果",
                helpText: "你可能需要检查你的网络连接",
              },
              footer: {
                selectText: "选择",
                navigateText: "切换",
                closeText: "关闭",
                searchByText: "搜索提供者",
              },
              noResultsScreen: {
                noResultsText: "无法找到相关结果",
                suggestedQueryText: "你可以尝试查询",
                openIssueText: "你认为该查询应该有结果？",
                openIssueLinkText: "点击反馈",
              },
            },
          },
        }
      }
    },
  },
});
