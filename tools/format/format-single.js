#!/usr/bin/env node

/**
 * 单项目代码格式化脚本
 * 用于格式化 keru_blog 项目中的单个子项目
 *
 * 使用方法:
 * node tools/format/format-single.js <project> [options]
 *
 * 支持的项目:
 * - frontend: 格式化 frontEnd 项目
 * - management: 格式化 management 项目
 * - server: 格式化 server 项目
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
🎨 keru_blog 代码格式化工具

使用方法:
  node tools/format/format-single.js <project> [options]

支持的项目:
  frontend    - 格式化 frontEnd 项目 (React + Vite)
  management  - 格式化 management 项目 (React + Vite)
  server      - 格式化 server 项目 (Node.js + Express)

选项:
  --check     仅检查格式，不进行修改
  --config    生成/更新项目的 Prettier 配置文件
  --help, -h  显示此帮助信息

示例:
  node tools/format/format-single.js frontend
  node tools/format/format-single.js management --check
  node tools/format/format-single.js server --config

功能说明:
  - 默认模式: 格式化指定项目的所有代码文件
  - 检查模式: 检查代码格式是否符合规范，不进行修改
  - 配置模式: 生成或更新项目的 .prettierrc 和 .prettierignore 文件
`);
}

/**
 * 检查项目是否存在
 * @param {string} projectKey - 项目键名
 * @returns {boolean} 项目是否存在
 */
function checkProjectExists(projectKey) {
  const config = FORMAT_CONFIGS[projectKey];
  if (!config) {
    console.error(`❌ 未知的项目: ${projectKey}`);
    return false;
  }

  const projectPath = path.resolve(config.path);
  if (!fs.existsSync(projectPath)) {
    console.error(`❌ 项目目录不存在: ${projectPath}`);
    return false;
  }

  return true;
}

/**
 * 生成项目配置文件
 * @param {string} projectKey - 项目键名
 */
function generateProjectConfig(projectKey) {
  const config = FORMAT_CONFIGS[projectKey];
  const projectPath = path.resolve(config.path);

  console.log(`📝 为 ${config.displayName} 生成 Prettier 配置文件...`);

  // 生成 .prettierrc 文件
  const prettierrcPath = path.join(projectPath, '.prettierrc');
  const prettierrcContent = generatePrettierRC(config.type);
  fs.writeFileSync(prettierrcPath, prettierrcContent, 'utf8');
  console.log(`✅ 已生成: ${prettierrcPath}`);

  // 生成 .prettierignore 文件
  const prettierignorePath = path.join(projectPath, '.prettierignore');
  const prettierignoreContent = generatePrettierIgnore(config.type);
  fs.writeFileSync(prettierignorePath, prettierignoreContent, 'utf8');
  console.log(`✅ 已生成: ${prettierignorePath}`);

  console.log(`🎉 ${config.displayName} 的 Prettier 配置文件已生成完成`);
}

/**
 * 执行代码格式化检查
 * @param {string} projectKey - 项目键名
 * @returns {Object} 检查结果
 */
function runFormatCheck(projectKey) {
  const config = FORMAT_CONFIGS[projectKey];
  const startTime = Date.now();

  console.log(`🔍 检查 ${config.displayName} 的代码格式...`);

  try {
    // 构建检查命令
    const patterns = config.patterns.map(p => `"${p}"`).join(' ');
    const checkCommand = `${config.checkCommand} ${patterns}`;

    console.log(`⚙️  执行命令: ${checkCommand}`);

    const output = execSync(checkCommand, {
      encoding: 'utf8',
      stdio: 'pipe',
      cwd: process.cwd()
    });

    const endTime = Date.now();
    const duration = endTime - startTime;

    console.log(`✅ ${config.displayName} 代码格式检查通过 (耗时: ${duration}ms)`);

    return {
      success: true,
      projectKey,
      projectName: config.displayName,
      duration,
      output: output || '所有文件格式正确',
      filesChecked: 0 // Prettier 不直接提供检查文件数
    };

  } catch (error) {
    const endTime = Date.now();
    const duration = endTime - startTime;

    const errorOutput = error.stdout || error.stderr || error.message;
    const unformattedFiles = parseUnformattedFiles(errorOutput);

    console.log(`❌ ${config.displayName} 发现格式问题 (耗时: ${duration}ms)`);
    console.log(`📊 需要格式化的文件数: ${unformattedFiles.length}`);

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
 * 执行代码格式化
 * @param {string} projectKey - 项目键名
 * @returns {Object} 格式化结果
 */
function runFormat(projectKey) {
  const config = FORMAT_CONFIGS[projectKey];
  const startTime = Date.now();

  console.log(`🎨 格式化 ${config.displayName} 的代码...`);

  try {
    // 构建格式化命令
    const patterns = config.patterns.map(p => `"${p}"`).join(' ');
    const formatCommand = `${config.formatCommand} ${patterns}`;

    console.log(`⚙️  执行命令: ${formatCommand}`);

    const output = execSync(formatCommand, {
      encoding: 'utf8',
      stdio: 'pipe',
      cwd: process.cwd()
    });

    const endTime = Date.now();
    const duration = endTime - startTime;

    console.log(`✅ ${config.displayName} 代码格式化完成 (耗时: ${duration}ms)`);

    return {
      success: true,
      projectKey,
      projectName: config.displayName,
      duration,
      output: output || '格式化完成',
      filesFormatted: 0 // Prettier 不直接提供格式化文件数
    };

  } catch (error) {
    const endTime = Date.now();
    const duration = endTime - startTime;

    console.log(`❌ ${config.displayName} 格式化失败 (耗时: ${duration}ms)`);

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
    // Prettier 通常会输出需要格式化的文件路径
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
  const isCheckMode = args.includes('--check');
  const isConfigMode = args.includes('--config');

  // 验证项目参数
  if (!FORMAT_CONFIGS[projectKey]) {
    console.error(`❌ 错误: 未知的项目 "${projectKey}"`);
    console.error(`支持的项目: ${Object.keys(FORMAT_CONFIGS).join(', ')}`);
    console.error(`使用 --help 查看详细帮助信息`);
    process.exit(1);
  }

  console.log(`🚀 keru_blog 代码格式化工具启动`);
  console.log(`📋 目标项目: ${FORMAT_CONFIGS[projectKey].displayName}`);
  console.log(`🔧 运行模式: ${isConfigMode ? '配置生成' : isCheckMode ? '格式检查' : '代码格式化'}`);
  console.log(`⏰ 开始时间: ${new Date().toLocaleString('zh-CN')}`);
  console.log('─'.repeat(50));

  try {
    // 检查项目是否存在
    if (!checkProjectExists(projectKey)) {
      console.error(`❌ 项目检查失败: ${projectKey}`);
      process.exit(1);
    }

    if (isConfigMode) {
      // 配置生成模式
      generateProjectConfig(projectKey);
      console.log('─'.repeat(50));
      console.log(`🎉 配置文件生成完成`);
      process.exit(0);
    } else if (isCheckMode) {
      // 格式检查模式
      const result = runFormatCheck(projectKey);

      console.log('─'.repeat(50));

      if (result.success) {
        console.log(`🎉 格式检查通过: ${result.projectName} 代码格式正确`);
        console.log(`⏱️  总耗时: ${result.duration}ms`);
        process.exit(0);
      } else {
        console.log(`⚠️  格式检查失败: ${result.projectName} 发现格式问题`);
        console.log(`📁 需要格式化的文件数: ${result.filesChecked}`);
        console.log(`⏱️  总耗时: ${result.duration}ms`);

        if (result.unformattedFiles && result.unformattedFiles.length > 0) {
          console.log('\n📋 需要格式化的文件 (前5个):');
          result.unformattedFiles.slice(0, 5).forEach((file, index) => {
            console.log(`  ${index + 1}. ${file}`);
          });

          if (result.unformattedFiles.length > 5) {
            console.log(`     ... 还有 ${result.unformattedFiles.length - 5} 个文件`);
          }
        }

        process.exit(1);
      }
    } else {
      // 代码格式化模式
      const result = runFormat(projectKey);

      console.log('─'.repeat(50));

      if (result.success) {
        console.log(`🎉 格式化完成: ${result.projectName} 代码已格式化`);
        console.log(`⏱️  总耗时: ${result.duration}ms`);
        process.exit(0);
      } else {
        console.log(`❌ 格式化失败: ${result.projectName}`);
        console.log(`⏱️  总耗时: ${result.duration}ms`);
        console.log(`💥 错误信息: ${result.error}`);
        process.exit(1);
      }
    }

  } catch (error) {
    console.error('─'.repeat(50));
    console.error(`💥 格式化过程中发生意外错误:`);
    console.error(`错误信息: ${error.message}`);

    if (error.stack) {
      console.error(`错误堆栈:`);
      console.error(error.stack);
    }

    console.error('─'.repeat(50));
    console.error(`🔧 故障排除建议:`);
    console.error(`1. 确保项目依赖已安装 (npm install)`);
    console.error(`2. 确保 Prettier 已安装`);
    console.error(`3. 检查项目路径是否正确`);
    console.error(`4. 尝试生成配置文件: --config`);

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
