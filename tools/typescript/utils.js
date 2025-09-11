/**
 * TypeScript 检测工具通用函数
 * 用于支持 keru_blog 项目的 TypeScript 类型检测
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

/**
 * 项目配置信息
 */
const PROJECT_CONFIGS = {
  frontend: {
    name: 'frontEnd',
    displayName: 'Frontend 项目',
    path: 'frontEnd',
    tsConfigPath: 'frontEnd/tsconfig.json',
    packageJsonPath: 'frontEnd/package.json',
    checkCommand: 'cd frontEnd && npx tsc --noEmit',
    errorOutputDir: 'tools/tsError/frontend',
    type: 'react-vite'
  },
  management: {
    name: 'management',
    displayName: 'Management 项目',
    path: 'management',
    tsConfigPath: 'management/tsconfig.json',
    packageJsonPath: 'management/package.json',
    checkCommand: 'cd management && npx tsc --noEmit',
    errorOutputDir: 'tools/tsError/management',
    type: 'react-vite'
  },
  server: {
    name: 'server',
    displayName: 'Server 项目',
    path: 'server',
    tsConfigPath: 'server/tsconfig.json',
    packageJsonPath: 'server/package.json',
    checkCommand: 'cd server && npx tsc --noEmit',
    errorOutputDir: 'tools/tsError/server',
    type: 'node-express'
  }
};

/**
 * 确保目录存在
 * @param {string} dirPath - 目录路径
 */
function ensureDirectoryExists(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
    console.log(`✅ 创建目录: ${dirPath}`);
  }
}

/**
 * 获取当前时间戳字符串
 * @returns {string} 格式化的时间戳
 */
function getTimestamp() {
  const now = new Date();
  return now.toLocaleString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });
}

/**
 * 检查项目是否存在
 * @param {string} projectKey - 项目键名
 * @returns {boolean} 项目是否存在
 */
function checkProjectExists(projectKey) {
  const config = PROJECT_CONFIGS[projectKey];
  if (!config) {
    console.error(`❌ 未知的项目: ${projectKey}`);
    return false;
  }

  const projectPath = path.resolve(config.path);
  const tsConfigPath = path.resolve(config.tsConfigPath);
  const packageJsonPath = path.resolve(config.packageJsonPath);

  if (!fs.existsSync(projectPath)) {
    console.error(`❌ 项目目录不存在: ${projectPath}`);
    return false;
  }

  if (!fs.existsSync(tsConfigPath)) {
    console.error(`❌ tsconfig.json 不存在: ${tsConfigPath}`);
    return false;
  }

  if (!fs.existsSync(packageJsonPath)) {
    console.error(`❌ package.json 不存在: ${packageJsonPath}`);
    return false;
  }

  return true;
}

/**
 * 执行 TypeScript 检测
 * @param {string} projectKey - 项目键名
 * @returns {Object} 检测结果
 */
function runTypeScriptCheck(projectKey) {
  const config = PROJECT_CONFIGS[projectKey];
  const startTime = Date.now();
  
  console.log(`🔍 开始检测 ${config.displayName}...`);
  console.log(`📁 项目路径: ${config.path}`);
  console.log(`⚙️  执行命令: ${config.checkCommand}`);

  try {
    // 执行 TypeScript 检测命令
    const output = execSync(config.checkCommand, {
      encoding: 'utf8',
      stdio: 'pipe',
      cwd: process.cwd()
    });

    const endTime = Date.now();
    const duration = endTime - startTime;

    console.log(`✅ ${config.displayName} 检测完成，无错误 (耗时: ${duration}ms)`);

    return {
      success: true,
      projectKey,
      projectName: config.displayName,
      errors: [],
      output: output || '无输出',
      duration,
      timestamp: getTimestamp()
    };

  } catch (error) {
    const endTime = Date.now();
    const duration = endTime - startTime;

    console.log(`❌ ${config.displayName} 检测发现错误 (耗时: ${duration}ms)`);

    // 解析错误输出
    const errorOutput = error.stdout || error.stderr || error.message;
    const errors = parseTypeScriptErrors(errorOutput);

    console.log(`📊 发现 ${errors.length} 个错误`);

    return {
      success: false,
      projectKey,
      projectName: config.displayName,
      errors,
      output: errorOutput,
      duration,
      timestamp: getTimestamp()
    };
  }
}

/**
 * 解析 TypeScript 错误输出
 * @param {string} output - 错误输出字符串
 * @returns {Array} 解析后的错误数组
 */
function parseTypeScriptErrors(output) {
  if (!output) return [];

  const errors = [];
  const lines = output.split('\n');
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    
    // 匹配 TypeScript 错误格式: file(line,col): error TS####: message
    const errorMatch = line.match(/^(.+?)\((\d+),(\d+)\):\s*(error|warning)\s*(TS\d+):\s*(.+)$/);
    
    if (errorMatch) {
      const [, file, line, column, severity, code, message] = errorMatch;
      
      errors.push({
        file: file.replace(/\\/g, '/'), // 统一使用正斜杠
        line: parseInt(line),
        column: parseInt(column),
        severity,
        code,
        message: message.trim(),
        fullText: line
      });
    }
  }

  return errors;
}

/**
 * 保存检测结果到文件
 * @param {Object} result - 检测结果
 */
function saveCheckResult(result) {
  const config = PROJECT_CONFIGS[result.projectKey];
  const outputDir = config.errorOutputDir;
  
  // 确保输出目录存在
  ensureDirectoryExists(outputDir);

  // 保存详细的 JSON 报告
  const jsonReportPath = path.join(outputDir, 'error-report.json');
  const jsonReport = {
    ...result,
    generatedAt: result.timestamp,
    projectPath: config.path,
    tsConfigPath: config.tsConfigPath
  };

  fs.writeFileSync(jsonReportPath, JSON.stringify(jsonReport, null, 2), 'utf8');
  console.log(`📄 详细报告已保存: ${jsonReportPath}`);

  // 保存可读的 Markdown 报告
  const mdReportPath = path.join(outputDir, 'error-summary.md');
  const mdContent = generateMarkdownReport(result);
  
  fs.writeFileSync(mdReportPath, mdContent, 'utf8');
  console.log(`📋 摘要报告已保存: ${mdReportPath}`);

  // 如果有错误，保存原始输出
  if (!result.success && result.output) {
    const rawOutputPath = path.join(outputDir, 'raw-output.txt');
    fs.writeFileSync(rawOutputPath, result.output, 'utf8');
    console.log(`📝 原始输出已保存: ${rawOutputPath}`);
  }
}

/**
 * 生成 Markdown 格式的报告
 * @param {Object} result - 检测结果
 * @returns {string} Markdown 内容
 */
function generateMarkdownReport(result) {
  const config = PROJECT_CONFIGS[result.projectKey];
  
  let content = `# ${result.projectName} TypeScript 检测报告\n\n`;
  content += `**检测时间:** ${result.timestamp}\n`;
  content += `**项目路径:** ${config.path}\n`;
  content += `**检测耗时:** ${result.duration}ms\n`;
  content += `**检测状态:** ${result.success ? '✅ 通过' : '❌ 发现错误'}\n\n`;

  if (result.success) {
    content += `## 检测结果\n\n`;
    content += `🎉 恭喜！${result.projectName} 没有发现 TypeScript 错误。\n\n`;
  } else {
    content += `## 错误统计\n\n`;
    content += `**错误总数:** ${result.errors.length}\n\n`;

    // 按文件分组错误
    const errorsByFile = {};
    result.errors.forEach(error => {
      if (!errorsByFile[error.file]) {
        errorsByFile[error.file] = [];
      }
      errorsByFile[error.file].push(error);
    });

    content += `**涉及文件数:** ${Object.keys(errorsByFile).length}\n\n`;

    content += `## 错误详情\n\n`;
    
    Object.entries(errorsByFile).forEach(([file, errors]) => {
      content += `### 📁 ${file}\n\n`;
      
      errors.forEach((error, index) => {
        content += `**错误 ${index + 1}:**\n`;
        content += `- **位置:** 第 ${error.line} 行，第 ${error.column} 列\n`;
        content += `- **错误码:** ${error.code}\n`;
        content += `- **严重程度:** ${error.severity}\n`;
        content += `- **错误信息:** ${error.message}\n\n`;
      });
    });
  }

  content += `---\n`;
  content += `*报告生成时间: ${result.timestamp}*\n`;
  content += `*工具版本: keru_blog TypeScript Checker v1.0*\n`;

  return content;
}

module.exports = {
  PROJECT_CONFIGS,
  ensureDirectoryExists,
  getTimestamp,
  checkProjectExists,
  runTypeScriptCheck,
  parseTypeScriptErrors,
  saveCheckResult,
  generateMarkdownReport
};
