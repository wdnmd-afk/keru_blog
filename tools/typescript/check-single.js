#!/usr/bin/env node

/**
 * 单项目 TypeScript 检测脚本
 * 用于检测 keru_blog 项目中的单个子项目
 *
 * 使用方法:
 * node tools/typescript/check-single.js <project>
 *
 * 支持的项目:
 * - frontend: 检测 frontEnd 项目
 * - management: 检测 management 项目
 * - server: 检测 server 项目
 */

import {
  PROJECT_CONFIGS,
  checkProjectExists,
  runTypeScriptCheck,
  saveCheckResult
} from './utils.js';

/**
 * 显示使用帮助
 */
function showHelp() {
  console.log(`
🔍 keru_blog TypeScript 单项目检测工具

使用方法:
  node tools/typescript/check-single.js <project>

支持的项目:
  frontend    - 检测 frontEnd 项目 (React + Vite)
  management  - 检测 management 项目 (React + Vite)
  server      - 检测 server 项目 (Node.js + Express)

示例:
  node tools/typescript/check-single.js frontend
  node tools/typescript/check-single.js management
  node tools/typescript/check-single.js server

选项:
  --help, -h  显示此帮助信息

输出:
  检测结果将保存到 tools/tsError/<project>/ 目录下
  - error-report.json: 详细的 JSON 格式报告
  - error-summary.md: 可读的 Markdown 格式摘要
  - raw-output.txt: 原始错误输出 (仅在有错误时生成)
`);
}

/**
 * 主函数
 */
async function main() {
  const args = process.argv.slice(2);

  // 检查是否请求帮助
  if (args.includes('--help') || args.includes('-h') || args.length === 0) {
    showHelp();
    process.exit(0);
  }

  const projectKey = args[0];

  // 验证项目参数
  if (!PROJECT_CONFIGS[projectKey]) {
    console.error(`❌ 错误: 未知的项目 "${projectKey}"`);
    console.error(`支持的项目: ${Object.keys(PROJECT_CONFIGS).join(', ')}`);
    console.error(`使用 --help 查看详细帮助信息`);
    process.exit(1);
  }

  console.log(`🚀 keru_blog TypeScript 检测工具启动`);
  console.log(`📋 检测项目: ${PROJECT_CONFIGS[projectKey].displayName}`);
  console.log(`⏰ 开始时间: ${new Date().toLocaleString('zh-CN')}`);
  console.log('─'.repeat(50));

  try {
    // 检查项目是否存在
    if (!checkProjectExists(projectKey)) {
      console.error(`❌ 项目检查失败: ${projectKey}`);
      process.exit(1);
    }

    // 执行 TypeScript 检测
    const result = runTypeScriptCheck(projectKey);

    // 保存检测结果
    saveCheckResult(result);

    console.log('─'.repeat(50));

    if (result.success) {
      console.log(`🎉 检测完成: ${result.projectName} 无 TypeScript 错误`);
      console.log(`⏱️  总耗时: ${result.duration}ms`);
      process.exit(0);
    } else {
      console.log(`⚠️  检测完成: ${result.projectName} 发现 ${result.errors.length} 个错误`);
      console.log(`⏱️  总耗时: ${result.duration}ms`);
      console.log(`📁 错误报告已保存到: ${PROJECT_CONFIGS[projectKey].errorOutputDir}`);

      // 显示前几个错误的简要信息
      if (result.errors.length > 0) {
        console.log('\n📋 错误预览 (前3个):');
        result.errors.slice(0, 3).forEach((error, index) => {
          console.log(`  ${index + 1}. ${error.file}:${error.line}:${error.column}`);
          console.log(`     ${error.code}: ${error.message}`);
        });

        if (result.errors.length > 3) {
          console.log(`     ... 还有 ${result.errors.length - 3} 个错误，详见报告文件`);
        }
      }

      process.exit(1);
    }

  } catch (error) {
    console.error('─'.repeat(50));
    console.error(`💥 检测过程中发生意外错误:`);
    console.error(`错误信息: ${error.message}`);

    if (error.stack) {
      console.error(`错误堆栈:`);
      console.error(error.stack);
    }

    console.error('─'.repeat(50));
    console.error(`🔧 故障排除建议:`);
    console.error(`1. 确保项目依赖已安装 (npm install)`);
    console.error(`2. 确保 TypeScript 已安装`);
    console.error(`3. 检查 tsconfig.json 配置是否正确`);
    console.error(`4. 确保项目路径正确`);

    process.exit(1);
  }
}

// 处理未捕获的异常
process.on('uncaughtException', (error) => {
  console.error('💥 未捕获的异常:', error.message);
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('💥 未处理的 Promise 拒绝:', reason);
  process.exit(1);
});

// 执行主函数 (ES 模块中检查是否为主模块的方式)
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);

if (process.argv[1] === __filename) {
  main();
}
