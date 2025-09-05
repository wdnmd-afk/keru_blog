#!/usr/bin/env node

/**
 * TypeScript错误检测系统测试脚本
 * 用于验证脚本是否正常工作
 */

import { execSync } from 'child_process'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

// ES模块中获取__dirname
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

console.log('🧪 TypeScript错误检测系统测试')
console.log('=' .repeat(50))

// 基本信息
console.log('📋 基本信息:')
console.log(`   Node.js版本: ${process.version}`)
console.log(`   当前目录: ${process.cwd()}`)
console.log(`   脚本目录: ${__dirname}`)

// 检查文件存在性
console.log('\n📁 文件检查:')
const tsConfigPath = path.join(__dirname, '../tsconfig.json')
const checkerScript = path.join(__dirname, 'ts-error-checker.js')

console.log(`   tsconfig.json: ${fs.existsSync(tsConfigPath) ? '✅ 存在' : '❌ 不存在'} (${tsConfigPath})`)
console.log(`   检测脚本: ${fs.existsSync(checkerScript) ? '✅ 存在' : '❌ 不存在'} (${checkerScript})`)

// 检查TypeScript是否可用
console.log('\n🔧 TypeScript检查:')
try {
    const tscVersion = execSync('npx tsc --version', { encoding: 'utf8', stdio: 'pipe' })
    console.log(`   TypeScript版本: ✅ ${tscVersion.trim()}`)
} catch (error) {
    console.log(`   TypeScript: ❌ 不可用 (${error.message})`)
}

// 测试基本的tsc命令
console.log('\n⚡ 测试TypeScript编译:')
try {
    console.log('   执行: npx tsc --noEmit --pretty false')
    const result = execSync('npx tsc --noEmit --pretty false', {
        cwd: path.dirname(tsConfigPath),
        encoding: 'utf8',
        stdio: 'pipe'
    })
    console.log('   结果: ✅ 编译成功，无错误')
    if (result) {
        console.log(`   输出: ${result}`)
    }
} catch (error) {
    console.log('   结果: ⚠️ 发现TypeScript错误')
    console.log('   错误输出:')
    const output = error.stdout || error.stderr || error.message
    console.log('   ---开始---')
    console.log(output.toString())
    console.log('   ---结束---')
}

// 测试错误检测脚本
console.log('\n🚀 测试错误检测脚本:')
try {
    console.log('   执行: node scripts/ts-error-checker.js')
    const result = execSync('node scripts/ts-error-checker.js', {
        cwd: path.dirname(__dirname),
        encoding: 'utf8',
        stdio: 'pipe'
    })
    console.log('   结果: ✅ 脚本执行成功')
    console.log('   输出:')
    console.log('   ---开始---')
    console.log(result)
    console.log('   ---结束---')
} catch (error) {
    console.log('   结果: ❌ 脚本执行失败')
    console.log(`   错误: ${error.message}`)
    if (error.stdout) {
        console.log('   标准输出:')
        console.log('   ---开始---')
        console.log(error.stdout.toString())
        console.log('   ---结束---')
    }
    if (error.stderr) {
        console.log('   错误输出:')
        console.log('   ---开始---')
        console.log(error.stderr.toString())
        console.log('   ---结束---')
    }
}

// 检查生成的文件
console.log('\n📄 检查生成的文件:')
const errorDir = path.join(__dirname, '../TsError')
const reportFile = path.join(errorDir, 'error-report.json')
const summaryFile = path.join(errorDir, 'error-summary.md')

console.log(`   错误目录: ${fs.existsSync(errorDir) ? '✅ 存在' : '❌ 不存在'} (${errorDir})`)
console.log(`   报告文件: ${fs.existsSync(reportFile) ? '✅ 存在' : '❌ 不存在'} (${reportFile})`)
console.log(`   摘要文件: ${fs.existsSync(summaryFile) ? '✅ 存在' : '❌ 不存在'} (${summaryFile})`)

if (fs.existsSync(reportFile)) {
    try {
        const reportContent = fs.readFileSync(reportFile, 'utf8')
        const report = JSON.parse(reportContent)
        console.log(`   报告内容: ✅ 有效JSON，包含 ${report.errors?.length || 0} 个错误`)
    } catch (error) {
        console.log(`   报告内容: ❌ 无效JSON (${error.message})`)
    }
}

console.log('\n' + '='.repeat(50))
console.log('🏁 测试完成')

// 如果直接运行此脚本
if (import.meta.url === new URL(process.argv[1], 'file:').href) {
    // 脚本已经执行完毕
}
