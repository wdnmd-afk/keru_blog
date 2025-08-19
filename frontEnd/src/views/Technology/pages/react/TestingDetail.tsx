import React from 'react'
import { Card, Tag, Button } from 'antd'
import { useNavigate } from 'react-router-dom'
import { ArrowLeftOutlined, BugOutlined } from '@ant-design/icons'
import CodeHighlight from '@/components/CodeHighlight'
import { useCodeData } from '@/hooks/useCodeData'
import styles from '@/styles/topicDetail.module.scss'

const TestingDetail: React.FC = () => {
    const navigate = useNavigate()
    const { codeData, loading, error } = useCodeData('React', 'testing')

    const handleBack = () => {
        navigate('/technology/react')
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
                    返回React技术卡片
                </Button>
            </div>

            {/* 页面头部 */}
            <div className={styles.detail_header}>
                <div className={styles.topic_icon}>
                    <BugOutlined />
                </div>
                <div className={styles.topic_info}>
                    <h1>React 测试完全指南</h1>
                    <p>掌握React应用的单元测试、集成测试和E2E测试最佳实践</p>
                    <div className={styles.topic_tags}>
                        <Tag color="blue">React</Tag>
                        <Tag color="green">Testing Library</Tag>
                        <Tag color="orange">Jest</Tag>
                        <Tag color="purple">Mock</Tag>
                        <Tag color="red">E2E</Tag>
                    </div>
                </div>
            </div>

            {/* 内容区域 */}
            <div className={styles.content_sections}>
                {/* 测试基础 */}
                <Card title="🛠️ 测试环境搭建" className={styles.content_card}>
                    <div className={styles.setup_section}>
                        <h3>安装和配置</h3>
                        {codeData?.basicTesting && (
                            <CodeHighlight
                                code={codeData.basicTesting.code}
                                language={codeData.basicTesting.language}
                                title={codeData.basicTesting.title}
                            />
                        )}
                    </div>
                </Card>

                {/* 组件测试 */}
                <Card title="🧪 组件测试" className={styles.content_card}>
                    <div className={styles.usage_grid}>
                        <div className={styles.usage_item}>
                            <h4>1. 基础组件测试</h4>
                            {codeData?.componentTesting && (
                                <CodeHighlight
                                    code={codeData.componentTesting.code}
                                    language={codeData.componentTesting.language}
                                    title={codeData.componentTesting.title}
                                />
                            )}
                        </div>

                        <div className={styles.usage_item}>
                            <h4>2. 异步组件测试</h4>
                            {codeData?.mockingAndAsync && (
                                <CodeHighlight
                                    code={codeData.mockingAndAsync.code}
                                    language={codeData.mockingAndAsync.language}
                                    title={codeData.mockingAndAsync.title}
                                />
                            )}
                        </div>
                    </div>
                </Card>

                {/* Hook测试 */}
                <Card title="🪝 Custom Hook测试" className={styles.content_card}>
                    <div className={styles.hook_testing_section}>
                        <h3>测试自定义Hook</h3>
                        {codeData?.hookTesting && (
                            <CodeHighlight
                                code={codeData.hookTesting.code}
                                language={codeData.hookTesting.language}
                                title={codeData.hookTesting.title}
                            />
                        )}
                    </div>
                </Card>

                {/* 最佳实践 */}
                <Card title="✅ 测试最佳实践" className={styles.content_card}>
                    <div className={styles.best_practices}>
                        <h3>测试原则</h3>
                        <ul>
                            <li><strong>测试用户行为，而非实现细节</strong> - 关注用户如何与组件交互</li>
                            <li><strong>保持测试简单明了</strong> - 每个测试只验证一个功能点</li>
                            <li><strong>使用有意义的测试描述</strong> - 测试名称应该清楚说明测试内容</li>
                            <li><strong>模拟外部依赖</strong> - 隔离被测试的组件</li>
                            <li><strong>避免测试实现细节</strong> - 专注于组件的输入输出</li>
                        </ul>

                        <h3>常见测试场景</h3>
                        <CodeHighlight
                            code={`// ✅ 好的测试 - 测试用户行为
test('点击按钮应该增加计数', async () => {
  const user = userEvent.setup()
  render(<Counter />)
  
  const button = screen.getByRole('button', { name: /增加/i })
  await user.click(button)
  
  expect(screen.getByText('计数: 1')).toBeInTheDocument()
})

// ❌ 不好的测试 - 测试实现细节
test('应该调用setState', () => {
  const component = shallow(<Counter />)
  component.find('button').simulate('click')
  expect(component.state('count')).toBe(1)
})

// ✅ 测试表单提交
test('应该提交表单数据', async () => {
  const mockSubmit = jest.fn()
  const user = userEvent.setup()
  
  render(<LoginForm onSubmit={mockSubmit} />)
  
  await user.type(screen.getByLabelText(/用户名/i), 'testuser')
  await user.type(screen.getByLabelText(/密码/i), 'password123')
  await user.click(screen.getByRole('button', { name: /登录/i }))
  
  expect(mockSubmit).toHaveBeenCalledWith({
    username: 'testuser',
    password: 'password123'
  })
})

// ✅ 测试错误状态
test('应该显示错误信息', async () => {
  const mockFetch = jest.fn().mockRejectedValue(new Error('网络错误'))
  global.fetch = mockFetch
  
  render(<UserProfile userId="1" />)
  
  await waitFor(() => {
    expect(screen.getByText(/网络错误/)).toBeInTheDocument()
  })
})`}
                            language="javascript"
                            title="测试最佳实践示例"
                        />
                    </div>
                </Card>
            </div>
        </div>
    )
}

export default TestingDetail
