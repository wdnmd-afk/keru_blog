import React from 'react'
import { Card, Tag, Alert, Divider, Button } from 'antd'
import { useNavigate } from 'react-router-dom'
import { 
    ArrowLeftOutlined, 
    BugOutlined, 
    WarningOutlined,
    CheckCircleOutlined,
    SearchOutlined
} from '@ant-design/icons'
import styles from '@/styles/topicDetail.module.scss'

const ChromeDevToolsDetail: React.FC = () => {
    const navigate = useNavigate()
    
    const handleBack = () => {
        navigate('/technology/tools')
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
                    返回开发工具技术卡片
                </Button>
            </div>
            
            {/* 页面头部 */}
            <div className={styles.detail_header}>
                <div className={styles.topic_icon}>
                    <BugOutlined />
                </div>
                <div className={styles.topic_info}>
                    <h1>Chrome DevTools 详解</h1>
                    <p>掌握Chrome开发者工具的高效调试技巧</p>
                    <div className={styles.topic_tags}>
                        <Tag color="blue">Chrome DevTools</Tag>
                        <Tag color="green">调试技巧</Tag>
                        <Tag color="orange">性能分析</Tag>
                        <Tag color="purple">网络监控</Tag>
                    </div>
                </div>
            </div>
            
            {/* 内容区域 */}
            <div className={styles.content_sections}>
                {/* DevTools概述 */}
                <Card title="🛠️ Chrome DevTools 概述" className={styles.content_card}>
                    <div className={styles.concept_content}>
                        <h3>开发者工具面板</h3>
                        <div className={styles.concepts_grid}>
                            <div className={styles.concept_item}>
                                <h4>🔍 Elements</h4>
                                <p>检查和修改HTML/CSS，实时预览样式变化</p>
                            </div>
                            
                            <div className={styles.concept_item}>
                                <h4>📝 Console</h4>
                                <p>执行JavaScript代码，查看日志和错误信息</p>
                            </div>
                            
                            <div className={styles.concept_item}>
                                <h4>📁 Sources</h4>
                                <p>调试JavaScript代码，设置断点和监视变量</p>
                            </div>
                            
                            <div className={styles.concept_item}>
                                <h4>🌐 Network</h4>
                                <p>监控网络请求，分析加载性能</p>
                            </div>
                            
                            <div className={styles.concept_item}>
                                <h4>⚡ Performance</h4>
                                <p>分析页面性能，识别性能瓶颈</p>
                            </div>
                            
                            <div className={styles.concept_item}>
                                <h4>💾 Application</h4>
                                <p>管理存储、缓存和Service Workers</p>
                            </div>
                        </div>
                        
                        <h3>快捷键</h3>
                        <div className={styles.code_block}>
                            <pre>
{`// 打开DevTools
F12 或 Ctrl+Shift+I (Windows/Linux)
Cmd+Option+I (Mac)

// 快速切换面板
Ctrl+[ / Ctrl+] - 切换面板
Ctrl+Shift+C - 选择元素模式
Ctrl+Shift+J - 直接打开Console
Ctrl+Shift+I - 打开/关闭DevTools

// 调试快捷键
F8 - 继续执行
F10 - 单步执行
F11 - 步入函数
Shift+F11 - 步出函数
Ctrl+Shift+F5 - 硬刷新`}
                            </pre>
                        </div>
                    </div>
                </Card>
                
                {/* Elements面板 */}
                <Card title="🔍 Elements 面板详解" className={styles.content_card}>
                    <div className={styles.usage_grid}>
                        <div className={styles.usage_item}>
                            <h4>1. DOM检查与修改</h4>
                            <div className={styles.code_block}>
                                <pre>
{`// 选择元素的方法
1. 点击选择工具 (Ctrl+Shift+C)
2. 右键页面元素 -> 检查
3. 在Console中使用选择器
   $('selector') - 选择第一个匹配元素
   $$('selector') - 选择所有匹配元素
   $0 - 当前选中的元素
   $1, $2... - 之前选中的元素

// 实时编辑HTML
- 双击元素标签名修改
- 双击属性值修改
- 右键 -> Edit as HTML 批量修改
- 拖拽元素重新排序

// 添加/删除元素
- 右键 -> Delete element
- 右键 -> Duplicate element
- 右键 -> Copy -> Copy element/outerHTML`}
                                </pre>
                            </div>
                        </div>
                        
                        <div className={styles.usage_item}>
                            <h4>2. CSS样式调试</h4>
                            <div className={styles.code_block}>
                                <pre>
{`// Styles面板功能
1. 实时修改CSS属性
   - 点击属性值直接编辑
   - 使用上下箭头调整数值
   - 点击颜色块打开颜色选择器

2. 添加新样式
   - 点击 + 号添加新规则
   - 在element.style中添加内联样式

3. 样式状态模拟
   - :hover, :active, :focus, :visited
   - 点击 :hov 按钮激活

4. 计算样式查看
   - Computed标签查看最终样式
   - 显示样式来源和优先级

// 有用的CSS调试技巧
- 使用 * { border: 1px solid red; } 查看布局
- 检查box-sizing属性
- 查看margin/padding的可视化显示`}
                                </pre>
                            </div>
                        </div>
                        
                        <div className={styles.usage_item}>
                            <h4>3. 响应式设计调试</h4>
                            <div className={styles.code_block}>
                                <pre>
{`// 设备模拟
1. 点击设备图标 (Ctrl+Shift+M)
2. 选择预设设备或自定义尺寸
3. 模拟不同的DPR (Device Pixel Ratio)
4. 模拟网络条件

// 媒体查询调试
- 在Styles面板查看激活的媒体查询
- 点击媒体查询规则跳转到对应断点
- 使用尺寸条上的断点标记

// 视口调试
- 查看视口尺寸信息
- 测试不同方向 (横屏/竖屏)
- 模拟触摸事件`}
                                </pre>
                            </div>
                        </div>
                    </div>
                </Card>
                
                {/* Console面板 */}
                <Card title="📝 Console 面板详解" className={styles.content_card}>
                    <div className={styles.console_section}>
                        <h3>Console API详解</h3>
                        <div className={styles.code_block}>
                            <pre>
{`// 基本日志输出
console.log('普通日志')
console.info('信息日志')
console.warn('警告日志')
console.error('错误日志')

// 格式化输出
console.log('%c样式化文本', 'color: red; font-size: 20px;')
console.log('数字: %d, 字符串: %s', 42, 'hello')

// 分组输出
console.group('用户信息')
console.log('姓名: 张三')
console.log('年龄: 25')
console.groupEnd()

// 表格输出
const users = [
  { name: '张三', age: 25 },
  { name: '李四', age: 30 }
]
console.table(users)

// 性能测试
console.time('操作耗时')
// 执行一些操作
console.timeEnd('操作耗时')

// 断言
console.assert(1 === 2, '1不等于2')

// 计数器
console.count('点击次数')
console.countReset('点击次数')

// 堆栈跟踪
console.trace('调用堆栈')`}
                            </pre>
                        </div>
                        
                        <h3>Console实用技巧</h3>
                        <div className={styles.code_block}>
                            <pre>
{`// 选择器快捷方式
$('selector') // document.querySelector()
$$('selector') // document.querySelectorAll()
$x('//xpath') // XPath选择器

// 元素引用
$0 // 当前选中的元素
$1, $2, $3, $4 // 之前选中的元素

// 实用函数
dir(object) // 显示对象的所有属性
keys(object) // 获取对象的所有键
values(object) // 获取对象的所有值
copy(object) // 复制到剪贴板
clear() // 清空控制台

// 监控函数调用
monitor(function) // 监控函数调用
unmonitor(function) // 停止监控

// 事件监听
monitorEvents(element, 'click') // 监控元素的点击事件
unmonitorEvents(element) // 停止监控

// 性能分析
profile('性能分析') // 开始性能分析
profileEnd('性能分析') // 结束性能分析`}
                            </pre>
                        </div>
                    </div>
                </Card>
                
                {/* Sources调试 */}
                <Card title="📁 Sources 调试详解" className={styles.content_card}>
                    <div className={styles.sources_section}>
                        <h3>断点调试</h3>
                        <div className={styles.code_block}>
                            <pre>
{`// 断点类型
1. 行断点 - 点击行号设置
2. 条件断点 - 右键行号设置条件
3. DOM断点 - 在Elements面板右键元素设置
4. XHR断点 - 在Sources面板设置网络请求断点
5. 事件监听器断点 - 在Sources面板设置事件断点

// 调试控制
F8 / Ctrl+\ - 继续执行
F10 / Ctrl+' - 单步执行 (Step over)
F11 / Ctrl+; - 步入函数 (Step into)
Shift+F11 / Ctrl+Shift+; - 步出函数 (Step out)

// 在代码中设置断点
debugger; // 程序会在此处暂停

// 条件断点示例
// 只有当 i > 5 时才暂停
for (let i = 0; i < 10; i++) {
  // 在此行设置条件断点: i > 5
  console.log(i);
}`}
                            </pre>
                        </div>
                        
                        <h3>变量监视</h3>
                        <div className={styles.code_block}>
                            <pre>
{`// Watch面板
- 添加表达式监视变量值变化
- 支持复杂表达式: obj.prop, arr[0], func()

// Scope面板
- Local: 当前函数作用域
- Closure: 闭包变量
- Global: 全局变量

// Call Stack面板
- 显示函数调用堆栈
- 点击堆栈项跳转到对应代码

// 实用调试技巧
1. 使用console.log()输出中间值
2. 利用条件断点减少无效暂停
3. 使用Watch监视关键变量
4. 检查Call Stack理解执行流程
5. 在Console中执行代码测试修复方案`}
                            </pre>
                        </div>
                    </div>
                </Card>
                
                {/* Network面板 */}
                <Card title="🌐 Network 网络分析" className={styles.content_card}>
                    <div className={styles.network_section}>
                        <h3>网络请求分析</h3>
                        <div className={styles.code_block}>
                            <pre>
{`// Network面板功能
1. 请求列表
   - Name: 请求的文件名
   - Status: HTTP状态码
   - Type: 资源类型 (Document, Stylesheet, Script等)
   - Initiator: 请求发起者
   - Size: 文件大小
   - Time: 请求耗时
   - Waterfall: 时间瀑布图

2. 过滤器
   - All: 所有请求
   - XHR: Ajax请求
   - JS: JavaScript文件
   - CSS: 样式文件
   - Img: 图片文件
   - Media: 媒体文件
   - Font: 字体文件
   - Doc: HTML文档
   - WS: WebSocket连接

3. 网络条件模拟
   - Fast 3G, Slow 3G
   - Offline模式
   - 自定义网络速度`}
                            </pre>
                        </div>
                        
                        <h3>性能优化分析</h3>
                        <div className={styles.code_block}>
                            <pre>
{`// 关键指标分析
1. DOMContentLoaded事件 (蓝线)
   - DOM解析完成时间
   - 通常应该在1-2秒内

2. Load事件 (红线)
   - 所有资源加载完成时间
   - 包括图片、样式、脚本等

3. 首次内容绘制 (FCP)
   - 页面首次渲染内容的时间
   - 应该在1.8秒内

4. 最大内容绘制 (LCP)
   - 最大元素渲染完成时间
   - 应该在2.5秒内

// 优化建议
1. 减少请求数量
   - 合并CSS/JS文件
   - 使用CSS Sprites
   - 内联小图片

2. 压缩资源
   - 启用Gzip压缩
   - 压缩图片
   - 最小化CSS/JS

3. 使用缓存
   - 设置合适的Cache-Control
   - 使用CDN
   - 利用浏览器缓存

4. 优化关键渲染路径
   - 内联关键CSS
   - 异步加载非关键资源
   - 预加载重要资源`}
                            </pre>
                        </div>
                    </div>
                </Card>
                
                {/* Performance面板 */}
                <Card title="⚡ Performance 性能分析" className={styles.content_card}>
                    <div className={styles.performance_section}>
                        <h3>性能录制与分析</h3>
                        <div className={styles.code_block}>
                            <pre>
{`// 性能录制步骤
1. 打开Performance面板
2. 点击录制按钮 (圆形按钮)
3. 执行要分析的操作
4. 点击停止录制
5. 分析性能报告

// 性能指标解读
1. FPS (Frames Per Second)
   - 绿色条越高表示帧率越好
   - 红色表示掉帧严重

2. CPU使用率
   - 蓝色: HTML/CSS解析
   - 黄色: JavaScript执行
   - 紫色: 样式计算和布局
   - 绿色: 绘制和合成

3. 网络活动
   - 显示网络请求时间线

4. 主线程活动
   - 显示JavaScript执行详情
   - 可以看到函数调用堆栈`}
                            </pre>
                        </div>
                        
                        <h3>性能优化技巧</h3>
                        <div className={styles.code_block}>
                            <pre>
{`// JavaScript性能优化
1. 避免长时间运行的脚本
   - 使用Web Workers处理复杂计算
   - 分批处理大量数据
   - 使用requestAnimationFrame

2. 减少DOM操作
   - 批量修改DOM
   - 使用DocumentFragment
   - 避免频繁的样式计算

3. 优化事件处理
   - 使用事件委托
   - 及时移除事件监听器
   - 使用passive事件监听器

// CSS性能优化
1. 避免复杂选择器
   - 减少嵌套层级
   - 避免通配符选择器
   - 使用类选择器而非标签选择器

2. 减少重排和重绘
   - 使用transform代替position
   - 批量修改样式
   - 使用will-change提示浏览器

3. 优化动画
   - 使用CSS动画而非JavaScript
   - 只对transform和opacity做动画
   - 使用硬件加速`}
                            </pre>
                        </div>
                    </div>
                </Card>
                
                {/* 最佳实践 */}
                <Card title="✅ DevTools 最佳实践" className={styles.content_card}>
                    <div className={styles.best_practices}>
                        <div className={styles.practice_item}>
                            <CheckCircleOutlined className={styles.practice_icon} />
                            <div>
                                <h4>1. 高效调试</h4>
                                <p>掌握高效的调试技巧</p>
                                <ul>
                                    <li>熟练使用快捷键提高效率</li>
                                    <li>合理设置断点，避免过度调试</li>
                                    <li>利用Console API输出调试信息</li>
                                    <li>使用条件断点精确定位问题</li>
                                </ul>
                            </div>
                        </div>
                        
                        <div className={styles.practice_item}>
                            <CheckCircleOutlined className={styles.practice_icon} />
                            <div>
                                <h4>2. 性能监控</h4>
                                <p>建立性能监控习惯</p>
                                <ul>
                                    <li>定期进行性能分析</li>
                                    <li>关注关键性能指标</li>
                                    <li>模拟不同网络条件测试</li>
                                    <li>使用Lighthouse进行综合评估</li>
                                </ul>
                            </div>
                        </div>
                        
                        <div className={styles.practice_item}>
                            <CheckCircleOutlined className={styles.practice_icon} />
                            <div>
                                <h4>3. 网络优化</h4>
                                <p>优化网络请求性能</p>
                                <ul>
                                    <li>分析请求瀑布图找出瓶颈</li>
                                    <li>优化资源加载顺序</li>
                                    <li>减少不必要的网络请求</li>
                                    <li>合理使用缓存策略</li>
                                </ul>
                            </div>
                        </div>
                        
                        <div className={styles.practice_item}>
                            <CheckCircleOutlined className={styles.practice_icon} />
                            <div>
                                <h4>4. 移动端调试</h4>
                                <p>掌握移动端调试技巧</p>
                                <ul>
                                    <li>使用设备模拟器测试响应式设计</li>
                                    <li>模拟触摸事件和手势</li>
                                    <li>测试不同屏幕密度的显示效果</li>
                                    <li>使用远程调试调试真实设备</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    )
}

export default ChromeDevToolsDetail
