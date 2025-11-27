'use client';

import React, { useState } from 'react';
import { Layout, Card, Button, Space, Tag, Tabs, Progress, Row, Col, Statistic, List } from 'antd';
import type { TabsProps } from 'antd';
import { 
  ArrowLeftOutlined,
  SoundOutlined,
  BookOutlined,
  BulbOutlined,
  EditOutlined,
  TrophyOutlined,
  CheckCircleOutlined,
  AudioOutlined
} from '@ant-design/icons';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import { useRouter } from 'next/navigation';

const { Content } = Layout;

// 基础能力训练模块
const trainingModules = [
  {
    id: 1,
    icon: <SoundOutlined style={{ fontSize: '32px', color: '#1890ff' }} />,
    title: '听题能力训练',
    description: '提升题目理解和信息捕捉能力',
    duration: '30分钟/天',
    lessons: 20,
    progress: 0,
    price: 200,
    route: '/training/listening'
  },
  {
    id: 2,
    icon: <EditOutlined style={{ fontSize: '32px', color: '#52c41a' }} />,
    title: '记录习惯训练',
    description: '培养快速记录关键信息的习惯',
    duration: '30分钟/天',
    lessons: 15,
    progress: 0,
    price: 200,
    route: '/training/note-taking'
  },
  {
    id: 3,
    icon: <BulbOutlined style={{ fontSize: '32px', color: '#faad14' }} />,
    title: '思考习惯训练',
    description: '训练结构化思维和逻辑分析',
    duration: '40分钟/天',
    lessons: 25,
    progress: 0,
    price: 200,
    route: '/training/thinking'
  },
  {
    id: 4,
    icon: <AudioOutlined style={{ fontSize: '32px', color: '#ff7a45' }} />,
    title: '语言表达训练',
    description: '提升口语表达和语言组织能力',
    duration: '40分钟/天',
    lessons: 30,
    progress: 0,
    price: 200,
    route: '/training/speaking'
  },
  {
    id: 5,
    icon: <BookOutlined style={{ fontSize: '32px', color: '#722ed1' }} />,
    title: '面试细节训练',
    description: '掌握面试礼仪和细节要求',
    duration: '20分钟/天',
    lessons: 10,
    progress: 0,
    price: 200,
    route: '/training/details'
  },
  {
    id: 6,
    icon: <SoundOutlined style={{ fontSize: '32px', color: '#13c2c2' }} />,
    title: '声音检测训练',
    description: '优化语速、音量和语气控制',
    duration: '30分钟/天',
    lessons: 15,
    progress: 0,
    price: 200,
    route: '/training/voice'
  },
];

// 学习资料
const studyMaterials = [
  { id: 1, title: '面试礼仪规范手册', type: '文档', size: '2.3MB', downloads: 1280 },
  { id: 2, title: '结构化面试答题框架', type: '文档', size: '1.8MB', downloads: 2156 },
  { id: 3, title: '优秀答题示范视频集', type: '视频', size: '156MB', downloads: 3420 },
  { id: 4, title: '面试常见问题100问', type: '文档', size: '3.2MB', downloads: 1890 },
  { id: 5, title: '声音训练指导视频', type: '视频', size: '89MB', downloads: 1560 },
];

// 训练成果
const achievements = [
  { id: 1, name: '初学者', description: '完成第一个训练', icon: '🎖️', unlocked: false },
  { id: 2, name: '坚持者', description: '连续训练7天', icon: '🏆', unlocked: false },
  { id: 3, name: '专注者', description: '完成20个训练课程', icon: '⭐', unlocked: false },
  { id: 4, name: '全能者', description: '完成所有模块', icon: '👑', unlocked: false },
];

export default function BasicTrainingPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('modules');

  const tabItems: TabsProps['items'] = [
    {
      key: 'modules',
      label: '训练模块',
      children: (
        <Row gutter={[24, 24]}>
          {trainingModules.map((module) => (
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
                      justifyContent: 'space-between',
                      marginBottom: '8px',
                      fontSize: '13px',
                      color: '#8c8c8c'
                    }}>
                      <span>{module.duration}</span>
                      <span>{module.lessons}课时</span>
                    </div>
                    <Progress 
                      percent={module.progress} 
                      strokeColor={{
                        '0%': '#108ee9',
                        '100%': '#87d068',
                      }}
                      size="small"
                    />
                  </div>

                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center',
                    borderTop: '1px solid #f0f0f0',
                    paddingTop: '16px'
                  }}>
                    <span style={{ fontSize: '20px', fontWeight: 'bold', color: '#ff7a45' }}>
                      ¥{module.price}
                    </span>
                    <Tag color="green">贡献分抵扣2周</Tag>
                  </div>
                </Space>
              </Card>
            </Col>
          ))}
        </Row>
      )
    },
    {
      key: 'materials',
      label: '学习资料',
      children: (
        <Card>
          <List
            itemLayout="horizontal"
            dataSource={studyMaterials}
            renderItem={(item) => (
              <List.Item
                actions={[
                  <Button type="link" key="download">
                    下载 ({item.downloads})
                  </Button>
                ]}
              >
                <List.Item.Meta
                  avatar={
                    <div style={{ 
                      width: '48px', 
                      height: '48px', 
                      background: '#f0f2f5',
                      borderRadius: '4px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '20px'
                    }}>
                      {item.type === '文档' ? '📄' : '🎬'}
                    </div>
                  }
                  title={item.title}
                  description={
                    <Space>
                      <Tag>{item.type}</Tag>
                      <span style={{ color: '#8c8c8c', fontSize: '12px' }}>
                        {item.size}
                      </span>
                    </Space>
                  }
                />
              </List.Item>
            )}
          />
        </Card>
      )
    },
    {
      key: 'achievements',
      label: '学习成就',
      children: (
        <Row gutter={[16, 16]}>
          {achievements.map((achievement) => (
            <Col xs={24} sm={12} md={6} key={achievement.id}>
              <Card
                style={{
                  textAlign: 'center',
                  opacity: achievement.unlocked ? 1 : 0.5
                }}
              >
                <div style={{ fontSize: '48px', marginBottom: '16px' }}>
                  {achievement.icon}
                </div>
                <h4>{achievement.name}</h4>
                <p style={{ color: '#8c8c8c', fontSize: '13px', margin: 0 }}>
                  {achievement.description}
                </p>
                {achievement.unlocked ? (
                  <Tag color="success" style={{ marginTop: '8px' }}>已解锁</Tag>
                ) : (
                  <Tag style={{ marginTop: '8px' }}>未解锁</Tag>
                )}
              </Card>
            </Col>
          ))}
        </Row>
      )
    }
  ];

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
          <h1 style={{ fontSize: '32px', marginBottom: '8px' }}>基础能力训练</h1>
          <p style={{ fontSize: '16px', color: '#8c8c8c' }}>
            听题、记录、思考、语言技巧全面提升，打好面试基础
          </p>
        </div>

        {/* 学习概况 */}
        <Card style={{ marginBottom: '24px' }}>
          <Row gutter={[32, 16]}>
            <Col xs={12} sm={6}>
              <Statistic 
                title="累计学习" 
                value={0} 
                suffix="小时"
                prefix={<TrophyOutlined />}
              />
            </Col>
            <Col xs={12} sm={6}>
              <Statistic 
                title="完成课程" 
                value={0} 
                suffix="/ 115"
                prefix={<CheckCircleOutlined />}
              />
            </Col>
            <Col xs={12} sm={6}>
              <div>
                <div style={{ color: '#8c8c8c', fontSize: '14px', marginBottom: '8px' }}>连续学习</div>
                <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#52c41a' }}>
                  0<span style={{ fontSize: '14px', marginLeft: '4px' }}>天</span>
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

        {/* 标签页 */}
        <Tabs activeKey={activeTab} onChange={setActiveTab} items={tabItems} />

        {/* 专家辅导 */}
        <Card 
          title="专家线上辅导" 
          style={{ marginTop: '24px' }}
          extra={<Tag color="gold">一对一指导</Tag>}
        >
          <Row gutter={[24, 16]} align="middle">
            <Col xs={24} md={16}>
              <Space orientation="vertical">
                <h3 style={{ margin: 0 }}>需要专家一对一指导？</h3>
                <p style={{ color: '#8c8c8c', margin: 0 }}>
                  资深专家线上实时指导，针对你的薄弱环节进行专项突破。
                  每次辅导60分钟，包含问题诊断、技巧讲解和实战演练。
                </p>
                <Space>
                  <Tag color="blue">线上辅导 ¥200/次</Tag>
                  <Tag color="purple">线下辅导 ¥500/次</Tag>
                  <Tag color="green">贡献分可抵扣</Tag>
                </Space>
              </Space>
            </Col>
            <Col xs={24} md={8} style={{ textAlign: 'right' }}>
              <Button type="primary" size="large" onClick={() => router.push('/interview/expert-training')}>
                预约专家辅导
              </Button>
            </Col>
          </Row>
        </Card>
      </Content>

      <Footer />
    </Layout>
  );
}
