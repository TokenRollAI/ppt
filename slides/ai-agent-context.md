---
theme: default
title: AI/Agent 入门 06 - Context 工程
favicon: /Icon/favicon.svg
info: |
  ## AI/Agent 入门 06 - Context 工程
  从「窗口里塞什么」到「如何高效抵达 Context Floor」

  在线查看: https://ppt.tokenroll.ai/ai-agent-context/
highlighter: shiki
drawings:
  enabled: false
transition: slide-left
mdc: true

presenter: false
download: false
exportFilename: ai-agent-context-06
record: false
routerMode: hash
---

# AI/Agent 入门

## 06 · Context 工程

by DJJ

<div style="position: absolute; bottom: 2rem; right: 3rem; font-family: var(--font-mono); font-size: 0.75rem; color: var(--text-secondary);">
  ppt.tokenroll.ai
</div>

---
layout: center
---

# 今天搞清楚一件事

<div class="big-text mt-3">

Context 不是<span class="highlight">越多越好</span>，而是<span class="highlight">恰好够用</span>

</div>

<div class="mt-3">

- Context 由哪些部分组成
- 一个边界：窗口不是长期存储
- Prefix Cache：成本与延迟的底层杠杆
- Context Floor：怎样衡量「上下文够不够」
- 渐进式披露与 Context 的演化趋势

</div>

---
layout: section
---

# 一、Context 的组成

窗口里到底装了什么

---

# 七类上下文

| 上下文类型 | 统一定义 |
| --- | --- |
| 会话上下文 | 单会话内随轮次累积的消息、工具调用、结果、临时状态 |
| 短期工作记忆 | 当前任务的摘要、计划、whiteboard、scratchpad、thread state |
| 长期 / 情节记忆 | 跨会话保存、可再次检索的事实、经验、偏好、案例 |
| 文件 / 工件上下文 | 大文本、代码库、PDF、图像、二进制结果的外部存储与引用 |
| 推理 / 思考状态 | 当前回合的 thinking / reasoning 痕迹及其可见性、可回传性 |
| 工具 schema 与结果 | 工具定义、参数 schema、tool_use / tool_result、工件化结果 |
| KV-cache / prefix | 决定成本 / TTFT 的稳定前缀与缓存命中 |

---

# 一个重要边界

<div class="big-text mt-3">

Context Window <span class="highlight">不是</span>长期存储

</div>

<div class="grid-2 mt-3">
<div class="card">

### 短期会话上下文

只是「当前工作内存」。

<p>Google ADK、Mem0、Manus 都在不同表述下强调了这点。</p>

</div>
<div class="card">

### 长期知识去哪

- 进 MemoryService / memory layer
- 变成文件 / 工件
- 成为可再次检索的外存索引

</div>
</div>

<div class="mt-3">

> 想让 Agent「记住」，不是把它塞进窗口，而是放进可检索的外部记忆。

</div>

---

# 以 Claude Code 为例

<div class="grid-2 mt-3">
<div class="card">

### 看真实的上下文

一个 Agent 的上下文究竟由哪些块拼成，可以直接观察。

<p><a href="https://inspector.pdjjq.org/" target="_blank">inspector.pdjjq.org</a></p>

</div>
<div class="card">

### 你会看到

System / Tools / Memory / 历史消息 / 工具结果 …

<p>每一块都<span class="highlight">占 token</span>，也都<span class="highlight">影响判断</span>。</p>

</div>
</div>

---
layout: section
---

# 二、Prefix Cache

成本与延迟的底层杠杆

---

# 为什么前缀缓存这么关键

<div class="grid-3 mt-3">
<div class="card">

### 成本

命中缓存的 input，只需 <span class="highlight">1% ~ 10%</span> 的成本。

</div>
<div class="card">

### TTFT

首字节延迟<span class="highlight">大幅降低</span>。

</div>
<div class="card">

### 前缀不变性

稳定前缀才能命中：<span class="highlight">Always Append</span>，别改前面。

</div>
</div>

<div class="mt-3">

> 经验比例：平均输入与输出的 token 约为 **100 : 1** —— 省 input 就是省大头。

</div>

<div class="mt-2 text-muted">

实践含义：System / Tools / 稳定历史放前面且不动，新内容只往后追加，最大化缓存命中。

</div>

---
layout: section
---

# 三、Context Floor

衡量「上下文够不够」

---

# 什么是 Context Floor

<div class="text-sm" style="margin-bottom: 0.5rem;">我把「满足 Agent 解决需求的 context 丰富度」称为 Context Floor。</div>

<div class="grid-3 mt-2">
<div class="card">

### 调了多少工具

抵达所需信息走了几步。

</div>
<div class="card">

### 占了多少 Token

信息的体量成本。

</div>
<div class="card">

### 关键信息密度

有用信息 / 总 token 的浓度。

</div>
</div>

<div class="mt-3">

> 目标不是「填满窗口」，而是用最少的步数和 token，抵达足够解决问题的 Context Floor。

</div>

---

# 用 Context Floor 看经典方案

<div class="grid-2 mt-3">
<div class="card">

### LSP MCP

提升关键 Symbol 密度 + 大量工具调用。

<p>快速抵达 Context Floor，但调用次数多。</p>

</div>
<div class="card">

### ACE / RAG

少量工具调用 + 稀疏关键信息密度。

<p>很难保证信息的<span class="highlight">关联性与有效性</span>。</p>

</div>
</div>

<div class="card mt-3">

### Agentic RAG

让 Agent（常用 SubAgent，如 Claude Code 的 explorer）先做一次信息搜集，产出概要。

<p>主 Agent 上下文干净、token 低、关键密度高 —— 代价是 <span class="highlight">TTCR（Time to Context Floor）</span> 太久。</p>

</div>

---
layout: section
---

# 四、为什么要降低 Context

更多不等于更好

---

# Context Rot

<div class="grid-2 mt-3">
<div class="card">

### 现象

上下文越长，模型对其中信息的利用能力反而<span class="highlight">退化</span>。

<p>无关内容会稀释注意力、拉高成本、增加延迟。</p>

</div>
<div class="card">

### 参考

系统性的实验与数据：

<p><a href="https://github.com/chroma-core/context-rot" target="_blank">chroma-core/context-rot</a></p>

</div>
</div>

<div class="mt-3">

> 所以工程目标常常是「在够用的前提下，尽量少」—— 降 context，而不是堆 context。

</div>

---
layout: section
---

# 五、渐进式披露

高浓度，按需展开

---

# Progressive Disclosure

<div class="big-text mt-3">

Context 稀释：把<span class="highlight">高浓度</span>稀释成<span class="highlight">低浓度</span>

</div>

<div class="timeline mt-3">
  <div class="timeline-item">
    <div class="timeline-company">name</div>
    <div class="timeline-role">最稀疏：只暴露一个名字，先让模型知道「有这个」</div>
  </div>
  <div class="timeline-item">
    <div class="timeline-company">description</div>
    <div class="timeline-role">需要判断时，再给一句语义说明</div>
  </div>
  <div class="timeline-item">
    <div class="timeline-company">完整内容</div>
    <div class="timeline-role">真正要用时，才加载全文</div>
  </div>
  <div class="timeline-item">
    <div class="timeline-company">reference / template</div>
    <div class="timeline-role">进一步下钻：引用、模板、外部资源</div>
  </div>
</div>

<div class="mt-2">

> 不是一次塞满，而是层层揭开 —— 把 token 花在「此刻真正需要」的那一层。

</div>

---
layout: section
---

# 六、Context 的趋势

它正在往哪走

---

# 三个方向

<div class="grid-3 mt-3">
<div class="card">

### 分层

Tools Description / 字段 Description / Memory / Role …

<p>不同信息按<span class="highlight">层级</span>组织。</p>

</div>
<div class="card">

### 分模块

Skill / Command / Workflow

<p>能力被<span class="highlight">封装成模块</span>，按需调用。</p>

</div>
<div class="card">

### 可编译

Context Compiler → Agent Context Control

<p>从「手工拼上下文」走向<span class="highlight">可编译、可控制</span>。</p>

</div>
</div>

<div class="mt-3">

> 趋势是一致的：让 context 从「一大段文本」变成「分层、分模块、可编排」的系统。

</div>

---
layout: center
---

# 小结

<div class="mt-3 text-sm" style="max-width: 760px; margin: 0 auto;">

- **组成** — 会话 / 工作记忆 / 长期记忆 / 工件 / 思考 / 工具 / 前缀
- **边界** — 窗口是工作内存，不是长期存储
- **Prefix Cache** — Always Append，省 input 省大头
- **Context Floor** — 用最少步数与 token 抵达「够用」
- **降 Context** — 警惕 Context Rot，够用即止
- **渐进式披露** — name → description → 全文 → reference
- **趋势** — 分层 · 分模块 · 可编译

</div>

---
layout: center
---

# End

<div class="mt-3">

好的 Context 工程，不是<span class="highlight">塞得更满</span>，<br/>
而是让 Agent 用最小代价，<span class="highlight">恰好够用</span>。

</div>
