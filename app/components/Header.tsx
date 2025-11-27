'use client';

import React from 'react';
import { Layout, Avatar, Badge, Button, Space, Dropdown } from 'antd';
import type { MenuProps } from 'antd';
import { BellOutlined, UserOutlined, LogoutOutlined, SettingOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/contexts/AuthContext';
import Image from 'next/image';

const { Header: AntHeader } = Layout;

export default function Header() {
  const router = useRouter();
  const { user, isLoggedIn, logout } = useAuth();

  const handleLogout = () => {
    logout();
    router.push('/auth');
  };

  const userMenuItems: MenuProps['items'] = [
    {
      key: 'profile',
      icon: <UserOutlined />,
      label: '个人中心',
      onClick: () => router.push('/profile')
    },
    {
      key: 'settings',
      icon: <SettingOutlined />,
      label: '设置',
      onClick: () => router.push('/settings')
    },
    {
      type: 'divider'
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: '退出登录',
      onClick: handleLogout
    }
  ];

  return (
    <AntHeader 
      style={{ 
        background: '#fff', 
        padding: '0 50px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
        position: 'sticky',
        top: 0,
        zIndex: 100
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '40px' }}>
        <Link href="/" style={{ display: 'flex', alignItems: 'center' }}>
          <img 
            src="/images/Logo.png" 
            alt="无相考试系统" 
            style={{ 
              height: '40px',
              width: 'auto'
            }} 
          />
        </Link>
        
        <nav style={{ display: 'flex', gap: '30px' }}>
          <Link href="/" style={{ fontSize: '16px', color: '#262626' }}>首页</Link>
          <Link href="/interview" style={{ fontSize: '16px', color: '#262626' }}>面试</Link>
          <Link href="/written-test" style={{ fontSize: '16px', color: '#262626' }}>笔试</Link>
          <Link href="/interview/basic-training" style={{ fontSize: '16px', color: '#262626' }}>基础提升</Link>
        </nav>
      </div>

      <Space size="large">
        {isLoggedIn && user ? (
          <>
            <span style={{ color: '#ff7a45', fontWeight: 500 }}>
              贡献分: {user.contributionPoints}
            </span>
            <Badge count={5} size="small">
              <BellOutlined style={{ fontSize: '20px', cursor: 'pointer' }} />
            </Badge>
            <Dropdown menu={{ items: userMenuItems }} placement="bottomRight">
              <Space style={{ cursor: 'pointer' }}>
                <Avatar icon={<UserOutlined />} />
                <span>{user.username}</span>
                {user.role === 'teacher' && (
                  <span style={{ 
                    fontSize: '12px', 
                    padding: '2px 8px', 
                    background: '#1890ff', 
                    color: '#fff', 
                    borderRadius: '4px' 
                  }}>
                    老师
                  </span>
                )}
              </Space>
            </Dropdown>
          </>
        ) : (
          <Space>
            <Button type="link" onClick={() => router.push('/auth')}>登录</Button>
            <Button type="primary" onClick={() => router.push('/auth')}>注册</Button>
          </Space>
        )}
      </Space>
    </AntHeader>
  );
}
