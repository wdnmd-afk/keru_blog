import React from 'react'
import { Card, Tag, Alert, Divider, Button } from 'antd'
import { useNavigate } from 'react-router-dom'
import { 
    ArrowLeftOutlined, 
    BranchesOutlined, 
    WarningOutlined,
    CheckCircleOutlined,
    BugOutlined
} from '@ant-design/icons'
import styles from '@/styles/topicDetail.module.scss'

const BranchingDetail: React.FC = () => {
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
                    <BranchesOutlined />
                </div>
                <div className={styles.topic_info}>
                    <h1>Git 分支管理详解</h1>
                    <p>掌握Git分支策略与高效的分支管理技巧</p>
                    <div className={styles.topic_tags}>
                        <Tag color="green">Git Branch</Tag>
                        <Tag color="blue">分支策略</Tag>
                        <Tag color="orange">合并管理</Tag>
                        <Tag color="purple">工作流</Tag>
                    </div>
                </div>
            </div>
            
            {/* 内容区域 */}
            <div className={styles.content_sections}>
                {/* 分支基础概念 */}
                <Card title="🌳 Git 分支基础" className={styles.content_card}>
                    <div className={styles.concept_content}>
                        <h3>什么是Git分支？</h3>
                        <p>Git分支是指向特定提交的可移动指针。分支让你可以在不影响主代码的情况下开发新功能、修复bug或进行实验。</p>
                        
                        <h3>分支的优势</h3>
                        <div className={styles.concepts_grid}>
                            <div className={styles.concept_item}>
                                <h4>🚀 并行开发</h4>
                                <p>多个功能可以同时开发，互不干扰</p>
                            </div>
                            
                            <div className={styles.concept_item}>
                                <h4>🔒 代码隔离</h4>
                                <p>实验性代码不会影响稳定版本</p>
                            </div>
                            
                            <div className={styles.concept_item}>
                                <h4>🔄 轻松切换</h4>
                                <p>可以快速在不同版本间切换</p>
                            </div>
                            
                            <div className={styles.concept_item}>
                                <h4>📝 历史追踪</h4>
                                <p>每个功能的开发历史清晰可见</p>
                            </div>
                        </div>
                        
                        <h3>基本分支操作</h3>
                        <div className={styles.code_block}>
                            <pre>
{`# 查看所有分支
git branch -a

# 查看远程分支
git branch -r

# 创建新分支
git branch feature-login

# 创建并切换到新分支
git checkout -b feature-login
# 或使用新语法
git switch -c feature-login

# 切换分支
git checkout main
git switch main

# 删除分支
git branch -d feature-login

# 强制删除未合并的分支
git branch -D feature-login`}
                            </pre>
                        </div>
                    </div>
                </Card>
                
                {/* 分支策略 */}
                <Card title="🎯 常用分支策略" className={styles.content_card}>
                    <div className={styles.usage_grid}>
                        <div className={styles.usage_item}>
                            <h4>1. Git Flow</h4>
                            <div className={styles.code_block}>
                                <pre>
{`# Git Flow 分支结构
main        # 生产环境分支
develop     # 开发分支
feature/*   # 功能分支
release/*   # 发布分支
hotfix/*    # 热修复分支

# 初始化Git Flow
git flow init

# 开始新功能开发
git flow feature start login-system

# 完成功能开发
git flow feature finish login-system

# 开始发布准备
git flow release start v1.2.0

# 完成发布
git flow release finish v1.2.0

# 紧急修复
git flow hotfix start critical-bug
git flow hotfix finish critical-bug`}
                                </pre>
                            </div>
                        </div>
                        
                        <div className={styles.usage_item}>
                            <h4>2. GitHub Flow</h4>
                            <div className={styles.code_block}>
                                <pre>
{`# GitHub Flow 简化流程
# 1. 从main分支创建功能分支
git checkout main
git pull origin main
git checkout -b feature/user-authentication

# 2. 开发并提交
git add .
git commit -m "Add user login functionality"

# 3. 推送分支
git push origin feature/user-authentication

# 4. 创建Pull Request
# 在GitHub上创建PR，进行代码审查

# 5. 合并到main
# PR通过后合并到main分支

# 6. 删除功能分支
git branch -d feature/user-authentication
git push origin --delete feature/user-authentication`}
                                </pre>
                            </div>
                        </div>
                        
                        <div className={styles.usage_item}>
                            <h4>3. GitLab Flow</h4>
                            <div className={styles.code_block}>
                                <pre>
{`# GitLab Flow 环境分支
main            # 主开发分支
pre-production  # 预生产环境
production      # 生产环境

# 功能开发流程
git checkout main
git pull origin main
git checkout -b feature/payment-integration

# 开发完成后合并到main
git checkout main
git merge feature/payment-integration

# 部署到预生产环境
git checkout pre-production
git merge main

# 测试通过后部署到生产环境
git checkout production
git merge pre-production

# 发布标签
git tag -a v1.3.0 -m "Release version 1.3.0"
git push origin v1.3.0`}
                                </pre>
                            </div>
                        </div>
                    </div>
                </Card>
                
                {/* 分支合并 */}
                <Card title="🔀 分支合并技巧" className={styles.content_card}>
                    <div className={styles.merge_section}>
                        <h3>合并方式对比</h3>
                        <div className={styles.code_block}>
                            <pre>
{`# 1. 普通合并 (Merge)
git checkout main
git merge feature-branch
# 创建合并提交，保留分支历史

# 2. 快进合并 (Fast-forward)
git merge --ff-only feature-branch
# 只有在可以快进时才合并

# 3. 禁用快进合并
git merge --no-ff feature-branch
# 总是创建合并提交

# 4. 压缩合并 (Squash)
git merge --squash feature-branch
git commit -m "Add complete feature"
# 将多个提交压缩为一个

# 5. 变基合并 (Rebase)
git checkout feature-branch
git rebase main
git checkout main
git merge feature-branch
# 创建线性历史`}
                            </pre>
                        </div>
                        
                        <h3>解决合并冲突</h3>
                        <div className={styles.code_block}>
                            <pre>
{`# 当出现合并冲突时
git merge feature-branch
# Auto-merging file.txt
# CONFLICT (content): Merge conflict in file.txt

# 查看冲突状态
git status

# 手动解决冲突后
git add file.txt
git commit -m "Resolve merge conflict"

# 使用合并工具
git mergetool

# 中止合并
git merge --abort

# 查看冲突的详细信息
git diff
git log --merge

# 使用三方合并工具
git config merge.tool vimdiff
git mergetool`}
                            </pre>
                        </div>
                        
                        <h3>高级合并技巧</h3>
                        <div className={styles.code_block}>
                            <pre>
{`# 选择性合并特定提交
git cherry-pick <commit-hash>

# 合并多个提交
git cherry-pick <commit1> <commit2> <commit3>

# 合并提交范围
git cherry-pick <start-commit>..<end-commit>

# 交互式变基整理提交
git rebase -i HEAD~3

# 在变基过程中编辑提交
pick a1b2c3d Add login feature
squash e4f5g6h Fix login bug
reword h7i8j9k Update login UI

# 自动解决冲突策略
git merge -X ours feature-branch    # 优先使用当前分支
git merge -X theirs feature-branch  # 优先使用合并分支

# 忽略空白字符差异
git merge -X ignore-space-change feature-branch`}
                            </pre>
                        </div>
                    </div>
                </Card>
                
                {/* 远程分支管理 */}
                <Card title="🌐 远程分支管理" className={styles.content_card}>
                    <div className={styles.remote_section}>
                        <h3>远程分支操作</h3>
                        <div className={styles.code_block}>
                            <pre>
{`# 查看远程分支
git branch -r
git branch -a

# 获取远程分支信息
git fetch origin

# 跟踪远程分支
git checkout -b local-branch origin/remote-branch
git branch --set-upstream-to=origin/remote-branch local-branch

# 推送本地分支到远程
git push origin feature-branch

# 推送并设置上游分支
git push -u origin feature-branch

# 删除远程分支
git push origin --delete feature-branch

# 清理已删除的远程分支引用
git remote prune origin

# 重命名远程分支
git push origin :old-branch-name
git push origin new-branch-name`}
                            </pre>
                        </div>
                        
                        <h3>多远程仓库管理</h3>
                        <div className={styles.code_block}>
                            <pre>
{`# 添加多个远程仓库
git remote add upstream https://github.com/original/repo.git
git remote add fork https://github.com/yourname/repo.git

# 查看远程仓库
git remote -v

# 从上游仓库获取更新
git fetch upstream

# 同步fork仓库
git checkout main
git merge upstream/main
git push fork main

# 推送到不同的远程仓库
git push origin feature-branch
git push fork feature-branch

# 设置不同分支的上游
git branch --set-upstream-to=upstream/main main
git branch --set-upstream-to=fork/develop develop`}
                            </pre>
                        </div>
                    </div>
                </Card>
                
                {/* 最佳实践 */}
                <Card title="✅ 分支管理最佳实践" className={styles.content_card}>
                    <div className={styles.best_practices}>
                        <div className={styles.practice_item}>
                            <CheckCircleOutlined className={styles.practice_icon} />
                            <div>
                                <h4>1. 分支命名规范</h4>
                                <p>使用清晰的分支命名约定</p>
                                <ul>
                                    <li><strong>功能分支</strong>：feature/user-login, feature/payment-system</li>
                                    <li><strong>修复分支</strong>：bugfix/login-error, hotfix/critical-security</li>
                                    <li><strong>发布分支</strong>：release/v1.2.0, release/2024-01</li>
                                    <li><strong>实验分支</strong>：experiment/new-ui, poc/microservices</li>
                                </ul>
                            </div>
                        </div>
                        
                        <div className={styles.practice_item}>
                            <CheckCircleOutlined className={styles.practice_icon} />
                            <div>
                                <h4>2. 分支生命周期管理</h4>
                                <p>合理管理分支的创建和删除</p>
                                <ul>
                                    <li>及时删除已合并的功能分支</li>
                                    <li>定期清理过期的分支</li>
                                    <li>保持主分支的稳定性</li>
                                    <li>使用保护规则防止直接推送</li>
                                </ul>
                            </div>
                        </div>
                        
                        <div className={styles.practice_item}>
                            <CheckCircleOutlined className={styles.practice_icon} />
                            <div>
                                <h4>3. 合并策略选择</h4>
                                <p>根据项目需求选择合适的合并方式</p>
                                <ul>
                                    <li><strong>功能分支</strong>：使用squash merge保持历史清洁</li>
                                    <li><strong>发布分支</strong>：使用merge commit记录发布点</li>
                                    <li><strong>热修复</strong>：使用fast-forward merge快速部署</li>
                                    <li>避免在公共分支上使用rebase</li>
                                </ul>
                            </div>
                        </div>
                        
                        <div className={styles.practice_item}>
                            <CheckCircleOutlined className={styles.practice_icon} />
                            <div>
                                <h4>4. 团队协作规范</h4>
                                <p>建立团队分支管理规范</p>
                                <ul>
                                    <li>制定清晰的分支策略文档</li>
                                    <li>使用Pull Request进行代码审查</li>
                                    <li>设置分支保护规则</li>
                                    <li>定期进行分支管理培训</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    )
}

export default BranchingDetail
