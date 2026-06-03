---
theme: default
title: AI/Agent 入门 02 - 模型入门
favicon: /Icon/favicon.svg
info: |
  ## AI/Agent 入门 02 - 模型入门
  模态、规模、部署方式与厂商生态

  在线查看: https://ppt.tokenroll.ai/ai-agent-model/
highlighter: shiki
drawings:
  enabled: false
transition: slide-left
mdc: true

presenter: false
download: false
exportFilename: ai-agent-model-02
record: false
routerMode: hash
---

# AI/Agent 入门

## 02 · 模型入门

by DJJ

<div style="position: absolute; bottom: 2rem; right: 3rem; font-family: var(--font-mono); font-size: 0.75rem; color: var(--text-secondary);">
  ppt.tokenroll.ai
</div>

---
layout: center
---

# 今天搞清楚四件事

<div class="big-text mt-3">

模型不是只有<span class="highlight">一个 ChatGPT</span>

</div>

<div class="mt-3">

- 模态：模型能看懂、能生成哪几种东西
- 规模：参数量决定能力，也决定能不能在本地跑
- 部署：本地还是云端，怎么选
- 生态：厂商和它们的模型谱系

</div>

---
layout: section
---

# 一、模态

信息被感知、表达、理解的一种形式

---

# 什么是模态

<div class="grid-2 mt-3">
<div class="card">

### 定义

把"信息被感知 / 表达 / 理解的一种形式"称为一种**模态**。

- 文字是一种模态
- 图片是一种模态
- 声音、视频也是

</div>
<div class="card">

### 人类天然多模态

我们同时用眼睛、耳朵、语言去理解世界。

<p>大模型正在从<span class="highlight">单一文本</span>走向<span class="highlight">多模态融合</span>。</p>

</div>
</div>

---

# 常见模态

| 模态 | 典型形式 | 代表能力 / 模型 |
| --- | --- | --- |
| 文字 | 文章、代码、对话 | GPT、Claude、Gemini |
| 图片 | 照片、图表、截图、扫描件 | GPT-4o、Claude、Gemini |
| 声音 | 语音、环境音 | Whisper、Realtime |
| 视频 | 连续帧 + 音轨 | Seedance、Sora |
| 3D 模型 | 点云、网格、场景 | Tripo、Meshy |
| 音乐 | 旋律、节奏、编曲 | Suno、MusicGen |
| Embedding / Reranker | 以文本为主，部分已支持多模态 | CLIP、Qwen、OpenAI |

---

# 关键概念

<div class="grid-3 mt-3">
<div class="card">

### 单模态

只能处理一种模态。

<p>例如早期的纯文本对话模型，只吃文字、只吐文字。</p>

</div>
<div class="card">

### 多模态

能同时理解或生成多种模态。

<p>看图说话（图 → 文）、文生图（文 → 图）。</p>

</div>
<div class="card">

### 模态对齐

把不同模态映射到同一语义空间，实现跨模态理解。

<p>CLIP 就是典型代表。</p>

</div>
</div>

<div class="mt-3">

> CLIP 把图片和文字编码到同一向量空间，让"一张猫的图片"和"猫"这个词在空间中彼此靠近。

</div>

---
layout: section
---

# 二、规模

参数量很大程度上决定了模型的能力

---

# 规模分层

<div class="text-sm" style="margin-bottom: 0.5rem;">常用单位是 B（Billion，十亿）参数。</div>

| 量级 | 代表 | 特点 | 部署门槛 |
| --- | --- | --- | --- |
| 小型 | 1B ~ 8B | 可在消费级设备 / 笔记本运行 | 低，适合本地 |
| 中型 | 8B ~ 70B | 单卡 / 多卡 GPU | 中 |
| 大型 | 70B ~ 数百 B 甚至更大 | 集群训练与推理 | 高 |

<div class="mt-2">

> 另一条并列维度是**开源 vs 闭源**。顶级闭源商业模型规模更大（业界推测达 1T+，官方多未公开），通常只在云上提供。

</div>

---

# 与规模相关的概念

<div class="grid-2 mt-3">
<div class="card">

### Scaling Law 缩放定律

数据与算力充足时，性能随参数 / 数据 / 算力规模平滑提升。

</div>
<div class="card">

### 涌现能力 Emergent Abilities

某些能力（如复杂推理）只在规模超过阈值后才出现。

<p>注：学界对它是否"真涌现"仍有争议。</p>

</div>
<div class="card">

### 量化 Quantization

权重从 FP16 压到 INT8 / INT4，显著降低显存占用。

<p>本地部署的关键技术（LM Studio 默认用 <code>GGUF</code> 量化）。</p>

</div>
<div class="card">

### 蒸馏 Distillation

用大模型"教"小模型，让小模型以更小规模逼近大模型能力。

</div>
</div>

---

# 不只看参数：上下文窗口

<div class="grid-2 mt-3">
<div class="card">

### 什么是上下文窗口

模型一次能"读进去"的最大 token 量，决定它能同时记住多少信息。

- 单位也是 token
- 从几 K 到上百万不等

</div>
<div class="card">

### 为什么重要

- 长文档 / 长对话 / 整个代码库
- Agent 的记忆与多轮推理
- 与参数规模**并列**的能力维度

</div>
</div>

<div class="mt-3">

> 参数决定模型"多聪明"，上下文窗口决定它一次"能看多少"。两者都要看。

</div>

---
layout: center
---

# 规模不是越大越好

<div class="big-text mt-3">

任务匹配才重要

</div>

<div class="mt-3">

看懂一张图片、写一段描述 —— 一个 <span class="highlight">2B~4B</span> 的多模态小模型完全胜任，还能在本地免费、私密地运行。

</div>

---
layout: section
---

# 三、部署方式

本地，还是云端？

---

# 本地模型

<div class="text-sm" style="margin-bottom: 0.5rem;">把模型权重下载到本机，在本地完成推理。</div>

<div class="grid-2 mt-2">
<div class="card">

### 优点

- 🔒 隐私：数据不出本机
- 💰 零调用成本：无 API 费用
- 🌐 离线可用：无需联网
- 🛠 可控：可自由微调、替换、量化

</div>
<div class="card">

### 代价

- 受本机硬件（显存 / 内存）限制
- 通常只能跑中小模型
- 需自己管理环境、模型文件、推理服务

</div>
</div>

---

# 常用本地部署工具

<div class="grid-2 mt-3">
<div class="card">

### LM Studio

图形化界面，开箱即用，内置模型市场。

<p><span class="highlight">本次作业使用</span></p>

</div>
<div class="card">

### Ollama

命令行 + 本地 API，一行命令拉起模型。

</div>
<div class="card">

### llama.cpp / GGUF

底层推理引擎与量化格式，上面两者都基于它。

</div>
<div class="card">

### vLLM

面向高吞吐的生产级推理框架。

</div>
</div>

---

# 云端 API

<div class="grid-2 mt-3">
<div class="card">

### 特点

通过 HTTP 调用厂商托管的大模型。

- 免去部署烦恼
- 能用上最强的大模型
- 但需付费、依赖网络、数据需出本机

</div>
<div class="card">

### 实际工程：混合使用

- 敏感 / 高频任务 → 本地小模型
- 复杂 / 高质量任务 → 云端大模型

</div>
</div>

<div class="mt-3">

> 本地与云端不是二选一，而是按任务的隐私、成本和质量需求灵活搭配。

</div>

---
layout: section
---

# 四、厂商生态

谁在做模型，怎么调用

---

# 厂商生态

| 厂商 | 代表模型 | 调用方式 | 特点 |
| --- | --- | --- | --- |
| OpenAI | GPT 系列、Whisper、Sora | Chat Completions / Responses API | 生态成熟，工具丰富 |
| Anthropic | Claude 系列 | Messages API | 长上下文、Agent 能力（本讲示例） |
| Google | Gemini、Gemma（开源） | Gemini API | 原生多模态，Gemma 可本地部署（作业使用） |
| Meta | Llama（开源） | 自托管 / 第三方 | 开源生态基石 |
| Mistral / Qwen / DeepSeek 等 | 各自系列 | 自有 API / 开源 | 开源与闭源并存 |

---
layout: section
---

# 作业

非强制，但强烈建议动手

---

# 任务一：本地部署多模态小模型

<div class="text-sm" style="margin-bottom: 0.5rem;">用 LM Studio 在本地部署一个支持视觉（vision）的小模型。</div>

<div class="timeline mt-2">
  <div class="timeline-item">
    <div class="timeline-company">安装 LM Studio</div>
    <div class="timeline-role">lmstudio.ai</div>
  </div>
  <div class="timeline-item">
    <div class="timeline-company">下载多模态模型</div>
    <div class="timeline-role">在模型市场搜索带 vision 标识的版本</div>
  </div>
  <div class="timeline-item">
    <div class="timeline-company">加载并启动 Local Server</div>
    <div class="timeline-role">开启本地 API 服务</div>
  </div>
</div>

<div class="mt-2">

> 选型建议：硬件较弱选 2B，体验更好选 4B；优先选已量化（GGUF，如 Q4）的版本以降低内存占用。

</div>

---

# 任务一：推荐模型

<div class="mt-3">

模型市场：[lmstudio.ai/models](https://lmstudio.ai/models)

推荐尝试 **Gemma 系列** 4B / 2B（注意选带 vision / 多模态标识的版本）。

<div class="mt-2">

- [Gemma 4 E4B](https://lmstudio.ai/models/google/gemma-4-e4b)
- [Gemma 4 E2B](https://lmstudio.ai/models/google/gemma-4-e2b)

</div>
</div>

---

# 任务二：图片 → 人物介绍

<div class="grid-2 mt-3">
<div class="card">

### 目标

调用本地模型，传入一张人物图片，让它**描述并介绍**画面中的人物。

<p>外观、衣着、场景、推测的年龄 / 情绪 / 身份角色。</p>

</div>
<div class="card">

### 串起本讲的概念

- 多模态：图片输入 → 文字输出
- 小规模 + 量化：本地也能跑
- 本地部署：私密、零成本

</div>
</div>

<div class="mt-3">

> 预期管理：小模型擅长**描述**人物特征，但通常**认不出"这是谁"**（具体身份），出于隐私还可能拒答。建议用普通人物或角色图，关注它的描述能力，而非身份识别。

</div>

---
layout: center
---

# End

<div class="mt-3">

选对模型，比追最大的模型更重要。

</div>
