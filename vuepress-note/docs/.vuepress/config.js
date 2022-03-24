const { config } = require("vuepress-theme-hope");

module.exports = config({
  title: "Han Li Tao",

  description: "My NoteBook, In Order To Improve Efficiency !",
  base: "/",

  dest: "./dist",

  head: [
    ['meta', { name: 'keywords', content: 'crawler hive nginx vuepress'}],
    // 百度站长的验证, 不能删除
    ["meta", { name: "baidu-site-verification", content: "code-EkHD6Z9cKD" }],
    [
      "script",
      { src: "https://cdn.jsdelivr.net/npm/react/umd/react.production.min.js" },
    ],
    [
      "script",
      {
        src: "https://cdn.jsdelivr.net/npm/react-dom/umd/react-dom.production.min.js",
      },
    ],
    ["script", { src: "https://cdn.jsdelivr.net/npm/vue/dist/vue.min.js" }],
    [
      "script",
      { src: "https://cdn.jsdelivr.net/npm/@babel/standalone/babel.min.js" },
    ],
    ['script', {}, `
            var _hmt = _hmt || [];
            (function() {
              // 引入百度统计
              var hm = document.createElement("script");
              hm.src = "https://hm.baidu.com/hm.js?76592c45133291700273e2e5ea3f89b3";
              var s = document.getElementsByTagName("script")[0]; 
              s.parentNode.insertBefore(hm, s);

              // 引入谷歌,不需要可删除这段
              var hm1 = document.createElement("script");
              hm1.src = "https://www.googletagmanager.com/gtag/js?id=G-9F64JQSDVD";
              var s1 = document.getElementsByTagName("script")[0]; 
              s1.parentNode.insertBefore(hm1, s1);
            })();

            // 谷歌加载,不需要可删除
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            // 衡量ID
            gtag('config', 'G-9F64JQSDVD');
        `]
  ],

  locales: {
    "/": {
      lang: "zh-CN"
    }
  },

  themeConfig: {
    logo: "/logo.svg",
    hostname: "https://www.hanlitao.com",

    author: "lthan",
    repo: "https://github.com/lt-han",

    nav: require("./config/nav.js"),

    sidebar: require("./config/sidebar.js"),

    blog: {
      name: "LT.Han",
      avatar: "/logo.png",
      intro: "/intro/",
      sidebarDisplay: "mobile",
      links: {
        Github: "https://github.com/lt-han",
      },
    },

    footer: {
      display: false,
      content: '<a href="https://beian.miit.gov.cn/">京ICP备2021015740号-2</a>',
    },

    comment: {
      type: "valine",
      "appId": 'nXtj7JbB39qEoANtNOOvKtsW-gzGzoHsz',// your appId
      "appKey": 'xnoHidpgqWxWHPkaOf0FHdvL', // your appKey
    },
    copyright: {
      status: "global",
    },

    git: {
      timezone: "Asia/Shanghai",
    },

    mdEnhance: {
      enableAll: true,
      presentation: {
        plugins: [
          "highlight",
          "math",
          "search",
          "notes",
          "zoom",
          "anything",
          "audio",
          "chalkboard",
        ],
      },
    },

    pwa: {
      favicon: "/favicon.ico",
      cachePic: false,
      apple: {
        icon: "/assets/icon/apple-touch-icon.png",
        statusBarColor: "black",
      },
      msTile: {
        image: "/assets/icon/favicon-16x16.png",
        color: "#ffffff",
      },
      manifest: {
        icons: [
          {
            src: "/assets/icon/android-chrome-512x512.png",
            sizes: "512x512",
            purpose: "maskable",
            type: "image/png",
          },
          {
            src: "/assets/icon/android-chrome-192x192.png",
            sizes: "192x192",
            purpose: "maskable",
            type: "image/png",
          },
          {
            src: "/assets/icon/android-chrome-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "/assets/icon/android-chrome-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
        ],
        shortcuts: [
          {
            name: "Guide",
            short_name: "Guide",
            url: "/guide/",
            icons: [
              {
                src: "/assets/icon/guide-maskable.png",
                sizes: "192x192",
                purpose: "maskable",
                type: "image/png",
              },
              {
                src: "/assets/icon/guide-monochrome.png",
                sizes: "192x192",
                purpose: "monochrome",
                type: "image/png",
              },
            ],
          },
        ],
      },
    },
  },
  plugins: [
    [
      "@mr-hope/git",
      {
        contributor: false,
      },
    ],
    [
      '@vuepress/google-analytics',
      {
        'ga': 'G-9F64JQSDVD' // UA-00000000-0
      }
    ]
  ]
});
