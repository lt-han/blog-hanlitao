module.exports = {
  // 站点配置
  lang: 'zh-CN',
  title: '程序猿教你炒股',
  description: '从韭菜到收割机',

  // 主题和它的配置
  theme: '@vuepress/theme-default',
  themeConfig: {
    logo: '/images/logo.png',
    nav: require('./config/navbar.js'),
    sidebar: require('./config/sidebar.js')
  },
  head: [
    ['meta', { name: 'keywords', content: 'crawler hive nginx vuepress' }],
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
  plugins: [
    [
      '@vuepress/google-analytics',
      {
        'ga': 'G-9F64JQSDVD' // UA-00000000-0
      }
    ]
  ]
}