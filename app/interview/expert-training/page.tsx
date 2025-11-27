'use client';

import React, { useState } from 'react';
import { Layout, Card, Button, Space, Tag, Calendar, TimePicker, Select, Row, Col, Avatar, Rate, Statistic } from 'antd';
import { 
  ArrowLeftOutlined,
  UserOutlined,
  StarFilled,
  ClockCircleOutlined,
  CheckCircleOutlined,
  VideoCameraOutlined
} from '@ant-design/icons';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import { useRouter } from 'next/navigation';
import type { Dayjs } from 'dayjs';

const { Content } = Layout;
const { Option } = Select;

// 专家列表
const experts = [
  {
    id: 1,
    name: '张教授',
    avatar: '',
    title: '资深面试官',
    experience: '15年公务员面试培训经验',
    specialty: ['综合分析', '应变能力', '人际沟通'],
    rating: 4.9,
    students: 1280,
    price: 200,
    available: true
  },
  {
    id: 2,
    name: '王老师',
    avatar: '',
    title: '面试专家',
    experience: '10年事业单位面试培训经验',
    specialty: ['计划组织', '解决问题', '综合分析'],
    rating: 4.8,
    students: 956,
    price: 180,
    available: true
  },
  {
    id: 3,
    name: '李教授',
    avatar: '',
    title: '高级面试官',
    experience: '12年面试培训及评委经验',
    specialty: ['结构化面试', '无领导小组', '应变能力'],
    rating: 5.0,
    students: 1520,
    price: 250,
    available: false
  },
  {
    id: 4,
    name: '刘老师',
    avatar: '',
    title: '面试培训师',
    experience: '8年公务员面试辅导经验',
    specialty: ['语言表达', '逻辑思维', '态度仪表'],
    rating: 4.7,
    students: 768,
    price: 180,
    available: true
  },
];

// 训练课程(包含课程附加费)
const courses = [
  { id: 1, name: '综合分析能力专项', duration: '60分钟', difficulty: '中级', surcharge: 0 },
  { id: 2, name: '计划组织协调能力', duration: '60分钟', difficulty: '中级', surcharge: 0 },
  { id: 3, name: '应变能力提升', duration: '60分钟', difficulty: '高级', surcharge: 30 },
  { id: 4, name: '人际沟通技巧', duration: '60分钟', difficulty: '初级', surcharge: -20 },
  { id: 5, name: '解决实际问题', duration: '60分钟', difficulty: '中级', surcharge: 0 },
  { id: 6, name: '全真模拟面试', duration: '90分钟', difficulty: '高级', surcharge: 50 },
];

export default function ExpertTrainingPage() {
  const router = useRouter();
  const [selectedExpert, setSelectedExpert] = useState<number | null>(null);
  const [selectedCourse, setSelectedCourse] = useState<number | null>(null);
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);
  const [selectedTime, setSelectedTime] = useState<Dayjs | null>(null);

  const handleBooking = () => {
    if (!selectedExpert || !selectedCourse || !selectedDate || !selectedTime) {
      alert('请完成所有选项');
      return;
    }
    alert('预约成功！专家将在预约时间前与您联系。');
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
          <h1 style={{ fontSize: '32px', marginBottom: '8px' }}>结构化专家训练</h1>
          <p style={{ fontSize: '16px', color: '#8c8c8c' }}>
            真人专家1对1指导，深度点评，针对性提升面试能力
          </p>
        </div>

        <Row gutter={24}>
          {/* 左侧 - 专家选择和课程选择 */}
          <Col xs={24} lg={16}>
            {/* 选择专家 */}
            <Card title="选择专家" style={{ marginBottom: '24px' }}>
              <Row gutter={[16, 16]}>
                {experts.map((expert) => (
                  <Col xs={24} sm={12} key={expert.id}>
                    <Card
                      hoverable={expert.available}
                      onClick={() => expert.available && setSelectedExpert(expert.id)}
                      style={{
                        border: selectedExpert === expert.id ? '2px solid #1890ff' : '1px solid #d9d9d9',
                        opacity: expert.available ? 1 : 0.6,
                        cursor: expert.available ? 'pointer' : 'not-allowed'
                      }}
                    >
                      <Space orientation="vertical" style={{ width: '100%' }} size="middle">
                        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                          <Avatar size={64} icon={<UserOutlined />} />
                          <div style={{ flex: 1 }}>
                            <h3 style={{ margin: 0 }}>{expert.name}</h3>
                            <Tag color="blue">{expert.title}</Tag>
                            {!expert.available && <Tag color="red">约满</Tag>}
                          </div>
                        </div>
                        
                        <p style={{ color: '#595959', margin: 0, fontSize: '13px' }}>
                          {expert.experience}
                        </p>
                        
                        <div>
                          <span style={{ fontSize: '12px', color: '#8c8c8c' }}>擅长领域：</span>
                          <Space size="small" wrap>
                            {expert.specialty.map((item, index) => (
                              <Tag key={index} color="processing">{item}</Tag>
                            ))}
                          </Space>
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <Space>
                            <Rate disabled defaultValue={expert.rating} style={{ fontSize: '14px' }} />
                            <span style={{ fontSize: '13px', color: '#8c8c8c' }}>
                              {expert.rating} ({expert.students}人)
                            </span>
                          </Space>
                          <span style={{ fontSize: '18px', fontWeight: 'bold', color: '#ff7a45' }}>
                            ¥{expert.price}/次
                          </span>
                        </div>
                      </Space>
                    </Card>
                  </Col>
                ))}
              </Row>
            </Card>

            {/* 选择课程 */}
            <Card title="选择训练课程">
              <Row gutter={[16, 16]}>
                {courses.map((course) => (
                  <Col xs={24} sm={12} md={8} key={course.id}>
                    <Card
                      size="small"
                      hoverable
                      onClick={() => setSelectedCourse(course.id)}
                      style={{
                        border: selectedCourse === course.id ? '2px solid #1890ff' : '1px solid #d9d9d9',
                        background: selectedCourse === course.id ? '#e6f7ff' : '#fff'
                      }}
                    >
                      <Space orientation="vertical" size="small" style={{ width: '100%' }}>
                        <h4 style={{ margin: 0 }}>{course.name}</h4>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <Space size="small">
                            <ClockCircleOutlined style={{ color: '#8c8c8c' }} />
                            <span style={{ fontSize: '12px', color: '#8c8c8c' }}>{course.duration}</span>
                          </Space>
                          <Tag color={
                            course.difficulty === '初级' ? 'green' : 
                            course.difficulty === '中级' ? 'orange' : 'red'
                          }>
                            {course.difficulty}
                          </Tag>
                        </div>
                        {course.surcharge !== 0 && (
                          <div style={{ fontSize: '12px', color: course.surcharge > 0 ? '#ff7a45' : '#52c41a' }}>
                            {course.surcharge > 0 ? `+¥${course.surcharge}` : `¥${course.surcharge}`} 课程附加费
                          </div>
                        )}
                      </Space>
                    </Card>
                  </Col>
                ))}
              </Row>
            </Card>
          </Col>

          {/* 右侧 - 预约时间和确认 */}
          <Col xs={24} lg={8}>
            {/* 选择日期 */}
            <Card title="选择日期" size="small" style={{ marginBottom: '16px' }}>
              <Calendar
                fullscreen={false}
                onSelect={(date) => setSelectedDate(date)}
              />
            </Card>

            {/* 选择时间 */}
            <Card title="选择时间" size="small" style={{ marginBottom: '16px' }}>
              <Select
                style={{ width: '100%' }}
                placeholder="请选择时间段"
                onChange={(value) => setSelectedTime(value as any)}
                size="large"
              >
                <Option value="09:00">09:00 - 10:30</Option>
                <Option value="10:30">10:30 - 12:00</Option>
                <Option value="14:00">14:00 - 15:30</Option>
                <Option value="15:30">15:30 - 17:00</Option>
                <Option value="19:00">19:00 - 20:30</Option>
                <Option value="20:30">20:30 - 22:00</Option>
              </Select>
            </Card>

            {/* 预约信息汇总 */}
            <Card title="预约信息" size="small" style={{ marginBottom: '16px' }}>
              <Space orientation="vertical" style={{ width: '100%' }} size="middle">
                <div>
                  <div style={{ color: '#8c8c8c', fontSize: '12px', marginBottom: '4px' }}>专家</div>
                  <div style={{ fontWeight: 500 }}>
                    {selectedExpert ? experts.find(e => e.id === selectedExpert)?.name : '未选择'}
                  </div>
                </div>
                <div>
                  <div style={{ color: '#8c8c8c', fontSize: '12px', marginBottom: '4px' }}>课程</div>
                  <div style={{ fontWeight: 500 }}>
                    {selectedCourse ? courses.find(c => c.id === selectedCourse)?.name : '未选择'}
                  </div>
                </div>
                <div>
                  <div style={{ color: '#8c8c8c', fontSize: '12px', marginBottom: '4px' }}>日期</div>
                  <div style={{ fontWeight: 500 }}>
                    {selectedDate ? selectedDate.format('YYYY-MM-DD') : '未选择'}
                  </div>
                </div>
                <div>
                  <div style={{ color: '#8c8c8c', fontSize: '12px', marginBottom: '4px' }}>费用</div>
                  <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#ff7a45' }}>
                    ¥{
                      selectedExpert && selectedCourse
                        ? (experts.find(e => e.id === selectedExpert)?.price || 0) + 
                          (courses.find(c => c.id === selectedCourse)?.surcharge || 0)
                        : selectedExpert
                          ? experts.find(e => e.id === selectedExpert)?.price || 0
                          : 0
                    }
                  </div>
                  {selectedExpert && selectedCourse && courses.find(c => c.id === selectedCourse)?.surcharge !== 0 && (
                    <div style={{ fontSize: '12px', color: '#8c8c8c', marginTop: '4px' }}>
                      专家费用¥{experts.find(e => e.id === selectedExpert)?.price} + 课程附加¥{courses.find(c => c.id === selectedCourse)?.surcharge}
                    </div>
                  )}
                  <div style={{ fontSize: '12px', color: '#52c41a', marginTop: '4px' }}>
                    贡献分可抵扣50元
                  </div>
                </div>
              </Space>
            </Card>

            {/* 确认预约 */}
            <Button 
              type="primary" 
              size="large" 
              block
              onClick={handleBooking}
              disabled={!selectedExpert || !selectedCourse || !selectedDate||!selectedTime}
            >
              确认预约
            </Button>

            {/* 说明 */}
            <Card size="small" style={{ marginTop: '16px', background: '#fffbe6', borderColor: '#ffe58f' }}>
              <Space orientation="vertical" size="small" style={{ width: '100%' }}>
                <div style={{ fontWeight: 500, color: '#faad14' }}>📝 预约说明</div>
                <ul style={{ paddingLeft: '20px', margin: 0, fontSize: '12px', color: '#8c8c8c' }}>
                  <li>预约成功后专家将提前联系您</li>
                  <li>支持线上视频1对1指导</li>
                  <li>可在预约时间前2小时取消</li>
                  <li>训练结束后会有详细点评报告</li>
                </ul>
              </Space>
            </Card>
          </Col>
        </Row>
      </Content>

      <Footer />
    </Layout>
  );
}
