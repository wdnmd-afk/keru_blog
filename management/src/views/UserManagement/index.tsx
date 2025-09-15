import React, { useEffect, useState } from "react";
import {
  Card,
  Typography,
  Button,
  Space,
  Input,
  Select,
  message,
  Modal,
  Tag,
  Tooltip,
} from "antd";
import {
  PlusOutlined,
  SearchOutlined,
  ReloadOutlined,
  EditOutlined,
  DeleteOutlined,
  KeyOutlined,
} from "@ant-design/icons";
// 导入shared目录的KTable组件
import { KTable, type IKTableColumns } from "shared/components";
import { UserApi, User } from "@/api";
import "@/styles/ktable.scss";

const { Title, Text } = Typography;
const { Search } = Input;
const { Option } = Select;

const UserManagement: React.FC = () => {
  // 状态管理
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [adminFilter, setAdminFilter] = useState<boolean | undefined>(
    undefined,
  );

  // 表格列配置 - 使用IKTableColumns类型
  const columns: IKTableColumns[] = [
    {
      title: "用户ID",
      dataIndex: "id",
      key: "id",
      width: 120,
      ellipsis: true,
    },
    {
      title: "用户名",
      dataIndex: "name",
      key: "name",
      width: 150,
      ellipsis: true,
    },
    {
      title: "邮箱",
      dataIndex: "email",
      key: "email",
      width: 200,
      ellipsis: true,
    },
    {
      title: "管理员",
      dataIndex: "admin",
      key: "admin",
      width: 100,
      align: "center",
      render: (admin: boolean) => (
        <Tag color={admin ? "red" : "default"}>{admin ? "是" : "否"}</Tag>
      ),
    },
    // 注意：User模型中没有createdAt和updatedAt字段，已移除相关列
    {
      title: "操作",
      key: "actions",
      width: 200,
      align: "center",
      render: (_, record: User) => (
        <Space size="small">
          <Tooltip title="编辑用户">
            <Button
              type="text"
              icon={<EditOutlined />}
              size="small"
              onClick={() => handleEdit(record)}
            />
          </Tooltip>
          <Tooltip title="重置密码">
            <Button
              type="text"
              icon={<KeyOutlined />}
              size="small"
              onClick={() => handleResetPassword(record)}
            />
          </Tooltip>
          <Tooltip title="删除用户">
            <Button
              type="text"
              danger
              icon={<DeleteOutlined />}
              size="small"
              onClick={() => handleDelete(record)}
            />
          </Tooltip>
        </Space>
      ),
    },
  ];

  // 获取用户列表
  const fetchUsers = async () => {
    setLoading(true);
    try {
      const userList = await UserApi.getUserList();
      setUsers(userList);
    } catch (error: any) {
      message.error(error.message || "获取用户列表失败");
    } finally {
      setLoading(false);
    }
  };

  // 处理搜索和筛选
  const getFilteredUsers = () => {
    return users.filter((user) => {
      const matchesSearch =
        !searchText ||
        user.name.toLowerCase().includes(searchText.toLowerCase()) ||
        user.email.toLowerCase().includes(searchText.toLowerCase());

      const matchesAdmin =
        adminFilter === undefined || user.admin === adminFilter;

      return matchesSearch && matchesAdmin;
    });
  };

  // 事件处理函数
  const handleEdit = (user: User) => {
    message.info(`编辑用户功能开发中: ${user.name}`);
  };

  const handleResetPassword = (user: User) => {
    Modal.confirm({
      title: "重置密码",
      content: `确定要重置用户 "${user.name}" 的密码吗？`,
      onOk: async () => {
        try {
          await UserApi.resetUserPassword(user.id, "123456");
          message.success("密码重置成功，新密码为：123456");
        } catch (error: any) {
          message.error(error.message || "重置密码失败");
        }
      },
    });
  };

  const handleDelete = (user: User) => {
    Modal.confirm({
      title: "删除用户",
      content: `确定要删除用户 "${user.name}" 吗？此操作不可恢复。`,
      okType: "danger",
      onOk: async () => {
        try {
          await UserApi.deleteUser(user.id);
          message.success("删除用户成功");
          fetchUsers(); // 重新获取用户列表
        } catch (error: any) {
          message.error(error.message || "删除用户失败");
        }
      },
    });
  };

  const handleRefresh = () => {
    fetchUsers();
  };

  // 组件挂载时获取数据
  useEffect(() => {
    fetchUsers();
  }, []);

  const filteredUsers = getFilteredUsers();

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <div className="mb-6">
        <Title level={2} className="mb-2">
          用户管理
        </Title>
        <Text type="secondary">管理系统用户和权限</Text>
      </div>

      <Card
        style={{ height: "100%", display: "flex", flexDirection: "column" }}
        bodyStyle={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
          minHeight: 0,
        }}
      >
        {/* 操作栏 */}
        <div className="mb-4 flex justify-between items-center">
          <Space>
            <Button type="primary" icon={<PlusOutlined />}>
              新增用户
            </Button>
            <Button icon={<ReloadOutlined />} onClick={handleRefresh}>
              刷新
            </Button>
          </Space>

          <Space>
            <Search
              placeholder="搜索用户名或邮箱"
              allowClear
              style={{ width: 250 }}
              onSearch={setSearchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
            <Select
              placeholder="筛选管理员"
              allowClear
              style={{ width: 120 }}
              onChange={setAdminFilter}
            >
              <Option value={true}>管理员</Option>
              <Option value={false}>普通用户</Option>
            </Select>
          </Space>
        </div>

        {/* 用户列表表格 - 使用共享的KTable组件 */}
        <div style={{ flex: 1, minHeight: 0 }}>
          <KTable
            columns={columns}
            dataSource={filteredUsers}
            loading={loading}
            total={filteredUsers.length}
            pageSize={50}
            rowKey="id"
            className="management-table"
            bordered={false}
            stripe={true}
            size="middle"
          />
        </div>
      </Card>
    </div>
  );
};

export default UserManagement;
