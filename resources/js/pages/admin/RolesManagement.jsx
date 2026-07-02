import { useState, useEffect } from "react";
import {
  Table,
  Card,
  Button,
  Input,
  Space,
  Modal,
  Form,
  Tag,
  Popconfirm,
  Typography,
  Row,
  Col,
  Transfer,
  Badge,
} from "antd";
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  TeamOutlined,
  KeyOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import axios from "axios";
import toast from "react-hot-toast";

const { Title } = Typography;

const RolesManagement = () => {
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [permissions, setPermissions] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [permissionModalVisible, setPermissionModalVisible] = useState(false);
  const [usersModalVisible, setUsersModalVisible] = useState(false);
  const [editingRole, setEditingRole] = useState(null);
  const [selectedRole, setSelectedRole] = useState(null);
  const [roleUsers, setRoleUsers] = useState([]);
  const [form] = Form.useForm();
  const [permissionForm] = Form.useForm();
  const [initialPermissions, setInitialPermissions] = useState([]);
  const [targetKeys, setTargetKeys] = useState([]);
  const [pagination, setPagination] = useState({
    current_page: 1,
    last_page: 1,
    per_page: 10,
    total: 0,
  });
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    loadRoles();
    loadPermissions();
  }, [pagination.current_page]);

  const loadRoles = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("currentToken");
      if (token) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      }

      const params = {
        page: pagination.current_page,
        per_page: pagination.per_page,
        search: searchText,
      };

      const response = await axios.get("/admin/roles", { params });
      const { data, meta } = response.data;

      setRoles(data);
      setPagination(meta);
    } catch (error) {
      console.error("Error loading roles:", error);
      toast.error("Failed to load roles");
    } finally {
      setLoading(false);
    }
  };

  const loadPermissions = async () => {
    try {
      const token = localStorage.getItem("currentToken");
      if (token) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      }

      const response = await axios.get("/admin/permissions/grouped");
      setPermissions(response.data.data);
    } catch (error) {
      console.error("Error loading permissions:", error);
      // Fallback: load all permissions and group them manually
      try {
        const allPermsResponse = await axios.get("/admin/permissions", {
          params: { per_page: 100 }
        });
        const perms = allPermsResponse.data.data || [];
        const grouped = {
          users: perms.filter(p => p.name.includes('users')),
          roles: perms.filter(p => p.name.includes('roles')),
          permissions: perms.filter(p => p.name.includes('permissions')),
          forms: perms.filter(p => p.name.includes('forms')),
          access_requests: perms.filter(p => p.name.includes('access requests')),
          settings: perms.filter(p => p.name.includes('settings')),
          reports: perms.filter(p => p.name.includes('reports')),
        };
        setPermissions(grouped);
      } catch (fallbackError) {
        console.error("Fallback also failed:", fallbackError);
        setPermissions({});
      }
    }
  };

  const showCreateModal = () => {
    setEditingRole(null);
    form.resetFields();
    setModalVisible(true);
  };

  const showEditModal = (role) => {
    setEditingRole(role);
    form.resetFields();
    form.setFieldsValue({ name: role.name });
    setModalVisible(true);
  };

  const showPermissionModal = async (role) => {
    setSelectedRole(role);
    permissionForm.resetFields();
    try {
      const token = localStorage.getItem("currentToken");
      if (token) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      }

      const response = await axios.get(`/admin/roles/${role.id}/permissions`);
      const assignedPermissions = response.data.data.map((p) => p.name);
      console.log('Assigned permissions:', assignedPermissions);

      // Set initial values for Transfer
      setInitialPermissions(assignedPermissions);
      setTargetKeys(assignedPermissions);
      setPermissionModalVisible(true);

      // Log available permissions
      const availablePerms = getAllPermissions();
      console.log('Available permissions for transfer:', availablePerms.length);
    } catch (error) {
      console.error('Error loading role permissions:', error);
      toast.error("Failed to load role permissions: " + (error.response?.data?.message || ''));
    }
  };

  const showUsersModal = async (role) => {
    setSelectedRole(role);
    try {
      const token = localStorage.getItem("currentToken");
      if (token) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      }

      const response = await axios.get(`/admin/roles/${role.id}/users`);
      setRoleUsers(response.data.data);
      setUsersModalVisible(true);
    } catch (error) {
      toast.error("Failed to load role users");
    }
  };

  const handleSubmit = async (values) => {
    try {
      const token = localStorage.getItem("currentToken");
      if (token) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      }

      if (editingRole) {
        await axios.put(`/admin/roles/${editingRole.id}`, values);
        toast.success("Role updated successfully");
      } else {
        await axios.post("/admin/roles", values);
        toast.success("Role created successfully");
      }

      setModalVisible(false);
      form.resetFields();
      loadRoles();
    } catch (error) {
      console.error("Error saving role:", error);
      const errorMessage = error.response?.data?.message || "Failed to save role";
      toast.error(errorMessage);
    }
  };

  const handleAssignPermissions = async (values) => {
    try {
      const token = localStorage.getItem("currentToken");
      if (token) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      }

      await axios.post(`/admin/roles/${selectedRole.id}/permissions`, {
        permissions: targetKeys,
      });
      toast.success("Permissions assigned successfully");
      setPermissionModalVisible(false);
      loadRoles();
    } catch (error) {
      console.error('Error assigning permissions:', error);
      const errorMessage = error.response?.data?.message || "Failed to assign permissions";
      toast.error(errorMessage);
    }
  };

  const handleTransferChange = (newTargetKeys) => {
    setTargetKeys(newTargetKeys);
  };

  const handleDelete = async (role) => {
    try {
      const token = localStorage.getItem("currentToken");
      if (token) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      }

      await axios.delete(`/admin/roles/${role.id}`);
      toast.success("Role deleted successfully");
      loadRoles();
    } catch (error) {
      console.error("Error deleting role:", error);
      const errorMessage = error.response?.data?.message || "Failed to delete role";
      toast.error(errorMessage);
    }
  };

  const handleSearch = () => {
    setPagination({ ...pagination, current_page: 1 });
    loadRoles();
  };

  // Group permissions by category for better display
  const getAllPermissions = () => {
    const allPerms = [];

    // Check if permissions is empty
    if (!permissions || Object.keys(permissions).length === 0) {
      console.warn('No permissions loaded');
      return [];
    }

    Object.entries(permissions).forEach(([group, perms]) => {
      if (Array.isArray(perms)) {
        perms.forEach((perm) => {
          allPerms.push({
            key: perm.name || perm,
            title: perm.name || perm,
            group: group.replace("_", " ").toUpperCase(),
          });
        });
      }
    });

    console.log('Total permissions available:', allPerms.length);
    return allPerms;
  };

  const columns = [
    {
      title: "Role Name",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
      render: (name) => (
        <Badge
          count={name}
          color={
            name === "admin"
              ? "red"
              : name === "manager"
                ? "purple"
                : name === "user"
                  ? "blue"
                  : "green"
          }
        />
      ),
    },
    {
      title: "Permissions",
      key: "permissions",
      render: (_, record) => (
        <Space wrap>
          {record.permissions?.slice(0, 5).map((perm) => (
            <Tag color="blue" key={perm.name}>
              {perm.name}
            </Tag>
          ))}
          {record.permissions?.length > 5 && (
            <Tag color="gray">+{record.permissions.length - 5} more</Tag>
          )}
        </Space>
      ),
    },
    {
      title: "Users Count",
      key: "users_count",
      render: (_, record) => (
        <Space>
          <TeamOutlined />
          {record.users_count || 0}
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
            icon={<KeyOutlined />}
            onClick={() => showPermissionModal(record)}
          >
            Permissions
          </Button>
          <Button
            type="link"
            icon={<TeamOutlined />}
            onClick={() => showUsersModal(record)}
          >
            Users
          </Button>
          <Popconfirm
            title="Delete Role"
            description="Are you sure to delete this role?"
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
            <Title level={2}>Role Management</Title>
          </Col>
          <Col>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={showCreateModal}
            >
              Add Role
            </Button>
          </Col>
        </Row>

        <Space style={{ marginBottom: 16 }}>
          <Input
            placeholder="Search roles..."
            prefix={<SearchOutlined />}
            style={{ width: 300 }}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            onPressEnter={handleSearch}
          />
          <Button type="primary" onClick={handleSearch}>
            Search
          </Button>
        </Space>

        <Table
          columns={columns}
          dataSource={roles}
          rowKey="id"
          loading={loading}
          pagination={{
            current: pagination.current_page,
            pageSize: pagination.per_page,
            total: pagination.total,
            showSizeChanger: true,
            showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} roles`,
          }}
          onChange={(pag) => {
            setPagination({
              ...pagination,
              current_page: pag.current,
            });
          }}
        />
      </Card>

      {/* Create/Edit Role Modal */}
      <Modal
        title={editingRole ? "Edit Role" : "Create Role"}
        open={modalVisible}
        onCancel={() => {
          setModalVisible(false);
          form.resetFields();
        }}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item
            name="name"
            label="Role Name"
            rules={[
              { required: true, message: "Please enter role name" },
              {
                pattern: /^[a-z_-]+$/,
                message: "Role name must be lowercase with no spaces",
              },
            ]}
          >
            <Input placeholder="e.g., admin, manager, user" />
          </Form.Item>

          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit">
                {editingRole ? "Update" : "Create"}
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

      {/* Assign Permissions Modal */}
      <Modal
        title={`Assign Permissions to ${selectedRole?.name}`}
        open={permissionModalVisible}
        onCancel={() => {
          setPermissionModalVisible(false);
          setTargetKeys([]);
          setInitialPermissions([]);
        }}
        footer={null}
        width={900}
      >
        <Form form={permissionForm} layout="vertical" onFinish={handleAssignPermissions}>
          <Form.Item
            name="permissions"
            label="Select Permissions"
            style={{ maxHeight: 500, overflowY: "auto" }}
          >
            <Transfer
              dataSource={getAllPermissions()}
              targetKeys={targetKeys}
              onChange={handleTransferChange}
              titles={["Available", "Assigned"]}
              render={(item) => item.title}
              listStyle={{
                width: 300,
                height: 400,
              }}
              showSearch
              filterOption={(inputValue, option) =>
                option.title.indexOf(inputValue) > -1
              }
            />
          </Form.Item>

          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit">
                Save Permissions
              </Button>
              <Button onClick={() => setPermissionModalVisible(false)}>
                Cancel
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>

      {/* Role Users Modal */}
      <Modal
        title={`Users with role: ${selectedRole?.name}`}
        open={usersModalVisible}
        onCancel={() => setUsersModalVisible(false)}
        footer={[
          <Button key="close" onClick={() => setUsersModalVisible(false)}>
            Close
          </Button>,
        ]}
      >
        <Table
          dataSource={roleUsers}
          rowKey="id"
          pagination={false}
          scroll={{ y: 400 }}
        >
          <Table.Column title="Name" dataIndex="name" key="name" />
          <Table.Column title="Email" dataIndex="email" key="email" />
          <Table.Column
            title="User Type"
            dataIndex="user_type"
            key="user_type"
            render={(user_type) => (
              <Badge
                count={user_type}
                color={user_type === "internal" ? "blue" : "green"}
              />
            )}
          />
          <Table.Column
            title="Other Roles"
            key="roles"
            render={(_, record) => (
              <Space wrap>
                {record.roles
                  ?.filter((r) => r.name !== selectedRole?.name)
                  .map((role) => (
                    <Tag key={role.name}>{role.name}</Tag>
                  ))}
              </Space>
            )}
          />
        </Table>
      </Modal>
    </div>
  );
};

export default RolesManagement;
