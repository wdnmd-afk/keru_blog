import React from 'react'
import { Card, Tag, Button } from 'antd'
import { useNavigate } from 'react-router-dom'
import { ArrowLeftOutlined, SafetyOutlined } from '@ant-design/icons'
import CodeHighlight from '@/components/CodeHighlight'
import { useCodeData } from '@/hooks/useCodeData'
import styles from '@/styles/topicDetail.module.scss'

const ErrorBoundaryDetail: React.FC = () => {
  const navigate = useNavigate()
  const { codeData, loading, error } = useCodeData('React', 'errorBoundary')

  const handleBack = () => navigate('/technology/react')

  if (loading) return <div className={styles.loading}>加载中...</div>
  if (error) return <div className={styles.error}>加载失败: {error}</div>

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
          <SafetyOutlined />
        </div>
        <div className={styles.topic_info}>
          <h1>Error Boundary 深度解析</h1>
          <p>错误边界处理与异常捕获，构建健壮的React应用</p>
          <div className={styles.topic_tags}>
            <Tag color="blue">React</Tag>
            <Tag color="red">错误处理</Tag>
            <Tag color="orange">异常捕获</Tag>
            <Tag color="purple">用户体验</Tag>
          </div>
        </div>
      </div>

      {/* 内容区域 */}
      <div className={styles.content_sections}>
        {/* 基础概念 */}
        <Card title="📚 基础概念" className={styles.content_card}>
          <div className={styles.concept_content}>
            <h3>什么是Error Boundary？</h3>
            <p>Error Boundary（错误边界）是React组件，它可以捕获其子组件树中任何位置的JavaScript错误，记录这些错误，并显示一个备用UI，而不是让整个组件树崩溃。</p>

            <h3>基本实现</h3>
            {codeData?.basicUsage && (
              <CodeHighlight
                code={codeData.basicUsage.code}
                language={codeData.basicUsage.language}
                title={codeData.basicUsage.title}
              />
            )}
          </div>
        </Card>

        {/* 实用示例 */}
        <Card title="🎯 实用Error Boundary示例" className={styles.content_card}>
          <div className={styles.usage_grid}>
            <div className={styles.usage_item}>
              <h4>1. 使用Hook实现ErrorBoundary</h4>
              {codeData?.hookVersion && (
                <CodeHighlight
                  code={codeData.hookVersion.code}
                  language={codeData.hookVersion.language}
                  title={codeData.hookVersion.title}
                />
              )}
            </div>

            <div className={styles.usage_item}>
              <h4>2. 高级特性和最佳实践</h4>
              {codeData?.advancedFeatures && (
                <CodeHighlight
                  code={codeData.advancedFeatures.code}
                  language={codeData.advancedFeatures.language}
                  title={codeData.advancedFeatures.title}
                />
              )}
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}

export default ErrorBoundaryDetail

