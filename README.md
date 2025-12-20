# Showcase of DJJ

基于 [Slidev](https://sli.dev/) 的多幻灯片展示平台，部署于 [ppt.tokenroll.ai](https://ppt.tokenroll.ai)

## 在线访问

- **首页**: [ppt.tokenroll.ai](https://ppt.tokenroll.ai)
- **AI Coding 分享**: [ppt.tokenroll.ai/ai-coding](https://ppt.tokenroll.ai/ai-coding/)
- **关于我**: [ppt.tokenroll.ai/about](https://ppt.tokenroll.ai/about/)

## 快速开始

```bash
# 安装依赖
npm install

# 开发模式（默认运行 ai-coding）
npm run dev

# 选择幻灯片开发
npm run dev:select

# 构建所有幻灯片
npm run build

# 本地预览构建产物
npm run preview
```

## 目录结构

```
├── slides/                 # 幻灯片源文件
│   ├── ai-coding.md        # AI Coding 分享
│   ├── about.md            # 个人介绍
│   ├── style.css           # 全局样式
│   └── images/             # 幻灯片图片
├── pages/                  # 网站首页
│   ├── index.html
│   └── css/style.css
├── Icon/                   # Favicon 图标
├── scripts/
│   ├── build-all.mjs       # 多幻灯片构建脚本
│   └── dev.mjs             # 开发选择器
└── wrangler.toml           # Cloudflare Pages 配置
```

## 主题风格

使用复古打字机风格：

- **背景色**: `#EBEAE3` (象牙白)
- **主文字**: `#292727` (深灰)
- **引用/备注**: `#8D8C88` (浅灰)
- **强调色**: `#F4BB40` (金色)
- **字体**: Crimson Pro (标题) / JetBrains Mono (正文)

## 添加新幻灯片

1. 在 `slides/` 目录下创建新的 `.md` 文件
2. 添加 frontmatter 配置：

```yaml
---
theme: default
title: 幻灯片标题
favicon: /Icon/favicon.svg
highlighter: shiki
drawings:
  enabled: false
transition: slide-left
mdc: true
presenter: false
download: false
record: false
routerMode: hash
---
```

3. 更新 `pages/index.html` 添加入口链接
4. 运行 `npm run build` 构建

## 部署

项目使用 Cloudflare Pages 自动部署：

- **构建命令**: `npm run build`
- **输出目录**: `dist`
- **域名**: `ppt.tokenroll.ai`

推送到 `main` 分支自动触发部署。

## 技术栈

- [Slidev](https://sli.dev/) - 基于 Vue 3 + Vite 的演示文稿框架
- [Cloudflare Pages](https://pages.cloudflare.com/) - 静态网站托管
- [UnoCSS](https://unocss.dev/) - 原子化 CSS 引擎

## License

MIT
