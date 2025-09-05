#!/usr/bin/env node

/**
 * 验证正则表达式修复的简化测试脚本
 */

console.log('🔍 验证正则表达式修复')
console.log('=' .repeat(40))

// 测试用的错误行（用户报告的实际错误）
const testErrorLine = 'src/components/Files/ImageViewer.tsx(328,1): error TS1128: Declaration or statement expected.'

console.log('测试错误行:')
console.log(`"${testErrorLine}"`)
console.log(`长度: ${testErrorLine.length}`)

// 使用修复后的正则表达式模式
const fixedPatterns = [
    { name: '去除结尾锚点', regex: /^(.+?)\((\d+),(\d+)\):\s+(error|warning)\s+(TS\d+):\s+(.+)/ },
    { name: '去除所有锚点', regex: /(.+?)\((\d+),(\d+)\):\s+(error|warning)\s+(TS\d+):\s+(.+)/ },
    { name: '宽松空格匹配', regex: /(.+?)\((\d+),(\d+)\):\s*(error|warning)\s*(TS\d+):\s*(.+)/ },
    { name: '贪婪文件路径', regex: /(.+)\((\d+),(\d+)\):\s+(error|warning)\s+(TS\d+):\s+(.+)/ }
]

console.log('\n🧪 测试修复后的正则表达式:')

let workingPattern = null
let workingMatch = null

fixedPatterns.forEach(({ name, regex }, index) => {
    console.log(`\n${index + 1}. ${name}`)
    console.log(`   模式: ${regex}`)
    
    const match = testErrorLine.match(regex)
    
    if (match) {
        console.log('   结果: ✅ 匹配成功!')
        console.log('   分组结果:')
        console.log(`     [1] 文件路径: "${match[1]}"`)
        console.log(`     [2] 行号: "${match[2]}"`)
        console.log(`     [3] 列号: "${match[3]}"`)
        console.log(`     [4] 错误类型: "${match[4]}"`)
        console.log(`     [5] 错误代码: "${match[5]}"`)
        console.log(`     [6] 错误消息: "${match[6]}"`)
        
        if (!workingPattern) {
            workingPattern = { name, regex }
            workingMatch = match
        }
    } else {
        console.log('   结果: ❌ 匹配失败')
    }
})

console.log('\n📊 测试结果总结:')
if (workingPattern) {
    console.log(`✅ 找到可工作的模式: ${workingPattern.name}`)
    console.log(`   推荐使用: ${workingPattern.regex}`)
    
    // 模拟解析过程
    console.log('\n🔧 模拟解析过程:')
    const error = {
        id: `ImageViewer.tsx_L${workingMatch[2]}_${workingMatch[5]}_test`,
        filePath: workingMatch[1],
        line: parseInt(workingMatch[2]),
        column: parseInt(workingMatch[3]),
        type: workingMatch[4],
        errorCode: workingMatch[5],
        message: workingMatch[6].trim(),
        severity: workingMatch[5] === 'TS1128' ? 'high' : 'medium',
        category: workingMatch[5] === 'TS1128' ? 'Syntax Error' : 'General'
    }
    
    console.log('   创建的错误对象:')
    console.log('   {')
    Object.entries(error).forEach(([key, value]) => {
        console.log(`     ${key}: "${value}"`)
    })
    console.log('   }')
    
    console.log('\n🎉 修复验证成功!')
    console.log('   脚本应该能够正确解析这个错误')
    console.log('   预期结果: "📋 解析到 1 个错误"')
    
} else {
    console.log('❌ 没有找到可工作的模式')
    console.log('   需要进一步调试正则表达式')
}

console.log('\n🏁 验证完成')

// 测试多行输入（模拟实际的TypeScript输出）
console.log('\n🔍 测试多行输入:')
const multiLineInput = `${testErrorLine}
`

const lines = multiLineInput.split('\n')
console.log(`输入行数: ${lines.length}`)

let parsedErrors = 0
lines.forEach((line, index) => {
    console.log(`行${index + 1}: "${line}" (长度: ${line.length})`)
    
    if (line.trim() === '') {
        console.log('  跳过空行')
        return
    }
    
    if (workingPattern) {
        const match = line.match(workingPattern.regex)
        if (match) {
            console.log('  ✅ 成功解析')
            parsedErrors++
        } else {
            console.log('  ❌ 解析失败')
        }
    }
})

console.log(`\n📋 多行测试结果: 解析到 ${parsedErrors} 个错误`)
console.log(`预期: 解析到 1 个错误`)
console.log(`结果: ${parsedErrors === 1 ? '✅ 正确' : '❌ 不正确'}`)
