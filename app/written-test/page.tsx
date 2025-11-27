'use client';

import React from 'react';
import { Layout, Card, Row, Col, Button, Space, Tag } from 'antd';
import { 
  FileTextOutlined,
  EditOutlined,
  ArrowRightOutlined,
  TrophyOutlined
} from '@ant-design/icons';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import { useRouter } from 'next/navigation';

const { Content } = Layout;

const examTypes = [
  {
    id: 1,
    icon: <FileTextOutlined style={{ fontSize: '48px', color: '#1890ff' }} />,
    title: '行政能力测试',
    description: '言语理解、数量关系、判断推理、资料分析、常识判断',
    features: ['基础测试', '分类训练', '限时训练', '模拟测试'],
    route: '/written-test/admin',
    color: '#1890ff'
  },
  {
    id: 2,
    icon: <EditOutlined style={{ fontSize: '48px', color: '#52c41a' }} />,
    title: '申论',
    description: '归纳概括、综合分析、提出对策、文章写作',
    features: ['基础测试', '分类训练', '限时训练', '限字训练', '模拟测试'],
    route: '/written-test/essay',
    color: '#52c41a'
  }
];

export default function WrittenTestPage() {
  const router = useRouter();

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header />
      
      <Content style={{ padding: '80px 50px', maxWidth: '1200px', margin: '0 auto' }}>
        {/* 页面标题 */}
        <div style={{ textAlign: 'center', marginBottom: '64px' }}>
          <h1 style={{ fontSize: '48px', marginBottom: '16px', fontWeight: 'bold' }}>
            笔试训练
          </h1>
          <p style={{ fontSize: '18px', color: '#8c8c8c' }}>
            公务员考试·事业单位考试·笔试全方位提升
          </p>
        </div>

        {/* 考试类型 */}
        <Row gutter={[48, 48]} style={{ marginBottom: '80px' }}>
          {examTypes.map((type) => (
            <Col xs={24} md={12} key={type.id}>
              <Card
                hoverable
                style={{ 
                  height: '100%',
                  borderRadius: '12px',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.08)'
                }}
                onClick={() => router.push(type.route)}
              >
                <Space orientation="vertical" size="large" style={{ width: '100%' }}>
                  <div style={{ 
                    textAlign: 'center',
                    padding: '24px',
                    background: `${type.color}10`,
                    borderRadius: '8px'
                  }}>
                    {type.icon}
                  </div>

                  <div style={{ textAlign: 'center' }}>
                    <h2 style={{ 
                      fontSize: '28px', 
                      margin: '0 0 16px 0',
                      color: type.color
                    }}>
                      {type.title}
                    </h2>
                    <p style={{ 
                      color: '#8c8c8c', 
                      margin: 0,
                      fontSize: '15px',
                      lineHeight: '1.6'
                    }}>
                      {type.description}
                    </p>
                  </div>

                  <div>
                    <div style={{ 
                      color: '#8c8c8c', 
                      fontSize: '14px', 
                      marginBottom: '12px',
                      fontWeight: 500
                    }}>
                      训练模块:
                    </div>
                    <Space wrap>
                      {type.features.map((feature, index) => (
                        <Tag 
                          key={index} 
                          color={type.color}
                          style={{ fontSize: '14px', padding: '4px 12px' }}
                        >
                          {feature}
                        </Tag>
                      ))}
                    </Space>
                  </div>

                  <Button 
                    type="primary" 
                    size="large" 
                    icon={<ArrowRightOutlined />}
                    block
                    style={{ 
                      height: '48px',
                      fontSize: '16px',
                      background: type.color,
                      borderColor: type.color
                    }}
                  >
                    开始训练
                  </Button>
                </Space>
              </Card>
            </Col>
          ))}
        </Row>

        {/* 特色功能 */}
        <Card 
          title={
            <div style={{ fontSize: '24px', fontWeight: 'bold' }}>
              <TrophyOutlined style={{ marginRight: '12px', color: '#faad14' }} />
              笔试训练特色
            </div>
          }
          style={{ borderRadius: '12px' }}
        >
          <Row gutter={[24, 24]}>
            <Col xs={24} sm={12} md={6}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ 
                  fontSize: '32px', 
                  marginBottom: '12px',
                  color: '#1890ff'
                }}>
                  📚
                </div>
                <h4 style={{ marginBottom: '8px' }}>海量题库</h4>
                <p style={{ color: '#8c8c8c', fontSize: '13px', margin: 0 }}>
                  涵盖国考、省考、事业单位历年真题
                </p>
              </div>
            </Col>
            <Col xs={24} sm={12} md={6}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ 
                  fontSize: '32px', 
                  marginBottom: '12px',
                  color: '#52c41a'
                }}>
                  🤖
                </div>
                <h4 style={{ marginBottom: '8px' }}>AI智能分析</h4>
                <p style={{ color: '#8c8c8c', fontSize: '13px', margin: 0 }}>
                  实时分析答题数据，精准定位薄弱环节
                </p>
              </div>
            </Col>
            <Col xs={24} sm={12} md={6}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ 
                  fontSize: '32px', 
                  marginBottom: '12px',
                  color: '#faad14'
                }}>
                  👨‍🏫
                </div>
                <h4 style={{ marginBottom: '8px' }}>专家辅导</h4>
                <p style={{ color: '#8c8c8c', fontSize: '13px', margin: 0 }}>
                  资深专家线上线下一对一指导
                </p>
              </div>
            </Col>
            <Col xs={24} sm={12} md={6}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ 
                  fontSize: '32px', 
                  marginBottom: '12px',
                  color: '#ff7a45'
                }}>
                  📊
                </div>
                <h4 style={{ marginBottom: '8px' }}>能力追踪</h4>
                <p style={{ color: '#8c8c8c', fontSize: '13px', margin: 0 }}>
                  可视化能力提升曲线，见证成长
                </p>
              </div>
            </Col>
          </Row>
        </Card>
      </Content>

      <Footer />
    </Layout>
  );
}
