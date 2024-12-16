import { hopeTheme } from "vuepress-theme-hope";

export default {
  theme: hopeTheme({
    sidebar: [
      {
        text: "算法工程师",
        prefix: "/algorithm-engineer/",
        children: [
          "person-job-fit/",
          {
            text: "Person Job Fit",
            children: ["tarot" ],
          },
          {
            text: "NLP",
            prefix: "nlp/",
            children: [
              "test",
            ],
          },
        ],
      },
    ],
  }),
};
// import { defineSidebarConfig } from "vuepress-theme-hope";

// export default defineSidebarConfig({
  
//   // 算法工程师 Person Job Fit
//   "/algorithm-engineer/person-job-fit/": [
//     {
//       text: "Person Job Fit",
//       collapsable: false,
//       children: ["tarot"],
//     }
//   ],
//     // 算法工程师 nlp
//     "/algorithm-engineer/nlp/": [
//       {
//         text: "自然语言处理",
//         collapsable: false,
//         children: ["test"],
//       }
//     ],
    
//     // 律师 工具
//     "/lawyer/tool/": [
//       {
//         text: "工具",
//         collapsable: false,
//         children: ["test"],
//       }
//     ],
  
// });
