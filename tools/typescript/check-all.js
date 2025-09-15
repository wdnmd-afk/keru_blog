#!/usr/bin/env node

/**
 * 批量 TypeScript 检测脚本
 * 用于检测 keru_blog 项目中的所有子项目
 *
 * 使用方法:
 * node tools/typescript/check-all.js [options]
 *
 * 选项:
 * --parallel: 并行检测所有项目 (默认)
 * --sequential: 顺序检测所有项目
 * --summary-only: 仅显示汇总信息
 */

import fs from 'fs';
import path from 'path';
import {
  PROJECT_CONFIGS,
  ensureDirectoryExists,
  checkProjectExists,
  runTypeScriptCheck,
  saveCheckResult,
  getTimestamp
} from './utils.js';

/**
 * 显示使用帮助
 */
function showHelp() {
  console.log(`
🔍 keru_blog TypeScript 批量检测工具

使用方法:
  node tools/typescript/check-all.js [options]

选项:
  --parallel      并行检测所有项目 (默认，速度快)
  --sequential    顺序检测所有项目 (详细输出)
  --summary-only  仅显示汇总信息，不显示详细过程
  --help, -h      显示此帮助信息

检测项目:
  ✓ frontend    - frontEnd 项目 (React + Vite)
  ✓ management  - management 项目 (React + Vite)  
  ✓ server      - server 项目 (Node.js + Express)

输出:
  - 各项目检测结果保存到 tools/tsError/<project>/ 目录
  - 汇总报告保存到 tools/tsError/summary/ 目录
  - 支持 JSON 和 Markdown 两种格式的报告

示例:
  node tools/typescript/check-all.js
  node tools/typescript/check-all.js --sequential
  node tools/typescript/check-all.js --summary-only
`);
}

/**
 * 并行检测所有项目
 * @param {boolean} summaryOnly - 是否仅显示汇总
 * @returns {Promise<Array>} 检测结果数组
 */
async function checkAllParallel(summaryOnly = false) {
  const projectKeys = Object.keys(PROJECT_CONFIGS);

  if (!summaryOnly) {
    console.log(`🚀 开始并行检测 ${projectKeys.length} 个项目...`);
  }

  // 检查所有项目是否存在
  const validProjects = [];
  for (const projectKey of projectKeys) {
    if (checkProjectExists(projectKey)) {
      validProjects.push(projectKey);
    } else {
      console.error(`⚠️  跳过不存在的项目: ${projectKey}`);
    }
  }

  if (validProjects.length === 0) {
    throw new Error('没有找到有效的项目进行检测');
  }

  // 并行执行检测
  const promises = validProjects.map(async (projectKey) => {
    try {
      const result = runTypeScriptCheck(projectKey);
      saveCheckResult(result);
      return result;
    } catch (error) {
      console.error(`❌ ${PROJECT_CONFIGS[projectKey].displayName} 检测失败:`, error.message);
      return {
        success: false,
        projectKey,
        projectName: PROJECT_CONFIGS[projectKey].displayName,
        errors: [],
        output: error.message,
        duration: 0,
        timestamp: getTimestamp(),
        failed: true
      };
    }
  });

  const results = await Promise.all(promises);

  if (!summaryOnly) {
    console.log(`✅ 并行检测完成`);
  }

  return results;
}

/**
 * 顺序检测所有项目
 * @param {boolean} summaryOnly - 是否仅显示汇总
 * @returns {Promise<Array>} 检测结果数组
 */
async function checkAllSequential(summaryOnly = false) {
  const projectKeys = Object.keys(PROJECT_CONFIGS);
  const results = [];

  if (!summaryOnly) {
    console.log(`🚀 开始顺序检测 ${projectKeys.length} 个项目...`);
  }

  for (let i = 0; i < projectKeys.length; i++) {
    const projectKey = projectKeys[i];

    if (!summaryOnly) {
      console.log(`\n📋 [${i + 1}/${projectKeys.length}] 检测 ${PROJECT_CONFIGS[projectKey].displayName}`);
      console.log('─'.repeat(40));
    }

    try {
      if (!checkProjectExists(projectKey)) {
        console.error(`⚠️  跳过不存在的项目: ${projectKey}`);
        continue;
      }

      const result = runTypeScriptCheck(projectKey);
      saveCheckResult(result);
      results.push(result);

    } catch (error) {
      console.error(`❌ ${PROJECT_CONFIGS[projectKey].displayName} 检测失败:`, error.message);
      results.push({
        success: false,
        projectKey,
        projectName: PROJECT_CONFIGS[projectKey].displayName,
        errors: [],
        output: error.message,
        duration: 0,
        timestamp: getTimestamp(),
        failed: true
      });
    }
  }

  if (!summaryOnly) {
    console.log(`\n✅ 顺序检测完成`);
  }

  return results;
}

/**
 * 生成汇总报告
 * @param {Array} results - 检测结果数组
 */
function generateSummaryReport(results) {
  const summaryDir = 'tools/tsError/summary';
  ensureDirectoryExists(summaryDir);

  const timestamp = getTimestamp();
  const totalProjects = results.length;
  const successfulProjects = results.filter(r => r.success).length;
  const failedProjects = results.filter(r => !r.success).length;
  const totalErrors = results.reduce((sum, r) => sum + (r.errors?.length || 0), 0);
  const totalDuration = results.reduce((sum, r) => sum + (r.duration || 0), 0);

  // 生成 JSON 汇总报告
  const jsonSummary = {
    timestamp,
    totalProjects,
    successfulProjects,
    failedProjects,
    totalErrors,
    totalDuration,
    results: results.map(r => ({
      projectKey: r.projectKey,
      projectName: r.projectName,
      success: r.success,
      errorCount: r.errors?.length || 0,
      duration: r.duration || 0,
      failed: r.failed || false
    }))
  };

  const jsonPath = path.join(summaryDir, 'summary-report.json');
  fs.writeFileSync(jsonPath, JSON.stringify(jsonSummary, null, 2), 'utf8');

  // 生成 Markdown 汇总报告
  let mdContent = `# keru_blog TypeScript 检测汇总报告\n\n`;
  mdContent += `**检测时间:** ${timestamp}\n`;
  mdContent += `**总项目数:** ${totalProjects}\n`;
  mdContent += `**成功项目:** ${successfulProjects}\n`;
  mdContent += `**失败项目:** ${failedProjects}\n`;
  mdContent += `**总错误数:** ${totalErrors}\n`;
  mdContent += `**总耗时:** ${totalDuration}ms\n\n`;

  mdContent += `## 项目检测结果\n\n`;

  results.forEach(result => {
    const status = result.success ? '✅ 通过' : '❌ 失败';
    const errorInfo = result.errors?.length ? ` (${result.errors.length} 个错误)` : '';

    mdContent += `### ${result.projectName}\n`;
    mdContent += `- **状态:** ${status}${errorInfo}\n`;
    mdContent += `- **耗时:** ${result.duration || 0}ms\n`;

    if (result.failed) {
      mdContent += `- **失败原因:** 检测过程异常\n`;
    }

    mdContent += `- **详细报告:** [查看详情](../${result.projectKey}/error-summary.md)\n\n`;
  });

  mdContent += `---\n*报告生成时间: ${timestamp}*\n`;

  const mdPath = path.join(summaryDir, 'summary-report.md');
  fs.writeFileSync(mdPath, mdContent, 'utf8');

  console.log(`📊 汇总报告已生成:`);
  console.log(`   JSON: ${jsonPath}`);
  console.log(`   Markdown: ${mdPath}`);

  return jsonSummary;
}

/**
 * 显示汇总结果
 * @param {Object} summary - 汇总信息
 */
function displaySummary(summary) {
  console.log('\n' + '='.repeat(60));
  console.log('📊 检测汇总结果');
  console.log('='.repeat(60));
  console.log(`⏰ 检测时间: ${summary.timestamp}`);
  console.log(`📁 总项目数: ${summary.totalProjects}`);
  console.log(`✅ 成功项目: ${summary.successfulProjects}`);
  console.log(`❌ 失败项目: ${summary.failedProjects}`);
  console.log(`🐛 总错误数: ${summary.totalErrors}`);
  console.log(`⏱️  总耗时: ${summary.totalDuration}ms`);
  console.log('='.repeat(60));

  // 显示各项目状态
  summary.results.forEach(result => {
    const status = result.success ? '✅' : '❌';
    const errorInfo = result.errorCount > 0 ? ` (${result.errorCount} 错误)` : '';
    console.log(`${status} ${result.projectName}: ${result.duration}ms${errorInfo}`);
  });

  console.log('='.repeat(60));
}

/**
 * 主函数
 */
async function main() {
  const args = process.argv.slice(2);

  // 检查是否请求帮助
  if (args.includes('--help') || args.includes('-h')) {
    showHelp();
    process.exit(0);
  }

  const isSequential = args.includes('--sequential');
  const summaryOnly = args.includes('--summary-only');
  const mode = isSequential ? '顺序' : '并行';

  console.log(`🚀 keru_blog TypeScript 批量检测工具启动`);
  console.log(`📋 检测模式: ${mode}检测`);
  console.log(`⏰ 开始时间: ${new Date().toLocaleString('zh-CN')}`);

  if (!summaryOnly) {
    console.log('─'.repeat(50));
  }

  try {
    const startTime = Date.now();

    // 执行检测
    const results = isSequential
      ? await checkAllSequential(summaryOnly)
      : await checkAllParallel(summaryOnly);

    const endTime = Date.now();
    const totalDuration = endTime - startTime;

    // 生成汇总报告
    const summary = generateSummaryReport(results);
    summary.totalDuration = totalDuration; // 更新总耗时

    // 显示汇总结果
    displaySummary(summary);

    // 根据结果决定退出码
    const hasErrors = results.some(r => !r.success);
    process.exit(hasErrors ? 1 : 0);

  } catch (error) {
    console.error('💥 批量检测过程中发生错误:', error.message);
    if (error.stack) {
      console.error('错误堆栈:', error.stack);
    }
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
