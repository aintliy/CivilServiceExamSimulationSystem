'use client';

import React from 'react';
import { Layout, Card, Row, Col, Button, Space, Tag, Statistic } from 'antd';
import { 
  ArrowLeftOutlined,
  ClockCircleOutlined,
  FileTextOutlined,
  TrophyOutlined,
  CheckCircleOutlined,
  ExperimentOutlined,
  ThunderboltOutlined
} from '@ant-design/icons';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import { useRouter } from 'next/navigation';

const { Content } = Layout;

// 行测训练模块
const adminModules = [
  {
    id: 1,
    icon: <ExperimentOutlined style={{ fontSize: '32px', color: '#1890ff' }} />,
    title: '基础能力测试',
    description: '测试行测基础能力水平',
    duration: '60分钟',
    questions: 100,
    price: 0,
    isFree: true,
    route: '/written-test/admin/basic-test'
  },
  {
    id: 2,
    icon: <FileTextOutlined style={{ fontSize: '32px', color: '#52c41a' }} />,
    title: '分类训练',
    description: '按题型分类专项训练',
    duration: '自定义',
    price: 50,
    route: '/written-test/admin/category-training'
  },
  {
    id: 3,
    icon: <ClockCircleOutlined style={{ fontSize: '32px', color: '#faad14' }} />,
    title: '限时训练',
    description: '提升答题速度和准确率',
    duration: '自定义',
    price: 50,
    route: '/written-test/admin/timed-training'
  },
  {
    id: 4,
    icon: <ThunderboltOutlined style={{ fontSize: '32px', color: '#ff7a45' }} />,
    title: '模拟测试',
    description: '全真模拟考试环境',
    duration: '120分钟',
    questions: 130,
    price: 200,
    route: '/written-test/admin/mock-test'
  }
];

export default function AdminTestPage() {
  const router = useRouter();

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header />
      
      <Content style={{ padding: '24px 50px', maxWidth: '1400px', margin: '0 auto' }}>
        <Button 
          icon={<ArrowLeftOutlined />}
          onClick={() => router.back()}
          style={{ marginBottom: '24px' }}
        >
          返回
        </Button>

        {/* 页面标题 */}
        <div style={{ marginBottom: '32px' }}>
          <h1 style={{ fontSize: '32px', marginBottom: '8px' }}>行政能力测试</h1>
          <p style={{ fontSize: '16px', color: '#8c8c8c' }}>
            系统化训练，全面提升行测能力
          </p>
        </div>

        {/* 学习数据 */}
        <Card style={{ marginBottom: '24px' }}>
          <Row gutter={[32, 16]}>
            <Col xs={12} sm={6}>
              <Statistic 
                title="累计练习" 
                value={0} 
                suffix="题"
                prefix={<FileTextOutlined />}
              />
            </Col>
            <Col xs={12} sm={6}>
              <Statistic 
                title="完成测试" 
                value={0} 
                suffix="次"
                prefix={<CheckCircleOutlined />}
              />
            </Col>
            <Col xs={12} sm={6}>
              <div>
                <div style={{ color: '#8c8c8c', fontSize: '14px', marginBottom: '8px' }}>正确率</div>
                <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#52c41a' }}>
                  0<span style={{ fontSize: '14px', marginLeft: '4px' }}>%</span>
                </div>
              </div>
            </Col>
            <Col xs={12} sm={6}>
              <div>
                <div style={{ color: '#8c8c8c', fontSize: '14px', marginBottom: '8px' }}>能力提升</div>
                <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#1890ff' }}>
                  0<span style={{ fontSize: '14px', marginLeft: '4px' }}>%</span>
                </div>
              </div>
            </Col>
          </Row>
        </Card>

        {/* 训练模块 */}
        <Row gutter={[24, 24]}>
          {adminModules.map((module) => (
            <Col xs={24} sm={12} lg={6} key={module.id}>
              <Card
                hoverable
                onClick={() => router.push(module.route)}
                style={{ height: '100%' }}
              >
                <Space orientation="vertical" size="middle" style={{ width: '100%' }}>
                  <div style={{ textAlign: 'center' }}>
                    {module.icon}
                  </div>
                  
                  <div>
                    <h3 style={{ margin: 0, fontSize: '18px', textAlign: 'center' }}>
                      {module.title}
                    </h3>
                    <p style={{ 
                      color: '#8c8c8c', 
                      margin: '8px 0 0 0', 
                      fontSize: '13px',
                      textAlign: 'center'
                    }}>
                      {module.description}
                    </p>
                  </div>

                  <div>
                    <div style={{ 
                      display: 'flex', 
                      justifyContent: 'space-between',
                      fontSize: '13px',
                      color: '#8c8c8c'
                    }}>
                      <Space size="small">
                        <ClockCircleOutlined />
                        <span>{module.duration}</span>
                      </Space>
                      {module.questions && (
                        <span>{module.questions}题</span>
                      )}
                    </div>
                  </div>

                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center',
                    borderTop: '1px solid #f0f0f0',
                    paddingTop: '16px'
                  }}>
                    {module.isFree ? (
                      <Tag color="success" style={{ fontSize: '16px', padding: '4px 12px' }}>
                        免费
                      </Tag>
                    ) : (
                      <span style={{ fontSize: '20px', fontWeight: 'bold', color: '#ff7a45' }}>
                        ¥{module.price}
                      </span>
                    )}
                    {!module.isFree && (
                      <Tag color="green">贡献分抵扣</Tag>
                    )}
                  </div>
                </Space>
              </Card>
            </Col>
          ))}
        </Row>

        {/* 题型说明 */}
        <Card title="题型分布" style={{ marginTop: '24px' }}>
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={12} md={8}>
              <Card size="small">
                <Statistic title="言语理解与表达" value={40} suffix="题" />
              </Card>
            </Col>
            <Col xs={24} sm={12} md={8}>
              <Card size="small">
                <Statistic title="数量关系" value={15} suffix="题" />
              </Card>
            </Col>
            <Col xs={24} sm={12} md={8}>
              <Card size="small">
                <Statistic title="判断推理" value={40} suffix="题" />
              </Card>
            </Col>
            <Col xs={24} sm={12} md={8}>
              <Card size="small">
                <Statistic title="资料分析" value={20} suffix="题" />
              </Card>
            </Col>
            <Col xs={24} sm={12} md={8}>
              <Card size="small">
                <Statistic title="常识判断" value={15} suffix="题" />
              </Card>
            </Col>
          </Row>
        </Card>
      </Content>

      <Footer />
    </Layout>
  );
}
