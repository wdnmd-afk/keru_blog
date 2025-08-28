import React, { useEffect, useState, useMemo } from 'react';
import { Button, Input, List, Checkbox, Popconfirm, Modal, Tabs, Radio, Form, Space } from 'antd';
import { useGlobalStore, useGlobalStoreAction } from '@/store';
import { Todo, TodoType } from '@/types/todo.d';
import style from '@/styles/home.module.scss';
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';

const { TabPane } = Tabs;

const todoTypeMap = {
    [TodoType.RECENT]: '近期要做',
    [TodoType.LONG_TERM]: '长期任务',
    [TodoType.STUDY_PLAN]: '学习计划',
};

const TodoList = () => {
    const { todos } = useGlobalStore();
    const { getTodos, addTodo, updateTodo, deleteTodo } = useGlobalStoreAction();
    const [form] = Form.useForm();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingTodo, setEditingTodo] = useState<Todo | null>(null);
    const [activeTab, setActiveTab] = useState('ALL');

    useEffect(() => {
        getTodos();
    }, []);

    const showAddModal = () => {
        setEditingTodo(null);
        form.resetFields();
        form.setFieldsValue({ type: TodoType.RECENT }); // Default type
        setIsModalOpen(true);
    };

    const showEditModal = (todo: Todo) => {
        setEditingTodo(todo);
        form.setFieldsValue({
            content: todo.content,
            type: todo.type,
        });
        setIsModalOpen(true);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const handleOk = async () => {
        try {
            const values = await form.validateFields();
            if (editingTodo) {
                // Update
                updateTodo(editingTodo.id, { ...values });
            } else {
                // Add
                addTodo(values);
            }
            setIsModalOpen(false);
        } catch (error) {
            console.log('Validation Failed:', error);
        }
    };

    const filteredTodos = useMemo(() => {
        if (activeTab === 'ALL') {
            return todos;
        }
        return todos.filter((todo) => todo.type === activeTab);
    }, [todos, activeTab]);

    return (
        <div className={style.todo_list_container}>
            <div className={style.todo_header}>
                <h2>待办事项</h2>
                <Button type="primary" icon={<PlusOutlined />} onClick={showAddModal}>
                    添加待办
                </Button>
            </div>

            <Modal
                className={style.todo_modal}
                title={editingTodo ? '编辑待办事项' : '添加新的待办事项'}
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                okText="确认"
                cancelText="取消"
                destroyOnClose
            >
                <Form form={form} layout="vertical" name="todo_form">
                    <Form.Item
                        name="content"
                        label="内容"
                        rules={[{ required: true, message: '请输入待办内容!' }]}
                    >
                        <Input.TextArea rows={4} placeholder="准备做什么？" />
                    </Form.Item>
                    <Form.Item
                        name="type"
                        label="类型"
                        rules={[{ required: true, message: '请选择类型!' }]}
                    >
                        <Radio.Group>
                            <Radio value={TodoType.RECENT}>{todoTypeMap[TodoType.RECENT]}</Radio>
                            <Radio value={TodoType.LONG_TERM}>{todoTypeMap[TodoType.LONG_TERM]}</Radio>
                            <Radio value={TodoType.STUDY_PLAN}>{todoTypeMap[TodoType.STUDY_PLAN]}</Radio>
                        </Radio.Group>
                    </Form.Item>
                </Form>
            </Modal>

            <Tabs activeKey={activeTab} onChange={setActiveTab}>
                <TabPane tab="全部" key="ALL" />
                <TabPane tab={todoTypeMap[TodoType.RECENT]} key={TodoType.RECENT} />
                <TabPane tab={todoTypeMap[TodoType.LONG_TERM]} key={TodoType.LONG_TERM} />
                <TabPane tab={todoTypeMap[TodoType.STUDY_PLAN]} key={TodoType.STUDY_PLAN} />
            </Tabs>

            <List
                dataSource={filteredTodos}
                renderItem={(item) => (
                    <List.Item
                        className={style.todo_item}
                        actions={[
                            <Button type="text" icon={<EditOutlined />} onClick={() => showEditModal(item)} />,
                            <Popconfirm
                                title="确定删除吗？"
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
                locale={{ emptyText: '暂无待办事项' }}
            />
        </div>
    );
};

export default TodoList;
