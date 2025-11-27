'use client';

import React from 'react';
import { Layout, Card, Row, Col, Button, Space, Tag } from 'antd';
import { 
  ReadOutlined,
  RobotOutlined,
  VideoCameraOutlined,
  ArrowRightOutlined,
  UserOutlined,
  TeamOutlined,
  ExperimentOutlined
} from '@ant-design/icons';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import { useRouter } from 'next/navigation';

const { Content } = Layout;

const interviewCategories = [
  {
    id: 1,
    category: '基础能力',
    description: '面试基础能力培养,提升听题、记录、表达等核心能力',
    modules: [
      {
        id: 1,
        icon: <ReadOutlined style={{ fontSize: '48px', color: '#1890ff' }} />,
        title: '基础能力训练',
        description: '综合能力、计划组织、应变能力、人际沟通等基础训练',
        features: ['专项训练', '分类练习', '能力评估', '进度追踪'],
        route: '/interview/basic-training',
        color: '#1890ff'
      }
    ]
  },
  {
    id: 2,
    category: '人机练习',
    description: 'AI智能陪练,模拟真实面试场景,提供即时反馈',
    modules: [
      {
        id: 2,
        icon: <RobotOutlined style={{ fontSize: '48px', color: '#52c41a' }} />,
        title: 'AI数字人训练',
        description: '1对1 AI面试官,智能提问与点评,全程录制回放',
        features: ['智能提问', '实时点评', '录制回放', '能力分析'],
        route: '/interview/ai-training',
        color: '#52c41a'
      },
      {
        id: 3,
        icon: <TeamOutlined style={{ fontSize: '48px', color: '#722ed1' }} />,
        title: '小组讨论',
        description: '无领导小组讨论模拟,多人在线协作训练',
        features: ['角色分配', '协作讨论', '观察者视角', '综合评价'],
        route: '/interview/group-discussion',
        color: '#722ed1'
      }
    ]
  },
  {
    id: 3,
    category: '模拟面试',
    description: '真实场景模拟,专家指导,全方位提升面试水平',
    modules: [
      {
        id: 4,
        icon: <VideoCameraOutlined style={{ fontSize: '48px', color: '#fa8c16' }} />,
        title: '模拟测试',
        description: '全真模拟面试流程,含结构化、半结构化等多种形式',
        features: ['全真模拟', '多种题型', '录制回放', '详细报告'],
        route: '/interview/mock-test',
        color: '#fa8c16'
      },
      {
        id: 5,
        icon: <UserOutlined style={{ fontSize: '48px', color: '#eb2f96' }} />,
        title: '专家训练',
        description: '资深面试官1对1指导,深度点评,针对性提升',
        features: ['专家指导', '1对1训练', '深度点评', '个性方案'],
        route: '/interview/expert-training',
        color: '#eb2f96'
      },
      {
        id: 6,
        icon: <ExperimentOutlined style={{ fontSize: '48px', color: '#13c2c2' }} />,
        title: '线下测试',
        description: '线下场地模拟面试,真实考场环境体验',
        features: ['真实场地', '现场模拟', '专家评委', '即时反馈'],
        route: '/interview/offline-group',
        color: '#13c2c2'
      }
    ]
  }
];

export default function InterviewPage() {
  const router = useRouter();

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header />
      
      <Content style={{ padding: '80px 50px', maxWidth: '1200px', margin: '0 auto' }}>
        {/* 页面标题 */}
        <div style={{ textAlign: 'center', marginBottom: '64px' }}>
          <h1 style={{ fontSize: '48px', marginBottom: '16px', fontWeight: 'bold' }}>
            面试训练
          </h1>
          <p style={{ fontSize: '18px', color: '#8c8c8c' }}>
            AI智能陪练 + 专家指导,全方位提升面试能力
          </p>
        </div>

        {/* 训练分类 */}
        {interviewCategories.map((category, index) => (
          <div key={category.id} style={{ marginBottom: index < interviewCategories.length - 1 ? '64px' : 0 }}>
            {/* 分类标题 */}
            <div style={{ marginBottom: '32px' }}>
              <h2 style={{ fontSize: '28px', marginBottom: '8px' }}>
                {category.category}
              </h2>
              <p style={{ fontSize: '16px', color: '#8c8c8c' }}>
                {category.description}
              </p>
            </div>

            {/* 训练模块卡片 */}
            <Row gutter={[24, 24]}>
              {category.modules.map((module) => (
                <Col xs={24} sm={12} lg={8} key={module.id}>
                  <Card
                    hoverable
                    style={{ 
                      height: '100%',
                      borderRadius: '12px',
                      border: `2px solid ${module.color}20`,
                      boxShadow: '0 2px 8px rgba(0,0,0,0.06)'
                    }}
                  >
                    <Space orientation="vertical" size="large" style={{ width: '100%' }}>
                      {/* 图标 */}
                      <div style={{ textAlign: 'center', padding: '24px 0' }}>
                        {module.icon}
                      </div>

                      {/* 标题 */}
                      <div style={{ textAlign: 'center' }}>
                        <h3 style={{ fontSize: '24px', marginBottom: '12px', fontWeight: 600 }}>
                          {module.title}
                        </h3>
                        <p style={{ color: '#8c8c8c', fontSize: '14px', lineHeight: '1.6' }}>
                          {module.description}
                        </p>
                      </div>

                      {/* 特性标签 */}
                      <div style={{ textAlign: 'center' }}>
                        <Space size="small" wrap>
                          {module.features.map((feature, idx) => (
                            <Tag key={idx} color={module.color} style={{ margin: '4px' }}>
                              {feature}
                            </Tag>
                          ))}
                        </Space>
                      </div>

                      {/* 开始训练按钮 */}
                      <Button
                        type="primary"
                        size="large"
                        block
                        icon={<ArrowRightOutlined />}
                        onClick={() => router.push(module.route)}
                        style={{ 
                          height: '48px',
                          fontSize: '16px',
                          backgroundColor: module.color,
                          borderColor: module.color
                        }}
                      >
                        开始训练
                      </Button>
                    </Space>
                  </Card>
                </Col>
              ))}
            </Row>
          </div>
        ))}

        {/* 底部说明 */}
        <Card 
          style={{ 
            marginTop: '64px', 
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            border: 'none',
            color: 'white'
          }}
        >
          <Row gutter={24}>
            <Col xs={24} md={8}>
              <div style={{ textAlign: 'center', padding: '24px 0' }}>
                <div style={{ fontSize: '48px', fontWeight: 'bold', marginBottom: '8px' }}>10+</div>
                <div style={{ fontSize: '16px', opacity: 0.9 }}>训练模块</div>
              </div>
            </Col>
            <Col xs={24} md={8}>
              <div style={{ textAlign: 'center', padding: '24px 0' }}>
                <div style={{ fontSize: '48px', fontWeight: 'bold', marginBottom: '8px' }}>5000+</div>
                <div style={{ fontSize: '16px', opacity: 0.9 }}>训练题库</div>
              </div>
            </Col>
            <Col xs={24} md={8}>
              <div style={{ textAlign: 'center', padding: '24px 0' }}>
                <div style={{ fontSize: '48px', fontWeight: 'bold', marginBottom: '8px' }}>98%</div>
                <div style={{ fontSize: '16px', opacity: 0.9 }}>通过率提升</div>
              </div>
            </Col>
          </Row>
        </Card>
      </Content>

      <Footer />
    </Layout>
  );
}
