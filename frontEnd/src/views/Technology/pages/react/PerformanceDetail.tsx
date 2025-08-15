import React from 'react'
import { Card, Tag, Alert, Divider, Button } from 'antd'
import { useNavigate } from 'react-router-dom'
import {
    ArrowLeftOutlined,
    ThunderboltOutlined,
    WarningOutlined,
    CheckCircleOutlined,
    BugOutlined,
    RocketOutlined
} from '@ant-design/icons'
import styles from '@/styles/topicDetail.module.scss'

const PerformanceDetail: React.FC = () => {
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
                    <ThunderboltOutlined />
                </div>
                <div className={styles.topic_info}>
                    <h1>React Performance 深度解析</h1>
                    <p>React性能优化策略与实践，打造高性能的React应用</p>
                    <div className={styles.topic_tags}>
                        <Tag color="blue">React</Tag>
                        <Tag color="red">性能优化</Tag>
                        <Tag color="orange">最佳实践</Tag>
                        <Tag color="purple">高级技巧</Tag>
                    </div>
                </div>
            </div>

            {/* 内容区域 */}
            <div className={styles.content_sections}>
                {/* 性能分析工具 */}
                <Card title="🔍 性能分析工具" className={styles.content_card}>
                    <div className={styles.concept_content}>
                        <h3>React DevTools Profiler</h3>
                        <p>React官方提供的性能分析工具，可以帮助识别性能瓶颈和优化机会。</p>

                        <h4>使用步骤：</h4>
                        <ol>
                            <li>安装React DevTools浏览器扩展</li>
                            <li>在开发模式下打开应用</li>
                            <li>切换到Profiler标签页</li>
                            <li>点击录制按钮，执行需要分析的操作</li>
                            <li>停止录制，查看性能报告</li>
                        </ol>

                        <h3>关键指标</h3>
                        <ul>
                            <li><strong>Render Duration</strong>：组件渲染耗时</li>
                            <li><strong>Commit Duration</strong>：提交阶段耗时</li>
                            <li><strong>Interactions</strong>：用户交互追踪</li>
                            <li><strong>Flame Graph</strong>：组件渲染火焰图</li>
                        </ul>

                        <div className={styles.code_block}>
                            <pre>
{`// 在代码中添加性能标记
import { Profiler } from 'react';

function onRenderCallback(id, phase, actualDuration, baseDuration, startTime, commitTime) {
  console.log('组件渲染性能:', {
    id,           // 组件ID
    phase,        // "mount" 或 "update"
    actualDuration, // 实际渲染时间
    baseDuration,   // 预估渲染时间
    startTime,      // 开始时间
    commitTime      // 提交时间
  });
}

function App() {
  return (
    <Profiler id="App" onRender={onRenderCallback}>
      <MyComponent />
    </Profiler>
  );
}`}
                            </pre>
                        </div>
                    </div>
                </Card>

                {/* 核心优化技术 */}
                <Card title="⚡ 核心优化技术" className={styles.content_card}>
                    <div className={styles.usage_grid}>
                        <div className={styles.usage_item}>
                            <h4>1. React.memo - 组件记忆化</h4>
                            <div className={styles.code_block}>
                                <pre>
{`// 基础用法
const ExpensiveComponent = React.memo(({ data, onUpdate }) => {
  console.log('ExpensiveComponent 渲染');
  
  return (
    <div>
      <h3>{data.title}</h3>
      <button onClick={() => onUpdate(data.id)}>更新</button>
    </div>
  );
});

// 自定义比较函数
const CustomMemoComponent = React.memo(({ user, settings }) => {
  return (
    <div>
      <h3>{user.name}</h3>
      <p>{settings.theme}</p>
    </div>
  );
}, (prevProps, nextProps) => {
  // 返回true表示props相等，不需要重新渲染
  return (
    prevProps.user.id === nextProps.user.id &&
    prevProps.settings.theme === nextProps.settings.theme
  );
});

// 使用示例
const ParentComponent = () => {
  const [count, setCount] = useState(0);
  const [user] = useState({ id: 1, name: 'John' });
  
  return (
    <div>
      <button onClick={() => setCount(count + 1)}>
        Count: {count}
      </button>
      {/* user没有变化时，ExpensiveComponent不会重新渲染 */}
      <ExpensiveComponent 
        data={user} 
        onUpdate={(id) => console.log('Update user:', id)} 
      />
    </div>
  );
};`}
                                </pre>
                            </div>
                        </div>

                        <div className={styles.usage_item}>
                            <h4>2. 虚拟化长列表</h4>
                            <div className={styles.code_block}>
                                <pre>
{`// 使用react-window进行虚拟化
import { FixedSizeList as List } from 'react-window';

const VirtualizedList = ({ items }) => {
  const Row = ({ index, style }) => (
    <div style={style}>
      <div className="list-item">
        <h4>{items[index].title}</h4>
        <p>{items[index].description}</p>
      </div>
    </div>
  );
  
  return (
    <List
      height={600}        // 容器高度
      itemCount={items.length}  // 总项目数
      itemSize={100}      // 每项高度
      width="100%"
    >
      {Row}
    </List>
  );
};

// 动态高度列表
import { VariableSizeList as List } from 'react-window';

const DynamicList = ({ items }) => {
  const getItemSize = (index) => {
    // 根据内容计算高度
    return items[index].content.length > 100 ? 120 : 80;
  };
  
  const Row = ({ index, style }) => (
    <div style={style}>
      <div className="dynamic-item">
        <h4>{items[index].title}</h4>
        <p>{items[index].content}</p>
      </div>
    </div>
  );
  
  return (
    <List
      height={600}
      itemCount={items.length}
      itemSize={getItemSize}
      width="100%"
    >
      {Row}
    </List>
  );
};`}
                                </pre>
                            </div>
                        </div>

                        <div className={styles.usage_item}>
                            <h4>3. 代码分割与懒加载</h4>
                            <div className={styles.code_block}>
                                <pre>
{`// 路由级别的代码分割
import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// 懒加载组件
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Dashboard = lazy(() => import('./pages/Dashboard'));

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

// 组件级别的懒加载
const LazyModal = lazy(() => import('./Modal'));

const MyComponent = () => {
  const [showModal, setShowModal] = useState(false);
  
  return (
    <div>
      <button onClick={() => setShowModal(true)}>
        打开模态框
      </button>
      
      {showModal && (
        <Suspense fallback={<div>Loading modal...</div>}>
          <LazyModal onClose={() => setShowModal(false)} />
        </Suspense>
      )}
    </div>
  );
};

// 预加载策略
const preloadComponent = () => {
  import('./HeavyComponent');
};

// 在用户可能需要时预加载
<button 
  onMouseEnter={preloadComponent}
  onClick={() => setShowComponent(true)}
>
  显示组件
</button>`}
                                </pre>
                            </div>
                        </div>
                    </div>
                </Card>

                {/* 常见性能问题 */}
                <Card title="⚠️ 常见性能问题与解决方案" className={styles.content_card}>
                    <Alert
                        message="性能优化提醒"
                        description="识别和解决常见的React性能问题"
                        type="warning"
                        showIcon
                        icon={<WarningOutlined />}
                        style={{ marginBottom: 20 }}
                    />

                    <div className={styles.traps_section}>
                        <div className={styles.trap_item}>
                            <div className={styles.trap_header}>
                                <BugOutlined className={styles.trap_icon} />
                                <h4>问题1: 不必要的重新渲染</h4>
                            </div>
                            <div className={styles.trap_content}>
                                <p className={styles.problem}>❌ 问题代码：</p>
                                <div className={styles.code_block}>
                                    <pre>
{`// 每次渲染都创建新对象/函数
const ParentComponent = () => {
  const [count, setCount] = useState(0);

  return (
    <div>
      <button onClick={() => setCount(count + 1)}>
        Count: {count}
      </button>
      {/* 每次都传递新的对象和函数 */}
      <ChildComponent
        style={{ marginTop: 10 }}  // 新对象
        onClick={() => console.log('clicked')}  // 新函数
      />
    </div>
  );
};`}
                                    </pre>
                                </div>

                                <p className={styles.solution}>✅ 优化方案：</p>
                                <div className={styles.code_block}>
                                    <pre>
{`// 缓存对象和函数
const ParentComponent = () => {
  const [count, setCount] = useState(0);

  // 缓存样式对象
  const childStyle = useMemo(() => ({ marginTop: 10 }), []);

  // 缓存事件处理函数
  const handleClick = useCallback(() => {
    console.log('clicked');
  }, []);

  return (
    <div>
      <button onClick={() => setCount(count + 1)}>
        Count: {count}
      </button>
      <ChildComponent
        style={childStyle}
        onClick={handleClick}
      />
    </div>
  );
};

// 子组件使用React.memo
const ChildComponent = React.memo(({ style, onClick }) => {
  console.log('ChildComponent 渲染');
  return <div style={style} onClick={onClick}>Child</div>;
});`}
                                    </pre>
                                </div>
                            </div>
                        </div>

                        <div className={styles.trap_item}>
                            <div className={styles.trap_header}>
                                <BugOutlined className={styles.trap_icon} />
                                <h4>问题2: 大量DOM操作</h4>
                            </div>
                            <div className={styles.trap_content}>
                                <p className={styles.problem}>❌ 问题代码：</p>
                                <div className={styles.code_block}>
                                    <pre>
{`// 渲染大量DOM元素
const HeavyList = ({ items }) => {
  return (
    <div>
      {items.map(item => (
        <div key={item.id} className="item">
          <img src={item.image} alt={item.title} />
          <h3>{item.title}</h3>
          <p>{item.description}</p>
          <div className="actions">
            <button>编辑</button>
            <button>删除</button>
            <button>分享</button>
          </div>
        </div>
      ))}
    </div>
  );
};`}
                                    </pre>
                                </div>

                                <p className={styles.solution}>✅ 优化方案：</p>
                                <div className={styles.code_block}>
                                    <pre>
{`// 使用虚拟化 + 分页
import { FixedSizeList as List } from 'react-window';

const OptimizedList = ({ items }) => {
  const [visibleItems, setVisibleItems] = useState(items.slice(0, 50));

  const ItemRenderer = React.memo(({ index, style }) => {
    const item = visibleItems[index];

    return (
      <div style={style} className="item">
        <img
          src={item.image}
          alt={item.title}
          loading="lazy"  // 懒加载图片
        />
        <h3>{item.title}</h3>
        <p>{item.description}</p>
        <div className="actions">
          <button>编辑</button>
          <button>删除</button>
          <button>分享</button>
        </div>
      </div>
    );
  });

  return (
    <List
      height={600}
      itemCount={visibleItems.length}
      itemSize={120}
      width="100%"
    >
      {ItemRenderer}
    </List>
  );
};`}
                                    </pre>
                                </div>
                            </div>
                        </div>
                    </div>
                </Card>

                {/* 最佳实践 */}
                <Card title="✅ 性能优化最佳实践" className={styles.content_card}>
                    <div className={styles.best_practices}>
                        <div className={styles.practice_item}>
                            <CheckCircleOutlined className={styles.practice_icon} />
                            <div>
                                <h4>1. 合理使用key属性</h4>
                                <p>为列表项提供稳定、唯一的key，避免使用数组索引</p>
                                <div className={styles.code_block}>
                                    <pre>
{`// ❌ 不好的做法
{items.map((item, index) => (
  <Item key={index} data={item} />
))}

// ✅ 好的做法
{items.map(item => (
  <Item key={item.id} data={item} />
))}`}
                                    </pre>
                                </div>
                            </div>
                        </div>

                        <div className={styles.practice_item}>
                            <CheckCircleOutlined className={styles.practice_icon} />
                            <div>
                                <h4>2. 避免在render中创建对象</h4>
                                <p>将对象创建移到组件外部或使用useMemo缓存</p>
                                <div className={styles.code_block}>
                                    <pre>
{`// ❌ 每次渲染都创建新对象
const Component = () => {
  return <div style={{ margin: 10, padding: 5 }}>Content</div>;
};

// ✅ 将样式对象提取到外部
const styles = { margin: 10, padding: 5 };
const Component = () => {
  return <div style={styles}>Content</div>;
};`}
                                    </pre>
                                </div>
                            </div>
                        </div>

                        <div className={styles.practice_item}>
                            <CheckCircleOutlined className={styles.practice_icon} />
                            <div>
                                <h4>3. 使用生产构建</h4>
                                <p>确保在生产环境使用优化后的构建版本</p>
                                <div className={styles.code_block}>
                                    <pre>
{`// package.json
{
  "scripts": {
    "build": "react-scripts build",
    "build:analyze": "npm run build && npx bundle-analyzer build/static/js/*.js"
  }
}

// 分析打包大小
npm run build:analyze`}
                                    </pre>
                                </div>
                            </div>
                        </div>

                        <div className={styles.practice_item}>
                            <CheckCircleOutlined className={styles.practice_icon} />
                            <div>
                                <h4>4. 图片优化</h4>
                                <p>使用适当的图片格式和懒加载技术</p>
                                <div className={styles.code_block}>
                                    <pre>
{`// 响应式图片
const OptimizedImage = ({ src, alt, ...props }) => {
  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      decoding="async"
      {...props}
    />
  );
};

// 使用WebP格式
const WebPImage = ({ src, alt }) => {
  return (
    <picture>
      <source srcSet={\`\${src}.webp\`} type="image/webp" />
      <img src={\`\${src}.jpg\`} alt={alt} loading="lazy" />
    </picture>
  );
};`}
                                    </pre>
                                </div>
                            </div>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    )
}

export default PerformanceDetail
