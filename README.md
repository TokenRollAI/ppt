# AI Coding Showcase

基于 [Slidev](https://sli.dev/) 的多幻灯片展示平台，支持单仓库管理多个演示文稿。

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
├── package.json
├── theme/                  # 公共主题
│   ├── layouts/            # 布局组件
│   ├── styles/             # 公共 CSS
│   └── setup/              # Shiki 等配置
├── slides/                 # 幻灯片源文件
│   ├── ai-coding.md
│   └── images/             # 公共图片
├── pages/                  # 网站首页
│   └── index.html
└── scripts/
    ├── build-all.mjs       # 构建脚本
    └── dev.mjs             # 开发选择器
```

## 添加新幻灯片

1. 在 `slides/` 目录下创建新的 `.md` 文件
2. 更新 `pages/index.html` 添加入口链接
3. 运行 `npm run build` 构建

## 部署到 Cloudflare Pages

1. 连接 GitHub 仓库到 Cloudflare Pages
2. 配置构建命令：`npm run build`
3. 配置输出目录：`dist`
4. 推送代码触发自动部署

## 可用布局

- `intro` - 演讲者介绍页
- `comparison` - 左右对比布局
- `code` - 全屏代码展示

## License

MIT
