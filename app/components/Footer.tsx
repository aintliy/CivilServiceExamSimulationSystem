'use client';

import React from 'react';
import { Layout, Space } from 'antd';
import Link from 'next/link';

const { Footer: AntFooter } = Layout;

export default function Footer() {
  return (
    <AntFooter 
      style={{ 
        textAlign: 'center', 
        background: '#f0f2f5',
        padding: '24px 50px'
      }}
    >
      <Space size="large" style={{ marginBottom: '16px' }}>
        <Link href="/feedback" style={{ color: '#595959' }}>意见建议</Link>
        <Link href="/problem-feedback" style={{ color: '#595959' }}>问题反馈</Link>
        <span style={{ color: '#595959' }}>联系方式: 400-XXX-XXXX</span>
      </Space>
      <div style={{ color: '#8c8c8c', fontSize: '14px' }}>
        © 2025 无相考试系统. All Rights Reserved.
      </div>
    </AntFooter>
  );
}
