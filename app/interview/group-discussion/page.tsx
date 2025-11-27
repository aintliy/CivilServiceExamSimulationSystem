'use client';

import React, { useState, useEffect } from 'react';
import { Layout, Card, Button, Space, Avatar, Badge, Tag, Progress, Timeline, Modal, Input, Alert } from 'antd';
import { 
  ArrowLeftOutlined,
  AudioOutlined,
  PauseCircleOutlined,
  ClockCircleOutlined,
  UserOutlined,
  MessageOutlined,
  TrophyOutlined
} from '@ant-design/icons';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import { useRouter } from 'next/navigation';

const { Content } = Layout;
const { TextArea } = Input;

// 小组成员
const groupMembers = [
  { id: 1, name: '考生A', avatar: '', status: 'speaking', contributionScore: 85 },
  { id: 2, name: '考生B', avatar: '', status: 'waiting', contributionScore: 72 },
  { id: 3, name: '考生C (我)', avatar: '', status: 'ready', contributionScore: 0, isMe: true },
  { id: 4, name: '考生D', avatar: '', status: 'waiting', contributionScore: 68 },
  { id: 5, name: '考生E', avatar: '', status: 'waiting', contributionScore: 79 },
  { id: 6, name: '考生F', avatar: '', status: 'waiting', contributionScore: 91 },
];

// 讨论阶段
const discussionPhases = [
  { phase: '规则宣读', duration: 120, status: 'completed' },
  { phase: '个人陈述', duration: 300, status: 'completed' },
  { phase: '自由讨论', duration: 1800, status: 'current' },
  { phase: '总结陈词', duration: 300, status: 'pending' },
];

export default function GroupDiscussionPage() {
  const router = useRouter();
  const [currentPhase, setCurrentPhase] = useState(2); // 当前阶段索引
  const [phaseTime, setPhaseTime] = useState(1200); // 当前阶段剩余时间
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [myInput, setMyInput] = useState('');
  const [discussionLog, setDiscussionLog] = useState([
    { id: 1, speaker: '考生A', time: '00:30', content: '我认为这个问题的核心在于...', type: 'statement' },
    { id: 2, speaker: '考生B', time: '01:45', content: '我补充一点，从另一个角度看...', type: 'supplement' },
    { id: 3, speaker: '考生F', time: '03:20', content: '我不太同意刚才的观点，因为...', type: 'oppose' },
  ]);

  // 计时器
  useEffect(() => {
    const timer = setInterval(() => {
      if (phaseTime > 0) {
        setPhaseTime(prev => prev - 1);
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [phaseTime]);

  // 录制计时
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isRecording) {
      timer = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isRecording]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'speaking': return '#52c41a';
      case 'ready': return '#1890ff';
      case 'waiting': return '#d9d9d9';
      default: return '#d9d9d9';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'speaking': return '发言中';
      case 'ready': return '准备发言';
      case 'waiting': return '等待中';
      default: return '';
    }
  };

  const handleSpeak = () => {
    if (!isRecording) {
      setIsRecording(true);
      setRecordingTime(0);
    } else {
      setIsRecording(false);
      Modal.confirm({
        title: '确认发言内容',
        content: '是否提交本次发言？提交后AI将分析您的发言质量。',
        okText: '确认提交',
        cancelText: '继续修改',
        onOk: () => {
          // 添加到讨论日志
          const newLog = {
            id: discussionLog.length + 1,
            speaker: '考生C (我)',
            time: formatTime(1800 - phaseTime),
            content: myInput || '【语音发言内容】',
            type: 'statement'
          };
          setDiscussionLog([...discussionLog, newLog]);
          setMyInput('');
          setRecordingTime(0);
        }
      });
    }
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header />
      
      <Content style={{ padding: '24px 50px', maxWidth: '1600px', margin: '0 auto' }}>
        <Button 
          icon={<ArrowLeftOutlined />}
          onClick={() => router.back()}
          style={{ marginBottom: '24px' }}
        >
          退出讨论
        </Button>

        {/* 讨论主题 */}
        <Card style={{ marginBottom: '24px', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
          <Space orientation="vertical" style={{ width: '100%' }}>
            <Tag color="gold" style={{ width: 'fit-content' }}>
              无领导小组讨论
            </Tag>
            <h2 style={{ color: '#fff', margin: 0 }}>
              讨论主题：如何解决城市交通拥堵问题
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.9)', margin: 0 }}>
              请小组成员围绕城市交通拥堵的成因、影响和解决方案展开讨论，并形成统一意见。
            </p>
          </Space>
        </Card>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr 1fr', gap: '24px' }}>
          {/* 左侧 - 小组成员 */}
          <div>
            <Card title="小组成员" size="small">
              <Space orientation="vertical" style={{ width: '100%' }} size="middle">
                {groupMembers.map((member) => (
                  <Card 
                    key={member.id}
                    size="small"
                    style={{ 
                      background: member.isMe ? '#e6f7ff' : '#fff',
                      borderColor: member.isMe ? '#1890ff' : '#d9d9d9'
                    }}
                  >
                    <Space>
                      <Badge dot color={getStatusColor(member.status)} offset={[-5, 35]}>
                        <Avatar 
                          size={48} 
                          icon={<UserOutlined />}
                          style={{ background: member.isMe ? '#1890ff' : '#999' }}
                        />
                      </Badge>
                      <div>
                        <div style={{ fontWeight: member.isMe ? 'bold' : 'normal' }}>
                          {member.name}
                        </div>
                        <div style={{ fontSize: '12px', color: '#8c8c8c' }}>
                          {getStatusText(member.status)}
                        </div>
                        {member.contributionScore > 0 && (
                          <div style={{ fontSize: '12px', color: '#1890ff' }}>
                            贡献度: {member.contributionScore}
                          </div>
                        )}
                      </div>
                    </Space>
                  </Card>
                ))}
              </Space>
            </Card>

            {/* 讨论阶段 */}
            <Card title="讨论阶段" size="small" style={{ marginTop: '16px' }}>
              <Timeline
                items={discussionPhases.map((phase, index) => ({
                  color: phase.status === 'completed' ? 'green' : 
                         phase.status === 'current' ? 'blue' : 'gray',
                  content: (
                    <div>
                      <div style={{ fontWeight: phase.status === 'current' ? 'bold' : 'normal' }}>
                        {phase.phase}
                      </div>
                      <div style={{ fontSize: '12px', color: '#8c8c8c' }}>
                        {Math.floor(phase.duration / 60)} 分钟
                      </div>
                      {phase.status === 'current' && (
                        <Tag color="processing" style={{ marginTop: '4px' }}>
                          <ClockCircleOutlined /> {formatTime(phaseTime)}
                        </Tag>
                      )}
                    </div>
                  )
                }))}
              />
            </Card>
          </div>

          {/* 中间 - 讨论区域 */}
          <div>
            {/* 【图片占位】视频会议区域 - 2x3网格布局 */}
            <Card 
              title={
                <Space>
                  <span>讨论视频</span>
                  <Tag color="red">● 直播中</Tag>
                </Space>
              }
              style={{ marginBottom: '16px' }}
            >
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '12px',
                marginBottom: '16px'
              }}>
                {groupMembers.map((member) => (
                  <div 
                    key={member.id}
                    style={{
                      aspectRatio: '4/3',
                      background: member.status === 'speaking' ? 
                        'linear-gradient(135deg, #52c41a 0%, #73d13d 100%)' : 
                        '#1a1a1a',
                      borderRadius: '8px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#fff',
                      border: member.status === 'speaking' ? '3px solid #52c41a' : 'none',
                      position: 'relative'
                    }}
                  >
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ fontSize: '12px', marginBottom: '4px' }}>
                        【视频画面】
                      </div>
                      <div style={{ fontSize: '14px', fontWeight: 'bold' }}>
                        {member.name}
                      </div>
                    </div>
                    {member.status === 'speaking' && (
                      <div style={{
                        position: 'absolute',
                        top: '8px',
                        right: '8px',
                        background: 'rgba(0,0,0,0.6)',
                        padding: '4px 8px',
                        borderRadius: '4px',
                        fontSize: '12px'
                      }}>
                        <AudioOutlined /> 发言中
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </Card>

            {/* 我的发言区 */}
            <Card 
              title="我的发言" 
              size="small"
              extra={
                isRecording ? (
                  <Tag color="red">● 录制中 {formatTime(recordingTime)}</Tag>
                ) : (
                  <Tag>点击按钮开始发言</Tag>
                )
              }
            >
              <Space orientation="vertical" style={{ width: '100%' }} size="middle">
                <div style={{ textAlign: 'center' }}>
                  <Button
                    type="primary"
                    danger={isRecording}
                    shape="circle"
                    size="large"
                    icon={isRecording ? <PauseCircleOutlined /> : <AudioOutlined />}
                    onClick={handleSpeak}
                    style={{
                      width: '64px',
                      height: '64px',
                      fontSize: '28px'
                    }}
                  />
                </div>
                <TextArea
                  rows={3}
                  placeholder="辅助记录您的观点（可选）"
                  value={myInput}
                  onChange={(e) => setMyInput(e.target.value)}
                  disabled={!isRecording}
                />
                {isRecording && (
                  <Alert type="info" title="AI正在实时分析您的发言质量和逻辑性..." />
                )}
              </Space>
            </Card>
          </div>

          {/* 右侧 - 讨论日志和AI分析 */}
          <div>
            <Card 
              title={
                <Space>
                  <MessageOutlined />
                  <span>讨论记录</span>
                </Space>
              }
              size="small"
              style={{ marginBottom: '16px' }}
            >
              <div style={{ maxHeight: '400px', overflow: 'auto' }}>
                <Space orientation="vertical" style={{ width: '100%' }} size="small">
                  {discussionLog.map((log) => (
                    <div 
                      key={log.id}
                      style={{
                        padding: '8px',
                        background: log.speaker.includes('我') ? '#e6f7ff' : '#f5f5f5',
                        borderRadius: '4px',
                        borderLeft: log.speaker.includes('我') ? '3px solid #1890ff' : 'none'
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                        <span style={{ fontWeight: 500, fontSize: '13px' }}>
                          {log.speaker}
                        </span>
                        <span style={{ fontSize: '12px', color: '#8c8c8c' }}>
                          {log.time}
                        </span>
                      </div>
                      <div style={{ fontSize: '13px', color: '#595959' }}>
                        {log.content}
                      </div>
                    </div>
                  ))}
                </Space>
              </div>
            </Card>

            {/* AI实时分析 */}
            <Card 
              title={
                <Space>
                  <TrophyOutlined />
                  <span>AI 实时分析</span>
                </Space>
              }
              size="small"
            >
              <Space orientation="vertical" style={{ width: '100%' }} size="middle">
                <div>
                  <div style={{ marginBottom: '4px', fontSize: '13px' }}>发言时长占比</div>
                  <Progress percent={18} strokeColor="#1890ff" />
                  <div style={{ fontSize: '12px', color: '#8c8c8c' }}>
                    建议控制在 15-20% 之间
                  </div>
                </div>
                <div>
                  <div style={{ marginBottom: '4px', fontSize: '13px' }}>观点贡献度</div>
                  <Progress percent={75} strokeColor="#52c41a" />
                  <div style={{ fontSize: '12px', color: '#52c41a' }}>
                    ✓ 提出2个有效观点
                  </div>
                </div>
                <div>
                  <div style={{ marginBottom: '4px', fontSize: '13px' }}>团队协作</div>
                  <Progress percent={60} strokeColor="#faad14" />
                  <div style={{ fontSize: '12px', color: '#faad14' }}>
                    ⚠ 建议多回应他人观点
                  </div>
                </div>
              </Space>
            </Card>

            {/* 结束讨论 */}
            <Button 
              type="primary" 
              block 
              size="large"
              style={{ marginTop: '16px' }}
              onClick={() => {
                Modal.confirm({
                  title: '结束讨论',
                  content: '确认结束讨论并提交？提交后将进入结果分析页面。',
                  okText: '确认结束',
                  cancelText: '继续讨论',
                  onOk: () => {
                    router.push('/interview/result');
                  }
                });
              }}
            >
              结束讨论并提交
            </Button>
          </div>
        </div>
      </Content>

      <Footer />
    </Layout>
  );
}
