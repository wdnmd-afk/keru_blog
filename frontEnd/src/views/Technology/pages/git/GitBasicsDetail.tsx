import React from 'react'
import { Card, Tag, Alert, Divider, Button } from 'antd'
import { useNavigate } from 'react-router-dom'
import { 
    ArrowLeftOutlined, 
    GithubOutlined, 
    WarningOutlined,
    CheckCircleOutlined,
    BugOutlined
} from '@ant-design/icons'
import styles from '@/styles/topicDetail.module.scss'

const GitBasicsDetail: React.FC = () => {
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
                    <GithubOutlined />
                </div>
                <div className={styles.topic_info}>
                    <h1>Git 基础操作详解</h1>
                    <p>掌握Git版本控制的核心概念与基本命令</p>
                    <div className={styles.topic_tags}>
                        <Tag color="red">Git</Tag>
                        <Tag color="blue">版本控制</Tag>
                        <Tag color="green">基础命令</Tag>
                        <Tag color="orange">工作流</Tag>
                    </div>
                </div>
            </div>
            
            {/* 内容区域 */}
            <div className={styles.content_sections}>
                {/* Git 核心概念 */}
                <Card title="📚 Git 核心概念" className={styles.content_card}>
                    <div className={styles.concept_content}>
                        <h3>Git 的三个区域</h3>
                        <div className={styles.git_areas}>
                            <div className={styles.area_item}>
                                <h4>📁 工作区 (Working Directory)</h4>
                                <p>当前正在编辑的文件所在的目录，包含项目的实际文件</p>
                            </div>
                            <div className={styles.area_arrow}>→</div>
                            <div className={styles.area_item}>
                                <h4>📋 暂存区 (Staging Area)</h4>
                                <p>准备提交的文件快照存储区域，也称为索引(Index)</p>
                            </div>
                            <div className={styles.area_arrow}>→</div>
                            <div className={styles.area_item}>
                                <h4>🗄️ 版本库 (Repository)</h4>
                                <p>存储项目历史版本的数据库，包含所有提交记录</p>
                            </div>
                        </div>
                        
                        <h3>Git 对象模型</h3>
                        <div className={styles.code_block}>
                            <pre>
{`# Git 四种对象类型
1. Blob (二进制大对象) - 存储文件内容
2. Tree (树对象) - 存储目录结构
3. Commit (提交对象) - 存储提交信息
4. Tag (标签对象) - 存储标签信息

# 查看对象信息
git cat-file -t <hash>    # 查看对象类型
git cat-file -p <hash>    # 查看对象内容
git ls-tree <tree-hash>   # 查看树对象内容`}
                            </pre>
                        </div>
                    </div>
                </Card>
                
                {/* 基础命令 */}
                <Card title="⚡ Git 基础命令" className={styles.content_card}>
                    <div className={styles.usage_grid}>
                        <div className={styles.usage_item}>
                            <h4>1. 仓库初始化与配置</h4>
                            <div className={styles.code_block}>
                                <pre>
{`# 初始化仓库
git init                    # 在当前目录初始化Git仓库
git init project-name       # 创建新目录并初始化

# 克隆仓库
git clone <url>             # 克隆远程仓库
git clone <url> <dir>       # 克隆到指定目录

# 配置用户信息
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"

# 查看配置
git config --list          # 查看所有配置
git config user.name       # 查看特定配置

# 配置级别
git config --system        # 系统级配置
git config --global        # 用户级配置
git config --local         # 仓库级配置（默认）`}
                                </pre>
                            </div>
                        </div>
                        
                        <div className={styles.usage_item}>
                            <h4>2. 文件状态管理</h4>
                            <div className={styles.code_block}>
                                <pre>
{`# 查看状态
git status                  # 查看工作区状态
git status -s               # 简洁格式显示状态

# 添加文件到暂存区
git add <file>              # 添加指定文件
git add .                   # 添加所有文件
git add *.js                # 添加所有js文件
git add -A                  # 添加所有变更（包括删除）

# 从暂存区移除
git reset <file>            # 从暂存区移除文件
git reset                   # 移除所有暂存的文件

# 查看差异
git diff                    # 工作区与暂存区的差异
git diff --staged           # 暂存区与最新提交的差异
git diff HEAD               # 工作区与最新提交的差异`}
                                </pre>
                            </div>
                        </div>
                        
                        <div className={styles.usage_item}>
                            <h4>3. 提交管理</h4>
                            <div className={styles.code_block}>
                                <pre>
{`# 提交更改
git commit -m "提交信息"     # 提交暂存区的文件
git commit -am "提交信息"    # 添加并提交已跟踪的文件
git commit --amend          # 修改最后一次提交

# 查看提交历史
git log                     # 查看提交历史
git log --oneline           # 简洁格式显示
git log --graph             # 图形化显示分支
git log -p                  # 显示每次提交的差异
git log --since="2 weeks"   # 显示最近两周的提交

# 查看特定提交
git show <commit-hash>      # 查看特定提交的详细信息
git show HEAD               # 查看最新提交
git show HEAD~1             # 查看上一次提交`}
                                </pre>
                            </div>
                        </div>
                    </div>
                </Card>
                
                {/* 分支操作 */}
                <Card title="🌿 分支操作" className={styles.content_card}>
                    <div className={styles.branch_section}>
                        <h3>分支基础操作</h3>
                        <div className={styles.code_block}>
                            <pre>
{`# 查看分支
git branch                  # 查看本地分支
git branch -r               # 查看远程分支
git branch -a               # 查看所有分支

# 创建分支
git branch <branch-name>    # 创建新分支
git checkout -b <branch>    # 创建并切换到新分支
git switch -c <branch>      # 创建并切换到新分支（新语法）

# 切换分支
git checkout <branch>       # 切换到指定分支
git switch <branch>         # 切换到指定分支（新语法）

# 合并分支
git merge <branch>          # 将指定分支合并到当前分支
git merge --no-ff <branch>  # 强制创建合并提交

# 删除分支
git branch -d <branch>      # 删除已合并的分支
git branch -D <branch>      # 强制删除分支`}
                            </pre>
                        </div>
                        
                        <h3>分支合并策略</h3>
                        <div className={styles.code_block}>
                            <pre>
{`# Fast-forward 合并（默认）
# 当目标分支是当前分支的直接后继时，Git会直接移动指针

# 三方合并
# 当两个分支有分歧时，Git会创建一个新的合并提交

# Squash 合并
git merge --squash <branch>  # 将分支的所有提交压缩为一个提交

# 变基合并
git rebase <branch>          # 将当前分支的提交重新应用到目标分支上
git rebase -i <commit>       # 交互式变基，可以修改提交历史

# 解决合并冲突
# 1. 编辑冲突文件，解决冲突标记
# 2. git add <resolved-files>
# 3. git commit（对于merge）或 git rebase --continue（对于rebase）`}
                            </pre>
                        </div>
                    </div>
                </Card>
                
                {/* 远程仓库 */}
                <Card title="🌐 远程仓库操作" className={styles.content_card}>
                    <div className={styles.remote_section}>
                        <h3>远程仓库管理</h3>
                        <div className={styles.code_block}>
                            <pre>
{`# 查看远程仓库
git remote                  # 查看远程仓库名称
git remote -v               # 查看远程仓库URL
git remote show origin      # 查看远程仓库详细信息

# 添加远程仓库
git remote add <name> <url> # 添加远程仓库
git remote add origin https://github.com/user/repo.git

# 修改远程仓库
git remote set-url origin <new-url>  # 修改远程仓库URL
git remote rename origin upstream    # 重命名远程仓库

# 删除远程仓库
git remote remove <name>    # 删除远程仓库引用`}
                            </pre>
                        </div>
                        
                        <h3>同步操作</h3>
                        <div className={styles.code_block}>
                            <pre>
{`# 获取远程更新
git fetch                   # 获取所有远程分支的更新
git fetch origin            # 获取指定远程仓库的更新
git fetch origin main       # 获取指定分支的更新

# 拉取并合并
git pull                    # 等于 git fetch + git merge
git pull origin main        # 拉取指定分支并合并
git pull --rebase           # 使用rebase方式拉取

# 推送更改
git push                    # 推送当前分支到远程
git push origin main        # 推送到指定远程分支
git push -u origin main     # 推送并设置上游分支
git push --force            # 强制推送（危险操作）

# 推送标签
git push origin <tag-name>  # 推送指定标签
git push origin --tags      # 推送所有标签`}
                            </pre>
                        </div>
                    </div>
                </Card>
                
                {/* 撤销操作 */}
                <Card title="↩️ 撤销与回退操作" className={styles.content_card}>
                    <div className={styles.undo_section}>
                        <h3>工作区撤销</h3>
                        <div className={styles.code_block}>
                            <pre>
{`# 撤销工作区修改
git checkout -- <file>      # 撤销文件的工作区修改
git checkout .              # 撤销所有工作区修改
git restore <file>          # 撤销文件修改（新语法）

# 撤销暂存区修改
git reset HEAD <file>       # 将文件从暂存区移除
git restore --staged <file> # 将文件从暂存区移除（新语法）`}
                            </pre>
                        </div>
                        
                        <h3>提交撤销</h3>
                        <div className={styles.code_block}>
                            <pre>
{`# 软重置（保留工作区和暂存区）
git reset --soft HEAD~1     # 撤销最后一次提交，保留修改

# 混合重置（保留工作区，清空暂存区）
git reset HEAD~1            # 默认模式，撤销提交和暂存

# 硬重置（清空工作区和暂存区）
git reset --hard HEAD~1     # 完全撤销，丢失所有修改

# 反向提交
git revert <commit>         # 创建一个新提交来撤销指定提交
git revert HEAD             # 撤销最后一次提交

# 修改提交信息
git commit --amend -m "新的提交信息"  # 修改最后一次提交信息`}
                            </pre>
                        </div>
                    </div>
                </Card>
                
                {/* 最佳实践 */}
                <Card title="✅ Git 最佳实践" className={styles.content_card}>
                    <div className={styles.best_practices}>
                        <div className={styles.practice_item}>
                            <CheckCircleOutlined className={styles.practice_icon} />
                            <div>
                                <h4>1. 提交信息规范</h4>
                                <p>编写清晰、有意义的提交信息</p>
                                <div className={styles.code_block}>
                                    <pre>
{`# 推荐的提交信息格式
<type>(<scope>): <subject>

<body>

<footer>

# 示例
feat(auth): 添加用户登录功能

- 实现用户名密码验证
- 添加JWT token生成
- 集成Redis会话存储

Closes #123`}
                                    </pre>
                                </div>
                            </div>
                        </div>
                        
                        <div className={styles.practice_item}>
                            <CheckCircleOutlined className={styles.practice_icon} />
                            <div>
                                <h4>2. .gitignore 配置</h4>
                                <p>合理配置忽略文件，避免提交不必要的文件</p>
                                <div className={styles.code_block}>
                                    <pre>
{`# .gitignore 示例
# 依赖目录
node_modules/
vendor/

# 构建输出
dist/
build/
*.min.js

# 环境配置
.env
.env.local
config/local.js

# IDE文件
.vscode/
.idea/
*.swp

# 系统文件
.DS_Store
Thumbs.db

# 日志文件
*.log
logs/`}
                                    </pre>
                                </div>
                            </div>
                        </div>
                        
                        <div className={styles.practice_item}>
                            <CheckCircleOutlined className={styles.practice_icon} />
                            <div>
                                <h4>3. 分支命名规范</h4>
                                <p>使用有意义的分支名称，便于团队协作</p>
                                <ul>
                                    <li><strong>feature/</strong>：新功能分支</li>
                                    <li><strong>bugfix/</strong>：bug修复分支</li>
                                    <li><strong>hotfix/</strong>：紧急修复分支</li>
                                    <li><strong>release/</strong>：发布分支</li>
                                    <li><strong>chore/</strong>：杂务分支</li>
                                </ul>
                            </div>
                        </div>
                        
                        <div className={styles.practice_item}>
                            <CheckCircleOutlined className={styles.practice_icon} />
                            <div>
                                <h4>4. 安全注意事项</h4>
                                <p>保护敏感信息，避免安全风险</p>
                                <ul>
                                    <li>不要提交密码、API密钥等敏感信息</li>
                                    <li>使用环境变量管理配置</li>
                                    <li>定期检查提交历史中的敏感信息</li>
                                    <li>使用GPG签名验证提交身份</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    )
}

export default GitBasicsDetail
