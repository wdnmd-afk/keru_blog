import React from 'react'
import { Card, Tag, Alert, Divider, Button } from 'antd'
import { useNavigate } from 'react-router-dom'
import {
    ArrowLeftOutlined,
    ApiOutlined,
    WarningOutlined,
    CheckCircleOutlined,
    BugOutlined
} from '@ant-design/icons'
import styles from '@/styles/topicDetail.module.scss'

const GitHooksDetail: React.FC = () => {
    const navigate = useNavigate()

    const handleBack = () => {
        navigate('/technology/git')
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
                    返回Git & GitHub技术卡片
                </Button>
            </div>

            {/* 页面头部 */}
            <div className={styles.detail_header}>
                <div className={styles.topic_icon}>
                    <ApiOutlined />
                </div>
                <div className={styles.topic_info}>
                    <h1>Git Hooks 详解</h1>
                    <p>掌握Git钩子的使用与自动化工作流</p>
                    <div className={styles.topic_tags}>
                        <Tag color="blue">Git Hooks</Tag>
                        <Tag color="green">自动化</Tag>
                        <Tag color="orange">工作流</Tag>
                        <Tag color="purple">质量控制</Tag>
                    </div>
                </div>
            </div>

            {/* 内容区域 */}
            <div className={styles.content_sections}>
                {/* Git Hooks概述 */}
                <Card title="🎣 Git Hooks 概述" className={styles.content_card}>
                    <div className={styles.concept_content}>
                        <h3>什么是Git Hooks？</h3>
                        <p>Git Hooks是Git在特定事件发生时自动执行的脚本。它们允许你在Git工作流的关键点插入自定义逻辑，实现代码质量检查、自动化部署等功能。</p>

                        <h3>Hook类型分类</h3>
                        <div className={styles.concepts_grid}>
                            <div className={styles.concept_item}>
                                <h4>📥 客户端Hooks</h4>
                                <p>在本地仓库执行</p>
                                <ul>
                                    <li>pre-commit: 提交前检查</li>
                                    <li>commit-msg: 提交信息验证</li>
                                    <li>post-commit: 提交后操作</li>
                                    <li>pre-push: 推送前检查</li>
                                </ul>
                            </div>

                            <div className={styles.concept_item}>
                                <h4>🖥️ 服务端Hooks</h4>
                                <p>在远程仓库执行</p>
                                <ul>
                                    <li>pre-receive: 接收前检查</li>
                                    <li>update: 分支更新检查</li>
                                    <li>post-receive: 接收后操作</li>
                                    <li>post-update: 更新后操作</li>
                                </ul>
                            </div>
                        </div>

                        <Alert
                            message="Hook位置"
                            description="Git Hooks位于.git/hooks/目录下。客户端hooks可以被绕过，服务端hooks无法绕过。"
                            type="info"
                            showIcon
                        />
                    </div>
                </Card>

                {/* 客户端Hooks */}
                <Card title="💻 客户端 Hooks" className={styles.content_card}>
                    <div className={styles.usage_grid}>
                        <div className={styles.usage_item}>
                            <h4>1. pre-commit Hook</h4>
                            <div className={styles.code_block}>
                                <pre>
{`#!/bin/sh
# .git/hooks/pre-commit
# 提交前代码质量检查

echo "🔍 执行pre-commit检查..."

# 检查是否有暂存的文件
if git diff --cached --quiet; then
    echo "❌ 没有暂存的文件"
    exit 1
fi

# 运行ESLint检查
echo "📝 运行ESLint检查..."
npm run lint
if [ \$? -ne 0 ]; then
    echo "❌ ESLint检查失败"
    exit 1
fi

# 运行Prettier格式化检查
echo "🎨 检查代码格式..."
npm run format:check
if [ \$? -ne 0 ]; then
    echo "❌ 代码格式不符合规范"
    echo "💡 运行 'npm run format' 自动格式化"
    exit 1
fi

# 运行单元测试
echo "🧪 运行单元测试..."
npm test -- --watchAll=false
if [ \$? -ne 0 ]; then
    echo "❌ 单元测试失败"
    exit 1
fi

# 检查TypeScript类型
echo "🔍 检查TypeScript类型..."
npm run type-check
if [ \$? -ne 0 ]; then
    echo "❌ TypeScript类型检查失败"
    exit 1
fi

# 检查提交文件大小
echo "📏 检查文件大小..."
for file in \$(git diff --cached --name-only); do
    if [ -f "$file" ]; then
        size=\$(wc -c < "$file")
        if [ \$size -gt 1048576 ]; then  # 1MB
            echo "❌ 文件 \$file 过大 (\$((\$size / 1024))KB)"
            exit 1
        fi
    fi
done

# 检查敏感信息
echo "🔒 检查敏感信息..."
if git diff --cached | grep -E "(password|secret|key|token)" -i; then
    echo "❌ 检测到可能的敏感信息"
    echo "请确认是否包含密码、密钥等敏感数据"
    exit 1
fi

echo "✅ pre-commit检查通过"
exit 0`}
                                </pre>
                            </div>
                        </div>

                        <div className={styles.usage_item}>
                            <h4>2. commit-msg Hook</h4>
                            <div className={styles.code_block}>
                                <pre>
{`#!/bin/sh
# .git/hooks/commit-msg
# 验证提交信息格式

commit_regex='^(feat|fix|docs|style|refactor|test|chore|perf|ci|build|revert)(\(.+\))?: .{1,50}'

error_msg="❌ 提交信息格式错误！

正确格式: <type>[optional scope]: <description>

类型说明:
  feat:     新功能
  fix:      修复bug
  docs:     文档更新
  style:    代码格式化
  refactor: 重构
  test:     测试相关
  chore:    构建过程或辅助工具的变动
  perf:     性能优化
  ci:       CI配置文件和脚本的变动
  build:    构建系统或外部依赖的变动
  revert:   回滚提交

示例:
  feat: 添加用户登录功能
  fix(auth): 修复登录验证问题
  docs: 更新API文档"

# 读取提交信息
commit_message=\$(cat \$1)

# 检查提交信息格式
if ! echo "\$commit_message" | grep -qE "\$commit_regex"; then
    echo "\$error_msg"
    exit 1
fi

# 检查提交信息长度
if [ \${#commit_message} -gt 72 ]; then
    echo "❌ 提交信息过长，请控制在72个字符以内"
    exit 1
fi

# 检查是否包含中文（可选）
if echo "\$commit_message" | grep -q '[^\x00-\x7F]'; then
    echo "⚠️  提交信息包含非ASCII字符，建议使用英文"
fi

# 检查禁用词汇
forbidden_words="fuck|shit|damn|stupid"
if echo "\$commit_message" | grep -qiE "\$forbidden_words"; then
    echo "❌ 提交信息包含不当词汇"
    exit 1
fi

echo "✅ 提交信息格式正确"
exit 0`}
                                </pre>
                            </div>
                        </div>

                        <div className={styles.usage_item}>
                            <h4>3. pre-push Hook</h4>
                            <div className={styles.code_block}>
                                <pre>
{`#!/bin/sh
# .git/hooks/pre-push
# 推送前检查

remote="$1"
url="$2"

echo "🚀 执行pre-push检查..."
echo "推送到: \$remote (\$url)"

# 检查当前分支
current_branch=\$(git rev-parse --abbrev-ref HEAD)
echo "当前分支: \$current_branch"

# 禁止直接推送到主分支
protected_branches="main|master|develop"
if echo "\$current_branch" | grep -qE "^(\$protected_branches)\$"; then
    echo "❌ 禁止直接推送到保护分支: \$current_branch"
    echo "请通过Pull Request提交代码"
    exit 1
fi

# 检查是否有未提交的更改
if ! git diff-index --quiet HEAD --; then
    echo "❌ 存在未提交的更改"
    echo "请先提交所有更改"
    exit 1
fi

# 检查是否与远程分支同步
git fetch origin
local_commit=\$(git rev-parse HEAD)
remote_commit=\$(git rev-parse origin/\$current_branch 2>/dev/null)

if [ "\$remote_commit" != "" ] && [ "\$local_commit" != "\$remote_commit" ]; then
    # 检查是否需要合并
    merge_base=\$(git merge-base HEAD origin/\$current_branch)
    if [ "\$merge_base" != "\$remote_commit" ]; then
        echo "❌ 本地分支落后于远程分支"
        echo "请先执行: git pull origin \$current_branch"
        exit 1
    fi
fi

# 运行完整测试套件
echo "🧪 运行完整测试套件..."
npm run test:all
if [ \$? -ne 0 ]; then
    echo "❌ 测试失败，无法推送"
    exit 1
fi

# 检查构建
echo "🔨 检查构建..."
npm run build
if [ \$? -ne 0 ]; then
    echo "❌ 构建失败，无法推送"
    exit 1
fi

# 检查包大小
echo "📦 检查包大小..."
if [ -f "dist/bundle.js" ]; then
    size=\$(wc -c < "dist/bundle.js")
    max_size=5242880  # 5MB
    if [ \$size -gt \$max_size ]; then
        echo "❌ 构建包过大: \$((\$size / 1024 / 1024))MB"
        echo "请优化代码或分割包"
        exit 1
    fi
fi

echo "✅ pre-push检查通过"
exit 0`}
                                </pre>
                            </div>
                        </div>
                    </div>
                </Card>

                {/* 服务端Hooks */}
                <Card title="🖥️ 服务端 Hooks" className={styles.content_card}>
                    <div className={styles.server_section}>
                        <h3>pre-receive Hook</h3>
                        <div className={styles.code_block}>
                            <pre>
{`#!/bin/sh
# hooks/pre-receive
# 服务端接收前检查

echo "🔍 服务端pre-receive检查..."

while read oldrev newrev refname; do
    # 获取分支名
    branch=\$(echo \$refname | sed 's/refs\/heads\///')
    echo "检查分支: \$branch (\$oldrev -> \$newrev)"

    # 保护主分支
    if [ "\$branch" = "main" ] || [ "\$branch" = "master" ]; then
        # 检查是否是强制推送
        if [ "\$oldrev" != "0000000000000000000000000000000000000000" ]; then
            # 检查是否是快进合并
            if ! git merge-base --is-ancestor \$oldrev \$newrev; then
                echo "❌ 禁止强制推送到主分支"
                exit 1
            fi
        fi
        
        # 检查提交者权限
        committer=\$(git log -1 --format='%ce' \$newrev)
        if ! echo "\$committer" | grep -q "@company.com\$"; then
            echo "❌ 只有公司邮箱可以推送到主分支"
            exit 1
        fi
    fi
    
    # 检查提交信息
    for commit in \$(git rev-list \$oldrev..\$newrev); do
        msg=\$(git log -1 --format='%s' \$commit)
        if ! echo "\$msg" | grep -qE '^(feat|fix|docs|style|refactor|test|chore)(\(.+\))?: .+'; then
            echo "❌ 提交信息格式错误: \$msg"
            exit 1
        fi
    done
    
    # 检查文件大小
    for commit in \$(git rev-list \$oldrev..\$newrev); do
        for file in \$(git diff-tree --no-commit-id --name-only -r \$commit); do
            size=\$(git cat-file -s \$commit:\$file 2>/dev/null || echo 0)
            if [ \$size -gt 10485760 ]; then  # 10MB
                echo "❌ 文件过大: \$file (\$((\$size / 1024 / 1024))MB)"
                exit 1
            fi
        done
    done
done

echo "✅ 服务端检查通过"
exit 0`}
                            </pre>
                        </div>

                        <h3>post-receive Hook</h3>
                        <div className={styles.code_block}>
                            <pre>
{`#!/bin/sh
# hooks/post-receive
# 服务端接收后操作

echo "📨 执行post-receive操作..."

while read oldrev newrev refname; do
    branch=\$(echo \$refname | sed 's/refs\/heads\///')
    
    echo "处理分支: \$branch"

    # 主分支自动部署
    if [ "\$branch" = "main" ]; then
        echo "🚀 开始自动部署..."
        
        # 更新工作目录
        cd /var/www/app
        git --git-dir=/var/repo/app.git --work-tree=/var/www/app checkout -f
        
        # 安装依赖
        npm ci --production
        
        # 构建项目
        npm run build
        
        # 重启服务
        sudo systemctl restart app
        
        # 发送部署通知
        curl -X POST https://hooks.slack.com/services/YOUR/SLACK/WEBHOOK \
            -H 'Content-type: application/json' \
            --data "{\"text\":\"✅ 应用已成功部署到生产环境\\n分支: \$branch\\n提交: \$newrev\"}"
        
        echo "✅ 部署完成"
    fi
    
    # 开发分支部署到测试环境
    if [ "\$branch" = "develop" ]; then
        echo "🧪 部署到测试环境..."
        
        # 触发CI/CD流水线
        curl -X POST https://api.github.com/repos/owner/repo/dispatches \
            -H "Authorization: token \$GITHUB_TOKEN" \
            -H "Accept: application/vnd.github.everest-preview+json" \
            --data '{"event_type": "deploy-staging", "client_payload": {"branch": "'\$branch'", "commit": "'\$newrev'"}}'
    fi
    
    # 发送邮件通知
    git log -1 --format="提交者: %an <%ae>%n时间: %ad%n信息: %s%n%n%b" \$newrev | \
    mail -s "代码推送通知: \$branch" team@company.com
    
done

echo "✅ post-receive操作完成"
exit 0`}
                            </pre>
                        </div>
                    </div>
                </Card>

                {/* Husky工具 */}
                <Card title="🐕 Husky 工具" className={styles.content_card}>
                    <div className={styles.husky_section}>
                        <h3>Husky安装与配置</h3>
                        <div className={styles.code_block}>
                            <pre>
{`# 安装Husky
npm install --save-dev husky

# 初始化Husky
npx husky install

# 添加到package.json
npm pkg set scripts.prepare="husky install"

# 创建pre-commit hook
npx husky add .husky/pre-commit "npm run lint && npm run test"

# 创建commit-msg hook
npx husky add .husky/commit-msg 'npx --no -- commitlint --edit "$1"'

# package.json配置
{
  "scripts": {
    "prepare": "husky install",
    "lint": "eslint src --ext .js,.jsx,.ts,.tsx",
    "lint:fix": "eslint src --ext .js,.jsx,.ts,.tsx --fix",
    "format": "prettier --write src/**/*.{js,jsx,ts,tsx,json,css,md}",
    "format:check": "prettier --check src/**/*.{js,jsx,ts,tsx,json,css,md}",
    "test": "jest",
    "type-check": "tsc --noEmit"
  },
  "devDependencies": {
    "husky": "^8.0.0",
    "@commitlint/cli": "^17.0.0",
    "@commitlint/config-conventional": "^17.0.0",
    "lint-staged": "^13.0.0"
  }
}`}
                            </pre>
                        </div>

                        <h3>lint-staged集成</h3>
                        <div className={styles.code_block}>
                            <pre>
{`# 安装lint-staged
npm install --save-dev lint-staged

# .husky/pre-commit
#!/usr/bin/env sh
. "\$(dirname -- "\$0")/_/husky.sh"

npx lint-staged

# package.json配置
{
  "lint-staged": {
    "*.{js,jsx,ts,tsx}": [
      "eslint --fix",
      "prettier --write",
      "git add"
    ],
    "*.{json,css,md}": [
      "prettier --write",
      "git add"
    ],
    "*.{js,jsx,ts,tsx}": [
      "npm run test -- --findRelatedTests --passWithNoTests"
    ]
  }
}

# commitlint配置
# commitlint.config.js
module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat',
        'fix',
        'docs',
        'style',
        'refactor',
        'test',
        'chore',
        'perf',
        'ci',
        'build',
        'revert'
      ]
    ],
    'subject-max-length': [2, 'always', 50],
    'body-max-line-length': [2, 'always', 72]
  }
}

# 高级配置示例
# .husky/pre-commit
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

echo "🔍 运行pre-commit检查..."

# 检查分支名称
branch=\$(git rev-parse --abbrev-ref HEAD)
valid_pattern="^(feature|bugfix|hotfix|release)\/[a-z0-9-]+$"

if [[ "\$branch" != "main" && "\$branch" != "develop" && ! "\$branch" =~ \$valid_pattern ]]; then
    echo "❌ 分支名称不符合规范: \$branch"
    echo "正确格式: feature/xxx, bugfix/xxx, hotfix/xxx, release/xxx"
    exit 1
fi

# 运行lint-staged
npx lint-staged

echo "✅ pre-commit检查完成"`}
                            </pre>
                        </div>
                    </div>
                </Card>

                {/* 最佳实践 */}
                <Card title="✅ Git Hooks 最佳实践" className={styles.content_card}>
                    <div className={styles.best_practices}>
                        <div className={styles.practice_item}>
                            <CheckCircleOutlined className={styles.practice_icon} />
                            <div>
                                <h4>1. Hook设计原则</h4>
                                <p>设计高效的Git Hooks</p>
                                <ul>
                                    <li>保持Hook脚本简洁高效</li>
                                    <li>提供清晰的错误信息</li>
                                    <li>支持跳过机制（--no-verify）</li>
                                    <li>记录Hook执行日志</li>
                                </ul>
                            </div>
                        </div>

                        <div className={styles.practice_item}>
                            <CheckCircleOutlined className={styles.practice_icon} />
                            <div>
                                <h4>2. 性能优化</h4>
                                <p>优化Hook执行性能</p>
                                <ul>
                                    <li>只检查变更的文件</li>
                                    <li>并行执行检查任务</li>
                                    <li>使用缓存机制</li>
                                    <li>避免重复检查</li>
                                </ul>
                            </div>
                        </div>

                        <div className={styles.practice_item}>
                            <CheckCircleOutlined className={styles.practice_icon} />
                            <div>
                                <h4>3. 团队协作</h4>
                                <p>确保团队一致性</p>
                                <ul>
                                    <li>使用Husky管理Hooks</li>
                                    <li>版本控制Hook配置</li>
                                    <li>文档化Hook规则</li>
                                    <li>定期更新Hook脚本</li>
                                </ul>
                            </div>
                        </div>

                        <div className={styles.practice_item}>
                            <CheckCircleOutlined className={styles.practice_icon} />
                            <div>
                                <h4>4. 安全考虑</h4>
                                <p>确保Hook安全性</p>
                                <ul>
                                    <li>验证Hook脚本来源</li>
                                    <li>限制Hook执行权限</li>
                                    <li>审计Hook执行日志</li>
                                    <li>防止恶意代码注入</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    )
}

export default GitHooksDetail
