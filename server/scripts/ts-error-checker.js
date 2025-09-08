#!/usr/bin/env node

/**
 * Server端TypeScript错误检测脚本
 * 基于frontEnd项目的错误检测系统，适配Node.js后端项目
 */

import { execSync } from 'child_process'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// 配置
const CONFIG = {
  // 项目根目录
  projectRoot: path.dirname(__dirname),
  // 错误报告输出目录
  errorDir: path.join(path.dirname(__dirname), 'TsError'),
  // TypeScript配置文件
  tsconfigPath: path.join(path.dirname(__dirname), 'tsconfig.json'),
  // 支持的文件扩展名
  supportedExtensions: ['.ts', '.js'],
  // 错误严重程度分类
  severityLevels: {
    HIGH: ['TS2322', 'TS2345', 'TS2339', 'TS2741', 'TS2742'],
    MEDIUM: ['TS7006', 'TS7053', 'TS18048', 'TS2367'],
    LOW: ['TS1192', 'TS4104', 'TS2742'],
  },
}

console.log('🔍 Server端TypeScript错误检测开始...')
console.log('='.repeat(60))

/**
 * 确保错误报告目录存在
 */
function ensureErrorDirectory() {
  if (!fs.existsSync(CONFIG.errorDir)) {
    fs.mkdirSync(CONFIG.errorDir, { recursive: true })
    console.log(`📁 创建错误报告目录: ${CONFIG.errorDir}`)
  }
}

/**
 * 运行TypeScript编译检查
 */
function runTypeScriptCheck() {
  try {
    console.log('⏳ 运行TypeScript编译检查...')

    const result = execSync('npx tsc --noEmit --pretty false', {
      cwd: CONFIG.projectRoot,
      encoding: 'utf8',
      stdio: 'pipe',
    })

    console.log('✅ TypeScript编译检查通过，无错误发现')
    return { success: true, output: result }
  } catch (error) {
    console.log('⚠️ 发现TypeScript编译错误')
    return {
      success: false,
      output: error.stdout || error.stderr || '',
      code: error.status,
    }
  }
}

/**
 * 解析TypeScript错误输出
 */
function parseTypeScriptErrors(output) {
  if (!output || typeof output !== 'string') {
    return []
  }

  const lines = output.split('\n').filter(line => line.trim())
  const errors = []

  // 改进的正则表达式，适配Windows路径
  const errorRegex = /^(.+?)\((\d+),(\d+)\):\s*error\s+(TS\d+):\s*(.+)$/

  lines.forEach((line, index) => {
    const match = line.match(errorRegex)
    if (match) {
      const [, filePath, lineNum, colNum, errorCode, message] = match

      // 转换为相对路径
      const relativePath = path.relative(CONFIG.projectRoot, filePath)

      errors.push({
        id: `${path.basename(filePath)}_L${lineNum}_${errorCode}_${Date.now().toString(36)}`,
        file: relativePath,
        line: parseInt(lineNum),
        column: parseInt(colNum),
        code: errorCode,
        message: message.trim(),
        severity: getSeverity(errorCode),
        category: getCategory(errorCode),
        rawLine: line,
      })
    }
  })

  return errors
}

/**
 * 获取错误严重程度
 */
function getSeverity(errorCode) {
  for (const [level, codes] of Object.entries(CONFIG.severityLevels)) {
    if (codes.includes(errorCode)) {
      return level
    }
  }
  return 'MEDIUM'
}

/**
 * 获取错误分类
 */
function getCategory(errorCode) {
  const categories = {
    TS2322: 'Type Assignment',
    TS2345: 'Function Arguments',
    TS2339: 'Property Access',
    TS2741: 'Property Missing',
    TS2742: 'Type Inference',
    TS7006: 'Implicit Any',
    TS7053: 'Index Access',
    TS18048: 'Possibly Undefined',
    TS2367: 'Type Comparison',
    TS1192: 'Module Export',
    TS4104: 'Readonly Type',
  }
  return categories[errorCode] || 'Other'
}

/**
 * 生成错误统计
 */
function generateErrorStats(errors) {
  const stats = {
    total: errors.length,
    bySeverity: { HIGH: 0, MEDIUM: 0, LOW: 0 },
    byCategory: {},
    byFile: {},
    byErrorCode: {},
  }

  errors.forEach(error => {
    // 按严重程度统计
    stats.bySeverity[error.severity]++

    // 按分类统计
    stats.byCategory[error.category] = (stats.byCategory[error.category] || 0) + 1

    // 按文件统计
    stats.byFile[error.file] = (stats.byFile[error.file] || 0) + 1

    // 按错误代码统计
    stats.byErrorCode[error.code] = (stats.byErrorCode[error.code] || 0) + 1
  })

  return stats
}

/**
 * 生成JSON格式错误报告
 */
function generateJsonReport(errors, stats) {
  const report = {
    timestamp: new Date().toISOString(),
    project: 'server',
    summary: {
      totalErrors: errors.length,
      severityBreakdown: stats.bySeverity,
      categoryBreakdown: stats.byCategory,
    },
    errors: errors,
    statistics: stats,
  }

  const reportPath = path.join(CONFIG.errorDir, 'error-report.json')
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2))
  console.log(`📄 JSON错误报告已生成: ${reportPath}`)

  return reportPath
}

/**
 * 生成Markdown格式错误摘要
 */
function generateMarkdownSummary(errors, stats) {
  let markdown = `# Server端TypeScript错误报告\n\n`
  markdown += `**生成时间**: ${new Date().toLocaleString()}\n`
  markdown += `**项目**: server (Node.js后端)\n`
  markdown += `**错误数量**: ${errors.length}\n\n`

  if (errors.length === 0) {
    markdown += `## 🎉 恭喜！没有发现TypeScript错误\n\n`
    markdown += `所有代码都通过了TypeScript编译检查。\n`
  } else {
    markdown += `## 错误详情\n\n`

    errors.forEach((error, index) => {
      markdown += `${index + 1}. **${error.code}** - ${error.file}:${error.line}:${error.column}\n`
      markdown += `   ${error.message}\n\n`
    })

    markdown += `## 错误统计\n\n`
    markdown += `### 按严重程度\n`
    markdown += `- 🔴 高严重程度: ${stats.bySeverity.HIGH}\n`
    markdown += `- 🟡 中严重程度: ${stats.bySeverity.MEDIUM}\n`
    markdown += `- 🟢 低严重程度: ${stats.bySeverity.LOW}\n\n`

    markdown += `### 按文件分布\n`
    Object.entries(stats.byFile)
      .sort(([, a], [, b]) => b - a)
      .forEach(([file, count]) => {
        markdown += `- ${file}: ${count}个错误\n`
      })
  }

  const summaryPath = path.join(CONFIG.errorDir, 'error-summary.md')
  fs.writeFileSync(summaryPath, markdown)
  console.log(`📋 Markdown错误摘要已生成: ${summaryPath}`)

  return summaryPath
}

/**
 * 主函数
 */
function main() {
  try {
    // 确保错误报告目录存在
    ensureErrorDirectory()

    // 运行TypeScript检查
    const checkResult = runTypeScriptCheck()

    if (checkResult.success) {
      // 没有错误，清理旧的错误报告
      const errorFiles = ['error-report.json', 'error-summary.md']
      errorFiles.forEach(file => {
        const filePath = path.join(CONFIG.errorDir, file)
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath)
        }
      })

      // 生成成功报告
      generateMarkdownSummary([], {
        bySeverity: { HIGH: 0, MEDIUM: 0, LOW: 0 },
        byFile: {},
        byCategory: {},
        byErrorCode: {},
      })

      console.log('\n🎉 Server端TypeScript检查完成，无错误！')
      process.exit(0)
    } else {
      // 解析错误
      const errors = parseTypeScriptErrors(checkResult.output)
      const stats = generateErrorStats(errors)

      // 生成报告
      generateJsonReport(errors, stats)
      generateMarkdownSummary(errors, stats)

      console.log(`\n📊 发现 ${errors.length} 个TypeScript错误`)
      console.log(`🔴 高严重程度: ${stats.bySeverity.HIGH}`)
      console.log(`🟡 中严重程度: ${stats.bySeverity.MEDIUM}`)
      console.log(`🟢 低严重程度: ${stats.bySeverity.LOW}`)

      console.log('\n📁 错误报告已生成在 TsError/ 目录中')
      console.log('🔧 请查看错误详情并进行修复')

      process.exit(1)
    }
  } catch (error) {
    console.error('❌ 错误检测过程中出现异常:', error.message)
    process.exit(1)
  }
}

// 运行主函数
main()
