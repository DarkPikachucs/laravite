import React, { useState, useEffect } from 'react'
import { Row, Col, Card, Statistic, Progress, Table, Tag } from 'antd'
import {
  ProjectOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  FileTextOutlined
} from '@ant-design/icons'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { dashboardAPI, projectAPI } from '../services/api'

const StrategicDashboard = () => {
  const [loading, setLoading] = useState(true)
  const [summary, setSummary] = useState({})
  const [recentProjects, setRecentProjects] = useState([])

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      setLoading(true)
      const [summaryData, projectsData] = await Promise.all([
        dashboardAPI.getSummary(),
        projectAPI.getAll({ limit: 10 })
      ])

      setSummary(summaryData.data)
      setRecentProjects(projectsData.projects)
    } catch (error) {
      console.error('Error fetching dashboard data:', error)
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

  const projectColumns = [
    {
      title: 'รหัสโครงการ',
      dataIndex: 'project_code',
      key: 'project_code',
    },
    {
      title: 'ชื่อโครงการ',
      dataIndex: 'project_name',
      key: 'project_name',
      ellipsis: true,
    },
    {
      title: 'หน่วยงาน',
      dataIndex: 'department',
      key: 'department',
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
  ]

  return (
    <div>
      <Row gutter={16} style={{ marginBottom: 24 }}>
        <Col span={6}>
          <Card>
            <Statistic
              title="โครงการทั้งหมด"
              value={summary.totalProjects || 0}
              prefix={<ProjectOutlined />}
              valueStyle={{ color: '#3f8600' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="โครงการที่กำลังดำเนินการ"
              value={summary.activeProjects || 0}
              prefix={<ClockCircleOutlined />}
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="โครงการที่เสร็จสิ้น"
              value={summary.completedProjects || 0}
              prefix={<CheckCircleOutlined />}
              valueStyle={{ color: '#52c41a' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="รายงานทั้งหมด"
              value={summary.totalReports || 0}
              prefix={<FileTextOutlined />}
              valueStyle={{ color: '#722ed1' }}
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Card title="โครงการตามหน่วยงาน" style={{ marginBottom: 16 }}>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={summary.projectsByDepartment || []}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="department" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="total" fill="#1890ff" />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </Col>
        <Col span={12}>
          <Card title="โครงการล่าสุด">
            <Table
              dataSource={recentProjects}
              columns={projectColumns}
              loading={loading}
              pagination={false}
              size="small"
              rowKey="id"
            />
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default StrategicDashboard