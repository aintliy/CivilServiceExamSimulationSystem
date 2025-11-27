'use client';

import React, { useState } from 'react';
import { Layout, Card, Tabs, Form, Input, Button, Radio, Space, message } from 'antd';
import type { TabsProps } from 'antd';
import { UserOutlined, LockOutlined, PhoneOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';
import { useAuth, UserRole } from '@/app/contexts/AuthContext';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';

const { Content } = Layout;

export default function AuthPage() {
  const router = useRouter();
  const { login, register } = useAuth();
  const [activeTab, setActiveTab] = useState('login');
  const [loginForm] = Form.useForm();
  const [registerForm] = Form.useForm();

  const handleLogin = async (values: any) => {
    const success = await login(values.username, values.password, values.role);
    if (success) {
      message.success('登录成功！');
      router.push('/');
    } else {
      message.error('用户名或密码错误！');
    }
  };

  const handleRegister = async (values: any) => {
    if (values.password !== values.confirmPassword) {
      message.error('两次输入的密码不一致！');
      return;
    }

    const success = await register(values.username, values.password, values.phone, values.role);
    if (success) {
      message.success('注册成功！赠送1000贡献分');
      router.push('/');
    } else {
      message.error('用户名已存在！');
    }
  };

  const tabItems: TabsProps['items'] = [
    {
      key: 'login',
      label: '登录',
      children: (
        <Form
          form={loginForm}
          name="login"
          onFinish={handleLogin}
          autoComplete="off"
          layout="vertical"
        >
          <Form.Item
            label="用户名"
            name="username"
            rules={[{ required: true, message: '请输入用户名！' }]}
          >
            <Input 
              prefix={<UserOutlined />} 
              placeholder="请输入用户名" 
              size="large"
            />
          </Form.Item>

          <Form.Item
            label="密码"
            name="password"
            rules={[{ required: true, message: '请输入密码！' }]}
          >
            <Input.Password 
              prefix={<LockOutlined />} 
              placeholder="请输入密码" 
              size="large"
            />
          </Form.Item>

          <Form.Item
            label="身份"
            name="role"
            initialValue="student"
            rules={[{ required: true }]}
          >
            <Radio.Group size="large">
              <Radio.Button value="student">考生</Radio.Button>
              <Radio.Button value="teacher">老师</Radio.Button>
            </Radio.Group>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" size="large" block>
              登录
            </Button>
          </Form.Item>

          <div style={{ textAlign: 'center' }}>
            <Button type="link" onClick={() => setActiveTab('register')}>
              还没有账号？立即注册
            </Button>
          </div>
        </Form>
      )
    },
    {
      key: 'register',
      label: '注册',
      children: (
        <Form
          form={registerForm}
          name="register"
          onFinish={handleRegister}
          autoComplete="off"
          layout="vertical"
        >
          <Form.Item
            label="用户名"
            name="username"
            rules={[
              { required: true, message: '请输入用户名！' },
              { min: 3, message: '用户名至少3个字符！' },
              { max: 20, message: '用户名最多20个字符！' }
            ]}
          >
            <Input 
              prefix={<UserOutlined />} 
              placeholder="请输入用户名" 
              size="large"
            />
          </Form.Item>

          <Form.Item
            label="手机号"
            name="phone"
            rules={[
              { required: true, message: '请输入手机号！' },
              { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号！' }
            ]}
          >
            <Input 
              prefix={<PhoneOutlined />} 
              placeholder="请输入手机号" 
              size="large"
            />
          </Form.Item>

          <Form.Item
            label="密码"
            name="password"
            rules={[
              { required: true, message: '请输入密码！' },
              { min: 6, message: '密码至少6个字符！' }
            ]}
          >
            <Input.Password 
              prefix={<LockOutlined />} 
              placeholder="请输入密码" 
              size="large"
            />
          </Form.Item>

          <Form.Item
            label="确认密码"
            name="confirmPassword"
            rules={[
              { required: true, message: '请确认密码！' }
            ]}
          >
            <Input.Password 
              prefix={<LockOutlined />} 
              placeholder="请再次输入密码" 
              size="large"
            />
          </Form.Item>

          <Form.Item
            label="身份"
            name="role"
            initialValue="student"
            rules={[{ required: true }]}
          >
            <Radio.Group size="large">
              <Radio.Button value="student">考生</Radio.Button>
              <Radio.Button value="teacher">老师</Radio.Button>
            </Radio.Group>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" size="large" block>
              注册
            </Button>
          </Form.Item>

          <div style={{ textAlign: 'center', color: '#8c8c8c', fontSize: '12px' }}>
            注册即可获得1000贡献分
          </div>

          <div style={{ textAlign: 'center', marginTop: '8px' }}>
            <Button type="link" onClick={() => setActiveTab('login')}>
              已有账号？立即登录
            </Button>
          </div>
        </Form>
      )
    }
  ];

  return (
    <Layout style={{ minHeight: '100vh', background: '#f0f2f5' }}>
      <Header />
      
      <Content style={{ 
        padding: '80px 50px', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center' 
      }}>
        <Card 
          style={{ 
            width: '100%', 
            maxWidth: '500px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
          }}
        >
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <h1 style={{ fontSize: '28px', marginBottom: '8px' }}>欢迎来到考试系统</h1>
            <p style={{ color: '#8c8c8c' }}>面试、笔试全方位训练平台</p>
          </div>

          <Tabs 
            activeKey={activeTab} 
            onChange={setActiveTab} 
            items={tabItems}
            centered
          />
        </Card>
      </Content>

      <Footer />
    </Layout>
  );
}
