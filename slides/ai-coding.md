---
theme: default
title: AI Coding 分享
favicon: /Icon/favicon.svg
info: |
  ## AI Coding 分享
  探索 AI 辅助编程的最佳实践

  在线查看: https://ppt.tokenroll.ai/ai-coding/
highlighter: shiki
drawings:
  enabled: false
transition: slide-left
mdc: true

presenter: false
download: false
exportFilename: ai-coding
record: false
routerMode: hash
---

# AI Coding 分享

by DJJ

<div style="position: absolute; bottom: 2rem; right: 3rem; font-family: var(--font-mono); font-size: 0.75rem; color: var(--text-secondary);">
  ppt.tokenroll.ai
</div>

---
layout: center
---
# Attention

<div class="mt-2">

- <span class="highlight">"写代码"的门槛非常低</span>, 收益非常可观 → [Anthropic 是怎么使用 Claude Code](https://www-cdn.anthropic.com/58284b19e702b49db9302d5b6f135ad8871e7658.pdf)
- 写代码 **≠** 产出高质量软件
- 需求的实现成本/难度 **下降**?
- 不要为 LLM 的发展焦虑, 但不要做 <span class="warning">coding 义和团</span><sup>（本质正义, 工具落后, 顽固守旧的人）</sup>

</div>

---
layout: center
---

# 基座模型


1. ***至少到 2025 年年底, 我们应该认识到: <span class="highlight">基础模型进步带来的收益是最大的</span>***
2. ***在任何生产力场景下, 应该总是选择 <span class="highlight">SOTA 模型</span>***

---
layout: center
---

# 基本性能要求

> 一行代码约 10 Token → [Token 计算器](https://platform.openai.com/tokenizer)

<div class="grid-2 mt-2">
<div>

- **上下文**: 128K+ (最好 200K) Token
- **输出速度**: 60 Token/s
- **智力水平**: [SWE-Bench](https://www.swebench.com/) 70%+ (With Thinking)

</div>
<div>


- ToolUse / Function Call
- Prompt Cache
- Reasoning
- [成本考量](https://www.claude.com/pricing#api)

</div>
</div>

---
layout: section
---

# 主流的模型

- 美国: Anthropic / OpenAI / Google Gemini
- 中国: *Qwen* / GLM / Kimi / MiniMax / DeepSeek

---

# Anthropic <sup class="warning">封号斗罗</sup>

> 对中国用户不友好, 挂 VPN 也能封号, 策略最严格

<div class="mt-2">

目前最强的 Agent Model:

- <span class="tag-gold">旗舰</span> **[Opus](https://www.anthropic.com/claude/opus)**: 主要使用的 Coding 模型
- <span class="tag">次旗舰</span> **[Sonnet](https://www.anthropic.com/news/claude-sonnet-4-5)**: 很长一段时间内的全能模型
- <span class="tag-outline">Haiku</span>: 轻量级选择

</div>

---

# OpenAI & Google

<div class="grid-2 mt-2">
<div class="card">

### OpenAI (CloseAI)

**[gpt-5.2-codex](https://openai.com/zh-Hant/index/introducing-gpt-5-2-codex/)**

- 修改准确, 调查充分
- <span class="warning">耗时过长</span>
- 非常适合修复 BUG

</div>
<div class="card">

### Google Gemini <sup>大善人</sup>

**[Gemini 3.0 Pro](https://aistudio.google.com/models/gemini-3)**
- 史上最佳对话模型

**[Gemini 3.0 Flash](https://blog.google/products/gemini/gemini-3-flash/)**
- 不知道 Google 是怎么做到的

</div>
</div>

---

# 中国模型

<div class="grid-2 mt-2">
<div class="card">

### Qwen <sup>真正的 OpenAI</sup>

- **[Qwen3 Max](https://qwen.ai/blog?id=72071a922385147be2ca81cdfaa50035db6e85d0)**: 中国特色 Gemini
- **[Qwen3 Coder Plus](https://qwenlm.github.io/blog/qwen3-coder/)**: 狗都不用, 但必要时可以当狗

</div>
<div class="card">

### GLM / Kimi / MiniMax

- **[GLM 4.6](https://docs.z.ai/guides/llm/glm-4.6)**: 能力很好, 但最近在降智
- [Minimax-M2](https://www.minimax.io/news/minimax-m2)
- [Kimi K2](https://moonshotai.github.io/Kimi-K2/)

</div>
</div>

<div class="mt-2" style="text-align: center;">

### DeepSeek <sup>我卡呢?</sup>

> 大家举起双手把力量借给 DeepSeek 👐👐👐

</div>

---
layout: section
---

# 主流的 AI Coding 工具

按交互形式分为三类

---

# 工具分类

<div class="grid-3 mt-2">
<div class="card">

### VSCode-Fork

GUI Local, Fork VSCode 发行版

使用 OpenVSX 插件源

集成 AI 能力

</div>
<div class="card">

### CLI

命令行交互

对运行环境最好的支持

易于 CICD 集成

</div>
<div class="card">

### Web/Remote

开箱即用

环境完全托管

控制能力较弱

</div>
</div>

---

# VSCode-Fork 工具

> 赞美 VsCode, 你是 IDE 的终点, 你是 AIDE 的起点

<div class="grid-2 mt-2">
<div>

### 商业产品

- <span class="tag-gold">推荐</span> **[Cursor](https://cursor.com/)**: 最流行, 开箱即用
- <span class="tag-gold">推荐</span> **[Antigravity](https://antigravity.google/)**: Google 出品, 额度高
- [Windsurf](https://windsurf.com/): 无功无过
- [Trae](https://trae.ai/): 字节出品
- [Qoder](https://qoder.com/) / [CodeBuddy](https://www.codebuddy.com/)

</div>
<div>

### 开源项目

- [Void](https://voideditor.com/) <sup>不再维护</sup>
- [Cline](https://cline.bot/)
- [Roo Code](https://roocode.com/)
- [Kilo Code](https://kilocode.ai/)
- [continue.dev](https://www.continue.dev/)

</div>
</div>

---

# VSCode-Fork 核心功能

<div class="grid-3 mt-2">
<div class="card">

### Auto Complete

快速自动补全

- Multi line edits
- Next Edit
- 支持 FIM 小模型

</div>
<div class="card">

### Commit Message

根据代码变更自动生成

提升 Git 工作流效率

</div>
<div class="card">

### Coding Agent

与 CLI Agent 类似

后面详细描述

</div>
</div>

---

# Commit Message 演示

<div class="mt-2" style="text-align: center;">

<img src="/images/commit-msg.gif" style="max-height: 400px; border: 1px solid var(--border-color);" />

</div>

---

# CLI 工具

> CLI 交互天生就有一种严肃性, 同时有最广泛的适用性

<div class="mt-2">

- <span class="tag-gold">最强</span> **[Claude Code](https://www.claude.com/product/claude-code)**: 目前最强大, 特性最丰富, 普适性最强
- <span class="tag-gold">推荐</span> **[Codex CLI](https://developers.openai.com/codex/cli/)**: 功能简陋, 纯靠模型能力硬顶
- <span class="tag-gold">推荐</span> **[OpenCode](https://opencode.ai/)**: 目前最出色的 Plugin 设计
- <span class="tag">国产</span> **[iflow](https://iflow.cn/)**: 国产 CC
- [gemini cli](https://github.com/google-gemini/gemini-cli): 简陋但更新快
- <span class="text-secondary">auggie / cursor cli: 不推荐</span>

</div>

---

# Web/Remote Agent

> 非专业开发人员的福音

<div class="grid-2 mt-2">
<div>

### 优势

1. 几乎没有环境依赖
2. 在线预览 + 快速部署
3. 非常适合做 DEMO 验证

</div>
<div>

### 推荐平台

- [v0.dev](https://v0.dev/)
- [lovable](https://lovable.dev/)
- [Google AI Studio](https://aistudio.google.com/apps)
- [bolt.new](https://bolt.new/)

</div>
</div>

---
layout: section
---

# 个人使用经验

提升 AI Coding 质量的有效方法

---

# 核心原则

> 提升 AI Coding 质量的核心:

<div class="mt-2">

1. <span class="highlight">提供高质量、高相关度的上下文</span>, 至少包含相关的上下文
2. <span class="highlight">合理划分任务</span>, 每次专注于一个任务

</div>

---

# CLAUDE.md / AGENTS.md

本质上都是注入到 Context 里的提示词

<div class="grid-2 mt-2">
<div>

### 实现原理

```markdown
<system-reminder>
As you answer the user's questions,
you can use the following context:
# claudeMd
Codebase and user instructions...
</system-reminder>
```

</div>
<div>

<img src="/images/claude-md.png" style="max-height: 280px; border: 1px solid var(--border-color);" />

</div>
</div>

---

# CLAUDE.md 记录什么?

<div class="grid-2 mt-2">
<div class="card">

### 规则类

```markdown
DO NOT xxx, because xxx
Always use xxx to do xxx
```

</div>
<div class="card">

### 项目信息

```markdown
{项目概况: 名称/技术栈/架构}

## 核心技术栈
## 项目架构
## 开发命令
## 关键配置
## 开发注意事项
```

</div>
</div>

<div class="mt-2">

- 使用 `/init` 初始化 Claude.md
- 使用 `# content` 添加到 Claude.md

</div>

---

# Chat more before coding

<span class="tag-gold">最简单 最推荐</span> 提升 AI Coding 质量的方法

<div class="mt-2">

> 不仅仅是 "Chat More" 而是 **"先调查, 再规划, 再写代码"**

<div class="grid-2 mt-2">
<div>

**Cursor**: 切换 Plan/Code 模式

<img src="/images/cursor-plan.png" style="max-height: 180px; border: 1px solid var(--border-color);" />

</div>
<div>

**Claude Code**: `Shift + Tab` 切换

<img src="/images/cc-plan.png" style="max-height: 180px; border: 1px solid var(--border-color);" />

</div>
</div>

</div>

---

# SOP Coding

> 重复自己是最无聊的事情

<div class="mt-2">

如果在堆积业务代码, 非常推荐整理出一个 SOP

### 两种方法

1. **手动**: 在 commit 之前, 让 AI 总结操作步骤, 写入项目文档目录
2. **自动**: 使用 [recorder](https://recorder.tokenroll.ai/) 自动记录操作行为, 生成文档

</div>

---

# Option Coding

> 做选择题, 总是要比做填空题爽

<div class="grid-2 mt-2">
<div>

Claude Code 2.0.21 引入 `interactive question tool`

AI 可以主动向你发问, 你可以做选项回复

### 触发条件

- 在 **Plan 模式** 下更主动调用
- 让用户进行选择而不是输入

对于懒得打字的朋友们来说, 简直是福音

</div>
<div>

<img src="/images/option-coding.gif" style="max-height: 300px; border: 1px solid var(--border-color);" />

</div>
</div>

---

# llmdoc

> 文档系统在 AI Coding 中只会越来越重要

<div class="grid-2 mt-2">
<div>

LLM 没有长期记忆, 全部依赖于 Context

**文档系统 = 外挂持久化数据层**

帮助 AI 快速获取充分的信息

### 推荐工具

- [cc-plugin](https://github.com/TokenRollAI/cc-plugin): AI 自动生成文档

</div>
<div>

<img src="/images/llmdoc.png" style="max-height: 300px; border: 1px solid var(--border-color);" />

</div>
</div>

---
layout: section
---

# MCP

Model Context Protocol

---

# MCP 演示

<div class="mt-2" style="text-align: center;">

<img src="/images/mcp-demo.gif" style="max-height: 450px; border: 1px solid var(--border-color);" />

</div>

---

# 寻找 MCP

<div class="grid-2 mt-2">
<div>

### 官方渠道

- [官方收录 MCP Servers](https://github.com/modelcontextprotocol/servers)
- [Awesome MCP](https://github.com/punkpeye/awesome-mcp-servers)

</div>
<div>

### 社区平台

- [smithery.ai](https://smithery.ai/)
- [mcp.so](https://mcp.so/zh)
- [魔塔 MCP 广场](https://www.modelscope.cn/mcp)

</div>
</div>

---

# 常用 MCP

<div class="mt-2 text-sm">

- <span class="tag-gold">推荐</span> **[chrome-devtools-mcp](https://github.com/ChromeDevTools/chrome-devtools-mcp)**: Browser use, 获取 Console/网络请求日志
- <span class="tag-gold">推荐</span> **[figma](https://help.figma.com/hc/en-us/articles/32132100833559)**: Figma 集成
- **[K8S](https://github.com/containers/kubernetes-mcp-server)**: 注意使用 readonly 模式
- **[github](https://github.com/github/github-mcp-server)**: GitHub 交互 (推荐用 `gh` cli 替代)
- **[context7](https://github.com/upstash/context7)**: 上下文管理
- **[ref](https://ref.tools/)**: 准确的文档, Better than context7

</div>

---

# 不要使用的 MCP

<div class="mt-2">

### 黑名单

- **serena**: 太多重复功能, 不稳定的 LSP
- **所有超过 10 个 tools 的 MCP**: 只会让你的 Coding Agent 变笨

</div>

---

# 不要使用 MCP?

> 使用 Tools 是有代价的

<div class="grid-2 mt-2">
<div>

### MCP 的代价

- 每个 MCP Tool 占用一个昂贵的 `Tool` 位置
- Claude Code System Prompt 中 Tool 说明占 **530 Token (约 25%)**
- 一个 `mcp add` 可能引入 20+ 额外 tools

### 建议

<span class="highlight">只使用 0-2 个 MCP, 不需要时及时关掉</span>

</div>
<div>

<img src="/images/mcp-cost.png" style="max-height: 280px; border: 1px solid var(--border-color);" />

</div>
</div>

---

# MCP 最佳实践

> 唯一推荐: 在支持多 Agent 的工具中, 为每个 Agent 开启一个 MCP

<div class="mt-2" style="text-align: center;">

<img src="/images/cherry-mcp.png" style="max-height: 380px; border: 1px solid var(--border-color);" />

<p class="text-sm">在 Cherry Studio 中使用 MCP, 让一个 Agent 做一件事情</p>

</div>

---

# 我还使用哪些 AI 工具

<div class="grid-2 mt-2">
<div>

### 强烈推荐

- <span class="tag-gold">推荐</span> **[Cherry Studio](https://github.com/CherryHQ/cherry-studio)**: 桌面 AI 工具
- <span class="tag-gold">推荐</span> **[Gemini](http://gemini.google.com/)**: Pro 会员
- <span class="tag-gold">推荐</span> **[AIHubMix](https://aihubmix.com/models)**: AI 代理提供商
- <span class="tag-gold">推荐</span> **[notebooklm](https://notebooklm.google/)**: 知识库

</div>
<div>

### 其他工具

- **[Dify](https://dify.ai/)**: 简单功能快速接入
- **[zread](https://zread.ai/)** / **[deepwiki](https://deepwiki.com/)**: 分析开源 repo

</div>
</div>

---
layout: section
---

# 上下文工程

Context Engineering

---

# 学习材料

<div class="mt-2 text-sm">

### 必读

- [结构化提示词](https://github.com/langgptai/LangGPT): 入门教程
- <span class="tag-gold">必吃</span> [AI 代理的上下文工程](https://manus.im/zh-cn/blog/Context-Engineering-for-AI-Agents-Lessons-from-Building-Manus): Manus 经验
- <span class="tag-gold">必吃</span> [Manus AI Agent PPT](https://drive.google.com/file/d/1QGJ-BrdiTGslS71sYH4OJoidsry3Ps9g/view)
- [Context Rot](https://research.trychroma.com/context-rot): More Input, More Stupid
- [评估 LLM 的上下文能力](https://nrehiew.github.io/blog/long_context/): 1M 上下文是童话故事

</div>

---

# Anthropic 官方文章

<div class="mt-2 text-xs">

- [How we built our multi-agent research system](https://www.anthropic.com/engineering/multi-agent-research-system)
- [Effective context engineering for AI agents](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents)
- [Building agents with the Claude Agent SDK](https://www.anthropic.com/engineering/building-agents-with-the-claude-agent-sdk)
- [Writing effective tools for agents — with agents](https://www.anthropic.com/engineering/writing-tools-for-agents)
- [Building effective agents](https://www.anthropic.com/engineering/building-effective-agents)

</div>

---

# 更多资源

<div class="mt-2 text-xs">

- [Cognition | Don't Build Multi-Agents](https://cognition.ai/blog/dont-build-multi-agents)
- [Letta | Anatomy of a Context Window](https://www.letta.com/blog/guide-to-context-engineering)
- [Letta | Agent Memory](https://www.letta.com/blog/agent-memory)
- [Letta | RAG is not Agent Memory](https://www.letta.com/blog/rag-vs-agent-memory)
- [LangChain | The rise of "context engineering"](https://blog.langchain.com/the-rise-of-context-engineering/)
- [LangChain | Context Engineering for Agents](https://blog.langchain.com/context-engineering-for-agents/)
- [Github | 12 Factor Agents](https://github.com/humanlayer/12-factor-agents)

</div>

---
layout: section
---

# 一些暴论

Final Thoughts

---

# 暴论

<div class="mt-3">

1. <span class="highlight">Get Hands Dirty</span>, 动手做比什么都重要

2. **想象力 > 行动力 > 编程能力**<sup>（建立在有软件工程基本素质的前提下）</sup>

3. 领域的融合, 狭窄深邃不再是无法克服的问题

</div>

---
layout: center
---

# Q&A


