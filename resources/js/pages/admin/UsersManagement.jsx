import { useState, useEffect } from "react";
import {
  Table,
  Card,
  Button,
  Input,
  Select,
  Space,
  Modal,
  Form,
  Tag,
  Popconfirm,
  Typography,
  Row,
  Col,
  Badge,
} from "antd";
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  UserSwitchOutlined,
  KeyOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import axios from "axios";
import toast from "react-hot-toast";

const { Title } = Typography;
const { Option } = Select;

const UsersManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [roles, setRoles] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [userModalVisible, setUserModalVisible] = useState(false);
  const [permissionModalVisible, setPermissionModalVisible] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [userPermissions, setUserPermissions] = useState([]);
  const [form] = Form.useForm();
  const [pagination, setPagination] = useState({
    current_page: 1,
    last_page: 1,
    per_page: 10,
    total: 0,
  });
  const [filters, setFilters] = useState({
    search: "",
    role: "",
    user_type: "",
  });

  useEffect(() => {
    loadUsers();
    loadRoles();
  }, [pagination.current_page]);

  const loadUsers = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("currentToken");
      if (token) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      }

      const params = {
        page: pagination.current_page,
        per_page: pagination.per_page,
        ...filters,
      };

      const response = await axios.get("/admin/users", { params });
      const { data, meta } = response.data;

      setUsers(data);
      setPagination(meta);
    } catch (error) {
      console.error("Error loading users:", error);
      toast.error("Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  const loadRoles = async () => {
    try {
      const token = localStorage.getItem("currentToken");
      if (token) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      }

      const response = await axios.get("/admin/roles");
      setRoles(response.data.data);
    } catch (error) {
      console.error("Error loading roles:", error);
    }
  };

  const handleSearch = () => {
    setPagination({ ...pagination, current_page: 1 });
    loadUsers();
  };

  const handleFilterChange = (key, value) => {
    setFilters({ ...filters, [key]: value });
  };

  const showCreateModal = () => {
    setEditingUser(null);
    form.resetFields();
    form.setFieldsValue({ user_type: "internal", roles: ["user"] });
    setModalVisible(true);
  };

  const showEditModal = (user) => {
    setEditingUser(user);
    form.resetFields();
    form.setFieldsValue({
      ...user,
      roles: user.roles?.map((r) => r.name) || [],
    });
    setModalVisible(true);
  };

  const showUserRolesModal = (user) => {
    setSelectedUser(user);
    setUserModalVisible(true);
  };

  const showUserPermissionsModal = async (user) => {
    setSelectedUser(user);
    try {
      const token = localStorage.getItem("currentToken");
      if (token) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      }

      const response = await axios.get(`/admin/users/${user.id}/permissions`);
      setUserPermissions(response.data.data);
      setPermissionModalVisible(true);
    } catch (error) {
      toast.error("Failed to load user permissions");
    }
  };

  const handleSubmit = async (values) => {
    try {
      const token = localStorage.getItem("currentToken");
      if (token) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      }

      if (editingUser) {
        await axios.post(`/admin/users/${editingUser.id}`, {
          ...values,
          _method: 'PUT'
        });
        toast.success("User updated successfully");
      } else {
        await axios.post("/admin/users", values);
        toast.success("User created successfully");
      }

      setModalVisible(false);
      form.resetFields();
      loadUsers();
    } catch (error) {
      console.error("Error saving user:", error);
      const errorMessage = error.response?.data?.message || "Failed to save user";
      toast.error(errorMessage);
    }
  };

  const handleDelete = async (user) => {
    try {
      const token = localStorage.getItem("currentToken");
      if (token) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      }

      await axios.delete(`/admin/users/${user.id}`);
      toast.success("User deleted successfully");
      loadUsers();
    } catch (error) {
      console.error("Error deleting user:", error);
      const errorMessage = error.response?.data?.message || "Failed to delete user";
      toast.error(errorMessage);
    }
  };

  const handleAssignRoles = async (values) => {
    try {
      const token = localStorage.getItem("currentToken");
      if (token) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      }

      await axios.post(`/admin/users/${selectedUser.id}/roles`, {
        roles: values.roles,
      });
      toast.success("Roles assigned successfully");
      setUserModalVisible(false);
      loadUsers();
    } catch (error) {
      toast.error("Failed to assign roles");
    }
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
      render: (text, record) => (
        <Space direction="vertical" size={0}>
          <strong>{text}</strong>
          <small style={{ color: "#888" }}>{record.email}</small>
        </Space>
      ),
    },
    {
      title: "User Type",
      dataIndex: "user_type",
      key: "user_type",
      filters: [
        { text: "Internal", value: "internal" },
        { text: "External", value: "external" },
      ],
      onFilter: (value, record) => record.user_type === value,
      render: (user_type) => (
        <Badge
          count={user_type === "internal" ? "Internal" : "External"}
          color={user_type === "internal" ? "blue" : "green"}
        />
      ),
    },
    {
      title: "Department",
      dataIndex: "department",
      key: "department",
    },
    {
      title: "Position",
      dataIndex: "position",
      key: "position",
    },
    {
      title: "Roles",
      key: "roles",
      render: (_, record) => (
        <Space wrap>
          {record.roles?.map((role) => (
            <Tag color="blue" key={role.name}>
              {role.name}
            </Tag>
          ))}
        </Space>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space wrap>
          <Button
            type="link"
            icon={<EditOutlined />}
            onClick={() => showEditModal(record)}
          >
            Edit
          </Button>
          <Button
            type="link"
            icon={<UserSwitchOutlined />}
            onClick={() => showUserRolesModal(record)}
          >
            Roles
          </Button>
          <Button
            type="link"
            icon={<KeyOutlined />}
            onClick={() => showUserPermissionsModal(record)}
          >
            Permissions
          </Button>
          <Popconfirm
            title="Delete User"
            description="Are you sure to delete this user?"
            onConfirm={() => handleDelete(record)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="link" danger icon={<DeleteOutlined />}>
              Delete
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: "24px" }}>
      <Card>
        <Row justify="space-between" align="middle" style={{ marginBottom: 16 }}>
          <Col>
            <Title level={2}>User Management</Title>
          </Col>
          <Col>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={showCreateModal}
            >
              Add User
            </Button>
          </Col>
        </Row>

        <Space style={{ marginBottom: 16 }} wrap>
          <Input
            placeholder="Search by name, email, department..."
            prefix={<SearchOutlined />}
            style={{ width: 300 }}
            value={filters.search}
            onChange={(e) => handleFilterChange("search", e.target.value)}
            onPressEnter={handleSearch}
          />
          <Select
            placeholder="Filter by Role"
            style={{ width: 200 }}
            allowClear
            value={filters.role || undefined}
            onChange={(value) => handleFilterChange("role", value)}
          >
            {roles.map((role) => (
              <Option key={role.name} value={role.name}>
                {role.name}
              </Option>
            ))}
          </Select>
          <Select
            placeholder="Filter by User Type"
            style={{ width: 150 }}
            allowClear
            value={filters.user_type || undefined}
            onChange={(value) => handleFilterChange("user_type", value)}
          >
            <Option value="internal">Internal</Option>
            <Option value="external">External</Option>
          </Select>
          <Button type="primary" onClick={handleSearch}>
            Search
          </Button>
        </Space>

        <Table
          columns={columns}
          dataSource={users}
          rowKey="id"
          loading={loading}
          pagination={{
            current: pagination.current_page,
            pageSize: pagination.per_page,
            total: pagination.total,
            showSizeChanger: true,
            showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} users`,
          }}
          onChange={(pag) => {
            setPagination({
              ...pagination,
              current_page: pag.current,
            });
          }}
        />
      </Card>

      {/* Create/Edit User Modal */}
      <Modal
        title={editingUser ? "Edit User" : "Create User"}
        open={modalVisible}
        onCancel={() => {
          setModalVisible(false);
          form.resetFields();
        }}
        footer={null}
        width={700}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          initialValues={{ user_type: "internal", roles: ["user"] }}
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="name"
                label="Name"
                rules={[{ required: true, message: "Please enter name" }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="email"
                label="Email"
                rules={[
                  { required: true, message: "Please enter email" },
                  { type: "email", message: "Please enter valid email" },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>

          {!editingUser && (
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="password"
                  label="Password"
                  rules={[
                    { required: true, message: "Please enter password" },
                    { min: 8, message: "Password must be at least 8 characters" },
                  ]}
                >
                  <Input.Password />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="password_confirmation"
                  label="Confirm Password"
                  rules={[
                    { required: true, message: "Please confirm password" },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue("password") === value) {
                          return Promise.resolve();
                        }
                        return Promise.reject(
                          new Error("Passwords do not match")
                        );
                      },
                    }),
                  ]}
                >
                  <Input.Password />
                </Form.Item>
              </Col>
            </Row>
          )}

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="user_type"
                label="User Type"
                rules={[{ required: true, message: "Please select user type" }]}
              >
                <Select>
                  <Option value="internal">Internal</Option>
                  <Option value="external">External</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="roles" label="Roles">
                <Select mode="multiple">
                  {roles.map((role) => (
                    <Option key={role.name} value={role.name}>
                      {role.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="department" label="Department">
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="position" label="Position">
                <Input />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="phone" label="Phone">
                <Input />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={24}>
              <Form.Item name="bio" label="Bio">
                <Input.TextArea rows={3} />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit">
                {editingUser ? "Update" : "Create"}
              </Button>
              <Button
                onClick={() => {
                  setModalVisible(false);
                  form.resetFields();
                }}
              >
                Cancel
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>

      {/* Assign Roles Modal */}
      <Modal
        title={`Assign Roles to ${selectedUser?.name}`}
        open={userModalVisible}
        onCancel={() => setUserModalVisible(false)}
        footer={null}
      >
        <Form
          initialValues={{
            roles: selectedUser?.roles?.map((r) => r.name) || [],
          }}
          onFinish={handleAssignRoles}
        >
          <Form.Item
            name="roles"
            label="Roles"
            rules={[{ required: true, message: "Please select at least one role" }]}
          >
            <Select mode="multiple">
              {roles.map((role) => (
                <Option key={role.name} value={role.name}>
                  {role.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit">
                Assign Roles
              </Button>
              <Button onClick={() => setUserModalVisible(false)}>
                Cancel
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>

      {/* User Permissions Modal */}
      <Modal
        title={`Permissions for ${selectedUser?.name}`}
        open={permissionModalVisible}
        onCancel={() => setPermissionModalVisible(false)}
        footer={[
          <Button key="close" onClick={() => setPermissionModalVisible(false)}>
            Close
          </Button>,
        ]}
        width={800}
      >
        <Space direction="vertical" style={{ width: "100%" }} size="small">
          <Title level={5}>Direct Permissions ({userPermissions.length})</Title>
          {userPermissions.length > 0 ? (
            <Space wrap>
              {userPermissions.map((perm) => (
                <Tag color="green" key={perm.name}>
                  {perm.name}
                </Tag>
              ))}
            </Space>
          ) : (
            <p>No direct permissions. Permissions are inherited from roles.</p>
          )}
        </Space>
      </Modal>
    </div>
  );
};

export default UsersManagement;
