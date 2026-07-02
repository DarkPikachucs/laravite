import React, { useState } from 'react'
import { NavLink, Link } from "react-router";
import { Layout, Menu } from 'antd'
import { useNavigate, useLocation } from 'react-router'
import {
  DashboardOutlined,
  ProjectOutlined,
  FileTextOutlined,
  BarChartOutlined,
  FormOutlined,
  TableOutlined
} from '@ant-design/icons'

const { Sider } = Layout

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  const menuItems = [
    {
      key: '/strategic',
      icon: <DashboardOutlined />,
      label: 'แดชบอร์ด',
    },
    {
      key: '/str',
      icon: <DashboardOutlined />,
      label: 'แดชบอร์ด',
    },
    {
      key: '/strategic/projects',
      icon: <ProjectOutlined />,
      label: 'โครงการ',
    },
    {
      key: '/strategic/reports',
      icon: <FileTextOutlined />,
      label: 'รายงาน',
    },
    {
      key: '/strategic/analytics',
      icon: <BarChartOutlined />,
      label: 'วิเคราะห์',
    },
    {
      type: 'divider',
    },
    {
      key: '/admin/forms',
      icon: <FormOutlined />,
      label: 'แบบฟอร์ม',
    },
    {
      key: '/admin/registration-settings',
      icon: <TableOutlined />,
      label: 'ตั้งค่าการลงทะเบียน',
    },
  ]

  const handleMenuClick = ({ key }) => {
    navigate(key)
  }

  return (
    <>

      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={setCollapsed}
        theme="dark"
      >
        <div style={{
          height: 32,
          margin: 16,
          background: 'rgba(255, 255, 255, 0.3)',
          borderRadius: 6,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontWeight: 'bold'
        }}>
          {collapsed ? 'SPR' : 'Strategic Project Report'}
        </div>
        <nav className='flex flex-col gap-2 p-4 text-white'>
          {/* NavLink makes it easy to show active states */}
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "active" : ""
            }
          >
            Home
          </NavLink>

          <Link to="/strategic">strategic</Link>
        </nav>
        <Menu
          theme="dark"
          selectedKeys={[location.pathname]}
          mode="inline"
          items={menuItems}
          onClick={handleMenuClick}
        />
      </Sider>
    </>

  )
}

export default Sidebar