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
  message,
  Popconfirm,
  Tag,
  Row,
  Col,
  Divider,
  Switch,
} from "antd";
// 导入shared目录的KTable组件
import { KTable, type IKTableColumns } from "shared/components";
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  ReloadOutlined,
  SearchOutlined,
  SettingOutlined,
} from "@ant-design/icons";
// 移除原有的ColumnsType导入，使用IKTableColumns
import type { DataNode } from "antd/es/tree";
import {
  RbacApi,
  type Role as ApiRole,
  type Permission,
  type PermissionTreeNode,
} from "@/api";

// 使用 API 中定义的类型
type Role = ApiRole;

// 角色表单数据类型
interface RoleFormData {
  name: string;
  description?: string;
  status: "ACTIVE" | "INACTIVE";
}

const RoleManagement: React.FC = () => {
  const [roles, setRoles] = useState<Role[]>([]);
  const [permissions, setPermissions] = useState<Permission[]>([]);
  const [permissionTree, setPermissionTree] = useState<DataNode[]>([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [permissionModalVisible, setPermissionModalVisible] = useState(false);
  const [editingRole, setEditingRole] = useState<Role | null>(null);
  const [currentRole, setCurrentRole] = useState<Role | null>(null);
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([]);
  const [searchText, setSearchText] = useState("");
  const [statusFilter, setStatusFilter] = useState<
    "ACTIVE" | "INACTIVE" | undefined
  >(undefined);

  const [form] = Form.useForm<RoleFormData>();

  // 获取角色列表
  const fetchRoles = async () => {
    setLoading(true);
    try {
      const roles = await RbacApi.queryRoles({
        name: searchText || undefined,
        status: statusFilter,
      });
      setRoles(roles);
    } catch (error: any) {
      message.error(error.message || "获取角色列表失败");
      console.error("获取角色列表错误:", error);
    } finally {
      setLoading(false);
    }
  };

  // 获取权限树
  const fetchPermissionTree = async () => {
    try {
      const treeNodes = await RbacApi.getPermissionTree();
      // 将PermissionTreeNode转换为Permission类型以兼容现有逻辑
      const permissions = treeNodes.map((node) => ({
        id: node.id,
        name: node.name,
        code: node.code,
        type: node.type,
        description: "", // PermissionTreeNode没有description字段，设置默认值
        parentId: undefined, // PermissionTreeNode没有parentId字段，设置默认值
        children: node.children,
      })) as Permission[];
      setPermissions(permissions);
      const treeData = convertToTreeData(permissions);
      setPermissionTree(treeData);
    } catch (error: any) {
      // RbacApi已经处理了错误消息显示，这里只需要记录日志
      console.error("获取权限树错误:", error);
    }
  };

  // 转换权限数据为树形数据
  const convertToTreeData = (permissions: Permission[]): DataNode[] => {
    return permissions.map((permission) => ({
      key: permission.id,
      title: `${permission.name} (${permission.code})`,
      value: permission.id,
      children: permission.children
        ? convertToTreeData(permission.children)
        : undefined,
    }));
  };

  // 获取角色权限
  const fetchRolePermissions = async (roleId: string) => {
    try {
      const permissions = await RbacApi.getRolePermissions(roleId);
      const permissionIds = permissions.map((p: Permission) => p.id);
      setSelectedPermissions(permissionIds);
    } catch (error: any) {
      // RbacApi已经处理了错误消息显示，这里只需要记录日志
      console.error("获取角色权限错误:", error);
    }
  };

  // 创建或更新角色
  const handleSubmit = async (values: RoleFormData) => {
    try {
      if (editingRole) {
        // 更新角色
        const updateParams = { id: editingRole.id, ...values };
        await RbacApi.updateRole(updateParams);
        message.success("更新角色成功");
      } else {
        // 创建角色
        await RbacApi.createRole(values);
        message.success("创建角色成功");
      }

      // 操作成功后的清理工作
      setModalVisible(false);
      form.resetFields();
      setEditingRole(null);
      fetchRoles();
    } catch (error: any) {
      // RbacApi已经处理了错误消息显示，这里只需要记录日志
      console.error("角色操作错误:", error);
    }
  };

  // 删除角色
  const handleDelete = async (id: string) => {
    try {
      await RbacApi.deleteRole({ id });
      message.success("删除角色成功");
      fetchRoles();
    } catch (error: any) {
      // RbacApi已经处理了错误消息显示，这里只需要记录日志
      console.error("删除角色错误:", error);
    }
  };

  // 分配权限
  const handleAssignPermissions = async () => {
    if (!currentRole) return;

    try {
      await RbacApi.assignRolePermissions({
        roleId: currentRole.id,
        permissionIds: selectedPermissions,
      });

      message.success("权限分配成功");
      setPermissionModalVisible(false);
      setCurrentRole(null);
      setSelectedPermissions([]);
      fetchRoles();
    } catch (error: any) {
      // RbacApi已经处理了错误消息显示，这里只需要记录日志
      console.error("权限分配错误:", error);
    }
  };

  // 打开编辑模态框
  const handleEdit = (role: Role) => {
    setEditingRole(role);
    form.setFieldsValue({
      name: role.name,
      description: role.description,
      status: role.status,
    });
    setModalVisible(true);
  };

  // 打开新增模态框
  const handleAdd = () => {
    setEditingRole(null);
    form.resetFields();
    setModalVisible(true);
  };

  // 打开权限分配模态框
  const handleOpenPermissionModal = (role: Role) => {
    setCurrentRole(role);
    fetchRolePermissions(role.id);
    setPermissionModalVisible(true);
  };

  // 搜索处理
  const handleSearch = () => {
    fetchRoles();
  };

  // 重置搜索
  const handleReset = () => {
    setSearchText("");
    setStatusFilter(undefined);
    fetchRoles();
  };

  useEffect(() => {
    fetchRoles();
    fetchPermissionTree();
  }, []);

  // 表格列定义 - 使用IKTableColumns类型
  const columns: IKTableColumns[] = [
    {
      title: "角色名称",
      dataIndex: "name",
      key: "name",
      width: 150,
    },
    {
      title: "描述",
      dataIndex: "description",
      key: "description",
      ellipsis: true,
    },
    {
      title: "状态",
      dataIndex: "status",
      key: "status",
      width: 100,
      render: (status: "ACTIVE" | "INACTIVE") => (
        <Tag color={status === "ACTIVE" ? "green" : "red"}>
          {status === "ACTIVE" ? "激活" : "停用"}
        </Tag>
      ),
    },
    {
      title: "权限数量",
      key: "permissionCount",
      width: 100,
      render: (_, record) => <span>{record.permissions?.length || 0}</span>,
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
      width: 200,
      render: (_, record) => (
        <Space size="small">
          <Button
            type="link"
            size="small"
            icon={<SettingOutlined />}
            onClick={() => handleOpenPermissionModal(record)}
          >
            分配权限
          </Button>
          <Button
            type="link"
            size="small"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
          >
            编辑
          </Button>
          <Popconfirm
            title="确定要删除这个角色吗？"
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
        title="角色管理"
        style={{ height: "100%", display: "flex", flexDirection: "column" }}
        bodyStyle={{ display: "flex", flexDirection: "column", flex: 1, minHeight: 0 }}
      >
        {/* 搜索和操作区域 */}
        <Row gutter={16} style={{ marginBottom: "16px" }}>
          <Col span={6}>
            <Input
              placeholder="搜索角色名称"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              onPressEnter={handleSearch}
            />
          </Col>
          <Col span={4}>
            <Select
              placeholder="角色状态"
              value={statusFilter}
              onChange={setStatusFilter}
              allowClear
              style={{ width: "100%" }}
            >
              <Select.Option value="ACTIVE">激活</Select.Option>
              <Select.Option value="INACTIVE">停用</Select.Option>
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
                新增角色
              </Button>
              <Button icon={<ReloadOutlined />} onClick={fetchRoles}>
                刷新
              </Button>
            </Space>
          </Col>
        </Row>

        {/* 角色表格 - 使用共享的KTable组件 */}
        <div style={{ flex: 1, minHeight: 0 }}>
          <KTable
            columns={columns}
            dataSource={roles}
            rowKey="id"
            loading={loading}
            total={roles.length}
            pageSize={10}
            bordered={false}
            stripe={true}
            size="middle"
          />
        </div>
      </Card>

      {/* 新增/编辑角色模态框 */}
      <Modal
        title={editingRole ? "编辑角色" : "新增角色"}
        open={modalVisible}
        onCancel={() => {
          setModalVisible(false);
          form.resetFields();
          setEditingRole(null);
        }}
        footer={null}
        width={500}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          initialValues={{ status: "ACTIVE" }}
        >
          <Form.Item
            name="name"
            label="角色名称"
            rules={[{ required: true, message: "请输入角色名称" }]}
          >
            <Input placeholder="请输入角色名称" />
          </Form.Item>

          <Form.Item name="description" label="角色描述">
            <Input.TextArea placeholder="请输入角色描述" rows={3} />
          </Form.Item>

          <Form.Item
            name="status"
            label="角色状态"
            rules={[{ required: true, message: "请选择角色状态" }]}
          >
            <Select>
              <Select.Option value="ACTIVE">激活</Select.Option>
              <Select.Option value="INACTIVE">停用</Select.Option>
            </Select>
          </Form.Item>

          <Divider />

          <Form.Item style={{ marginBottom: 0, textAlign: "right" }}>
            <Space>
              <Button
                onClick={() => {
                  setModalVisible(false);
                  form.resetFields();
                  setEditingRole(null);
                }}
              >
                取消
              </Button>
              <Button type="primary" htmlType="submit">
                {editingRole ? "更新" : "创建"}
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>

      {/* 权限分配模态框 */}
      <Modal
        title={`为角色 "${currentRole?.name}" 分配权限`}
        open={permissionModalVisible}
        onCancel={() => {
          setPermissionModalVisible(false);
          setCurrentRole(null);
          setSelectedPermissions([]);
        }}
        onOk={handleAssignPermissions}
        width={600}
        okText="确定"
        cancelText="取消"
      >
        <div style={{ maxHeight: "400px", overflowY: "auto" }}>
          <Tree
            checkable
            treeData={permissionTree}
            checkedKeys={selectedPermissions}
            onCheck={(checkedKeys) => {
              setSelectedPermissions(checkedKeys as string[]);
            }}
            defaultExpandAll
          />
        </div>
      </Modal>
    </div>
  );
};

export default RoleManagement;
