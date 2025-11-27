'use client';

import React, { useState } from 'react';
import { Layout, Card, Row, Col, Tag, Button, Segmented } from 'antd';
import { 
  RobotOutlined, 
  TeamOutlined, 
  ExperimentOutlined,
  TrophyOutlined,
  BookOutlined,
  SoundOutlined,
  FileTextOutlined,
  EditOutlined
} from '@ant-design/icons';
import Header from './components/Header';
import Footer from './components/Footer';
import Sidebar from './components/Sidebar';
import { useRouter } from 'next/navigation';

const { Content, Sider } = Layout;

interface TrainingCard {
  id: string;
  title: string;
  description: string;
  price: string;
  contributionDiscount?: string;
  icon: React.ReactNode;
  type: 'free' | 'paid';
  route: string;
}

const trainingCards: TrainingCard[] = [
  {
    id: '1',
    title: '结构化人机训练',
    description: 'AI数字人面试官，6大能力维度专项训练',
    price: '免费',
    icon: <RobotOutlined style={{ fontSize: '32px', color: '#1890ff' }} />,
    type: 'free',
    route: '/interview/ai-training'
  },
  {
    id: '2',
    title: '结构化专家训练',
    description: '真人专家1对1指导，深度点评',
    price: '200元/周',
    contributionDiscount: '贡献分抵扣2周',
    icon: <TeamOutlined style={{ fontSize: '32px', color: '#52c41a' }} />,
    type: 'paid',
    route: '/interview/expert-training'
  },
  {
    id: '3',
    title: '结构化模拟测试',
    description: '全真模拟环境，专家实时打分',
    price: '200元/周',
    contributionDiscount: '贡献分抵扣2周',
    icon: <ExperimentOutlined style={{ fontSize: '32px', color: '#ff7a45' }} />,
    type: 'paid',
    route: '/interview/mock-test'
  },
  {
    id: '4',
    title: '无领导小组线上测试',
    description: '6人小组讨论，AI辅助+专家点评',
    price: '400元/次',
    contributionDiscount: '贡献分抵扣100元',
    icon: <TeamOutlined style={{ fontSize: '32px', color: '#722ed1' }} />,
    type: 'paid',
    route: '/interview/group-discussion'
  },
  {
    id: '5',
    title: '无领导小组线下测试',
    description: '现场真实环境，专家面对面点评',
    price: '1200元/次',
    contributionDiscount: '贡献分抵扣400元',
    icon: <TrophyOutlined style={{ fontSize: '32px', color: '#eb2f96' }} />,
    type: 'paid',
    route: '/interview/offline-group'
  },
  {
    id: '6',
    title: '基础能力训练',
    description: '听题、记录、思考、语言技巧全面提升',
    price: '200元/周',
    contributionDiscount: '贡献分抵扣2周',
    icon: <SoundOutlined style={{ fontSize: '32px', color: '#13c2c2' }} />,
    type: 'paid',
    route: '/interview/basic-training'
  },
];

// 笔试训练卡片
const writtenTestCards: TrainingCard[] = [
  {
    id: '1',
    title: '行测基础能力测试',
    description: '言语理解、判断推理、数量关系等全面测评',
    price: '免费',
    icon: <FileTextOutlined style={{ fontSize: '32px', color: '#1890ff' }} />,
    type: 'free',
    route: '/written-test/admin'
  },
  {
    id: '2',
    title: '行测分类训练',
    description: '按题型分类专项突破，错题分析',
    price: '50元/周',
    contributionDiscount: '贡献分最多抵扣4周',
    icon: <FileTextOutlined style={{ fontSize: '32px', color: '#52c41a' }} />,
    type: 'paid',
    route: '/written-test/admin'
  },
  {
    id: '3',
    title: '行测限时训练',
    description: '提升答题速度，模拟真实考试',
    price: '50元/周',
    contributionDiscount: '贡献分最多抵扣4周',
    icon: <FileTextOutlined style={{ fontSize: '32px', color: '#faad14' }} />,
    type: 'paid',
    route: '/written-test/admin'
  },
  {
    id: '4',
    title: '申论基础能力测试',
    description: '写作能力全面评估',
    price: '免费',
    icon: <EditOutlined style={{ fontSize: '32px', color: '#722ed1' }} />,
    type: 'free',
    route: '/written-test/essay'
  },
  {
    id: '5',
    title: '申论分类训练',
    description: '归纳概括、综合分析、对策建议专项训练',
    price: '50元/周',
    contributionDiscount: '贡献分最多抵扣4周',
    icon: <EditOutlined style={{ fontSize: '32px', color: '#eb2f96' }} />,
    type: 'paid',
    route: '/written-test/essay'
  },
  {
    id: '6',
    title: '申论模拟测试',
    description: '全真模拟考试，专家批改点评',
    price: '200元/周',
    contributionDiscount: '贡献分最多抵扣2周',
    icon: <EditOutlined style={{ fontSize: '32px', color: '#13c2c2' }} />,
    type: 'paid',
    route: '/written-test/essay'
  },
];

export default function Home() {
  const router = useRouter();
  const [moduleType, setModuleType] = useState<'interview' | 'written'>('interview');

  const currentCards = moduleType === 'interview' ? trainingCards : writtenTestCards;

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header />
      
      <Layout>
        <Sider width={256} style={{ background: '#fff' }}>
          <Sidebar />
        </Sider>
        
        <Layout style={{ padding: '24px' }}>
          <Content>
            {/* Banner区域 */}
            <div style={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              borderRadius: '8px',
              padding: '60px 40px',
              marginBottom: '32px',
              color: '#fff',
              textAlign: 'center'
            }}>
              {/* 【图片占位】Banner背景图 - 建议尺寸: 1200x300px */}
              <h1 style={{ fontSize: '36px', marginBottom: '16px', color: '#fff' }}>
                欢迎来到无相考试训练系统！
              </h1>
              <p style={{ fontSize: '18px', color: '#fff', opacity: 0.9 }}>
                面试·笔试全方位提升，AI辅助+专家点评，助您成功上岸
              </p>
            </div>

            {/* 模块切换 */}
            <div style={{ marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h2 style={{ fontSize: '24px', margin: 0, color: '#262626' }}>
                {moduleType === 'interview' ? '面试训练模块' : '笔试训练模块'}
              </h2>
              <Segmented
                size="large"
                value={moduleType}
                onChange={(value) => setModuleType(value as 'interview' | 'written')}
                options={[
                  {
                    label: '面试',
                    value: 'interview',
                    icon: <TeamOutlined />
                  },
                  {
                    label: '笔试',
                    value: 'written',
                    icon: <FileTextOutlined />
                  }
                ]}
              />
            </div>
            
            <Row gutter={[24, 24]}>
              {currentCards.map((card) => (
                <Col xs={24} sm={12} lg={8} key={card.id}>
                  <Card
                    hoverable
                    style={{ 
                      height: '100%',
                      transition: 'all 0.3s ease',
                    }}
                    styles={{
                      body: { padding: '24px' }
                    }}
                    onClick={() => router.push(card.route)}
                  >
                    <div style={{ marginBottom: '16px' }}>
                      {card.icon}
                    </div>
                    <h3 style={{ fontSize: '18px', marginBottom: '8px', color: '#262626' }}>
                      {card.title}
                    </h3>
                    <p style={{ color: '#8c8c8c', marginBottom: '16px', minHeight: '44px' }}>
                      {card.description}
                    </p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      <Tag color={card.type === 'free' ? 'success' : 'orange'} style={{ width: 'fit-content' }}>
                        {card.price}
                      </Tag>
                      {card.contributionDiscount && (
                        <Tag color="blue" style={{ width: 'fit-content', fontSize: '12px' }}>
                          {card.contributionDiscount}
                        </Tag>
                      )}
                    </div>
                  </Card>
                </Col>
              ))}
            </Row>

            {/* 快速入口 */}
            <div style={{ 
              marginTop: '48px', 
              padding: '24px', 
              background: '#f0f2f5',
              borderRadius: '8px'
            }}>
              <h3 style={{ fontSize: '18px', marginBottom: '16px' }}>快速入口</h3>
              <Row gutter={16}>
                <Col>
                  <Button type="link">常见问题</Button>
                </Col>
                <Col>
                  <Button type="link">联系客服</Button>
                </Col>
                <Col>
                  <Button type="link">反馈建议</Button>
                </Col>
              </Row>
            </div>
          </Content>
        </Layout>
      </Layout>

      <Footer />
    </Layout>
  );
}
