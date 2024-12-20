---
title: TAROT论文总结
editLink: false
category: Person Job Fit
tag:
  - Person Job Fit
---

[论文地址](https://readpaper.com/pdf-annotate/note?pdfId=4846507463729479681&noteId=2621391334548210432)

**1 模型架构**

<div align="center">
  <img src="/images/TAROT架构图.png" height="300" wight="350">
</div>

**2 关键点**

一般面向领域的设计很难捕获用户简历和职位描述中独特的结构信息，从而导致潜在语义相关性的丧失。TAROT提出一种分层多任务协同训练框架，以更好地利用结构和语义信息进行信息文本嵌入。TAROT针对简历和职位的半结构化文本，与多粒度预训练任务相结合，以约束每个级别获得的语义信息。

**3 主要贡献**

1. 提出了一种分层结构的框架，用于表示学习特定领域的候选人-职位匹配文本数据，作为对传统特征的补充。

2. 提出了专门针对候选人-职位匹配领域的多粒度预训练任务。

3. 进行了广泛的实验，以验证设计的有效性以及对下游任务的益处。

4 模型结构

模型采用了Cross-Attention layer，因此适用于排序阶段。

**预备知识**

职位按照：职责、资格、要求、职位、标题、技能、福利、公司分成段落S^j。

简历按照：摘要、标题、教育、位置、技能分成段落S^u。

Person-Job训练目标是基于学习语言模型的输出嵌入来预测简历和职位的匹配度。

1. 语言模型

    任务：sentence level，句子级MLM预训练

    目标：使TAROT更多强调与招聘相关的语料库

2. 注意力融合层

  任务：

    a) section level，经验分类，识别段落类型

    b) individual level，属性二分类（这里选择技能ID作为类别标签，作者认为人岗匹配高度依赖技能），关注两侧嵌入的共现属性

  目标：

    a) section level，学习表征区分section的知识

    b) individual level 学习表征属性（技能）的知识

3. 交叉注意力层
  
    任务：interaction level，应用分类，预测候选人是否会申请职位
    
    目标：采用交叉注意力机制，解决“不同用户会被职位的不同部分吸引”的问题

**5 优点**

1. 可引导模型各层编码信息的偏好
2. 可存储中间层特征向量，降低在线排序耗时

**6 缺点**

1. λ超参和模型复杂度
2. 依赖基本能力和基础数据：分段能力、技能词库、漏斗数据作为正样本