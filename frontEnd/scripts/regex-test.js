#!/usr/bin/env node

/**
 * 正则表达式测试脚本
 * 专门用于调试TypeScript错误解析的正则表达式问题
 */

console.log('🧪 正则表达式测试脚本')
console.log('=' .repeat(50))

// 测试用的错误行
const testLines = [
    'src/components/Files/ImageViewer.tsx(328,1): error TS1128: Declaration or statement expected.',
    'src/utils/helper.ts(15,10): error TS2322: Type \'string\' is not assignable to type \'number\'.',
    'src/components/Example.tsx(8,5): warning TS7006: Parameter \'props\' implicitly has an \'any\' type.',
    'src/types/index.ts(20,15): error TS2307: Cannot find module \'./missing\'.',
    ''
]

// 不同的正则表达式模式
const regexPatterns = [
    {
        name: '原始模式',
        pattern: /^(.+?)\((\d+),(\d+)\):\s+(error|warning)\s+(TS\d+):\s+(.+)$/
    },
    {
        name: '宽松模式1',
        pattern: /(.+?)\((\d+),(\d+)\):\s*(error|warning)\s*(TS\d+):\s*(.+)/
    },
    {
        name: '宽松模式2',
        pattern: /^(.+)\((\d+),(\d+)\):\s+(error|warning)\s+(TS\d+):\s+(.*)$/
    },
    {
        name: '非贪婪模式',
        pattern: /^(.+?)\((\d+),(\d+)\):\s+(error|warning)\s+(TS\d+):\s+(.+?)$/
    },
    {
        name: '超宽松模式',
        pattern: /(.+)\((\d+),(\d+)\).*?(error|warning).*?(TS\d+).*?:\s*(.+)/
    }
]

console.log('📋 测试用例:')
testLines.forEach((line, index) => {
    if (line.trim()) {
        console.log(`  ${index + 1}. "${line}"`)
        console.log(`     长度: ${line.length}`)
        console.log(`     字符码: [${Array.from(line).map(c => c.charCodeAt(0)).join(', ')}]`)
        
        // 检查特殊字符
        const hasSpecialChars = /[\r\n\t\u0000-\u001f\u007f-\u009f]/.test(line)
        console.log(`     包含特殊字符: ${hasSpecialChars}`)
        
        if (hasSpecialChars) {
            console.log(`     特殊字符详情: ${JSON.stringify(line)}`)
        }
    } else {
        console.log(`  ${index + 1}. (空行)`)
    }
})

console.log('\n🔍 正则表达式测试:')

regexPatterns.forEach(({ name, pattern }) => {
    console.log(`\n--- ${name} ---`)
    console.log(`模式: ${pattern}`)
    
    testLines.forEach((line, lineIndex) => {
        if (line.trim() === '') return
        
        console.log(`\n测试行 ${lineIndex + 1}: "${line}"`)
        
        const match = line.match(pattern)
        
        if (match) {
            console.log(`  ✅ 匹配成功!`)
            console.log(`     完整匹配: "${match[0]}"`)
            console.log(`     分组数量: ${match.length - 1}`)
            
            for (let i = 1; i < match.length; i++) {
                console.log(`     分组${i}: "${match[i]}"`)
            }
            
            // 验证分组内容
            if (match.length >= 7) {
                console.log(`     解析结果:`)
                console.log(`       文件: ${match[1]}`)
                console.log(`       行号: ${match[2]}`)
                console.log(`       列号: ${match[3]}`)
                console.log(`       类型: ${match[4]}`)
                console.log(`       错误码: ${match[5]}`)
                console.log(`       消息: ${match[6]}`)
            }
        } else {
            console.log(`  ❌ 不匹配`)
            
            // 尝试部分匹配来诊断问题
            console.log(`     诊断分析:`)
            
            // 测试文件路径部分
            const fileMatch = line.match(/^(.+?)\(/)
            console.log(`       文件路径匹配: ${fileMatch ? '✅' : '❌'} ${fileMatch ? fileMatch[1] : ''}`)
            
            // 测试坐标部分
            const coordMatch = line.match(/\((\d+),(\d+)\):/)
            console.log(`       坐标匹配: ${coordMatch ? '✅' : '❌'} ${coordMatch ? `(${coordMatch[1]},${coordMatch[2]})` : ''}`)
            
            // 测试错误类型部分
            const typeMatch = line.match(/:\s+(error|warning)\s+/)
            console.log(`       类型匹配: ${typeMatch ? '✅' : '❌'} ${typeMatch ? typeMatch[1] : ''}`)
            
            // 测试错误码部分
            const codeMatch = line.match(/(TS\d+):/)
            console.log(`       错误码匹配: ${codeMatch ? '✅' : '❌'} ${codeMatch ? codeMatch[1] : ''}`)
            
            // 测试消息部分
            const msgMatch = line.match(/TS\d+:\s+(.+)$/)
            console.log(`       消息匹配: ${msgMatch ? '✅' : '❌'} ${msgMatch ? msgMatch[1] : ''}`)
        }
    })
})

// 手动构建正则表达式
console.log('\n🔧 手动构建正则表达式测试:')

const testLine = 'src/components/Files/ImageViewer.tsx(328,1): error TS1128: Declaration or statement expected.'
console.log(`测试行: "${testLine}"`)

// 逐步构建正则表达式
const parts = [
    { name: '文件路径', pattern: '(.+?)' },
    { name: '左括号', pattern: '\\(' },
    { name: '行号', pattern: '(\\d+)' },
    { name: '逗号', pattern: ',' },
    { name: '列号', pattern: '(\\d+)' },
    { name: '右括号冒号', pattern: '\\):' },
    { name: '空格', pattern: '\\s+' },
    { name: '错误类型', pattern: '(error|warning)' },
    { name: '空格', pattern: '\\s+' },
    { name: '错误代码', pattern: '(TS\\d+)' },
    { name: '冒号空格', pattern: ':\\s+' },
    { name: '错误消息', pattern: '(.+)' }
]

let builtPattern = '^'
parts.forEach(part => {
    builtPattern += part.pattern
    
    const currentRegex = new RegExp(builtPattern + '.*$')
    const matches = testLine.match(currentRegex)
    
    console.log(`添加 ${part.name}: ${matches ? '✅' : '❌'} - ${builtPattern}`)
    
    if (!matches) {
        console.log(`  失败位置: ${part.name}`)
        console.log(`  当前模式: ${builtPattern}`)
        
        // 尝试不同的变体
        if (part.name === '空格') {
            const altPattern = builtPattern.replace(/\\s\+$/, '\\s*')
            const altMatches = testLine.match(new RegExp(altPattern + '.*$'))
            console.log(`  尝试 \\s*: ${altMatches ? '✅' : '❌'}`)
        }
    }
})

builtPattern += '$'
console.log(`\n最终模式: ${builtPattern}`)

const finalRegex = new RegExp(builtPattern)
const finalMatch = testLine.match(finalRegex)

console.log(`最终测试: ${finalMatch ? '✅ 成功' : '❌ 失败'}`)

if (finalMatch) {
    console.log('匹配结果:')
    finalMatch.forEach((match, index) => {
        console.log(`  ${index}: "${match}"`)
    })
}

console.log('\n🏁 测试完成')
