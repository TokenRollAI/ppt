---
theme: default
title: QA for Tipsy
favicon: /Icon/favicon.svg
info: |
  ## QA for Tipsy
  AI Coding 相关问题的解答与分享

  在线查看: https://ppt.tokenroll.ai/ai-coding-qa-tipsy/
highlighter: shiki
drawings:
  enabled: false
transition: slide-left
mdc: true

presenter: false
download: false
exportFilename: ai-coding-qa
record: false
routerMode: hash
---

# QA for Tipsy

by DJJ

<div style="position: absolute; bottom: 2rem; right: 3rem; font-family: var(--font-mono); font-size: 0.75rem; color: var(--text-secondary);">
  ppt.tokenroll.ai
</div>

---

### AI Coding 怎么做到快速高质量还原设计稿?


<div class="mt-4">

1. **Figma MCP** - 直接从 Figma 获取设计信息
2. **Style.md** - 预定义样式规范文档
3. **使用强多模态模型** - 如 <span class="highlight">Gemini 3 Pro</span>
4. **UI 设计风格统一** - 尽可能保证设计的一致性

</div>

---

### 在现今 AI Coding 技术盛行的当下，程序员应该提升自己哪些方面的核心能力?

1. **基本功** - 计算机原理、网络、编程、架构设计
2. **AI+** - Prompt / Context / Agent / Agent Framework
3. **想象力和行动力** - 有想法就实现，实现了就发布
4. **信息的获取和转化** - 关注最新的技术进展，记录思考然后转化成新的想法

---

### AI Coding 的接口测试及测开框架需要更多关注哪些方面?

> [As Code](https://mitchellh.com/writing/as-code) - Mitchell Hashimoto

**核心原则：**

1. 所有的接口变更应该基于最真实的信息，也就是 <span class="highlight">代码层面</span>
2. **单元测试** + **端到端测试**

> 测试和开发，以及处在其中间的测开的界限会更加的模糊

---

### 测试的趋势

<div class="mt-4">

**发展方向：**
1. 测试 Case 的组织会和 API Repo 结合的更加紧密
2. 测试 Case 更加动态的生成

</div>

<div class="mt-6">

**相关产品：**
- [qa.tech](https://qa.tech/)
- [checksum.ai](https://checksum.ai/)

</div>

---

### 想了解一下记忆算法的机制!

> 我理解的 AI 最能增加用户黏度和留存的地方在于通过高自由的对话和玩家可以通过投入的增加，逐步搭建他们独特的回忆，从而让 AI 角色对玩家具有不可替代性。

---

### LLM 的"记忆"来源

<div class="mt-4">

LLM 的"记忆"来自于两种渠道：

1. **持久性记忆**
   - 来自于模型的参数
   - 来自于训练时的数据
   - 来自于预训练/后训练的增强
   - 来自于对齐

2. **Context 记忆**
   - 来自于 Context Window
   - 即 [In-Context Learning](https://www.lakera.ai/blog/what-is-in-context-learning)

</div>

---

### 修改记忆?



#### 微调 / LoRA

<span class="warning">代价：</span>
- **成本**: 为每个用户单独微调？为每个用户推一个 LoRA？成本几乎无法接受
- **性能**: 模型每 6 个月迭代一轮，每一次迭代能够带来 5-10% 的进步，无法享受基座模型的进步

#### <span class="highlight">推荐</span> Context / Prompt

如果记忆就是 Context，问题就变成：该怎么结构化的表示?


---

### 结构化表示记忆

<div class="mt-4">

**记忆的内容：**
1. 对谈的语气风格
2. 发生的事件 / 对于用户极为重要的信息
3. 第一次对话的时间、当前用户的基本信息、用户的情绪状态
4. 用户自定义的 Prompt / Instruction

</div>

<div class="mt-4">

**工程实现：**
- RAG / Agent RAG / 持久化 Prompt 注入等

</div>

<div class="mt-4">

> 核心问题：哪些内容会影响 LLM 的记忆，或者说让 User 觉得 LLM 有记忆

</div>

---

### 想请老师分享一下自己 Vibe Coding 时的一些 Aha moment

<div class="mt-4">

1. **24 年 7 月** - Cursor + Sonnet 3.5 做出了一个面试工具 (ASR + LLM)
2. **25 年 3 月** - Gemini 2.5 Pro 做 PRD
3. **Sonnet 4.5 / Opus 4.5** - Claude Code 全链路托管
4. **Gemini 3.0** - 实现美观的 UI 设计
   - [children-of-god.pdjjq.org](https://children-of-god.pdjjq.org/)
   - [today.tokenroll.ai](http://today.tokenroll.ai/)
   - [why-i-dont-accept.pdjjq.org](https://why-i-dont-accept.pdjjq.org/)

</div>

---
layout: center
---

# 最根本的改变

<div class="mt-4" style="font-size: 1.5rem;">

生产方式改变

是从 <span class="highlight">想法</span> 到 <span class="highlight">落地</span> 到 <span class="highlight">验证</span> 的改变

</div>

---
layout: center
---

# End
