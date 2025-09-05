#!/usr/bin/env node

/**
 * 简单的TypeScript编译检查脚本
 */

import { execSync } from 'child_process'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

console.log('🔍 运行简单的TypeScript编译检查...')

try {
    const result = execSync('npx tsc --noEmit --pretty false', {
        cwd: path.dirname(__dirname),
        encoding: 'utf8',
        stdio: 'pipe'
    })
    
    console.log('✅ TypeScript编译检查通过，无错误')
    if (result.trim()) {
        console.log('输出:', result)
    }
} catch (error) {
    console.log('⚠️ 发现TypeScript错误:')
    console.log('状态码:', error.status)
    
    const output = error.stdout || error.stderr || ''
    console.log('错误输出:')
    console.log('---开始---')
    console.log(output)
    console.log('---结束---')
    
    // 简单解析错误
    const lines = output.split('\n').filter(line => line.trim())
    const errorLines = lines.filter(line => line.includes(': error TS'))
    
    console.log(`\n📊 发现 ${errorLines.length} 个TypeScript错误`)
    
    if (errorLines.length > 0) {
        console.log('\n前5个错误:')
        errorLines.slice(0, 5).forEach((line, index) => {
            console.log(`${index + 1}. ${line}`)
        })
    }
}

console.log('\n🏁 检查完成')
