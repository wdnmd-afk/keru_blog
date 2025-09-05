#!/usr/bin/env node

/**
 * 最简单的测试脚本
 * 用于验证基本的脚本执行和输出功能
 */

console.log('🚀 简单测试脚本开始执行')
console.log('📅 当前时间:', new Date().toISOString())
console.log('🔧 Node.js版本:', process.version)
console.log('📁 当前工作目录:', process.cwd())
console.log('📄 脚本参数:', process.argv)

import { execSync } from 'child_process'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

// ES模块中获取__dirname
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

console.log('📂 脚本目录:', __dirname)

// 测试基本的文件系统操作
console.log('\n📁 测试文件系统操作:')
const testDir = path.join(__dirname, '../TsError')
console.log('目标目录:', testDir)

if (!fs.existsSync(testDir)) {
    console.log('创建目录...')
    fs.mkdirSync(testDir, { recursive: true })
    console.log('✅ 目录创建成功')
} else {
    console.log('✅ 目录已存在')
}

// 测试写入文件
console.log('\n📄 测试文件写入:')
const testFile = path.join(testDir, 'test-output.txt')
const testContent = `测试文件\n创建时间: ${new Date().toISOString()}\n`

try {
    fs.writeFileSync(testFile, testContent, 'utf8')
    console.log('✅ 文件写入成功:', testFile)
    
    // 读取文件验证
    const readContent = fs.readFileSync(testFile, 'utf8')
    console.log('✅ 文件读取成功，内容长度:', readContent.length)
} catch (error) {
    console.error('❌ 文件操作失败:', error.message)
}

// 测试TypeScript命令
console.log('\n🔧 测试TypeScript命令:')
try {
    const tscVersion = execSync('npx tsc --version', { 
        encoding: 'utf8',
        stdio: 'pipe'
    })
    console.log('✅ TypeScript版本:', tscVersion.trim())
} catch (error) {
    console.error('❌ TypeScript命令失败:', error.message)
}

// 测试tsconfig.json存在性
console.log('\n⚙️ 测试配置文件:')
const tsConfigPath = path.join(__dirname, '../tsconfig.json')
console.log('tsconfig.json路径:', tsConfigPath)
console.log('tsconfig.json存在:', fs.existsSync(tsConfigPath) ? '✅ 是' : '❌ 否')

if (fs.existsSync(tsConfigPath)) {
    try {
        const tsConfig = JSON.parse(fs.readFileSync(tsConfigPath, 'utf8'))
        console.log('✅ tsconfig.json解析成功')
        console.log('编译选项数量:', Object.keys(tsConfig.compilerOptions || {}).length)
    } catch (error) {
        console.error('❌ tsconfig.json解析失败:', error.message)
    }
}

// 测试TypeScript编译检查
console.log('\n🔍 测试TypeScript编译检查:')
try {
    console.log('执行命令: npx tsc --noEmit --pretty false')
    const result = execSync('npx tsc --noEmit --pretty false', {
        cwd: path.dirname(tsConfigPath),
        encoding: 'utf8',
        stdio: 'pipe'
    })
    console.log('✅ TypeScript编译检查成功')
    console.log('输出长度:', result.length)
    if (result.trim()) {
        console.log('输出内容:')
        console.log('---开始---')
        console.log(result)
        console.log('---结束---')
    } else {
        console.log('无输出内容（这通常表示没有错误）')
    }
} catch (error) {
    console.log('⚠️ TypeScript编译发现问题')
    console.log('错误码:', error.status)
    console.log('stdout长度:', error.stdout ? error.stdout.length : 0)
    console.log('stderr长度:', error.stderr ? error.stderr.length : 0)
    
    if (error.stdout) {
        console.log('stdout内容:')
        console.log('---开始---')
        console.log(error.stdout.toString())
        console.log('---结束---')
    }
    
    if (error.stderr) {
        console.log('stderr内容:')
        console.log('---开始---')
        console.log(error.stderr.toString())
        console.log('---结束---')
    }
}

console.log('\n🏁 简单测试脚本执行完成')
console.log('如果您看到这条消息，说明脚本执行和输出功能正常')
