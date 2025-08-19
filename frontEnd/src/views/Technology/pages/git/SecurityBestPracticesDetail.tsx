import React from 'react'
import { Card, Tag, Alert, Divider, Button } from 'antd'
import { useNavigate } from 'react-router-dom'
import { 
    ArrowLeftOutlined, 
    SafetyOutlined, 
    WarningOutlined,
    CheckCircleOutlined,
    BugOutlined
} from '@ant-design/icons'
import styles from '@/styles/topicDetail.module.scss'

const SecurityBestPracticesDetail: React.FC = () => {
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
                    <SafetyOutlined />
                </div>
                <div className={styles.topic_info}>
                    <h1>Git 安全最佳实践详解</h1>
                    <p>掌握Git和GitHub的安全防护与最佳实践</p>
                    <div className={styles.topic_tags}>
                        <Tag color="blue">Git安全</Tag>
                        <Tag color="green">最佳实践</Tag>
                        <Tag color="orange">安全防护</Tag>
                        <Tag color="purple">权限管理</Tag>
                    </div>
                </div>
            </div>
            
            {/* 内容区域 */}
            <div className={styles.content_sections}>
                {/* 安全威胁概述 */}
                <Card title="🛡️ Git 安全威胁概述" className={styles.content_card}>
                    <div className={styles.concept_content}>
                        <h3>常见安全威胁</h3>
                        <p>Git和GitHub作为代码管理的核心工具，面临着多种安全威胁。了解这些威胁是制定有效防护策略的第一步。</p>
                        
                        <div className={styles.concepts_grid}>
                            <div className={styles.concept_item}>
                                <h4>🔐 凭据泄露</h4>
                                <p>敏感信息意外提交</p>
                                <ul>
                                    <li>API密钥和令牌</li>
                                    <li>数据库连接字符串</li>
                                    <li>私钥和证书</li>
                                    <li>密码和配置文件</li>
                                </ul>
                            </div>
                            
                            <div className={styles.concept_item}>
                                <h4>👤 身份伪造</h4>
                                <p>提交身份验证问题</p>
                                <ul>
                                    <li>伪造提交者信息</li>
                                    <li>未签名的提交</li>
                                    <li>账户劫持</li>
                                    <li>社会工程攻击</li>
                                </ul>
                            </div>
                            
                            <div className={styles.concept_item}>
                                <h4>🔓 权限滥用</h4>
                                <p>访问控制不当</p>
                                <ul>
                                    <li>过度权限分配</li>
                                    <li>权限管理不当</li>
                                    <li>分支保护不足</li>
                                    <li>第三方应用风险</li>
                                </ul>
                            </div>
                            
                            <div className={styles.concept_item}>
                                <h4>🦠 恶意代码</h4>
                                <p>代码安全威胁</p>
                                <ul>
                                    <li>恶意依赖包</li>
                                    <li>供应链攻击</li>
                                    <li>代码注入</li>
                                    <li>后门植入</li>
                                </ul>
                            </div>
                        </div>
                        
                        <Alert
                            message="安全提醒"
                            description="一旦敏感信息被提交到Git历史中，即使后续删除，仍可能被恶意用户获取。预防胜于治疗。"
                            type="warning"
                            showIcon
                        />
                    </div>
                </Card>
                
                {/* 敏感信息防护 */}
                <Card title="🔒 敏感信息防护" className={styles.content_card}>
                    <div className={styles.usage_grid}>
                        <div className={styles.usage_item}>
                            <h4>1. 环境变量管理</h4>
                            <div className={styles.code_block}>
                                <pre>
{`# .env文件管理
# 创建环境变量文件
# .env (本地开发)
DATABASE_URL=postgresql://localhost:5432/myapp_dev
API_KEY=dev-api-key-12345
JWT_SECRET=dev-jwt-secret-67890

# .env.production (生产环境)
DATABASE_URL=postgresql://prod-server:5432/myapp_prod
API_KEY=prod-api-key-abcde
JWT_SECRET=prod-jwt-secret-fghij

# .gitignore配置
# 环境变量文件
.env
.env.local
.env.development
.env.production
.env.test

# 配置文件
config/database.yml
config/secrets.yml
*.pem
*.key
*.p12

# 日志文件
*.log
logs/

# 临时文件
tmp/
temp/
.cache/

# IDE配置
.vscode/settings.json
.idea/

# 操作系统文件
.DS_Store
Thumbs.db

# 应用代码中使用环境变量
// Node.js
const config = {
    database: {
        url: process.env.DATABASE_URL,
        ssl: process.env.NODE_ENV === 'production'
    },
    api: {
        key: process.env.API_KEY,
        secret: process.env.API_SECRET
    },
    jwt: {
        secret: process.env.JWT_SECRET,
        expiresIn: process.env.JWT_EXPIRES_IN || '24h'
    }
}

// React
const config = {
    apiUrl: process.env.REACT_APP_API_URL,
    environment: process.env.NODE_ENV
}

// 环境变量验证
const requiredEnvVars = [
    'DATABASE_URL',
    'API_KEY', 
    'JWT_SECRET'
]

requiredEnvVars.forEach(envVar => {
    if (!process.env[envVar]) {
        throw new Error(\`Missing required environment variable: \${envVar}\`)
    }
})`}
                                </pre>
                            </div>
                        </div>
                        
                        <div className={styles.usage_item}>
                            <h4>2. Git Secrets工具</h4>
                            <div className={styles.code_block}>
                                <pre>
{`# 安装git-secrets
# macOS
brew install git-secrets

# Ubuntu/Debian
sudo apt-get install git-secrets

# 初始化git-secrets
git secrets --install
git secrets --register-aws

# 添加自定义规则
# 检测API密钥
git secrets --add 'api[_-]?key[_-]?[=:]["\']?[a-zA-Z0-9]{20,}'

# 检测JWT令牌
git secrets --add 'jwt[_-]?token[_-]?[=:]["\']?[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*'

# 检测数据库连接字符串
git secrets --add 'postgresql://[^\\s]+'
git secrets --add 'mysql://[^\\s]+'
git secrets --add 'mongodb://[^\\s]+'

# 检测私钥
git secrets --add '-----BEGIN [A-Z]+ PRIVATE KEY-----'

# 检测密码字段
git secrets --add 'password[_-]?[=:]["\']?[^\\s"\']{8,}'

# 全局配置
git secrets --install ~/.git-templates/git-secrets
git config --global init.templateDir ~/.git-templates/git-secrets

# 扫描现有仓库
git secrets --scan

# 扫描历史记录
git secrets --scan-history

# 在CI/CD中使用
# .github/workflows/security.yml
name: Security Scan
on: [push, pull_request]

jobs:
  secrets-scan:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
        with:
          fetch-depth: 0
      
      - name: Install git-secrets
        run: |
          git clone https://github.com/awslabs/git-secrets.git
          cd git-secrets && sudo make install
      
      - name: Configure git-secrets
        run: |
          git secrets --register-aws
          git secrets --install
      
      - name: Scan for secrets
        run: git secrets --scan-history`}
                                </pre>
                            </div>
                        </div>
                        
                        <div className={styles.usage_item}>
                            <h4>3. 敏感信息清理</h4>
                            <div className={styles.code_block}>
                                <pre>
{`# 使用BFG Repo-Cleaner清理历史
# 下载BFG
wget https://repo1.maven.org/maven2/com/madgag/bfg/1.14.0/bfg-1.14.0.jar

# 删除包含密码的文件
java -jar bfg.jar --delete-files passwords.txt

# 替换敏感字符串
java -jar bfg.jar --replace-text replacements.txt

# replacements.txt内容示例
api_key_12345==>[REMOVED]
password123==>[REMOVED]
secret_token_xyz==>[REMOVED]

# 清理.git目录
git reflog expire --expire=now --all
git gc --prune=now --aggressive

# 使用git filter-branch (较慢但更精确)
# 删除特定文件
git filter-branch --force --index-filter \
  'git rm --cached --ignore-unmatch config/secrets.yml' \
  --prune-empty --tag-name-filter cat -- --all

# 替换敏感内容
git filter-branch --force --tree-filter \
  'find . -name "*.js" -exec sed -i "s/api_key_12345/[REMOVED]/g" {} \\;' \
  --prune-empty --tag-name-filter cat -- --all

# 强制推送清理后的历史 (危险操作!)
git push origin --force --all
git push origin --force --tags

# 通知团队成员重新克隆仓库
echo "警告: 仓库历史已被重写，请重新克隆仓库"

# 预防措施脚本
#!/bin/bash
# pre-commit-security-check.sh

# 检查常见敏感信息模式
PATTERNS=(
    "password[\\s]*[=:]"
    "api[_-]?key[\\s]*[=:]"
    "secret[\\s]*[=:]"
    "token[\\s]*[=:]"
    "-----BEGIN.*PRIVATE KEY-----"
    "postgresql://.*:.*@"
    "mysql://.*:.*@"
)

for pattern in "\${PATTERNS[@]}"; do
    if git diff --cached | grep -iE "\$pattern"; then
        echo "❌ 检测到可能的敏感信息: \$pattern"
        echo "请检查并移除敏感信息后再提交"
        exit 1
    fi
done

echo "✅ 安全检查通过"`}
                                </pre>
                            </div>
                        </div>
                    </div>
                </Card>
                
                {/* 身份验证与签名 */}
                <Card title="✍️ 身份验证与签名" className={styles.content_card}>
                    <div className={styles.security_section}>
                        <h3>GPG签名配置</h3>
                        <div className={styles.code_block}>
                            <pre>
{`# 生成GPG密钥
gpg --full-generate-key

# 选择密钥类型 (推荐RSA 4096位)
# 设置有效期 (推荐1-2年)
# 输入用户信息 (与Git配置一致)

# 列出GPG密钥
gpg --list-secret-keys --keyid-format LONG

# 输出示例:
# sec   rsa4096/ABC123DEF456 2023-01-01 [SC] [expires: 2025-01-01]
# uid                 [ultimate] Your Name <your.email@example.com>
# ssb   rsa4096/XYZ789ABC123 2023-01-01 [E] [expires: 2025-01-01]

# 配置Git使用GPG签名
git config --global user.signingkey ABC123DEF456
git config --global commit.gpgsign true
git config --global tag.gpgsign true

# 导出公钥添加到GitHub
gpg --armor --export ABC123DEF456

# 配置GPG程序路径 (如果需要)
git config --global gpg.program gpg

# 签名提交
git commit -S -m "Signed commit message"

# 验证签名
git log --show-signature

# 批量签名历史提交 (谨慎使用)
git rebase --exec 'git commit --amend --no-edit -S' -i HEAD~10

# GPG密钥管理
# 备份密钥
gpg --export-secret-keys ABC123DEF456 > private-key-backup.asc
gpg --export ABC123DEF456 > public-key-backup.asc

# 恢复密钥
gpg --import private-key-backup.asc
gpg --import public-key-backup.asc

# 撤销密钥
gpg --gen-revoke ABC123DEF456 > revocation-certificate.asc

# 密钥服务器操作
# 上传公钥到密钥服务器
gpg --keyserver keyserver.ubuntu.com --send-keys ABC123DEF456

# 从密钥服务器获取公钥
gpg --keyserver keyserver.ubuntu.com --recv-keys ABC123DEF456

# 自动化签名脚本
#!/bin/bash
# setup-gpg-signing.sh

echo "🔐 配置GPG签名..."

# 检查是否已有GPG密钥
if ! gpg --list-secret-keys | grep -q "sec"; then
    echo "未找到GPG密钥，请先生成密钥:"
    echo "gpg --full-generate-key"
    exit 1
fi

# 获取密钥ID
KEY_ID=\$(gpg --list-secret-keys --keyid-format LONG | grep "sec" | head -1 | sed 's/.*\\/\\([A-F0-9]\\{16\\}\\).*/\\1/')

if [ -z "\$KEY_ID" ]; then
    echo "❌ 无法获取GPG密钥ID"
    exit 1
fi

echo "找到GPG密钥: \$KEY_ID"

# 配置Git
git config --global user.signingkey "\$KEY_ID"
git config --global commit.gpgsign true
git config --global tag.gpgsign true

echo "✅ GPG签名配置完成"
echo "公钥内容 (添加到GitHub):"
gpg --armor --export "\$KEY_ID"`}
                            </pre>
                        </div>
                        
                        <h3>SSH密钥管理</h3>
                        <div className={styles.code_block}>
                            <pre>
{`# 生成SSH密钥
# ED25519密钥 (推荐)
ssh-keygen -t ed25519 -C "your.email@example.com" -f ~/.ssh/id_ed25519

# RSA密钥 (兼容性更好)
ssh-keygen -t rsa -b 4096 -C "your.email@example.com" -f ~/.ssh/id_rsa

# 配置SSH密钥权限
chmod 700 ~/.ssh
chmod 600 ~/.ssh/id_ed25519
chmod 644 ~/.ssh/id_ed25519.pub

# SSH配置文件
# ~/.ssh/config
Host github.com
    HostName github.com
    User git
    IdentityFile ~/.ssh/id_ed25519
    IdentitiesOnly yes

Host gitlab.com
    HostName gitlab.com
    User git
    IdentityFile ~/.ssh/id_rsa
    IdentitiesOnly yes

# 多账户配置
Host github-work
    HostName github.com
    User git
    IdentityFile ~/.ssh/id_work
    IdentitiesOnly yes

Host github-personal
    HostName github.com
    User git
    IdentityFile ~/.ssh/id_personal
    IdentitiesOnly yes

# 使用不同账户
git clone git@github-work:company/repo.git
git clone git@github-personal:username/repo.git

# SSH Agent配置
# 启动SSH Agent
eval "\$(ssh-agent -s)"

# 添加密钥到SSH Agent
ssh-add ~/.ssh/id_ed25519

# 持久化SSH Agent (macOS)
# ~/.ssh/config
Host *
    AddKeysToAgent yes
    UseKeychain yes
    IdentityFile ~/.ssh/id_ed25519

# 测试SSH连接
ssh -T git@github.com

# SSH密钥轮换脚本
#!/bin/bash
# rotate-ssh-keys.sh

OLD_KEY="\$1"
NEW_KEY="\$2"

if [ -z "\$OLD_KEY" ] || [ -z "\$NEW_KEY" ]; then
    echo "用法: \$0 <old_key_path> <new_key_path>"
    exit 1
fi

echo "🔄 轮换SSH密钥..."

# 生成新密钥
ssh-keygen -t ed25519 -C "rotated-key-\$(date +%Y%m%d)" -f "\$NEW_KEY"

echo "✅ 新密钥已生成: \$NEW_KEY"
echo "📋 请将以下公钥添加到GitHub:"
cat "\$NEW_KEY.pub"

read -p "添加完成后按Enter继续..."

# 测试新密钥
ssh -i "\$NEW_KEY" -T git@github.com

if [ \$? -eq 1 ]; then
    echo "✅ 新密钥测试成功"
    echo "🗑️  请手动删除旧密钥: \$OLD_KEY"
else
    echo "❌ 新密钥测试失败"
    exit 1
fi`}
                            </pre>
                        </div>
                    </div>
                </Card>
                
                {/* 权限管理 */}
                <Card title="👥 权限管理与访问控制" className={styles.content_card}>
                    <div className={styles.access_section}>
                        <h3>GitHub权限管理</h3>
                        <div className={styles.code_block}>
                            <pre>
{`# 仓库权限级别
# Read: 克隆和拉取
# Triage: Read + 管理issues和PR
# Write: Triage + 推送到非保护分支
# Maintain: Write + 管理仓库设置
# Admin: 完全控制权限

# 分支保护规则
# 通过GitHub Web界面或API配置
{
  "required_status_checks": {
    "strict": true,
    "contexts": ["ci/tests", "ci/lint"]
  },
  "enforce_admins": true,
  "required_pull_request_reviews": {
    "required_approving_review_count": 2,
    "dismiss_stale_reviews": true,
    "require_code_owner_reviews": true,
    "restrict_pushes": true
  },
  "restrictions": {
    "users": ["admin-user"],
    "teams": ["core-team"]
  }
}

# CODEOWNERS文件
# .github/CODEOWNERS
# 全局所有者
* @team-leads

# 前端代码
/frontend/ @frontend-team
*.js @frontend-team
*.jsx @frontend-team
*.ts @frontend-team
*.tsx @frontend-team

# 后端代码
/backend/ @backend-team
*.py @backend-team
*.java @backend-team

# 基础设施
/docker/ @devops-team
/k8s/ @devops-team
Dockerfile @devops-team

# 文档
/docs/ @tech-writers
*.md @tech-writers

# 配置文件
/.github/ @admin-team
/config/ @admin-team

# 团队管理
# 创建团队
curl -X POST \\
  https://api.github.com/orgs/ORG/teams \\
  -H "Authorization: token \$GITHUB_TOKEN" \\
  -d '{
    "name": "frontend-team",
    "description": "Frontend development team",
    "privacy": "closed",
    "permission": "push"
  }'

# 添加团队成员
curl -X PUT \\
  https://api.github.com/orgs/ORG/teams/TEAM/memberships/USERNAME \\
  -H "Authorization: token \$GITHUB_TOKEN" \\
  -d '{"role": "member"}'

# 设置仓库权限
curl -X PUT \\
  https://api.github.com/orgs/ORG/teams/TEAM/repos/ORG/REPO \\
  -H "Authorization: token \$GITHUB_TOKEN" \\
  -d '{"permission": "push"}'

# 权限审计脚本
#!/bin/bash
# audit-permissions.sh

ORG="your-org"
TOKEN="\$GITHUB_TOKEN"

echo "📊 GitHub权限审计报告"
echo "组织: \$ORG"
echo "时间: \$(date)"
echo "=========================="

# 获取所有仓库
repos=\$(curl -s -H "Authorization: token \$TOKEN" \\
  "https://api.github.com/orgs/\$ORG/repos?per_page=100" | \\
  jq -r '.[].name')

for repo in \$repos; do
    echo "\\n📁 仓库: \$repo"
    
    # 获取协作者
    collaborators=\$(curl -s -H "Authorization: token \$TOKEN" \\
      "https://api.github.com/repos/\$ORG/\$repo/collaborators" | \\
      jq -r '.[] | "\\(.login) (\\(.permissions.admin // false | if . then "admin" else if .permissions.push then "write" else "read" end end))"')
    
    echo "👥 协作者:"
    echo "\$collaborators"
    
    # 检查分支保护
    protection=\$(curl -s -H "Authorization: token \$TOKEN" \\
      "https://api.github.com/repos/\$ORG/\$repo/branches/main/protection" 2>/dev/null)
    
    if [ "\$protection" != "null" ]; then
        echo "🛡️  主分支已保护"
    else
        echo "⚠️  主分支未保护"
    fi
done`}
                            </pre>
                        </div>
                        
                        <h3>访问令牌管理</h3>
                        <div className={styles.code_block}>
                            <pre>
{`# Personal Access Token (PAT) 最佳实践

# 1. 最小权限原则
# 只授予必要的权限范围
# 常用权限范围:
# - repo: 完整仓库访问
# - public_repo: 公共仓库访问
# - read:org: 读取组织信息
# - workflow: GitHub Actions访问

# 2. 令牌轮换
# 定期更换访问令牌 (建议3-6个月)

# 3. 环境隔离
# 开发环境令牌
GITHUB_TOKEN_DEV=ghp_xxxxxxxxxxxxxxxxxxxx

# 生产环境令牌
GITHUB_TOKEN_PROD=ghp_yyyyyyyyyyyyyyyyyyyy

# CI/CD环境令牌
GITHUB_TOKEN_CI=ghp_zzzzzzzzzzzzzzzzzzzz

# 4. 令牌存储
# 使用密钥管理服务
# AWS Secrets Manager
aws secretsmanager create-secret \\
  --name "github-token" \\
  --description "GitHub Personal Access Token" \\
  --secret-string "\$GITHUB_TOKEN"

# Azure Key Vault
az keyvault secret set \\
  --vault-name "MyKeyVault" \\
  --name "github-token" \\
  --value "\$GITHUB_TOKEN"

# 5. 令牌监控
# 监控令牌使用情况
curl -H "Authorization: token \$GITHUB_TOKEN" \\
  https://api.github.com/user

# 检查令牌权限
curl -H "Authorization: token \$GITHUB_TOKEN" \\
  https://api.github.com/user/repos

# 6. 自动化令牌管理
#!/bin/bash
# token-rotation.sh

OLD_TOKEN="\$1"
NEW_TOKEN="\$2"

if [ -z "\$OLD_TOKEN" ] || [ -z "\$NEW_TOKEN" ]; then
    echo "用法: \$0 <old_token> <new_token>"
    exit 1
fi

echo "🔄 开始令牌轮换..."

# 测试新令牌
if curl -s -H "Authorization: token \$NEW_TOKEN" \\
   https://api.github.com/user > /dev/null; then
    echo "✅ 新令牌验证成功"
else
    echo "❌ 新令牌验证失败"
    exit 1
fi

# 更新环境变量
echo "📝 请更新以下位置的令牌:"
echo "- CI/CD系统环境变量"
echo "- 密钥管理服务"
echo "- 本地开发环境"
echo "- 部署脚本"

# 验证旧令牌是否仍然有效
if curl -s -H "Authorization: token \$OLD_TOKEN" \\
   https://api.github.com/user > /dev/null; then
    echo "⚠️  旧令牌仍然有效，请在GitHub设置中撤销"
else
    echo "✅ 旧令牌已失效"
fi

# GitHub App认证 (推荐用于组织)
# 生成JWT令牌
generate_jwt() {
    local app_id="\$1"
    local private_key_path="\$2"
    
    # JWT头部
    header='{"alg":"RS256","typ":"JWT"}'
    
    # JWT载荷
    now=\$(date +%s)
    exp=\$((\$now + 600)) # 10分钟过期
    payload='{"iat":'\$now',"exp":'\$exp',"iss":'\$app_id'}'
    
    # 生成JWT
    jwt=\$(echo -n "\$header" | base64 -w 0 | tr -d '=' | tr '/+' '_-')
    jwt="\$jwt."\$(echo -n "\$payload" | base64 -w 0 | tr -d '=' | tr '/+' '_-')
    
    signature=\$(echo -n "\$jwt" | openssl dgst -sha256 -sign "\$private_key_path" | base64 -w 0 | tr -d '=' | tr '/+' '_-')
    
    echo "\$jwt.\$signature"
}

# 获取安装访问令牌
get_installation_token() {
    local jwt="\$1"
    local installation_id="\$2"
    
    curl -X POST \\
      -H "Authorization: Bearer \$jwt" \\
      -H "Accept: application/vnd.github.v3+json" \\
      "https://api.github.com/app/installations/\$installation_id/access_tokens" | \\
      jq -r '.token'
}`}
                            </pre>
                        </div>
                    </div>
                </Card>
                
                {/* 最佳实践 */}
                <Card title="✅ Git 安全最佳实践" className={styles.content_card}>
                    <div className={styles.best_practices}>
                        <div className={styles.practice_item}>
                            <CheckCircleOutlined className={styles.practice_icon} />
                            <div>
                                <h4>1. 预防措施</h4>
                                <p>建立安全防护机制</p>
                                <ul>
                                    <li>配置.gitignore忽略敏感文件</li>
                                    <li>使用环境变量管理配置</li>
                                    <li>部署Git Hooks进行检查</li>
                                    <li>定期进行安全审计</li>
                                </ul>
                            </div>
                        </div>
                        
                        <div className={styles.practice_item}>
                            <CheckCircleOutlined className={styles.practice_icon} />
                            <div>
                                <h4>2. 身份验证</h4>
                                <p>确保提交身份可信</p>
                                <ul>
                                    <li>启用GPG签名验证</li>
                                    <li>使用强密码和2FA</li>
                                    <li>定期轮换访问令牌</li>
                                    <li>监控异常登录活动</li>
                                </ul>
                            </div>
                        </div>
                        
                        <div className={styles.practice_item}>
                            <CheckCircleOutlined className={styles.practice_icon} />
                            <div>
                                <h4>3. 权限控制</h4>
                                <p>实施最小权限原则</p>
                                <ul>
                                    <li>合理分配仓库权限</li>
                                    <li>配置分支保护规则</li>
                                    <li>使用CODEOWNERS文件</li>
                                    <li>定期审查权限分配</li>
                                </ul>
                            </div>
                        </div>
                        
                        <div className={styles.practice_item}>
                            <CheckCircleOutlined className={styles.practice_icon} />
                            <div>
                                <h4>4. 应急响应</h4>
                                <p>制定安全事件响应计划</p>
                                <ul>
                                    <li>建立事件响应流程</li>
                                    <li>准备历史清理工具</li>
                                    <li>制定通知机制</li>
                                    <li>定期演练应急预案</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    )
}

export default SecurityBestPracticesDetail
