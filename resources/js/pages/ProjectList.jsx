import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Table,
  Card,
  Button,
  Input,
  Select,
  Space,
  Tag,
  Progress,
  message,
  Modal,
  Form,
  DatePicker,
  InputNumber
} from 'antd'
import {
  PlusOutlined,
  SearchOutlined,
  EyeOutlined,
  EditOutlined,
  FileAddOutlined
} from '@ant-design/icons'
import { projectAPI } from '../services/api'
import dayjs from 'dayjs'

const { Search } = Input
const { Option } = Select
const { RangePicker } = DatePicker

const ProjectList = () => {
  const navigate = useNavigate()
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(false)
  const [filters, setFilters] = useState({})
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [form] = Form.useForm()

  useEffect(() => {
    fetchProjects()
  }, [filters])

  const fetchProjects = async () => {
    try {
      setLoading(true)
      const response = await projectAPI.getAll(filters)
      setProjects(response.data)
    } catch (error) {
      message.error('ไม่สามารถโหลดข้อมูลโครงการได้')
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = (value) => {
    setFilters({ ...filters, search: value })
  }

  const handleStatusFilter = (status) => {
    setFilters({ ...filters, status })
  }

  const handleCreateProject = async (values) => {
    try {
      const formData = {
        ...values,
        start_date: values.dateRange[0].format('YYYY-MM-DD'),
        end_date: values.dateRange[1].format('YYYY-MM-DD'),
      }
      delete formData.dateRange

      await projectAPI.create(formData)
      message.success('สร้างโครงการเรียบร้อยแล้ว')
      setIsModalVisible(false)
      form.resetFields()
      fetchProjects()
    } catch (error) {
      message.error('ไม่สามารถสร้างโครงการได้')
    }
  }

  const getStatusColor = (status) => {
    const colors = {
      'in_progress': 'processing',
      'completed': 'success',
      'planning': 'default',
      'cancelled': 'error',
      'on_hold': 'warning'
    }
    return colors[status] || 'default'
  }

  const getStatusText = (status) => {
    const texts = {
      'in_progress': 'กำลังดำเนินการ',
      'completed': 'เสร็จสิ้น',
      'planning': 'วางแผน',
      'cancelled': 'ยกเลิก',
      'on_hold': 'พักโครงการ'
    }
    return texts[status] || status
  }

  const columns = [
    {
      title: 'รหัสโครงการ',
      dataIndex: 'project_code',
      key: 'project_code',
      fixed: 'left',
      width: 120,
    },
    {
      title: 'ชื่อโครงการ',
      dataIndex: 'project_name',
      key: 'project_name',
      ellipsis: true,
      width: 250,
    },
    {
      title: 'เป้าหมายยุทธศาสตร์',
      dataIndex: 'strategic_goal',
      key: 'strategic_goal',
      ellipsis: true,
    },
    {
      title: 'หน่วยงาน',
      dataIndex: 'department',
      key: 'department',
    },
    {
      title: 'ผู้จัดการโครงการ',
      dataIndex: 'project_manager',
      key: 'project_manager',
    },
    {
      title: 'งงบประมาณ',
      dataIndex: 'budget',
      key: 'budget',
      render: (budget) => `${budget?.toLocaleString()} บาท`,
    },
    {
      title: 'ความคืบหน้า',
      dataIndex: 'progress_percentage',
      key: 'progress_percentage',
      render: (progress) => (
        <Progress
          percent={progress}
          size="small"
          status={progress === 100 ? 'success' : 'active'}
        />
      ),
    },
    {
      title: 'สถานะ',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Tag color={getStatusColor(status)}>
          {getStatusText(status)}
        </Tag>
      ),
    },
    {
      title: 'การดำเนินการ',
      key: 'actions',
      fixed: 'right',
      width: 150,
      render: (_, record) => (
        <Space>
          <Button
            type="link"
            icon={<EyeOutlined />}
            onClick={() => navigate(`/projects/${record.id}`)}
          >
            ดู
          </Button>
          <Button
            type="link"
            icon={<FileAddOutlined />}
            onClick={() => navigate(`/projects/${record.id}/create-report`)}
          >
            รายงาน
          </Button>
        </Space>
      ),
    },
  ]

  return (
    <div>
      <Card>
        <div style={{ marginBottom: 16 }}>
          <Space style={{ marginBottom: 16 }}>
            <Search
              placeholder="ค้นหาโครงการ..."
              allowClear
              onSearch={handleSearch}
              style={{ width: 300 }}
            />
            <Select
              placeholder="เลือกสถานะ"
              allowClear
              style={{ width: 150 }}
              onChange={handleStatusFilter}
            >
              <Option value="planning">วางแผน</Option>
              <Option value="in_progress">กำลังดำเนินการ</Option>
              <Option value="completed">เสร็จสิ้น</Option>
              <Option value="on_hold">พักโครงการ</Option>
              <Option value="cancelled">ยกเลิก</Option>
            </Select>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => setIsModalVisible(true)}
            >
              เพิ่มโครงการใหม่
            </Button>
          </Space>
        </div>

        <Table
          dataSource={projects}
          columns={columns}
          loading={loading}
          rowKey="id"
          scroll={{ x: 1200 }}
          pagination={{
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total, range) =>
              `${range[0]}-${range[1]} จาก ${total} รายการ`,
          }}
        />
      </Card>

      <Modal
        title="เพิ่มโครงการใหม่"
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
        width={800}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleCreateProject}
        >
          <Form.Item
            name="project_code"
            label="รหัสโครงการ"
            rules={[{ required: true, message: 'กรุณากรอกรหัสโครงการ' }]}
          >
            <Input placeholder="เช่น STR-2024-001" />
          </Form.Item>

          <Form.Item
            name="project_name"
            label="ชื่อโครงการ"
            rules={[{ required: true, message: 'กรุณากรอกชื่อโครงการ' }]}
          >
            <Input.TextArea rows={2} />
          </Form.Item>

          <Form.Item
            name="description"
            label="คำอธิบายโครงการ"
          >
            <Input.TextArea rows={3} />
          </Form.Item>

          <Form.Item
            name="strategic_goal"
            label="เป้าหมายยุทธศาสตร์"
            rules={[{ required: true, message: 'กรุณากรอกเป้าหมายยุทธศาสตร์' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="department"
            label="หน่วยงาน"
            rules={[{ required: true, message: 'กรุณากรอกหน่วยงาน' }]}
          >
            <Select>
              <Option value="สำนักงานปลัดกระทรวง">สำนักงานปลัดกระทรวง</Option>
              <Option value="กองการเจ้าหน้าที่">กองการเจ้าหน้าที่</Option>
              <Option value="กรมการศึกษา">กรมการศึกษา</Option>
              <Option value="กองแผนงาน">กองแผนงาน</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="project_manager"
            label="ผู้จัดการโครงการ"
            rules={[{ required: true, message: 'กรุณากรอกชื่อผู้จัดการโครงการ' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="budget"
            label="งบประมาณ (บาท)"
            rules={[{ required: true, message: 'กรุณากรอกงบประมาณ' }]}
          >
            <InputNumber
              style={{ width: '100%' }}
              formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
            />
          </Form.Item>

          <Form.Item
            name="dateRange"
            label="ช่วงเวลาดำเนินการ"
            rules={[{ required: true, message: 'กรุณาเลือกช่วงเวลาดำเนินการ' }]}
          >
            <RangePicker style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item
            name="status"
            label="สถานะ"
            initialValue="planning"
          >
            <Select>
              <Option value="planning">วางแผน</Option>
              <Option value="in_progress">กำลังดำเนินการ</Option>
            </Select>
          </Form.Item>

          <Form.Item style={{ textAlign: 'right' }}>
            <Space>
              <Button onClick={() => setIsModalVisible(false)}>
                ยกเลิก
              </Button>
              <Button type="primary" htmlType="submit">
                บันทึก
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default ProjectList