import React, { useState, useEffect } from "react";
import {
  Card,
  Button,
  Space,
  Modal,
  Form,
  Input,
  Select,
  Tree,
  TreeSelect,
  message,
  Popconfirm,
  Tag,
  Row,
  Col,
  Divider,
} from "antd";
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  ReloadOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import type { DataNode } from "antd/es/tree";
import {
  RbacApi,
  type Permission as ApiPermission,
  type PermissionTreeNode,
} from "@/api";
// 导入shared目录的KTable组件
import { KTable, type IKTableColumns } from "shared/components";

// 使用 API 中定义的权限类型
type Permission = ApiPermission;

// 权限表单数据类型
interface PermissionFormData {
  name: string;
  code: string;
  type: "PAGE" | "BUTTON";
  description?: string;
  parentId?: string;
}

const PermissionManagement: React.FC = () => {
  const [permissions, setPermissions] = useState<Permission[]>([]);
  const [permissionTree, setPermissionTree] = useState<DataNode[]>([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingPermission, setEditingPermission] = useState<Permission | null>(
    null,
  );
  const [searchText, setSearchText] = useState("");
  const [typeFilter, setTypeFilter] = useState<"PAGE" | "BUTTON" | undefined>(
    undefined,
  );

  const [form] = Form.useForm<PermissionFormData>();

  // 获取权限列表
  const fetchPermissions = async () => {
    setLoading(true);
    try {
      const permissions = await RbacApi.queryPermissions({
        name: searchText || undefined,
        type: typeFilter,
      });
      setPermissions(permissions);
    } catch (error: any) {
      message.error(error.message || "获取权限列表失败");
      console.error("获取权限列表错误:", error);
    } finally {
      setLoading(false);
    }
  };

  // 获取权限树
  const fetchPermissionTree = async () => {
    try {
      const treeNodes = await RbacApi.getPermissionTree();
      const treeData = convertToTreeData(treeNodes);
      setPermissionTree(treeData);
    } catch (error: any) {
      console.error("获取权限树错误:", error);
      message.error(error.message || "获取权限树失败");
    }
  };

  // 转换权限树节点为 Ant Design 树形数据
  const convertToTreeData = (nodes: PermissionTreeNode[]): DataNode[] => {
    return nodes.map((node) => ({
      key: node.id,
      title: `${node.name} (${node.code})`,
      value: node.id,
      children: node.children ? convertToTreeData(node.children) : undefined,
    }));
  };

  // 创建或更新权限
  const handleSubmit = async (values: PermissionFormData) => {
    try {
      if (editingPermission) {
        // 更新权限
        await RbacApi.updatePermission({
          id: editingPermission.id,
          ...values,
        });
        message.success("更新权限成功");
      } else {
        // 创建权限
        await RbacApi.createPermission(values);
        message.success("创建权限成功");
      }

      setModalVisible(false);
      form.resetFields();
      setEditingPermission(null);
      fetchPermissions();
      fetchPermissionTree();
    } catch (error: any) {
      message.error(error.message || "操作失败");
      console.error("权限操作错误:", error);
    }
  };

  // 删除权限
  const handleDelete = async (id: string) => {
    try {
      await RbacApi.deletePermission({ id });
      message.success("删除权限成功");
      fetchPermissions();
      fetchPermissionTree();
    } catch (error: any) {
      message.error(error.message || "删除权限失败");
      console.error("删除权限错误:", error);
    }
  };

  // 打开编辑模态框
  const handleEdit = (permission: Permission) => {
    setEditingPermission(permission);
    form.setFieldsValue({
      name: permission.name,
      code: permission.code,
      type: permission.type,
      description: permission.description,
      parentId: permission.parentId,
    });
    setModalVisible(true);
  };

  // 打开新增模态框
  const handleAdd = () => {
    setEditingPermission(null);
    form.resetFields();
    setModalVisible(true);
  };

  // 搜索处理
  const handleSearch = () => {
    fetchPermissions();
  };

  // 重置搜索
  const handleReset = () => {
    setSearchText("");
    setTypeFilter(undefined);
    fetchPermissions();
  };

  useEffect(() => {
    fetchPermissions();
    fetchPermissionTree();
  }, []);

  // 表格列定义 - 使用KTable的列类型
  const columns: IKTableColumns[] = [
    {
      title: "权限名称",
      dataIndex: "name",
      key: "name",
      width: 200,
    },
    {
      title: "权限代码",
      dataIndex: "code",
      key: "code",
      width: 200,
      render: (code: string) => <code>{code}</code>,
    },
    {
      title: "权限类型",
      dataIndex: "type",
      key: "type",
      width: 100,
      render: (type: "PAGE" | "BUTTON") => (
        <Tag color={type === "PAGE" ? "blue" : "green"}>
          {type === "PAGE" ? "页面权限" : "按钮权限"}
        </Tag>
      ),
    },
    {
      title: "描述",
      dataIndex: "description",
      key: "description",
      ellipsis: true,
    },
    {
      title: "创建时间",
      dataIndex: "createdAt",
      key: "createdAt",
      width: 180,
      render: (date: string) => new Date(date).toLocaleString(),
    },
    {
      title: "操作",
      key: "action",
      width: 150,
      render: (_, record) => (
        <Space size="small">
          <Button
            type="link"
            size="small"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
          >
            编辑
          </Button>
          <Popconfirm
            title="确定要删除这个权限吗？"
            description="删除后不可恢复，请谨慎操作。"
            onConfirm={() => handleDelete(record.id)}
            okText="确定"
            cancelText="取消"
          >
            <Button type="link" size="small" danger icon={<DeleteOutlined />}>
              删除
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <Card
        title="权限管理"
        style={{ height: "100%", display: "flex", flexDirection: "column" }}
        bodyStyle={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
          minHeight: 0,
        }}
      >
        {/* 搜索和操作区域 */}
        <Row gutter={16} style={{ marginBottom: "16px" }}>
          <Col span={6}>
            <Input
              placeholder="搜索权限名称"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              onPressEnter={handleSearch}
            />
          </Col>
          <Col span={4}>
            <Select
              placeholder="权限类型"
              value={typeFilter}
              onChange={setTypeFilter}
              allowClear
              style={{ width: "100%" }}
            >
              <Select.Option value="PAGE">页面权限</Select.Option>
              <Select.Option value="BUTTON">按钮权限</Select.Option>
            </Select>
          </Col>
          <Col span={14}>
            <Space>
              <Button
                type="primary"
                icon={<SearchOutlined />}
                onClick={handleSearch}
              >
                搜索
              </Button>
              <Button onClick={handleReset}>重置</Button>
              <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={handleAdd}
              >
                新增权限
              </Button>
              <Button
                icon={<ReloadOutlined />}
                onClick={() => {
                  fetchPermissions();
                  fetchPermissionTree();
                }}
              >
                刷新
              </Button>
            </Space>
          </Col>
        </Row>

        {/* 权限表格 - 使用复用的KTable组件 */}
        <div style={{ flex: 1, minHeight: 0 }}>
          <KTable
            columns={columns}
            dataSource={permissions}
            rowKey="id"
            loading={loading}
            total={permissions.length}
            pageSize={10}
            bordered={false}
            stripe={true}
            size="middle"
          />
        </div>
      </Card>

      {/* 新增/编辑权限模态框 */}
      <Modal
        title={editingPermission ? "编辑权限" : "新增权限"}
        open={modalVisible}
        onCancel={() => {
          setModalVisible(false);
          form.resetFields();
          setEditingPermission(null);
        }}
        footer={null}
        width={600}
      >
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item
            name="name"
            label="权限名称"
            rules={[{ required: true, message: "请输入权限名称" }]}
          >
            <Input placeholder="请输入权限名称" />
          </Form.Item>

          <Form.Item
            name="code"
            label="权限代码"
            rules={[
              { required: true, message: "请输入权限代码" },
              {
                pattern: /^[a-zA-Z0-9:_-]+$/,
                message: "权限代码只能包含字母、数字、冒号、下划线和横线",
              },
            ]}
          >
            <Input placeholder="例如: user:create" />
          </Form.Item>

          <Form.Item
            name="type"
            label="权限类型"
            rules={[{ required: true, message: "请选择权限类型" }]}
          >
            <Select placeholder="请选择权限类型">
              <Select.Option value="PAGE">页面权限</Select.Option>
              <Select.Option value="BUTTON">按钮权限</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item name="parentId" label="父权限">
            <TreeSelect
              treeData={permissionTree}
              placeholder="选择父权限（可选）"
              allowClear
              showSearch
              treeDefaultExpandAll
            />
          </Form.Item>

          <Form.Item name="description" label="权限描述">
            <Input.TextArea placeholder="请输入权限描述" rows={3} />
          </Form.Item>

          <Divider />

          <Form.Item style={{ marginBottom: 0, textAlign: "right" }}>
            <Space>
              <Button
                onClick={() => {
                  setModalVisible(false);
                  form.resetFields();
                  setEditingPermission(null);
                }}
              >
                取消
              </Button>
              <Button type="primary" htmlType="submit">
                {editingPermission ? "更新" : "创建"}
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default PermissionManagement;
