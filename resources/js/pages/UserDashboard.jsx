import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Card,
  Row,
  Col,
  Avatar,
  Badge,
  Table,
  Tag,
  Button,
  Space,
  Typography,
  Divider,
  Statistic,
  Descriptions,
  Modal,
  Form,
  Input,
} from "antd";
import {
  UserOutlined,
  LogoutOutlined,
  FileTextOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  CloseCircleOutlined,
  EditOutlined,
  HomeOutlined,
  PlusOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import axios from "axios";
import toast from "react-hot-toast";

const { Title, Text } = Typography;
const { TextArea } = Input;

const UserDashboard = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [accessRequests, setAccessRequests] = useState([]);
  const [stats, setStats] = useState({ pending: 0, approved: 0, rejected: 0 });
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("currentToken");
      if (!token) {
        navigate("/login");
        return;
      }

      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      // Load user profile
      const userResponse = await axios.get("/user");
      const userData = userResponse.data;
      setUser(userData);
      form.setFieldsValue({
        name: userData.name,
        phone: userData.phone,
        department: userData.department,
        position: userData.position,
        bio: userData.bio,
      });
      if (userData.id) {
        localStorage.setItem('userId', String(userData.id));
      }
      if (userData.is_internal) {
        localStorage.setItem('isInternal', 'true');
      }

      // Load access requests
      await loadAccessRequests();
    } catch (error) {
      console.error("Error loading user data:", error);
      if (error.response?.status === 401) {
        navigate("/login");
      } else {
        toast.error("ไม่สามารถโหลดข้อมูลได้");
      }
    } finally {
      setLoading(false);
    }
  };

  const loadAccessRequests = async () => {
    try {
      const token = localStorage.getItem("currentToken");
      if (token) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      }

      const response = await axios.get("/forms/access-requests/my-requests");
      const requests = response.data.data || [];
      setAccessRequests(requests);

      // Calculate stats
      setStats({
        pending: requests.filter((r) => r.status === "pending").length,
        approved: requests.filter((r) => r.status === "approved").length,
        rejected: requests.filter((r) => r.status === "rejected").length,
      });
    } catch (error) {
      console.error("Error loading access requests:", error);
    }
  };

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("currentToken");
      if (token) {
        await axios.post("/logout", null, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      }
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      // Clear local storage
      localStorage.removeItem("currentToken");
      localStorage.removeItem("userId");
      localStorage.removeItem("isInternal");
      localStorage.removeItem("isNewUser");
      localStorage.removeItem("user");

      // Clear auth header
      delete axios.defaults.headers.common["Authorization"];

      toast.success("Logout สำเร็จ");
      navigate("/login");
    }
  };

  const handleUpdateProfile = async (values) => {
    try {
      const token = localStorage.getItem("currentToken");
      if (token) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      }

      await axios.post("/user/profile", {
        ...values,
        _method: "PUT",
      });

      toast.success("อัพเดทโปรไฟล์เรียบร้อยแล้ว");
      setEditModalVisible(false);
      loadUserData();
    } catch (error) {
      console.error("Profile update error:", error);
      toast.error(error.response?.data?.message || "ไม่สามารถอัพเดทโปรไฟล์ได้");
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "pending":
        return <Badge status="warning" text="รอการอนุมัติ" />;
      case "approved":
        return <Badge status="success" text="อนุมัติ" />;
      case "rejected":
        return <Badge status="error" text="ปฏิเสธ" />;
      default:
        return <Badge status="default" text={status} />;
    }
  };

  const getStatusTag = (status) => {
    switch (status) {
      case "pending":
        return <Tag icon={<ClockCircleOutlined />} color="warning">รอการอนุมัติ</Tag>;
      case "approved":
        return <Tag icon={<CheckCircleOutlined />} color="success">อนุมัติ</Tag>;
      case "rejected":
        return <Tag icon={<CloseCircleOutlined />} color="error">ปฏิเสธ</Tag>;
      default:
        return <Tag>{status}</Tag>;
    }
  };

  const columns = [
    {
      title: "แบบฟอร์ม",
      dataIndex: ["form", "title"],
      key: "form_title",
      render: (text, record) => (
        <Space direction="vertical" size={0}>
          <Text strong>{text || "แบบฟอร์ม"}</Text>
          <Text type="secondary" style={{ fontSize: 12 }}>
            {record.form?.uuid ? `ID: ${record.form.uuid.substring(0, 8)}...` : ""}
          </Text>
        </Space>
      ),
    },
    {
      title: "สถานะ",
      dataIndex: "status",
      key: "status",
      render: (status) => getStatusTag(status),
    },
    {
      title: "เหตุผล",
      dataIndex: "reason",
      key: "reason",
      ellipsis: true,
      render: (text) => text || "-",
    },
    {
      title: "วันที่ขอ",
      dataIndex: "created_at",
      key: "created_at",
      render: (date) => date ? new Date(date).toLocaleString("th-TH") : "-",
    },
    {
      title: "วันที่อัพเดท",
      dataIndex: "updated_at",
      key: "updated_at",
      render: (date) => date ? new Date(date).toLocaleString("th-TH") : "-",
    },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 border-4 border-blue-500 rounded-full border-t-transparent animate-spin"></div>
          <p className="text-lg text-gray-600">กำลังโหลด...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Top Navigation */}
      <nav className="bg-white border-b shadow-sm">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <HomeOutlined className="mr-3 text-2xl text-blue-600" />
              <Title level={4} className="mb-0">Dashboard</Title>
            </div>
            <div className="flex items-center gap-4">
              {user?.is_internal && (
                <Link to="/admin/forms">
                  <Button type="default" icon={<SettingOutlined />}>
                    จัดการแบบฟอร์ม
                  </Button>
                </Link>
              )}
              <Space>
                <Avatar
                  size={40}
                  src={user?.avatar}
                  style={{ backgroundColor: "#1890ff" }}
                >
                  {user?.name?.charAt(0)?.toUpperCase()}
                </Avatar>
                <Text>{user?.name}</Text>
              </Space>
              <Button
                type="primary"
                danger
                icon={<LogoutOutlined />}
                onClick={handleLogout}
              >
                Logout
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="px-4 py-8 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <Row gutter={[16, 16]}>
            {/* Internal User - Form Management Card */}
            {user?.is_internal && (
              <Col xs={24}>
                <Card className="bg-gradient-to-r from-blue-500 to-blue-600">
                  <div className="flex items-center justify-between">
                    <div>
                      <Title level={4} className="mb-1 text-white">จัดการแบบฟอร์ม</Title>
                      <Text className="text-blue-100">สร้างและจัดการแบบฟอร์มสำหรับผู้ใช้ภายใน</Text>
                    </div>
                    <Space>
                      <Link to="/admin/forms/new">
                        <Button type="primary" ghost icon={<PlusOutlined />} size="large">
                          สร้างแบบฟอร์ม
                        </Button>
                      </Link>
                      <Link to="/admin/forms">
                        <Button type="default" ghost size="large">
                          จัดการแบบฟอร์ม
                        </Button>
                      </Link>
                    </Space>
                  </div>
                </Card>
              </Col>
            )}

            {/* Profile Card */}
          <Col xs={24} lg={8}>
            <Card>
              <div className="mb-4 text-center">
                <Avatar
                  size={100}
                  src={user?.avatar}
                  style={{ backgroundColor: "#1890ff", marginBottom: 16 }}
                  icon={<UserOutlined />}
                >
                  {user?.name?.charAt(0)?.toUpperCase()}
                </Avatar>
                <Title level={4} className="mb-1">{user?.name}</Title>
                <Text type="secondary">{user?.email}</Text>
                <div className="mt-3">
                  <Tag color={user?.is_internal ? "blue" : "green"}>
                    {user?.is_internal ? "ผู้ใช้ภายใน" : "ผู้ใช้ภายนอก"}
                  </Tag>
                </div>
              </div>

              <Divider />

              <Descriptions column={1} size="small">
                <Descriptions.Item label="เบอร์โทร">
                  {user?.phone || "-"}
                </Descriptions.Item>
                <Descriptions.Item label="หน่วยงาน">
                  {user?.department || "-"}
                </Descriptions.Item>
                <Descriptions.Item label="ตำแหน่ง">
                  {user?.position || "-"}
                </Descriptions.Item>
              </Descriptions>

              <Divider />

              <Button
                type="primary"
                block
                icon={<EditOutlined />}
                onClick={() => setEditModalVisible(true)}
              >
                แก้ไขโปรไฟล์
              </Button>
            </Card>
          </Col>

          {/* Main Content */}
          <Col xs={24} lg={16}>
            {/* Statistics Cards */}
            <Row gutter={[16, 16]} className="mb-6">
              <Col xs={24} sm={8}>
                <Card>
                  <Statistic
                    title="รอการอนุมัติ"
                    value={stats.pending}
                    prefix={<ClockCircleOutlined />}
                    valueStyle={{ color: "#faad14" }}
                  />
                </Card>
              </Col>
              <Col xs={24} sm={8}>
                <Card>
                  <Statistic
                    title="อนุมัติแล้ว"
                    value={stats.approved}
                    prefix={<CheckCircleOutlined />}
                    valueStyle={{ color: "#52c41a" }}
                  />
                </Card>
              </Col>
              <Col xs={24} sm={8}>
                <Card>
                  <Statistic
                    title="ถูกปฏิเสธ"
                    value={stats.rejected}
                    prefix={<CloseCircleOutlined />}
                    valueStyle={{ color: "#ff4d4f" }}
                  />
                </Card>
              </Col>
            </Row>

            {/* Access Requests Table */}
            <Card
              title={
                <Space>
                  <FileTextOutlined />
                  <span>คำขอเข้าถึงแบบฟอร์ม</span>
                </Space>
              }
            >
              <Table
                columns={columns}
                dataSource={accessRequests}
                rowKey="id"
                loading={loading}
                pagination={{
                  pageSize: 10,
                  showSizeChanger: true,
                  showTotal: (total, range) => `${range[0]}-${range[1]} จาก ${total} รายการ`,
                }}
                locale={{
                  emptyText: "ยังไม่มีคำขอเข้าถึงแบบฟอร์ม",
                }}
              />
            </Card>
          </Col>
        </Row>
      </div>

      {/* Edit Profile Modal */}
      <Modal
        title="แก้ไขโปรไฟล์"
        open={editModalVisible}
        onCancel={() => {
          setEditModalVisible(false);
          form.resetFields();
        }}
        footer={null}
        width={600}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleUpdateProfile}
          initialValues={{
            name: user?.name,
            phone: user?.phone,
            department: user?.department,
            position: user?.position,
            bio: user?.bio,
          }}
        >
          <Form.Item
            name="name"
            label="ชื่อ-นามสกุล"
            rules={[{ required: true, message: "กรุณากรอกชื่อ-นามสกุล" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="phone"
            label="เบอร์โทรศัพท์"
            rules={[{ required: true, message: "กรุณากรอกเบอร์โทรศัพท์" }]}
          >
            <Input />
          </Form.Item>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="department"
                label="หน่วยงาน/คณะ"
                rules={[{ required: true, message: "กรุณากรอกหน่วยงาน" }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="position"
                label="ตำแหน่ง"
                rules={[{ required: true, message: "กรุณากรอกตำแหน่ง" }]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item name="bio" label="เกี่ยวกับคุณ">
            <TextArea rows={3} />
          </Form.Item>

          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit">
                บันทึก
              </Button>
              <Button
                onClick={() => {
                  setEditModalVisible(false);
                  form.resetFields();
                }}
              >
                ยกเลิก
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default UserDashboard;
