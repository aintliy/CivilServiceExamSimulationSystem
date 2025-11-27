'use client';

import React, { useState } from 'react';
import { Layout, Card, Button, Space, Tag, Row, Col, Statistic, Timeline, Avatar, Badge, Alert } from 'antd';
import { 
  ArrowLeftOutlined,
  EnvironmentOutlined,
  ClockCircleOutlined,
  TeamOutlined,
  TrophyOutlined,
  CheckCircleOutlined,
  UserOutlined,
  CalendarOutlined
} from '@ant-design/icons';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import { useRouter } from 'next/navigation';

const { Content } = Layout;

// 线下测试场地
const venues = [
  {
    id: 1,
    name: '广州天河培训中心',
    address: '广州市天河区珠江新城XXX大厦',
    capacity: 12,
    facilities: ['专业面试室', '候考室', '休息区', '停车场'],
    available: true,
    image: '/images/广州天河培训中心.png'
  },
  {
    id: 2,
    name: '广州越秀培训基地',
    address: '广州市越秀区中山路XXX号',
    capacity: 18,
    facilities: ['多功能面试室', '会议室', '茶水间', '地铁直达'],
    available: true,
    image: '/images/广州越秀培训基地.png'
  },
];

// 近期测试安排
const upcomingTests = [
  {
    id: 1,
    date: '2025-12-01',
    time: '09:00-12:00',
    venue: '广州天河培训中心',
    participants: 8,
    maxParticipants: 12,
    experts: ['张教授', '王老师'],
    price: 1200,
    status: 'available'
  },
  {
    id: 2,
    date: '2025-12-01',
    time: '14:00-17:00',
    venue: '广州天河培训中心',
    participants: 12,
    maxParticipants: 12,
    experts: ['李教授', '刘老师'],
    price: 1200,
    status: 'full'
  },
  {
    id: 3,
    date: '2025-12-08',
    time: '09:00-12:00',
    venue: '广州越秀培训基地',
    participants: 5,
    maxParticipants: 18,
    experts: ['张教授', '王老师', '李教授'],
    price: 1200,
    status: 'available'
  },
];

export default function OfflineGroupPage() {
  const router = useRouter();
  const [selectedTest, setSelectedTest] = useState<number | null>(null);

  const handleBooking = () => {
    if (!selectedTest) {
      alert('请选择测试场次');
      return;
    }
    alert('报名成功！我们将在测试前3天通过短信和电话联系您确认。');
  };

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
          <h1 style={{ fontSize: '32px', marginBottom: '8px' }}>无领导小组线下测试</h1>
          <p style={{ fontSize: '16px', color: '#8c8c8c' }}>
            现场真实环境，专家面对面点评，全方位提升小组面试能力
          </p>
        </div>

        {/* 优势介绍 */}
        <Card style={{ marginBottom: '24px', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
          <Row gutter={[32, 16]}>
            <Col xs={24} sm={12} md={6}>
              <div style={{ color: 'rgba(255,255,255,0.8)' }}>真实场景</div>
              <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#fff', marginTop: '8px' }}>
                <EnvironmentOutlined /> 100%
              </div>
            </Col>
            <Col xs={24} sm={12} md={6}>
              <div style={{ color: 'rgba(255,255,255,0.8)' }}>专家现场</div>
              <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#fff', marginTop: '8px' }}>
                <TeamOutlined /> 3+位
              </div>
            </Col>
            <Col xs={24} sm={12} md={6}>
              <div style={{ color: 'rgba(255,255,255,0.8)' }}>测试时长</div>
              <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#fff', marginTop: '8px' }}>
                <ClockCircleOutlined /> 3小时
              </div>
            </Col>
            <Col xs={24} sm={12} md={6}>
              <div style={{ color: 'rgba(255,255,255,0.8)' }}>通过率提升</div>
              <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#fff', marginTop: '8px' }}>
                <TrophyOutlined /> 85%
              </div>
            </Col>
          </Row>
        </Card>

        <Row gutter={24}>
          {/* 左侧 - 近期测试 */}
          <Col xs={24} lg={16}>
            <Card title="近期测试安排" extra={<Tag color="processing">实时更新</Tag>}>
              <Space orientation="vertical" size="large" style={{ width: '100%' }}>
                {upcomingTests.map((test) => (
                  <Card
                    key={test.id}
                    size="small"
                    hoverable={test.status === 'available'}
                    onClick={() => test.status === 'available' && setSelectedTest(test.id)}
                    style={{
                      border: selectedTest === test.id ? '2px solid #1890ff' : '1px solid #d9d9d9',
                      background: selectedTest === test.id ? '#e6f7ff' : 
                                  test.status === 'full' ? '#f5f5f5' : '#fff',
                      cursor: test.status === 'available' ? 'pointer' : 'not-allowed',
                      opacity: test.status === 'full' ? 0.6 : 1
                    }}
                  >
                    <Row gutter={16} align="middle">
                      <Col xs={24} sm={8}>
                        <Space orientation="vertical" size={0}>
                          <div style={{ fontSize: '18px', fontWeight: 'bold' }}>
                            {test.date}
                          </div>
                          <Space size="small">
                            <ClockCircleOutlined />
                            <span style={{ color: '#8c8c8c' }}>{test.time}</span>
                          </Space>
                        </Space>
                      </Col>

                      <Col xs={24} sm={10}>
                        <Space orientation="vertical" size="small" style={{ width: '100%' }}>
                          <Space size="small">
                            <EnvironmentOutlined style={{ color: '#1890ff' }} />
                            <span style={{ fontSize: '13px' }}>{test.venue}</span>
                          </Space>
                          <Space size="small" wrap>
                            {test.experts.map((expert, index) => (
                              <Tag key={index} color="blue" style={{ fontSize: '12px' }}>
                                {expert}
                              </Tag>
                            ))}
                          </Space>
                        </Space>
                      </Col>

                      <Col xs={24} sm={6}>
                        <Space orientation="vertical" size="small" style={{ width: '100%', textAlign: 'right' }}>
                          {test.status === 'full' ? (
                            <Tag color="red">已满员</Tag>
                          ) : (
                            <Badge 
                              count={`剩余${test.maxParticipants - test.participants}名`}
                              style={{ backgroundColor: '#52c41a' }}
                            />
                          )}
                          <div>
                            <span style={{ fontSize: '20px', fontWeight: 'bold', color: '#ff7a45' }}>
                              ¥{test.price}
                            </span>
                          </div>
                          <div style={{ fontSize: '12px', color: '#8c8c8c' }}>
                            {test.participants}/{test.maxParticipants}人
                          </div>
                        </Space>
                      </Col>
                    </Row>
                  </Card>
                ))}
              </Space>
            </Card>

            {/* 测试场地 */}
            <Card title="测试场地" style={{ marginTop: '24px' }}>
              <Row gutter={[16, 16]}>
                {venues.map((venue) => (
                  <Col xs={24} md={12} key={venue.id}>
                    <Card size="small">
                      <img 
                        src={venue.image} 
                        alt={venue.name} 
                        style={{
                          width: '100%',
                          height: '200px',
                          objectFit: 'cover',
                          borderRadius: '4px',
                          marginBottom: '16px'
                        }}
                      />
                      
                      <Space orientation="vertical" size="small" style={{ width: '100%' }}>
                        <h4 style={{ margin: 0 }}>{venue.name}</h4>
                        <Space size="small">
                          <EnvironmentOutlined style={{ color: '#8c8c8c' }} />
                          <span style={{ fontSize: '13px', color: '#8c8c8c' }}>
                            {venue.address}
                          </span>
                        </Space>
                        <div>
                          <span style={{ fontSize: '12px', color: '#8c8c8c' }}>容纳人数: </span>
                          <Tag>{venue.capacity}人</Tag>
                        </div>
                        <Space size="small" wrap>
                          {venue.facilities.map((facility, index) => (
                            <Tag key={index} color="green" style={{ fontSize: '12px' }}>
                              <CheckCircleOutlined /> {facility}
                            </Tag>
                          ))}
                        </Space>
                      </Space>
                    </Card>
                  </Col>
                ))}
              </Row>
            </Card>
          </Col>

          {/* 右侧 - 测试流程和报名 */}
          <Col xs={24} lg={8}>
            {/* 测试流程 */}
            <Card title="测试流程" size="small" style={{ marginBottom: '16px' }}>
              <Timeline
                items={[
                  {
                    icon: <CalendarOutlined style={{ fontSize: '16px' }} />,
                    content: (
                      <div>
                        <div style={{ fontWeight: 500 }}>报名确认</div>
                        <div style={{ fontSize: '12px', color: '#8c8c8c', marginTop: '4px' }}>
                          提前3天短信/电话确认
                        </div>
                      </div>
                    )
                  },
                  {
                    icon: <EnvironmentOutlined style={{ fontSize: '16px' }} />,
                    content: (
                      <div>
                        <div style={{ fontWeight: 500 }}>现场签到</div>
                        <div style={{ fontSize: '12px', color: '#8c8c8c', marginTop: '4px' }}>
                          提前30分钟到场签到候考
                        </div>
                      </div>
                    )
                  },
                  {
                    icon: <TeamOutlined style={{ fontSize: '16px' }} />,
                    content: (
                      <div>
                        <div style={{ fontWeight: 500 }}>规则说明</div>
                        <div style={{ fontSize: '12px', color: '#8c8c8c', marginTop: '4px' }}>
                          专家讲解讨论规则和流程
                        </div>
                      </div>
                    )
                  },
                  {
                    icon: <ClockCircleOutlined style={{ fontSize: '16px' }} />,
                    content: (
                      <div>
                        <div style={{ fontWeight: 500 }}>小组讨论</div>
                        <div style={{ fontSize: '12px', color: '#8c8c8c', marginTop: '4px' }}>
                          6人一组，讨论约60分钟
                        </div>
                      </div>
                    )
                  },
                  {
                    icon: <TrophyOutlined style={{ fontSize: '16px' }} />,
                    color: 'green',
                    content: (
                      <div>
                        <div style={{ fontWeight: 500 }}>专家点评</div>
                        <div style={{ fontSize: '12px', color: '#8c8c8c', marginTop: '4px' }}>
                          现场打分并详细点评
                        </div>
                      </div>
                    )
                  }
                ]}
              />
            </Card>

            {/* 选中信息 */}
            <Card title="报名信息" size="small" style={{ marginBottom: '16px' }}>
              {selectedTest ? (
                <Space orientation="vertical" style={{ width: '100%' }} size="middle">
                  <div>
                    <div style={{ color: '#8c8c8c', fontSize: '12px', marginBottom: '4px' }}>
                      测试时间
                    </div>
                    <div style={{ fontWeight: 500 }}>
                      {upcomingTests.find(t => t.id === selectedTest)?.date} {' '}
                      {upcomingTests.find(t => t.id === selectedTest)?.time}
                    </div>
                  </div>
                  <div>
                    <div style={{ color: '#8c8c8c', fontSize: '12px', marginBottom: '4px' }}>
                      测试地点
                    </div>
                    <div style={{ fontWeight: 500 }}>
                      {upcomingTests.find(t => t.id === selectedTest)?.venue}
                    </div>
                  </div>
                  <div>
                    <div style={{ color: '#8c8c8c', fontSize: '12px', marginBottom: '4px' }}>
                      专家团队
                    </div>
                    <Space wrap>
                      {upcomingTests.find(t => t.id === selectedTest)?.experts.map((expert, index) => (
                        <Tag key={index} color="blue">{expert}</Tag>
                      ))}
                    </Space>
                  </div>
                  <div>
                    <div style={{ color: '#8c8c8c', fontSize: '12px', marginBottom: '4px' }}>
                      测试费用
                    </div>
                    <div>
                      <span style={{ fontSize: '28px', fontWeight: 'bold', color: '#ff7a45' }}>
                        ¥{upcomingTests.find(t => t.id === selectedTest)?.price}
                      </span>
                    </div>
                    <div style={{ fontSize: '12px', color: '#52c41a', marginTop: '4px' }}>
                      贡献分可抵扣400元
                    </div>
                  </div>
                </Space>
              ) : (
                <div style={{ textAlign: 'center', padding: '24px', color: '#8c8c8c' }}>
                  请选择测试场次
                </div>
              )}
            </Card>

            {/* 报名按钮 */}
            <Button 
              type="primary" 
              size="large" 
              block
              onClick={handleBooking}
              disabled={!selectedTest}
            >
              立即报名
            </Button>

            {/* 温馨提示 */}
            <Alert
              title="温馨提示"
              description={
                <ul style={{ paddingLeft: '20px', margin: '8px 0 0 0', fontSize: '12px' }}>
                  <li>请提前30分钟到场</li>
                  <li>着正装参加测试</li>
                  <li>携带身份证件</li>
                  <li>测试前3天可免费取消</li>
                </ul>
              }
              type="info"
              showIcon
              style={{ marginTop: '16px' }}
            />
          </Col>
        </Row>
      </Content>

      <Footer />
    </Layout>
  );
}
