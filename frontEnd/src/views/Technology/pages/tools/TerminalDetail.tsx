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

const TerminalDetail: React.FC = () => {
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
                    <h1>终端工具详解</h1>
                    <p>掌握现代终端工具与命令行技巧</p>
                    <div className={styles.topic_tags}>
                        <Tag color="blue">终端工具</Tag>
                        <Tag color="green">命令行</Tag>
                        <Tag color="orange">Shell脚本</Tag>
                        <Tag color="purple">效率提升</Tag>
                    </div>
                </div>
            </div>
            
            {/* 内容区域 */}
            <div className={styles.content_sections}>
                {/* 终端工具概述 */}
                <Card title="💻 现代终端工具" className={styles.content_card}>
                    <div className={styles.concept_content}>
                        <h3>为什么需要现代终端？</h3>
                        <p>现代终端工具提供了更好的用户体验、更强的功能和更高的效率。它们支持语法高亮、自动补全、主题定制等功能，让命令行操作变得更加友好和高效。</p>
                        
                        <h3>热门终端工具</h3>
                        <div className={styles.concepts_grid}>
                            <div className={styles.concept_item}>
                                <h4>🚀 Windows Terminal</h4>
                                <p>微软官方现代终端</p>
                                <ul>
                                    <li>多标签页支持</li>
                                    <li>GPU加速渲染</li>
                                    <li>丰富的自定义选项</li>
                                    <li>多种Shell支持</li>
                                </ul>
                            </div>
                            
                            <div className={styles.concept_item}>
                                <h4>⚡ iTerm2</h4>
                                <p>macOS强大终端工具</p>
                                <ul>
                                    <li>分屏功能</li>
                                    <li>搜索和回放</li>
                                    <li>触发器和配置文件</li>
                                    <li>Shell集成</li>
                                </ul>
                            </div>
                            
                            <div className={styles.concept_item}>
                                <h4>🎨 Hyper</h4>
                                <p>基于Web技术的终端</p>
                                <ul>
                                    <li>插件生态</li>
                                    <li>主题定制</li>
                                    <li>跨平台支持</li>
                                    <li>JavaScript扩展</li>
                                </ul>
                            </div>
                            
                            <div className={styles.concept_item}>
                                <h4>🔥 Alacritty</h4>
                                <p>GPU加速的高性能终端</p>
                                <ul>
                                    <li>极快的渲染速度</li>
                                    <li>跨平台支持</li>
                                    <li>配置文件驱动</li>
                                    <li>最小化设计</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </Card>
                
                {/* Shell配置 */}
                <Card title="🐚 Shell 配置优化" className={styles.content_card}>
                    <div className={styles.usage_grid}>
                        <div className={styles.usage_item}>
                            <h4>1. Zsh + Oh My Zsh</h4>
                            <div className={styles.code_block}>
                                <pre>
{`# 安装Zsh (macOS)
brew install zsh

# 安装Oh My Zsh
sh -c "$(curl -fsSL https://raw.github.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"

# ~/.zshrc 配置
# 主题设置
ZSH_THEME="powerlevel10k/powerlevel10k"

# 插件配置
plugins=(
    git
    zsh-autosuggestions
    zsh-syntax-highlighting
    z
    docker
    npm
    node
    vscode
    extract
    web-search
)

# 自定义别名
alias ll="ls -alF"
alias la="ls -A"
alias l="ls -CF"
alias ..="cd .."
alias ...="cd ../.."
alias ....="cd ../../.."

# Git别名
alias gs="git status"
alias ga="git add"
alias gc="git commit"
alias gp="git push"
alias gl="git pull"
alias gd="git diff"
alias gb="git branch"
alias gco="git checkout"

# 开发相关别名
alias ni="npm install"
alias ns="npm start"
alias nt="npm test"
alias nb="npm run build"
alias nrd="npm run dev"

# 目录跳转
alias projects="cd ~/Projects"
alias downloads="cd ~/Downloads"
alias desktop="cd ~/Desktop"

# 系统信息
alias myip="curl http://ipecho.net/plain; echo"
alias ports="netstat -tulanp"

# 安装有用的插件
# zsh-autosuggestions
git clone https://github.com/zsh-users/zsh-autosuggestions \${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-autosuggestions

# zsh-syntax-highlighting  
git clone https://github.com/zsh-users/zsh-syntax-highlighting.git \${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-syntax-highlighting

# powerlevel10k主题
git clone --depth=1 https://github.com/romkatv/powerlevel10k.git \${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/themes/powerlevel10k`}
                                </pre>
                            </div>
                        </div>
                        
                        <div className={styles.usage_item}>
                            <h4>2. PowerShell配置</h4>
                            <div className={styles.code_block}>
                                <pre>
{`# 安装PowerShell 7
# Windows
winget install Microsoft.PowerShell

# macOS
brew install powershell

# 安装Oh My Posh
Install-Module oh-my-posh -Scope CurrentUser

# PowerShell配置文件 ($PROFILE)
# 设置主题
oh-my-posh init pwsh --config "$env:POSH_THEMES_PATH\\jandedobbeleer.omp.json" | Invoke-Expression

# 导入模块
Import-Module PSReadLine
Import-Module Terminal-Icons

# PSReadLine配置
Set-PSReadLineOption -PredictionSource History
Set-PSReadLineOption -PredictionViewStyle ListView
Set-PSReadLineOption -EditMode Windows

# 自定义函数
function ll { Get-ChildItem -Force }
function la { Get-ChildItem -Force -Hidden }
function .. { Set-Location .. }
function ... { Set-Location ../.. }

# Git函数
function gs { git status }
function ga { git add $args }
function gc { git commit -m $args }
function gp { git push }
function gl { git pull }

# 开发函数
function ni { npm install }
function ns { npm start }
function nt { npm test }
function nb { npm run build }

# 系统函数
function which($command) {
    Get-Command -Name $command -ErrorAction SilentlyContinue | 
    Select-Object -ExpandProperty Path -ErrorAction SilentlyContinue
}

function touch($file) {
    "" | Out-File $file -Encoding UTF8
}

# 快速编辑配置
function Edit-Profile { code $PROFILE }

# 重新加载配置
function Reload-Profile { . $PROFILE }`}
                                </pre>
                            </div>
                        </div>
                        
                        <div className={styles.usage_item}>
                            <h4>3. 终端主题配置</h4>
                            <div className={styles.code_block}>
                                <pre>
{`// Windows Terminal settings.json
{
    "defaultProfile": "{574e775e-4f2a-5b96-ac1e-a2962a402336}",
    "profiles": {
        "defaults": {
            "fontFace": "FiraCode Nerd Font",
            "fontSize": 12,
            "cursorShape": "bar",
            "colorScheme": "One Half Dark"
        },
        "list": [
            {
                "guid": "{574e775e-4f2a-5b96-ac1e-a2962a402336}",
                "name": "PowerShell",
                "source": "Windows.Terminal.PowershellCore",
                "startingDirectory": "%USERPROFILE%\\Projects",
                "backgroundImage": "ms-appdata:///roaming/background.jpg",
                "backgroundImageOpacity": 0.1
            },
            {
                "guid": "{2c4de342-38b7-51cf-b940-2309a097f518}",
                "name": "Ubuntu",
                "source": "Windows.Terminal.Wsl",
                "colorScheme": "Ubuntu"
            }
        ]
    },
    "schemes": [
        {
            "name": "One Half Dark",
            "black": "#282c34",
            "red": "#e06c75",
            "green": "#98c379",
            "yellow": "#e5c07b",
            "blue": "#61afef",
            "purple": "#c678dd",
            "cyan": "#56b6c2",
            "white": "#dcdfe4",
            "brightBlack": "#5a6374",
            "brightRed": "#e06c75",
            "brightGreen": "#98c379",
            "brightYellow": "#e5c07b",
            "brightBlue": "#61afef",
            "brightPurple": "#c678dd",
            "brightCyan": "#56b6c2",
            "brightWhite": "#dcdfe4",
            "background": "#282c34",
            "foreground": "#dcdfe4"
        }
    ],
    "actions": [
        {
            "command": {
                "action": "copy",
                "singleLine": false
            },
            "keys": "ctrl+c"
        },
        {
            "command": "paste",
            "keys": "ctrl+v"
        },
        {
            "command": "find",
            "keys": "ctrl+shift+f"
        },
        {
            "command": {
                "action": "splitPane",
                "split": "auto",
                "splitMode": "duplicate"
            },
            "keys": "alt+shift+d"
        }
    ]
}

// iTerm2配置
// 导入配色方案
curl -Ls https://raw.githubusercontent.com/mbadolato/iTerm2-Color-Schemes/master/schemes/Dracula.itermcolors > ~/Downloads/Dracula.itermcolors

// Hyper配置 (~/.hyper.js)
module.exports = {
    config: {
        fontSize: 14,
        fontFamily: '"FiraCode Nerd Font", Menlo, monospace',
        cursorColor: 'rgba(248,28,229,0.8)',
        cursorShape: 'BEAM',
        foregroundColor: '#fff',
        backgroundColor: '#000',
        borderColor: '#333',
        css: '',
        termCSS: '',
        showHamburgerMenu: '',
        showWindowControls: '',
        padding: '12px 14px',
        colors: {
            black: '#000000',
            red: '#ff0000',
            green: '#33ff00',
            yellow: '#ffff00',
            blue: '#0066ff',
            magenta: '#cc00ff',
            cyan: '#00ffff',
            white: '#d0d0d0'
        },
        shell: '',
        shellArgs: ['--login'],
        env: {},
        bell: 'SOUND',
        copyOnSelect: false
    },
    plugins: [
        'hyper-dracula',
        'hyper-tabs-enhanced',
        'hyper-search',
        'hyper-pane'
    ]
}`}
                                </pre>
                            </div>
                        </div>
                    </div>
                </Card>
                
                {/* 命令行工具 */}
                <Card title="🛠️ 实用命令行工具" className={styles.content_card}>
                    <div className={styles.tools_section}>
                        <h3>现代化CLI工具</h3>
                        <div className={styles.code_block}>
                            <pre>
{`# 文件和目录操作
# exa - 现代化的ls替代品
brew install exa
alias ls="exa"
alias ll="exa -l"
alias la="exa -la"
alias tree="exa --tree"

# bat - 带语法高亮的cat
brew install bat
alias cat="bat"

# fd - 现代化的find
brew install fd
# 查找文件
fd "*.js" src/
fd -e tsx -e ts

# ripgrep - 超快的grep
brew install ripgrep
# 搜索代码
rg "function" --type js
rg "TODO" -A 3 -B 3

# fzf - 模糊查找工具
brew install fzf
# 安装shell集成
$(brew --prefix)/opt/fzf/install

# 使用示例
# 模糊查找文件
vim $(fzf)
# 模糊查找历史命令
history | fzf
# 模糊查找进程
ps aux | fzf

# Git工具
# lazygit - Git的TUI界面
brew install lazygit

# tig - Git的文本界面
brew install tig

# delta - Git diff增强
brew install git-delta
# .gitconfig配置
[core]
    pager = delta
[delta]
    navigate = true
    light = false
    line-numbers = true

# 系统监控
# htop - 进程监控
brew install htop

# glances - 系统监控
pip install glances

# ncdu - 磁盘使用分析
brew install ncdu

# 网络工具
# httpie - HTTP客户端
brew install httpie
# 使用示例
http GET https://api.github.com/users/octocat
http POST httpbin.org/post name=John age:=25

# curl替代品
# 安装xh
brew install xh
xh GET https://httpbin.org/json

# 开发工具
# jq - JSON处理
brew install jq
# 使用示例
curl -s https://api.github.com/users/octocat | jq '.name'

# yq - YAML处理
brew install yq

# tldr - 简化的man页面
npm install -g tldr
tldr tar
tldr git

# 文件传输
# rsync增强版
brew install rsync

# 现代化的wget
brew install wget2`}
                            </pre>
                        </div>
                        
                        <h3>开发专用工具</h3>
                        <div className={styles.code_block}>
                            <pre>
{`# Node.js工具
# nvm - Node版本管理
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
nvm install node
nvm use 16.14.0

# yarn - 包管理器
npm install -g yarn

# pnpm - 快速包管理器
npm install -g pnpm

# ni - 通用包管理器接口
npm install -g @antfu/ni
# 自动检测并使用正确的包管理器
ni          # npm install / yarn / pnpm install
nr dev      # npm run dev / yarn dev / pnpm dev
nu          # npm update / yarn upgrade / pnpm update

# Python工具
# pyenv - Python版本管理
brew install pyenv
pyenv install 3.9.0
pyenv global 3.9.0

# pipenv - Python包管理
pip install pipenv

# Docker工具
# lazydocker - Docker的TUI界面
brew install lazydocker

# dive - Docker镜像分析
brew install dive
dive nginx:latest

# 数据库工具
# mycli - MySQL客户端
pip install mycli
mycli -u root -h localhost

# pgcli - PostgreSQL客户端
pip install pgcli
pgcli postgresql://user:pass@localhost/dbname

# 云服务工具
# AWS CLI
brew install awscli
aws configure

# Azure CLI
brew install azure-cli
az login

# Google Cloud SDK
brew install google-cloud-sdk
gcloud init

# Kubernetes工具
# kubectl
brew install kubectl

# k9s - Kubernetes TUI
brew install k9s

# helm
brew install helm

# 文本编辑
# micro - 现代化的nano
brew install micro

# neovim - Vim的现代化版本
brew install neovim
alias vim="nvim"
alias vi="nvim"`}
                            </pre>
                        </div>
                    </div>
                </Card>
                
                {/* Shell脚本 */}
                <Card title="📜 Shell 脚本实战" className={styles.content_card}>
                    <div className={styles.script_section}>
                        <h3>实用脚本示例</h3>
                        <div className={styles.code_block}>
                            <pre>
{`#!/bin/bash
# 项目初始化脚本

# 颜色定义
RED='\\033[0;31m'
GREEN='\\033[0;32m'
YELLOW='\\033[1;33m'
NC='\\033[0m' # No Color

# 日志函数
log_info() {
    echo -e "\${GREEN}[INFO]\${NC} \$1"
}

log_warn() {
    echo -e "\${YELLOW}[WARN]\${NC} \$1"
}

log_error() {
    echo -e "\${RED}[ERROR]\${NC} \$1"
}

# 检查命令是否存在
command_exists() {
    command -v "\$1" >/dev/null 2>&1
}

# 项目初始化函数
init_project() {
    local project_name=\$1
    local project_type=\$2
    
    if [ -z "\$project_name" ]; then
        log_error "项目名称不能为空"
        exit 1
    fi
    
    log_info "开始初始化项目: \$project_name"
    
    # 创建项目目录
    mkdir -p "\$project_name"
    cd "\$project_name"
    
    case \$project_type in
        "react")
            init_react_project
            ;;
        "vue")
            init_vue_project
            ;;
        "node")
            init_node_project
            ;;
        *)
            log_error "不支持的项目类型: \$project_type"
            exit 1
            ;;
    esac
    
    log_info "项目初始化完成!"
}

# React项目初始化
init_react_project() {
    log_info "创建React项目..."
    
    if command_exists npx; then
        npx create-react-app . --template typescript
    else
        log_error "npx未安装，请先安装Node.js"
        exit 1
    fi
    
    # 安装额外依赖
    log_info "安装额外依赖..."
    npm install -D eslint prettier husky lint-staged
    
    # 创建配置文件
    create_eslint_config
    create_prettier_config
    setup_git_hooks
}

# Vue项目初始化
init_vue_project() {
    log_info "创建Vue项目..."
    
    if command_exists vue; then
        vue create . --preset default
    else
        log_error "Vue CLI未安装，请先安装: npm install -g @vue/cli"
        exit 1
    fi
}

# Node.js项目初始化
init_node_project() {
    log_info "创建Node.js项目..."
    
    npm init -y
    
    # 创建基本目录结构
    mkdir -p src tests docs
    
    # 创建基本文件
    cat > src/index.js << EOF
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.json({ message: 'Hello World!' });
});

app.listen(PORT, () => {
    console.log(\\\`Server running on port \\\${PORT}\\\`);
});
EOF
    
    # 安装基本依赖
    npm install express
    npm install -D nodemon jest
    
    # 更新package.json脚本
    npm pkg set scripts.start="node src/index.js"
    npm pkg set scripts.dev="nodemon src/index.js"
    npm pkg set scripts.test="jest"
}

# 创建ESLint配置
create_eslint_config() {
    cat > .eslintrc.js << EOF
module.exports = {
    env: {
        browser: true,
        es2021: true,
        node: true
    },
    extends: [
        'eslint:recommended',
        '@typescript-eslint/recommended'
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 12,
        sourceType: 'module'
    },
    rules: {
        'indent': ['error', 2],
        'quotes': ['error', 'single'],
        'semi': ['error', 'never']
    }
};
EOF
}

# 创建Prettier配置
create_prettier_config() {
    cat > .prettierrc << EOF
{
    "semi": false,
    "singleQuote": true,
    "tabWidth": 2,
    "trailingComma": "es5"
}
EOF
}

# 设置Git钩子
setup_git_hooks() {
    # 初始化Git仓库
    git init
    
    # 设置Husky
    npx husky install
    npx husky add .husky/pre-commit "lint-staged"
    
    # 配置lint-staged
    npm pkg set lint-staged."\*.{js,jsx,ts,tsx}"[0]="eslint --fix"
    npm pkg set lint-staged."\*.{js,jsx,ts,tsx,json,css,md}"[0]="prettier --write"
}

# 主函数
main() {
    case \$1 in
        "init")
            init_project "\$2" "\$3"
            ;;
        "help"|"-h"|"--help")
            echo "使用方法: \$0 init <project_name> <project_type>"
            echo "项目类型: react, vue, node"
            ;;
        *)
            log_error "未知命令: \$1"
            echo "使用 '\$0 help' 查看帮助"
            exit 1
            ;;
    esac
}

# 执行主函数
main "\$@"`}
                            </pre>
                        </div>
                    </div>
                </Card>
                
                {/* 最佳实践 */}
                <Card title="✅ 终端工具最佳实践" className={styles.content_card}>
                    <div className={styles.best_practices}>
                        <div className={styles.practice_item}>
                            <CheckCircleOutlined className={styles.practice_icon} />
                            <div>
                                <h4>1. 配置管理</h4>
                                <p>统一管理终端配置</p>
                                <ul>
                                    <li>使用版本控制管理配置文件</li>
                                    <li>创建配置文件的符号链接</li>
                                    <li>定期备份重要配置</li>
                                    <li>文档化自定义配置</li>
                                </ul>
                            </div>
                        </div>
                        
                        <div className={styles.practice_item}>
                            <CheckCircleOutlined className={styles.practice_icon} />
                            <div>
                                <h4>2. 效率提升</h4>
                                <p>提高命令行使用效率</p>
                                <ul>
                                    <li>学习和使用键盘快捷键</li>
                                    <li>创建有用的别名和函数</li>
                                    <li>使用现代化CLI工具</li>
                                    <li>掌握管道和重定向</li>
                                </ul>
                            </div>
                        </div>
                        
                        <div className={styles.practice_item}>
                            <CheckCircleOutlined className={styles.practice_icon} />
                            <div>
                                <h4>3. 安全考虑</h4>
                                <p>确保终端使用安全</p>
                                <ul>
                                    <li>避免在历史记录中保存敏感信息</li>
                                    <li>使用环境变量存储密钥</li>
                                    <li>定期清理命令历史</li>
                                    <li>谨慎执行来源不明的脚本</li>
                                </ul>
                            </div>
                        </div>
                        
                        <div className={styles.practice_item}>
                            <CheckCircleOutlined className={styles.practice_icon} />
                            <div>
                                <h4>4. 学习进阶</h4>
                                <p>持续学习和改进</p>
                                <ul>
                                    <li>学习正则表达式</li>
                                    <li>掌握文本处理工具</li>
                                    <li>了解系统管理命令</li>
                                    <li>编写自动化脚本</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    )
}

export default TerminalDetail
