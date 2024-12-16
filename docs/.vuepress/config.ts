import { defineHopeConfig } from "vuepress-theme-hope";
import themeConfig from "./themeConfig";

// 文档： https://vuepress-theme-hope.github.io/v2/zh/guide
export default defineHopeConfig({
  base: "/",

  dest: "./dist",

  head: [
    [
      "link",
      {
        rel: "stylesheet",
        href: "//at.alicdn.com/t/font_2410206_mfj6e1vbwo.css",
      },
    ],
    // 百度站长的验证, 不能删除
    ["meta", { name: "baidu-site-verification", content: "code-EkHD6Z9cKD" }],
    ['script', {}, `
    var _hmt = _hmt || [];
    (function() {
      // 引入百度统计
      var hm = document.createElement("script");
      hm.src = "https://hm.baidu.com/hm.js?76592c45133291700273e2e5ea3f89b3";
      var s = document.getElementsByTagName("script")[0]; 
      s.parentNode.insertBefore(hm, s);
    })();
    `]

  ],

  locales: {
    "/": {
      lang: "zh-CN",
      title: "主页",
      description: "分享所思所想",
    },
  },

  themeConfig,

});
