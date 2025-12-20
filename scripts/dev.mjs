#!/usr/bin/env node
/**
 * dev.mjs - 开发模式选择器
 * 交互式选择要开发的幻灯片
 */

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import readline from 'readline';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const slidesDir = path.join(rootDir, 'slides');

// 扫描可用的幻灯片
const mdFiles = fs.readdirSync(slidesDir).filter(f => f.endsWith('.md'));

if (mdFiles.length === 0) {
    console.error('❌ No markdown files found in slides/ directory!');
    process.exit(1);
}

// 如果只有一个文件，直接启动
if (mdFiles.length === 1) {
    const slidePath = path.join(slidesDir, mdFiles[0]);
    console.log(`🚀 Starting dev server for: ${mdFiles[0]}`);
    execSync(`npx slidev "${slidePath}" --open`, { stdio: 'inherit', cwd: rootDir });
    process.exit(0);
}

// 显示选择菜单
console.log('\n📚 Available slides:\n');
mdFiles.forEach((f, i) => {
    console.log(`   ${i + 1}. ${f.replace('.md', '')}`);
});

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('\n👉 Enter the number of the slide to develop: ', (answer) => {
    const index = parseInt(answer) - 1;

    if (isNaN(index) || index < 0 || index >= mdFiles.length) {
        console.error('❌ Invalid selection!');
        rl.close();
        process.exit(1);
    }

    const selectedFile = mdFiles[index];
    const slidePath = path.join(slidesDir, selectedFile);

    rl.close();

    console.log(`\n🚀 Starting dev server for: ${selectedFile}\n`);
    execSync(`npx slidev "${slidePath}" --open`, { stdio: 'inherit', cwd: rootDir });
});
