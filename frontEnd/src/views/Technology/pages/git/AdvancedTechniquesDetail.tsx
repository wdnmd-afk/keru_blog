import React from 'react'
import { Card, Tag, Alert, Divider, Button } from 'antd'
import { useNavigate } from 'react-router-dom'
import {
    ArrowLeftOutlined,
    RocketOutlined,
    WarningOutlined,
    CheckCircleOutlined,
    BugOutlined
} from '@ant-design/icons'
import CodeHighlight from '@/components/CodeHighlight'
import { useCodeData } from '@/hooks/useCodeData'
import styles from '@/styles/topicDetail.module.scss'

const AdvancedTechniquesDetail: React.FC = () => {
    const navigate = useNavigate()
    const { codeData, loading, error } = useCodeData('Git', 'advanced')

    const handleBack = () => {
        navigate('/technology/git')
    }

    if (loading) {
        return <div className={styles.loading}>加载中...</div>
    }

    if (error) {
        return <div className={styles.error}>加载失败: {error}</div>
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
                    <RocketOutlined />
                </div>
                <div className={styles.topic_info}>
                    <h1>Git 高级技巧详解</h1>
                    <p>掌握Git的高级功能与实用技巧</p>
                    <div className={styles.topic_tags}>
                        <Tag color="purple">高级技巧</Tag>
                        <Tag color="blue">Git命令</Tag>
                        <Tag color="green">工作流优化</Tag>
                        <Tag color="orange">问题解决</Tag>
                    </div>
                </div>
            </div>

            {/* 内容区域 */}
            <div className={styles.content_sections}>
                {/* 高级提交技巧 */}
                <Card title="📝 高级提交技巧" className={styles.content_card}>
                    <div className={styles.concept_content}>
                        <h3>交互式提交</h3>
                        {codeData.advancedCommands && (
                            <CodeHighlight
                                code={codeData.advancedCommands.code}
                                language={codeData.advancedCommands.language}
                                title={codeData.advancedCommands.title}
                            />
                        )}

                        <h3>提交信息规范</h3>
                        <div className={styles.code_block}>
                            <pre>
{`# Conventional Commits规范
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]

# 示例
feat(auth): add OAuth2 login support

Implement OAuth2 authentication flow with Google and GitHub providers.
This allows users to login without creating a separate account.

Closes #123
BREAKING CHANGE: removes basic auth support

# 常用类型
feat: 新功能
fix: 修复bug
docs: 文档更新
style: 代码格式化
refactor: 重构
test: 测试相关
chore: 构建过程或辅助工具的变动
perf: 性能优化
ci: CI配置文件和脚本的变动

# 使用commitizen
npm install -g commitizen cz-conventional-changelog
echo '{ "path": "cz-conventional-changelog" }' > ~/.czrc
git cz  # 交互式提交`}
                            </pre>
                        </div>
                    </div>
                </Card>

                {/* 高级分支操作 */}
                <Card title="🌿 高级分支操作" className={styles.content_card}>
                    <div className={styles.usage_grid}>
                        <div className={styles.usage_item}>
                            <h4>1. 交互式变基</h4>
                            {codeData.interactiveRebase && (
                                <CodeHighlight
                                    code={codeData.interactiveRebase.code}
                                    language={codeData.interactiveRebase.language}
                                    title={codeData.interactiveRebase.title}
                                />
                            )}
                        </div>

                        <div className={styles.usage_item}>
                            <h4>2. 高级合并策略</h4>
                            <div className={styles.code_block}>
                                <pre>
{`# 合并策略选择
git merge -s ours feature-branch    # 使用我们的版本
git merge -s theirs feature-branch  # 使用他们的版本
git merge -s recursive feature-branch  # 递归合并（默认）

# 合并选项
git merge -X ours feature-branch    # 冲突时优先使用当前分支
git merge -X theirs feature-branch  # 冲突时优先使用合并分支
git merge -X ignore-space-change feature-branch  # 忽略空白字符变化

# 子树合并
git merge -s subtree feature-branch

# 八爪鱼合并（多分支合并）
git merge branch1 branch2 branch3

# 合并但不提交
git merge --no-commit feature-branch

# 合并时生成合并提交信息
git merge --no-ff feature-branch`}
                                </pre>
                            </div>
                        </div>

                        <div className={styles.usage_item}>
                            <h4>3. 分支管理技巧</h4>
                            <div className={styles.code_block}>
                                <pre>
{`# 查看分支关系
git show-branch
git log --graph --oneline --all

# 查看分支的跟踪关系
git branch -vv

# 设置上游分支
git branch --set-upstream-to=origin/main main

# 删除远程跟踪分支
git branch -dr origin/feature-branch

# 重命名分支
git branch -m old-name new-name
git branch -M old-name new-name  # 强制重命名

# 查看包含特定提交的分支
git branch --contains <commit-hash>

# 查看已合并的分支
git branch --merged
git branch --no-merged

# 批量删除已合并的分支
git branch --merged | grep -v "main\|master" | xargs -n 1 git branch -d`}
                                </pre>
                            </div>
                        </div>
                    </div>
                </Card>

                {/* 高级查询与搜索 */}
                <Card title="🔍 高级查询与搜索" className={styles.content_card}>
                    <div className={styles.search_section}>
                        <h3>日志查询</h3>
                        <div className={styles.code_block}>
                            <pre>
{`# 高级日志查询
git log --oneline --graph --all
git log --author="John Doe"
git log --since="2023-01-01" --until="2023-12-31"
git log --grep="fix"  # 搜索提交信息
git log -S "function_name"  # 搜索代码内容变化
git log -G "regex_pattern"  # 使用正则表达式搜索

# 查看文件历史
git log --follow -- path/to/file
git log -p -- path/to/file  # 显示每次提交的差异

# 查看提交统计
git log --stat
git log --shortstat
git log --numstat

# 自定义日志格式
git log --pretty=format:"%h %an %ar %s"
git log --pretty=format:"%C(yellow)%h%C(reset) %C(blue)%an%C(reset) %C(green)%ar%C(reset) %s"

# 查看分支分叉点
git merge-base main feature-branch
git log --oneline $(git merge-base main feature-branch)..feature-branch`}
                            </pre>
                        </div>

                        <h3>内容搜索</h3>
                        <div className={styles.code_block}>
                            <pre>
{`# 在工作目录中搜索
git grep "search_term"
git grep -n "search_term"  # 显示行号
git grep -i "search_term"  # 忽略大小写
git grep -w "search_term"  # 匹配整个单词

# 在特定提交中搜索
git grep "search_term" HEAD~3

# 搜索多个模式
git grep -e "pattern1" -e "pattern2"

# 搜索并显示上下文
git grep -A 3 -B 3 "search_term"

# 搜索文件名
git ls-files | grep "pattern"

# 查找删除的文件
git log --diff-filter=D --summary | grep delete

# 查找大文件
git rev-list --objects --all | \
  git cat-file --batch-check='%(objecttype) %(objectname) %(objectsize) %(rest)' | \
  sed -n 's/^blob //p' | \
  sort --numeric-sort --key=2 | \
  tail -10`}
                            </pre>
                        </div>
                    </div>
                </Card>

                {/* 数据恢复与修复 */}
                <Card title="🔧 数据恢复与修复" className={styles.content_card}>
                    <div className={styles.recovery_section}>
                        <h3>提交恢复</h3>
                        <div className={styles.code_block}>
                            <pre>
{`# 查看引用日志
git reflog
git reflog show HEAD
git reflog show main

# 恢复删除的提交
git reset --hard HEAD@{2}
git cherry-pick <lost-commit-hash>

# 恢复删除的分支
git branch recovered-branch <commit-hash>

# 查看悬空对象
git fsck --lost-found
git fsck --unreachable

# 恢复悬空提交
git show <dangling-commit-hash>
git cherry-pick <dangling-commit-hash>

# 恢复删除的文件
git checkout HEAD~1 -- path/to/deleted/file
git show HEAD~1:path/to/file > recovered-file

# 从暂存区恢复文件
git checkout -- path/to/file
git restore path/to/file`}
                            </pre>
                        </div>

                        <h3>历史修改</h3>
                        <div className={styles.code_block}>
                            <pre>
{`# 修改历史提交
git rebase -i HEAD~3
# 选择edit，然后修改文件
git add .
git commit --amend
git rebase --continue

# 删除敏感信息
git filter-branch --force --index-filter \
  'git rm --cached --ignore-unmatch path/to/sensitive/file' \
  --prune-empty --tag-name-filter cat -- --all

# 使用git-filter-repo（推荐）
pip install git-filter-repo
git filter-repo --path path/to/keep --force
git filter-repo --invert-paths --path path/to/remove --force

# 修改作者信息
git filter-branch --env-filter '
if [ "$GIT_COMMITTER_EMAIL" = "old@email.com" ]
then
    export GIT_COMMITTER_NAME="New Name"
    export GIT_COMMITTER_EMAIL="new@email.com"
fi
if [ "$GIT_AUTHOR_EMAIL" = "old@email.com" ]
then
    export GIT_AUTHOR_NAME="New Name"
    export GIT_AUTHOR_EMAIL="new@email.com"
fi
' --tag-name-filter cat -- --branches --tags`}
                            </pre>
                        </div>
                    </div>
                </Card>

                {/* 性能优化 */}
                <Card title="⚡ Git 性能优化" className={styles.content_card}>
                    <div className={styles.performance_section}>
                        <h3>仓库优化</h3>
                        <div className={styles.code_block}>
                            <pre>
{`# 垃圾回收
git gc
git gc --aggressive  # 更彻底的清理

# 清理未跟踪的文件
git clean -f  # 删除未跟踪的文件
git clean -fd  # 删除未跟踪的文件和目录
git clean -n  # 预览要删除的文件

# 压缩仓库
git repack -ad

# 验证仓库完整性
git fsck

# 查看仓库大小
git count-objects -vH

# 查找大文件
git rev-list --objects --all | \
  git cat-file --batch-check='%(objecttype) %(objectname) %(objectsize) %(rest)' | \
  awk '/^blob/ {print substr($0,6)}' | \
  sort --numeric-sort --key=2 | \
  tail -10

# 配置优化
git config --global core.preloadindex true
git config --global core.fscache true
git config --global gc.auto 256`}
                            </pre>
                        </div>

                        <h3>大文件处理</h3>
                        <div className={styles.code_block}>
                            <pre>
{`# Git LFS (Large File Storage)
git lfs install

# 跟踪大文件类型
git lfs track "*.psd"
git lfs track "*.zip"
git lfs track "*.mp4"

# 查看LFS文件
git lfs ls-files

# 拉取LFS文件
git lfs pull

# 推送LFS文件
git lfs push origin main

# .gitattributes示例
*.psd filter=lfs diff=lfs merge=lfs -text
*.zip filter=lfs diff=lfs merge=lfs -text
*.mp4 filter=lfs diff=lfs merge=lfs -text

# 迁移现有大文件到LFS
git lfs migrate import --include="*.psd"

# 浅克隆
git clone --depth 1 <repository-url>
git clone --shallow-since="2023-01-01" <repository-url>

# 部分克隆
git clone --filter=blob:none <repository-url>
git clone --filter=tree:0 <repository-url>`}
                            </pre>
                        </div>
                    </div>
                </Card>

                {/* 最佳实践 */}
                <Card title="✅ Git 高级技巧最佳实践" className={styles.content_card}>
                    <div className={styles.best_practices}>
                        <div className={styles.practice_item}>
                            <CheckCircleOutlined className={styles.practice_icon} />
                            <div>
                                <h4>1. 提交管理</h4>
                                <p>保持清晰的提交历史</p>
                                <ul>
                                    <li>使用语义化的提交信息</li>
                                    <li>保持提交的原子性</li>
                                    <li>定期整理提交历史</li>
                                    <li>避免在公共分支上使用rebase</li>
                                </ul>
                            </div>
                        </div>

                        <div className={styles.practice_item}>
                            <CheckCircleOutlined className={styles.practice_icon} />
                            <div>
                                <h4>2. 分支策略</h4>
                                <p>合理使用分支功能</p>
                                <ul>
                                    <li>选择适合团队的分支模型</li>
                                    <li>及时清理无用分支</li>
                                    <li>使用描述性的分支名称</li>
                                    <li>保护重要分支</li>
                                </ul>
                            </div>
                        </div>

                        <div className={styles.practice_item}>
                            <CheckCircleOutlined className={styles.practice_icon} />
                            <div>
                                <h4>3. 性能优化</h4>
                                <p>保持仓库高效运行</p>
                                <ul>
                                    <li>定期进行垃圾回收</li>
                                    <li>使用LFS管理大文件</li>
                                    <li>合理配置Git选项</li>
                                    <li>监控仓库大小</li>
                                </ul>
                            </div>
                        </div>

                        <div className={styles.practice_item}>
                            <CheckCircleOutlined className={styles.practice_icon} />
                            <div>
                                <h4>4. 安全考虑</h4>
                                <p>确保代码和历史安全</p>
                                <ul>
                                    <li>使用GPG签名重要提交</li>
                                    <li>及时清理敏感信息</li>
                                    <li>定期备份重要仓库</li>
                                    <li>控制仓库访问权限</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    )
}

export default AdvancedTechniquesDetail
