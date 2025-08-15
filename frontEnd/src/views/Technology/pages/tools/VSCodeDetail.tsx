import React from 'react'
import { Card, Tag, Alert, Divider, Button } from 'antd'
import { useNavigate } from 'react-router-dom'
import { 
    ArrowLeftOutlined, 
    CodeOutlined, 
    WarningOutlined,
    CheckCircleOutlined,
    BugOutlined
} from '@ant-design/icons'
import styles from '@/styles/topicDetail.module.scss'

const VSCodeDetail: React.FC = () => {
    const navigate = useNavigate()
    
    const handleBack = () => {
        navigate('/technology/tools')
    }
    
    return (
        <div className={styles.topic_detail_container}>
            {/* 返回按钮 */}
            <div className={styles.back_section}>
                <Button 
                    type="text" 
                    icon={<ArrowLeftOutlined />}
                    onClick={handleBack}
                    className={styles.back_button}
                >
                    返回开发工具技术卡片
                </Button>
            </div>
            
            {/* 页面头部 */}
            <div className={styles.detail_header}>
                <div className={styles.topic_icon}>
                    <CodeOutlined />
                </div>
                <div className={styles.topic_info}>
                    <h1>VS Code 高效开发指南</h1>
                    <p>掌握VS Code的配置、插件与高效开发技巧</p>
                    <div className={styles.topic_tags}>
                        <Tag color="blue">VS Code</Tag>
                        <Tag color="green">代码编辑器</Tag>
                        <Tag color="orange">插件生态</Tag>
                        <Tag color="purple">效率提升</Tag>
                    </div>
                </div>
            </div>
            
            {/* 内容区域 */}
            <div className={styles.content_sections}>
                {/* 基础配置 */}
                <Card title="⚙️ VS Code 基础配置" className={styles.content_card}>
                    <div className={styles.concept_content}>
                        <h3>用户设置 (settings.json)</h3>
                        <div className={styles.code_block}>
                            <pre>
{`{
  // 编辑器基础设置
  "editor.fontSize": 14,
  "editor.fontFamily": "'Fira Code', 'Cascadia Code', Consolas, monospace",
  "editor.fontLigatures": true,
  "editor.lineHeight": 1.6,
  "editor.tabSize": 2,
  "editor.insertSpaces": true,
  "editor.wordWrap": "on",
  
  // 代码格式化
  "editor.formatOnSave": true,
  "editor.formatOnPaste": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true,
    "source.organizeImports": true
  },
  
  // 外观设置
  "workbench.colorTheme": "One Dark Pro",
  "workbench.iconTheme": "material-icon-theme",
  "workbench.startupEditor": "newUntitledFile",
  
  // 文件设置
  "files.autoSave": "afterDelay",
  "files.autoSaveDelay": 1000,
  "files.trimTrailingWhitespace": true,
  "files.insertFinalNewline": true,
  
  // 终端设置
  "terminal.integrated.fontSize": 13,
  "terminal.integrated.shell.windows": "C:\\\\Windows\\\\System32\\\\cmd.exe",
  
  // 搜索设置
  "search.exclude": {
    "**/node_modules": true,
    "**/dist": true,
    "**/.git": true
  }
}`}
                            </pre>
                        </div>
                        
                        <h3>工作区设置</h3>
                        <div className={styles.code_block}>
                            <pre>
{`// .vscode/settings.json (项目级配置)
{
  "typescript.preferences.importModuleSpecifier": "relative",
  "eslint.workingDirectories": ["./frontend", "./backend"],
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "[javascript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[typescript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[json]": {
    "editor.defaultFormatter": "vscode.json-language-features"
  }
}`}
                            </pre>
                        </div>
                    </div>
                </Card>
                
                {/* 必备插件 */}
                <Card title="🔌 必备插件推荐" className={styles.content_card}>
                    <div className={styles.usage_grid}>
                        <div className={styles.usage_item}>
                            <h4>1. 代码质量与格式化</h4>
                            <div className={styles.plugin_list}>
                                <div className={styles.plugin_item}>
                                    <h5>ESLint</h5>
                                    <p>JavaScript/TypeScript代码质量检查</p>
                                    <Tag color="red">必装</Tag>
                                </div>
                                <div className={styles.plugin_item}>
                                    <h5>Prettier - Code formatter</h5>
                                    <p>代码格式化工具，支持多种语言</p>
                                    <Tag color="red">必装</Tag>
                                </div>
                                <div className={styles.plugin_item}>
                                    <h5>EditorConfig for VS Code</h5>
                                    <p>统一编辑器配置，团队协作必备</p>
                                    <Tag color="orange">推荐</Tag>
                                </div>
                            </div>
                        </div>
                        
                        <div className={styles.usage_item}>
                            <h4>2. 语言支持</h4>
                            <div className={styles.plugin_list}>
                                <div className={styles.plugin_item}>
                                    <h5>TypeScript Importer</h5>
                                    <p>自动导入TypeScript模块</p>
                                    <Tag color="blue">TypeScript</Tag>
                                </div>
                                <div className={styles.plugin_item}>
                                    <h5>Vetur</h5>
                                    <p>Vue.js开发工具</p>
                                    <Tag color="green">Vue</Tag>
                                </div>
                                <div className={styles.plugin_item}>
                                    <h5>ES7+ React/Redux/React-Native snippets</h5>
                                    <p>React开发代码片段</p>
                                    <Tag color="cyan">React</Tag>
                                </div>
                                <div className={styles.plugin_item}>
                                    <h5>Python</h5>
                                    <p>Python语言支持</p>
                                    <Tag color="yellow">Python</Tag>
                                </div>
                            </div>
                        </div>
                        
                        <div className={styles.usage_item}>
                            <h4>3. 开发效率</h4>
                            <div className={styles.plugin_list}>
                                <div className={styles.plugin_item}>
                                    <h5>Auto Rename Tag</h5>
                                    <p>自动重命名配对的HTML/XML标签</p>
                                    <Tag color="orange">推荐</Tag>
                                </div>
                                <div className={styles.plugin_item}>
                                    <h5>Bracket Pair Colorizer 2</h5>
                                    <p>括号配对着色</p>
                                    <Tag color="purple">推荐</Tag>
                                </div>
                                <div className={styles.plugin_item}>
                                    <h5>Path Intellisense</h5>
                                    <p>文件路径自动补全</p>
                                    <Tag color="green">推荐</Tag>
                                </div>
                                <div className={styles.plugin_item}>
                                    <h5>Live Server</h5>
                                    <p>本地开发服务器</p>
                                    <Tag color="red">必装</Tag>
                                </div>
                            </div>
                        </div>
                    </div>
                </Card>
                
                {/* 快捷键大全 */}
                <Card title="⌨️ 快捷键大全" className={styles.content_card}>
                    <div className={styles.shortcuts_section}>
                        <h3>基础操作</h3>
                        <div className={styles.shortcuts_grid}>
                            <div className={styles.shortcut_category}>
                                <h4>文件操作</h4>
                                <div className={styles.shortcut_list}>
                                    <div className={styles.shortcut_item}>
                                        <kbd>Ctrl + N</kbd>
                                        <span>新建文件</span>
                                    </div>
                                    <div className={styles.shortcut_item}>
                                        <kbd>Ctrl + O</kbd>
                                        <span>打开文件</span>
                                    </div>
                                    <div className={styles.shortcut_item}>
                                        <kbd>Ctrl + S</kbd>
                                        <span>保存文件</span>
                                    </div>
                                    <div className={styles.shortcut_item}>
                                        <kbd>Ctrl + Shift + S</kbd>
                                        <span>另存为</span>
                                    </div>
                                    <div className={styles.shortcut_item}>
                                        <kbd>Ctrl + W</kbd>
                                        <span>关闭当前标签</span>
                                    </div>
                                </div>
                            </div>
                            
                            <div className={styles.shortcut_category}>
                                <h4>编辑操作</h4>
                                <div className={styles.shortcut_list}>
                                    <div className={styles.shortcut_item}>
                                        <kbd>Ctrl + Z</kbd>
                                        <span>撤销</span>
                                    </div>
                                    <div className={styles.shortcut_item}>
                                        <kbd>Ctrl + Y</kbd>
                                        <span>重做</span>
                                    </div>
                                    <div className={styles.shortcut_item}>
                                        <kbd>Ctrl + X</kbd>
                                        <span>剪切行</span>
                                    </div>
                                    <div className={styles.shortcut_item}>
                                        <kbd>Ctrl + C</kbd>
                                        <span>复制行</span>
                                    </div>
                                    <div className={styles.shortcut_item}>
                                        <kbd>Ctrl + V</kbd>
                                        <span>粘贴</span>
                                    </div>
                                </div>
                            </div>
                            
                            <div className={styles.shortcut_category}>
                                <h4>导航操作</h4>
                                <div className={styles.shortcut_list}>
                                    <div className={styles.shortcut_item}>
                                        <kbd>Ctrl + P</kbd>
                                        <span>快速打开文件</span>
                                    </div>
                                    <div className={styles.shortcut_item}>
                                        <kbd>Ctrl + Shift + P</kbd>
                                        <span>命令面板</span>
                                    </div>
                                    <div className={styles.shortcut_item}>
                                        <kbd>Ctrl + G</kbd>
                                        <span>跳转到行</span>
                                    </div>
                                    <div className={styles.shortcut_item}>
                                        <kbd>Ctrl + Tab</kbd>
                                        <span>切换标签</span>
                                    </div>
                                    <div className={styles.shortcut_item}>
                                        <kbd>F12</kbd>
                                        <span>跳转到定义</span>
                                    </div>
                                </div>
                            </div>
                            
                            <div className={styles.shortcut_category}>
                                <h4>搜索替换</h4>
                                <div className={styles.shortcut_list}>
                                    <div className={styles.shortcut_item}>
                                        <kbd>Ctrl + F</kbd>
                                        <span>查找</span>
                                    </div>
                                    <div className={styles.shortcut_item}>
                                        <kbd>Ctrl + H</kbd>
                                        <span>替换</span>
                                    </div>
                                    <div className={styles.shortcut_item}>
                                        <kbd>Ctrl + Shift + F</kbd>
                                        <span>全局搜索</span>
                                    </div>
                                    <div className={styles.shortcut_item}>
                                        <kbd>Ctrl + D</kbd>
                                        <span>选择相同内容</span>
                                    </div>
                                    <div className={styles.shortcut_item}>
                                        <kbd>Alt + Enter</kbd>
                                        <span>选择所有匹配项</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <h3>高级操作</h3>
                        <div className={styles.code_block}>
                            <pre>
{`# 多光标编辑
Alt + Click                 # 添加光标
Ctrl + Alt + ↑/↓           # 在上/下行添加光标
Ctrl + Shift + L           # 选择所有匹配项并添加光标

# 行操作
Alt + ↑/↓                  # 移动行
Shift + Alt + ↑/↓          # 复制行
Ctrl + Shift + K           # 删除行
Ctrl + Enter               # 在下方插入行
Ctrl + Shift + Enter       # 在上方插入行

# 代码折叠
Ctrl + Shift + [           # 折叠代码块
Ctrl + Shift + ]           # 展开代码块
Ctrl + K, Ctrl + 0         # 折叠所有
Ctrl + K, Ctrl + J         # 展开所有

# 注释
Ctrl + /                   # 切换行注释
Shift + Alt + A            # 切换块注释`}
                            </pre>
                        </div>
                    </div>
                </Card>
                
                {/* 代码片段 */}
                <Card title="📝 自定义代码片段" className={styles.content_card}>
                    <div className={styles.snippets_section}>
                        <h3>创建代码片段</h3>
                        <p>通过 <kbd>Ctrl + Shift + P</kbd> → "Configure User Snippets" 创建自定义代码片段</p>
                        
                        <div className={styles.code_block}>
                            <pre>
{`// javascript.json
{
  "React Functional Component": {
    "prefix": "rfc",
    "body": [
      "import React from 'react'",
      "",
      "const \${1:ComponentName} = () => {",
      "  return (",
      "    <div>",
      "      \${2:// Component content}",
      "    </div>",
      "  )",
      "}",
      "",
      "export default \${1:ComponentName}"
    ],
    "description": "Create a React functional component"
  },
  
  "Console Log": {
    "prefix": "clg",
    "body": [
      "console.log('\${1:message}', \${2:variable})"
    ],
    "description": "Console log with message and variable"
  },
  
  "Try Catch Block": {
    "prefix": "try",
    "body": [
      "try {",
      "  \${1:// code}",
      "} catch (error) {",
      "  console.error('\${2:Error message}:', error)",
      "}"
    ],
    "description": "Try catch block"
  }
}`}
                            </pre>
                        </div>
                        
                        <h3>常用代码片段变量</h3>
                        <div className={styles.code_block}>
                            <pre>
{`$TM_SELECTED_TEXT      # 当前选中的文本
$TM_CURRENT_LINE       # 当前行的内容
$TM_CURRENT_WORD       # 当前单词
$TM_LINE_INDEX         # 行号（从0开始）
$TM_LINE_NUMBER        # 行号（从1开始）
$TM_FILENAME           # 当前文件名
$TM_FILENAME_BASE      # 不带扩展名的文件名
$TM_DIRECTORY          # 当前文件所在目录
$TM_FILEPATH           # 当前文件的完整路径

$CURRENT_YEAR          # 当前年份
$CURRENT_MONTH         # 当前月份
$CURRENT_DATE          # 当前日期
$CURRENT_HOUR          # 当前小时
$CURRENT_MINUTE        # 当前分钟
$CURRENT_SECOND        # 当前秒数`}
                            </pre>
                        </div>
                    </div>
                </Card>
                
                {/* 调试配置 */}
                <Card title="🐛 调试配置" className={styles.content_card}>
                    <div className={styles.debug_section}>
                        <h3>launch.json 配置示例</h3>
                        <div className={styles.code_block}>
                            <pre>
{`// .vscode/launch.json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Launch Chrome",
      "request": "launch",
      "type": "chrome",
      "url": "http://localhost:3000",
      "webRoot": "\${workspaceFolder}/src",
      "sourceMapPathOverrides": {
        "webpack:///src/*": "\${webRoot}/*"
      }
    },
    {
      "name": "Node.js Debug",
      "type": "node",
      "request": "launch",
      "program": "\${workspaceFolder}/server.js",
      "env": {
        "NODE_ENV": "development"
      },
      "console": "integratedTerminal",
      "internalConsoleOptions": "neverOpen"
    },
    {
      "name": "Attach to Node",
      "type": "node",
      "request": "attach",
      "port": 9229,
      "restart": true,
      "localRoot": "\${workspaceFolder}",
      "remoteRoot": "/app"
    }
  ]
}`}
                            </pre>
                        </div>
                        
                        <h3>调试技巧</h3>
                        <div className={styles.debug_tips}>
                            <div className={styles.tip_item}>
                                <h4>断点类型</h4>
                                <ul>
                                    <li><strong>普通断点</strong>：点击行号左侧设置</li>
                                    <li><strong>条件断点</strong>：右键断点设置条件</li>
                                    <li><strong>日志断点</strong>：不暂停执行，只输出日志</li>
                                    <li><strong>函数断点</strong>：在函数入口处暂停</li>
                                </ul>
                            </div>
                            
                            <div className={styles.tip_item}>
                                <h4>调试快捷键</h4>
                                <div className={styles.shortcut_list}>
                                    <div className={styles.shortcut_item}>
                                        <kbd>F5</kbd>
                                        <span>开始调试</span>
                                    </div>
                                    <div className={styles.shortcut_item}>
                                        <kbd>F10</kbd>
                                        <span>单步跳过</span>
                                    </div>
                                    <div className={styles.shortcut_item}>
                                        <kbd>F11</kbd>
                                        <span>单步进入</span>
                                    </div>
                                    <div className={styles.shortcut_item}>
                                        <kbd>Shift + F11</kbd>
                                        <span>单步跳出</span>
                                    </div>
                                    <div className={styles.shortcut_item}>
                                        <kbd>Shift + F5</kbd>
                                        <span>停止调试</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Card>
                
                {/* 最佳实践 */}
                <Card title="✅ VS Code 最佳实践" className={styles.content_card}>
                    <div className={styles.best_practices}>
                        <div className={styles.practice_item}>
                            <CheckCircleOutlined className={styles.practice_icon} />
                            <div>
                                <h4>1. 工作区管理</h4>
                                <p>合理组织项目工作区，提高开发效率</p>
                                <ul>
                                    <li>使用多根工作区管理大型项目</li>
                                    <li>配置项目级设置文件</li>
                                    <li>使用任务配置自动化工作流</li>
                                    <li>合理配置文件排除规则</li>
                                </ul>
                            </div>
                        </div>
                        
                        <div className={styles.practice_item}>
                            <CheckCircleOutlined className={styles.practice_icon} />
                            <div>
                                <h4>2. 插件管理</h4>
                                <p>精选插件，避免过度安装影响性能</p>
                                <ul>
                                    <li>只安装必要的插件</li>
                                    <li>定期清理不用的插件</li>
                                    <li>使用插件推荐配置</li>
                                    <li>关注插件更新和安全性</li>
                                </ul>
                            </div>
                        </div>
                        
                        <div className={styles.practice_item}>
                            <CheckCircleOutlined className={styles.practice_icon} />
                            <div>
                                <h4>3. 性能优化</h4>
                                <p>优化VS Code性能，提升开发体验</p>
                                <div className={styles.code_block}>
                                    <pre>
{`// 性能优化设置
{
  "files.watcherExclude": {
    "**/node_modules/**": true,
    "**/.git/objects/**": true,
    "**/dist/**": true
  },
  "search.followSymlinks": false,
  "typescript.disableAutomaticTypeAcquisition": true,
  "extensions.autoUpdate": false
}`}
                                    </pre>
                                </div>
                            </div>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    )
}

export default VSCodeDetail
