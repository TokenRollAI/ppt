---
theme: default
title: AI/Agent 入门 03 - Prompt 入门
favicon: /Icon/favicon.svg
info: |
  ## AI/Agent 入门 03 - Prompt 入门
  从结构化提示词到「原则 + 上下文」

  在线查看: https://ppt.tokenroll.ai/ai-agent-prompt/
highlighter: shiki
drawings:
  enabled: false
transition: slide-left
mdc: true

presenter: false
download: false
exportFilename: ai-agent-prompt-03
record: false
routerMode: hash
---

# AI/Agent 入门

## 03 · Prompt 入门

by DJJ

<div style="position: absolute; bottom: 2rem; right: 3rem; font-family: var(--font-mono); font-size: 0.75rem; color: var(--text-secondary);">
  ppt.tokenroll.ai
</div>

---
layout: center
---

# 今天搞清楚四件事

<div class="big-text mt-3">

Prompt 不只是<span class="highlight">把话说清楚</span>

</div>

<div class="mt-3">

- 它是什么：和模型交互的桥梁
- 经典套路：shot / 结构化 / 思维链
- 一个转折：这些「技巧」正在过时
- 真正的趋势：模型越强，提示词越短

</div>

---
layout: section
---

# 一、Prompt 是什么

和模型交互的桥梁

---

# 什么是 Prompt

<div class="grid-2 mt-3">
<div class="card">

### 直观理解

可以不严谨地认为：Prompt 就是**指令**。

<p>让模型根据 Prompt 输出符合「要求」的内容。</p>

</div>
<div class="card">

### 一点来历

最早可追溯到 NLP / CV 领域：在训练数据里加入 prompt 以获得更好的泛化能力。

<p>后续研究发现，prompt 的效果与 fine-tuning <span class="highlight">非常接近</span>。</p>

</div>
</div>

<div class="mt-3">

> 不懂 Prompt，就无法和模型良好交互。它是你和模型之间唯一的桥梁。

</div>

---
layout: section
---

# 二、经典套路

那些写在教程里的「技巧」

---

# zero-shot / one-shot / few-shot

<div class="text-sm" style="margin-bottom: 0.5rem;">可以把 <code>shot</code> 理解为「示例」。</div>

| 范式 | 给几个示例 | 适用场景 |
| --- | --- | --- |
| zero-shot | 0 个 | 任务简单、模型已熟悉 |
| one-shot | 1 个 | 需要框定输出格式 |
| few-shot | N 个 | 任务有特定模式、风格需要对齐 |

<div class="mt-2">

> 示例是在「用样例教模型」。但请记住这点 —— 模型越强，示例的边际收益越低。

</div>

---

# 结构化 Prompt

<div class="grid-2 mt-3">
<div class="card">

### 核心思想

按**作用 / 重要性 / 模块**，把提示词组装成一个结构良好的整体。

<p>代表实践：<a href="https://github.com/langgptai/LangGPT" target="_blank">LangGPT</a>。</p>

</div>
<div class="card">

### 一个最小骨架

```text
# Role: 角色名

## Skill
## Rules
## Workflow
## Example
```

</div>
</div>

<div class="mt-3">

> 结构化让人和模型都更容易读懂「这段提示词在要求什么」。

</div>

---

# CoT · 思维链

<div class="text-sm" style="margin-bottom: 0.5rem;">Chain of Thought —— 大的要来了。</div>

<div class="grid-2 mt-2">
<div class="card">

### 是什么

不只要答案，还让模型**把推理过程写出来**。

<p>一句 <code>Let's think step by step.</code> 就能显著改善复杂推理。</p>

</div>
<div class="card">

### 为什么有效

把一步到位的难题，拆成模型「能逐步走完」的小步。

<p>更多技术见 <a href="https://www.promptingguide.ai/techniques" target="_blank">promptingguide.ai</a>。</p>

</div>
</div>

---
layout: center
---

# 但是

<div class="big-text mt-3">

上面这些，<span class="highlight">已经在过时</span>

</div>

<div class="mt-3 text-muted">

不是错的，而是随着模型变强，边际收益在快速递减。

</div>

---
layout: section
---

# 三、从 Claude Code 看变化

提示词到底在怎么演化

---

# 一手素材：真实的系统提示词

<div class="grid-2 mt-3">
<div class="card">

### 可以去看真东西

线上扒出来的 Claude Code 系统提示词合集，附变更日志。

<p><a href="https://github.com/Piebald-AI/claude-code-system-prompts" target="_blank">Piebald-AI/claude-code-system-prompts</a></p>

</div>
<div class="card">

### 提示词有多重要

一次线上事故复盘 —— 提示词 / 系统行为出问题，影响是全局的。

<p><a href="https://www.anthropic.com/engineering/april-23-postmortem" target="_blank">april-23 postmortem</a></p>

</div>
</div>

<div class="mt-3">

> 系统提示词不是「调教技巧」，而是产品的一部分，需要像代码一样被版本管理和复盘。

</div>

---

# 同一个工具，两代模型

<div class="text-sm" style="margin-bottom: 0.5rem;">同一套 agent harness，面向不同代际模型的两个版本。</div>

| 维度 | 古早版 (较弱模型) | 新版 (更强模型) |
| --- | --- | --- |
| 篇幅 | 很长，规则 + 大量示例 | 短得多，整段被压成几句 |
| 工具策略 | 逐条枚举每种情况怎么做 | 给一条可自行推断的原则 |
| 语气 | `VERY IMPORTANT` `NEVER` `MUST` | 平实，像同事间的提醒 |
| 安全 / 确认 | 列「哪些要确认」的清单 | 给「可逆性 / 外向性」判断框架 |
| 省下的篇幅 | —— | 用来解释 harness 机制等元信息 |

---
layout: center
---

# 一句话概括

<div class="big-text mt-3">

模型越强，提示词<span class="highlight">越短</span>

</div>

<div class="mt-3">

从「指令手册」演变为「**原则 + 上下文**」。<br/>
弱模型要被详尽告知做什么、怎么做、不许做什么；强模型只需给目标、给原则、给足够的环境信息。

</div>

---

# 趋势的两个隐含信号

<div class="grid-2 mt-3">
<div class="card">

### 边际收益在递减

few-shot 示例和高压禁令，随模型能力上升而失效。

<p>过多的规则甚至会变成<span class="highlight">噪音和不必要的约束</span>。</p>

</div>
<div class="card">

### 省下的篇幅去了哪

没有用来塞更多 do / don't，而是去解释 harness 机制、可逆性原则。

<p>从管「行为」转向管「判断的依据」。</p>

</div>
</div>

---
layout: section
---

# 四、优化与评估

写得更好，也要量得出好

---

# Prompt 优化方向

<div class="grid-2 mt-3">
<div class="card">

### 两个大方向

- 控制 **token** 大小，别啰嗦
- 给「**原则**」，而不是堆「规则」

</div>
<div class="card">

### 一些细节

- 慎用全大写
- 慎用 `IMPORTANT` / `CRITICAL`
- 善用 `system-reminder`
- 善用 XML tag 做结构分隔

</div>
</div>

<div class="mt-3">

> 强调一切，等于没有强调。把判断的依据交给模型，比逐条命令更可扩展。

</div>

---

# Prompt 评估

<div class="grid-2 mt-3">
<div class="card">

### promptfoo

面向提示词的测试 / 评估框架，可批量对比不同 prompt 的表现。

</div>
<div class="card">

### DSPy

把 prompt 当成可优化的「程序」，自动搜索更好的提示词与示例。

</div>
</div>

<div class="mt-3">

> 不要凭感觉调 prompt。像写代码一样，给它建立可重复的评估。

</div>

---
layout: section
---

# 作业

非强制，但强烈建议动手

---

# 三个任务

<div class="timeline mt-3">
  <div class="timeline-item">
    <div class="timeline-company">任务一 · 元提示词</div>
    <div class="timeline-role">写一个「帮你写提示词」的提示词 (meta-prompt)</div>
  </div>
  <div class="timeline-item">
    <div class="timeline-company">任务二 · Roleplay</div>
    <div class="timeline-role">写任意一个角色扮演提示词</div>
  </div>
  <div class="timeline-item">
    <div class="timeline-company">任务三 · 选做 · 对比分析</div>
    <div class="timeline-role">对比 Codex 与 Claude Code 的系统提示词，差在哪、为什么</div>
  </div>
</div>

<div class="mt-2">

> 任务三参考：<a href="https://github.com/openai/codex" target="_blank">openai/codex</a>。带着「这是给哪代模型写的」去读，差异会更清晰。

</div>

---
layout: center
---

# End

<div class="mt-3">

最好的提示词，是<span class="highlight">恰好够用</span>的提示词。

</div>
