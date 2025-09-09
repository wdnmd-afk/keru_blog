/**
 * 技术学习树状分支图组件
 *
 * 功能说明：
 * 1. 使用D3.js实现树状布局算法
 * 2. 展示技术学习的层次结构和分支关系
 * 3. 默认展开所有节点，支持节点展开/折叠交互
 * 4. 类似字节跳动媒体矩阵的树状结构
 *
 * 技术特性：
 * - D3.js树布局算法
 * - SVG渲染和动画
 * - 响应式设计
 * - 交互式节点操作
 */

import styles from '@/styles/learning.module.scss'
import * as d3 from 'd3'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'

/**
 * 树节点数据接口
 */
interface TreeNode {
    id: string
    name: string
    category?: string
    description?: string
    children?: TreeNode[]
    status?: 'completed' | 'in_progress' | 'planned'
    level?: number
}

/**
 * D3树节点接口
 * 扩展 d3.HierarchyPointNode 以支持动画和交互功能
 */
interface D3TreeNode extends d3.HierarchyPointNode<TreeNode> {
    /** 隐藏的子节点（用于折叠/展开功能） */
    _children?: D3TreeNode[]
    /** 动画起始 x 坐标 */
    x0?: number
    /** 动画起始 y 坐标 */
    y0?: number
}

/**
 * 技术学习树状分支图组件
 */
const TechTreeDiagram: React.FC = () => {
    const { t } = useTranslation('learning')
    const svgRef = useRef<SVGSVGElement>(null)
    const containerRef = useRef<HTMLDivElement>(null)
    const [dimensions, setDimensions] = useState({ width: 800, height: 600 })

    // 计算可用高度的函数 - 精确匹配红色框区域
    const calculateDimensions = () => {
        if (containerRef.current) {
            const container = containerRef.current

            // 获取父容器（学习时间线内容区域）的实际尺寸
            const parentContainer = container.parentElement
            if (parentContainer) {
                const parentRect = parentContainer.getBoundingClientRect()

                // 获取头部区域的实际高度
                const headerElement = container.querySelector('.tree_header') as HTMLElement
                const headerHeight = headerElement ? headerElement.offsetHeight : 0

                // 精确计算：使用父容器的完整尺寸
                const availableWidth = parentRect.width
                const availableHeight = parentRect.height - headerHeight

                setDimensions({
                    width: availableWidth,
                    height: Math.max(availableHeight, 400), // 保证最小高度
                })

                // 调试信息（开发环境）
                if (process.env.NODE_ENV === 'development') {
                    console.log('Tree diagram dimensions:', {
                        parentWidth: parentRect.width,
                        parentHeight: parentRect.height,
                        headerHeight,
                        availableWidth,
                        availableHeight: Math.max(availableHeight, 400),
                    })
                }
            }
        }
    }

    // 技术学习树数据
    const treeData: TreeNode = {
        id: 'root',
        name: '技术学习路径',
        children: [
            {
                id: 'frontend',
                name: '前端开发',
                status: 'completed',
                children: [
                    {
                        id: 'html-css',
                        name: 'HTML & CSS',
                        status: 'completed',
                        children: [
                            { id: 'html5', name: 'HTML5', status: 'completed' },
                            { id: 'css3', name: 'CSS3', status: 'completed' },
                            { id: 'sass', name: 'Sass/SCSS', status: 'completed' },
                            { id: 'responsive', name: '响应式设计', status: 'completed' },
                        ],
                    },
                    {
                        id: 'javascript',
                        name: 'JavaScript',
                        status: 'completed',
                        children: [
                            { id: 'es6', name: 'ES6+', status: 'completed' },
                            { id: 'async', name: '异步编程', status: 'completed' },
                            { id: 'dom', name: 'DOM操作', status: 'completed' },
                            { id: 'modules', name: '模块系统', status: 'completed' },
                        ],
                    },
                    {
                        id: 'frameworks',
                        name: '前端框架',
                        status: 'completed',
                        children: [
                            { id: 'react', name: 'React', status: 'completed' },
                            { id: 'vue', name: 'Vue.js', status: 'in_progress' },
                            { id: 'angular', name: 'Angular', status: 'planned' },
                        ],
                    },
                ],
            },
            {
                id: 'backend',
                name: '后端开发',
                status: 'in_progress',
                children: [
                    {
                        id: 'nodejs',
                        name: 'Node.js',
                        status: 'completed',
                        children: [
                            { id: 'express', name: 'Express', status: 'completed' },
                            { id: 'koa', name: 'Koa', status: 'in_progress' },
                            { id: 'nestjs', name: 'NestJS', status: 'planned' },
                        ],
                    },
                    {
                        id: 'database',
                        name: '数据库',
                        status: 'in_progress',
                        children: [
                            { id: 'mongodb', name: 'MongoDB', status: 'completed' },
                            { id: 'postgresql', name: 'PostgreSQL', status: 'in_progress' },
                            { id: 'redis', name: 'Redis', status: 'planned' },
                        ],
                    },
                ],
            },
            {
                id: 'devops',
                name: 'DevOps',
                status: 'planned',
                children: [
                    {
                        id: 'containerization',
                        name: '容器化',
                        status: 'in_progress',
                        children: [
                            { id: 'docker', name: 'Docker', status: 'in_progress' },
                            { id: 'kubernetes', name: 'Kubernetes', status: 'planned' },
                        ],
                    },
                    {
                        id: 'cicd',
                        name: 'CI/CD',
                        status: 'planned',
                        children: [
                            { id: 'github-actions', name: 'GitHub Actions', status: 'planned' },
                            { id: 'jenkins', name: 'Jenkins', status: 'planned' },
                        ],
                    },
                ],
            },
            {
                id: 'emerging',
                name: '新兴技术',
                status: 'planned',
                children: [
                    {
                        id: 'ai-ml',
                        name: '人工智能',
                        status: 'planned',
                        children: [
                            { id: 'python', name: 'Python', status: 'planned' },
                            { id: 'tensorflow', name: 'TensorFlow', status: 'planned' },
                            { id: 'pytorch', name: 'PyTorch', status: 'planned' },
                        ],
                    },
                    {
                        id: 'web3',
                        name: 'Web3',
                        status: 'planned',
                        children: [
                            { id: 'blockchain', name: '区块链', status: 'planned' },
                            { id: 'solidity', name: 'Solidity', status: 'planned' },
                            { id: 'web3js', name: 'Web3.js', status: 'planned' },
                        ],
                    },
                ],
            },
        ],
    }

    // 获取状态颜色
    const getStatusColor = (status?: string) => {
        switch (status) {
            case 'completed':
                return '#52c41a'
            case 'in_progress':
                return '#1890ff'
            case 'planned':
                return '#faad14'
            default:
                return '#d9d9d9'
        }
    }

    // 监听窗口尺寸变化
    useEffect(() => {
        // 初始计算
        calculateDimensions()

        // 添加resize监听器
        const handleResize = () => {
            calculateDimensions()
        }

        window.addEventListener('resize', handleResize)

        // 延迟计算，确保DOM完全渲染
        const timer = setTimeout(() => {
            calculateDimensions()
        }, 100)

        return () => {
            window.removeEventListener('resize', handleResize)
            clearTimeout(timer)
        }
    }, [])

    // D3 工具函数 - 移到组件顶层以符合 ESLint no-inner-declarations 规则
    const collapse = useCallback((d: D3TreeNode) => {
        if (d.children) {
            d._children = d.children as D3TreeNode[]
            d._children.forEach(collapse)
            d.children = undefined
        }
    }, [])

    const diagonal = useCallback((s: any, d: any) => {
        return `M ${s.y} ${s.x}
            C ${(s.y + d.y) / 2} ${s.x},
              ${(s.y + d.y) / 2} ${d.x},
              ${d.y} ${d.x}`
    }, [])

    // 初始化D3树图
    useEffect(() => {
        if (!svgRef.current) return

        try {
            // 声明需要访问 useEffect 内部变量的函数
            const update: (source: D3TreeNode) => void = (source: D3TreeNode) => {
                const treeData = treeLayout(root)
                const nodes = treeData.descendants()
                const links = treeData.descendants().slice(1)

                // 针对全展开状态优化深度间距
                const maxDepth = Math.max(...nodes.map((d) => d.depth))
                const depthSpacing = maxDepth > 0 ? width / (maxDepth + 0.5) : 180
                nodes.forEach((d) => {
                    // 全展开状态下使用更紧凑的间距
                    d.y = d.depth * depthSpacing
                })

                // 更新节点 - 使用节点ID作为key
                const node = g.selectAll('g.node').data(nodes, (d: any) => d.data.id)

                const nodeEnter = node
                    .enter()
                    .append('g')
                    .attr('class', 'node')
                    .attr('transform', (d) => `translate(${source.y0 || 0},${source.x0 || 0})`)
                    .on('click', click)

                // 添加圆圈
                nodeEnter
                    .append('circle')
                    .attr('r', 1e-6)
                    .style('fill', (d) =>
                        (d as D3TreeNode)._children ? getStatusColor(d.data.status) : '#fff'
                    )
                    .style('stroke', (d) => getStatusColor(d.data.status))
                    .style('stroke-width', '2px')

                // 添加文本
                nodeEnter
                    .append('text')
                    .attr('dy', '.35em')
                    .attr('x', (d) => (d.children || (d as D3TreeNode)._children ? -13 : 13))
                    .attr('text-anchor', (d) =>
                        d.children || (d as D3TreeNode)._children ? 'end' : 'start'
                    )
                    .text((d) => d.data.name)
                    .style('fill-opacity', 1e-6)
                    .style('font-size', '12px')
                    .style('fill', '#fff')

                // 更新节点位置
                const nodeUpdate = nodeEnter.merge(node as any)

                nodeUpdate
                    .transition()
                    .duration(750)
                    .attr('transform', (d) => `translate(${d.y},${d.x})`)

                nodeUpdate
                    .select('circle')
                    .attr('r', 6)
                    .style('fill', (d) =>
                        (d as D3TreeNode)._children ? getStatusColor(d.data.status) : '#fff'
                    )
                    .attr('cursor', 'pointer')

                nodeUpdate.select('text').style('fill-opacity', 1)

                // 移除退出的节点
                const nodeExit = node
                    .exit()
                    .transition()
                    .duration(750)
                    .attr('transform', (d) => `translate(${source.y},${source.x})`)
                    .remove()

                nodeExit.select('circle').attr('r', 1e-6)

                nodeExit.select('text').style('fill-opacity', 1e-6)

                // 更新连接线 - 使用目标节点ID作为key
                const link = g.selectAll('path.link').data(links, (d: any) => d.data.id)

                const linkEnter = link
                    .enter()
                    .insert('path', 'g')
                    .attr('class', 'link')
                    .attr('d', (d) => {
                        const o = { x: source.x0 || 0, y: source.y0 || 0 }
                        return diagonal(o, o)
                    })
                    .style('fill', 'none')
                    .style('stroke', 'rgba(255, 255, 255, 0.4)')
                    .style('stroke-width', '2px')

                const linkUpdate = linkEnter.merge(link as any)

                linkUpdate
                    .transition()
                    .duration(750)
                    .attr('d', (d) => diagonal(d, d.parent))

                const _linkExit = link
                    .exit()
                    .transition()
                    .duration(750)
                    .attr('d', (_d) => {
                        const o = { x: source.x, y: source.y }
                        return diagonal(o, o)
                    })
                    .remove()

                // 存储旧位置用于过渡
                nodes.forEach((d) => {
                    const node = d as D3TreeNode
                    node.x0 = d.x
                    node.y0 = d.y
                })
            }

            const click: (event: any, d: D3TreeNode) => void = (_event: any, d: D3TreeNode) => {
                if (d.children) {
                    d._children = d.children as D3TreeNode[]
                    d.children = undefined
                } else {
                    d.children = d._children
                    d._children = undefined
                }
                update(d)
            }

            const svg = d3.select(svgRef.current)
            svg.selectAll('*').remove() // 清除之前的内容

            // 全展开状态下进一步减少边距
            const margin = { top: 15, right: 60, bottom: 15, left: 60 }
            const width = dimensions.width - margin.left - margin.right - 30 // 减去canvas的padding
            const height = dimensions.height - margin.top - margin.bottom - 30 // 减去canvas的padding

            // 创建树布局 - 针对全展开状态优化
            const treeLayout = d3
                .tree<TreeNode>()
                .size([height, width]) // 使用完整的可用空间
                .separation((a, b) => {
                    // 全展开状态下需要更紧凑的间距
                    const baseSeparation = a.parent === b.parent ? 0.8 : 1.5
                    const scaleFactor = Math.min(width / 1000, height / 700) // 调整基准尺寸
                    return baseSeparation * Math.max(0.6, scaleFactor) // 进一步减小间距适应全展开
                })

            // 创建根节点并确保所有节点都有唯一ID
            const root = d3.hierarchy(treeData) as D3TreeNode
            root.x0 = height / 2
            root.y0 = 0

            // 为所有节点分配唯一ID（如果没有的话）
            let nodeIdCounter = 0
            root.each((d: any) => {
                if (!d.data.id) {
                    d.data.id = `node-${nodeIdCounter++}`
                }
            })

            // 默认展开所有节点 - 不进行折叠操作
            // if (root.children) {
            //     root.children.forEach(collapse)
            // }

            const g = svg.append('g').attr('transform', `translate(${margin.left},${margin.top})`)

            // 调用 update 函数开始渲染
            update(root)
        } catch (error) {
            console.error('D3 树图渲染错误:', error)
        }
    }, [dimensions, treeData])

    return (
        <div ref={containerRef} className={styles.tree_diagram_container}>
            <div className={styles.tree_canvas}>
                <svg
                    ref={svgRef}
                    width={dimensions.width}
                    height={dimensions.height}
                    className={styles.tree_svg}
                    viewBox={`0 0 ${dimensions.width} ${dimensions.height}`}
                    preserveAspectRatio="xMidYMid meet"
                />
            </div>
        </div>
    )
}

export default TechTreeDiagram
