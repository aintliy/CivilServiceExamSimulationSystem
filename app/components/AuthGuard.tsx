'use client';

import React, { useEffect, useState } from 'react';
import { useAuth } from '@/app/contexts/AuthContext';
import { useRouter, usePathname } from 'next/navigation';

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const { isLoggedIn } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [isClient, setIsClient] = useState(false);

  // 确保只在客户端渲染
  useEffect(() => {
    setIsClient(true);
  }, []);

  // 检查登录状态并重定向
  useEffect(() => {
    if (isClient && !isLoggedIn && pathname !== '/auth') {
      router.push('/auth');
    }
  }, [isClient, isLoggedIn, pathname, router]);

  // 在客户端渲染之前，显示原内容（避免闪烁）
  if (!isClient) {
    return <>{children}</>;
  }

  // 如果未登录且不在auth页面，不渲染内容（等待重定向）
  if (!isLoggedIn && pathname !== '/auth') {
    return null;
  }

  // 已登录或在auth页面，正常显示内容
  return <>{children}</>;
}
