const fs = require('fs')
const path = require('path')

// 解析命令行参数
function parseArgs() {
    const args = process.argv.slice(2)
    if (args.length === 0) {
        console.log('使用方法:')
        console.log('  处理单个文件: node update.js --git GitHooksDetail.tsx')
        console.log('  处理整个分类: node update.js --git')
        console.log('  处理多个目标: node update.js --git GitHooksDetail.tsx --react ComponentDetail.tsx')
        process.exit(1)
    }

    const targets = []
    let i = 0

    while (i < args.length) {
        const arg = args[i]

        if (!arg.startsWith('--')) {
            console.log(`错误: 参数必须以 -- 开头: ${arg}`)
            process.exit(1)
        }

        const category = arg.substring(2) // 移除 --
        if (!category) {
            console.log('错误: 分类名不能为空')
            process.exit(1)
        }

        // 检查下一个参数是否是文件名（不以--开头）
        let fileName = null
        if (i + 1 < args.length && !args[i + 1].startsWith('--')) {
            fileName = args[i + 1]
            i += 2 // 跳过分类和文件名
        } else {
            i += 1 // 只有分类
        }

        targets.push({
            category: category,
            fileName: fileName
        })
    }

    return targets
}

// 检查文件是否包含 <pre> 标签
function hasPreTags(filePath) {
    if (!fs.existsSync(filePath)) {
        return false
    }
    const content = fs.readFileSync(filePath, 'utf8')
    return content.includes('<pre>')
}

// 查找文件的多种路径
function findFileInPaths(baseDir, category, fileName) {
    const possiblePaths = [
        // 直接在 pages 目录下
        path.join(baseDir, fileName),
        // 在分类子目录下
        path.join(baseDir, category, fileName),
        // 在分类子目录下（小写）
        path.join(baseDir, category.toLowerCase(), fileName),
        // 在分类子目录下（首字母大写）
        path.join(baseDir, category.charAt(0).toUpperCase() + category.slice(1).toLowerCase(), fileName)
    ]

    console.log(`🔍 查找文件的可能路径:`)
    for (const filePath of possiblePaths) {
        console.log(`   - ${filePath}`)
        if (fs.existsSync(filePath)) {
            console.log(`   ✅ 找到文件: ${filePath}`)
            return filePath
        }
    }

    console.log(`   ❌ 所有路径都不存在`)
    return null
}

// 查找分类目录下的所有文件
function findFilesInCategory(baseDir, category) {
    const possibleDirs = [
        path.join(baseDir, category),
        path.join(baseDir, category.toLowerCase()),
        path.join(baseDir, category.charAt(0).toUpperCase() + category.slice(1).toLowerCase())
    ]

    console.log(`🔍 查找分类目录:`)
    for (const dir of possibleDirs) {
        console.log(`   - ${dir}`)
        if (fs.existsSync(dir) && fs.statSync(dir).isDirectory()) {
            console.log(`   ✅ 找到目录: ${dir}`)
            try {
                const files = fs.readdirSync(dir).filter(file => file.endsWith('.tsx'))
                console.log(`   📁 目录中的 .tsx 文件: ${files.join(', ')}`)
                return { dir, files }
            } catch (error) {
                console.log(`   ❌ 读取目录失败: ${error.message}`)
            }
        }
    }

    console.log(`   ❌ 没有找到分类目录`)
    return null
}

// 获取所有需要处理的文件
function getTargetFiles(targets, baseDir) {
    const allFiles = []

    targets.forEach(target => {
        const { category, fileName } = target

        console.log(`\n🎯 处理目标: 分类=${category}, 文件=${fileName || '全部'}`)

        if (fileName) {
            // 处理单个文件
            const foundPath = findFileInPaths(baseDir, category, fileName)

            if (foundPath) {
                if (hasPreTags(foundPath)) {
                    allFiles.push({
                        filePath: foundPath,
                        fileName: fileName,
                        category: category
                    })
                    console.log(`✅ 文件已添加到处理队列`)
                } else {
                    console.log(`⚠️  文件 ${fileName} 不包含 <pre> 标签，跳过处理`)
                }
            } else {
                // 尝试模糊匹配
                console.log(`🔍 尝试模糊匹配文件名...`)
                const categoryResult = findFilesInCategory(baseDir, category)
                if (categoryResult) {
                    const { dir, files } = categoryResult
                    const matchedFiles = files.filter(file =>
                        file.toLowerCase().includes(fileName.toLowerCase().replace('.tsx', ''))
                    )

                    if (matchedFiles.length > 0) {
                        console.log(`💡 找到匹配的文件: ${matchedFiles.join(', ')}`)
                        matchedFiles.forEach(file => {
                            const filePath = path.join(dir, file)
                            if (hasPreTags(filePath)) {
                                allFiles.push({
                                    filePath: filePath,
                                    fileName: file,
                                    category: category
                                })
                                console.log(`🔄 自动添加文件: ${file}`)
                            }
                        })
                    }
                }
            }
        } else {
            // 处理整个分类
            console.log(`🔍 查找分类 "${category}" 的所有文件...`)

            const categoryResult = findFilesInCategory(baseDir, category)
            if (categoryResult) {
                const { dir, files } = categoryResult

                if (files.length > 0) {
                    console.log(`📁 找到 ${files.length} 个 .tsx 文件`)

                    files.forEach(file => {
                        const filePath = path.join(dir, file)
                        if (hasPreTags(filePath)) {
                            allFiles.push({
                                filePath: filePath,
                                fileName: file,
                                category: category
                            })
                            console.log(`✅ 添加文件: ${file}`)
                        } else {
                            console.log(`⚠️  文件 ${file} 不包含 <pre> 标签，跳过处理`)
                        }
                    })
                } else {
                    console.log(`❌ 分类目录中没有 .tsx 文件`)
                }
            }
        }
    })

    return allFiles
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
function generateCodeBlockKey(code, index, fileName = '') {
    const lines = code.split('\n').filter(line => line.trim())

    // 尝试从注释中提取标题
    for (const line of lines.slice(0, 3)) {
        const commentMatch = line.match(/^#\s*(.+)/) || line.match(/^\/\/\s*(.+)/) || line.match(/^<!--\s*(.+)\s*-->/)
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
        !line.startsWith('<!--') &&
        line.trim().length > 0
    )

    if (firstMeaningfulLine) {
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

    const baseFileName = fileName.replace(/Detail|Component|Page/gi, '').replace(/[^a-zA-Z0-9]/g, '')
    return baseFileName ? `${baseFileName.toLowerCase()}Code${index + 1}` : `codeBlock${index + 1}`
}

// 确定编程语言
function detectLanguage(code) {
    const lowerCode = code.toLowerCase()

    if (code.includes('on:') || code.includes('jobs:') || code.includes('steps:') ||
        code.includes('name:') || code.includes('uses:') || code.includes('with:')) {
        return 'yaml'
    }

    if (code.includes('FROM ') || code.includes('RUN ') || code.includes('COPY ') ||
        code.includes('WORKDIR ') || code.includes('EXPOSE ')) {
        return 'dockerfile'
    }

    if (code.includes('#!/bin/bash') || code.includes('#!/bin/sh') ||
        code.includes('npm ') || code.includes('yarn ') || code.includes('git ') ||
        code.includes('cd ') || code.includes('echo ') || code.includes('export ')) {
        return 'bash'
    }

    if (code.includes('interface ') || code.includes('type ') || code.includes(': string') ||
        code.includes(': number') || code.includes('extends ') || code.includes('<T>')) {
        return 'typescript'
    }

    if (code.includes('import React') || code.includes('const ') || code.includes('function ') ||
        code.includes('useState') || code.includes('useEffect') || code.includes('export ')) {
        return 'javascript'
    }

    if (code.includes('{') && code.includes('}') &&
        (code.includes(':') && (code.includes('px') || code.includes('rem') || code.includes('color')))) {
        return 'css'
    }

    if ((code.startsWith('{') && code.endsWith('}')) ||
        (code.startsWith('[') && code.endsWith(']'))) {
        try {
            JSON.parse(code)
            return 'json'
        } catch (e) {}
    }

    if (code.includes('<') && code.includes('>') &&
        (code.includes('</') || code.includes('/>'))) {
        return 'xml'
    }

    return 'text'
}

// 确定 JSON 文件保存路径
function getJsonOutputPath(fileName, category, baseDir) {
    const baseName = path.basename(fileName, '.tsx').toLowerCase()
    // 输出到 Technology/codeJson/Git/ 目录
    const outputDir = path.join(path.dirname(baseDir), 'codeJson', category.charAt(0).toUpperCase() + category.slice(1))
    const outputPath = path.join(outputDir, `${baseName}.json`)

    return { outputDir, outputPath }
}

// 处理单个文件
function processFile(fileInfo, baseDir) {
    const { filePath, fileName, category } = fileInfo

    console.log(`\n📄 处理文件: ${fileName} (分类: ${category})`)
    console.log(`   📁 文件路径: ${filePath}`)

    try {
        const content = fs.readFileSync(filePath, 'utf8')
        const codeBlocks = extractCodeBlocks(content)

        if (codeBlocks.length === 0) {
            console.log('  ⚠️  没有找到代码块')
            return { success: false, reason: 'no_code_blocks' }
        }

        console.log(`  ✅ 找到 ${codeBlocks.length} 个代码块`)

        const jsonData = {}
        const baseFileName = path.basename(fileName, '.tsx')

        codeBlocks.forEach((block, index) => {
            const key = generateCodeBlockKey(block.code, index, baseFileName)
            const language = detectLanguage(block.code)

            jsonData[key] = {
                title: key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1').trim(),
                language: language,
                code: block.code
            }

            console.log(`    📝 ${key}: ${language} (${block.code.split('\n').length} 行)`)
        })

        const { outputDir, outputPath } = getJsonOutputPath(fileName, category, baseDir)

        if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir, { recursive: true })
            console.log(`  📁 创建目录: ${outputDir}`)
        }

        fs.writeFileSync(outputPath, JSON.stringify(jsonData, null, 2), 'utf8')
        console.log(`  💾 生成文件: ${outputPath}`)

        return {
            success: true,
            codeBlockCount: codeBlocks.length,
            outputPath: outputPath
        }

    } catch (error) {
        console.error(`  ❌ 处理文件失败: ${error.message}`)
        return { success: false, reason: 'processing_error', error: error.message }
    }
}

// 主函数
function main() {
    console.log('🚀 代码高亮迁移工具启动\n')

    const targets = parseArgs()
    console.log('📋 解析的目标:', targets)

    const baseDir = path.join(__dirname, '../frontend/src/views/Technology/pages')
    console.log(`📁 基础目录: ${baseDir}`)

    if (!fs.existsSync(baseDir)) {
        console.error(`❌ 基础目录不存在: ${baseDir}`)
        console.log('请确认目录结构是否正确')
        process.exit(1)
    }

    const targetFiles = getTargetFiles(targets, baseDir)

    if (targetFiles.length === 0) {
        console.log('\n⚠️  没有找到需要处理的文件')
        console.log('\n💡 建议检查:')
        console.log('1. 文件名是否正确（注意大小写）')
        console.log('2. 文件是否在正确的分类目录下')
        console.log('3. 命令格式是否正确: node update.js --git GitHooksDetail.tsx')
        return
    }

    console.log(`\n📊 找到 ${targetFiles.length} 个待处理文件`)

    const stats = {
        total: targetFiles.length,
        success: 0,
        failed: 0,
        noCodeBlocks: 0,
        totalCodeBlocks: 0
    }

    targetFiles.forEach(fileInfo => {
        const result = processFile(fileInfo, baseDir)

        if (result.success) {
            stats.success++
            stats.totalCodeBlocks += result.codeBlockCount
        } else {
            stats.failed++
            if (result.reason === 'no_code_blocks') {
                stats.noCodeBlocks++
            }
        }
    })

    console.log('\n📈 处理完成统计:')
    console.log(`  总文件数: ${stats.total}`)
    console.log(`  成功处理: ${stats.success}`)
    console.log(`  处理失败: ${stats.failed}`)
    console.log(`  无代码块: ${stats.noCodeBlocks}`)
    console.log(`  总代码块: ${stats.totalCodeBlocks}`)

    if (stats.success > 0) {
        console.log('\n🎉 迁移完成！')
    }
}

if (require.main === module) {
    main()
}
