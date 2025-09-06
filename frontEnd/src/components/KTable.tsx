import '@/styles/antd.scss'
import { createExcludeComparator } from '@/utils/memoComparator'
import { Pagination, PaginationProps, Table, TableProps } from 'antd'
import { ColumnProps } from 'antd/es/table'
import React, { useEffect, useRef, useState } from 'react'

interface IKTableProps extends TableProps<any> {
    // 你可以在这里扩展额外的属性，像分页、数据加载等
    fetchData?: (page: number, pageSize: number) => void // 获取数据的函数
    loading?: boolean // 加载状态
    total: number // 总记录数
    pageSize: number // 每页显示条数
    columns: IKTableColumns[] // 表格列配置
    stripe?: boolean // 添加 stripe 字段来控制斑马格样式
    showCheck?: boolean
    rowClick?: (record: any) => void
}
export interface IKTableColumns extends ColumnProps<any> {}

const KTable = React.forwardRef<any, IKTableProps>(
    (
        {
            showCheck,
            fetchData,
            bordered = false,
            stripe = true,
            size = 'middle',
            total = 0,
            pageSize = 50,
            rowKey = 'id',
            dataSource,
            columns,
            onChange,
            rowClick,
            ...props
        },
        ref
    ) => {
        const [currentPage, setCurrentPage] = useState(1) // 当前页码
        const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]) // 当前选中的行
        const defaultColumns = columns?.map((item, index) => {
            const {
                width = 100,
                key,
                align = 'center',
                ellipsis = { showTitle: true },
                dataIndex = key as string,
            } = item

            // 确保每个列都有唯一的key，避免React key重复警告
            const uniqueKey = key || dataIndex || `column-${index}`

            return { width, align, dataIndex, key: uniqueKey, ellipsis, ...item }
        })

        // 处理分页变化
        const handlePageChange = (page: number, pageSize: number) => {
            setCurrentPage(page)
            fetchData?.(page, pageSize) // 调用外部传入的获取数据函数
        }

        // 处理表格属性的变化，主要是排序、筛选等
        const handleTableChange = (
            pagination: PaginationProps,
            filters: any,
            sorter: any,
            extra: any
        ) => {
            onChange && onChange(pagination, filters, sorter, extra) // 调用外部传入的 onChange
        }

        const handleSelectChange = (newSelectedRowKeys: React.Key[]) => {
            setSelectedRowKeys(newSelectedRowKeys)
        }

        const rowSelection = showCheck
            ? {
                  selectedRowKeys,
                  onChange: handleSelectChange,
              }
            : undefined
        // 斑马格样式：根据行号设置不同的背景颜色
        const rowClassName = (record: any, index: number) => {
            if (stripe) {
                return index % 2 === 0 ? 'even-row' : 'odd-row'
            }
            return ''
        }

        //处理所有事件
        const onRow = (record: any) => ({
            onClick: () => rowClick?.(record),
        })
        const [height, setHeight] = useState(100)
        const domRef = useRef<HTMLDivElement>(null)
        const timeoutRef = useRef<NodeJS.Timeout | null>(null) // 保存

        // setTimeout 的引用
        useEffect(() => {
            // 防抖处理函数
            const handleResize = () => {
                if (timeoutRef.current) {
                    clearTimeout(timeoutRef.current) // 清除之前的定时器
                }

                timeoutRef.current = setTimeout(() => {
                    const dom: HTMLDivElement | null =
                        document.querySelector('.KT_Box .ant-table-body')
                    if (dom) {
                        //列滚动条判断
                        const xDistance = dom?.clientWidth - dom?.scrollWidth
                        if (xDistance < 0) {
                            dom.style.overflowX = 'scroll'
                        } else {
                            dom.style.overflowX = 'inherit'
                        }
                    }
                    if (domRef.current) {
                        setHeight(domRef.current.offsetHeight - 50)
                    }
                }, 300) // 设置 300 毫秒的防抖延迟
            }

            // 初始化时获取高度
            handleResize()
            const currentDomRef = domRef.current // 在 useEffect 内部保存 domRef.current 的值
            // 监听大小变化
            const resizeObserver = new ResizeObserver(handleResize)
            if (currentDomRef) {
                resizeObserver.observe(currentDomRef)
            }
            // 清理
            return () => {
                if (currentDomRef) {
                    resizeObserver.unobserve(currentDomRef)
                }
                if (timeoutRef.current) {
                    clearTimeout(timeoutRef.current) // 清除定时器
                }
            }
        }, [])
        useEffect(() => {
            if (dataSource?.length) {
                const dom: HTMLDivElement | null = document.querySelector('.KT_Box .ant-table-body')
                if (dom && domRef?.current) {
                    const yDistance = domRef?.current?.offsetHeight - dom?.scrollHeight
                    //动态添加列需要判断
                    const xDistance = dom?.clientWidth - dom?.scrollWidth
                    if (xDistance < 0) {
                        dom.style.overflowX = 'scroll'
                    }
                    //动态添加行需要判断
                    if (yDistance < 20) {
                        dom.style.overflowY = 'scroll'
                    } else {
                        dom.style.overflowY = 'inherit'
                    }
                }
            }
        }, [dataSource])
        return (
            <div flex-col style={{ padding: 10, backgroundColor: '#fff', height: '100%' }}>
                <div flex-1 h-0 ref={domRef} className={'KT_Box'}>
                    <Table
                        ref={ref}
                        onRow={onRow}
                        rowSelection={rowSelection}
                        columns={defaultColumns}
                        dataSource={dataSource}
                        pagination={false}
                        onChange={handleTableChange}
                        scroll={{ y: height }}
                        style={{ overflow: 'hidden' }}
                        size={size}
                        rowKey={rowKey}
                        bordered={bordered}
                        rowClassName={rowClassName}
                        {...props}
                    />
                </div>
                <div f-ic justify-end p-2 className={'bg-#f5f5f5'}>
                    <Pagination
                        total={total}
                        showTotal={(total) => `共 ${total} 条`}
                        pageSize={pageSize}
                        align={'center'}
                        current={currentPage}
                        onChange={handlePageChange}
                        showSizeChanger
                        pageSizeOptions={['10', '20', '50', '100']}
                        showQuickJumper
                    />
                </div>
            </div>
        )
    }
)

// 使用React.memo优化KTable组件，忽略函数类型的props
export default React.memo(KTable, createExcludeComparator<IKTableProps>(['fetchData', 'rowClick']))
