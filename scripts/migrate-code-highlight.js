#!/usr/bin/env node

/**
 * 自动化脚本：将 pre 标签替换为 CodeHighlight 组件
 *
 * 使用方法：
 * node scripts/migrate-code-highlight.js --nodejs                    # 处理整个 nodejs 目录
 * node scripts/migrate-code-highlight.js --nodejs/ExpressDetail.tsx # 处理特定文件
 * node scripts/migrate-code-highlight.js --git                      # 处理整个 git 目录
 *
 * 功能：
 * 1. 自动检测 pre 标签并替换为 CodeHighlight 组件
 * 2. 智能创建或更新 JSON 数据文件
 * 3. 自动添加必要的导入语句
 * 4. 保持代码格式和缩进
 */

const fs = require('fs')
const path = require('path')

// 配置
const CONFIG = {
  baseDir: 'frontEnd/src/views/Technology/pages',
  jsonDir: 'frontEnd/src/views/Technology/codeJson',
  backupDir: 'scripts/backups'
}

// 语言映射
const LANGUAGE_MAP = {
  'javascript': 'javascript',
  'typescript': 'typescript',
  'bash': 'bash',
  'shell': 'bash',
  'json': 'json',
  'yaml': 'yaml',
  'yml': 'yaml',
  'html': 'html',
  'css': 'css',
  'sql': 'sql',
  'python': 'python',
  'java': 'java',
  'go': 'go',
  'rust': 'rust',
  'php': 'php',
  'ruby': 'ruby',
  'text': 'text',
  'plaintext': 'text'
}

class CodeHighlightMigrator {
  constructor() {
    this.processedFiles = []
    this.createdJsonFiles = []
    this.errors = []
  }

  /**
   * 主入口函数
   */
  async migrate(target) {
    console.log('🚀 开始代码高亮迁移...')
    console.log(`📁 目标: ${target}`)

    try {
      // 创建备份目录
      this.ensureDir(CONFIG.backupDir)

      // 解析目标
      const { directory, fileName } = this.parseTarget(target)

      if (fileName) {
        // 处理单个文件
        await this.processFile(directory, fileName)
      } else {
        // 处理整个目录
        await this.processDirectory(directory)
      }

      this.printSummary()

    } catch (error) {
      console.error('❌ 迁移失败:', error.message)
      process.exit(1)
    }
  }

  /**
   * 解析命令行参数
   */
  parseTarget(target) {
    if (!target) {
      throw new Error('请指定目标目录或文件，例如: --nodejs 或 --nodejs/ExpressDetail.tsx')
    }

    const cleanTarget = target.replace(/^--/, '')
    const parts = cleanTarget.split('/')

    if (parts.length === 1) {
      // 整个目录
      return { directory: parts[0], fileName: null }
    } else if (parts.length === 2) {
      // 特定文件
      return { directory: parts[0], fileName: parts[1] }
    } else {
      throw new Error('无效的目标格式')
    }
  }

  /**
   * 处理整个目录
   */
  async processDirectory(directory) {
    const dirPath = path.join(CONFIG.baseDir, directory)

    if (!fs.existsSync(dirPath)) {
      throw new Error(`目录不存在: ${dirPath}`)
    }

    const files = fs.readdirSync(dirPath)
      .filter(file => file.endsWith('.tsx') && file.includes('Detail'))

    console.log(`📂 发现 ${files.length} 个文件需要处理`)

    for (const file of files) {
      await this.processFile(directory, file)
    }
  }

  /**
   * 处理单个文件
   */
  async processFile(directory, fileName) {
    const filePath = path.join(CONFIG.baseDir, directory, fileName)

    if (!fs.existsSync(filePath)) {
      console.error(`❌ 文件不存在: ${filePath}`)
      return
    }

    console.log(`\n🔄 处理文件: ${fileName}`)

    try {
      // 读取文件内容
      const content = fs.readFileSync(filePath, 'utf8')

      // 创建备份
      this.createBackup(filePath, content)

      // 检查是否需要处理
      if (!this.needsProcessing(content)) {
        console.log(`✅ ${fileName} 已经使用 CodeHighlight，跳过`)
        return
      }

      // 提取代码块
      const codeBlocks = this.extractCodeBlocks(content)

      if (codeBlocks.length === 0) {
        console.log(`ℹ️  ${fileName} 没有发现 pre 标签`)
        return
      }

      console.log(`📝 发现 ${codeBlocks.length} 个代码块`)

      // 创建或更新 JSON 文件
      const jsonData = await this.createOrUpdateJsonFile(directory, fileName, codeBlocks)

      // 替换文件内容
      const newContent = this.replacePreTags(content, codeBlocks, jsonData, directory, fileName)

      // 写入文件
      fs.writeFileSync(filePath, newContent, 'utf8')

      this.processedFiles.push(fileName)
      console.log(`✅ ${fileName} 处理完成`)

    } catch (error) {
      console.error(`❌ 处理 ${fileName} 时出错:`, error.message)
      this.errors.push({ file: fileName, error: error.message })
    }
  }

  /**
   * 检查文件是否需要处理
   */
  needsProcessing(content) {
    // 检查是否已经导入了 CodeHighlight
    const hasCodeHighlightImport = content.includes('import CodeHighlight')
    const hasUseCodeDataImport = content.includes('import { useCodeData }')
    const hasPreTags = /<pre[^>]*>/g.test(content)

    // 如果已经有导入但还有 pre 标签，说明迁移未完成
    if (hasCodeHighlightImport && hasUseCodeDataImport && !hasPreTags) {
      return false // 已经完全迁移
    }

    return hasPreTags // 有 pre 标签就需要处理
  }

  /**
   * 提取代码块
   */
  extractCodeBlocks(content) {
    const codeBlocks = []
    const preRegex = /<pre[^>]*>([\\s\\S]*?)<\\/pre>/g
    let match
    let index = 0

    while ((match = preRegex.exec(content)) !== null) {
      const fullMatch = match[0]
      const codeContent = match[1]

      // 清理代码内容
      const cleanCode = this.cleanCodeContent(codeContent)

      // 尝试检测语言
      const language = this.detectLanguage(cleanCode)

      // 生成标题
      const title = this.generateTitle(cleanCode, index)

      // 生成键名
      const key = this.generateKey(title, index)

      codeBlocks.push({
        index,
        fullMatch,
        code: cleanCode,
        language,
        title,
        key,
        startPos: match.index,
        endPos: match.index + fullMatch.length
      })

      index++
    }

    return codeBlocks
  }

  /**
   * 清理代码内容
   */
  cleanCodeContent(content) {
    // 移除模板字符串的包装
    let cleaned = content.replace(/^{`/, '').replace(/`}$/, '')

    // 移除多余的转义字符
    cleaned = cleaned.replace(/\\\\n/g, '\\n')
    cleaned = cleaned.replace(/\\\\t/g, '\\t')
    cleaned = cleaned.replace(/\\\\'/g, \"'\")
    cleaned = cleaned.replace(/\\\\"/g, '\"')

    // 移除首尾空白行
    cleaned = cleaned.replace(/^\\s*\\n/, '').replace(/\\n\\s*$/, '')

    // 处理特殊字符
    cleaned = cleaned.replace(/\\$\\{/g, '${')
    cleaned = cleaned.replace(/\\\\\\$/g, '$')

    return cleaned.trim()
  }

  /**
   * 检测编程语言
   */
  detectLanguage(code) {
    // 基于代码内容检测语言
    if (code.includes('npm install') || code.includes('#!/bin/bash')) {
      return 'bash'
    }
    if (code.includes('const ') || code.includes('function ') || code.includes('import ')) {
      return 'javascript'
    }
    if (code.includes('interface ') || code.includes('type ')) {
      return 'typescript'
    }
    if (code.includes('SELECT ') || code.includes('INSERT ') || code.includes('UPDATE ')) {
      return 'sql'
    }
    if (code.includes('apiVersion:') || code.includes('kind:')) {
      return 'yaml'
    }
    if (code.includes('{') && code.includes('}') && code.includes(':')) {
      return 'json'
    }
    if (code.includes('<') && code.includes('>')) {
      return 'html'
    }

    return 'text' // 默认
  }

  /**
   * 生成标题
   */
  generateTitle(code, index) {
    // 尝试从注释中提取标题
    const commentMatch = code.match(/^\\/\\/\\s*(.+)$/m)
    if (commentMatch) {
      return commentMatch[1].trim()
    }

    // 尝试从代码内容推断
    if (code.includes('npm install')) {
      return '安装依赖'
    }
    if (code.includes('const ') && code.includes('require(')) {
      return '基本使用'
    }
    if (code.includes('async function') || code.includes('await ')) {
      return '异步操作'
    }
    if (code.includes('class ')) {
      return '类定义'
    }
    if (code.includes('interface ') || code.includes('type ')) {
      return '类型定义'
    }

    return `代码示例 ${index + 1}`
  }

  /**
   * 生成键名
   */
  generateKey(title, index) {
    // 将中文标题转换为英文键名
    const keyMap = {
      '安装依赖': 'installation',
      '基本使用': 'basicUsage',
      '异步操作': 'asyncOperation',
      '类定义': 'classDefinition',
      '类型定义': 'typeDefinition',
      '配置': 'configuration',
      '示例': 'example',
      '高级用法': 'advancedUsage'
    }

    const key = keyMap[title] || `codeBlock${index + 1}`
    return key
  }

  /**
   * 创建备份
   */
  createBackup(filePath, content) {
    const fileName = path.basename(filePath)
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-')
    const backupPath = path.join(CONFIG.backupDir, `${fileName}.${timestamp}.backup`)

    fs.writeFileSync(backupPath, content, 'utf8')
  }

  /**
   * 创建或更新 JSON 文件
   */
  async createOrUpdateJsonFile(directory, fileName, codeBlocks) {
    const jsonFileName = this.getJsonFileName(fileName)
    const jsonPath = path.join(CONFIG.jsonDir, this.capitalizeFirst(directory), jsonFileName)

    // 确保目录存在
    this.ensureDir(path.dirname(jsonPath))

    let jsonData = {}

    // 如果文件存在，读取现有数据
    if (fs.existsSync(jsonPath)) {
      try {
        const existingContent = fs.readFileSync(jsonPath, 'utf8')
        jsonData = JSON.parse(existingContent)
        console.log(`📖 读取现有 JSON 文件: ${jsonFileName}`)
      } catch (error) {
        console.warn(`⚠️  读取 JSON 文件失败，将创建新文件: ${error.message}`)
      }
    }

    // 添加新的代码块
    let addedCount = 0
    for (const block of codeBlocks) {
      if (!jsonData[block.key]) {
        jsonData[block.key] = {
          title: block.title,
          language: block.language,
          code: block.code
        }
        addedCount++
      }
    }

    // 写入 JSON 文件
    const jsonContent = JSON.stringify(jsonData, null, 2)
    fs.writeFileSync(jsonPath, jsonContent, 'utf8')

    if (addedCount > 0) {
      console.log(`📝 添加 ${addedCount} 个新代码块到 ${jsonFileName}`)
      this.createdJsonFiles.push(jsonFileName)
    }

    return jsonData
  }

  /**
   * 获取 JSON 文件名
   */
  getJsonFileName(tsxFileName) {
    // ExpressDetail.tsx -> express.json
    // DatabaseDetail.tsx -> database.json
    const baseName = tsxFileName.replace('Detail.tsx', '').toLowerCase()
    return `${baseName}.json`
  }

  /**
   * 首字母大写
   */
  capitalizeFirst(str) {
    return str.charAt(0).toUpperCase() + str.slice(1)
  }

  /**
   * 替换 pre 标签为 CodeHighlight 组件
   */
  replacePreTags(content, codeBlocks, jsonData, directory, fileName) {
    let newContent = content

    // 确保有必要的导入
    newContent = this.ensureImports(newContent)

    // 确保有 useCodeData 调用
    newContent = this.ensureUseCodeData(newContent, directory, fileName)

    // 从后往前替换，避免位置偏移
    const sortedBlocks = [...codeBlocks].sort((a, b) => b.startPos - a.startPos)

    for (const block of sortedBlocks) {
      const replacement = this.generateCodeHighlightComponent(block.key)
      newContent = newContent.substring(0, block.startPos) +
                   replacement +
                   newContent.substring(block.endPos)
    }

    return newContent
  }

  /**
   * 确保必要的导入存在
   */
  ensureImports(content) {
    let newContent = content

    // 检查 CodeHighlight 导入
    if (!content.includes('import CodeHighlight')) {
      const importMatch = content.match(/(import.*from.*@ant-design\/icons.*\n)/s)
      if (importMatch) {
        const insertPos = importMatch.index + importMatch[0].length
        newContent = newContent.substring(0, insertPos) +
                     'import CodeHighlight from \'@/components/CodeHighlight\'\n' +
                     newContent.substring(insertPos)
      }
    }

    // 检查 useCodeData 导入
    if (!newContent.includes('import { useCodeData }')) {
      const codeHighlightImport = newContent.indexOf('import CodeHighlight')
      if (codeHighlightImport !== -1) {
        const insertPos = newContent.indexOf('\n', codeHighlightImport) + 1
        newContent = newContent.substring(0, insertPos) +
                     'import { useCodeData } from \'@/hooks/useCodeData\'\n' +
                     newContent.substring(insertPos)
      }
    }

    return newContent
  }

  /**
   * 确保 useCodeData 调用存在
   */
  ensureUseCodeData(content, directory, fileName) {
    // 如果已经有 useCodeData 调用，直接返回
    if (content.includes('useCodeData(')) {
      return content
    }

    // 查找组件函数定义
    const componentMatch = content.match(/(const \w+: React\.FC = \(\) => \{[\s\S]*?const navigate = useNavigate\(\))/s)
    if (componentMatch) {
      const jsonFileName = this.getJsonFileName(fileName).replace('.json', '')

      const useCodeDataCall = `\n    const { codeData, loading, error } = useCodeData('${this.capitalizeFirst(directory)}', '${jsonFileName}')\n`
      const loadingCheck = `\n    const handleBack = () => {\n        navigate('/technology/${directory.toLowerCase()}')\n    }\n\n    if (loading) {\n        return <div className={styles.loading}>加载中...</div>\n    }\n\n    if (error) {\n        return <div className={styles.error}>加载失败: {error}</div>\n    }`

      const insertPos = componentMatch.index + componentMatch[0].length
      return content.substring(0, insertPos) +
             useCodeDataCall +
             loadingCheck +
             content.substring(insertPos).replace(/const handleBack[\s\S]*?\}/, '')
    }

    return content
  }

  /**
   * 从内容中提取目录名
   */
  extractDirectoryFromContent(content) {
    const navigateMatch = content.match(/navigate\('\/technology\/(\w+)'\)/)
    if (navigateMatch) {
      return this.capitalizeFirst(navigateMatch[1])
    }
    return 'Unknown'
  }

  /**
   * 从内容中提取 JSON 文件名
   */
  extractJsonFileNameFromContent(content) {
    // 从文件路径或其他线索推断
    return 'unknown'
  }

  /**
   * 生成 CodeHighlight 组件
   */
  generateCodeHighlightComponent(key) {
    return `{codeData.${key} && (
                            <CodeHighlight
                                code={codeData.${key}.code}
                                language={codeData.${key}.language}
                                title={codeData.${key}.title}
                            />
                        )}`
  }

  /**
   * 确保目录存在
   */
  ensureDir(dirPath) {
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true })
    }
  }

  /**
   * 打印总结
   */
  printSummary() {
    console.log('\\n📊 迁移总结:')
    console.log(`✅ 处理文件: ${this.processedFiles.length}`)
    console.log(`📄 创建JSON: ${this.createdJsonFiles.length}`)
    console.log(`❌ 错误: ${this.errors.length}`)

    if (this.errors.length > 0) {
      console.log('\\n❌ 错误详情:')
      this.errors.forEach(({ file, error }) => {
        console.log(`  ${file}: ${error}`)
      })
    }

    console.log('\\n🎉 迁移完成!')
  }
}

// 主程序
async function main() {
  const args = process.argv.slice(2)

  if (args.length === 0) {
    console.log(`
使用方法:
  node scripts/migrate-code-highlight.js --nodejs                    # 处理整个 nodejs 目录
  node scripts/migrate-code-highlight.js --nodejs/ExpressDetail.tsx # 处理特定文件
  node scripts/migrate-code-highlight.js --git                      # 处理整个 git 目录
    `)
    process.exit(1)
  }

  const migrator = new CodeHighlightMigrator()
  await migrator.migrate(args[0])
}

// 运行主程序
if (require.main === module) {
  main().catch(console.error)
}

module.exports = CodeHighlightMigrator
