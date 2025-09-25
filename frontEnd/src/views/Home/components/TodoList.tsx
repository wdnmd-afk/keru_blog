import { useGlobalStore, useGlobalStoreAction } from '@/store'
import style from '@/styles/home.module.scss'
import { Todo, TodoType } from '@/types/todo.d'
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons'
import { Button, Checkbox, Form, Input, List, Modal, Popconfirm, Radio, Space, Tabs } from 'antd'
import { useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'

// 将在组件内部使用翻译函数替代
// const todoTypeMap = {
//     [TodoType.RECENT]: '近期要做',
//     [TodoType.LONG_TERM]: '长期任务',
//     [TodoType.STUDY_PLAN]: '学习计划',
// }

const TodoList = () => {
    const { t } = useTranslation('home')
    const { todos } = useGlobalStore()
    const { getTodos, addTodo, updateTodo, deleteTodo } = useGlobalStoreAction()
    const [form] = Form.useForm()

    const [isModalOpen, setIsModalOpen] = useState(false)
    const [editingTodo, setEditingTodo] = useState<Todo | null>(null)
    const [activeTab, setActiveTab] = useState('ALL')

    useEffect(() => {
        getTodos()
    }, [])

    const showAddModal = () => {
        setEditingTodo(null)
        form.resetFields()
        form.setFieldsValue({ type: TodoType.RECENT }) // Default type
        setIsModalOpen(true)
    }

    const showEditModal = (todo: Todo) => {
        setEditingTodo(todo)
        form.setFieldsValue({
            content: todo.content,
            type: todo.type,
        })
        setIsModalOpen(true)
    }

    const handleCancel = () => {
        setIsModalOpen(false)
    }

    const handleOk = async () => {
        try {
            const values = await form.validateFields()
            if (editingTodo) {
                // Update
                updateTodo(editingTodo.id, { ...values })
            } else {
                // Add
                addTodo(values)
            }
            setIsModalOpen(false)
        } catch (error) {
            console.log('Validation Failed:', error)
        }
    }

    const filteredTodos = useMemo(() => {
        if (activeTab === 'ALL') {
            return todos
        }
        return todos.filter((todo) => todo.type === activeTab)
    }, [todos, activeTab])

    // 获取翻译的待办类型映射
    const getTodoTypeMap = () => ({
        [TodoType.RECENT]: t('todo.types.recent'),
        [TodoType.LONG_TERM]: t('todo.types.long_term'),
        [TodoType.STUDY_PLAN]: t('todo.types.study_plan'),
    })

    return (
        <div className={style.todo_list_container}>
            <div className={style.todo_header}>
                <h2>{t('todo.title')}</h2>
                <Button type="primary" icon={<PlusOutlined />} onClick={showAddModal}>
                    {t('todo.add_button')}
                </Button>
            </div>

            <Modal
                className={style.todo_modal}
                title={editingTodo ? t('todo.modal.edit_title') : t('todo.modal.add_title')}
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                okText={t('todo.modal.confirm')}
                cancelText={t('todo.modal.cancel')}
                destroyOnHidden
            >
                <Form form={form} layout="vertical" name="todo_form">
                    <Form.Item
                        name="content"
                        label={t('todo.modal.content_label')}
                        rules={[{ required: true, message: t('todo.modal.content_required') }]}
                    >
                        <Input.TextArea
                            rows={4}
                            placeholder={t('todo.modal.content_placeholder')}
                        />
                    </Form.Item>
                    <Form.Item
                        name="type"
                        label={t('todo.modal.type_label')}
                        rules={[{ required: true, message: t('todo.modal.type_required') }]}
                    >
                        <Radio.Group>
                            <Radio value={TodoType.RECENT}>
                                {getTodoTypeMap()[TodoType.RECENT]}
                            </Radio>
                            <Radio value={TodoType.LONG_TERM}>
                                {getTodoTypeMap()[TodoType.LONG_TERM]}
                            </Radio>
                            <Radio value={TodoType.STUDY_PLAN}>
                                {getTodoTypeMap()[TodoType.STUDY_PLAN]}
                            </Radio>
                        </Radio.Group>
                    </Form.Item>
                </Form>
            </Modal>

            <Tabs
                activeKey={activeTab}
                onChange={setActiveTab}
                items={[
                    {
                        key: 'ALL',
                        label: t('common:buttons.all'),
                    },
                    {
                        key: TodoType.RECENT,
                        label: getTodoTypeMap()[TodoType.RECENT],
                    },
                    {
                        key: TodoType.LONG_TERM,
                        label: getTodoTypeMap()[TodoType.LONG_TERM],
                    },
                    {
                        key: TodoType.STUDY_PLAN,
                        label: getTodoTypeMap()[TodoType.STUDY_PLAN],
                    },
                ]}
            />

            <List
                dataSource={filteredTodos}
                renderItem={(item) => (
                    <List.Item
                        className={style.todo_item}
                        actions={[
                            <Button
                                type="text"
                                icon={<EditOutlined />}
                                onClick={() => showEditModal(item)}
                            />,
                            <Popconfirm
                                title={t('todo.actions.delete_confirm')}
                                onConfirm={() => deleteTodo(item.id)}
                            >
                                <Button type="text" icon={<DeleteOutlined />} danger />
                            </Popconfirm>,
                        ]}
                    >
                        <Space>
                            <Checkbox
                                checked={item.completed}
                                onChange={() => updateTodo(item.id, { completed: !item.completed })}
                            />
                            <span className={item.completed ? style.completed_todo : ''}>
                                {item.content}
                            </span>
                        </Space>
                    </List.Item>
                )}
                locale={{ emptyText: t('todo.empty_text') }}
            />
        </div>
    )
}

export default TodoList
