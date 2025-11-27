'use client';

import React, { useState } from 'react';
import { Layout, Card, Button, Space, Slider, Input, Tag, Progress, Alert, Row, Col, Avatar, Statistic } from 'antd';
import { 
  ArrowLeftOutlined,
  PlayCircleOutlined,
  PauseCircleOutlined,
  UserOutlined,
  CheckCircleOutlined,
  WarningOutlined
} from '@ant-design/icons';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import { useRouter } from 'next/navigation';

const { Content } = Layout;
const { TextArea } = Input;

// 评分维度
const scoringDimensions = [
  { key: 'logic', name: '逻辑思维', weight: 20, aiScore: 85 },
  { key: 'expression', name: '语言表达', weight: 20, aiScore: 78 },
  { key: 'response', name: '应变能力', weight: 20, aiScore: 82 },
  { key: 'knowledge', name: '知识储备', weight: 20, aiScore: 70 },
  { key: 'attitude', name: '态度仪表', weight: 20, aiScore: 90 },
];

// 其他专家打分进度
const otherExperts = [
  { id: 1, name: '王教授', progress: 100, score: 84 },
  { id: 2, name: '李教授', progress: 100, score: 88 },
  { id: 3, name: '刘教授', progress: 60, score: null },
];

export default function ExpertScoringPage() {
  const router = useRouter();
  const [isPlaying, setIsPlaying] = useState(false);
  const [playProgress, setPlayProgress] = useState(0);
  const [scores, setScores] = useState<Record<string, number>>({
    logic: 0,
    expression: 0,
    response: 0,
    knowledge: 0,
    attitude: 0,
  });
  const [comments, setComments] = useState('');
  const [showDeviation, setShowDeviation] = useState(false);

  // 计算总分
  const calculateTotalScore = () => {
    return scoringDimensions.reduce((total, dim) => {
      return total + (scores[dim.key] || 0) * (dim.weight / 100);
    }, 0);
  };

  // 计算与AI的偏差
  const calculateDeviation = (key: string) => {
    const expertScore = scores[key] || 0;
    const aiScore = scoringDimensions.find(d => d.key === key)?.aiScore || 0;
    const deviation = Math.abs(expertScore - aiScore);
    return deviation;
  };

  // 检查是否有大偏差
  const hasLargeDeviation = () => {
    return scoringDimensions.some(dim => calculateDeviation(dim.key) > 10);
  };

  const handleSubmit = () => {
    if (Object.values(scores).some(s => s === 0)) {
      alert('请完成所有维度的评分');
      return;
    }
    if (hasLargeDeviation()) {
      setShowDeviation(true);
      return;
    }
    alert('评分提交成功！');
    router.back();
  };

  const totalScore = calculateTotalScore();

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header />
      
      <Content style={{ padding: '24px 50px', maxWidth: '1600px', margin: '0 auto' }}>
        <Button 
          icon={<ArrowLeftOutlined />}
          onClick={() => router.back()}
          style={{ marginBottom: '24px' }}
        >
          返回
        </Button>

        <Row gutter={24}>
          {/* 左侧 - 视频播放区 */}
          <Col xs={24} lg={14}>
            <Card title="学员答题视频" style={{ marginBottom: '24px' }}>
              <div style={{
                width: '100%',
                borderRadius: '8px',
                overflow: 'hidden'
              }}>
                <img 
                  src="/images/视频播放器.png" 
                  alt="视频播放器" 
                  style={{
                    width: '100%',
                    height: 'auto',
                    display: 'block'
                  }}
                />
              </div>

              {/* 播放控制 */}
              <div style={{ marginTop: '16px' }}>
                <Space orientation="vertical" style={{ width: '100%' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <Button
                      type="primary"
                      shape="circle"
                      icon={isPlaying ? <PauseCircleOutlined /> : <PlayCircleOutlined />}
                      onClick={() => setIsPlaying(!isPlaying)}
                    />
                    <Slider 
                      style={{ flex: 1 }}
                      value={playProgress}
                      onChange={setPlayProgress}
                      tooltip={{ formatter: (value) => `${Math.floor((value || 0) * 3 / 100)}:${String(Math.floor(((value || 0) * 3) % 60)).padStart(2, '0')}` }}
                    />
                    <span>03:00</span>
                  </div>
                </Space>
              </div>
            </Card>

            {/* 题目和答题文本 */}
            <Card title="题目与答题内容" size="small">
              <Space orientation="vertical" style={{ width: '100%' }} size="middle">
                <div>
                  <Tag color="blue">综合分析能力</Tag>
                  <h4 style={{ marginTop: '8px' }}>
                    请分析"乡村振兴与数字乡村建设"的内在联系，并谈谈如何推动数字技术在乡村振兴中的应用。
                  </h4>
                </div>
                <div style={{ 
                  background: '#f9f9f9', 
                  padding: '16px', 
                  borderRadius: '4px',
                  maxHeight: '300px',
                  overflow: 'auto'
                }}>
                  <p style={{ lineHeight: '1.8', color: '#595959', margin: 0 }}>
                    【学员答题文本（语音转文字）】<br/><br/>
                    各位考官好，关于乡村振兴与数字乡村建设的关系，我认为可以从以下几个方面来分析...(此处为示例文本)
                    乡村振兴是我国的重要战略，而数字技术的发展为乡村振兴提供了新的动力。
                    两者之间存在着紧密的内在联系...
                  </p>
                </div>
              </Space>
            </Card>
          </Col>

          {/* 右侧 - 评分区 */}
          <Col xs={24} lg={10}>
            {/* AI参考分 */}
            <Card 
              title={
                <Space>
                  <span>AI 参考评分</span>
                  <Tag color="processing">仅供参考</Tag>
                </Space>
              }
              size="small"
              style={{ marginBottom: '16px' }}
            >
              <Row gutter={16}>
                <Col span={12}>
                  <Statistic 
                    title="AI综合得分" 
                    value={85} 
                    suffix="/ 100"
                    valueStyle={{ color: '#1890ff' }}
                  />
                </Col>
                <Col span={12}>
                  <Statistic 
                    title="建议关注" 
                    value="知识储备"
                    valueStyle={{ fontSize: '16px', color: '#faad14' }}
                  />
                </Col>
              </Row>
            </Card>

            {/* 专家评分 */}
            <Card title="专家评分" style={{ marginBottom: '16px' }}>
              <Space orientation="vertical" style={{ width: '100%' }} size="large">
                {scoringDimensions.map((dim) => {
                  const deviation = calculateDeviation(dim.key);
                  const hasDeviation = deviation > 10;
                  
                  return (
                    <div key={dim.key}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                        <Space>
                          <span style={{ fontWeight: 500 }}>{dim.name}</span>
                          <Tag>权重 {dim.weight}%</Tag>
                          {hasDeviation && scores[dim.key] > 0 && (
                            <Tag color="warning" icon={<WarningOutlined />}>
                              偏差 {deviation}分
                            </Tag>
                          )}
                        </Space>
                        <Space>
                          <span style={{ color: '#8c8c8c', fontSize: '14px' }}>
                            AI: {dim.aiScore}
                          </span>
                          <span style={{ fontWeight: 'bold', fontSize: '18px', color: '#1890ff' }}>
                            {scores[dim.key] || 0}
                          </span>
                        </Space>
                      </div>
                      <Slider
                        value={scores[dim.key]}
                        onChange={(value) => setScores({ ...scores, [dim.key]: value })}
                        marks={{ 0: '0', 50: '50', 100: '100' }}
                        tooltip={{ formatter: (value) => `${value}分` }}
                      />
                    </div>
                  );
                })}

                {/* 总分显示 */}
                <Card size="small" style={{ background: '#f0f2f5' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '16px', fontWeight: 500 }}>综合得分</span>
                    <span style={{ fontSize: '32px', fontWeight: 'bold', color: '#1890ff' }}>
                      {totalScore.toFixed(1)}
                    </span>
                  </div>
                </Card>
              </Space>
            </Card>

            {/* 偏差提醒 */}
            {showDeviation && (
              <Alert
                title="评分偏差提醒"
                description={`您的评分与AI参考分及其他专家存在较大偏差(>10分)，请确认评分是否准确。如确认无误，可继续提交。`}
                type="warning"
                showIcon
                closable
                onClose={() => setShowDeviation(false)}
                style={{ marginBottom: '16px' }}
              />
            )}

            {/* 其他专家进度 */}
            <Card title="其他专家评分进度" size="small" style={{ marginBottom: '16px' }}>
              <Space orientation="vertical" style={{ width: '100%' }}>
                {otherExperts.map((expert) => (
                  <div key={expert.id}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                      <Space>
                        <Avatar size="small" icon={<UserOutlined />} />
                        <span>{expert.name}</span>
                      </Space>
                      <Space>
                        {expert.progress === 100 && (
                          <>
                            <span style={{ color: '#1890ff', fontWeight: 'bold' }}>
                              {expert.score}分
                            </span>
                            <CheckCircleOutlined style={{ color: '#52c41a' }} />
                          </>
                        )}
                      </Space>
                    </div>
                    <Progress 
                      percent={expert.progress} 
                      size="small"
                      showInfo={false}
                      strokeColor={expert.progress === 100 ? '#52c41a' : '#1890ff'}
                    />
                  </div>
                ))}
              </Space>
            </Card>

            {/* 点评输入 */}
            <Card title="专家点评" size="small" style={{ marginBottom: '16px' }}>
              <TextArea
                rows={6}
                placeholder="请输入详细点评意见，帮助学员提升面试能力..."
                value={comments}
                onChange={(e) => setComments(e.target.value)}
                showCount
                maxLength={500}
              />
            </Card>

            {/* 提交按钮 */}
            <Space style={{ width: '100%' }} orientation="vertical">
              <Button 
                type="primary" 
                size="large" 
                block
                onClick={handleSubmit}
                disabled={Object.values(scores).some(s => s === 0)}
              >
                提交评分
              </Button>
              <Button size="large" block onClick={() => router.back()}>
                暂存草稿
              </Button>
            </Space>
          </Col>
        </Row>
      </Content>

      <Footer />
    </Layout>
  );
}
