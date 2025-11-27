'use client';

import React from 'react';
import { Layout, Card, Row, Col, Button, Space, Tag, Statistic } from 'antd';
import { 
  ArrowLeftOutlined,
  ClockCircleOutlined,
  FileTextOutlined,
  EditOutlined,
  CheckCircleOutlined,
  ExperimentOutlined,
  ThunderboltOutlined,
  FontSizeOutlined
} from '@ant-design/icons';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import { useRouter } from 'next/navigation';

const { Content } = Layout;

// 申论训练模块
const essayModules = [
  {
    id: 1,
    icon: <ExperimentOutlined style={{ fontSize: '32px', color: '#1890ff' }} />,
    title: '基础能力测试',
    description: '测试申论基础写作能力',
    duration: '180分钟',
    price: 0,
    isFree: true,
    route: '/written-test/essay/basic-test'
  },
  {
    id: 2,
    icon: <FileTextOutlined style={{ fontSize: '32px', color: '#52c41a' }} />,
    title: '分类训练',
    description: '按题型分类专项训练',
    duration: '自定义',
    price: 50,
    route: '/written-test/essay/category-training'
  },
  {
    id: 3,
    icon: <ClockCircleOutlined style={{ fontSize: '32px', color: '#faad14' }} />,
    title: '限时训练',
    description: '提升写作速度和质量',
    duration: '自定义',
    price: 50,
    route: '/written-test/essay/timed-training'
  },
  {
    id: 4,
    icon: <FontSizeOutlined style={{ fontSize: '32px', color: '#722ed1' }} />,
    title: '限字训练',
    description: '控制字数，精炼表达',
    duration: '自定义',
    price: 50,
    route: '/written-test/essay/word-limit-training'
  },
  {
    id: 5,
    icon: <ThunderboltOutlined style={{ fontSize: '32px', color: '#ff7a45' }} />,
    title: '模拟测试',
    description: '全真模拟考试环境',
    duration: '180分钟',
    price: 200,
    route: '/written-test/essay/mock-test'
  }
];

// 专家辅导选项
const tutorOptions = [
  {
    id: 1,
    title: '专家线上辅导',
    price: 200,
    discount: 50,
    duration: '60分钟',
    features: ['一对一指导', '实时答疑', '作文批改', '技巧讲解']
  },
  {
    id: 2,
    title: '专家线下辅导',
    price: 500,
    discount: 100,
    duration: '90分钟',
    features: ['面对面指导', '深度剖析', '现场批改', '针对性训练']
  }
];

export default function EssayTestPage() {
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
          <h1 style={{ fontSize: '32px', marginBottom: '8px' }}>申论测试</h1>
          <p style={{ fontSize: '16px', color: '#8c8c8c' }}>
            系统化训练，全面提升申论写作能力
          </p>
        </div>

        {/* 学习数据 */}
        <Card style={{ marginBottom: '24px' }}>
          <Row gutter={[32, 16]}>
            <Col xs={12} sm={6}>
              <Statistic 
                title="累计练习" 
                value={0} 
                suffix="篇"
                prefix={<EditOutlined />}
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
                <div style={{ color: '#8c8c8c', fontSize: '14px', marginBottom: '8px' }}>平均分数</div>
                <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#52c41a' }}>
                  0<span style={{ fontSize: '14px', marginLeft: '4px' }}>分</span>
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
        <Row gutter={[24, 24]} style={{ marginBottom: '24px' }}>
          {essayModules.map((module) => (
            <Col xs={24} sm={12} lg={8} key={module.id}>
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
                      justifyContent: 'center',
                      fontSize: '13px',
                      color: '#8c8c8c'
                    }}>
                      <Space size="small">
                        <ClockCircleOutlined />
                        <span>{module.duration}</span>
                      </Space>
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

        {/* 专家辅导 */}
        <Card title="专家辅导" style={{ marginBottom: '24px' }}>
          <Row gutter={[24, 24]}>
            {tutorOptions.map((option) => (
              <Col xs={24} md={12} key={option.id}>
                <Card size="small" hoverable>
                  <Space orientation="vertical" style={{ width: '100%' }} size="middle">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <h3 style={{ margin: 0 }}>{option.title}</h3>
                      <Tag color="blue">{option.duration}</Tag>
                    </div>
                    
                    <Space wrap>
                      {option.features.map((feature, index) => (
                        <Tag key={index} color="processing">{feature}</Tag>
                      ))}
                    </Space>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <span style={{ fontSize: '24px', fontWeight: 'bold', color: '#ff7a45' }}>
                          ¥{option.price}
                        </span>
                        <span style={{ color: '#8c8c8c', fontSize: '13px', marginLeft: '8px' }}>
                          /次
                        </span>
                      </div>
                      <Tag color="green">贡献分抵扣{option.discount}元</Tag>
                    </div>

                    <Button type="primary" block onClick={() => router.push('/interview/expert-training')}>
                      预约辅导
                    </Button>
                  </Space>
                </Card>
              </Col>
            ))}
          </Row>
        </Card>

        {/* 题型说明 */}
        <Card title="题型分布">
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={12} md={6}>
              <Card size="small">
                <Statistic title="归纳概括" value={1} suffix="题" valueStyle={{ fontSize: '20px' }} />
                <div style={{ color: '#8c8c8c', fontSize: '12px', marginTop: '8px' }}>
                  概括材料主要内容
                </div>
              </Card>
            </Col>
            <Col xs={24} sm={12} md={6}>
              <Card size="small">
                <Statistic title="综合分析" value={1} suffix="题" valueStyle={{ fontSize: '20px' }} />
                <div style={{ color: '#8c8c8c', fontSize: '12px', marginTop: '8px' }}>
                  分析问题原因影响
                </div>
              </Card>
            </Col>
            <Col xs={24} sm={12} md={6}>
              <Card size="small">
                <Statistic title="提出对策" value={1} suffix="题" valueStyle={{ fontSize: '20px' }} />
                <div style={{ color: '#8c8c8c', fontSize: '12px', marginTop: '8px' }}>
                  针对问题提出建议
                </div>
              </Card>
            </Col>
            <Col xs={24} sm={12} md={6}>
              <Card size="small">
                <Statistic title="文章写作" value={1} suffix="题" valueStyle={{ fontSize: '20px' }} />
                <div style={{ color: '#8c8c8c', fontSize: '12px', marginTop: '8px' }}>
                  大作文1000-1200字
                </div>
              </Card>
            </Col>
          </Row>
        </Card>
      </Content>

      <Footer />
    </Layout>
  );
}
