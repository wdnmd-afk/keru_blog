#!/usr/bin/env node

/**
 * TypeScript错误修复脚本
 * 自动修复一些常见的TypeScript错误
 */

import { execSync } from 'child_process'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

console.log('🔧 开始修复TypeScript错误...')

// 获取当前的TypeScript错误
function getCurrentErrors() {
    try {
        execSync('npx tsc --noEmit --pretty false', {
            cwd: path.dirname(__dirname),
            encoding: 'utf8',
            stdio: 'pipe'
        })
        return []
    } catch (error) {
        const output = error.stdout || error.stderr || ''
        const lines = output.split('\n').filter(line => line.trim())
        return lines.filter(line => line.includes(': error TS'))
    }
}

// 修复常见的TypeScript错误
function fixCommonErrors() {
    const errors = getCurrentErrors()
    console.log(`📊 发现 ${errors.length} 个TypeScript错误`)
    
    if (errors.length === 0) {
        console.log('✅ 没有发现TypeScript错误')
        return
    }
    
    console.log('\n前10个错误:')
    errors.slice(0, 10).forEach((error, index) => {
        console.log(`${index + 1}. ${error}`)
    })
    
    // 分析错误类型
    const errorTypes = {}
    errors.forEach(error => {
        const match = error.match(/error (TS\d+):/)
        if (match) {
            const code = match[1]
            errorTypes[code] = (errorTypes[code] || 0) + 1
        }
    })
    
    console.log('\n📈 错误类型统计:')
    Object.entries(errorTypes).forEach(([code, count]) => {
        console.log(`  ${code}: ${count} 个`)
    })
    
    // 尝试修复一些常见错误
    let fixedCount = 0
    
    // 修复TS1128错误（语法错误）
    if (errorTypes['TS1128']) {
        console.log('\n🔧 尝试修复TS1128语法错误...')
        fixedCount += fixSyntaxErrors(errors.filter(e => e.includes('TS1128')))
    }
    
    // 修复TS2307错误（模块未找到）
    if (errorTypes['TS2307']) {
        console.log('\n🔧 尝试修复TS2307模块导入错误...')
        fixedCount += fixModuleErrors(errors.filter(e => e.includes('TS2307')))
    }
    
    // 修复TS2322错误（类型不匹配）
    if (errorTypes['TS2322']) {
        console.log('\n🔧 尝试修复TS2322类型不匹配错误...')
        fixedCount += fixTypeErrors(errors.filter(e => e.includes('TS2322')))
    }
    
    console.log(`\n📊 修复结果: 尝试修复了 ${fixedCount} 个错误`)
    
    // 重新检查
    const remainingErrors = getCurrentErrors()
    console.log(`📊 剩余错误: ${remainingErrors.length} 个`)
    
    if (remainingErrors.length < errors.length) {
        console.log(`✅ 成功减少了 ${errors.length - remainingErrors.length} 个错误`)
    }
}

// 修复语法错误
function fixSyntaxErrors(syntaxErrors) {
    let fixed = 0
    
    syntaxErrors.forEach(error => {
        console.log(`  处理语法错误: ${error}`)
        
        // 提取文件路径和行号
        const match = error.match(/^(.+?)\((\d+),(\d+)\):/)
        if (match) {
            const filePath = match[1]
            const lineNum = parseInt(match[2])
            
            try {
                // 读取文件内容
                const fullPath = path.resolve(path.dirname(__dirname), filePath)
                if (fs.existsSync(fullPath)) {
                    const content = fs.readFileSync(fullPath, 'utf8')
                    const lines = content.split('\n')
                    
                    if (lineNum <= lines.length) {
                        const line = lines[lineNum - 1]
                        console.log(`    问题行: ${line.trim()}`)
                        
                        // 检查常见的语法问题
                        let fixedLine = line
                        
                        // 修复缺少分号的问题
                        if (!line.trim().endsWith(';') && !line.trim().endsWith('{') && !line.trim().endsWith('}')) {
                            if (line.includes('export') || line.includes('import') || line.includes('const') || line.includes('let')) {
                                fixedLine = line + ';'
                                console.log(`    修复: 添加分号`)
                            }
                        }
                        
                        // 如果有修复，写回文件
                        if (fixedLine !== line) {
                            lines[lineNum - 1] = fixedLine
                            fs.writeFileSync(fullPath, lines.join('\n'))
                            fixed++
                            console.log(`    ✅ 已修复`)
                        }
                    }
                }
            } catch (err) {
                console.log(`    ❌ 修复失败: ${err.message}`)
            }
        }
    })
    
    return fixed
}

// 修复模块导入错误
function fixModuleErrors(moduleErrors) {
    let fixed = 0
    
    moduleErrors.forEach(error => {
        console.log(`  处理模块错误: ${error}`)
        // 这里可以添加模块导入修复逻辑
        // 比如检查路径是否正确，模块是否存在等
    })
    
    return fixed
}

// 修复类型错误
function fixTypeErrors(typeErrors) {
    let fixed = 0
    
    typeErrors.forEach(error => {
        console.log(`  处理类型错误: ${error}`)
        // 这里可以添加类型修复逻辑
        // 比如添加类型注解，修复类型不匹配等
    })
    
    return fixed
}

// 主函数
function main() {
    try {
        fixCommonErrors()
        console.log('\n🏁 TypeScript错误修复完成')
    } catch (error) {
        console.error('❌ 修复过程中出现错误:', error.message)
        process.exit(1)
    }
}

// 运行主函数
main()
