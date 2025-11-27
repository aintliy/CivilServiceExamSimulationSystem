# 无相考试系统 (Interview Exam Demo)

基于 Next.js + Ant Design 构建的公务员面试/笔试培训平台前端高保真原型。

## 项目介绍

本项目是一个纯前端 UI 展示框架，旨在实现《考试系统需求分析》中的核心界面与交互逻辑。系统包含首页、认证、面试训练、专家打分、结果分析等模块，完全遵循 Ant Design 设计规范，提供现代化的用户体验。

> **注意**：本项目仅包含前端 UI 实现，不包含后端 API、数据库及真实的 AI/视频服务。所有数据均为模拟数据。

## 技术栈

- **核心框架**: [Next.js 16](https://nextjs.org/) (App Router)
- **UI 组件库**: [Ant Design 6.0](https://ant.design/)
- **编程语言**: [TypeScript](https://www.typescriptlang.org/)
- **图表库**: [@ant-design/charts](https://charts.ant.design/)
- **样式方案**: CSS Modules / Global CSS

## 核心功能

- **用户认证**: 登录/注册页面，表单校验与反馈。
- **仪表盘**: 响应式布局，功能卡片导航，贡献分展示。
- **AI 面试训练**:
  - 模拟 AI 数字人视频界面。
  - 实时语音检测（语速、音量）可视化。
  - 录制计时与控制。
- **结果分析**:
  - 五维能力雷达图。
  - AI 智能点评与专家点评展示。
- **专家打分**:
  - 视频播放控制模拟。
  - 多维度滑块评分系统。
- **无领导小组讨论**:
  - 多人视频会议网格布局。
  - 讨论阶段时间轴管理。

## 环境配置与运行指南 (从零开始)

本指南适用于未安装 Node.js 环境的全新主机。

### 1. 安装 Node.js 环境

本项目基于 Next.js 开发，需要 Node.js 运行环境。

1.  访问 [Node.js 官网](https://nodejs.org/)。
2.  下载 **LTS (长期支持版)** 安装包（建议 v20.x 或更高版本）。
3.  运行安装程序，按照提示完成安装（Windows 用户请确保勾选 "Add to PATH"）。
4.  安装完成后，打开终端（CMD 或 PowerShell），输入以下命令验证：
    ```bash
    node -v
    # 应输出 v20.x.x 或更高
    npm -v
    # 应输出 10.x.x 或更高
    ```

### 2. 安装项目依赖

进入项目根目录，运行以下命令安装依赖。
**重要提示**：由于项目使用了最新的 React 19 和 Ant Design 6，请务必添加 `--legacy-peer-deps` 参数以解决依赖冲突。

```bash
npm install --legacy-peer-deps
```

### 3. 启动系统

依赖安装完成后，运行开发服务器：

```bash
npm run dev
```

等待终端显示 `Ready in ...` 后，打开浏览器访问 [http://localhost:3000](http://localhost:3000) 即可使用系统。

## 目录结构

```
interview-exam-demo/
├── app/
│   ├── auth/               # 认证模块
│   ├── components/         # 公共组件 (Header, Footer, Sidebar)
│   ├── interview/          # 面试模块
│   │   ├── ai-training/    # AI 训练
│   │   ├── expert-scoring/ # 专家打分
│   │   ├── group-discussion/# 小组讨论
│   │   └── result/         # 结果分析
│   ├── written-test/       # 笔试模块
│   ├── globals.css         # 全局样式
│   ├── layout.tsx          # 根布局
│   └── page.tsx            # 首页
├── public/
│   └── images/             # 静态图片资源
└── ...
```

## 页面路由说明

| 页面      | 路由                            | 说明               |
| --------- | ------------------------------- | ------------------ |
| 首页      | `/`                           | 系统入口，功能导航 |
| 登录/注册 | `/auth`                       | 用户身份认证       |
| AI 训练   | `/interview/ai-training`      | 模拟人机面试       |
| 结果分析  | `/interview/result`           | 查看训练报告       |
| 专家打分  | `/interview/expert-scoring`   | 专家评分界面       |
| 小组讨论  | `/interview/group-discussion` | 无领导小组讨论模拟 |

## UI 设计规范

本项目严格遵循 Ant Design 设计规范：

- **主色**: `#1890ff` (Daybreak Blue)
- **字体**: `-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial`
- **布局**: 响应式栅格布局，适配 PC 与移动端。

## 许可证

MIT
