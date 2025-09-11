import React, { useState, useEffect } from "react";
import {
  Card,
  Button,
  Space,
  Modal,
  Form,
  Select,
  message,
  Row,
  Col,
  Tag,
  Input,
  Avatar,
  Divider,
} from "antd";
// 导入shared目录的KTable组件
import { KTable, type IKTableColumns } from "shared/components";
import {
  UserOutlined,
  SettingOutlined,
  SearchOutlined,
  ReloadOutlined,
} from "@ant-design/icons";
// 移除原有的ColumnsType导入，使用IKTableColumns
import { RbacApi, UserApi, type Role } from "@/api";

// 用户类型定义
interface User {
  id: string;
  email: string;
  name?: string;
  admin: boolean;
  userRoles?: UserRole[];
}

// 用户角色关联类型
interface UserRole {
  id: string;
  roleId: string;
  role: Role;
}

// 注意：Role类型已从@/api导入，无需重复定义

const UserRoleManagement: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [roles, setRoles] = useState<Role[]>([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [selectedRoles, setSelectedRoles] = useState<string[]>([]);
  const [searchText, setSearchText] = useState("");

  // 获取用户列表
  const fetchUsers = async () => {
    setLoading(true);
    try {
      const users = await UserApi.getUserList();
      setUsers(users);
    } catch (error: any) {
      // UserApi已经处理了错误消息显示，这里只需要记录日志
      console.error("获取用户列表错误:", error);
    } finally {
      setLoading(false);
    }
  };

  // 获取角色列表
  const fetchRoles = async () => {
    try {
      const roles = await RbacApi.queryRoles({
        status: "ACTIVE", // 只获取激活的角色
      });
      setRoles(roles);
    } catch (error: any) {
      // RbacApi已经处理了错误消息显示，这里只需要记录日志
      console.error("获取角色列表错误:", error);
    }
  };

  // 获取用户当前角色
  const fetchUserRoles = async (userId: string) => {
    try {
      const userRoles = await RbacApi.getUserRoles(userId);
      const roleIds = userRoles.map((role) => role.id);
      setSelectedRoles(roleIds);
    } catch (error: any) {
      // RbacApi已经处理了错误消息显示，这里只需要记录日志
      console.error("获取用户角色错误:", error);
      // 如果API调用失败，尝试从本地用户数据获取角色信息作为备选方案
      const user = users.find((u) => u.id === userId);
      if (user?.userRoles) {
        const roleIds = user.userRoles.map((ur) => ur.roleId);
        setSelectedRoles(roleIds);
      }
    }
  };

  // 为用户分配角色
  const handleAssignRoles = async () => {
    if (!currentUser) return;

    try {
      await RbacApi.assignUserRoles({
        userId: currentUser.id,
        roleIds: selectedRoles,
      });

      message.success("角色分配成功");
      setModalVisible(false);
      setCurrentUser(null);
      setSelectedRoles([]);
      fetchUsers();
    } catch (error: any) {
      // RbacApi已经处理了错误消息显示，这里只需要记录日志
      console.error("角色分配错误:", error);
    }
  };

  // 打开角色分配模态框
  const handleOpenRoleModal = (user: User) => {
    setCurrentUser(user);
    // 设置当前用户的角色
    if (user.userRoles) {
      const roleIds = user.userRoles.map((ur) => ur.roleId);
      setSelectedRoles(roleIds);
    } else {
      setSelectedRoles([]);
    }
    setModalVisible(true);
  };

  // 搜索处理
  const handleSearch = () => {
    fetchUsers();
  };

  // 重置搜索
  const handleReset = () => {
    setSearchText("");
    fetchUsers();
  };

  useEffect(() => {
    fetchUsers();
    fetchRoles();
  }, []);

  // 过滤用户数据
  const filteredUsers = users.filter(
    (user) =>
      !searchText ||
      user.email.toLowerCase().includes(searchText.toLowerCase()) ||
      (user.name && user.name.toLowerCase().includes(searchText.toLowerCase())),
  );

  // 表格列定义 - 使用IKTableColumns类型
  const columns: IKTableColumns[] = [
    {
      title: "用户",
      key: "user",
      width: 200,
      render: (_, record) => (
        <Space>
          <Avatar icon={<UserOutlined />} />
          <div>
            <div style={{ fontWeight: 500 }}>
              {record.name || "未设置姓名"}
              {record.admin && (
                <Tag color="red" style={{ marginLeft: 8 }}>
                  管理员
                </Tag>
              )}
            </div>
            <div style={{ fontSize: "12px", color: "#666" }}>
              {record.email}
            </div>
          </div>
        </Space>
      ),
    },
    {
      title: "当前角色",
      key: "roles",
      render: (_, record) => (
        <Space wrap>
          {record.userRoles && record.userRoles.length > 0 ? (
            record.userRoles.map((userRole) => (
              <Tag key={userRole.id} color="blue">
                {userRole.role.name}
              </Tag>
            ))
          ) : (
            <Tag color="default">无角色</Tag>
          )}
        </Space>
      ),
    },
    {
      title: "角色数量",
      key: "roleCount",
      width: 100,
      render: (_, record) => <span>{record.userRoles?.length || 0}</span>,
    },
    {
      title: "操作",
      key: "action",
      width: 120,
      render: (_, record) => (
        <Button
          type="link"
          size="small"
          icon={<SettingOutlined />}
          onClick={() => handleOpenRoleModal(record)}
        >
          分配角色
        </Button>
      ),
    },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <Card
        title="用户角色管理"
        style={{ height: "100%", display: "flex", flexDirection: "column" }}
        bodyStyle={{ display: "flex", flexDirection: "column", flex: 1, minHeight: 0 }}
      >
        {/* 搜索和操作区域 */}
        <Row gutter={16} style={{ marginBottom: "16px" }}>
          <Col span={8}>
            <Input
              placeholder="搜索用户邮箱或姓名"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              onPressEnter={handleSearch}
            />
          </Col>
          <Col span={16}>
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
                icon={<ReloadOutlined />}
                onClick={() => {
                  fetchUsers();
                  fetchRoles();
                }}
              >
                刷新
              </Button>
            </Space>
          </Col>
        </Row>

        {/* 用户表格 - 使用共享的KTable组件 */}
        <div style={{ flex: 1, minHeight: 0 }}>
          <KTable
            columns={columns}
            dataSource={filteredUsers}
            rowKey="id"
            loading={loading}
            total={filteredUsers.length}
            pageSize={10}
            bordered={false}
            stripe={true}
            size="middle"
          />
        </div>
      </Card>

      {/* 角色分配模态框 */}
      <Modal
        title={
          <Space>
            <Avatar icon={<UserOutlined />} />
            <span>
              为用户 "{currentUser?.name || currentUser?.email}" 分配角色
            </span>
          </Space>
        }
        open={modalVisible}
        onCancel={() => {
          setModalVisible(false);
          setCurrentUser(null);
          setSelectedRoles([]);
        }}
        onOk={handleAssignRoles}
        width={600}
        okText="确定"
        cancelText="取消"
      >
        <Divider />

        <Form layout="vertical">
          <Form.Item label="选择角色">
            <Select
              mode="multiple"
              placeholder="请选择角色"
              value={selectedRoles}
              onChange={setSelectedRoles}
              style={{ width: "100%" }}
              optionLabelProp="label"
            >
              {roles.map((role) => (
                <Select.Option key={role.id} value={role.id} label={role.name}>
                  <div>
                    <div style={{ fontWeight: 500 }}>{role.name}</div>
                    {role.description && (
                      <div style={{ fontSize: "12px", color: "#666" }}>
                        {role.description}
                      </div>
                    )}
                  </div>
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          {selectedRoles.length > 0 && (
            <Form.Item label="已选择的角色">
              <Space wrap>
                {selectedRoles.map((roleId) => {
                  const role = roles.find((r) => r.id === roleId);
                  return role ? (
                    <Tag key={roleId} color="blue">
                      {role.name}
                    </Tag>
                  ) : null;
                })}
              </Space>
            </Form.Item>
          )}
        </Form>

        <div
          style={{
            marginTop: "16px",
            padding: "12px",
            backgroundColor: "#f6f6f6",
            borderRadius: "6px",
            fontSize: "12px",
            color: "#666",
          }}
        >
          <strong>提示：</strong>
          <ul style={{ margin: "4px 0", paddingLeft: "16px" }}>
            <li>可以为用户分配多个角色</li>
            <li>用户将拥有所有已分配角色的权限</li>
            <li>管理员用户默认拥有所有权限</li>
            <li>角色变更后立即生效</li>
          </ul>
        </div>
      </Modal>
    </div>
  );
};

export default UserRoleManagement;
