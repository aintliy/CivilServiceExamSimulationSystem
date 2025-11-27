'use client';

import React, { useState } from 'react';
import { Layout, Card, Button, Space, Tag, Steps, Radio, Checkbox, Alert, Row, Col } from 'antd';
import { 
  ArrowLeftOutlined,
  ClockCircleOutlined,
  CheckCircleOutlined,
  PlayCircleOutlined,
  TrophyOutlined
} from '@ant-design/icons';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import { useRouter } from 'next/navigation';

const { Content } = Layout;

// 模拟测试套餐
const testPackages = [
  {
    id: 1,
    name: '基础模拟测试',
    description: '3道结构化面试题，AI打分+基础点评',
    duration: '30分钟',
    questions: 3,
    price: 200,
    features: ['AI实时打分', '答题录像回放', '能力雷达图', '文字点评'],
    type: 'basic'
  },
  {
    id: 2,
    name: '标准模拟测试',
    description: '5道结构化面试题，AI+专家打分点评',
    duration: '50分钟',
    questions: 5,
    price: 400,
    features: ['AI实时打分', '1位专家线上打分', '答题录像回放', '能力雷达图', '专家语音点评', '训练建议'],
    type: 'standard',
    recommended: true
  },
  {
    id: 3,
    name: '高级模拟测试',
    description: '7道结构化面试题,多位专家打分点评',
    duration: '70分钟',
    questions: 7,
    price: 800,
    features: ['AI实时打分', '3位专家打分', '答题录像回放', '能力雷达图', '专家详细点评', '个性化训练方案', '1周跟踪辅导'],
    type: 'premium'
  },
];

// 测试题型配置
const questionTypes = [
  { id: 1, name: '综合分析', checked: true },
  { id: 2, name: '计划组织', checked: true },
  { id: 3, name: '应变能力', checked: true },
  { id: 4, name: '人际沟通', checked: false },
  { id: 5, name: '解决问题', checked: false },
];

export default function MockTestPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedPackage, setSelectedPackage] = useState<number | null>(2);
  const [testMode, setTestMode] = useState<'看题' | '听题'>('看题');
  const [selectedTypes, setSelectedTypes] = useState<number[]>([1, 2, 3]);

  const handleStartTest = () => {
    if (!selectedPackage) {
      alert('请选择测试套餐');
      return;
    }
    router.push('/interview/ai-training');
  };

  const steps = [
    { title: '选择套餐' },
    { title: '配置选项' },
    { title: '确认开始' },
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
          <h1 style={{ fontSize: '32px', marginBottom: '8px' }}>结构化模拟测试</h1>
          <p style={{ fontSize: '16px', color: '#8c8c8c' }}>
            全真模拟环境，专家实时打分，体验真实面试流程
          </p>
        </div>

        {/* 步骤条 */}
        <Card style={{ marginBottom: '24px' }}>
          <Steps current={currentStep} items={steps} />
        </Card>

        {/* 步骤1: 选择套餐 */}
        {currentStep === 0 && (
          <div>
            <Row gutter={24}>
              {testPackages.map((pkg) => (
                <Col xs={24} md={8} key={pkg.id}>
                  <Card
                    hoverable
                    onClick={() => setSelectedPackage(pkg.id)}
                    style={{
                      border: selectedPackage === pkg.id ? '2px solid #1890ff' : '1px solid #d9d9d9',
                      background: selectedPackage === pkg.id ? '#e6f7ff' : '#fff',
                      position: 'relative',
                      height: '100%'
                    }}
                  >
                    {pkg.recommended && (
                      <Tag 
                        color="gold" 
                        style={{ 
                          position: 'absolute', 
                          top: '16px', 
                          right: '16px' 
                        }}
                      >
                        <TrophyOutlined /> 推荐
                      </Tag>
                    )}
                    
                    <Space orientation="vertical" size="middle" style={{ width: '100%' }}>
                      <div>
                        <h2 style={{ margin: 0, fontSize: '20px' }}>{pkg.name}</h2>
                        <p style={{ color: '#8c8c8c', margin: '8px 0 0 0', fontSize: '13px' }}>
                          {pkg.description}
                        </p>
                      </div>

                      <div style={{ display: 'flex', gap: '16px' }}>
                        <Space size="small">
                          <ClockCircleOutlined />
                          <span style={{ fontSize: '13px' }}>{pkg.duration}</span>
                        </Space>
                        <Space size="small">
                          <CheckCircleOutlined />
                          <span style={{ fontSize: '13px' }}>{pkg.questions}道题</span>
                        </Space>
                      </div>

                      <div>
                        <div style={{ fontSize: '12px', color: '#8c8c8c', marginBottom: '8px' }}>
                          包含服务:
                        </div>
                        <ul style={{ 
                          paddingLeft: '20px', 
                          margin: 0,
                          fontSize: '13px',
                          color: '#595959'
                        }}>
                          {pkg.features.map((feature, index) => (
                            <li key={index}>{feature}</li>
                          ))}
                        </ul>
                      </div>

                      <div style={{ 
                        borderTop: '1px solid #f0f0f0', 
                        paddingTop: '16px',
                        marginTop: '8px'
                      }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <div>
                            <span style={{ fontSize: '28px', fontWeight: 'bold', color: '#ff7a45' }}>
                              ¥{pkg.price}
                            </span>
                            <span style={{ fontSize: '13px', color: '#8c8c8c' }}> /次</span>
                          </div>
                          <Tag color="green">贡献分抵扣100元</Tag>
                        </div>
                      </div>
                    </Space>
                  </Card>
                </Col>
              ))}
            </Row>

            <div style={{ textAlign: 'center', marginTop: '32px' }}>
              <Button 
                type="primary" 
                size="large"
                onClick={() => setCurrentStep(1)}
                disabled={!selectedPackage}
              >
                下一步
              </Button>
            </div>
          </div>
        )}

        {/* 步骤2: 配置选项 */}
        {currentStep === 1 && (
          <div>
            <Row gutter={24}>
              <Col xs={24} md={12}>
                <Card title="测试模式" style={{ marginBottom: '24px' }}>
                  <Radio.Group 
                    value={testMode} 
                    onChange={(e) => setTestMode(e.target.value)}
                    style={{ width: '100%' }}
                  >
                    <Space orientation="vertical" style={{ width: '100%' }}>
                      <Radio value="看题">
                        <Space orientation="vertical" size={0}>
                          <span style={{ fontWeight: 500 }}>看题模式</span>
                          <span style={{ fontSize: '12px', color: '#8c8c8c' }}>
                            题目文字展示在屏幕上，适合初学者
                          </span>
                        </Space>
                      </Radio>
                      <Radio value="听题">
                        <Space orientation="vertical" size={0}>
                          <span style={{ fontWeight: 500 }}>听题模式</span>
                          <span style={{ fontSize: '12px', color: '#8c8c8c' }}>
                            AI数字人读题，更接近真实面试场景
                          </span>
                        </Space>
                      </Radio>
                    </Space>
                  </Radio.Group>
                </Card>

                <Card title="题型选择">
                  <Space orientation="vertical" style={{ width: '100%' }}>
                    <div style={{ fontSize: '12px', color: '#8c8c8c', marginBottom: '8px' }}>
                      请至少选择3种题型（系统将随机抽取）
                    </div>
                    <Checkbox.Group
                      value={selectedTypes}
                      onChange={(values) => setSelectedTypes(values as number[])}
                    >
                      <Space orientation="vertical" style={{ width: '100%' }}>
                        {questionTypes.map((type) => (
                          <Checkbox key={type.id} value={type.id}>
                            {type.name}
                          </Checkbox>
                        ))}
                      </Space>
                    </Checkbox.Group>
                  </Space>
                </Card>
              </Col>

              <Col xs={24} md={12}>
                <Card title="测试说明">
                  <Space orientation="vertical" size="middle" style={{ width: '100%' }}>
                    <Alert
                      title="测试流程"
                      description={
                        <ol style={{ paddingLeft: '20px', margin: '8px 0 0 0' }}>
                          <li>进入测试环境，系统开始录像</li>
                          <li>依次作答所有题目</li>
                          <li>AI实时分析答题质量</li>
                          <li>专家异步打分点评（24小时内）</li>
                          <li>查看测试结果和能力分析</li>
                        </ol>
                      }
                      type="info"
                      showIcon
                    />

                    <Alert
                      title="注意事项"
                      description={
                        <ul style={{ paddingLeft: '20px', margin: '8px 0 0 0' }}>
                          <li>请确保网络环境稳定</li>
                          <li>建议使用耳机和外置麦克风</li>
                          <li>测试过程中不可暂停或退出</li>
                          <li>每道题有思考时间和答题时间限制</li>
                        </ul>
                      }
                      type="warning"
                      showIcon
                    />

                    <Card size="small" style={{ background: '#f0f2f5' }}>
                      <h4>当前配置</h4>
                      <Space orientation="vertical" size="small">
                        <div>套餐: <strong>{testPackages.find(p => p.id === selectedPackage)?.name}</strong></div>
                        <div>模式: <strong>{testMode}</strong></div>
                        <div>题型: <strong>{selectedTypes.length}种</strong></div>
                        <div>预计用时: <strong>{testPackages.find(p => p.id === selectedPackage)?.duration}</strong></div>
                      </Space>
                    </Card>
                  </Space>
                </Card>
              </Col>
            </Row>

            <div style={{ textAlign: 'center', marginTop: '32px' }}>
              <Space size="large">
                <Button size="large" onClick={() => setCurrentStep(0)}>
                  上一步
                </Button>
                <Button 
                  type="primary" 
                  size="large"
                  onClick={() => setCurrentStep(2)}
                  disabled={selectedTypes.length < 3}
                >
                  下一步
                </Button>
              </Space>
            </div>
          </div>
        )}

        {/* 步骤3: 确认开始 */}
        {currentStep === 2 && (
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <Card>
              <Space orientation="vertical" size="large" style={{ width: '100%' }}>
                <div style={{ textAlign: 'center' }}>
                  <PlayCircleOutlined style={{ fontSize: '64px', color: '#1890ff' }} />
                  <h2 style={{ marginTop: '16px' }}>准备开始测试</h2>
                </div>

                <Card size="small" style={{ background: '#f0f2f5' }}>
                  <Row gutter={[16, 16]}>
                    <Col span={12}>
                      <div style={{ color: '#8c8c8c', fontSize: '12px' }}>测试套餐</div>
                      <div style={{ fontWeight: 500, marginTop: '4px' }}>
                        {testPackages.find(p => p.id === selectedPackage)?.name}
                      </div>
                    </Col>
                    <Col span={12}>
                      <div style={{ color: '#8c8c8c', fontSize: '12px' }}>测试模式</div>
                      <div style={{ fontWeight: 500, marginTop: '4px' }}>{testMode}</div>
                    </Col>
                    <Col span={12}>
                      <div style={{ color: '#8c8c8c', fontSize: '12px' }}>题目数量</div>
                      <div style={{ fontWeight: 500, marginTop: '4px' }}>
                        {testPackages.find(p => p.id === selectedPackage)?.questions}道
                      </div>
                    </Col>
                    <Col span={12}>
                      <div style={{ color: '#8c8c8c', fontSize: '12px' }}>预计用时</div>
                      <div style={{ fontWeight: 500, marginTop: '4px' }}>
                        {testPackages.find(p => p.id === selectedPackage)?.duration}
                      </div>
                    </Col>
                    <Col span={24}>
                      <div style={{ color: '#8c8c8c', fontSize: '12px' }}>包含题型</div>
                      <Space wrap style={{ marginTop: '4px' }}>
                        {selectedTypes.map(typeId => (
                          <Tag key={typeId} color="blue">
                            {questionTypes.find(t => t.id === typeId)?.name}
                          </Tag>
                        ))}
                      </Space>
                    </Col>
                  </Row>
                </Card>

                <Alert
                  title="重要提醒"
                  description="测试开始后将无法暂停或退出，请确保您已准备就绪。建议在安静的环境中进行测试，并提前调试好设备。"
                  type="warning"
                  showIcon
                />

                <div style={{ textAlign: 'center', marginTop: '24px' }}>
                  <Space size="large">
                    <Button size="large" onClick={() => setCurrentStep(1)}>
                      返回修改
                    </Button>
                    <Button 
                      type="primary" 
                      size="large"
                      icon={<PlayCircleOutlined />}
                      onClick={handleStartTest}
                      style={{ height: '48px', fontSize: '16px', padding: '0 48px' }}
                    >
                      开始测试
                    </Button>
                  </Space>
                </div>
              </Space>
            </Card>
          </div>
        )}
      </Content>

      <Footer />
    </Layout>
  );
}
