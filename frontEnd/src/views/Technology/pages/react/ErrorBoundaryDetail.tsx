import React from 'react'
import { Card, Tag, Alert, Divider, Button } from 'antd'
import { useNavigate } from 'react-router-dom'
import { 
    ArrowLeftOutlined, 
    SafetyOutlined, 
    WarningOutlined,
    CheckCircleOutlined,
    BugOutlined,
    RocketOutlined
} from '@ant-design/icons'
import styles from '@/styles/topicDetail.module.scss'

const ErrorBoundaryDetail: React.FC = () => {
    const navigate = useNavigate()
    
    const handleBack = () => {
        navigate('/technology/react')
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
                        <div className={styles.code_block}>
                            <pre>
{`class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    // 更新state，下次渲染将显示备用UI
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // 记录错误信息
    console.error('ErrorBoundary捕获到错误:', error, errorInfo);
    
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
    
    // 可以将错误信息发送到错误报告服务
    this.logErrorToService(error, errorInfo);
  }

  logErrorToService = (error, errorInfo) => {
    // 发送错误信息到监控服务
    // 例如：Sentry, LogRocket, Bugsnag等
  }

  render() {
    if (this.state.hasError) {
      // 自定义错误UI
      return (
        <div className="error-boundary">
          <h2>哎呀，出错了！</h2>
          <details style={{ whiteSpace: 'pre-wrap' }}>
            {this.state.error && this.state.error.toString()}
            <br />
            {this.state.errorInfo.componentStack}
          </details>
        </div>
      );
    }

    return this.props.children;
  }
}`}
                            </pre>
                        </div>
                        
                        <h3>使用方式</h3>
                        <div className={styles.code_block}>
                            <pre>
{`function App() {
  return (
    <ErrorBoundary>
      <Header />
      <MainContent />
      <Footer />
    </ErrorBoundary>
  );
}`}
                            </pre>
                        </div>
                    </div>
                </Card>
                
                {/* 实用示例 */}
                <Card title="🎯 实用Error Boundary示例" className={styles.content_card}>
                    <div className={styles.usage_grid}>
                        <div className={styles.usage_item}>
                            <h4>1. 高级Error Boundary组件</h4>
                            <div className={styles.code_block}>
                                <pre>
{`class AdvancedErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
      eventId: null
    };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // 生成错误ID用于用户反馈
    const eventId = Date.now().toString();
    
    this.setState({
      error,
      errorInfo,
      eventId
    });

    // 发送到错误监控服务
    if (typeof window !== 'undefined') {
      // 发送错误信息
      this.reportError(error, errorInfo, eventId);
    }
  }

  reportError = (error, errorInfo, eventId) => {
    const errorData = {
      message: error.message,
      stack: error.stack,
      componentStack: errorInfo.componentStack,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      url: window.location.href,
      eventId
    };

    // 发送到监控服务
    fetch('/api/errors', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(errorData)
    }).catch(console.error);
  }

  handleRetry = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
      eventId: null
    });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary-container">
          <div className="error-content">
            <h2>🚨 应用遇到了问题</h2>
            <p>我们已经记录了这个错误，正在努力修复。</p>
            
            <div className="error-actions">
              <button onClick={this.handleRetry} className="retry-btn">
                重试
              </button>
              <button onClick={() => window.location.reload()} className="reload-btn">
                刷新页面
              </button>
            </div>
            
            {this.props.showDetails && (
              <details className="error-details">
                <summary>错误详情 (ID: {this.state.eventId})</summary>
                <pre>{this.state.error?.toString()}</pre>
                <pre>{this.state.errorInfo?.componentStack}</pre>
              </details>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}`}
                                </pre>
                            </div>
                        </div>
                        
                        <div className={styles.usage_item}>
                            <h4>2. 函数式Error Boundary Hook</h4>
                            <div className={styles.code_block}>
                                <pre>
{`// 自定义Hook用于错误处理
const useErrorHandler = () => {
  const [error, setError] = useState(null);

  const resetError = useCallback(() => {
    setError(null);
  }, []);

  const captureError = useCallback((error, errorInfo) => {
    setError({ error, errorInfo });
    
    // 发送错误报告
    console.error('捕获到错误:', error, errorInfo);
  }, []);

  // 使用useEffect来捕获异步错误
  useEffect(() => {
    const handleUnhandledRejection = (event) => {
      captureError(new Error(event.reason), { 
        componentStack: 'Promise rejection' 
      });
    };

    window.addEventListener('unhandledrejection', handleUnhandledRejection);
    
    return () => {
      window.removeEventListener('unhandledrejection', handleUnhandledRejection);
    };
  }, [captureError]);

  return { error, resetError, captureError };
};

// 函数式Error Boundary组件
const FunctionalErrorBoundary = ({ children, fallback }) => {
  const { error, resetError } = useErrorHandler();

  if (error) {
    return fallback ? fallback(error, resetError) : (
      <div className="error-fallback">
        <h2>出现错误</h2>
        <button onClick={resetError}>重试</button>
      </div>
    );
  }

  return children;
};

// 使用示例
const App = () => {
  return (
    <FunctionalErrorBoundary
      fallback={(error, retry) => (
        <div className="custom-error-ui">
          <h2>应用出错了</h2>
          <p>{error.error.message}</p>
          <button onClick={retry}>重新加载</button>
        </div>
      )}
    >
      <MyComponent />
    </FunctionalErrorBoundary>
  );
};`}
                                </pre>
                            </div>
                        </div>
                    </div>
                </Card>

                {/* 最佳实践 */}
                <Card title="✅ Error Boundary最佳实践" className={styles.content_card}>
                    <div className={styles.best_practices}>
                        <div className={styles.practice_item}>
                            <CheckCircleOutlined className={styles.practice_icon} />
                            <div>
                                <h4>1. 分层错误边界</h4>
                                <p>在应用的不同层级设置错误边界，实现细粒度的错误处理</p>
                                <div className={styles.code_block}>
                                    <pre>
{`function App() {
  return (
    <ErrorBoundary name="App">
      <Header />
      <ErrorBoundary name="MainContent">
        <Sidebar />
        <ErrorBoundary name="ContentArea">
          <ArticleList />
          <ArticleDetail />
        </ErrorBoundary>
      </ErrorBoundary>
      <Footer />
    </ErrorBoundary>
  );
}`}
                                    </pre>
                                </div>
                            </div>
                        </div>

                        <div className={styles.practice_item}>
                            <CheckCircleOutlined className={styles.practice_icon} />
                            <div>
                                <h4>2. 错误信息收集</h4>
                                <p>收集详细的错误信息用于调试和监控</p>
                                <div className={styles.code_block}>
                                    <pre>
{`const collectErrorInfo = (error, errorInfo) => {
  return {
    // 基本错误信息
    message: error.message,
    stack: error.stack,

    // React组件栈
    componentStack: errorInfo.componentStack,

    // 环境信息
    timestamp: new Date().toISOString(),
    userAgent: navigator.userAgent,
    url: window.location.href,

    // 用户信息（如果有）
    userId: getCurrentUserId(),

    // 应用状态
    reduxState: store.getState(),

    // 自定义标签
    tags: {
      environment: process.env.NODE_ENV,
      version: process.env.REACT_APP_VERSION
    }
  };
};`}
                                    </pre>
                                </div>
                            </div>
                        </div>

                        <div className={styles.practice_item}>
                            <CheckCircleOutlined className={styles.practice_icon} />
                            <div>
                                <h4>3. 优雅的错误UI</h4>
                                <p>设计用户友好的错误界面，提供有用的操作选项</p>
                                <div className={styles.code_block}>
                                    <pre>
{`const ErrorFallback = ({ error, resetError, eventId }) => {
  const [feedbackSent, setFeedbackSent] = useState(false);

  const sendFeedback = async (feedback) => {
    try {
      await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ eventId, feedback })
      });
      setFeedbackSent(true);
    } catch (err) {
      console.error('发送反馈失败:', err);
    }
  };

  return (
    <div className="error-fallback">
      <div className="error-icon">🚨</div>
      <h2>哎呀，出现了问题</h2>
      <p>我们遇到了一个意外错误，但不用担心，您的数据是安全的。</p>

      <div className="error-actions">
        <button onClick={resetError} className="primary-btn">
          重试
        </button>
        <button onClick={() => window.location.reload()} className="secondary-btn">
          刷新页面
        </button>
        <button onClick={() => window.history.back()} className="secondary-btn">
          返回上一页
        </button>
      </div>

      {!feedbackSent ? (
        <div className="feedback-section">
          <p>遇到问题了吗？告诉我们发生了什么：</p>
          <textarea
            placeholder="描述您遇到的问题..."
            onBlur={(e) => e.target.value && sendFeedback(e.target.value)}
          />
        </div>
      ) : (
        <p className="feedback-thanks">感谢您的反馈！我们会尽快修复这个问题。</p>
      )}

      <details className="error-details">
        <summary>技术详情 (错误ID: {eventId})</summary>
        <pre>{error.message}</pre>
      </details>
    </div>
  );
};`}
                                    </pre>
                                </div>
                            </div>
                        </div>
                    </div>
                </Card>

                {/* 注意事项 */}
                <Card title="⚠️ 重要注意事项" className={styles.content_card}>
                    <Alert
                        message="Error Boundary的限制"
                        description="了解Error Boundary无法捕获的错误类型"
                        type="warning"
                        showIcon
                        icon={<WarningOutlined />}
                        style={{ marginBottom: 20 }}
                    />

                    <div className={styles.limitations_section}>
                        <h3>Error Boundary无法捕获的错误：</h3>
                        <ul>
                            <li><strong>事件处理器中的错误</strong> - 需要使用try-catch</li>
                            <li><strong>异步代码错误</strong> - setTimeout、Promise等</li>
                            <li><strong>服务端渲染错误</strong></li>
                            <li><strong>Error Boundary自身的错误</strong></li>
                        </ul>

                        <h3>处理这些错误的方法：</h3>
                        <div className={styles.code_block}>
                            <pre>
{`// 1. 事件处理器错误
const handleClick = () => {
  try {
    // 可能出错的代码
    riskyOperation();
  } catch (error) {
    // 手动处理错误
    console.error('事件处理错误:', error);
    showErrorMessage('操作失败，请重试');
  }
};

// 2. 异步错误处理
const fetchData = async () => {
  try {
    const response = await fetch('/api/data');
    const data = await response.json();
    setData(data);
  } catch (error) {
    console.error('数据获取失败:', error);
    setError(error);
  }
};

// 3. 全局错误处理
window.addEventListener('error', (event) => {
  console.error('全局错误:', event.error);
  // 发送到错误监控服务
});

window.addEventListener('unhandledrejection', (event) => {
  console.error('未处理的Promise拒绝:', event.reason);
  // 发送到错误监控服务
});`}
                            </pre>
                        </div>
                    </div>
                </Card>

                {/* 与监控服务集成 */}
                <Card title="🔗 与监控服务集成" className={styles.content_card}>
                    <div className={styles.integration_section}>
                        <h3>集成Sentry错误监控</h3>
                        <div className={styles.code_block}>
                            <pre>
{`// 安装Sentry
npm install @sentry/react @sentry/tracing

// 配置Sentry
import * as Sentry from "@sentry/react";
import { Integrations } from "@sentry/tracing";

Sentry.init({
  dsn: "YOUR_SENTRY_DSN",
  integrations: [
    new Integrations.BrowserTracing(),
  ],
  tracesSampleRate: 1.0,
});

// 创建Sentry Error Boundary
const SentryErrorBoundary = Sentry.withErrorBoundary(MyComponent, {
  fallback: ({ error, resetError }) => (
    <div>
      <h2>出现错误</h2>
      <button onClick={resetError}>重试</button>
    </div>
  ),
});

// 手动发送错误
const reportError = (error, context) => {
  Sentry.withScope((scope) => {
    scope.setTag("section", "checkout");
    scope.setLevel("error");
    scope.setContext("character", context);
    Sentry.captureException(error);
  });
};`}
                            </pre>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    )
}

export default ErrorBoundaryDetail
