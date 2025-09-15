#!/usr/bin/env node

/**
 * 批量代码格式化脚本
 * 用于格式化 keru_blog 项目中的所有子项目
 *
 * 使用方法:
 * node tools/format/format-all.js [options]
 *
 * 选项:
 * --check: 仅检查格式，不进行修改
 * --config: 为所有项目生成/更新 Prettier 配置文件
 * --parallel: 并行格式化所有项目 (默认)
 * --sequential: 顺序格式化所有项目
 */

import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { FORMAT_CONFIGS, generatePrettierRC, generatePrettierIgnore } from './prettier-config.js';

/**
 * 显示使用帮助
 */
function showHelp() {
  console.log(`
🎨 keru_blog 批量代码格式化工具

使用方法:
  node tools/format/format-all.js [options]

选项:
  --check       仅检查所有项目的代码格式，不进行修改
  --config      为所有项目生成/更新 Prettier 配置文件
  --parallel    并行格式化所有项目 (默认，速度快)
  --sequential  顺序格式化所有项目 (详细输出)
  --help, -h    显示此帮助信息

格式化项目:
  ✓ frontend    - frontEnd 项目 (React + Vite)
  ✓ management  - management 项目 (React + Vite)  
  ✓ server      - server 项目 (Node.js + Express)

功能说明:
  - 默认模式: 格式化所有项目的代码文件
  - 检查模式: 检查所有项目的代码格式是否符合规范
  - 配置模式: 为所有项目生成统一的 Prettier 配置文件
  - 并行模式: 同时处理多个项目，速度更快
  - 顺序模式: 逐个处理项目，输出更详细

示例:
  node tools/format/format-all.js
  node tools/format/format-all.js --check
  node tools/format/format-all.js --config
  node tools/format/format-all.js --sequential
`);
}

/**
 * 检查项目是否存在
 * @param {string} projectKey - 项目键名
 * @returns {boolean} 项目是否存在
 */
function checkProjectExists(projectKey) {
  const config = FORMAT_CONFIGS[projectKey];
  if (!config) return false;

  const projectPath = path.resolve(config.path);
  return fs.existsSync(projectPath);
}

/**
 * 为所有项目生成配置文件
 */
function generateAllConfigs() {
  const projectKeys = Object.keys(FORMAT_CONFIGS);

  console.log(`📝 为 ${projectKeys.length} 个项目生成 Prettier 配置文件...`);
  console.log('─'.repeat(50));

  let successCount = 0;
  let failCount = 0;

  for (const projectKey of projectKeys) {
    try {
      if (!checkProjectExists(projectKey)) {
        console.log(`⚠️  跳过不存在的项目: ${projectKey}`);
        failCount++;
        continue;
      }

      const config = FORMAT_CONFIGS[projectKey];
      const projectPath = path.resolve(config.path);

      console.log(`📝 ${config.displayName}:`);

      // 生成 .prettierrc 文件
      const prettierrcPath = path.join(projectPath, '.prettierrc');
      const prettierrcContent = generatePrettierRC(config.type);
      fs.writeFileSync(prettierrcPath, prettierrcContent, 'utf8');
      console.log(`  ✅ .prettierrc`);

      // 生成 .prettierignore 文件
      const prettierignorePath = path.join(projectPath, '.prettierignore');
      const prettierignoreContent = generatePrettierIgnore(config.type);
      fs.writeFileSync(prettierignorePath, prettierignoreContent, 'utf8');
      console.log(`  ✅ .prettierignore`);

      successCount++;

    } catch (error) {
      console.error(`  ❌ 生成失败: ${error.message}`);
      failCount++;
    }
  }

  console.log('─'.repeat(50));
  console.log(`🎉 配置文件生成完成: ${successCount} 成功, ${failCount} 失败`);
}

/**
 * 执行单个项目的格式化检查
 * @param {string} projectKey - 项目键名
 * @returns {Object} 检查结果
 */
function runSingleFormatCheck(projectKey) {
  const config = FORMAT_CONFIGS[projectKey];
  const startTime = Date.now();

  try {
    const patterns = config.patterns.map(p => `"${p}"`).join(' ');
    const checkCommand = `${config.checkCommand} ${patterns}`;

    const output = execSync(checkCommand, {
      encoding: 'utf8',
      stdio: 'pipe',
      cwd: process.cwd()
    });

    const endTime = Date.now();
    const duration = endTime - startTime;

    return {
      success: true,
      projectKey,
      projectName: config.displayName,
      duration,
      output: output || '所有文件格式正确'
    };

  } catch (error) {
    const endTime = Date.now();
    const duration = endTime - startTime;

    const errorOutput = error.stdout || error.stderr || error.message;
    const unformattedFiles = parseUnformattedFiles(errorOutput);

    return {
      success: false,
      projectKey,
      projectName: config.displayName,
      duration,
      output: errorOutput,
      unformattedFiles,
      filesChecked: unformattedFiles.length
    };
  }
}

/**
 * 执行单个项目的格式化
 * @param {string} projectKey - 项目键名
 * @returns {Object} 格式化结果
 */
function runSingleFormat(projectKey) {
  const config = FORMAT_CONFIGS[projectKey];
  const startTime = Date.now();

  try {
    const patterns = config.patterns.map(p => `"${p}"`).join(' ');
    const formatCommand = `${config.formatCommand} ${patterns}`;

    const output = execSync(formatCommand, {
      encoding: 'utf8',
      stdio: 'pipe',
      cwd: process.cwd()
    });

    const endTime = Date.now();
    const duration = endTime - startTime;

    return {
      success: true,
      projectKey,
      projectName: config.displayName,
      duration,
      output: output || '格式化完成'
    };

  } catch (error) {
    const endTime = Date.now();
    const duration = endTime - startTime;

    return {
      success: false,
      projectKey,
      projectName: config.displayName,
      duration,
      output: error.stdout || error.stderr || error.message,
      error: error.message
    };
  }
}

/**
 * 并行执行格式化检查
 * @returns {Promise<Array>} 检查结果数组
 */
async function checkAllParallel() {
  const projectKeys = Object.keys(FORMAT_CONFIGS).filter(checkProjectExists);

  console.log(`🚀 开始并行检查 ${projectKeys.length} 个项目的代码格式...`);

  const promises = projectKeys.map(async (projectKey) => {
    try {
      return runSingleFormatCheck(projectKey);
    } catch (error) {
      return {
        success: false,
        projectKey,
        projectName: FORMAT_CONFIGS[projectKey].displayName,
        duration: 0,
        error: error.message,
        failed: true
      };
    }
  });

  const results = await Promise.all(promises);
  console.log(`✅ 并行检查完成`);

  return results;
}

/**
 * 并行执行格式化
 * @returns {Promise<Array>} 格式化结果数组
 */
async function formatAllParallel() {
  const projectKeys = Object.keys(FORMAT_CONFIGS).filter(checkProjectExists);

  console.log(`🚀 开始并行格式化 ${projectKeys.length} 个项目...`);

  const promises = projectKeys.map(async (projectKey) => {
    try {
      return runSingleFormat(projectKey);
    } catch (error) {
      return {
        success: false,
        projectKey,
        projectName: FORMAT_CONFIGS[projectKey].displayName,
        duration: 0,
        error: error.message,
        failed: true
      };
    }
  });

  const results = await Promise.all(promises);
  console.log(`✅ 并行格式化完成`);

  return results;
}

/**
 * 顺序执行格式化检查
 * @returns {Promise<Array>} 检查结果数组
 */
async function checkAllSequential() {
  const projectKeys = Object.keys(FORMAT_CONFIGS);
  const results = [];

  console.log(`🚀 开始顺序检查 ${projectKeys.length} 个项目的代码格式...`);

  for (let i = 0; i < projectKeys.length; i++) {
    const projectKey = projectKeys[i];

    console.log(`\n📋 [${i + 1}/${projectKeys.length}] 检查 ${FORMAT_CONFIGS[projectKey].displayName}`);
    console.log('─'.repeat(40));

    if (!checkProjectExists(projectKey)) {
      console.log(`⚠️  跳过不存在的项目: ${projectKey}`);
      continue;
    }

    try {
      const result = runSingleFormatCheck(projectKey);
      results.push(result);

      if (result.success) {
        console.log(`✅ 格式检查通过 (${result.duration}ms)`);
      } else {
        console.log(`❌ 发现格式问题: ${result.filesChecked} 个文件 (${result.duration}ms)`);
      }

    } catch (error) {
      console.error(`❌ 检查失败: ${error.message}`);
      results.push({
        success: false,
        projectKey,
        projectName: FORMAT_CONFIGS[projectKey].displayName,
        duration: 0,
        error: error.message,
        failed: true
      });
    }
  }

  console.log(`\n✅ 顺序检查完成`);
  return results;
}

/**
 * 顺序执行格式化
 * @returns {Promise<Array>} 格式化结果数组
 */
async function formatAllSequential() {
  const projectKeys = Object.keys(FORMAT_CONFIGS);
  const results = [];

  console.log(`🚀 开始顺序格式化 ${projectKeys.length} 个项目...`);

  for (let i = 0; i < projectKeys.length; i++) {
    const projectKey = projectKeys[i];

    console.log(`\n📋 [${i + 1}/${projectKeys.length}] 格式化 ${FORMAT_CONFIGS[projectKey].displayName}`);
    console.log('─'.repeat(40));

    if (!checkProjectExists(projectKey)) {
      console.log(`⚠️  跳过不存在的项目: ${projectKey}`);
      continue;
    }

    try {
      const result = runSingleFormat(projectKey);
      results.push(result);

      if (result.success) {
        console.log(`✅ 格式化完成 (${result.duration}ms)`);
      } else {
        console.log(`❌ 格式化失败 (${result.duration}ms): ${result.error}`);
      }

    } catch (error) {
      console.error(`❌ 格式化失败: ${error.message}`);
      results.push({
        success: false,
        projectKey,
        projectName: FORMAT_CONFIGS[projectKey].displayName,
        duration: 0,
        error: error.message,
        failed: true
      });
    }
  }

  console.log(`\n✅ 顺序格式化完成`);
  return results;
}

/**
 * 解析未格式化的文件列表
 * @param {string} output - Prettier 输出
 * @returns {Array} 文件路径数组
 */
function parseUnformattedFiles(output) {
  if (!output) return [];

  const files = [];
  const lines = output.split('\n');

  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith('[') && !trimmed.includes('error') &&
        (trimmed.endsWith('.js') || trimmed.endsWith('.ts') ||
         trimmed.endsWith('.jsx') || trimmed.endsWith('.tsx') ||
         trimmed.endsWith('.json') || trimmed.endsWith('.css') ||
         trimmed.endsWith('.scss') || trimmed.endsWith('.md'))) {
      files.push(trimmed);
    }
  }

  return files;
}

/**
 * 显示汇总结果
 * @param {Array} results - 结果数组
 * @param {string} mode - 模式 ('check' 或 'format')
 */
function displaySummary(results, mode) {
  const modeText = mode === 'check' ? '检查' : '格式化';
  const totalProjects = results.length;
  const successfulProjects = results.filter(r => r.success).length;
  const failedProjects = results.filter(r => !r.success).length;
  const totalDuration = results.reduce((sum, r) => sum + (r.duration || 0), 0);

  console.log('\n' + '='.repeat(60));
  console.log(`📊 ${modeText}汇总结果`);
  console.log('='.repeat(60));
  console.log(`📁 总项目数: ${totalProjects}`);
  console.log(`✅ 成功项目: ${successfulProjects}`);
  console.log(`❌ 失败项目: ${failedProjects}`);
  console.log(`⏱️  总耗时: ${totalDuration}ms`);
  console.log('='.repeat(60));

  // 显示各项目状态
  results.forEach(result => {
    const status = result.success ? '✅' : '❌';
    const info = result.success ? '' :
      (result.failed ? ' (执行失败)' :
       (result.filesChecked ? ` (${result.filesChecked} 文件)` : ' (格式化失败)'));
    console.log(`${status} ${result.projectName}: ${result.duration}ms${info}`);
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

  const isCheckMode = args.includes('--check');
  const isConfigMode = args.includes('--config');
  const isSequential = args.includes('--sequential');

  const mode = isConfigMode ? '配置生成' :
               isCheckMode ? '格式检查' : '代码格式化';
  const execution = isSequential ? '顺序' : '并行';

  console.log(`🚀 keru_blog 批量代码格式化工具启动`);
  console.log(`🔧 运行模式: ${mode}`);
  if (!isConfigMode) {
    console.log(`⚡ 执行方式: ${execution}执行`);
  }
  console.log(`⏰ 开始时间: ${new Date().toLocaleString('zh-CN')}`);
  console.log('─'.repeat(50));

  try {
    const startTime = Date.now();

    if (isConfigMode) {
      // 配置生成模式
      generateAllConfigs();
      process.exit(0);
    } else if (isCheckMode) {
      // 格式检查模式
      const results = isSequential
        ? await checkAllSequential()
        : await checkAllParallel();

      const endTime = Date.now();
      const totalDuration = endTime - startTime;

      displaySummary(results, 'check');

      const hasFormatIssues = results.some(r => !r.success);
      process.exit(hasFormatIssues ? 1 : 0);
    } else {
      // 代码格式化模式
      const results = isSequential
        ? await formatAllSequential()
        : await formatAllParallel();

      const endTime = Date.now();
      const totalDuration = endTime - startTime;

      displaySummary(results, 'format');

      const hasErrors = results.some(r => !r.success);
      process.exit(hasErrors ? 1 : 0);
    }

  } catch (error) {
    console.error('💥 批量格式化过程中发生错误:', error.message);
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
const __dirname = path.dirname(__filename);

if (process.argv[1] === __filename) {
  main();
}
