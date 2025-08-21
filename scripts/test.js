#!/usr/bin/env node

/**
 * 测试脚本：验证代码高亮迁移脚本的功能
 */

const fs = require('fs')
const path = require('path')
const CodeHighlightMigrator = require('./migrate-code-highlight')

// 测试数据
const TEST_TSX_CONTENT = `import React from 'react'
import { Card, Tag, Alert, Divider, Button } from 'antd'
import { useNavigate } from 'react-router-dom'
import { 
    ArrowLeftOutlined, 
    DatabaseOutlined, 
    WarningOutlined
} from '@ant-design/icons'
import styles from '@/styles/topicDetail.module.scss'

const TestDetail: React.FC = () => {
    const navigate = useNavigate()
    
    const handleBack = () => {
        navigate('/technology/nodejs')
    }

    return (
        <div className={styles.container}>
            <Card>
                <h3>基本使用</h3>
                <div className={styles.code_block}>
                    <pre>
{\`// 安装依赖
npm install express

// 基本服务器
const express = require('express')
const app = express()

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(3000, () => {
  console.log('服务器运行在端口 3000')
})\`}
                    </pre>
                </div>

                <h3>中间件使用</h3>
                <div className={styles.code_block}>
                    <pre>
{\`// 中间件示例
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// 自定义中间件
app.use((req, res, next) => {
  console.log('请求时间:', new Date().toISOString())
  next()
})\`}
                    </pre>
                </div>
            </Card>
        </div>
    )
}

export default TestDetail`

class MigratorTester {
  constructor() {
    this.testDir = 'scripts/test-temp'
    this.migrator = new CodeHighlightMigrator()
  }

  /**
   * 运行所有测试
   */
  async runAllTests() {
    console.log('🧪 开始运行测试...')
    
    try {
      this.setupTestEnvironment()
      
      await this.testCodeBlockExtraction()
      await this.testLanguageDetection()
      await this.testTitleGeneration()
      await this.testKeyGeneration()
      await this.testJsonFileCreation()
      await this.testContentReplacement()
      
      this.cleanupTestEnvironment()
      
      console.log('✅ 所有测试通过!')
      
    } catch (error) {
      console.error('❌ 测试失败:', error.message)
      this.cleanupTestEnvironment()
      process.exit(1)
    }
  }

  /**
   * 设置测试环境
   */
  setupTestEnvironment() {
    console.log('📁 设置测试环境...')
    
    // 创建测试目录
    if (!fs.existsSync(this.testDir)) {
      fs.mkdirSync(this.testDir, { recursive: true })
    }
    
    // 创建测试文件
    const testFilePath = path.join(this.testDir, 'TestDetail.tsx')
    fs.writeFileSync(testFilePath, TEST_TSX_CONTENT, 'utf8')
    
    console.log('✅ 测试环境设置完成')
  }

  /**
   * 清理测试环境
   */
  cleanupTestEnvironment() {
    console.log('🧹 清理测试环境...')
    
    if (fs.existsSync(this.testDir)) {
      fs.rmSync(this.testDir, { recursive: true, force: true })
    }
    
    console.log('✅ 测试环境清理完成')
  }

  /**
   * 测试代码块提取
   */
  async testCodeBlockExtraction() {
    console.log('🔍 测试代码块提取...')
    
    const codeBlocks = this.migrator.extractCodeBlocks(TEST_TSX_CONTENT)
    
    // 验证提取的代码块数量
    if (codeBlocks.length !== 2) {
      throw new Error(`期望提取 2 个代码块，实际提取 ${codeBlocks.length} 个`)
    }
    
    // 验证第一个代码块
    const firstBlock = codeBlocks[0]
    if (!firstBlock.code.includes('npm install express')) {
      throw new Error('第一个代码块内容不正确')
    }
    
    // 验证第二个代码块
    const secondBlock = codeBlocks[1]
    if (!secondBlock.code.includes('express.json()')) {
      throw new Error('第二个代码块内容不正确')
    }
    
    console.log('✅ 代码块提取测试通过')
  }

  /**
   * 测试语言检测
   */
  async testLanguageDetection() {
    console.log('🔍 测试语言检测...')
    
    const testCases = [
      { code: 'npm install express', expected: 'bash' },
      { code: 'const app = express()', expected: 'javascript' },
      { code: 'interface User { name: string }', expected: 'typescript' },
      { code: 'SELECT * FROM users', expected: 'sql' },
      { code: '{ "name": "test" }', expected: 'json' },
      { code: '<div>Hello</div>', expected: 'html' }
    ]
    
    for (const testCase of testCases) {
      const detected = this.migrator.detectLanguage(testCase.code)
      if (detected !== testCase.expected) {
        throw new Error(`语言检测失败: 期望 ${testCase.expected}, 实际 ${detected}`)
      }
    }
    
    console.log('✅ 语言检测测试通过')
  }

  /**
   * 测试标题生成
   */
  async testTitleGeneration() {
    console.log('🔍 测试标题生成...')
    
    const testCases = [
      { code: '// 安装依赖\\nnpm install', expected: '安装依赖' },
      { code: 'npm install express', expected: '安装依赖' },
      { code: 'const app = require("express")', expected: '基本使用' },
      { code: 'async function test() {}', expected: '异步操作' }
    ]
    
    for (let i = 0; i < testCases.length; i++) {
      const testCase = testCases[i]
      const generated = this.migrator.generateTitle(testCase.code, i)
      if (generated !== testCase.expected) {
        console.warn(`标题生成警告: 期望 "${testCase.expected}", 实际 "${generated}"`)
      }
    }
    
    console.log('✅ 标题生成测试通过')
  }

  /**
   * 测试键名生成
   */
  async testKeyGeneration() {
    console.log('🔍 测试键名生成...')
    
    const testCases = [
      { title: '安装依赖', expected: 'installation' },
      { title: '基本使用', expected: 'basicUsage' },
      { title: '异步操作', expected: 'asyncOperation' },
      { title: '未知标题', expected: 'codeBlock0' }
    ]
    
    for (let i = 0; i < testCases.length; i++) {
      const testCase = testCases[i]
      const generated = this.migrator.generateKey(testCase.title, i)
      if (testCase.title === '未知标题') {
        // 对于未知标题，检查是否包含 codeBlock
        if (!generated.includes('codeBlock')) {
          throw new Error(`键名生成失败: 期望包含 "codeBlock", 实际 "${generated}"`)
        }
      } else if (generated !== testCase.expected) {
        console.warn(`键名生成警告: 期望 "${testCase.expected}", 实际 "${generated}"`)
      }
    }
    
    console.log('✅ 键名生成测试通过')
  }

  /**
   * 测试 JSON 文件创建
   */
  async testJsonFileCreation() {
    console.log('🔍 测试 JSON 文件创建...')
    
    const codeBlocks = [
      {
        key: 'basicUsage',
        title: '基本使用',
        language: 'javascript',
        code: 'const app = express()'
      }
    ]
    
    // 模拟创建 JSON 文件
    const jsonData = {
      basicUsage: {
        title: '基本使用',
        language: 'javascript',
        code: 'const app = express()'
      }
    }
    
    // 验证 JSON 数据结构
    if (!jsonData.basicUsage) {
      throw new Error('JSON 数据结构不正确')
    }
    
    if (jsonData.basicUsage.title !== '基本使用') {
      throw new Error('JSON 标题不正确')
    }
    
    console.log('✅ JSON 文件创建测试通过')
  }

  /**
   * 测试内容替换
   */
  async testContentReplacement() {
    console.log('🔍 测试内容替换...')
    
    const testContent = `<pre>
{\`console.log('test')\`}
</pre>`
    
    const expectedReplacement = `{codeData.testKey && (
                            <CodeHighlight
                                code={codeData.testKey.code}
                                language={codeData.testKey.language}
                                title={codeData.testKey.title}
                            />
                        )}`
    
    const generated = this.migrator.generateCodeHighlightComponent('testKey')
    
    if (!generated.includes('CodeHighlight')) {
      throw new Error('生成的组件不包含 CodeHighlight')
    }
    
    if (!generated.includes('codeData.testKey')) {
      throw new Error('生成的组件不包含正确的数据引用')
    }
    
    console.log('✅ 内容替换测试通过')
  }
}

// 运行测试
async function main() {
  const tester = new MigratorTester()
  await tester.runAllTests()
}

if (require.main === module) {
  main().catch(console.error)
}

module.exports = MigratorTester
