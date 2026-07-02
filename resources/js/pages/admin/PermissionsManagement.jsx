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
  Descriptions,
  Tree,
} from "antd";
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  SearchOutlined,
  SafetyCertificateOutlined,
} from "@ant-design/icons";
import axios from "axios";
import toast from "react-hot-toast";

const { Title } = Typography;

const PermissionsManagement = () => {
  const [permissions, setPermissions] = useState([]);
  const [groupedPermissions, setGroupedPermissions] = useState({});
  const [loading, setLoading] = useState(true);
  const [roles, setRoles] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [detailModalVisible, setDetailModalVisible] = useState(false);
  const [editingPermission, setEditingPermission] = useState(null);
  const [selectedPermission, setSelectedPermission] = useState(null);
  const [form] = Form.useForm();
  const [pagination, setPagination] = useState({
    current_page: 1,
    last_page: 1,
    per_page: 50,
    total: 0,
  });
  const [filters, setFilters] = useState({
    search: "",
    group: "",
  });

  useEffect(() => {
    loadPermissions();
    loadRoles();
  }, [pagination.current_page]);

  const loadPermissions = async () => {
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

      const response = await axios.get("/admin/permissions", { params });
      const { data, meta } = response.data;

      setPermissions(data);
      setPagination(meta);
    } catch (error) {
      console.error("Error loading permissions:", error);
      toast.error("Failed to load permissions");
    } finally {
      setLoading(false);
    }
  };

  const loadGroupedPermissions = async () => {
    try {
      const token = localStorage.getItem("currentToken");
      if (token) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      }

      const response = await axios.get("/admin/permissions/grouped");
      setGroupedPermissions(response.data.data);
    } catch (error) {
      console.error("Error loading grouped permissions:", error);
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
        setGroupedPermissions(grouped);
      } catch (fallbackError) {
        console.error("Fallback also failed:", fallbackError);
        setGroupedPermissions({});
      }
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

  const showCreateModal = () => {
    setEditingPermission(null);
    form.resetFields();
    setModalVisible(true);
  };

  const showEditModal = (permission) => {
    setEditingPermission(permission);
    form.resetFields();
    form.setFieldsValue({ name: permission.name });
    setModalVisible(true);
  };

  const showDetailModal = async (permission) => {
    setSelectedPermission(permission);
    try {
      const token = localStorage.getItem("currentToken");
      if (token) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      }

      const response = await axios.get(`/admin/permissions/${permission.id}`);
      setSelectedPermission(response.data.data);
      setDetailModalVisible(true);
    } catch (error) {
      toast.error("Failed to load permission details");
    }
  };

  const handleSubmit = async (values) => {
    try {
      const token = localStorage.getItem("currentToken");
      if (token) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      }

      if (editingPermission) {
        await axios.put(`/admin/permissions/${editingPermission.id}`, values);
        toast.success("Permission updated successfully");
      } else {
        await axios.post("/admin/permissions", values);
        toast.success("Permission created successfully");
      }

      setModalVisible(false);
      form.resetFields();
      loadPermissions();
    } catch (error) {
      console.error("Error saving permission:", error);
      const errorMessage = error.response?.data?.message || "Failed to save permission";
      toast.error(errorMessage);
    }
  };

  const handleDelete = async (permission) => {
    try {
      const token = localStorage.getItem("currentToken");
      if (token) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      }

      await axios.delete(`/admin/permissions/${permission.id}`);
      toast.success("Permission deleted successfully");
      loadPermissions();
    } catch (error) {
      console.error("Error deleting permission:", error);
      const errorMessage = error.response?.data?.message || "Failed to delete permission";
      toast.error(errorMessage);
    }
  };

  const handleSearch = () => {
    setPagination({ ...pagination, current_page: 1 });
    loadPermissions();
  };

  const handleFilterChange = (key, value) => {
    setFilters({ ...filters, [key]: value });
  };

  // Get permission type badge color
  const getPermissionColor = (name) => {
    if (name.includes("view")) return "blue";
    if (name.includes("create")) return "green";
    if (name.includes("edit")) return "orange";
    if (name.includes("delete")) return "red";
    if (name.includes("assign")) return "purple";
    if (name.includes("approve")) return "cyan";
    if (name.includes("reject")) return "volcano";
    return "default";
  };

  const columns = [
    {
      title: "Permission Name",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
      render: (name) => (
        <Tag color={getPermissionColor(name)}>{name}</Tag>
      ),
    },
    {
      title: "Assigned to Roles",
      key: "roles",
      render: (_, record) => (
        <Space wrap>
          {record.roles?.slice(0, 3).map((role) => (
            <Tag color="blue" key={role.name}>
              {role.name}
            </Tag>
          ))}
          {record.roles?.length > 3 && (
            <Tag color="gray">+{record.roles.length - 3} more</Tag>
          )}
        </Space>
      ),
    },
    {
      title: "Created At",
      dataIndex: "created_at",
      key: "created_at",
      render: (date) => new Date(date).toLocaleDateString("th-TH"),
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
            icon={<SafetyCertificateOutlined />}
            onClick={() => showDetailModal(record)}
          >
            Details
          </Button>
          <Popconfirm
            title="Delete Permission"
            description="Are you sure to delete this permission?"
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

  // Build tree data for grouped permissions view
  const buildTreeData = () => {
    const treeData = [];
    Object.entries(groupedPermissions).forEach(([group, perms]) => {
      treeData.push({
        title: group.replace("_", " ").toUpperCase(),
        key: group,
        selectable: false,
        children: perms.map((perm) => ({
          title: perm.name,
          key: perm.name,
          icon: <Tag color={getPermissionColor(perm.name)}>{perm.name}</Tag>,
        })),
      });
    });
    return treeData;
  };

  return (
    <div style={{ padding: "24px" }}>
      <Card>
        <Row justify="space-between" align="middle" style={{ marginBottom: 16 }}>
          <Col>
            <Title level={2}>Permission Management</Title>
          </Col>
          <Col>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={showCreateModal}
            >
              Add Permission
            </Button>
          </Col>
        </Row>

        <Space style={{ marginBottom: 16 }} wrap>
          <Input
            placeholder="Search permissions..."
            prefix={<SearchOutlined />}
            style={{ width: 300 }}
            value={filters.search}
            onChange={(e) => handleFilterChange("search", e.target.value)}
            onPressEnter={handleSearch}
          />
          <Input
            placeholder="Filter by group (e.g., view, create, edit)"
            style={{ width: 250 }}
            value={filters.group}
            onChange={(e) => handleFilterChange("group", e.target.value)}
            onPressEnter={handleSearch}
          />
          <Button type="primary" onClick={handleSearch}>
            Search
          </Button>
        </Space>

        <Table
          columns={columns}
          dataSource={permissions}
          rowKey="id"
          loading={loading}
          pagination={{
            current: pagination.current_page,
            pageSize: pagination.per_page,
            total: pagination.total,
            showSizeChanger: true,
            showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} permissions`,
          }}
          onChange={(pag) => {
            setPagination({
              ...pagination,
              current_page: pag.current,
            });
          }}
        />
      </Card>

      {/* Grouped Permissions Overview Card */}
      <Card title="Permissions Overview" style={{ marginTop: 16 }}>
        <Button
          type="link"
          onClick={loadGroupedPermissions}
          style={{ marginBottom: 16 }}
        >
          Refresh View
        </Button>
        <Row gutter={16}>
          {Object.entries(groupedPermissions).map(([group, perms]) => (
            <Col span={8} key={group} style={{ marginBottom: 16 }}>
              <Card
                size="small"
                title={group.replace("_", " ").toUpperCase()}
                style={{ height: "100%" }}
              >
                <Space direction="vertical" style={{ width: "100%" }} size="small">
                  {perms.map((perm) => (
                    <Tag key={perm.name} color={getPermissionColor(perm.name)}>
                      {perm.name}
                    </Tag>
                  ))}
                </Space>
              </Card>
            </Col>
          ))}
        </Row>
      </Card>

      {/* Create/Edit Permission Modal */}
      <Modal
        title={editingPermission ? "Edit Permission" : "Create Permission"}
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
            label="Permission Name"
            rules={[
              { required: true, message: "Please enter permission name" },
              {
                pattern: /^[a-z\s-]+$/,
                message: "Permission name must be lowercase with no special characters",
              },
            ]}
          >
            <Input placeholder="e.g., view users, create forms" />
          </Form.Item>

          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit">
                {editingPermission ? "Update" : "Create"}
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

      {/* Permission Detail Modal */}
      <Modal
        title="Permission Details"
        open={detailModalVisible}
        onCancel={() => setDetailModalVisible(false)}
        footer={[
          <Button key="close" onClick={() => setDetailModalVisible(false)}>
            Close
          </Button>,
        ]}
      >
        {selectedPermission && (
          <Descriptions column={1} bordered>
            <Descriptions.Item label="Name">
              <Tag color={getPermissionColor(selectedPermission.name)}>
                {selectedPermission.name}
              </Tag>
            </Descriptions.Item>
            <Descriptions.Item label="ID">{selectedPermission.id}</Descriptions.Item>
            <Descriptions.Item label="Created At">
              {new Date(selectedPermission.created_at).toLocaleString("th-TH")}
            </Descriptions.Item>
            <Descriptions.Item label="Updated At">
              {new Date(selectedPermission.updated_at).toLocaleString("th-TH")}
            </Descriptions.Item>
            <Descriptions.Item label="Assigned to Roles">
              <Space wrap>
                {selectedPermission.roles?.map((role) => (
                  <Tag color="blue" key={role.name}>
                    {role.name}
                  </Tag>
                ))}
              </Space>
            </Descriptions.Item>
          </Descriptions>
        )}
      </Modal>
    </div>
  );
};

export default PermissionsManagement;
