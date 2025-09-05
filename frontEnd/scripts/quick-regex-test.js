#!/usr/bin/env node

/**
 * 快速正则表达式测试
 * 专门测试用户报告的错误行
 */

console.log('🚀 快速正则表达式测试')

// 用户报告的具体错误行
const errorLine = 'src/components/Files/ImageViewer.tsx(328,1): error TS1128: Declaration or statement expected.'

console.log('测试行:', JSON.stringify(errorLine))
console.log('长度:', errorLine.length)
console.log('字符码:', Array.from(errorLine).map(c => c.charCodeAt(0)).slice(0, 50).join(', ') + '...')

// 测试不同的正则表达式
const regexTests = [
    {
        name: '原始严格模式',
        regex: /^(.+?)\((\d+),(\d+)\):\s+(error|warning)\s+(TS\d+):\s+(.+)$/
    },
    {
        name: '去除开头锚点',
        regex: /(.+?)\((\d+),(\d+)\):\s+(error|warning)\s+(TS\d+):\s+(.+)$/
    },
    {
        name: '去除结尾锚点',
        regex: /^(.+?)\((\d+),(\d+)\):\s+(error|warning)\s+(TS\d+):\s+(.+)/
    },
    {
        name: '去除所有锚点',
        regex: /(.+?)\((\d+),(\d+)\):\s+(error|warning)\s+(TS\d+):\s+(.+)/
    },
    {
        name: '宽松空格匹配',
        regex: /(.+?)\((\d+),(\d+)\):\s*(error|warning)\s*(TS\d+):\s*(.+)/
    },
    {
        name: '非贪婪到贪婪',
        regex: /(.+)\((\d+),(\d+)\):\s+(error|warning)\s+(TS\d+):\s+(.+)/
    },
    {
        name: '最简单模式',
        regex: /(.+)\((\d+),(\d+)\).*(error|warning).*(TS\d+).*:\s*(.+)/
    }
]

console.log('\n🔍 正则表达式测试结果:')

regexTests.forEach(({ name, regex }) => {
    console.log(`\n--- ${name} ---`)
    console.log(`模式: ${regex}`)
    
    const match = errorLine.match(regex)
    
    if (match) {
        console.log('✅ 匹配成功!')
        console.log('分组结果:')
        match.forEach((group, index) => {
            if (index === 0) {
                console.log(`  [${index}] 完整匹配: "${group}"`)
            } else {
                console.log(`  [${index}] 分组${index}: "${group}"`)
            }
        })
        
        // 验证分组是否符合预期
        if (match.length >= 7) {
            console.log('解析结果:')
            console.log(`  文件: ${match[1]}`)
            console.log(`  行号: ${match[2]}`)
            console.log(`  列号: ${match[3]}`)
            console.log(`  类型: ${match[4]}`)
            console.log(`  错误码: ${match[5]}`)
            console.log(`  消息: ${match[6]}`)
        }
    } else {
        console.log('❌ 匹配失败')
    }
})

// 手动分步测试
console.log('\n🔧 分步测试:')

const parts = [
    'src/components/Files/ImageViewer.tsx',
    '(',
    '328',
    ',',
    '1',
    ')',
    ':',
    ' ',
    'error',
    ' ',
    'TS1128',
    ':',
    ' ',
    'Declaration or statement expected.'
]

console.log('预期分解:')
parts.forEach((part, index) => {
    console.log(`  ${index}: "${part}"`)
})

const reconstructed = parts.join('')
console.log(`\n重构结果: "${reconstructed}"`)
console.log(`原始字符串: "${errorLine}"`)
console.log(`是否相同: ${reconstructed === errorLine}`)

if (reconstructed !== errorLine) {
    console.log('差异分析:')
    for (let i = 0; i < Math.max(reconstructed.length, errorLine.length); i++) {
        const r = reconstructed[i] || '(无)'
        const o = errorLine[i] || '(无)'
        if (r !== o) {
            console.log(`  位置${i}: 重构="${r}"(${r.charCodeAt(0)}) vs 原始="${o}"(${o.charCodeAt(0)})`)
        }
    }
}

// 测试最可能工作的模式
console.log('\n🎯 推荐模式测试:')

const recommendedRegex = /(.+?)\((\d+),(\d+)\):\s+(error|warning)\s+(TS\d+):\s+(.+)/
console.log(`推荐模式: ${recommendedRegex}`)

const finalMatch = errorLine.match(recommendedRegex)
console.log(`最终测试: ${finalMatch ? '✅ 成功' : '❌ 失败'}`)

if (finalMatch) {
    console.log('🎉 成功! 这个模式应该可以工作')
    console.log('建议在代码中使用这个正则表达式')
} else {
    console.log('😞 仍然失败，需要进一步调试')
}

console.log('\n🏁 测试完成')
