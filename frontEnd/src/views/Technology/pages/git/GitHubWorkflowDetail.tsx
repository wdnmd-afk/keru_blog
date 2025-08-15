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

const GitHubWorkflowDetail: React.FC = () => {
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
                    <h1>GitHub 工作流详解</h1>
                    <p>掌握GitHub协作开发的完整工作流程</p>
                    <div className={styles.topic_tags}>
                        <Tag color="black">GitHub</Tag>
                        <Tag color="green">Pull Request</Tag>
                        <Tag color="blue">Code Review</Tag>
                        <Tag color="orange">协作开发</Tag>
                    </div>
                </div>
            </div>
            
            {/* 内容区域 */}
            <div className={styles.content_sections}>
                {/* GitHub工作流概述 */}
                <Card title="🔄 GitHub 工作流概述" className={styles.content_card}>
                    <div className={styles.concept_content}>
                        <h3>GitHub Flow 核心理念</h3>
                        <p>GitHub Flow是一个轻量级的、基于分支的工作流，特别适合持续部署的项目。它简单易懂，专注于快速迭代和持续集成。</p>
                        
                        <h3>工作流步骤</h3>
                        <div className={styles.workflow_steps}>
                            <div className={styles.step_item}>
                                <div className={styles.step_number}>1</div>
                                <div className={styles.step_content}>
                                    <h4>创建分支</h4>
                                    <p>从main分支创建功能分支</p>
                                </div>
                            </div>
                            
                            <div className={styles.step_item}>
                                <div className={styles.step_number}>2</div>
                                <div className={styles.step_content}>
                                    <h4>添加提交</h4>
                                    <p>在分支上进行开发并提交代码</p>
                                </div>
                            </div>
                            
                            <div className={styles.step_item}>
                                <div className={styles.step_number}>3</div>
                                <div className={styles.step_content}>
                                    <h4>创建PR</h4>
                                    <p>开启Pull Request进行讨论</p>
                                </div>
                            </div>
                            
                            <div className={styles.step_item}>
                                <div className={styles.step_number}>4</div>
                                <div className={styles.step_content}>
                                    <h4>代码审查</h4>
                                    <p>团队成员审查和讨论代码</p>
                                </div>
                            </div>
                            
                            <div className={styles.step_item}>
                                <div className={styles.step_number}>5</div>
                                <div className={styles.step_content}>
                                    <h4>部署测试</h4>
                                    <p>在测试环境验证功能</p>
                                </div>
                            </div>
                            
                            <div className={styles.step_item}>
                                <div className={styles.step_number}>6</div>
                                <div className={styles.step_content}>
                                    <h4>合并部署</h4>
                                    <p>合并到main并部署到生产</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </Card>
                
                {/* Pull Request详解 */}
                <Card title="🔀 Pull Request 详解" className={styles.content_card}>
                    <div className={styles.usage_grid}>
                        <div className={styles.usage_item}>
                            <h4>1. 创建Pull Request</h4>
                            <div className={styles.code_block}>
                                <pre>
{`# 1. 创建并切换到功能分支
git checkout -b feature/user-profile

# 2. 进行开发工作
# 编辑文件...
git add .
git commit -m "Add user profile page"

# 3. 推送分支到GitHub
git push origin feature/user-profile

# 4. 在GitHub上创建Pull Request
# - 访问仓库页面
# - 点击 "Compare & pull request"
# - 填写PR标题和描述
# - 选择审查者和标签
# - 点击 "Create pull request"`}
                                </pre>
                            </div>
                        </div>
                        
                        <div className={styles.usage_item}>
                            <h4>2. PR模板和规范</h4>
                            <div className={styles.code_block}>
                                <pre>
{`<!-- .github/pull_request_template.md -->
## 变更描述
简要描述此PR的变更内容

## 变更类型
- [ ] 新功能
- [ ] Bug修复
- [ ] 文档更新
- [ ] 重构
- [ ] 性能优化
- [ ] 其他

## 测试
- [ ] 单元测试通过
- [ ] 集成测试通过
- [ ] 手动测试完成

## 检查清单
- [ ] 代码遵循项目规范
- [ ] 已添加必要的测试
- [ ] 文档已更新
- [ ] 无破坏性变更

## 相关Issue
Closes #123

## 截图（如适用）
![screenshot](url)

## 额外说明
其他需要说明的内容`}
                                </pre>
                            </div>
                        </div>
                        
                        <div className={styles.usage_item}>
                            <h4>3. PR状态管理</h4>
                            <div className={styles.code_block}>
                                <pre>
{`# PR状态标签
draft: 草稿状态，开发中
ready for review: 准备审查
in review: 审查中
changes requested: 需要修改
approved: 已批准
merged: 已合并

# 使用GitHub CLI管理PR
gh pr create --title "Add user authentication" --body "Implements login/logout functionality"

# 查看PR列表
gh pr list

# 查看PR详情
gh pr view 123

# 审查PR
gh pr review 123 --approve
gh pr review 123 --request-changes --body "Please fix the security issue"

# 合并PR
gh pr merge 123 --squash
gh pr merge 123 --merge
gh pr merge 123 --rebase`}
                                </pre>
                            </div>
                        </div>
                    </div>
                </Card>
                
                {/* 代码审查 */}
                <Card title="👀 代码审查最佳实践" className={styles.content_card}>
                    <div className={styles.review_section}>
                        <h3>审查者指南</h3>
                        <div className={styles.code_block}>
                            <pre>
{`# 代码审查检查点

## 功能性
- 代码是否实现了预期功能？
- 是否有边界情况未处理？
- 错误处理是否完善？

## 代码质量
- 代码是否清晰易读？
- 是否遵循项目编码规范？
- 是否有重复代码？

## 性能
- 是否有性能问题？
- 数据库查询是否优化？
- 是否有内存泄漏风险？

## 安全性
- 是否有安全漏洞？
- 输入验证是否充分？
- 敏感信息是否暴露？

## 测试
- 测试覆盖率是否足够？
- 测试用例是否合理？
- 是否有集成测试？`}
                            </pre>
                        </div>

                        <h3>审查评论技巧</h3>
                        <div className={styles.code_block}>
                            <pre>
{`# 建设性评论示例

## 好的评论
✅ "考虑使用 Map 而不是 Object 来提高查找性能"
✅ "这里可能需要添加空值检查，防止运行时错误"
✅ "建议提取这个逻辑到单独的函数中，提高可读性"

## 避免的评论
❌ "这段代码很糟糕"
❌ "为什么要这样写？"
❌ "重写这部分"

## 评论模板
# 问题类型标记
[CRITICAL] 必须修复的严重问题
[SUGGESTION] 改进建议
[QUESTION] 需要澄清的问题
[NITPICK] 小的改进点

# 示例
[SUGGESTION] 考虑使用 const 而不是 let，因为这个变量不会被重新赋值

[QUESTION] 这个函数的时间复杂度是多少？对于大数据集是否会有性能问题？

[CRITICAL] 这里存在SQL注入风险，需要使用参数化查询`}
                            </pre>
                        </div>
                    </div>
                </Card>

                {/* 分支保护规则 */}
                <Card title="🛡️ 分支保护与自动化" className={styles.content_card}>
                    <div className={styles.protection_section}>
                        <h3>分支保护规则</h3>
                        <div className={styles.code_block}>
                            <pre>
{`# 在GitHub仓库设置中配置分支保护规则

## 基本保护
- ✅ Require pull request reviews before merging
  - Required number of reviewers: 2
  - Dismiss stale reviews when new commits are pushed
  - Require review from code owners

- ✅ Require status checks to pass before merging
  - Require branches to be up to date before merging
  - Status checks: CI/CD, Tests, Linting

- ✅ Require conversation resolution before merging

- ✅ Require signed commits

## 高级保护
- ✅ Restrict pushes that create files
- ✅ Restrict pushes that delete files
- ✅ Allow force pushes (仅管理员)
- ✅ Allow deletions (仅管理员)

## 规则适用范围
- Branch name pattern: main, master, release/*
- Include administrators: 是否对管理员也生效`}
                            </pre>
                        </div>
                    </div>
                </Card>

                {/* 最佳实践 */}
                <Card title="✅ GitHub 工作流最佳实践" className={styles.content_card}>
                    <div className={styles.best_practices}>
                        <div className={styles.practice_item}>
                            <CheckCircleOutlined className={styles.practice_icon} />
                            <div>
                                <h4>1. PR管理</h4>
                                <p>高效的Pull Request管理</p>
                                <ul>
                                    <li>保持PR小而专注，易于审查</li>
                                    <li>写清晰的PR描述和提交信息</li>
                                    <li>及时响应审查意见</li>
                                    <li>使用Draft PR进行早期反馈</li>
                                </ul>
                            </div>
                        </div>

                        <div className={styles.practice_item}>
                            <CheckCircleOutlined className={styles.practice_icon} />
                            <div>
                                <h4>2. 代码审查</h4>
                                <p>建设性的代码审查文化</p>
                                <ul>
                                    <li>及时进行代码审查</li>
                                    <li>提供建设性的反馈</li>
                                    <li>关注代码质量和安全性</li>
                                    <li>学习和分享最佳实践</li>
                                </ul>
                            </div>
                        </div>

                        <div className={styles.practice_item}>
                            <CheckCircleOutlined className={styles.practice_icon} />
                            <div>
                                <h4>3. 自动化</h4>
                                <p>充分利用GitHub的自动化功能</p>
                                <ul>
                                    <li>设置CI/CD流水线</li>
                                    <li>使用分支保护规则</li>
                                    <li>自动化测试和部署</li>
                                    <li>集成第三方工具</li>
                                </ul>
                            </div>
                        </div>

                        <div className={styles.practice_item}>
                            <CheckCircleOutlined className={styles.practice_icon} />
                            <div>
                                <h4>4. 团队协作</h4>
                                <p>促进团队高效协作</p>
                                <ul>
                                    <li>建立清晰的工作流程</li>
                                    <li>使用Issue跟踪任务</li>
                                    <li>定期进行项目回顾</li>
                                    <li>文档化团队规范</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    )
}

export default GitHubWorkflowDetail
