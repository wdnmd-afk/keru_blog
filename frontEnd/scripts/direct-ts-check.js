#!/usr/bin/env node

/**
 * 直接调用TypeScript错误检测的脚本
 * 绕过模块检查逻辑，直接执行main函数
 */

console.log('🚀 直接TypeScript错误检测脚本开始')
console.log('📅 当前时间:', new Date().toISOString())

import { execSync } from 'child_process'
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
    summaryFile: path.join(__dirname, '../TsError/error-summary.md'),
    tsConfigPath: path.join(__dirname, '../tsconfig.json'),
    maxErrorsToShow: 50
}

console.log('⚙️ 配置信息:')
console.log('  错误目录:', CONFIG.errorDir)
console.log('  报告文件:', CONFIG.reportFile)
console.log('  摘要文件:', CONFIG.summaryFile)
console.log('  TS配置:', CONFIG.tsConfigPath)

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
        
        const result = execSync('npx tsc --noEmit --pretty false', {
            cwd: path.dirname(CONFIG.tsConfigPath),
            stdio: 'pipe',
            encoding: 'utf8'
        })

        console.log('✅ TypeScript编译检查通过，无错误发现')
        console.log('📊 编译输出长度:', result.length)
        if (result.trim()) {
            console.log('编译输出内容:')
            console.log('---开始---')
            console.log(result)
            console.log('---结束---')
        }
        return []
    } catch (error) {
        console.log('⚠️ TypeScript编译发现错误，开始解析...')
        console.log('错误状态码:', error.status)
        
        const stdout = error.stdout ? error.stdout.toString() : ''
        const stderr = error.stderr ? error.stderr.toString() : ''
        
        console.log('stdout长度:', stdout.length)
        console.log('stderr长度:', stderr.length)
        
        if (stdout) {
            console.log('stdout内容:')
            console.log('---开始---')
            console.log(stdout)
            console.log('---结束---')
        }
        
        if (stderr) {
            console.log('stderr内容:')
            console.log('---开始---')
            console.log(stderr)
            console.log('---结束---')
        }
        
        // 改进的错误解析
        const output = stdout || stderr
        const lines = output.split('\n')
        console.log(`📋 总行数: ${lines.length}`)

        const parsedErrors = []

        for (let i = 0; i < lines.length; i++) {
            const line = lines[i]
            console.log(`  行${i + 1}: "${line}"`)

            if (line.trim() === '') continue

            // 匹配TypeScript错误格式 - 使用最可能成功的模式
            const patterns = [
                /^(.+?)\((\d+),(\d+)\):\s+(error|warning)\s+(TS\d+):\s+(.+)/,  // 去除结尾锚点
                /(.+?)\((\d+),(\d+)\):\s+(error|warning)\s+(TS\d+):\s+(.+)/,   // 去除所有锚点
                /(.+?)\((\d+),(\d+)\):\s*(error|warning)\s*(TS\d+):\s*(.+)/,   // 宽松空格
                /(.+)\((\d+),(\d+)\):\s+(error|warning)\s+(TS\d+):\s+(.+)/     // 贪婪文件路径
            ]

            let match = null
            for (const pattern of patterns) {
                match = line.match(pattern)
                if (match) {
                    console.log(`    ✅ 匹配成功，使用模式: ${pattern}`)
                    break
                }
            }

            if (match) {
                console.log(`    ✅ 匹配成功: ${match[5]} - ${match[6]}`)
                parsedErrors.push({
                    file: match[1],
                    line: match[2],
                    column: match[3],
                    type: match[4],
                    code: match[5],
                    message: match[6],
                    fullLine: line
                })
            } else {
                console.log(`    ❌ 不匹配TypeScript错误格式`)
            }
        }

        console.log(`📋 解析到 ${parsedErrors.length} 个TypeScript错误`)
        return parsedErrors
    }
}

/**
 * 保存简单报告
 */
function saveSimpleReport(errors) {
    console.log('💾 保存简单报告...')
    
    const report = {
        timestamp: new Date().toISOString(),
        errorCount: errors.length,
        errors: errors
    }
    
    try {
        fs.writeFileSync(CONFIG.reportFile, JSON.stringify(report, null, 2))
        console.log(`✅ 报告已保存: ${CONFIG.reportFile}`)
        
        // 创建简单的Markdown摘要
        let markdown = `# TypeScript错误检测报告\n\n`
        markdown += `**检测时间**: ${new Date(report.timestamp).toLocaleString()}\n\n`
        markdown += `**错误数量**: ${report.errorCount}\n\n`
        
        if (report.errorCount > 0) {
            markdown += `## 错误详情\n\n`
            errors.forEach((error, index) => {
                if (typeof error === 'string') {
                    markdown += `${index + 1}. ${error}\n`
                } else {
                    markdown += `${index + 1}. **${error.code}** - ${error.file}:${error.line}:${error.column}\n`
                    markdown += `   ${error.message}\n\n`
                }
            })
        } else {
            markdown += `## ✅ 恭喜！没有发现TypeScript错误\n\n`
        }
        
        fs.writeFileSync(CONFIG.summaryFile, markdown)
        console.log(`✅ 摘要已保存: ${CONFIG.summaryFile}`)
        
    } catch (error) {
        console.error('❌ 保存报告失败:', error.message)
    }
}

/**
 * 显示摘要
 */
function displaySummary(errors) {
    console.log('\n' + '='.repeat(60))
    console.log('📋 TypeScript错误检测摘要')
    console.log('='.repeat(60))
    
    if (errors.length === 0) {
        console.log('✅ 恭喜！没有发现TypeScript错误')
    } else {
        console.log(`📊 发现 ${errors.length} 个问题`)
        console.log('\n前几个问题:')
        errors.slice(0, 5).forEach((error, index) => {
            if (typeof error === 'string') {
                console.log(`  ${index + 1}. ${error}`)
            } else {
                console.log(`  ${index + 1}. ${error.code} - ${error.file}:${error.line}:${error.column}`)
                console.log(`     ${error.message}`)
            }
        })
        
        if (errors.length > 5) {
            console.log(`  ... 还有 ${errors.length - 5} 个问题`)
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
        console.log('🚀 启动直接TypeScript错误检测...')
        
        // 第1步: 确保目录存在
        console.log('\n📋 第1步: 确保目录存在')
        ensureErrorDir()
        
        // 第2步: 执行TypeScript检查
        console.log('\n📋 第2步: 执行TypeScript检查')
        const errors = runTypeScriptCheck()
        
        // 第3步: 保存报告
        console.log('\n📋 第3步: 保存报告')
        saveSimpleReport(errors)
        
        // 第4步: 显示摘要
        console.log('\n📋 第4步: 显示摘要')
        displaySummary(errors)
        
        // 完成
        const exitCode = errors.length > 0 ? 1 : 0
        console.log(`\n🏁 脚本执行完成，退出码: ${exitCode}`)
        process.exit(exitCode)
        
    } catch (error) {
        console.error('\n❌ 脚本执行失败:')
        console.error(`   错误类型: ${error.constructor.name}`)
        console.error(`   错误信息: ${error.message}`)
        console.error(`   错误堆栈:`)
        console.error(error.stack)
        process.exit(1)
    }
}

// 直接执行main函数
console.log('🔧 直接调用main函数...')
main()
