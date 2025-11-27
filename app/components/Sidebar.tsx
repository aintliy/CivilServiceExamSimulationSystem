'use client';

import React from 'react';
import { Menu } from 'antd';
import type { MenuProps } from 'antd';
import { useRouter, usePathname } from 'next/navigation';

type MenuItem = Required<MenuProps>['items'][number];

const items: MenuItem[] = [
  {
    key: 'interview',
    label: '面试',
    children: [
      {
        key: 'basic-ability',
        label: '基础能力',
        children: [
          { key: 'basic-training', label: '基础能力训练' },
          { key: 'listening-training', label: '听题能力' },
          { key: 'note-training', label: '记录习惯' },
        ],
      },
      {
        key: 'ai-practice',
        label: '人机练习',
        children: [
          { key: '1v1-training', label: 'AI数字人训练' },
          { key: 'group-discussion', label: '小组讨论' },
        ],
      },
      {
        key: 'mock-interview',
        label: '模拟面试',
        children: [
          { key: 'comprehensive-interview', label: '模拟测试' },
          { key: 'expert-training', label: '专家训练' },
          { key: 'offline-group', label: '线下测试' },
        ],
      },
    ],
  },
  {
    key: 'written-test',
    label: '笔试',
    children: [
      { 
        key: 'admin-ability', 
        label: '行测',
        children: [
          { key: 'admin-basic', label: '基础测试' },
          { key: 'admin-category', label: '分类训练' },
          { key: 'admin-timed', label: '限时训练' },
          { key: 'admin-mock', label: '模拟测试' },
        ]
      },
      { 
        key: 'essay', 
        label: '申论',
        children: [
          { key: 'essay-basic', label: '基础测试' },
          { key: 'essay-category', label: '分类训练' },
          { key: 'essay-timed', label: '限时训练' },
          { key: 'essay-word-limit', label: '限字训练' },
          { key: 'essay-mock', label: '模拟测试' },
        ]
      },
    ],
  },
  {
    key: 'basic-training-menu',
    label: '基础能力提升',
    children: [
      { key: 'expression-training', label: '表达力训练' },
      { key: 'logical-thinking', label: '逻辑思维' },
    ],
  },
];

export default function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();

  const onClick: MenuProps['onClick'] = (e) => {
    // 根据key映射到对应路由
    const routeMap: Record<string, string> = {
      // 基础能力
      'basic-training': '/interview/basic-training',
      'listening-training': '/interview/basic-training',
      'note-training': '/interview/basic-training',
      
      // 人机练习
      '1v1-training': '/interview/ai-training',
      'group-discussion': '/interview/group-discussion',
      
      // 模拟面试
      'comprehensive-interview': '/interview/mock-test',
      'expert-training': '/interview/expert-training',
      'offline-group': '/interview/offline-group',
      
      // 行测
      'admin-basic': '/written-test/admin',
      'admin-category': '/written-test/admin',
      'admin-timed': '/written-test/admin',
      'admin-mock': '/written-test/admin',
      
      // 申论
      'essay-basic': '/written-test/essay',
      'essay-category': '/written-test/essay',
      'essay-timed': '/written-test/essay',
      'essay-word-limit': '/written-test/essay',
      'essay-mock': '/written-test/essay',
      
      // 基础能力提升
      'expression-training': '/interview/basic-training',
      'logical-thinking': '/interview/basic-training',
    };

    if (routeMap[e.key]) {
      router.push(routeMap[e.key]);
    }
  };

  return (
    <Menu
      onClick={onClick}
      style={{ width: 256 }}
      defaultOpenKeys={['interview', 'ai-practice', 'mock-interview']}
      mode="inline"
      items={items}
    />
  );
}
