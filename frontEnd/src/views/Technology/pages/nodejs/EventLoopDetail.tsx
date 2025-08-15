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

const EventLoopDetail: React.FC = () => {
    const navigate = useNavigate()
    
    const handleBack = () => {
        navigate('/technology/nodejs')
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
                    返回Node.js技术卡片
                </Button>
            </div>
            
            {/* 页面头部 */}
            <div className={styles.detail_header}>
                <div className={styles.topic_icon}>
                    <RocketOutlined />
                </div>
                <div className={styles.topic_info}>
                    <h1>Node.js 事件循环机制</h1>
                    <p>深入理解Node.js的事件循环原理与异步编程模式</p>
                    <div className={styles.topic_tags}>
                        <Tag color="green">Node.js</Tag>
                        <Tag color="blue">事件循环</Tag>
                        <Tag color="orange">异步编程</Tag>
                        <Tag color="purple">性能优化</Tag>
                    </div>
                </div>
            </div>
            
            {/* 内容区域 */}
            <div className={styles.content_sections}>
                {/* 基础概念 */}
                <Card title="📚 事件循环基础" className={styles.content_card}>
                    <div className={styles.concept_content}>
                        <h3>什么是事件循环？</h3>
                        <p>事件循环是Node.js处理非阻塞I/O操作的核心机制。它允许Node.js执行非阻塞操作，尽管JavaScript是单线程的。事件循环负责执行代码、收集和处理事件以及执行队列中的子任务。</p>
                        
                        <h3>事件循环的阶段</h3>
                        <div className={styles.code_block}>
                            <pre>
{`┌───────────────────────────┐
┌─>│           timers          │  ← 执行setTimeout()和setInterval()的回调
│  └─────────────┬─────────────┘
│  ┌─────────────┴─────────────┐
│  │     pending callbacks     │  ← 执行延迟到下一个循环迭代的I/O回调
│  └─────────────┬─────────────┘
│  ┌─────────────┴─────────────┐
│  │       idle, prepare       │  ← 仅系统内部使用
│  └─────────────┬─────────────┘
│  ┌─────────────┴─────────────┐
│  │           poll            │  ← 获取新的I/O事件;执行与I/O相关的回调
│  └─────────────┬─────────────┘
│  ┌─────────────┴─────────────┐
│  │           check           │  ← setImmediate()回调函数在这里执行
│  └─────────────┬─────────────┘
│  ┌─────────────┴─────────────┐
└──┤      close callbacks      │  ← 一些关闭的回调函数
   └───────────────────────────┘`}
                            </pre>
                        </div>
                        
                        <h3>执行顺序示例</h3>
                        <div className={styles.code_block}>
                            <pre>
{`console.log('开始');

setTimeout(() => console.log('setTimeout'), 0);
setImmediate(() => console.log('setImmediate'));

process.nextTick(() => console.log('nextTick'));
Promise.resolve().then(() => console.log('Promise'));

console.log('结束');

// 输出顺序：
// 开始
// 结束
// nextTick
// Promise
// setTimeout
// setImmediate`}
                            </pre>
                        </div>
                    </div>
                </Card>
                
                {/* 微任务与宏任务 */}
                <Card title="🎯 微任务与宏任务" className={styles.content_card}>
                    <div className={styles.usage_grid}>
                        <div className={styles.usage_item}>
                            <h4>微任务 (Microtasks)</h4>
                            <div className={styles.code_block}>
                                <pre>
{`// 微任务具有更高的优先级
// 在每个事件循环阶段结束时执行

// process.nextTick (最高优先级)
process.nextTick(() => {
  console.log('nextTick 1');
});

process.nextTick(() => {
  console.log('nextTick 2');
});

// Promise.then
Promise.resolve().then(() => {
  console.log('Promise 1');
});

Promise.resolve().then(() => {
  console.log('Promise 2');
});

// 输出：
// nextTick 1
// nextTick 2
// Promise 1
// Promise 2`}
                                </pre>
                            </div>
                        </div>
                        
                        <div className={styles.usage_item}>
                            <h4>宏任务 (Macrotasks)</h4>
                            <div className={styles.code_block}>
                                <pre>
{`// 宏任务在事件循环的不同阶段执行

// setTimeout (timers阶段)
setTimeout(() => {
  console.log('setTimeout 1');
}, 0);

setTimeout(() => {
  console.log('setTimeout 2');
}, 0);

// setImmediate (check阶段)
setImmediate(() => {
  console.log('setImmediate 1');
});

setImmediate(() => {
  console.log('setImmediate 2');
});

// I/O操作 (poll阶段)
const fs = require('fs');
fs.readFile('file.txt', () => {
  console.log('文件读取完成');
});`}
                                </pre>
                            </div>
                        </div>
                    </div>
                </Card>
                
                {/* 实际应用 */}
                <Card title="💡 实际应用场景" className={styles.content_card}>
                    <div className={styles.application_section}>
                        <h3>1. 避免阻塞事件循环</h3>
                        <div className={styles.code_block}>
                            <pre>
{`// ❌ 错误：阻塞事件循环
function heavyComputation() {
  let result = 0;
  for (let i = 0; i < 10000000000; i++) {
    result += i;
  }
  return result;
}

// ✅ 正确：分批处理
function heavyComputationAsync(callback) {
  let result = 0;
  let i = 0;
  const batchSize = 1000000;
  
  function processBatch() {
    const end = Math.min(i + batchSize, 10000000000);
    
    for (; i < end; i++) {
      result += i;
    }
    
    if (i < 10000000000) {
      setImmediate(processBatch); // 让出控制权
    } else {
      callback(result);
    }
  }
  
  processBatch();
}`}
                            </pre>
                        </div>
                        
                        <h3>2. 理解异步操作的执行顺序</h3>
                        <div className={styles.code_block}>
                            <pre>
{`const fs = require('fs');

console.log('=== 程序开始 ===');

// 立即执行
console.log('1. 同步代码');

// 微任务队列
process.nextTick(() => console.log('2. nextTick'));
Promise.resolve().then(() => console.log('3. Promise'));

// 宏任务队列
setTimeout(() => console.log('4. setTimeout'), 0);
setImmediate(() => console.log('5. setImmediate'));

// I/O操作
fs.readFile(__filename, () => {
  console.log('6. fs.readFile');
  
  // 在I/O回调中的执行顺序
  setTimeout(() => console.log('7. setTimeout in I/O'), 0);
  setImmediate(() => console.log('8. setImmediate in I/O'));
  process.nextTick(() => console.log('9. nextTick in I/O'));
});

console.log('10. 同步代码结束');`}
                            </pre>
                        </div>
                    </div>
                </Card>
                
                {/* 性能优化 */}
                <Card title="⚡ 性能优化技巧" className={styles.content_card}>
                    <div className={styles.optimization_section}>
                        <h3>1. 监控事件循环延迟</h3>
                        <div className={styles.code_block}>
                            <pre>
{`const { performance } = require('perf_hooks');

function measureEventLoopDelay() {
  const start = performance.now();
  
  setImmediate(() => {
    const delay = performance.now() - start;
    console.log(\`事件循环延迟: \${delay.toFixed(2)}ms\`);
    
    if (delay > 10) {
      console.warn('⚠️ 事件循环延迟过高，可能存在阻塞操作');
    }
  });
}

// 定期监控
setInterval(measureEventLoopDelay, 1000);`}
                            </pre>
                        </div>
                        
                        <h3>2. 使用Worker Threads处理CPU密集型任务</h3>
                        <div className={styles.code_block}>
                            <pre>
{`// main.js
const { Worker, isMainThread, parentPort, workerData } = require('worker_threads');

if (isMainThread) {
  // 主线程
  function runWorker(data) {
    return new Promise((resolve, reject) => {
      const worker = new Worker(__filename, { workerData: data });
      
      worker.on('message', resolve);
      worker.on('error', reject);
      worker.on('exit', (code) => {
        if (code !== 0) {
          reject(new Error(\`Worker stopped with exit code \${code}\`));
        }
      });
    });
  }
  
  // 使用Worker处理CPU密集型任务
  runWorker({ numbers: [1, 2, 3, 4, 5] })
    .then(result => console.log('计算结果:', result))
    .catch(err => console.error('Worker错误:', err));
    
} else {
  // Worker线程
  function heavyComputation(numbers) {
    return numbers.reduce((sum, num) => sum + num * num, 0);
  }
  
  const result = heavyComputation(workerData.numbers);
  parentPort.postMessage(result);
}`}
                            </pre>
                        </div>
                    </div>
                </Card>
                
                {/* 最佳实践 */}
                <Card title="✅ 最佳实践" className={styles.content_card}>
                    <div className={styles.best_practices}>
                        <div className={styles.practice_item}>
                            <CheckCircleOutlined className={styles.practice_icon} />
                            <div>
                                <h4>1. 避免长时间运行的同步操作</h4>
                                <p>将CPU密集型任务分解为小块，使用setImmediate()让出控制权</p>
                            </div>
                        </div>
                        
                        <div className={styles.practice_item}>
                            <CheckCircleOutlined className={styles.practice_icon} />
                            <div>
                                <h4>2. 合理使用process.nextTick()</h4>
                                <p>避免过度使用process.nextTick()，可能导致I/O饥饿</p>
                            </div>
                        </div>
                        
                        <div className={styles.practice_item}>
                            <CheckCircleOutlined className={styles.practice_icon} />
                            <div>
                                <h4>3. 监控应用性能</h4>
                                <p>使用工具监控事件循环延迟和内存使用情况</p>
                            </div>
                        </div>
                        
                        <div className={styles.practice_item}>
                            <CheckCircleOutlined className={styles.practice_icon} />
                            <div>
                                <h4>4. 理解异步操作的执行顺序</h4>
                                <p>掌握微任务和宏任务的执行优先级，编写可预测的异步代码</p>
                            </div>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    )
}

export default EventLoopDetail
