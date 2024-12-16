import { defineSidebarConfig } from "vuepress-theme-hope";

export default defineSidebarConfig({
  // 算法工程师-Person Job Fit
  "/algorithm-engineer/person-job-fit/": [
    {
      text: "Person Job Fit",
      collapsable: false,
      children: ["tarot"],
    }
  ],
    // 算法工程师-nlp
    "/algorithm-engineer/nlp/": [
      {
        text: "自然语言处理",
        collapsable: false,
        children: ["test"],
      }
    ]

  
});

// // 教你炒股-基础知识
  // "/stock/basic-knowledge/": [
  //   {
  //     text: "基础知识",
  //     icon: "creative",
  //     collapsable: false,
  //     children: ["trading-rule","k-line","pe-pb-ps"],
  //   }
  // ],
  //   // 教你炒股-技术指标
  //   "/stock/indocator/": [
  //     {
  //       text: "技术指标",
  //       icon: "creative",
  //       collapsable: true,
  //       children: ["k-line"],
  //     }
  //   ],
