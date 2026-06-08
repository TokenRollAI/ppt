---
theme: default
title: AI/Agent 入门 04 - 结构化输出与 Tools
favicon: /Icon/favicon.svg
info: |
  ## AI/Agent 入门 04 - 结构化输出与 Tools
  从 JSON Object 到 Tools：大模型工程接口的演进

  在线查看: https://ppt.tokenroll.ai/ai-agent-tools/
highlighter: shiki
drawings:
  enabled: false
transition: slide-left
mdc: true

presenter: false
download: false
exportFilename: ai-agent-tools-04
record: false
routerMode: hash
---

# AI/Agent 入门

## 04 · 结构化输出与 Tools

by DJJ

<div style="position: absolute; bottom: 2rem; right: 3rem; font-family: var(--font-mono); font-size: 0.75rem; color: var(--text-secondary);">
  ppt.tokenroll.ai
</div>

---
layout: center
---

# 今天搞清楚一条主线

<div class="big-text mt-3">

从<span class="highlight">人读的文本</span>，到<span class="highlight">程序执行的动作</span>

</div>

<div class="mt-3">

- 为什么模型的输出需要「结构」
- 结构化输出的四个台阶：文本 → JSON → Schema → 生成时保证
- 关键跃迁：从「返回数据」到「请求动作」
- Tools 进生产后的三个规模化问题与应对

</div>

---
layout: section
---

# 一、为什么需要结构化输出

把模型输出接进「软件系统」

---

# JSON 本来就不是为 LLM 发明的

<div class="grid-2 mt-3">
<div class="card">

### 它是通用交换格式

Web API、数据库中间层、前后端通信、配置、日志、消息队列，都依赖 JSON。

<p>它是现代软件系统之间交换数据的<span class="highlight">通用语言</span>。</p>

</div>
<div class="card">

### 但模型输出的是文本

LLM 原生输出是自然语言，不是程序能稳定消费的数据对象。

<p>聊天场景没问题，工程系统里很脆弱。</p>

</div>
</div>

<div class="mt-3">

> 结构化输出的第一层价值：把输出从「人读的文本」转成「程序读的数据」。

</div>

---

# 同一个答案，两种形态

<div class="grid-2 mt-3">
<div class="card">

### 程序想要的

```json
{
  "name": "Alice",
  "email": "alice@example.com",
  "years_of_experience": 5,
  "skills": ["Python", "React", "SQL"]
}
```

</div>
<div class="card">

### 模型可能给的

姓名是 Alice，邮箱是 alice@example.com，大概有 5 年经验，技能包括 Python、React 和 SQL。

<p class="mt-2">人能读懂，程序得继续做正则、切割、补字段、类型转换。</p>

</div>
</div>

<div class="mt-3">

> 没有结构，输出就进不了软件系统的「类型世界」。

</div>

---
layout: section
---

# 二、结构化输出的四个台阶

从「希望」到「保证」

---

# 台阶一 · Prompt-only JSON

<div class="text-sm" style="margin-bottom: 0.5rem;">最早的做法不是 API 能力，而是纯 prompt 约束。</div>

<div class="grid-2 mt-2">
<div class="card">

### 做法

在 prompt 里写：严格输出 JSON、不要 Markdown、不要解释、必须包含某些字段。

<p>本质是<span class="highlight">用自然语言约束自然语言模型</span>。</p>

</div>
<div class="card">

### 问题：只是软约束

包 code block、前后加解释、漏字段、类型错、枚举幻觉……

<p>工程上只能事后补救：parse 失败 → 重试 → JSON repair → 校验 → 再重试。</p>

</div>
</div>

<div class="mt-2">

> 模型先可能犯错，应用再修复。没有从生成机制上阻止错误。

</div>

---

# 台阶二 · JSON Mode

<div class="grid-2 mt-3">
<div class="card">

### 解决了什么

平台在输出层面保证结果是<span class="highlight">合法 JSON</span>。

<p>输出从「可能不可解析」变成「通常可解析」。</p>

</div>
<div class="card">

### 没解决什么

字段是否齐全？类型对不对？枚举有效吗？有没有多余字段？业务约束满足吗？

<p>这些它都<span class="highlight">不保证</span>。</p>

</div>
</div>

<div class="mt-3">

> JSON Mode 是中间阶段：保证「能 parse」，但还没保证「符合业务结构」。

</div>

---

# 台阶三 · JSON Schema

<div class="text-sm" style="margin-bottom: 0.5rem;">不是告诉模型「请输出 JSON」，而是定义这个 JSON 该长什么样。</div>

<div class="grid-2 mt-2">
<div class="card">

```json
{
  "type": "object",
  "properties": {
    "action": {
      "type": "string",
      "enum": ["search", "reply"]
    },
    "query": { "type": "string" }
  },
  "required": ["action", "query"],
  "additionalProperties": false
}
```

</div>
<div class="card">

### Schema 传达的信息

- 必须是 object
- 必须含 action / query
- action 只能是 search 或 reply
- 不能加 schema 外的字段

<p class="mt-2">它把 JSON 从<span class="highlight">数据格式</span>升级为<span class="highlight">数据契约</span>。</p>

</div>
</div>

---

# Schema 的两层：结构层 vs 语义层

<div class="grid-2 mt-3">
<div class="card">

### 结构层 — 能不能填

`type` · `properties` · `required` · `enum` · `items` · `additionalProperties`

<p>机器可验证。validator 和约束解码都看这层。</p>

</div>
<div class="card">

### 语义层 — 该怎么理解

`name` · `description` · `field description` · `examples`

<p><code>description</code> 是 annotation，不做 validation，但告诉模型「这个字段在语义上填什么」。</p>

</div>
</div>

<div class="mt-3">

> LLM 时代 `description` 突然变重要：模型会用字段名和描述来理解任务意图。

</div>

---

# 台阶四 · Structured Outputs

<div class="text-sm" style="margin-bottom: 0.5rem;">关键实现思想：Constrained Decoding（约束解码）。</div>

<div class="grid-2 mt-2">
<div class="card">

### 普通解码

模型预测下一个 token → 从整个词表里选 → 继续。

<p>错了只能<span class="highlight">事后</span>发现。</p>

</div>
<div class="card">

### 约束解码

预测分布 → grammar engine 判断当前哪些 token 合法 → 非法 token 概率压到 0 → 采样。

<p>OpenAI 把 Schema 转成 context-free grammar，逐 token 约束。</p>

</div>
</div>

<div class="mt-2">

> 从「说完再检查对不对」，推进到「每说一个 token 就不让它说错格式」。

</div>

---

# 但约束解码有边界

<div class="grid-2 mt-3">
<div class="card">

### 它保证

结构合法。`{ "city": "Paris" }` 里 city 一定是字符串。

</div>
<div class="card">

### 它不保证

语义正确。Paris 是不是用户真正想问的城市，它管不了。

</div>
</div>

<div class="mt-3 text-muted">

事实正确性、业务正确性、意图匹配，仍依赖模型理解、上下文、工具结果和应用侧校验。

</div>

---
layout: section
---

# 三、从 Structured Outputs 到 Tools

那个关键跃迁

---

# 同样用 Schema，目的完全不同

<div class="grid-2 mt-3">
<div class="card">

### Structured Outputs

模型输出的是<span class="highlight">结果</span>。

```json
{ "intent": "check_weather",
  "city": "Paris" }
```

<p>给应用程序消费的结构化答案。</p>

</div>
<div class="card">

### Tools / Function Calling

模型输出的是<span class="highlight">请求</span>。

```json
{ "tool": "get_weather",
  "arguments": { "location": "Paris" } }
```

<p>让应用程序执行的结构化动作。</p>

</div>
</div>

<div class="mt-3">

> Tools 不是「更复杂的 JSON」，而是把模型输出变成软件系统的<span class="highlight">动作接口</span>。

</div>

---

# 调用者，从程序员变成了模型

<div class="grid-2 mt-3">
<div class="card">

### 传统 API 调用

调用者是程序员写的代码：

```js
app.call("get_weather",
  { location: "Paris" })
```

</div>
<div class="card">

### Tools

调用者变成模型：

```text
model decides:
  call get_weather(location="Paris")
```

<p>但模型<span class="highlight">不直接拥有执行权限</span>。</p>

</div>
</div>

<div class="mt-3">

> 模型只生成调用请求，真正的执行发生在应用 / 平台 runtime —— 这就是 Tools 的安全边界。

</div>

---

# Tool Definition 的组成

| 字段 | 作用 |
| --- | --- |
| `name` | 工具标识，模型用它指定调用哪个工具 |
| `description` | 工具语义：做什么、什么时候用、什么时候不用 |
| `parameters` / `input_schema` | 输入参数的 JSON Schema |
| `strict` | 是否强制调用参数严格符合 schema |

<div class="mt-2">

> Tools 把 JSON Schema 从「输出格式约束」升级成「函数参数契约」。

</div>

---

# 为什么 Tools 特别依赖 Description

<div class="text-sm" style="margin-bottom: 0.5rem;">两个工具参数 schema 完全一样，靠什么区分？</div>

<div class="grid-2 mt-2">
<div class="card">

### search_web

> Search public web pages for current, factual, or time-sensitive info. Use when the answer may have changed recently. **Do not** use for private files or internal docs.

</div>
<div class="card">

### search_docs

> Search internal company documents and uploaded files.

</div>
</div>

<div class="mt-2">

> Schema 约束「参数长什么样」；Description 解释「什么时候该用、什么时候不该用」。它是 tool routing 的语义信号。

</div>

---

# Tools 在完整上下文里的位置

<div class="grid-2 mt-3">
<div class="card">

### 三层职责

- **全局策略** — System Prompt
- **当前任务** — User Message
- **外部能力** — Tools / Description / Schema

</div>
<div class="card">

### 谁管什么

- System：优先用 web_search / 未确认不下单
- User：「帮我查巴黎天气」
- Tools：可请求的能力清单

</div>
</div>

<div class="mt-3">

> 工具定义会注入模型上下文 —— name / description / schema 都消耗 input token，也都影响模型判断。

</div>

---

# Tools 的完整执行流

<div class="timeline mt-3">
  <div class="timeline-item">
    <div class="timeline-company">1 · 发送</div>
    <div class="timeline-role">App 发 user message，同时提供 tools 定义</div>
  </div>
  <div class="timeline-item">
    <div class="timeline-company">2 · 决策</div>
    <div class="timeline-role">模型判断是否调用，需要则返回 tool call</div>
  </div>
  <div class="timeline-item">
    <div class="timeline-company">3 · 执行</div>
    <div class="timeline-role">App 解析 tool call，执行真实函数</div>
  </div>
  <div class="timeline-item">
    <div class="timeline-company">4 · 回填</div>
    <div class="timeline-role">tool result 送回模型，作为 observation</div>
  </div>
  <div class="timeline-item">
    <div class="timeline-company">5 · 续写</div>
    <div class="timeline-role">模型基于结果生成回答，或继续请求工具</div>
  </div>
</div>

---
layout: section
---

# 四、高阶工具能力

Tools 进生产后的三个规模化痛点

---

# 当工具从「几个」变成「上千个」

<div class="big-text mt-3">

从工具<span class="highlight">列表</span>，到工具<span class="highlight">基础设施</span>

</div>

<div class="grid-3 mt-3">
<div class="card">

### 数量规模化

工具太多，全塞进上下文成本高、准确率掉。

</div>
<div class="card">

### 参数规模化

参数很长，等完整 JSON 才能处理，延迟高。

</div>
<div class="card">

### 步骤规模化

多步调用每步都往返模型，token 与延迟爆炸。

</div>
</div>

---

# 痛点一 · Tool Search

<div class="text-sm" style="margin-bottom: 0.5rem;">工具不再全部进上下文，而是按需加载。</div>

<div class="grid-2 mt-2">
<div class="card">

### 为什么

工具超过 30–50 个，模型选择准确率显著下降，上下文也膨胀。

<p>先看「工具目录索引」，需要时再搜索、动态注入。</p>

</div>
<div class="card">

### 怎么做

- **OpenAI**：Hosted（服务端搜索，`defer_loading`）/ Client-executed（模型发 `tool_search_call`）
- **Claude**：内置 Regex / BM25，返回 3–5 个最相关工具

</div>
</div>

<div class="mt-2">

> 工具系统从静态 Prompt 注入，变成动态能力发现。

</div>

---

# 痛点二 · Fine-grained Tool Streaming

<div class="text-sm" style="margin-bottom: 0.5rem;">打破「等待完整 JSON」的延迟魔咒。</div>

<div class="grid-2 mt-2">
<div class="card">

### 传统流式

等完整 JSON 缓冲 + 校验后再交给应用。

<p>结构可靠，但大参数场景<span class="highlight">首字节延迟高</span>。</p>

</div>
<div class="card">

### 细粒度流式

参数边生成边以 delta 流出，跳过服务端全量校验。

<p>工具更早开始处理，代价：客户端要自己处理残缺 / 无效 JSON。</p>

</div>
</div>

<div class="mt-2">

> 适合生成长文件、长代码、批量数据。Tools 开始向实时数据通道演进。

</div>

---

# 痛点三 · Programmatic Tool Calling

<div class="text-sm" style="margin-bottom: 0.5rem;">让模型生成「调用工具的程序」。</div>

<div class="grid-2 mt-2">
<div class="card">

### 传统多步

调 A → 回填 → 调 B → 回填……
20 次调用 = 20 次模型往返。

</div>
<div class="card">

### 编程式

模型在沙盒里写 Python，代码批量调工具，中间结果在代码层处理，<span class="highlight">只把有用结果送回模型</span>。

</div>
</div>

<div class="mt-2">

> 适合扇出查询、大结果过滤、批量聚合、agentic 检索。相当于把微型 Agent 循环下沉到代码执行环境。

</div>

---

# 高阶能力横向对比

| 能力 | 解决的问题 | 关键机制 | 主要代价 |
| --- | --- | --- | --- |
| Tool Search | 工具太多，上下文贵、准确率降 | 索引 + 检索 + 按需加载 | 需精心设计命名与描述 |
| Fine-grained Streaming | 大参数等完整 JSON 延迟高 | 参数 delta 流式，跳过全量校验 | 客户端处理残缺 JSON |
| Programmatic Calling | 多步往返、上下文膨胀 | 沙盒生成代码批量调用 | 沙盒启动 + 执行开销 |

---

# 高阶能力对 Description 的新要求

<div class="grid-2 mt-3">
<div class="card">

### Description 承担两层职责

- **调用时语义** — 帮模型决定是否调用
- **检索时语义** — 帮模型在大目录里「搜」到它

<p>Tool Search 会搜工具名、描述、参数名、参数描述。</p>

</div>
<div class="card">

### 一个对比

❌ `Get user data.`

✅ Fetch a user's CRM profile by internal customer ID, including status, plan, renewal date. Use for support / account questions. Do not use for auth or billing.

</div>
</div>

<div class="mt-2">

> 编程式调用里，模型会在代码里反序列化结果 —— Schema 与 Output Description 的严谨性更关键。

</div>

---
layout: center
---

# 一条主线，七个台阶

<div class="mt-3 text-sm" style="max-width: 760px; margin: 0 auto;">

1. **JSON Object** — 让输出可解析
2. **JSON Schema** — 让输出可验证
3. **Structured Outputs** — 让 Schema 参与生成
4. **Tools** — 让模型生成结构化动作请求
5. **Tool Search** — 大目录中按需发现能力
6. **Fine-grained Streaming** — 工具参数变低延迟数据流
7. **Programmatic Calling** — 把多步交互下沉到代码沙盒
→ **Agent Loop** — 在工具结果的反馈中持续决策

</div>

<div class="mt-2">

> JSON 是数据格式，Schema 是数据契约，Tools 是动作契约，Agent Loop 是围绕动作契约展开的执行系统。

</div>

---

# 三类能力的边界

<div class="grid-3 mt-3">
<div class="card">

### Structured Outputs

控制<span class="highlight">最终回答</span>的形状。

<p>数据抽取、分类、结构化输出。</p>

</div>
<div class="card">

### Tools

控制模型<span class="highlight">请求动作</span>的形状。

<p>连接外部函数、API、系统能力。</p>

</div>
<div class="card">

### Agent Loop

控制<span class="highlight">动作-观察-再决策</span>的过程。

<p>从问答模型，变成任务执行体。</p>

</div>
</div>

<div class="mt-3">

> 连工具用 function calling；只想最终回答有结构用 structured response。两者都用 Schema，目的不同。

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
    <div class="timeline-company">任务一 · 结构化输出</div>
    <div class="timeline-role">调用任意模型，返回一个固定的 JSON Schema</div>
  </div>
  <div class="timeline-item">
    <div class="timeline-company">任务二 · 做工具</div>
    <div class="timeline-role">实现 Read / Write / Update / List 工具，并验证调用</div>
  </div>
  <div class="timeline-item">
    <div class="timeline-company">任务三 · 最小 Agent</div>
    <div class="timeline-role">基于以上工具，实现一个最小版本的 Agent Loop</div>
  </div>
</div>

<div class="mt-2">

> 串起来你就会发现：一个 Agent，本质就是「结构化动作 + 工具执行 + 结果回填」的循环。

</div>

---

# 参考来源

<div class="grid-2 mt-3">
<div class="card">

### 结构化输出

- <a href="https://platform.openai.com/docs/guides/structured-outputs" target="_blank">OpenAI Structured Outputs</a>
- <a href="https://json-schema.org/learn/getting-started-step-by-step" target="_blank">JSON Schema 入门</a>
- <a href="https://ai.google.dev/gemini-api/docs/structured-output" target="_blank">Gemini Structured Outputs</a>

</div>
<div class="card">

### 工具与高阶能力

- <a href="https://platform.openai.com/docs/guides/function-calling" target="_blank">OpenAI Function Calling</a>
- <a href="https://docs.anthropic.com/en/docs/build-with-claude/tool-use" target="_blank">Anthropic Tool Use</a>
- <a href="https://docs.anthropic.com/en/docs/agents-and-tools/tool-use/programmatic-tool-calling" target="_blank">Claude Programmatic Tool Calling</a>

</div>
</div>

---
layout: center
---

# End

<div class="mt-3">

模型负责<span class="highlight">理解意图与编排</span>，Runtime 负责检索、执行、流式与隔离。<br/>
Tools，正在变成大模型的<span class="highlight">能力操作系统</span>。

</div>
