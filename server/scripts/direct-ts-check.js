#!/usr/bin/env node

/**
 * Server端简化TypeScript错误检测脚本
 * 直接运行TypeScript编译检查并显示结果
 */

import { execSync } from 'child_process'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const projectRoot = path.dirname(__dirname)

console.log('🔍 Server端TypeScript编译检查')
console.log('='.repeat(50))

try {
  console.log('⏳ 执行 npx tsc --noEmit...')

  const result = execSync('npx tsc --noEmit', {
    cwd: projectRoot,
    encoding: 'utf8',
    stdio: 'pipe',
  })

  console.log('✅ TypeScript编译检查通过！')
  console.log('🎉 Server端代码没有发现任何TypeScript错误')

  if (result.trim()) {
    console.log('编译输出:')
    console.log(result)
  }

  // 清理错误目录
  const errorDir = path.join(__dirname, '../TsError')
  if (fs.existsSync(errorDir)) {
    const files = fs.readdirSync(errorDir)
    files.forEach(file => {
      if (file.endsWith('.json') || file.endsWith('.md')) {
        fs.unlinkSync(path.join(errorDir, file))
        console.log(`🗑️ 清理文件: ${file}`)
      }
    })
  }

  console.log('\n🏁 Server端TypeScript检查完成！')
  process.exit(0)
} catch (error) {
  console.log('⚠️ 发现TypeScript错误')
  console.log(`状态码: ${error.status}`)

  const output = error.stdout || error.stderr || ''

  if (output.trim()) {
    console.log('\n错误详情:')
    console.log('---开始---')
    console.log(output)
    console.log('---结束---')

    // 解析错误
    const lines = output.split('\n').filter(line => line.trim())
    const errorLines = lines.filter(line => line.includes(': error TS'))

    console.log(`\n📊 总计发现 ${errorLines.length} 个TypeScript错误`)

    if (errorLines.length > 0) {
      console.log('\n🔍 错误列表:')
      errorLines.forEach((line, index) => {
        console.log(`${index + 1}. ${line}`)
      })

      // 分析错误类型
      const errorTypes = {}
      errorLines.forEach(line => {
        const match = line.match(/error (TS\d+):/)
        if (match) {
          const code = match[1]
          errorTypes[code] = (errorTypes[code] || 0) + 1
        }
      })

      console.log('\n📈 错误类型统计:')
      Object.entries(errorTypes).forEach(([code, count]) => {
        console.log(`  ${code}: ${count} 个`)
      })
    }

    // 保存错误报告
    const errorDir = path.join(projectRoot, 'TsError')
    if (!fs.existsSync(errorDir)) {
      fs.mkdirSync(errorDir, { recursive: true })
    }

    const report = {
      timestamp: new Date().toISOString(),
      project: 'server',
      totalErrors: errorLines.length,
      errors: errorLines,
      rawOutput: output,
    }

    fs.writeFileSync(
      path.join(errorDir, 'direct-error-report.json'),
      JSON.stringify(report, null, 2)
    )

    console.log(`\n📄 错误报告已保存到: TsError/direct-error-report.json`)

    process.exit(1)
  } else {
    console.log('❌ 编译失败但没有具体错误信息')
    process.exit(1)
  }
}
