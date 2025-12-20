#!/usr/bin/env node
/**
 * build-all.mjs - 多幻灯片构建脚本
 * 扫描 slides/ 目录下的所有 .md 文件，逐个构建到 dist/ 目录
 */

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const slidesDir = path.join(rootDir, 'slides');
const distDir = path.join(rootDir, 'dist');
const pagesDir = path.join(rootDir, 'pages');

console.log('🚀 Starting multi-slide build process...\n');

// 1. 清理旧的 dist 目录
if (fs.existsSync(distDir)) {
    console.log('🧹 Cleaning old dist directory...');
    fs.rmSync(distDir, { recursive: true });
}
fs.mkdirSync(distDir, { recursive: true });

// 2. 复制首页和相关资源
const indexSource = path.join(pagesDir, 'index.html');
const indexDest = path.join(distDir, 'index.html');
if (fs.existsSync(indexSource)) {
    console.log('📄 Copying landing page...');
    fs.copyFileSync(indexSource, indexDest);
} else {
    console.warn('⚠️  Warning: pages/index.html not found, skipping landing page.');
}

// 复制 pages/css 目录
const pagesCssDir = path.join(pagesDir, 'css');
const distCssDir = path.join(distDir, 'css');
if (fs.existsSync(pagesCssDir)) {
    console.log('🎨 Copying landing page CSS...');
    copyDirRecursive(pagesCssDir, distCssDir);
}

// 复制 Icon 目录
const iconDir = path.join(rootDir, 'Icon');
const distIconDir = path.join(distDir, 'Icon');
if (fs.existsSync(iconDir)) {
    console.log('🎨 Copying icons...');
    copyDirRecursive(iconDir, distIconDir);
}

// 3. 复制公共资源 (如果存在)
const publicImagesDir = path.join(slidesDir, 'images');
const distImagesDir = path.join(distDir, 'images');
if (fs.existsSync(publicImagesDir)) {
    console.log('🖼️  Copying shared images...');
    copyDirRecursive(publicImagesDir, distImagesDir);
}

// 4. 扫描 slides 目录下的 Markdown 文件
const mdFiles = fs.readdirSync(slidesDir).filter(f => f.endsWith('.md'));

if (mdFiles.length === 0) {
    console.error('❌ No markdown files found in slides/ directory!');
    process.exit(1);
}

console.log(`\n📚 Found ${mdFiles.length} slide(s) to build:\n`);
mdFiles.forEach(f => console.log(`   - ${f}`));
console.log('');

// 5. 逐个构建幻灯片
const results = [];
const slideNames = [];

for (const file of mdFiles) {
    const name = file.replace('.md', '');
    slideNames.push(name);
    const slidePath = path.join(slidesDir, file);
    const outDir = path.join(distDir, name);

    console.log(`\n🔨 Building "${name}"...`);
    console.log(`   Source: ${slidePath}`);
    console.log(`   Output: ${outDir}`);

    // 关键：--base 参数确保资源在子路径下正确加载
    const cmd = `npx slidev build "${slidePath}" --base /${name}/ --out "${outDir}"`;

    try {
        execSync(cmd, {
            stdio: 'inherit',
            cwd: rootDir
        });
        results.push({ name, success: true });
        console.log(`   ✅ "${name}" built successfully!`);
    } catch (e) {
        results.push({ name, success: false, error: e.message });
        console.error(`   ❌ Failed to build "${name}": ${e.message}`);
    }
}

// 6. 生成 Cloudflare Pages _redirects 文件 (SPA 路由支持)
console.log('\n📝 Generating _redirects for Cloudflare Pages...');
let redirects = '';
for (const name of slideNames) {
    // 每个 slide 的 SPA 路由：所有子路径都指向该 slide 的 index.html
    redirects += `/${name}/* /${name}/index.html 200\n`;
}
// 添加根路径重定向（可选）
// redirects += `/* /index.html 200\n`;
fs.writeFileSync(path.join(distDir, '_redirects'), redirects);

// 7. 生成 _headers 文件 (安全头 + 缓存策略)
console.log('📝 Generating _headers for Cloudflare Pages...');
const headers = `/*
  X-Frame-Options: DENY
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin

/*.js
  Cache-Control: public, max-age=31536000, immutable

/*.css
  Cache-Control: public, max-age=31536000, immutable

/*.woff2
  Cache-Control: public, max-age=31536000, immutable
`;
fs.writeFileSync(path.join(distDir, '_headers'), headers);

// 8. 生成 404.html
console.log('📝 Generating 404.html...');
const html404 = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>404 - Page Not Found</title>
    <style>
        body {
            font-family: 'Crimson Pro', Georgia, serif;
            background: #EBEAE3;
            color: #000;
            display: flex;
            align-items: center;
            justify-content: center;
            min-height: 100vh;
            margin: 0;
            text-align: center;
        }
        h1 { font-size: 4rem; margin-bottom: 1rem; }
        p { color: #8D8C88; }
        a { color: #000; }
    </style>
</head>
<body>
    <div>
        <h1>404</h1>
        <p>Page not found</p>
        <p><a href="/">← Back to Home</a></p>
    </div>
</body>
</html>`;
fs.writeFileSync(path.join(distDir, '404.html'), html404);

// 9. 生成构建报告
console.log('\n' + '='.repeat(50));
console.log('📊 Build Summary:');
console.log('='.repeat(50));

const successful = results.filter(r => r.success);
const failed = results.filter(r => !r.success);

console.log(`   ✅ Successful: ${successful.length}`);
console.log(`   ❌ Failed: ${failed.length}`);

if (failed.length > 0) {
    console.log('\n   Failed slides:');
    failed.forEach(r => console.log(`      - ${r.name}`));
    process.exit(1);
}

console.log('\n🎉 All slides built successfully!');
console.log(`\n📁 Output directory: ${distDir}`);
console.log('\n📋 Generated files:');
console.log('   - _redirects (SPA routing)');
console.log('   - _headers (security headers)');
console.log('   - 404.html');
console.log('\n💡 To preview locally, run: npm run preview');

// 辅助函数：递归复制目录
function copyDirRecursive(src, dest) {
    if (!fs.existsSync(dest)) {
        fs.mkdirSync(dest, { recursive: true });
    }

    const entries = fs.readdirSync(src, { withFileTypes: true });

    for (const entry of entries) {
        const srcPath = path.join(src, entry.name);
        const destPath = path.join(dest, entry.name);

        if (entry.isDirectory()) {
            copyDirRecursive(srcPath, destPath);
        } else {
            fs.copyFileSync(srcPath, destPath);
        }
    }
}
