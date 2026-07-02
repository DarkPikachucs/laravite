import React from 'react'
import { Layout, Typography, Space, Avatar, Dropdown } from 'antd'
import { UserOutlined, LogoutOutlined, SettingOutlined } from '@ant-design/icons'

const { Header } = Layout
const { Title } = Typography

const AppHeader = () => {
  const userMenuItems = [
    {
      key: 'profile',
      icon: <UserOutlined />,
      label: 'โปรไฟล์',
    },
    {
      key: 'settings',
      icon: <SettingOutlined />,
      label: 'ตั้งค่า',
    },
    {
      type: 'divider',
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: 'ออกจากระบบ',
    },
  ]

  return (
    <Header style={{
      padding: '0 24px',
      background: '#fff',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      boxShadow: '0 1px 4px rgba(0,21,41,.08)'
    }}>
      <Title level={4} style={{ margin: 0 }}>
        ระบบรายงานโครงการยุทธศาสตร์
      </Title>
      <Space>
        <Dropdown menu={{ items: userMenuItems }} placement="bottomRight">
          <Avatar style={{ backgroundColor: '#1890ff', cursor: 'pointer' }}>
            <UserOutlined />
          </Avatar>
        </Dropdown>
      </Space>
    </Header>
  )
}

export default AppHeader