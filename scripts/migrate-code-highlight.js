const fs = require('fs')
const path = require('path')

// 解析命令行参数
function parseArgs() {
    const args = process.argv.slice(2)
    if (args.length === 0) {
        console.log('使用方法: node migrate-code-highlight.js --<category>/<filename>.tsx')
        console.log('示例: node migrate-code-highlight.js --Git/GitHubWorkflowDetail.tsx')
        process.exit(1)
    }
    
    const targetArg = args[0]
    if (!targetArg.startsWith('--')) {
        console.log('错误: 参数必须以 -- 开头')
        process.exit(1)
    }
    
    const filePath = targetArg.substring(2) // 移除 --
    const [category, filename] = filePath.split('/')
    
    if (!category || !filename) {
        console.log('错误: 参数格式应为 --<category>/<filename>.tsx')
        process.exit(1)
    }
    
    return { category, filename }
}

// 检查文件是否包含 <pre> 标签
function hasPreTags(filePath) {
    if (!fs.existsSync(filePath)) {
        return false
    }
    const content = fs.readFileSync(filePath, 'utf8')
    return content.includes('<pre>')
}

// 提取代码块
function extractCodeBlocks(content) {
    const codeBlocks = []
    const preRegex = /<pre>\s*\{`([^`]+)`\}\s*<\/pre>/gs
    let match
    
    while ((match = preRegex.exec(content)) !== null) {
        codeBlocks.push({
            fullMatch: match[0],
            code: match[1].trim(),
            startIndex: match.index,
            endIndex: match.index + match[0].length
        })
    }
    
    return codeBlocks
}

// 生成代码块键名
function generateCodeBlockKey(code, index, context = '') {
    // 从代码中提取关键词作为键名
    const lines = code.split('\n').filter(line => line.trim())
    
    // 尝试从注释中提取标题
    for (const line of lines.slice(0, 3)) {
        const commentMatch = line.match(/^#\s*(.+)/) || line.match(/^\/\/\s*(.+)/)
        if (commentMatch) {
            const title = commentMatch[1].trim()
            if (title && !title.includes('=') && title.length < 50) {
                return title
                    .toLowerCase()
                    .replace(/[^a-zA-Z0-9\s]/g, '')
                    .split(/\s+/)
                    .map((word, i) => i === 0 ? word : word.charAt(0).toUpperCase() + word.slice(1))
                    .join('')
                    .substring(0, 30) || `codeBlock${index + 1}`
            }
        }
    }
    
    // 尝试从代码内容中提取关键词
    const firstMeaningfulLine = lines.find(line => 
        !line.startsWith('#') && 
        !line.startsWith('//') && 
        line.trim().length > 0
    )
    
    if (firstMeaningfulLine) {
        // 提取关键词
        const keywords = firstMeaningfulLine
            .replace(/[{}()[\]"'`]/g, ' ')
            .split(/\s+/)
            .filter(word => word.length > 2 && /^[a-zA-Z]/.test(word))
            .slice(0, 3)
        
        if (keywords.length > 0) {
            return keywords
                .map((word, i) => i === 0 ? word.toLowerCase() : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
                .join('')
                .substring(0, 30) || `codeBlock${index + 1}`
        }
    }
    
    return `codeBlock${index + 1}`
}

// 确定编程语言
function detectLanguage(code) {
    const lowerCode = code.toLowerCase()
    
    // YAML 检测
    if (code.includes('on:') || code.includes('jobs:') || code.includes('steps:') || 
        code.includes('name:') || code.includes('uses:') || code.includes('with:')) {
        return 'yaml'
    }
    
    // Bash/Shell 检测
    if (code.includes('#!/bin/bash') || code.includes('npm ') || code.includes('git ') || 
        code.includes('cd ') || code.includes('echo ') || lowerCode.includes('run:')) {
        return 'bash'
    }
    
    // TypeScript 检测
    if (code.includes('interface ') || code.includes('type ') || code.includes(': string') || 
        code.includes(': number') || code.includes('extends ') || code.includes('<T>')) {
        return 'typescript'
    }
    
    // JavaScript/JSX 检测
    if (code.includes('import React') || code.includes('const ') || code.includes('function ') ||
        code.includes('useState') || code.includes('useEffect')) {
        return 'javascript'
    }
    
    // SQL 检测
    if (lowerCode.includes('select ') || lowerCode.includes('insert ') || 
        lowerCode.includes('update ') || lowerCode.includes('create table')) {
        return 'sql'
    }
    
    // JSON 检测
    if ((code.startsWith('{') && code.endsWith('}')) || 
        (code.startsWith('[') && code.endsWith(']'))) {
        try {
            JSON.parse(code)
            return 'json'
        } catch (e) {
            // 不是有效的JSON
        }
    }
    
    // Markdown 检测
    if (code.includes('## ') || code.includes('### ') || code.includes('- [ ]') || 
        code.includes('```')) {
        return 'markdown'
    }
    
    return 'text' // 默认
}

// 主函数
function main() {
    // 只处理 GitHubActionsDetail.tsx 文件
    const targetFile = path.join(__dirname, '../frontEnd/src/views/Technology/pages/git/GitHubActionsDetail.tsx')
    
    if (!fs.existsSync(targetFile)) {
        console.log('目标文件不存在:', targetFile)
        return
    }
    
    const files = [targetFile]
    
    console.log(`处理文件: ${targetFile}`)
    
    // 处理文件
    files.forEach(filePath => {
        console.log(`\n处理文件: ${filePath}`)
        const content = fs.readFileSync(filePath, 'utf8')
        const codeBlocks = extractCodeBlocks(content)
        
        if (codeBlocks.length === 0) {
            console.log('  没有找到代码块')
            return
        }
        
        console.log(`  找到 ${codeBlocks.length} 个代码块`)
        
        // 生成 JSON 数据
        const jsonData = {}
        codeBlocks.forEach((block, index) => {
            const key = generateCodeBlockKey(block.code, index)
            const language = detectLanguage(block.code)
            
            jsonData[key] = {
                title: key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1').trim(),
                language: language,
                code: block.code
            }
        })
        
        // 确定 JSON 文件路径
        const fileName = path.basename(filePath, '.tsx')
        
        // 对于 git 目录下的文件
        const jsonDir = path.join(__dirname, '../frontEnd/src/views/Technology/codeJson/Git')
        const jsonPath = path.join(jsonDir, `${fileName.toLowerCase()}.json`)
        
        // 创建目录（如果不存在）
        if (!fs.existsSync(jsonDir)) {
            fs.mkdirSync(jsonDir, { recursive: true })
        }
        
        // 写入 JSON 文件
        fs.writeFileSync(jsonPath, JSON.stringify(jsonData, null, 2), 'utf8')
        console.log(`  创建 JSON 文件: ${jsonPath}`)
        
        // 显示将要替换的内容预览
        console.log('  代码块预览:')
        Object.keys(jsonData).forEach(key => {
            console.log(`    ${key}: ${jsonData[key].language}`)
        })
    })
}

if (require.main === module) {
    main()
}

module.exports = { findFilesWithPreTags, extractCodeBlocks, generateCodeBlockKey, detectLanguage }