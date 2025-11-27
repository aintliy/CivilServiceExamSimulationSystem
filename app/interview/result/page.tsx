'use client';

import React from 'react';
import { Layout, Card, Button, Space, Tag, Row, Col, Divider } from 'antd';
import { 
  ArrowLeftOutlined,
  ShareAltOutlined,
  SoundOutlined,
  TrophyOutlined,
  RightOutlined
} from '@ant-design/icons';
import { Radar } from '@ant-design/charts';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import { useRouter } from 'next/navigation';

const { Content } = Layout;

// 能力维度数据
const abilityData = [
  { dimension: '逻辑思维', score: 85, average: 75 },
  { dimension: '语言表达', score: 78, average: 72 },
  { dimension: '应变能力', score: 82, average: 78 },
  { dimension: '知识储备', score: 70, average: 76 },
  { dimension: '态度仪表', score: 90, average: 80 },
];

// 推荐训练项
const recommendedTraining = [
  {
    id: 1,
    title: '乡村振兴政策案例积累',
    reason: '知识储备维度得分较低，需要加强相关政策和案例学习',
    priority: '优先训练',
    route: '/training/policy-cases'
  },
  {
    id: 2,
    title: '语言流畅度专项训练',
    reason: '检测到多次卡顿和填充词，建议进行语言流畅度训练',
    priority: '推荐训练',
    route: '/training/fluency'
  },
  {
    id: 3,
    title: '综合分析真题练习',
    reason: '继续保持综合分析能力优势，巩固答题框架',
    priority: '巩固提升',
    route: '/training/comprehensive'
  },
];

export default function ResultPage() {
  const router = useRouter();

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header />
      
      <Content style={{ padding: '24px 50px', maxWidth: '1400px', margin: '0 auto' }}>
        {/* 返回和分享 */}
        <div style={{ marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Button 
            icon={<ArrowLeftOutlined />}
            onClick={() => router.back()}
          >
            返回
          </Button>
          <Space>
            <Button icon={<ShareAltOutlined />}>
              分享到微信
            </Button>
            <Button icon={<ShareAltOutlined />}>
              分享到QQ
            </Button>
          </Space>
        </div>

        {/* 总体得分卡片 */}
        <Card style={{ marginBottom: '24px', textAlign: 'center' }}>
          <Space orientation="vertical" size="large" style={{ width: '100%' }}>
            <h1 style={{ fontSize: '28px', margin: 0 }}>
              结构化模拟测试 - 综合得分
            </h1>
            <div>
              <span style={{ fontSize: '72px', fontWeight: 'bold', color: '#1890ff' }}>85</span>
              <span style={{ fontSize: '32px', color: '#8c8c8c' }}> / 100</span>
            </div>
            <Tag color="success" style={{ fontSize: '16px', padding: '8px 16px' }}>
              <TrophyOutlined /> 超过75%的考生
            </Tag>
          </Space>
        </Card>

        <Row gutter={24}>
          {/* 左侧 - 能力雷达图和AI点评 */}
          <Col xs={24} lg={14}>
            {/* 能力雷达图 */}
            <Card title="能力维度分析" style={{ marginBottom: '24px' }}>
              <Radar
                data={abilityData.flatMap(d => [
                  { item: d.dimension, type: '个人得分', score: d.score },
                  { item: d.dimension, type: '平均水平', score: d.average }
                ])}
                xField="item"
                yField="score"
                seriesField="type"
                height={400}
                meta={{
                  score: {
                    alias: '分数',
                    min: 0,
                    max: 100,
                  },
                }}
                xAxis={{
                  line: null,
                  tickLine: null,
                  grid: {
                    line: {
                      style: {
                        lineDash: null,
                      },
                    },
                  },
                }}
                yAxis={{
                  line: null,
                  tickLine: null,
                  grid: {
                    line: {
                      type: 'line',
                      style: {
                        lineDash: null,
                      },
                    },
                  },
                }}
                point={{
                  size: 4,
                }}
                area={{
                  style: {
                    fillOpacity: 0.2,
                  },
                }}
                legend={{
                  position: 'top',
                }}
              />

              <Divider />

              {/* 维度得分列表 */}
              <Space orientation="vertical" style={{ width: '100%' }} size="middle">
                {abilityData.map((item, index) => (
                  <div key={index}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                      <span style={{ fontWeight: 500 }}>{item.dimension}</span>
                      <span>
                        <span style={{ color: '#1890ff', fontWeight: 'bold' }}>{item.score}</span>
                        <span style={{ color: '#8c8c8c' }}> / 平均 {item.average}</span>
                      </span>
                    </div>
                    <div style={{ 
                      width: '100%', 
                      height: '8px', 
                      background: '#f0f0f0', 
                      borderRadius: '4px',
                      overflow: 'hidden'
                    }}>
                      <div style={{
                        width: `${item.score}%`,
                        height: '100%',
                        background: item.score > item.average ? '#52c41a' : '#faad14',
                        transition: 'width 0.3s ease'
                      }} />
                    </div>
                  </div>
                ))}
              </Space>
            </Card>

            {/* AI点评 */}
            <Card 
              title={
                <Space>
                  <span>AI 智能点评</span>
                  <Tag color="blue">实时生成</Tag>
                </Space>
              }
              style={{ marginBottom: '24px' }}
            >
              <Space orientation="vertical" size="middle" style={{ width: '100%' }}>
                <div>
                  <h4 style={{ color: '#52c41a' }}>✓ 优点</h4>
                  <ul style={{ paddingLeft: '20px', color: '#595959' }}>
                    <li>答题逻辑清晰，采用总分总结构，层次分明</li>
                    <li>语言表达流畅自然，用词准确，较少出现口头禅</li>
                    <li>对乡村振兴政策有基本认识，能够联系实际</li>
                  </ul>
                </div>
                <Divider style={{ margin: '8px 0' }} />
                <div>
                  <h4 style={{ color: '#faad14' }}>⚠ 改进建议</h4>
                  <ul style={{ paddingLeft: '20px', color: '#595959' }}>
                    <li>缺乏具体案例支撑观点，建议积累乡村振兴相关政策和典型案例</li>
                    <li>对"数字技术"的论述不够深入，可补充大数据、物联网等具体技术应用</li>
                    <li>答题过程中出现3次明显停顿（{'>'} 2秒），需要提升思维连贯性</li>
                  </ul>
                </div>
              </Space>
            </Card>

            {/* 专家点评 */}
            <Card 
              title={
                <Space>
                  <span>专家点评</span>
                  <Tag color="gold">人工审核</Tag>
                </Space>
              }
            >
              <Space orientation="vertical" style={{ width: '100%' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Space>
                    <span style={{ fontWeight: 500 }}>点评专家: 张教授</span>
                    <Tag color="red">资深面试官</Tag>
                  </Space>
                  <Button icon={<SoundOutlined />} type="link">
                    播放语音点评
                  </Button>
                </div>
                <p style={{ color: '#595959', lineHeight: '1.8', margin: '16px 0' }}>
                  该考生答题框架完整，思路清晰，体现了较好的综合分析能力。但在具体论述时，缺少政策依据和案例支撑，显得论证不够充分。
                  建议多关注《数字乡村发展战略纲要》等政策文件，并积累浙江、四川等地的数字乡村建设典型案例。
                  此外，答题语速适中，但需要注意减少不必要的停顿，保持答题的流畅性和自信感。
                </p>
              </Space>
            </Card>
          </Col>

          {/* 右侧 - 推荐训练 */}
          <Col xs={24} lg={10}>
            <Card 
              title="AI 个性化训练推荐" 
              extra={<Tag color="processing">基于能力画像生成</Tag>}
            >
              <Space orientation="vertical" size="large" style={{ width: '100%' }}>
                {recommendedTraining.map((item) => (
                  <Card 
                    key={item.id}
                    size="small"
                    hoverable
                    onClick={() => router.push(item.route)}
                    style={{ cursor: 'pointer' }}
                  >
                    <Space orientation="vertical" style={{ width: '100%' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <h4 style={{ margin: 0 }}>{item.title}</h4>
                        <Tag color={
                          item.priority === '优先训练' ? 'error' : 
                          item.priority === '推荐训练' ? 'warning' : 'default'
                        }>
                          {item.priority}
                        </Tag>
                      </div>
                      <p style={{ color: '#8c8c8c', margin: 0, fontSize: '14px' }}>
                        {item.reason}
                      </p>
                      <Button type="link" style={{ padding: 0 }}>
                        开始训练 <RightOutlined />
                      </Button>
                    </Space>
                  </Card>
                ))}
              </Space>
            </Card>

            {/* 继续训练按钮 */}
            <div style={{ marginTop: '24px' }}>
              <Button 
                type="primary" 
                size="large" 
                block
                style={{ height: '50px', fontSize: '16px' }}
                onClick={() => router.push('/interview/ai-training')}
              >
                继续下一题训练
              </Button>
            </div>

            {/* 贡献分提示 */}
            <Card size="small" style={{ marginTop: '16px', background: '#fff7e6', borderColor: '#ffd591' }}>
              <Space orientation="vertical" style={{ width: '100%' }}>
                <div style={{ fontWeight: 500, color: '#fa8c16' }}>
                  💰 获取贡献分
                </div>
                <div style={{ fontSize: '14px', color: '#8c8c8c' }}>
                  • 分享本次结果可获得 <span style={{ color: '#fa8c16', fontWeight: 'bold' }}>5 贡献分</span>
                </div>
                <div style={{ fontSize: '14px', color: '#8c8c8c' }}>
                  • 月度点赞第1名额外奖励 <span style={{ color: '#fa8c16', fontWeight: 'bold' }}>100 贡献分</span>
                </div>
              </Space>
            </Card>
          </Col>
        </Row>
      </Content>

      <Footer />
    </Layout>
  );
}
