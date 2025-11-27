'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type UserRole = 'student' | 'teacher';

export interface User {
  id: string;
  username: string;
  role: UserRole;
  phone: string;
  contributionPoints: number;
}

interface AuthContextType {
  user: User | null;
  isLoggedIn: boolean;
  login: (username: string, password: string, role: UserRole) => Promise<boolean>;
  register: (username: string, password: string, phone: string, role: UserRole) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // 从 localStorage 恢复登录状态
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      setUser(userData);
      setIsLoggedIn(true);
    }
  }, []);

  const login = async (username: string, password: string, role: UserRole): Promise<boolean> => {
    // 模拟登录验证
    // 实际项目中这里应该调用后端API
    const storedUsers = JSON.parse(localStorage.getItem('users') || '[]');
    const foundUser = storedUsers.find(
      (u: any) => u.username === username && u.password === password && u.role === role
    );

    if (foundUser) {
      const userData: User = {
        id: foundUser.id,
        username: foundUser.username,
        role: foundUser.role,
        phone: foundUser.phone,
        contributionPoints: foundUser.contributionPoints || 1000
      };
      setUser(userData);
      setIsLoggedIn(true);
      localStorage.setItem('user', JSON.stringify(userData));
      return true;
    }
    return false;
  };

  const register = async (
    username: string, 
    password: string, 
    phone: string, 
    role: UserRole
  ): Promise<boolean> => {
    // 模拟注册
    const storedUsers = JSON.parse(localStorage.getItem('users') || '[]');
    
    // 检查用户名是否已存在
    if (storedUsers.some((u: any) => u.username === username)) {
      return false;
    }

    const newUser = {
      id: Date.now().toString(),
      username,
      password,
      phone,
      role,
      contributionPoints: 1000 // 注册即送1000贡献分
    };

    storedUsers.push(newUser);
    localStorage.setItem('users', JSON.stringify(storedUsers));

    // 自动登录
    const userData: User = {
      id: newUser.id,
      username: newUser.username,
      role: newUser.role,
      phone: newUser.phone,
      contributionPoints: newUser.contributionPoints
    };
    setUser(userData);
    setIsLoggedIn(true);
    localStorage.setItem('user', JSON.stringify(userData));
    
    return true;
  };

  const logout = () => {
    setUser(null);
    setIsLoggedIn(false);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, isLoggedIn, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
