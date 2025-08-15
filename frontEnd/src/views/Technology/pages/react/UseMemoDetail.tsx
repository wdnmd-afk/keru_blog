import React from 'react'
import { Card, Tag, Alert, Divider, Button } from 'antd'
import { useNavigate } from 'react-router-dom'
import {
    ArrowLeftOutlined,
    DatabaseOutlined,
    WarningOutlined,
    CheckCircleOutlined,
    BugOutlined,
    RocketOutlined
} from '@ant-design/icons'
import styles from '@/styles/topicDetail.module.scss'

const UseMemoDetail: React.FC = () => {
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
                    <DatabaseOutlined />
                </div>
                <div className={styles.topic_info}>
                    <h1>useMemo 深度解析</h1>
                    <p>缓存计算结果，优化组件性能，避免昂贵计算的重复执行</p>
                    <div className={styles.topic_tags}>
                        <Tag color="blue">React Hooks</Tag>
                        <Tag color="green">性能优化</Tag>
                        <Tag color="orange">缓存</Tag>
                        <Tag color="purple">计算优化</Tag>
                    </div>
                </div>
            </div>

            {/* 内容区域 */}
            <div className={styles.content_sections}>
                {/* 基础概念 */}
                <Card title="📚 基础概念" className={styles.content_card}>
                    <div className={styles.concept_content}>
                        <h3>什么是useMemo？</h3>
                        <p>useMemo是React提供的一个Hook，用于缓存计算结果。它会在依赖项不变的情况下返回缓存的值，避免在每次渲染时重复执行昂贵的计算。</p>

                        <h3>基本语法</h3>
                        <div className={styles.code_block}>
                            <pre>
{`const memoizedValue = useMemo(
  () => {
    // 昂贵的计算逻辑
    return computeExpensiveValue(a, b);
  },
  [a, b] // 依赖数组
);`}
                            </pre>
                        </div>

                        <h3>工作原理</h3>
                        <p>useMemo会比较依赖数组中的值，如果依赖项没有变化，就返回上次缓存的计算结果；如果依赖项发生变化，则重新执行计算函数并缓存新的结果。</p>
                    </div>
                </Card>

                {/* 使用场景 */}
                <Card title="🎯 核心使用场景" className={styles.content_card}>
                    <div className={styles.usage_grid}>
                        <div className={styles.usage_item}>
                            <h4>1. 昂贵计算优化</h4>
                            <div className={styles.code_block}>
                                <pre>
{`const ExpensiveComponent = ({ items, filter }) => {
  // 缓存过滤和排序结果
  const filteredAndSortedItems = useMemo(() => {
    console.log('执行昂贵的计算...');
    return items
      .filter(item => item.name.includes(filter))
      .sort((a, b) => a.priority - b.priority);
  }, [items, filter]);
  
  return (
    <div>
      {filteredAndSortedItems.map(item => (
        <div key={item.id}>{item.name}</div>
      ))}
    </div>
  );
};`}
                                </pre>
                            </div>
                        </div>

                        <div className={styles.usage_item}>
                            <h4>2. 对象引用稳定化</h4>
                            <div className={styles.code_block}>
                                <pre>
{`const Component = ({ userId, userName }) => {
  // 缓存用户对象，避免子组件不必要的重新渲染
  const user = useMemo(() => ({
    id: userId,
    name: userName,
    avatar: \`/avatars/\${userId}.jpg\`
  }), [userId, userName]);
  
  return <UserProfile user={user} />;
};

// 子组件使用React.memo优化
const UserProfile = React.memo(({ user }) => {
  console.log('UserProfile 重新渲染');
  return (
    <div>
      <img src={user.avatar} alt={user.name} />
      <span>{user.name}</span>
    </div>
  );
});`}
                                </pre>
                            </div>
                        </div>

                        <div className={styles.usage_item}>
                            <h4>3. 复杂数据转换</h4>
                            <div className={styles.code_block}>
                                <pre>
{`const ChartComponent = ({ rawData, chartType }) => {
  // 缓存图表数据转换结果
  const chartData = useMemo(() => {
    switch (chartType) {
      case 'line':
        return transformToLineData(rawData);
      case 'bar':
        return transformToBarData(rawData);
      case 'pie':
        return transformToPieData(rawData);
      default:
        return rawData;
    }
  }, [rawData, chartType]);
  
  return <Chart data={chartData} type={chartType} />;
};`}
                                </pre>
                            </div>
                        </div>
                    </div>
                </Card>

                {/* 常见陷阱 */}
                <Card title="⚠️ 常见陷阱与解决方案" className={styles.content_card}>
                    <Alert
                        message="重要提醒"
                        description="useMemo的使用需要权衡，不当使用可能降低性能"
                        type="warning"
                        showIcon
                        icon={<WarningOutlined />}
                        style={{ marginBottom: 20 }}
                    />

                    <div className={styles.traps_section}>
                        <div className={styles.trap_item}>
                            <div className={styles.trap_header}>
                                <BugOutlined className={styles.trap_icon} />
                                <h4>陷阱1: 过度使用useMemo</h4>
                            </div>
                            <div className={styles.trap_content}>
                                <p className={styles.problem}>❌ 错误示例：</p>
                                <div className={styles.code_block}>
                                    <pre>
{`// 对简单计算使用useMemo是多余的
const Component = ({ a, b }) => {
  // 简单的加法运算不需要缓存
  const sum = useMemo(() => a + b, [a, b]);

  // 简单的字符串拼接不需要缓存
  const greeting = useMemo(() => \`Hello, \${name}!\`, [name]);

  return <div>{sum} - {greeting}</div>;
};`}
                                    </pre>
                                </div>

                                <p className={styles.solution}>✅ 正确做法：</p>
                                <div className={styles.code_block}>
                                    <pre>
{`// 只对昂贵计算使用useMemo
const Component = ({ a, b, name }) => {
  // 简单计算直接执行
  const sum = a + b;
  const greeting = \`Hello, \${name}!\`;

  return <div>{sum} - {greeting}</div>;
};`}
                                    </pre>
                                </div>
                            </div>
                        </div>

                        <div className={styles.trap_item}>
                            <div className={styles.trap_header}>
                                <BugOutlined className={styles.trap_icon} />
                                <h4>陷阱2: 依赖项包含对象或数组</h4>
                            </div>
                            <div className={styles.trap_content}>
                                <p className={styles.problem}>❌ 错误示例：</p>
                                <div className={styles.code_block}>
                                    <pre>
{`const Component = ({ config }) => {
  // config是对象，每次渲染都是新的引用
  const processedData = useMemo(() => {
    return expensiveProcess(config);
  }, [config]); // config变化会导致重新计算

  return <div>{processedData}</div>;
};`}
                                    </pre>
                                </div>

                                <p className={styles.solution}>✅ 正确示例：</p>
                                <div className={styles.code_block}>
                                    <pre>
{`const Component = ({ config }) => {
  // 解构出具体的属性作为依赖
  const processedData = useMemo(() => {
    return expensiveProcess(config);
  }, [config.type, config.value, config.enabled]);

  return <div>{processedData}</div>;
};`}
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
                                <h4>1. 只缓存昂贵计算</h4>
                                <p>只对真正昂贵的计算使用useMemo，简单计算的缓存成本可能比计算本身更高</p>
                            </div>
                        </div>

                        <div className={styles.practice_item}>
                            <CheckCircleOutlined className={styles.practice_icon} />
                            <div>
                                <h4>2. 配合React.memo使用</h4>
                                <p>useMemo常用于稳定传递给子组件的props，配合React.memo避免不必要的重新渲染</p>
                            </div>
                        </div>

                        <div className={styles.practice_item}>
                            <CheckCircleOutlined className={styles.practice_icon} />
                            <div>
                                <h4>3. 性能测量</h4>
                                <p>使用React DevTools Profiler测量useMemo的实际效果，确保真正提升了性能</p>
                            </div>
                        </div>

                        <div className={styles.practice_item}>
                            <CheckCircleOutlined className={styles.practice_icon} />
                            <div>
                                <h4>4. 避免复杂依赖</h4>
                                <p>尽量避免将对象或数组直接作为依赖项，考虑解构出具体的原始值</p>
                            </div>
                        </div>
                    </div>
                </Card>

                {/* 进阶技巧 */}
                <Card title="🚀 进阶技巧" className={styles.content_card}>
                    <div className={styles.advanced_section}>
                        <h3>1. 与useCallback的区别</h3>
                        <div className={styles.code_block}>
                            <pre>
{`// useMemo缓存计算结果
const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);

// useCallback缓存函数引用
const memoizedCallback = useCallback(() => doSomething(a, b), [a, b]);

// 等价写法
const memoizedCallback = useMemo(() => () => doSomething(a, b), [a, b]);`}
                            </pre>
                        </div>

                        <h3>2. 条件性缓存</h3>
                        <div className={styles.code_block}>
                            <pre>
{`const Component = ({ data, shouldOptimize }) => {
  const processedData = useMemo(() => {
    if (!shouldOptimize) {
      // 不需要优化时直接计算
      return expensiveProcess(data);
    }
    // 需要优化时才缓存
    return expensiveProcess(data);
  }, shouldOptimize ? [data] : [data, Math.random()]);

  return <div>{processedData}</div>;
};`}
                            </pre>
                        </div>

                        <h3>3. 自定义Hook中的应用</h3>
                        <div className={styles.code_block}>
                            <pre>
{`const useFilteredData = (data, filters) => {
  return useMemo(() => {
    return data.filter(item => {
      return Object.entries(filters).every(([key, value]) => {
        if (!value) return true;
        return item[key]?.toString().toLowerCase().includes(value.toLowerCase());
      });
    });
  }, [data, filters]);
};`}
                            </pre>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    )
}

export default UseMemoDetail
