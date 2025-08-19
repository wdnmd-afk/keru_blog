import React from 'react'
import { Card, Tag, Alert, Divider, Button } from 'antd'
import { useNavigate } from 'react-router-dom'
import { 
    ArrowLeftOutlined, 
    ThunderboltOutlined, 
    WarningOutlined,
    CheckCircleOutlined,
    BugOutlined
} from '@ant-design/icons'
import styles from '@/styles/topicDetail.module.scss'

const ProductivityDetail: React.FC = () => {
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
                    <ThunderboltOutlined />
                </div>
                <div className={styles.topic_info}>
                    <h1>效率工具详解</h1>
                    <p>掌握提升开发效率的工具与技巧</p>
                    <div className={styles.topic_tags}>
                        <Tag color="blue">效率工具</Tag>
                        <Tag color="green">生产力</Tag>
                        <Tag color="orange">工作流</Tag>
                        <Tag color="purple">自动化</Tag>
                    </div>
                </div>
            </div>
            
            {/* 内容区域 */}
            <div className={styles.content_sections}>
                {/* 效率工具概述 */}
                <Card title="⚡ 效率工具生态" className={styles.content_card}>
                    <div className={styles.concept_content}>
                        <h3>为什么需要效率工具？</h3>
                        <p>现代软件开发涉及众多重复性任务和复杂的工作流程。效率工具能够自动化这些任务、简化操作流程、减少上下文切换，从而显著提升开发者的生产力和工作体验。</p>
                        
                        <h3>效率工具分类</h3>
                        <div className={styles.concepts_grid}>
                            <div className={styles.concept_item}>
                                <h4>🔧 开发辅助</h4>
                                <p>提升编码效率</p>
                                <ul>
                                    <li>代码片段管理</li>
                                    <li>快速启动器</li>
                                    <li>窗口管理</li>
                                    <li>剪贴板增强</li>
                                </ul>
                            </div>
                            
                            <div className={styles.concept_item}>
                                <h4>📝 文档协作</h4>
                                <p>知识管理与协作</p>
                                <ul>
                                    <li>笔记应用</li>
                                    <li>文档生成</li>
                                    <li>思维导图</li>
                                    <li>团队协作</li>
                                </ul>
                            </div>
                            
                            <div className={styles.concept_item}>
                                <h4>🎯 项目管理</h4>
                                <p>任务和时间管理</p>
                                <ul>
                                    <li>任务跟踪</li>
                                    <li>时间记录</li>
                                    <li>进度管理</li>
                                    <li>团队协调</li>
                                </ul>
                            </div>
                            
                            <div className={styles.concept_item}>
                                <h4>🚀 自动化工具</h4>
                                <p>工作流自动化</p>
                                <ul>
                                    <li>脚本自动化</li>
                                    <li>API集成</li>
                                    <li>定时任务</li>
                                    <li>通知管理</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </Card>
                
                {/* 代码片段管理 */}
                <Card title="📋 代码片段管理" className={styles.content_card}>
                    <div className={styles.usage_grid}>
                        <div className={styles.usage_item}>
                            <h4>1. VS Code Snippets</h4>
                            <div className={styles.code_block}>
                                <pre>
{`// 创建自定义代码片段
// 文件: .vscode/snippets.code-snippets

{
  "React Functional Component": {
    "prefix": "rfc",
    "body": [
      "import React from 'react'",
      "",
      "interface \${1:ComponentName}Props {",
      "  // 定义组件属性",
      "}",
      "",
      "const \${1:ComponentName}: React.FC<\${1:ComponentName}Props> = () => {",
      "  return (",
      "    <div>",
      "      \$0",
      "    </div>",
      "  )",
      "}",
      "",
      "export default \${1:ComponentName}"
    ],
    "description": "创建React函数组件"
  },
  
  "Express Route Handler": {
    "prefix": "route",
    "body": [
      "app.\${1|get,post,put,delete|}('\${2:/api/endpoint}', async (req, res) => {",
      "  try {",
      "    \$0",
      "    res.json({ success: true });",
      "  } catch (error) {",
      "    res.status(500).json({ error: error.message });",
      "  }",
      "});"
    ],
    "description": "创建Express路由处理器"
  },
  
  "Jest Test Case": {
    "prefix": "test",
    "body": [
      "describe('\${1:测试描述}', () => {",
      "  test('\${2:测试用例}', () => {",
      "    // Arrange",
      "    \${3:// 准备测试数据}",
      "    ",
      "    // Act", 
      "    \${4:// 执行测试操作}",
      "    ",
      "    // Assert",
      "    expect(\${5:actual}).toBe(\${6:expected});",
      "  });",
      "});"
    ],
    "description": "创建Jest测试用例"
  },
  
  "Console Log with Label": {
    "prefix": "cll",
    "body": [
      "console.log('\${1:label}:', \${2:variable});"
    ],
    "description": "带标签的console.log"
  },
  
  "Try Catch Block": {
    "prefix": "tryc",
    "body": [
      "try {",
      "  \$0",
      "} catch (error) {",
      "  console.error('Error:', error);",
      "}"
    ],
    "description": "Try-catch错误处理"
  }
}

// TypeScript类型定义片段
{
  "Interface Definition": {
    "prefix": "interface",
    "body": [
      "interface \${1:InterfaceName} {",
      "  \${2:property}: \${3:type};",
      "}"
    ],
    "description": "TypeScript接口定义"
  },
  
  "Type Definition": {
    "prefix": "type",
    "body": [
      "type \${1:TypeName} = {",
      "  \${2:property}: \${3:type};",
      "}"
    ],
    "description": "TypeScript类型定义"
  }
}`}
                                </pre>
                            </div>
                        </div>
                        
                        <div className={styles.usage_item}>
                            <h4>2. Alfred Snippets (macOS)</h4>
                            <div className={styles.code_block}>
                                <pre>
{`// Alfred文本扩展配置
// 关键词: email
// 扩展内容: your.email@example.com

// 关键词: sig
// 扩展内容:
Best regards,
Your Name
Senior Developer
Company Name
Phone: +1234567890

// 关键词: meeting
// 扩展内容:
Hi team,

I'd like to schedule a meeting to discuss:
- {cursor}

Please let me know your availability.

Thanks!

// 关键词: gitignore
// 扩展内容:
node_modules/
dist/
.env
.DS_Store
*.log
coverage/

// 关键词: readme
// 扩展内容:
# Project Name

## Description
{cursor}

## Installation
\`\`\`bash
npm install
\`\`\`

## Usage
\`\`\`bash
npm start
\`\`\`

## Contributing
Please read CONTRIBUTING.md for details.

## License
This project is licensed under the MIT License.

// 动态片段示例
// 关键词: date
// 脚本内容:
tell application "System Events"
    set currentDate to (current date) as string
    return currentDate
end tell

// 关键词: uuid
// 脚本内容:
do shell script "uuidgen | tr '[:upper:]' '[:lower:]'"

// 关键词: timestamp
// 脚本内容:
do shell script "date +%s"`}
                                </pre>
                            </div>
                        </div>
                        
                        <div className={styles.usage_item}>
                            <h4>3. Raycast Scripts</h4>
                            <div className={styles.code_block}>
                                <pre>
{`#!/bin/bash

# Raycast Script Commands

# @raycast.title Generate UUID
# @raycast.mode compact
# @raycast.packageName Developer Utils
# @raycast.description Generate a new UUID
uuidgen | tr '[:upper:]' '[:lower:]' | tr -d '\n' | pbcopy
echo "UUID copied to clipboard"

# @raycast.title Current Timestamp
# @raycast.mode compact
# @raycast.packageName Developer Utils
# @raycast.description Get current Unix timestamp
date +%s | tr -d '\n' | pbcopy
echo "Timestamp copied to clipboard"

# @raycast.title Base64 Encode
# @raycast.mode fullOutput
# @raycast.packageName Developer Utils
# @raycast.description Encode text to Base64
# @raycast.argument1 { "type": "text", "placeholder": "Text to encode" }
echo -n "$1" | base64 | pbcopy
echo "Base64 encoded and copied to clipboard"

# @raycast.title JSON Format
# @raycast.mode fullOutput
# @raycast.packageName Developer Utils
# @raycast.description Format JSON from clipboard
pbpaste | jq '.' | pbcopy
echo "JSON formatted and copied to clipboard"

# @raycast.title Kill Port
# @raycast.mode compact
# @raycast.packageName Developer Utils
# @raycast.description Kill process running on specified port
# @raycast.argument1 { "type": "text", "placeholder": "Port number" }
lsof -ti:$1 | xargs kill -9
echo "Process on port $1 killed"

# @raycast.title Open in VS Code
# @raycast.mode silent
# @raycast.packageName Developer Utils
# @raycast.description Open current directory in VS Code
code .

# @raycast.title Git Status
# @raycast.mode fullOutput
# @raycast.packageName Git Utils
# @raycast.description Show git status
git status --porcelain

# @raycast.title Create React Component
# @raycast.mode compact
# @raycast.packageName Code Generation
# @raycast.description Create a new React component
# @raycast.argument1 { "type": "text", "placeholder": "Component name" }

COMPONENT_NAME=\$1
COMPONENT_DIR="src/components/\$COMPONENT_NAME"

mkdir -p "\$COMPONENT_DIR"

cat > "\$COMPONENT_DIR/index.tsx" << EOF
import React from 'react'
import styles from './\$COMPONENT_NAME.module.scss'

interface \${COMPONENT_NAME}Props {
  // 定义组件属性
}

const \$COMPONENT_NAME: React.FC<\${COMPONENT_NAME}Props> = () => {
  return (
    <div className={styles.container}>
      <h1>\$COMPONENT_NAME</h1>
    </div>
  )
}

export default \$COMPONENT_NAME
EOF

cat > "\$COMPONENT_DIR/\$COMPONENT_NAME.module.scss" << EOF
.container {
  // 组件样式
}
EOF

echo "Component \$COMPONENT_NAME created successfully"`}
                                </pre>
                            </div>
                        </div>
                    </div>
                </Card>
                
                {/* 窗口管理工具 */}
                <Card title="🪟 窗口管理工具" className={styles.content_card}>
                    <div className={styles.window_section}>
                        <h3>macOS窗口管理</h3>
                        <div className={styles.code_block}>
                            <pre>
{`// Rectangle - 免费窗口管理工具
// 快捷键配置
Left Half: ⌃⌥←
Right Half: ⌃⌥→
Top Half: ⌃⌥↑
Bottom Half: ⌃⌥↓
Maximize: ⌃⌥↩
Center: ⌃⌥C
First Third: ⌃⌥D
Center Third: ⌃⌥F
Last Third: ⌃⌥G

// Magnet - 付费窗口管理工具
// 拖拽区域配置
Left: 拖拽到屏幕左边缘
Right: 拖拽到屏幕右边缘
Top: 拖拽到屏幕顶部
Corners: 拖拽到屏幕四个角落

// BetterTouchTool - 高级手势和窗口管理
// 自定义手势配置
Three Finger Swipe Left: Previous Desktop
Three Finger Swipe Right: Next Desktop
Four Finger Tap: Mission Control
Corner Click Top Left: Launchpad

// Hammerspoon - 可编程窗口管理
-- ~/.hammerspoon/init.lua
hs.hotkey.bind({"cmd", "alt", "ctrl"}, "Left", function()
  local win = hs.window.focusedWindow()
  local f = win:frame()
  local screen = win:screen()
  local max = screen:frame()

  f.x = max.x
  f.y = max.y
  f.w = max.w / 2
  f.h = max.h
  win:setFrame(f)
end)

hs.hotkey.bind({"cmd", "alt", "ctrl"}, "Right", function()
  local win = hs.window.focusedWindow()
  local f = win:frame()
  local screen = win:screen()
  local max = screen:frame()

  f.x = max.x + (max.w / 2)
  f.y = max.y
  f.w = max.w / 2
  f.h = max.h
  win:setFrame(f)
end)

-- 应用快速切换
hs.hotkey.bind({"cmd"}, "1", function()
  hs.application.launchOrFocus("Visual Studio Code")
end)

hs.hotkey.bind({"cmd"}, "2", function()
  hs.application.launchOrFocus("Google Chrome")
end)

hs.hotkey.bind({"cmd"}, "3", function()
  hs.application.launchOrFocus("Terminal")
end)`}
                            </pre>
                        </div>
                        
                        <h3>Windows窗口管理</h3>
                        <div className={styles.code_block}>
                            <pre>
{`// PowerToys FancyZones配置
// 创建自定义布局
{
  "version": "1.0",
  "name": "Development Layout",
  "type": "canvas",
  "info": {
    "ref-width": 1920,
    "ref-height": 1080
  },
  "zones": [
    {
      "X": 0,
      "Y": 0,
      "width": 960,
      "height": 1080
    },
    {
      "X": 960,
      "Y": 0,
      "width": 960,
      "height": 540
    },
    {
      "X": 960,
      "Y": 540,
      "width": 960,
      "height": 540
    }
  ]
}

// AutoHotkey脚本
; 窗口管理快捷键
#Left::WinSet, Style, -0xC40000, A ; 移除标题栏
#Right::WinSet, Style, +0xC40000, A ; 恢复标题栏

; 应用快速启动
#1::Run, "C:\\Users\\%A_UserName%\\AppData\\Local\\Programs\\Microsoft VS Code\\Code.exe"
#2::Run, "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe"
#3::Run, "wt.exe" ; Windows Terminal

; 窗口透明度控制
#WheelUp::
WinGet, currentTransparency, Transparent, A
if currentTransparency = OFF
    currentTransparency = 255
newTransparency := currentTransparency + 25
if newTransparency > 255
    newTransparency = 255
WinSet, Transparent, %newTransparency%, A
return

#WheelDown::
WinGet, currentTransparency, Transparent, A
if currentTransparency = OFF
    currentTransparency = 255
newTransparency := currentTransparency - 25
if newTransparency < 50
    newTransparency = 50
WinSet, Transparent, %newTransparency%, A
return

// Microsoft PowerToys配置
// PowerToys Run快捷键: Alt + Space
// 插件配置:
- Calculator: 计算器功能
- File Explorer: 文件搜索
- Program: 程序启动
- Shell: 命令执行
- Unit Converter: 单位转换
- Windows Settings: 系统设置

// 自定义插件示例
{
  "Name": "Developer Tools",
  "Description": "Quick access to development tools",
  "Commands": [
    {
      "Keyword": "code",
      "Action": "Launch VS Code",
      "Path": "code"
    },
    {
      "Keyword": "chrome",
      "Action": "Launch Chrome",
      "Path": "chrome"
    }
  ]
}`}
                            </pre>
                        </div>
                    </div>
                </Card>
                
                {/* 自动化工具 */}
                <Card title="🤖 自动化工具" className={styles.content_card}>
                    <div className={styles.automation_section}>
                        <h3>Zapier自动化</h3>
                        <div className={styles.code_block}>
                            <pre>
{`// Zapier工作流示例

// 1. GitHub到Slack通知
Trigger: GitHub - New Issue
Action: Slack - Send Channel Message
Message: "新Issue: {{title}} 由 {{user}} 创建
链接: {{html_url}}
标签: {{labels}}"

// 2. 日历事件到任务管理
Trigger: Google Calendar - Event Start
Filter: Event title contains "Meeting"
Action: Todoist - Create Task
Task: "会议后续: {{event_title}}"
Due Date: {{event_end_time}} + 1 hour

// 3. 代码部署通知
Trigger: Webhook - Deployment Success
Action 1: Slack - Send Message
Action 2: Email - Send Email
Action 3: Trello - Create Card

// 4. 错误监控到问题跟踪
Trigger: Sentry - New Error
Filter: Error level = "error"
Action: Jira - Create Issue
Summary: "生产环境错误: {{error_title}}"
Description: "{{error_message}}
Stack Trace: {{stack_trace}}
Timestamp: {{timestamp}}"

// 5. 代码审查提醒
Trigger: GitHub - Pull Request Opened
Action: Google Calendar - Create Event
Title: "代码审查: {{pull_request_title}}"
Start Time: {{created_at}} + 2 hours
Duration: 30 minutes`}
                            </pre>
                        </div>
                        
                        <h3>IFTTT自动化</h3>
                        <div className={styles.code_block}>
                            <pre>
{`// IFTTT Applet示例

// 1. 工作时间自动静音
IF: Android Device - Connects to specific WiFi (Office WiFi)
THEN: Android Device - Set ringtone volume to 0

// 2. 离开办公室恢复音量
IF: Android Device - Disconnects from specific WiFi (Office WiFi)
THEN: Android Device - Set ringtone volume to 80%

// 3. 重要邮件到短信
IF: Gmail - New email from specific sender
THEN: SMS - Send me an SMS

// 4. 天气提醒
IF: Weather Underground - Tomorrow's weather report
THEN: iOS Reminders - Add reminder
Reminder: "明天天气: {{WeatherTomorrow}} {{HighTempTomorrow}}°/{{LowTempTomorrow}}°"

// 5. 社交媒体同步
IF: Instagram - Any new photo by you
THEN: Twitter - Post a tweet with image
Tweet: "刚在Instagram分享了一张照片 {{Caption}} {{Url}}"

// 6. 位置触发提醒
IF: Location - You enter an area (Home)
THEN: iOS Reminders - Add reminder
Reminder: "检查今天的工作进度"

// 7. 股票价格监控
IF: Stocks - Price drops below threshold
THEN: Email - Send me an email
Subject: "股票提醒: {{Symbol}} 跌破 {{Threshold}}"
Body: "当前价格: {{Price}}, 变化: {{Change}}"

// 8. 健康数据记录
IF: iOS Health - New weight measurement
THEN: Google Sheets - Add row to spreadsheet
Row: "{{Date}}, {{Weight}}, {{BMI}}"`}
                            </pre>
                        </div>
                        
                        <h3>自定义自动化脚本</h3>
                        <div className={styles.code_block}>
                            <pre>
{`// Node.js自动化脚本示例
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
const cron = require('node-cron');

// 自动备份项目
function backupProject() {
    const projectDir = process.cwd();
    const backupDir = path.join(process.env.HOME, 'Backups');
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const backupName = \`project-backup-\${timestamp}.tar.gz\`;
    
    if (!fs.existsSync(backupDir)) {
        fs.mkdirSync(backupDir, { recursive: true });
    }
    
    const command = \`tar -czf "\${path.join(backupDir, backupName)}" --exclude=node_modules --exclude=.git .\`;
    
    exec(command, (error, stdout, stderr) => {
        if (error) {
            console.error('备份失败:', error);
        } else {
            console.log(\`备份完成: \${backupName}\`);
        }
    });
}

// 清理临时文件
function cleanupTempFiles() {
    const tempDirs = [
        'node_modules/.cache',
        'dist',
        '.next',
        'coverage'
    ];
    
    tempDirs.forEach(dir => {
        if (fs.existsSync(dir)) {
            fs.rmSync(dir, { recursive: true, force: true });
            console.log(\`清理完成: \${dir}\`);
        }
    });
}

// 检查依赖更新
function checkDependencyUpdates() {
    exec('npm outdated --json', (error, stdout, stderr) => {
        if (stdout) {
            const outdated = JSON.parse(stdout);
            const updates = Object.keys(outdated);
            
            if (updates.length > 0) {
                console.log('发现可更新的依赖:');
                updates.forEach(pkg => {
                    const info = outdated[pkg];
                    console.log(\`- \${pkg}: \${info.current} → \${info.latest}\`);
                });
            } else {
                console.log('所有依赖都是最新的');
            }
        }
    });
}

// 定时任务
// 每天凌晨2点备份项目
cron.schedule('0 2 * * *', backupProject);

// 每周一清理临时文件
cron.schedule('0 0 * * 1', cleanupTempFiles);

// 每周五检查依赖更新
cron.schedule('0 9 * * 5', checkDependencyUpdates);

// 工作日提醒
cron.schedule('0 9 * * 1-5', () => {
    console.log('新的一天开始了！记得查看今天的任务清单。');
});

console.log('自动化脚本已启动...');`}
                            </pre>
                        </div>
                    </div>
                </Card>
                
                {/* 最佳实践 */}
                <Card title="✅ 效率工具最佳实践" className={styles.content_card}>
                    <div className={styles.best_practices}>
                        <div className={styles.practice_item}>
                            <CheckCircleOutlined className={styles.practice_icon} />
                            <div>
                                <h4>1. 工具选择</h4>
                                <p>选择合适的效率工具</p>
                                <ul>
                                    <li>评估实际需求和使用频率</li>
                                    <li>优先选择跨平台工具</li>
                                    <li>考虑学习成本和维护成本</li>
                                    <li>避免工具过载</li>
                                </ul>
                            </div>
                        </div>
                        
                        <div className={styles.practice_item}>
                            <CheckCircleOutlined className={styles.practice_icon} />
                            <div>
                                <h4>2. 配置管理</h4>
                                <p>统一管理工具配置</p>
                                <ul>
                                    <li>使用版本控制管理配置</li>
                                    <li>创建配置文件模板</li>
                                    <li>定期备份重要配置</li>
                                    <li>文档化自定义设置</li>
                                </ul>
                            </div>
                        </div>
                        
                        <div className={styles.practice_item}>
                            <CheckCircleOutlined className={styles.practice_icon} />
                            <div>
                                <h4>3. 自动化策略</h4>
                                <p>合理实施自动化</p>
                                <ul>
                                    <li>识别重复性任务</li>
                                    <li>从简单任务开始自动化</li>
                                    <li>测试自动化流程</li>
                                    <li>监控自动化效果</li>
                                </ul>
                            </div>
                        </div>
                        
                        <div className={styles.practice_item}>
                            <CheckCircleOutlined className={styles.practice_icon} />
                            <div>
                                <h4>4. 持续优化</h4>
                                <p>不断改进工作流程</p>
                                <ul>
                                    <li>定期评估工具效果</li>
                                    <li>收集使用反馈</li>
                                    <li>学习新的效率技巧</li>
                                    <li>分享最佳实践</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    )
}

export default ProductivityDetail
