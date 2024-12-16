import { defineSidebarConfig } from "vuepress-theme-hope";

export default defineSidebarConfig({
  
  // 算法工程师 Person Job Fit
  "/algorithm-engineer/person-job-fit/": [
    {
      text: "Person Job Fit",
      collapsable: false,
      children: ["tarot"],
    }
  ],
    // 算法工程师 nlp
    "/algorithm-engineer/nlp/": [
      {
        text: "自然语言处理",
        collapsable: false,
        children: ["test"],
      }
    ],
    
    // 律师 工具
    "/lawyer/tool/": [
      {
        text: "工具",
        collapsable: false,
        children: ["test"],
      }
    ],
  
});
