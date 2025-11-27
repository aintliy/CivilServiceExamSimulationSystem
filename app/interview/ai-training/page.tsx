'use client';

import React, { useState, useEffect } from 'react';
import { Layout, Button, Card, Space, Progress, Tag, Modal } from 'antd';
import { 
  ArrowLeftOutlined, 
  AudioOutlined,
  PauseCircleOutlined,
  SoundOutlined,
  ClockCircleOutlined 
} from '@ant-design/icons';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import { useRouter } from 'next/navigation';

const { Content } = Layout;

export default function AITrainingPage() {
  const router = useRouter();
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [remainingTime, setRemainingTime] = useState(510); // 8:30
  const [speechRate, setSpeechRate] = useState(145); // 语速 字/分
  const [volume, setVolume] = useState('正常');
  const [showQuestion, setShowQuestion] = useState(true);

  // 模拟录制计时
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isRecording) {
      timer = setInterval(() => {
        setRecordingTime(prev => prev + 1);
        setRemainingTime(prev => Math.max(0, prev - 1));
        // 模拟语速变化
        setSpeechRate(140 + Math.floor(Math.random() * 20));
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isRecording]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const getSpeechRateColor = () => {
    if (speechRate < 120 || speechRate > 180) return '#ff4d4f';
    return '#52c41a';
  };

  const handleFinish = () => {
    Modal.confirm({
      title: '提交答题',
      content: '确认提交当前答题内容？提交后将进入结果分析页面。',
      okText: '确认提交',
      cancelText: '继续答题',
      onOk: () => {
        router.push('/interview/result');
      }
    });
  };

  return (
    <Layout style={{ minHeight: '100vh', background: '#000' }}>
      <Header />
      
      <Content style={{ padding: 0, background: '#000' }}>
        {/* 顶部控制栏 */}
        <div style={{
          padding: '16px 24px',
          background: 'rgba(0,0,0,0.8)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          position: 'sticky',
          top: 64,
          zIndex: 10
        }}>
          <Space>
            <Button 
              icon={<ArrowLeftOutlined />} 
              onClick={() => router.back()}
              type="text"
              style={{ color: '#fff' }}
            >
              返回
            </Button>
            <span style={{ color: '#fff', fontSize: '16px', fontWeight: 500 }}>
              综合分析能力 - 人机训练
            </span>
          </Space>
          
          <Space size="large">
            <Space>
              <ClockCircleOutlined style={{ color: '#fff' }} />
              <span style={{ color: '#fff', fontSize: '16px' }}>
                剩余时间: <span style={{ color: remainingTime < 60 ? '#ff4d4f' : '#52c41a' }}>
                  {formatTime(remainingTime)}
                </span>
              </span>
            </Space>
          </Space>
        </div>

        {/* AI数字人展示区 */}
        <div style={{
          position: 'relative',
          width: '100%',
          height: 'calc(100vh - 300px)',
          background: '#1a1a1a',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <img 
            src="/images/Digital-Humans-AI-Agent-Interface.png" 
            alt="AI数字人" 
            style={{
              maxWidth: '100%',
              maxHeight: '100%',
              objectFit: 'contain'
            }}
          />

          {/* 问题卡片 */}
          {showQuestion && (
            <Card 
              style={{
                position: 'absolute',
                bottom: 20,
                left: '50%',
                transform: 'translateX(-50%)',
                width: '80%',
                maxWidth: '800px',
                background: 'rgba(255,255,255,0.95)',
                backdropFilter: 'blur(10px)'
              }}
            >
              <Space orientation="vertical" size="middle" style={{ width: '100%' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h3 style={{ margin: 0, fontSize: '18px', color: '#262626' }}>面试题目</h3>
                  <Button 
                    icon={<SoundOutlined />} 
                    type="primary"
                    size="small"
                  >
                    语音播放
                  </Button>
                </div>
                <p style={{ fontSize: '16px', color: '#262626', margin: 0 }}>
                  请分析"乡村振兴与数字乡村建设"的内在联系，并谈谈如何推动数字技术在乡村振兴中的应用。
                </p>
              </Space>
            </Card>
          )}
        </div>

        {/* 底部控制区 */}
        <div style={{
          padding: '24px',
          background: '#fff',
          borderTop: '1px solid #f0f0f0'
        }}>
          <Space orientation="vertical" size="large" style={{ width: '100%' }}>
            {/* 录制控制 */}
            <div style={{ textAlign: 'center' }}>
              <Button
                type="primary"
                danger={isRecording}
                shape="circle"
                size="large"
                icon={isRecording ? <PauseCircleOutlined /> : <AudioOutlined />}
                onClick={() => setIsRecording(!isRecording)}
                style={{
                  width: '80px',
                  height: '80px',
                  fontSize: '32px'
                }}
              />
              <div style={{ marginTop: '8px', fontSize: '14px', color: '#8c8c8c' }}>
                {isRecording ? `录制中 ${formatTime(recordingTime)}` : '点击开始答题'}
              </div>
            </div>

            {/* 声音检测 */}
            <Card size="small" title="语音实时检测">
              <Space orientation="vertical" style={{ width: '100%' }}>
                <div>
                  <span>语速: </span>
                  <Tag color={getSpeechRateColor()}>
                    {speechRate} 字/分
                  </Tag>
                  <span style={{ fontSize: '12px', color: '#8c8c8c', marginLeft: '8px' }}>
                    (正常范围: 120-180字/分)
                  </span>
                </div>
                <div>
                  <span>音量: </span>
                  <Tag color={volume === '正常' ? 'green' : 'red'}>{volume}</Tag>
                </div>
                {isRecording && (
                  <Progress 
                    percent={75} 
                    strokeColor={{
                      '0%': '#108ee9',
                      '100%': '#87d068',
                    }}
                    showInfo={false}
                  />
                )}
              </Space>
            </Card>

            {/* 辅助输入 */}
            <div>
              <textarea
                placeholder="辅助输入补充观点（可选）"
                style={{
                  width: '100%',
                  minHeight: '80px',
                  padding: '12px',
                  border: '1px solid #d9d9d9',
                  borderRadius: '4px',
                  fontSize: '14px',
                  resize: 'vertical'
                }}
              />
            </div>

            {/* 提交按钮 */}
            <div style={{ textAlign: 'center' }}>
              <Space>
                <Button size="large" onClick={() => router.back()}>
                  放弃答题
                </Button>
                <Button 
                  type="primary" 
                  size="large"
                  onClick={handleFinish}
                  disabled={recordingTime === 0}
                >
                  提交答题
                </Button>
              </Space>
            </div>
          </Space>
        </div>
      </Content>

      <Footer />
    </Layout>
  );
}
