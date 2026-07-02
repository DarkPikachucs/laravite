import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {
  Card,
  Row,
  Col,
  Descriptions,
  Progress,
  Tag,
  Button,
  Table,
  Timeline,
  Statistic,
  Space,
  message
} from 'antd'
import {
  ArrowLeftOutlined,
  FileAddOutlined,
  EditOutlined,
  CalendarOutlined
} from '@ant-design/icons'
import { projectAPI } from '../../services/api'
import dayjs from 'dayjs'

const ProjectDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [project, setProject] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchProject()
  }, [id])

  const fetchProject = async () => {
    try {
      setLoading(true)
      const response = await projectAPI.getById(id)
      setProject(response.data)
    } catch (error) {
      message.error('ไม่สามารถโหลดข้อมูลโครงการได้')
    } finally {
      setLoading(false)
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

  const reportColumns = [
    {
      title: 'รอบรายงาน',
      dataIndex: 'report_period',
      key: 'report_period',
    },
    {
      title: 'วันที่รายงาน',
      dataIndex: 'report_date',
      key: 'report_date',
      render: (date) => dayjs(date).format('DD/MM/YYYY'),
    },
    {
      title: 'ความคืบหน้า',
      dataIndex: 'progress_percentage',
      key: 'progress_percentage',
      render: (progress) => `${progress}%`,
    },
    {
      title: 'งบประมาณใช้ไป',
      dataIndex: 'budget_used',
      key: 'budget_used',
      render: (budget) => `${budget?.toLocaleString()} บาท`,
    },
    {
      title: 'สถานะรายงาน',
      dataIndex: 'report_status',
      key: 'report_status',
      render: (status) => {
        const colors = {
          'draft': 'default',
          'submitted': 'processing',
          'approved': 'success'
        }
        const texts = {
          'draft': 'ร่าง',
          'submitted': 'ส่งแล้ว',
          'approved': 'อนุมัติแล้ว'
        }
        return <Tag color={colors[status]}>{texts[status]}</Tag>
      },
    },
    {
      title: 'การดำเนินการ',
      key: 'actions',
      render: (_, record) => (
        <Button
          type="link"
          onClick={() => navigate(`/reports/${record.id}`)}
        >
          ดูรายละเอียด
        </Button>
      ),
    },
  ]

  if (loading || !project) {
    return <div>กำลังโหลด...</div>
  }

  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <Button
          icon={<ArrowLeftOutlined />}
          onClick={() => navigate('/projects')}
        >
          กลับไปรายการโครงการ
        </Button>
      </div>

      <Row gutter={16}>
        <Col span={16}>
          <Card title="ข้อมูลโครงการ" style={{ marginBottom: 16 }}>
            <Descriptions column={2} bordered>
              <Descriptions.Item label="รหัสโครงการ">
                {project.project_code}
              </Descriptions.Item>
              <Descriptions.Item label="สถานะ">
                <Tag color={getStatusColor(project.status)}>
                  {getStatusText(project.status)}
                </Tag>
              </Descriptions.Item>
              <Descriptions.Item label="ชื่อโครงการ" span={2}>
                {project.project_name}
              </Descriptions.Item>
              <Descriptions.Item label="คำอธิบาย" span={2}>
                {project.description}
              </Descriptions.Item>
              <Descriptions.Item label="เป้าหมายยุทธศาสตร์">
                {project.strategic_goal}
              </Descriptions.Item>
              <Descriptions.Item label="หน่วยงาน">
                {project.department}
              </Descriptions.Item>
              <Descriptions.Item label="ผู้จัดการโครงการ">
                {project.project_manager}
              </Descriptions.Item>
              <Descriptions.Item label="งบประมาณ">
                {project.budget?.toLocaleString()} บาท
              </Descriptions.Item>
              <Descriptions.Item label="วันที่เริ่ม">
                {dayjs(project.start_date).format('DD/MM/YYYY')}
              </Descriptions.Item>
              <Descriptions.Item label="วันที่สิ้นสุด">
                {dayjs(project.end_date).format('DD/MM/YYYY')}
              </Descriptions.Item>
            </Descriptions>
          </Card>

          <Card title="ประวัติรายงาน">
            <Table
              dataSource={project.reports || []}
              columns={reportColumns}
              rowKey="id"
              pagination={false}
              locale={{
                emptyText: 'ยังไม่มีรายงาน'
              }}
            />
          </Card>
        </Col>

        <Col span={8}>
          <Card title="ความคืบหน้าโครงการ" style={{ marginBottom: 16 }}>
            <Progress
              type="circle"
              percent={project.progress_percentage}
              format={percent => `${percent}%`}
              size={120}
              style={{ textAlign: 'center', display: 'block' }}
            />
            <div style={{ textAlign: 'center', marginTop: 16 }}>
              <Button
                type="primary"
                icon={<FileAddOutlined />}
                onClick={() => navigate(`/projects/${project.id}/create-report`)}
                block
              >
                สร้างรายงานใหม่
              </Button>
            </div>
          </Card>

          <Card title="สถิติโครงการ">
            <Row gutter={16}>
              <Col span={12}>
                <Statistic
                  title="จำนวนรายงาน"
                  value={project.reports?.length || 0}
                  prefix={<FileAddOutlined />}
                />
              </Col>
              <Col span={12}>
                <Statistic
                  title="วันที่เหลือ"
                  value={dayjs(project.end_date).diff(dayjs(), 'day')}
                  suffix="วัน"
                  prefix={<CalendarOutlined />}
                />
              </Col>
            </Row>
          </Card>

          {project.reports && project.reports.length > 0 && (
            <Card title="ไทม์ไลน์รายงาน">
              <Timeline
                items={project.reports.slice(0, 5).map(report => ({
                  children: (
                    <div>
                      <div style={{ fontWeight: 'bold' }}>
                        {report.report_period}
                      </div>
                      <div style={{ fontSize: '12px', color: '#666' }}>
                        {dayjs(report.report_date).format('DD/MM/YYYY')}
                      </div>
                      <div style={{ fontSize: '12px' }}>
                        ความคืบหน้า: {report.progress_percentage}%
                      </div>
                    </div>
                  ),
                  color: report.report_status === 'approved' ? 'green' : 'blue'
                }))}
              />
            </Card>
          )}
        </Col>
      </Row>
    </div>
  )
}

export default ProjectDetail