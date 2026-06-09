---
theme: default
title: AI/Agent 入门 05 - Agent Loop
favicon: /Icon/favicon.svg
info: |
  ## AI/Agent 入门 05 - Agent Loop
  从一次工具调用，到「决策—执行—观察」的持续循环

  在线查看: https://ppt.tokenroll.ai/ai-agent-loop/
highlighter: shiki
drawings:
  enabled: false
transition: slide-left
mdc: true

presenter: false
download: false
exportFilename: ai-agent-loop-05
record: false
routerMode: hash
---

# AI/Agent 入门

## 05 · Agent Loop

by DJJ

<div style="position: absolute; bottom: 2rem; right: 3rem; font-family: var(--font-mono); font-size: 0.75rem; color: var(--text-secondary);">
  ppt.tokenroll.ai
</div>

---
layout: center
---

# 今天搞清楚一件事

<div class="big-text mt-3">

Agent 不是<span class="highlight">一次调用</span>，而是一个<span class="highlight">循环</span>

</div>

<div class="mt-3">

- 什么是 Agent：模型驱动的执行系统
- Agent ≠ Workflow：动态决策 vs 写死路径
- Loop 的骨架：构造 → 调用 → 执行 → 更新 → 继续/结束
- 拆开 Loop：内操作、截止条件、内部变量、外部变量

</div>

---
layout: section
---

# 一、什么是 Agent

模型驱动的执行系统

---

# 一句话定义

<div class="big-text mt-3">

接收一个<span class="highlight">目标</span>，用模型决定<span class="highlight">下一步</span>，通过工具或环境交互完成它

</div>

<div class="grid-3 mt-3">
<div class="card">

### 目标

给的是「要达成什么」，不是「按几步做」。

</div>
<div class="card">

### 决策

每一步都由模型现场判断，而非预设流程。

</div>
<div class="card">

### 交互

通过工具 / 外部环境改变世界、获取反馈。

</div>
</div>

---

# Agent vs Workflow

<div class="text-sm" style="margin-bottom: 0.5rem;">不是所有「LLM + tool」都是强 Agent。</div>

<div class="grid-2 mt-2">
<div class="card">

### 更像 Workflow

工具调用路径是<span class="highlight">代码写死</span>的：

```text
永远先搜索 → 再总结 → 再输出
```

<p>流程固定，模型只填空。</p>

</div>
<div class="card">

### 才是 Agent

模型根据目标和中间结果<span class="highlight">动态决定</span>：

是否搜索、搜什么、是否写文件、是否调代码、是否交给子 Agent、何时停止。

</div>
</div>

<div class="mt-2">

> 区别不在「用没用工具」，而在「下一步由谁决定」。

</div>

---

# 一点远景：AGI → ASI

<div class="grid-2 mt-3">
<div class="card">

### AGI · 通用人工智能

Artificial General Intelligence

<p>在<span class="highlight">所有领域</span>都与人类认知能力相当。</p>

</div>
<div class="card">

### ASI · 超级人工智能

Artificial Superintelligence

<p>在<span class="highlight">每一个可想象的方面</span>都超越人类。</p>

</div>
</div>

<div class="mt-3 text-muted">

两个不同且仍属假设的发展阶段。Agent 是当下能落地、并通向这条路径的工程形态。

</div>

---
layout: section
---

# 二、Loop 的骨架

把「一次调用」变成「一个闭环」

---

# 核心闭环

<div class="timeline mt-3">
  <div class="timeline-item">
    <div class="timeline-company">1 · 构造上下文</div>
    <div class="timeline-role">把目标、历史、工具定义、状态组装成本轮输入</div>
  </div>
  <div class="timeline-item">
    <div class="timeline-company">2 · 调用模型</div>
    <div class="timeline-role">模型决策：回答，还是请求工具</div>
  </div>
  <div class="timeline-item">
    <div class="timeline-company">3 · 执行工具</div>
    <div class="timeline-role">runtime 执行真实动作，拿到 observation</div>
  </div>
  <div class="timeline-item">
    <div class="timeline-company">4 · 更新状态</div>
    <div class="timeline-role">回填结果、落盘 checkpoint、压缩历史</div>
  </div>
  <div class="timeline-item">
    <div class="timeline-company">5 · 继续 / 结束</div>
    <div class="timeline-role">判断是否达成目标，决定再循环还是收尾</div>
  </div>
</div>

<div class="mt-2">

> Loop 不只是「调工具」，而是涵盖生命周期的完整闭环。

</div>

---
layout: section
---

# 三、Loop 内的操作

每一轮里，系统都做了什么

---

# Loop 内做的三件事

<div class="grid-3 mt-3">
<div class="card">

### 生命周期管理

核心 Loop = 构造上下文 → 调用模型 → 执行工具 → 更新状态 → 继续或结束。

<p>它管的是<span class="highlight">整个闭环</span>，不止工具。</p>

</div>
<div class="card">

### 结果工件化

原始大输出不再直接塞进历史。

<p>边界控制（bounded tool_result）+ 工件化：大文件进 Artifacts，不进 session.state。</p>

</div>
<div class="card">

### 检查点与落盘

每次执行 / 暂停前 save_checkpoint。

<p>长任务<span class="highlight">可恢复、可审计</span>。</p>

</div>
</div>

<div class="mt-2">

> 早期：原始结果直接 append。如今：bounded + 工件化 + citable documents + tool result clearing。

</div>

---
layout: section
---

# 四、Loop 的截止条件

什么时候停？三层防线

---

# 从单一阈值到三层防线

<div class="grid-3 mt-3">
<div class="card">

### 语义层停止

由模型推理自己决定。

<p>Anthropic 返回 <code>stop_reason</code>：<br/><code>tool_use</code>（请求工具）/ <code>end_turn</code>（完成）。</p>

</div>
<div class="card">

### 系统层边界

防死循环的硬约束。

<p><code>pause_turn</code> · context window exceeded · max-turn failures · UsageLimits（请求 / token / 工具次数）。</p>

</div>
<div class="card">

### 治理与安全层

高风险动作触发人类介入。

<p>写库 / 转账 / 发邮件 → human approval / interrupt。</p>

</div>
</div>

<div class="mt-3">

> 在现代架构里，「暂停（Paused）」不再是异常，而是运行时的一等分支。

</div>

---
layout: section
---

# 五、Loop 的内部变量

循环内部，状态长什么样

---

# 工作状态与思维轨迹

<div class="grid-2 mt-3">
<div class="card">

### 工作层 & 压缩层

内部变量主要是：近期消息历史 + 临时工作状态 + 会话摘要。

<p>逼近阈值时，旧消息和陈旧工具输出被转成<span class="highlight">压缩摘要</span>（compaction block）。</p>

</div>
<div class="card">

### 思维轨迹 Thinking / Reasoning

- **Anthropic**：显式 thinking block，与工具请求对应的必须<span class="highlight">原样带回</span>，否则签名校验失败
- **OpenAI**：隐藏原始 CoT，用 reasoning summaries / encrypted reasoning items 维持多轮连续

</div>
</div>

<div class="mt-3">

> 前序思维块会被自动从计算中剥离以省空间，但「当轮」的思维必须保真回传。

</div>

---
layout: section
---

# 六、Loop 的外部变量

把上下文搬到窗口之外

---

# 外置化上下文的崛起

<div class="grid-3 mt-3">
<div class="card">

### 为什么外置

单窗口有容量与注意力瓶颈。

<p>越来越多系统把上下文<span class="highlight">外部化</span>，构成 Loop 的外部层。</p>

</div>
<div class="card">

### 多环境 / 连接器

以 Manus 为例的分布式 Harness：

<p>云端沙箱工作区 · Google Drive Connector 实时挂载 · Browser Operator 桥接已登录浏览器。</p>

</div>
<div class="card">

### 按需获取

不让模型在 prompt 里记住一切。

<p>需要时再去文件系统 / 数据库 / 子代理<span class="highlight">动态取</span>最新上下文。</p>

</div>
</div>

---
layout: center
---

# 小结

<div class="mt-3 text-sm" style="max-width: 760px; margin: 0 auto;">

- **Agent** = 目标 + 模型决策 + 环境交互
- **Loop** = 构造 → 调用 → 执行 → 更新 → 继续/结束
- **内操作** = 生命周期 · 结果工件化 · 检查点
- **截止条件** = 语义层 / 系统层 / 治理层 三层防线
- **内部变量** = 工作状态 + 压缩摘要 + 思维轨迹
- **外部变量** = 外置上下文 · 多环境连接器 · 按需获取

</div>

<div class="mt-3">

> Loop 转得稳不稳，取决于喂进去的 Context 好不好 —— 这是下一章的主题。

</div>

---
layout: center
---

# End

<div class="mt-3">

模型负责<span class="highlight">决策</span>，Runtime 负责<span class="highlight">执行、状态与边界</span>。<br/>
Agent，就是围绕动作契约持续运转的那个循环。

</div>
