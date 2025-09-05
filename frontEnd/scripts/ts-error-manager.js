#!/usr/bin/env node

/**
 * TypeScript错误管理工具
 * 用于管理、标记和跟踪TypeScript错误的修复状态
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

// ES模块中获取__dirname
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// 配置
const CONFIG = {
    errorDir: path.join(__dirname, '../TsError'),
    reportFile: path.join(__dirname, '../TsError/error-report.json'),
    individualDir: path.join(__dirname, '../TsError/individual'),
    fixedDir: path.join(__dirname, '../TsError/fixed'),
}

/**
 * 显示帮助信息
 */
function showHelp() {
    console.log(`
📋 TypeScript错误管理工具

用法:
  node ts-error-manager.js <command> [options]

命令:
  list [severity]     列出所有错误 (可选: high, medium, low)
  show <errorId>      显示特定错误的详细信息
  mark-fixed <errorId> 标记错误为已修复
  mark-ignored <errorId> 标记错误为忽略
  stats               显示错误统计信息
  clean               清理已修复的错误记录
  export [format]     导出错误报告 (json, csv, html)

示例:
  node ts-error-manager.js list high
  node ts-error-manager.js show MyComponent_L25_TS2322_abc123
  node ts-error-manager.js mark-fixed MyComponent_L25_TS2322_abc123
  node ts-error-manager.js stats
  node ts-error-manager.js export csv
`)
}

/**
 * 加载错误报告
 */
function loadErrorReport() {
    if (!fs.existsSync(CONFIG.reportFile)) {
        console.log('❌ 未找到错误报告文件，请先运行 npm run ts-check')
        process.exit(1)
    }

    try {
        const content = fs.readFileSync(CONFIG.reportFile, 'utf8')
        return JSON.parse(content)
    } catch (error) {
        console.error('❌ 无法加载错误报告:', error.message)
        process.exit(1)
    }
}

/**
 * 保存错误报告
 */
function saveErrorReport(report) {
    try {
        fs.writeFileSync(CONFIG.reportFile, JSON.stringify(report, null, 2))
        console.log('✅ 错误报告已更新')
    } catch (error) {
        console.error('❌ 无法保存错误报告:', error.message)
        process.exit(1)
    }
}

/**
 * 列出错误
 */
function listErrors(severityFilter) {
    const report = loadErrorReport()
    let errors = report.errors || []

    if (severityFilter) {
        errors = errors.filter((error) => error.severity === severityFilter.toLowerCase())
    }

    if (errors.length === 0) {
        console.log('✅ 没有找到匹配的错误')
        return
    }

    console.log(`\n📋 错误列表 ${severityFilter ? `(${severityFilter}严重程度)` : ''}`)
    console.log('='.repeat(80))

    // 按严重程度和文件分组
    const groupedErrors = {}
    errors.forEach((error) => {
        const key = `${error.severity}_${error.filePath}`
        if (!groupedErrors[key]) {
            groupedErrors[key] = []
        }
        groupedErrors[key].push(error)
    })

    Object.entries(groupedErrors).forEach(([key, groupErrors]) => {
        const [severity, filePath] = key.split('_', 2)
        const icon = severity === 'high' ? '🔴' : severity === 'medium' ? '🟡' : '🟢'

        console.log(`\n${icon} ${filePath} (${groupErrors.length}个错误)`)

        groupErrors.forEach((error) => {
            const status = error.status === 'new' ? '🆕' : error.status === 'ignored' ? '🙈' : '📍'
            console.log(`  ${status} ${error.id}`)
            console.log(`     L${error.line}:${error.column} ${error.errorCode} - ${error.message}`)
        })
    })

    console.log(`\n📊 总计: ${errors.length} 个错误`)
}

/**
 * 显示错误详情
 */
function showError(errorId) {
    const report = loadErrorReport()
    const error = report.errors?.find((e) => e.id === errorId)

    if (!error) {
        console.log(`❌ 未找到错误ID: ${errorId}`)
        return
    }

    // 尝试加载详细信息
    const detailFile = path.join(CONFIG.individualDir, `${errorId}.json`)
    let errorDetail = error

    if (fs.existsSync(detailFile)) {
        try {
            const content = fs.readFileSync(detailFile, 'utf8')
            errorDetail = JSON.parse(content)
        } catch (err) {
            console.warn('⚠️ 无法加载详细错误信息，使用基本信息')
        }
    }

    console.log('\n' + '='.repeat(60))
    console.log('🔍 错误详情')
    console.log('='.repeat(60))
    console.log(`🆔 ID: ${errorDetail.id}`)
    console.log(`📁 文件: ${errorDetail.filePath}`)
    console.log(`📍 位置: 第${errorDetail.line}行，第${errorDetail.column}列`)
    console.log(`🏷️ 错误代码: ${errorDetail.errorCode}`)
    console.log(`📂 分类: ${errorDetail.category}`)
    console.log(`⚠️ 严重程度: ${errorDetail.severity}`)
    console.log(`📊 状态: ${errorDetail.status}`)
    console.log(
        `⏰ 首次发现: ${new Date(errorDetail.firstSeen || errorDetail.timestamp).toLocaleString()}`
    )
    console.log(`💬 错误信息: ${errorDetail.message}`)

    if (errorDetail.fixSuggestion) {
        console.log(`\n🔧 修复建议:`)
        console.log(`   ${errorDetail.fixSuggestion}`)
    }

    if (errorDetail.relatedDocs) {
        console.log(`\n📚 相关文档: ${errorDetail.relatedDocs}`)
    }

    console.log('='.repeat(60))
}

/**
 * 标记错误为已修复
 */
function markErrorFixed(errorId) {
    const report = loadErrorReport()
    const errorIndex = report.errors?.findIndex((e) => e.id === errorId)

    if (errorIndex === -1) {
        console.log(`❌ 未找到错误ID: ${errorId}`)
        return
    }

    const error = report.errors[errorIndex]
    error.status = 'fixed'
    error.fixedAt = new Date().toISOString()

    // 移动到已修复列表
    if (!report.fixedErrors) {
        report.fixedErrors = []
    }
    report.fixedErrors.push(error)

    // 从活跃错误中移除
    report.errors.splice(errorIndex, 1)

    // 更新统计
    if (report.summary) {
        report.summary.total = report.errors.length
        report.summary.fixed = (report.summary.fixed || 0) + 1
    }

    saveErrorReport(report)

    // 移动详细文件到已修复目录
    const sourceFile = path.join(CONFIG.individualDir, `${errorId}.json`)
    if (fs.existsSync(sourceFile)) {
        if (!fs.existsSync(CONFIG.fixedDir)) {
            fs.mkdirSync(CONFIG.fixedDir, { recursive: true })
        }

        const targetFile = path.join(CONFIG.fixedDir, `${errorId}.json`)
        fs.renameSync(sourceFile, targetFile)
    }

    console.log(`✅ 错误 ${errorId} 已标记为已修复`)
}

/**
 * 标记错误为忽略
 */
function markErrorIgnored(errorId) {
    const report = loadErrorReport()
    const error = report.errors?.find((e) => e.id === errorId)

    if (!error) {
        console.log(`❌ 未找到错误ID: ${errorId}`)
        return
    }

    error.status = 'ignored'
    error.ignoredAt = new Date().toISOString()

    saveErrorReport(report)
    console.log(`🙈 错误 ${errorId} 已标记为忽略`)
}

/**
 * 显示统计信息
 */
function showStats() {
    const report = loadErrorReport()
    const errors = report.errors || []
    const fixedErrors = report.fixedErrors || []

    console.log('\n📊 TypeScript错误统计')
    console.log('='.repeat(40))

    // 基本统计
    console.log(`总错误数: ${errors.length}`)
    console.log(`已修复错误: ${fixedErrors.length}`)

    // 按严重程度统计
    const bySeverity = {
        high: errors.filter((e) => e.severity === 'high').length,
        medium: errors.filter((e) => e.severity === 'medium').length,
        low: errors.filter((e) => e.severity === 'low').length,
    }

    console.log('\n按严重程度:')
    console.log(`  🔴 高: ${bySeverity.high}`)
    console.log(`  🟡 中: ${bySeverity.medium}`)
    console.log(`  🟢 低: ${bySeverity.low}`)

    // 按状态统计
    const byStatus = {
        new: errors.filter((e) => e.status === 'new').length,
        active: errors.filter((e) => e.status === 'active').length,
        ignored: errors.filter((e) => e.status === 'ignored').length,
    }

    console.log('\n按状态:')
    console.log(`  🆕 新增: ${byStatus.new}`)
    console.log(`  📍 活跃: ${byStatus.active}`)
    console.log(`  🙈 忽略: ${byStatus.ignored}`)

    // 按分类统计
    const byCategory = {}
    errors.forEach((error) => {
        byCategory[error.category] = (byCategory[error.category] || 0) + 1
    })

    if (Object.keys(byCategory).length > 0) {
        console.log('\n按分类:')
        Object.entries(byCategory)
            .sort(([, a], [, b]) => b - a)
            .forEach(([category, count]) => {
                console.log(`  📂 ${category}: ${count}`)
            })
    }

    // 最近修复的错误
    if (fixedErrors.length > 0) {
        const recentFixed = fixedErrors
            .filter((e) => e.fixedAt)
            .sort((a, b) => new Date(b.fixedAt) - new Date(a.fixedAt))
            .slice(0, 5)

        if (recentFixed.length > 0) {
            console.log('\n最近修复:')
            recentFixed.forEach((error) => {
                const fixedDate = new Date(error.fixedAt).toLocaleDateString()
                console.log(`  ✅ ${error.id} (${fixedDate})`)
            })
        }
    }

    console.log('='.repeat(40))
}

/**
 * 清理已修复的错误
 */
function cleanFixedErrors() {
    const report = loadErrorReport()

    if (!report.fixedErrors || report.fixedErrors.length === 0) {
        console.log('✅ 没有需要清理的已修复错误')
        return
    }

    const count = report.fixedErrors.length
    report.fixedErrors = []

    saveErrorReport(report)
    console.log(`🗑️ 已清理 ${count} 个已修复错误记录`)
}

/**
 * 导出错误报告
 */
function exportReport(format = 'json') {
    const report = loadErrorReport()
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-')

    switch (format.toLowerCase()) {
        case 'json':
            exportJSON(report, timestamp)
            break
        case 'csv':
            exportCSV(report, timestamp)
            break
        case 'html':
            exportHTML(report, timestamp)
            break
        default:
            console.log(`❌ 不支持的导出格式: ${format}`)
            console.log('支持的格式: json, csv, html')
    }
}

/**
 * 导出JSON格式
 */
function exportJSON(report, timestamp) {
    const fileName = `ts-errors-${timestamp}.json`
    const filePath = path.join(CONFIG.errorDir, fileName)

    fs.writeFileSync(filePath, JSON.stringify(report, null, 2))
    console.log(`📄 JSON报告已导出: ${filePath}`)
}

/**
 * 导出CSV格式
 */
function exportCSV(report, timestamp) {
    const fileName = `ts-errors-${timestamp}.csv`
    const filePath = path.join(CONFIG.errorDir, fileName)

    const headers = [
        'ID',
        'File',
        'Line',
        'Column',
        'Error Code',
        'Category',
        'Severity',
        'Status',
        'Message',
    ]
    const rows = [headers.join(',')]

    report.errors?.forEach((error) => {
        const row = [
            error.id,
            `"${error.filePath}"`,
            error.line,
            error.column,
            error.errorCode,
            `"${error.category}"`,
            error.severity,
            error.status,
            `"${error.message.replace(/"/g, '""')}"`,
        ]
        rows.push(row.join(','))
    })

    fs.writeFileSync(filePath, rows.join('\n'))
    console.log(`📊 CSV报告已导出: ${filePath}`)
}

/**
 * 导出HTML格式
 */
function exportHTML(report, timestamp) {
    const fileName = `ts-errors-${timestamp}.html`
    const filePath = path.join(CONFIG.errorDir, fileName)

    let html = `
<!DOCTYPE html>
<html>
<head>
    <title>TypeScript错误报告</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 20px; }
        .summary { background: #f5f5f5; padding: 15px; border-radius: 5px; margin-bottom: 20px; }
        .error { border: 1px solid #ddd; margin: 10px 0; padding: 15px; border-radius: 5px; }
        .error.high { border-left: 5px solid #ff4444; }
        .error.medium { border-left: 5px solid #ffaa00; }
        .error.low { border-left: 5px solid #44ff44; }
        .error-id { font-family: monospace; background: #f0f0f0; padding: 2px 5px; }
        .file-path { font-family: monospace; color: #666; }
    </style>
</head>
<body>
    <h1>TypeScript错误报告</h1>
    <div class="summary">
        <h2>统计信息</h2>
        <p>总错误数: ${report.summary?.total || 0}</p>
        <p>新增错误: ${report.summary?.new || 0}</p>
        <p>活跃错误: ${report.summary?.active || 0}</p>
        <p>已修复错误: ${report.summary?.fixed || 0}</p>
        <p>生成时间: ${new Date(report.timestamp).toLocaleString()}</p>
    </div>
    <h2>错误详情</h2>
`

    report.errors?.forEach((error) => {
        html += `
    <div class="error ${error.severity}">
        <h3>${error.errorCode} - ${error.category}</h3>
        <p><strong>ID:</strong> <span class="error-id">${error.id}</span></p>
        <p><strong>文件:</strong> <span class="file-path">${error.filePath}:${error.line}:${error.column}</span></p>
        <p><strong>严重程度:</strong> ${error.severity}</p>
        <p><strong>状态:</strong> ${error.status}</p>
        <p><strong>错误信息:</strong> ${error.message}</p>
    </div>
`
    })

    html += `
</body>
</html>
`

    fs.writeFileSync(filePath, html)
    console.log(`🌐 HTML报告已导出: ${filePath}`)
}

/**
 * 主函数
 */
function main() {
    const args = process.argv.slice(2)

    if (args.length === 0) {
        showHelp()
        return
    }

    const command = args[0]

    switch (command) {
        case 'list':
            listErrors(args[1])
            break
        case 'show':
            if (!args[1]) {
                console.log('❌ 请提供错误ID')
                return
            }
            showError(args[1])
            break
        case 'mark-fixed':
            if (!args[1]) {
                console.log('❌ 请提供错误ID')
                return
            }
            markErrorFixed(args[1])
            break
        case 'mark-ignored':
            if (!args[1]) {
                console.log('❌ 请提供错误ID')
                return
            }
            markErrorIgnored(args[1])
            break
        case 'stats':
            showStats()
            break
        case 'clean':
            cleanFixedErrors()
            break
        case 'export':
            exportReport(args[1])
            break
        case 'help':
        case '--help':
        case '-h':
            showHelp()
            break
        default:
            console.log(`❌ 未知命令: ${command}`)
            showHelp()
    }
}

// 如果直接运行此脚本
if (import.meta.url === new URL(process.argv[1], 'file:').href) {
    main()
}

export {
    loadErrorReport,
    saveErrorReport,
    listErrors,
    showError,
    markErrorFixed,
    showStats,
}
