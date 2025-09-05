#!/usr/bin/env node

/**
 * TypeScript错误检测和管理系统
 * 用于检测、分类、跟踪和管理TypeScript编译错误
 */

// 立即输出调试信息
console.log('🚀 TypeScript错误检测脚本开始加载...')
console.log('📅 当前时间:', new Date().toISOString())
console.log('🔧 Node.js版本:', process.version)
console.log('📁 当前工作目录:', process.cwd())
console.log('📄 脚本文件:', import.meta.url)

import { execSync } from 'child_process'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

// ES模块中获取__dirname
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

console.log('📂 脚本目录:', __dirname)
console.log('📋 模块导入完成')

// 配置
const CONFIG = {
    errorDir: path.join(__dirname, '../TsError'),
    reportFile: path.join(__dirname, '../TsError/error-report.json'),
    summaryFile: path.join(__dirname, '../TsError/error-summary.md'),
    tsConfigPath: path.join(__dirname, '../tsconfig.json'),
    maxErrorsToShow: 50,
}

// 错误严重程度映射
const ERROR_SEVERITY = {
    TS1128: 'high',    // Declaration or statement expected
    TS2307: 'high',    // Cannot find module
    TS2322: 'medium',  // Type assignment error
    TS2339: 'medium',  // Property does not exist
    TS2345: 'medium',  // Argument type error
    TS2742: 'high',    // Inferred type cannot be named
    TS7016: 'low',     // Could not find declaration file
    TS18003: 'low',    // No inputs were found
    default: 'medium',
}

// 错误类别映射
const ERROR_CATEGORIES = {
    TS1128: 'Syntax Error',
    TS2307: 'Module Resolution',
    TS2322: 'Type Assignment',
    TS2339: 'Property Access',
    TS2345: 'Function Arguments',
    TS2742: 'Type Inference',
    TS7016: 'Declaration Files',
    TS18003: 'Project Configuration',
    default: 'General',
}

/**
 * 确保错误目录存在
 */
function ensureErrorDir() {
    console.log('📁 检查错误目录...')
    if (!fs.existsSync(CONFIG.errorDir)) {
        fs.mkdirSync(CONFIG.errorDir, { recursive: true })
        console.log(`✅ 创建错误目录: ${CONFIG.errorDir}`)
    } else {
        console.log(`✅ 错误目录已存在: ${CONFIG.errorDir}`)
    }
}

/**
 * 执行TypeScript编译检查
 */
function runTypeScriptCheck() {
    console.log('🔍 开始TypeScript编译检查...')
    console.log(`📂 工作目录: ${path.dirname(CONFIG.tsConfigPath)}`)
    console.log(`⚙️ 配置文件: ${CONFIG.tsConfigPath}`)

    try {
        console.log('⏳ 执行 tsc --noEmit --pretty false...')

        // 使用 --noEmit 只检查类型，不生成文件
        const result = execSync('npx tsc --noEmit --pretty false', {
            cwd: path.dirname(CONFIG.tsConfigPath),
            stdio: 'pipe',
            encoding: 'utf8'
        })

        console.log('✅ TypeScript编译检查通过，无错误发现')
        console.log('📊 编译输出:', result || '(无输出)')
        return []
    } catch (error) {
        console.log('⚠️ TypeScript编译发现错误，开始解析...')
        const output = error.stdout ? error.stdout.toString() : error.stderr.toString()
        console.log('🔍 原始错误输出:')
        console.log('---开始---')
        console.log(output)
        console.log('---结束---')

        const parsedErrors = parseTypeScriptErrors(output)
        console.log(`📋 解析到 ${parsedErrors.length} 个错误`)
        return parsedErrors
    }
}

/**
 * 解析TypeScript错误输出
 */
function parseTypeScriptErrors(output) {
    console.log('🔍 开始解析TypeScript错误输出...')
    console.log(`📊 输出总长度: ${output.length} 字符`)

    const errors = []
    const lines = output.split('\n')

    console.log(`📋 分割后行数: ${lines.length}`)
    console.log('📝 逐行分析:')

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i]
        console.log(`  行${i + 1}: "${line}" (长度: ${line.length})`)

        if (line.trim() === '') {
            console.log(`    ↳ 跳过空行`)
            continue
        }

        // 匹配错误格式: file(line,col): error TSxxxx: message
        console.log(`    ↳ 尝试匹配正则表达式...`)

        // 显示正在使用的正则表达式
        const regexPattern = /^(.+?)\((\d+),(\d+)\):\s+(error|warning)\s+(TS\d+):\s+(.+)$/
        console.log(`    ↳ 正则表达式: ${regexPattern}`)

        // 显示行的详细信息
        console.log(`    ↳ 行内容字符码: [${Array.from(line).slice(0, 20).map(c => c.charCodeAt(0)).join(', ')}...]`)
        console.log(`    ↳ 行是否包含特殊字符: ${/[\r\n\t\u0000-\u001f\u007f-\u009f]/.test(line)}`)

        // 基于实际测试的正则表达式模式（按成功率排序）
        const patterns = [
            { name: '去除结尾锚点', regex: /^(.+?)\((\d+),(\d+)\):\s+(error|warning)\s+(TS\d+):\s+(.+)/ },
            { name: '去除所有锚点', regex: /(.+?)\((\d+),(\d+)\):\s+(error|warning)\s+(TS\d+):\s+(.+)/ },
            { name: '宽松空格匹配', regex: /(.+?)\((\d+),(\d+)\):\s*(error|warning)\s*(TS\d+):\s*(.+)/ },
            { name: '贪婪文件路径', regex: /(.+)\((\d+),(\d+)\):\s+(error|warning)\s+(TS\d+):\s+(.+)/ },
            { name: '原始严格模式', regex: /^(.+?)\((\d+),(\d+)\):\s+(error|warning)\s+(TS\d+):\s+(.+)$/ },
            { name: '超宽松模式', regex: /(.+)\((\d+),(\d+)\).*?(error|warning).*?(TS\d+).*?:\s*(.+)/ }
        ]

        let match = null
        let matchedPattern = null

        for (const pattern of patterns) {
            console.log(`    ↳ 尝试${pattern.name}: ${pattern.regex}`)
            const testMatch = line.match(pattern.regex)
            if (testMatch) {
                console.log(`    ✅ ${pattern.name}匹配成功!`)
                match = testMatch
                matchedPattern = pattern.name
                break
            } else {
                console.log(`    ❌ ${pattern.name}匹配失败`)
            }
        }

        if (match) {
            console.log(`    ✅ 使用${matchedPattern}匹配成功!`)
            console.log(`       完整匹配: ${match[0]}`)
            console.log(`       分组数量: ${match.length - 1}`)
            console.log(`       文件路径: ${match[1]}`)
            console.log(`       行号: ${match[2]}`)
            console.log(`       列号: ${match[3]}`)
            console.log(`       类型: ${match[4]}`)
            console.log(`       错误代码: ${match[5]}`)
            console.log(`       错误信息: ${match[6]}`)

            const [, filePath, lineNum, colNum, type, errorCode, message] = match

            const error = {
                id: generateErrorId(filePath, lineNum, errorCode),
                filePath: path.relative(process.cwd(), filePath),
                line: parseInt(lineNum),
                column: parseInt(colNum),
                type,
                errorCode,
                message: message.trim(),
                severity: ERROR_SEVERITY[errorCode] || ERROR_SEVERITY.default,
                category: ERROR_CATEGORIES[errorCode] || ERROR_CATEGORIES.default,
                timestamp: new Date().toISOString(),
                status: 'active',
            }

            console.log(`    📦 创建错误对象:`, error)
            errors.push(error)
        } else {
            console.log(`    ❌ 所有正则表达式都不匹配`)

            // 详细的诊断信息
            console.log(`    🔍 诊断分析:`)

            // 测试各个部分
            const diagnostics = [
                { name: '文件路径', regex: /^(.+?)\(/ },
                { name: '坐标', regex: /\((\d+),(\d+)\):/ },
                { name: '错误类型', regex: /:\s+(error|warning)\s+/ },
                { name: '错误代码', regex: /(TS\d+):/ },
                { name: '错误消息', regex: /TS\d+:\s+(.+)$/ }
            ]

            diagnostics.forEach(({ name, regex }) => {
                const diagMatch = line.match(regex)
                console.log(`       ${name}: ${diagMatch ? '✅' : '❌'} ${diagMatch ? diagMatch[0] : ''}`)
            })
        }
    }

    console.log(`\n📊 解析结果总结:`)
    console.log(`   总行数: ${lines.length}`)
    console.log(`   解析到的错误数: ${errors.length}`)

    if (errors.length > 0) {
        console.log(`   错误详情:`)
        errors.forEach((error, index) => {
            console.log(`     ${index + 1}. ${error.errorCode} - ${error.filePath}:${error.line}:${error.column}`)
            console.log(`        ${error.message}`)
        })
    }

    return errors
}

/**
 * 生成错误唯一ID
 */
function generateErrorId(filePath, line, errorCode) {
    const fileName = path.basename(filePath)
    return `${fileName}_L${line}_${errorCode}_${Date.now().toString(36)}`
}

/**
 * 加载已存在的错误记录
 */
function loadExistingErrors() {
    console.log(`📂 检查现有错误记录文件: ${CONFIG.reportFile}`)

    if (!fs.existsSync(CONFIG.reportFile)) {
        console.log('📝 未找到现有错误记录文件，这是首次运行')
        return []
    }

    try {
        console.log('📖 读取现有错误记录...')
        const content = fs.readFileSync(CONFIG.reportFile, 'utf8')
        const data = JSON.parse(content)
        const errors = data.errors || []
        console.log(`✅ 成功加载 ${errors.length} 个现有错误记录`)
        return errors
    } catch (error) {
        console.warn('⚠️ 无法加载现有错误记录:', error.message)
        console.warn('   将从空记录开始')
        return []
    }
}

/**
 * 比较错误，标记新增和已修复的错误
 */
function compareErrors(newErrors, existingErrors) {
    const existingMap = new Map()
    existingErrors.forEach((error) => {
        const key = `${error.filePath}:${error.line}:${error.errorCode}`
        existingMap.set(key, error)
    })

    const currentMap = new Map()
    const processedErrors = []

    // 处理新错误
    newErrors.forEach((error) => {
        const key = `${error.filePath}:${error.line}:${error.errorCode}`
        currentMap.set(key, error)

        const existing = existingMap.get(key)
        if (existing) {
            // 错误仍然存在，保持原有ID和状态
            error.id = existing.id
            error.status = existing.status
            error.firstSeen = existing.firstSeen || existing.timestamp
        } else {
            // 新错误
            error.status = 'new'
            error.firstSeen = error.timestamp
        }

        processedErrors.push(error)
    })

    // 标记已修复的错误
    const fixedErrors = []
    existingErrors.forEach((error) => {
        const key = `${error.filePath}:${error.line}:${error.errorCode}`
        if (!currentMap.has(key) && error.status === 'active') {
            error.status = 'fixed'
            error.fixedAt = new Date().toISOString()
            fixedErrors.push(error)
        }
    })

    return { processedErrors, fixedErrors }
}

/**
 * 保存错误报告
 */
function saveErrorReport(errors, fixedErrors) {
    console.log('💾 开始保存错误报告...')

    const report = {
        timestamp: new Date().toISOString(),
        summary: {
            total: errors.length,
            new: errors.filter((e) => e.status === 'new').length,
            active: errors.filter((e) => e.status === 'active').length,
            fixed: fixedErrors.length,
        },
        errors: errors,
        fixedErrors: fixedErrors,
    }

    console.log('📄 保存JSON报告...')
    // 保存JSON报告
    fs.writeFileSync(CONFIG.reportFile, JSON.stringify(report, null, 2))
    console.log(`✅ JSON报告已保存: ${CONFIG.reportFile}`)

    console.log('📝 生成Markdown摘要...')
    // 生成Markdown摘要
    generateMarkdownSummary(report)
    console.log(`✅ Markdown摘要已生成: ${CONFIG.summaryFile}`)

    console.log('📁 生成单独的错误文件...')
    // 生成单独的错误文件
    generateIndividualErrorFiles(errors)
    console.log(`✅ 已生成 ${errors.length} 个单独错误文件`)

    console.log('🗑️ 清理已修复的错误文件...')
    // 清理已修复的错误文件
    cleanupFixedErrorFiles(fixedErrors)
    console.log(`✅ 已清理 ${fixedErrors.length} 个已修复错误文件`)

    return report
}

/**
 * 生成Markdown摘要报告
 */
function generateMarkdownSummary(report) {
    const { summary, errors } = report

    let markdown = `# TypeScript错误检测报告\n\n`
    markdown += `**检测时间**: ${new Date(report.timestamp).toLocaleString()}\n\n`

    // 统计信息
    markdown += `## 📊 错误统计\n\n`
    markdown += `| 类型 | 数量 |\n`
    markdown += `|------|------|\n`
    markdown += `| 总错误数 | ${summary.total} |\n`
    markdown += `| 新增错误 | ${summary.new} |\n`
    markdown += `| 活跃错误 | ${summary.active} |\n`
    markdown += `| 已修复错误 | ${summary.fixed} |\n\n`

    if (errors.length === 0) {
        markdown += `## ✅ 恭喜！没有发现TypeScript错误\n\n`
    } else {
        // 按严重程度分组
        const errorsBySeverity = {
            high: errors.filter((e) => e.severity === 'high'),
            medium: errors.filter((e) => e.severity === 'medium'),
            low: errors.filter((e) => e.severity === 'low'),
        }

        markdown += `## 🚨 错误详情\n\n`

        Object.entries(errorsBySeverity).forEach(([severity, severityErrors]) => {
            if (severityErrors.length === 0) return

            const icon = severity === 'high' ? '🔴' : severity === 'medium' ? '🟡' : '🟢'
            markdown += `### ${icon} ${severity.toUpperCase()} 严重程度 (${severityErrors.length}个)\n\n`

            severityErrors.slice(0, 10).forEach((error) => {
                const status = error.status === 'new' ? '🆕' : '📍'
                markdown += `${status} **${error.errorCode}** - ${error.category}\n`
                markdown += `- 📁 文件: \`${error.filePath}:${error.line}:${error.column}\`\n`
                markdown += `- 💬 错误: ${error.message}\n`
                markdown += `- 🆔 ID: \`${error.id}\`\n\n`
            })

            if (severityErrors.length > 10) {
                markdown += `... 还有 ${severityErrors.length - 10} 个${severity}严重程度的错误\n\n`
            }
        })
    }

    // 修复建议
    if (errors.length > 0) {
        markdown += `## 🔧 修复建议\n\n`

        const suggestions = generateFixSuggestions(errors)
        suggestions.forEach((suggestion) => {
            markdown += `### ${suggestion.category}\n`
            markdown += `${suggestion.description}\n\n`
            if (suggestion.examples.length > 0) {
                markdown += `**示例错误**:\n`
                suggestion.examples.forEach((example) => {
                    markdown += `- \`${example.filePath}:${example.line}\` - ${example.message}\n`
                })
                markdown += `\n`
            }
        })
    }

    fs.writeFileSync(CONFIG.summaryFile, markdown)
}

/**
 * 生成修复建议
 */
function generateFixSuggestions(errors) {
    const suggestions = []
    const errorsByCategory = {}

    errors.forEach((error) => {
        if (!errorsByCategory[error.category]) {
            errorsByCategory[error.category] = []
        }
        errorsByCategory[error.category].push(error)
    })

    Object.entries(errorsByCategory).forEach(([category, categoryErrors]) => {
        const suggestion = {
            category,
            description: getSuggestionForCategory(category),
            examples: categoryErrors.slice(0, 3),
        }
        suggestions.push(suggestion)
    })

    return suggestions
}

/**
 * 获取分类的修复建议
 */
function getSuggestionForCategory(category) {
    const suggestions = {
        'Module Resolution': '检查模块路径是否正确，确保依赖已安装，考虑添加类型声明文件。',
        'Type Assignment': '检查变量类型是否匹配，考虑使用类型断言或修改类型定义。',
        'Property Access': '确认对象属性存在，检查类型定义是否完整，考虑使用可选链操作符。',
        'Function Arguments': '检查函数参数类型和数量是否正确，确认函数签名匹配。',
        'Type Inference': '为复杂类型添加明确的类型注解，避免依赖类型推断。',
        'Declaration Files': '安装对应的@types包或创建自定义类型声明文件。',
        'Project Configuration': '检查tsconfig.json配置，确保包含所有必要的源文件。',
        General: '查看具体错误信息，根据错误代码查找相应的解决方案。',
    }

    return suggestions[category] || suggestions['General']
}

/**
 * 生成单独的错误文件
 */
function generateIndividualErrorFiles(errors) {
    const errorFilesDir = path.join(CONFIG.errorDir, 'individual')
    if (!fs.existsSync(errorFilesDir)) {
        fs.mkdirSync(errorFilesDir, { recursive: true })
    }

    errors.forEach((error) => {
        const fileName = `${error.id}.json`
        const filePath = path.join(errorFilesDir, fileName)

        const errorDetail = {
            ...error,
            fixSuggestion: getSuggestionForCategory(error.category),
            relatedDocs: getRelatedDocs(error.errorCode),
        }

        fs.writeFileSync(filePath, JSON.stringify(errorDetail, null, 2))
    })
}

/**
 * 获取相关文档链接
 */
function getRelatedDocs(errorCode) {
    const docs = {
        TS2307: 'https://typescript-tv.com/errors/#TS2307',
        TS2322: 'https://typescript-tv.com/errors/#TS2322',
        TS2339: 'https://typescript-tv.com/errors/#TS2339',
        TS2345: 'https://typescript-tv.com/errors/#TS2345',
        TS2742: 'https://typescript-tv.com/errors/#TS2742',
        TS7016: 'https://typescript-tv.com/errors/#TS7016',
    }

    return docs[errorCode] || 'https://www.typescriptlang.org/docs/'
}

/**
 * 清理已修复的错误文件
 */
function cleanupFixedErrorFiles(fixedErrors) {
    const errorFilesDir = path.join(CONFIG.errorDir, 'individual')

    fixedErrors.forEach((error) => {
        const fileName = `${error.id}.json`
        const filePath = path.join(errorFilesDir, fileName)

        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath)
            console.log(`🗑️ 删除已修复错误文件: ${fileName}`)
        }
    })
}

/**
 * 显示终端摘要
 */
function displayTerminalSummary(report) {
    const { summary, errors } = report

    console.log('\n' + '='.repeat(60))
    console.log('📋 TypeScript错误检测摘要')
    console.log('='.repeat(60))

    if (summary.total === 0) {
        console.log('✅ 恭喜！没有发现TypeScript错误')
    } else {
        console.log(`📊 总错误数: ${summary.total}`)
        console.log(`🆕 新增错误: ${summary.new}`)
        console.log(`📍 活跃错误: ${summary.active}`)
        console.log(`✅ 已修复错误: ${summary.fixed}`)

        // 显示前几个高严重程度错误
        const highSeverityErrors = errors.filter((e) => e.severity === 'high').slice(0, 5)
        if (highSeverityErrors.length > 0) {
            console.log('\n🔴 高严重程度错误:')
            highSeverityErrors.forEach((error, index) => {
                console.log(`  ${index + 1}. ${error.errorCode} - ${error.filePath}:${error.line}`)
                console.log(`     ${error.message}`)
            })
        }
    }

    console.log('\n📁 详细报告位置:')
    console.log(`   JSON: ${CONFIG.reportFile}`)
    console.log(`   Markdown: ${CONFIG.summaryFile}`)
    console.log('='.repeat(60) + '\n')
}

/**
 * 主函数
 */
async function main() {
    try {
        console.log('🚀 启动TypeScript错误检测系统...')
        console.log(`📅 执行时间: ${new Date().toLocaleString()}`)
        console.log(`🔧 Node.js版本: ${process.version}`)
        console.log(`📁 当前工作目录: ${process.cwd()}`)

        // 确保目录存在
        ensureErrorDir()

        // 执行TypeScript检查
        console.log('\n📋 第1步: 执行TypeScript编译检查')
        const newErrors = runTypeScriptCheck()

        // 加载现有错误
        console.log('\n📋 第2步: 加载现有错误记录')
        const existingErrors = loadExistingErrors()
        console.log(`📊 现有错误记录: ${existingErrors.length} 个`)

        // 比较错误
        console.log('\n📋 第3步: 比较和分析错误')
        const { processedErrors, fixedErrors } = compareErrors(newErrors, existingErrors)
        console.log(`📊 处理后错误: ${processedErrors.length} 个`)
        console.log(`✅ 已修复错误: ${fixedErrors.length} 个`)

        // 保存报告
        console.log('\n📋 第4步: 生成和保存报告')
        const report = saveErrorReport(processedErrors, fixedErrors)
        console.log('✅ 报告保存完成')

        // 显示摘要
        console.log('\n📋 第5步: 显示结果摘要')
        displayTerminalSummary(report)

        // 退出码
        const exitCode = processedErrors.length > 0 ? 1 : 0
        console.log(`\n🏁 脚本执行完成，退出码: ${exitCode}`)
        process.exit(exitCode)
    } catch (error) {
        console.error('\n❌ 错误检测系统执行失败:')
        console.error(`   错误类型: ${error.constructor.name}`)
        console.error(`   错误信息: ${error.message}`)
        console.error(`   错误堆栈:`)
        console.error(error.stack)
        process.exit(1)
    }
}

// 检查是否直接运行此脚本
console.log('🔍 检查脚本执行条件...')
console.log('import.meta.url:', import.meta.url)
console.log('process.argv:', process.argv)

// 使用更简单可靠的检查方法
const isMainModule = process.argv[1] && import.meta.url.endsWith(path.basename(process.argv[1]))

console.log('isMainModule:', isMainModule)
console.log('path.basename(process.argv[1]):', process.argv[1] ? path.basename(process.argv[1]) : 'undefined')

if (isMainModule) {
    console.log('✅ 检测到直接运行，开始执行main函数')
    main().catch(error => {
        console.error('❌ main函数执行失败:', error)
        process.exit(1)
    })
} else {
    console.log('❌ 脚本被作为模块导入，不执行main函数')
}

// 无论如何都尝试执行一次（用于调试）
console.log('🔧 强制执行main函数进行调试...')
main().catch(error => {
    console.error('❌ 强制执行失败:', error)
})

export {
    runTypeScriptCheck,
    parseTypeScriptErrors,
    compareErrors,
    saveErrorReport,
}
