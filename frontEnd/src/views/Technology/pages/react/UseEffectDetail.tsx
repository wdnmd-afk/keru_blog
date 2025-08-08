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
import styles from '@/styles/topicDetail.module.scss'

const UseEffectDetail: React.FC = () => {
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
                    <RocketOutlined />
                </div>
                <div className={styles.topic_info}>
                    <h1>useEffect 深度解析</h1>
                    <p>掌握Effect Hook的使用技巧，避免常见陷阱，提升React应用性能</p>
                    <div className={styles.topic_tags}>
                        <Tag color="blue">React Hooks</Tag>
                        <Tag color="orange">副作用</Tag>
                        <Tag color="green">生命周期</Tag>
                        <Tag color="purple">性能优化</Tag>
                    </div>
                </div>
            </div>
            
            {/* 内容区域 */}
            <div className={styles.content_sections}>
                {/* 基础概念 */}
                <Card title="📚 基础概念" className={styles.content_card}>
                    <div className={styles.concept_content}>
                        <h3>什么是useEffect？</h3>
                        <p>useEffect是React Hooks中用于处理副作用的Hook，它可以让你在函数组件中执行副作用操作，相当于类组件中的componentDidMount、componentDidUpdate和componentWillUnmount的组合。</p>
                        
                        <h3>基本语法</h3>
                        <div className={styles.code_block}>
                            <pre>
{`useEffect(() => {
  // 副作用逻辑
  console.log('组件渲染完成');
  
  // 清理函数（可选）
  return () => {
    console.log('组件卸载或依赖变化');
  };
}, [dependencies]); // 依赖数组`}
                            </pre>
                        </div>
                    </div>
                </Card>
                
                {/* 常见用法 */}
                <Card title="🔧 常见用法" className={styles.content_card}>
                    <div className={styles.usage_grid}>
                        <div className={styles.usage_item}>
                            <h4>1. 数据获取</h4>
                            <div className={styles.code_block}>
                                <pre>
{`useEffect(() => {
  const fetchData = async () => {
    const response = await fetch('/api/data');
    const data = await response.json();
    setData(data);
  };
  
  fetchData();
}, []); // 空依赖数组，只在挂载时执行`}
                                </pre>
                            </div>
                        </div>
                        
                        <div className={styles.usage_item}>
                            <h4>2. 订阅事件</h4>
                            <div className={styles.code_block}>
                                <pre>
{`useEffect(() => {
  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  };
  
  window.addEventListener('resize', handleResize);
  
  return () => {
    window.removeEventListener('resize', handleResize);
  };
}, []);`}
                                </pre>
                            </div>
                        </div>
                        
                        <div className={styles.usage_item}>
                            <h4>3. 定时器</h4>
                            <div className={styles.code_block}>
                                <pre>
{`useEffect(() => {
  const timer = setInterval(() => {
    setCount(prevCount => prevCount + 1);
  }, 1000);
  
  return () => clearInterval(timer);
}, []);`}
                                </pre>
                            </div>
                        </div>
                    </div>
                </Card>
                
                {/* 常见陷阱 */}
                <Card title="⚠️ 常见陷阱与解决方案" className={styles.content_card}>
                    <Alert
                        message="重要提醒"
                        description="以下是使用useEffect时最容易犯的错误，请仔细阅读并避免"
                        type="warning"
                        showIcon
                        icon={<WarningOutlined />}
                        style={{ marginBottom: 20 }}
                    />
                    
                    <div className={styles.traps_section}>
                        <div className={styles.trap_item}>
                            <div className={styles.trap_header}>
                                <BugOutlined className={styles.trap_icon} />
                                <h4>陷阱1: 缺少依赖项</h4>
                            </div>
                            <div className={styles.trap_content}>
                                <p className={styles.problem}>❌ 错误示例：</p>
                                <div className={styles.code_block}>
                                    <pre>
{`const [count, setCount] = useState(0);

useEffect(() => {
  const timer = setInterval(() => {
    setCount(count + 1); // 闭包陷阱
  }, 1000);
  
  return () => clearInterval(timer);
}, []); // 缺少count依赖`}
                                    </pre>
                                </div>
                                
                                <p className={styles.solution}>✅ 正确示例：</p>
                                <div className={styles.code_block}>
                                    <pre>
{`const [count, setCount] = useState(0);

useEffect(() => {
  const timer = setInterval(() => {
    setCount(prevCount => prevCount + 1); // 使用函数式更新
  }, 1000);
  
  return () => clearInterval(timer);
}, []); // 不依赖count，使用函数式更新`}
                                    </pre>
                                </div>
                            </div>
                        </div>
                        
                        <div className={styles.trap_item}>
                            <div className={styles.trap_header}>
                                <BugOutlined className={styles.trap_icon} />
                                <h4>陷阱2: 无限循环</h4>
                            </div>
                            <div className={styles.trap_content}>
                                <p className={styles.problem}>❌ 错误示例：</p>
                                <div className={styles.code_block}>
                                    <pre>
{`const [data, setData] = useState([]);

useEffect(() => {
  fetchData().then(setData);
}, [data]); // 依赖data，但effect中又更新data`}
                                    </pre>
                                </div>
                                
                                <p className={styles.solution}>✅ 正确示例：</p>
                                <div className={styles.code_block}>
                                    <pre>
{`const [data, setData] = useState([]);

useEffect(() => {
  fetchData().then(setData);
}, []); // 只在挂载时获取数据`}
                                    </pre>
                                </div>
                            </div>
                        </div>
                    </div>
                </Card>
                
                {/* 最佳实践 */}
                <Card title="✅ 最佳实践" className={styles.content_card}>
                    <div className={styles.best_practices}>
                        <div className={styles.practice_item}>
                            <CheckCircleOutlined className={styles.practice_icon} />
                            <div>
                                <h4>1. 合理使用依赖数组</h4>
                                <p>确保依赖数组包含effect中使用的所有变量，使用ESLint插件检查</p>
                            </div>
                        </div>
                        
                        <div className={styles.practice_item}>
                            <CheckCircleOutlined className={styles.practice_icon} />
                            <div>
                                <h4>2. 拆分多个useEffect</h4>
                                <p>按照关注点分离原则，将不同的副作用拆分到不同的useEffect中</p>
                            </div>
                        </div>
                        
                        <div className={styles.practice_item}>
                            <CheckCircleOutlined className={styles.practice_icon} />
                            <div>
                                <h4>3. 使用自定义Hook</h4>
                                <p>将复杂的effect逻辑提取到自定义Hook中，提高代码复用性</p>
                            </div>
                        </div>
                        
                        <div className={styles.practice_item}>
                            <CheckCircleOutlined className={styles.practice_icon} />
                            <div>
                                <h4>4. 正确清理副作用</h4>
                                <p>在cleanup函数中清理订阅、定时器等，避免内存泄漏</p>
                            </div>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    )
}

export default UseEffectDetail
