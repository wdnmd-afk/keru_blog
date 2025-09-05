#!/usr/bin/env node

// 内联正则表达式测试 - 不依赖复杂的终端输出
const errorLine = 'src/components/Files/ImageViewer.tsx(328,1): error TS1128: Declaration or statement expected.'

console.log('测试错误行:', errorLine)
console.log('长度:', errorLine.length)

// 测试各种正则表达式
const patterns = [
    /^(.+?)\((\d+),(\d+)\):\s+(error|warning)\s+(TS\d+):\s+(.+)$/,
    /(.+?)\((\d+),(\d+)\):\s+(error|warning)\s+(TS\d+):\s+(.+)$/,
    /^(.+?)\((\d+),(\d+)\):\s+(error|warning)\s+(TS\d+):\s+(.+)/,
    /(.+?)\((\d+),(\d+)\):\s+(error|warning)\s+(TS\d+):\s+(.+)/,
    /(.+?)\((\d+),(\d+)\):\s*(error|warning)\s*(TS\d+):\s*(.+)/,
    /(.+)\((\d+),(\d+)\):\s+(error|warning)\s+(TS\d+):\s+(.+)/
]

console.log('\n正则表达式测试结果:')

patterns.forEach((pattern, index) => {
    const match = errorLine.match(pattern)
    console.log(`模式${index + 1}: ${pattern}`)
    console.log(`结果: ${match ? '✅ 成功' : '❌ 失败'}`)
    
    if (match) {
        console.log('分组:')
        console.log(`  文件: ${match[1]}`)
        console.log(`  行号: ${match[2]}`)
        console.log(`  列号: ${match[3]}`)
        console.log(`  类型: ${match[4]}`)
        console.log(`  错误码: ${match[5]}`)
        console.log(`  消息: ${match[6]}`)
        console.log('这个模式可以使用!')
    }
    console.log('')
})

// 找到第一个工作的模式
const workingPattern = patterns.find(pattern => errorLine.match(pattern))
if (workingPattern) {
    console.log('推荐使用的模式:', workingPattern)
} else {
    console.log('没有找到工作的模式')
}
