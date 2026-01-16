# AI驱动的个性化学习路径定制系统

<div align="center">

**基于知识图谱与AI技术的智能化教学平台**

[![React](https://img.shields.io/badge/React-18.3-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue.svg)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6.3-646CFF.svg)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4.0-38B2AC.svg)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

[功能特性](#-功能特性) • [快速开始](#-快速开始) • [技术栈](#-技术栈) • [项目结构](#-项目结构)

</div>

---

## 📖 项目简介

本系统是一个**AI驱动的个性化学习路径定制平台**，专为计算机科学教育设计。通过知识图谱可视化、智能问答、代码分析和个性化测验等功能，为学生提供量身定制的学习路径，为教师提供高效的教学管理工具。

### 🎯 核心特色

- **📊 知识图谱可视化** - 三级知识点树状结构，掌握度颜色编码
- **🤖 AI智能问答** - 基于RAG的上下文问答，支持向教师提问
- **💻 代码质量分析** - 多维度评估代码质量，关联薄弱知识点
- **📝 个性化测验** - 基于薄弱点的智能组卷，错题重练推荐
- **📈 学习数据分析** - 雷达图、趋势图多维度展示学习状态
- **👥 双角色系统** - 学生/教师角色自由切换，功能权限分离

---

## ✨ 功能特性

### 🧑‍🎓 学生端功能

#### 1. 知识图谱 📚

**核心功能：**
- ✅ **三级知识点结构** - 一级主题 → 二级知识点 → 三级细节，层次清晰
- ✅ **掌握度可视化** - 颜色编码：
  - 🟢 绿色（85%+）：掌握良好
  - 🟡 黄色（70-85%）：基本掌握
  - 🔴 红色（<70%）：需要加强
- ✅ **树状展开/收起** - 支持逐级展开查看详细知识点
- ✅ **快速定位薄弱点** - 自动筛选低于70%掌握度的知识点
- ✅ **学习资源关联** - 每个知识点关联教材、视频、练习、代码示例
- ✅ **一键跳转学习** - 点击知识点跳转智能问答深入学习
- ✅ **多课程支持** - 操作系统、数据结构、计算机网络、数据库原理

**教师端扩展：**
- ✅ 知识点管理（增删改）
- ✅ 资料上传（文档、PPT）
- ✅ 语音输入构建知识点
- ✅ URL爬取自动提取内容

#### 2. 智能问答 💬

**核心功能：**
- ✅ **AI实时问答** - 模拟AI快速响应，提供结构化答案
- ✅ **知识来源标注** - 每个答案标注相关知识点和可信度
- ✅ **多轮对话** - 支持上下文连续提问
- ✅ **预设问题** - 常见问题快速入口（概念定义、工作原理、应用场景等）
- ✅ **历史记录** - 保存所有对话历史，支持回溯查看
- ✅ **向老师提问** - AI无法解答时转交教师处理

**教师端扩展：**
- ✅ 查看所有学生提问列表
- ✅ 人工回答学生问题
- ✅ 问题统计与分析

#### 3. 代码分析 💻

**学生端功能：**
- ✅ **文件上传模式** - 支持单文件或多文件上传分析
- ✅ **综合评分** - 0-100分质量评估
- ✅ **四维质量指标**：
  - 代码复杂度（圈复杂度分析）
  - 可维护性（重复率、函数长度）
  - 文档完整度（注释覆盖率）
  - 测试覆盖率（单元测试）
- ✅ **问题检测** - 错误、警告、优化建议，带行号定位
- ✅ **薄弱点关联** - 将代码问题关联到知识图谱薄弱点
- ✅ **学习建议** - 针对性改进方案和学习资源推荐

**教师端扩展：**
- ✅ 学生代码列表管理
- ✅ AI分析报告查看
- ✅ AI生成检测
- ✅ 人工评分和评语

#### 4. 问卷测验 📝

**学生端 - 三大模式：**
- ✅ **课堂检测** - 限时测验，实时倒计时
- ✅ **课后作业** - 截止日期，可多次保存
- ✅ **自主练习** - 无限制自由练习

**自主练习三种方式：**
1. **智能组卷** - 基于薄弱点AI生成题目（5-30题可调）
2. **自主选题** - 按知识点、难度、题型筛选
3. **错题重练** - 历史错题复习 + AI推荐相似题

**答题界面：**
- ✅ 进度条显示
- ✅ 题目网格导航
- ✅ 选择题单选交互
- ✅ 编程题代码编辑器
- ✅ 自动保存草稿
- ✅ 提交前统计已答/未答

**教师端 - 四大面板：**
1. **智能组卷** - 知识点选择、难度配置、题型分布
2. **题库管理** - 按知识点分类，题目来源标注
3. **发布测验** - 课堂检测/课后作业发布
4. **成绩分析** - 成绩列表、平均分、知识点掌握分析

#### 5. 用户中心 👤

**学习数据统计：**
- ✅ **学习时长** - 总学习时长和近期学习时间
- ✅ **完成题目数** - 总题数和正确率
- ✅ **知识点掌握度** - 平均掌握度和薄弱点数量
- ✅ **学习建议** - AI生成的个性化学习建议

**知识掌握度雷达图：**
- ✅ 五维可视化展示（针对不同课程的主题）
- ✅ 个人数据 vs 班级平均对比
- ✅ 支持课程切换（操作系统、数据结构、计算机网络、数据库原理）

**个性化学习路径：**
- ✅ **薄弱点分析** - 自动识别掌握度低于70%的知识点
- ✅ **学习资源推荐** - 针对薄弱点推荐视频、文章、练习题
- ✅ **复习计划生成** - AI生成个性化复习计划
- ✅ **习题推荐** - 根据薄弱点推荐相关题目
- ✅ **趋势分析** - 知识点掌握度变化趋势图（Modal弹窗）

**教师端工作台：**
- ✅ 班级切换器（多班级管理）
- ✅ 班级统计（人数、待处理问题、出勤率）
- ✅ 待解决问题列表（学生提问实时展示）
- ✅ 一键回答功能

---

### 🎨 通用功能

#### 用户引导系统
- ✅ **欢迎弹窗** - 首次登录展示平台介绍
- ✅ **分步引导** - 交互式新手教程，高亮关键功能区
- ✅ **随时查看** - 用户菜单中可重新观看引导

#### 角色切换
- ✅ **学生/教师角色** - 一键切换，功能权限自动适配
- ✅ **导航菜单动态** - 根据角色显示不同功能模块

#### 界面设计
- ✅ **可折叠侧边栏** - 最大化内容展示空间
- ✅ **全局搜索** - 侧边栏底部全局检索入口
- ✅ **主题配色** - Indigo + Purple 渐变设计
- ✅ **响应式布局** - 支持桌面端和平板

---

## 🚀 快速开始

### 环境要求

- **Node.js** >= 16.x
- **npm** >= 8.x 或 **yarn** >= 1.22.x

### 安装步骤

```bash
# 克隆项目
git clone https://github.com/wzfzyjcj/ATDemo.git
cd ATDemo

# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build
```

### 访问应用

启动后访问 `http://localhost:5173`

**默认登录：**
- 任意用户名和密码均可登录（原型演示用）
- 角色选择：学生 / 教师

---

## 🛠️ 技术栈

### 核心框架
- **React 18.3.1** - 用户界面框架
- **TypeScript** - 类型安全的JavaScript超集
- **Vite 6.3.5** - 下一代前端构建工具
- **Tailwind CSS 4.0** - 原子化CSS框架

### 可视化库
- **Recharts 2.15.2** - 雷达图、折线图、柱状图
- *(计划集成 D3.js 用于知识图谱力导向图)*

### UI组件库
- **Radix UI** - 无障碍组件基础库
  - Dialog, Dropdown, Popover, Tabs, Select 等20+组件
- **Lucide React 0.487.0** - 现代化图标库
- **Sonner 2.0.3** - 优雅的Toast通知组件

### 表单与状态
- **React Hook Form 7.55.0** - 高性能表单管理
- **Class Variance Authority 0.7.1** - 组件样式变体管理

### 开发工具
- **@vitejs/plugin-react-swc** - 使用SWC的React插件
- **TypeScript** - 类型检查

---

## 📁 项目结构

```
ATDemo/
├── src/
│   ├── components/              # React组件
│   │   ├── Login.tsx            # 登录页面
│   │   ├── KnowledgeGraph.tsx   # 知识图谱（三级树状结构）
│   │   ├── SmartQA.tsx          # 智能问答（AI对话）
│   │   ├── CodeAnalysis.tsx     # 代码分析（质量评估）
│   │   ├── QuizModule.tsx       # 教师问卷测验管理
│   │   ├── StudentQuiz.tsx      # 学生答题界面
│   │   ├── UserProfile.tsx      # 用户中心（学生/教师）
│   │   ├── TeacherHome.tsx      # 教师工作台
│   │   ├── RadarChart.tsx       # 雷达图组件
│   │   ├── TrendChartModal.tsx  # 趋势图弹窗
│   │   ├── GuidedTour.tsx       # 新手引导
│   │   ├── WelcomeModal.tsx     # 欢迎弹窗
│   │   ├── AskTeacherModal.tsx  # 向教师提问弹窗
│   │   └── ui/                  # shadcn/ui基础组件
│   │       ├── button.tsx       # 按钮组件
│   │       ├── dialog.tsx       # 对话框组件
│   │       ├── tabs.tsx         # 标签页组件
│   │       └── ...              # 其他UI组件
│   ├── styles/
│   │   └── globals.css          # 全局样式（Tailwind配置）
│   ├── App.tsx                  # 主应用组件（路由与布局）
│   └── main.tsx                 # 应用入口
├── public/                      # 静态资源
├── index.html                   # HTML模板
├── package.json                 # 依赖配置
├── tsconfig.json                # TypeScript配置
├── vite.config.ts               # Vite配置
└── README.md                    # 项目文档
```

### 核心组件说明

| 组件 | 功能描述 | 关键特性 |
|------|---------|---------|
| `App.tsx` | 应用主容器 | 路由管理、角色切换、侧边栏导航 |
| `KnowledgeGraph.tsx` | 知识图谱 | 三级树状结构、掌握度可视化、资源关联 |
| `SmartQA.tsx` | 智能问答 | AI对话、历史记录、向教师提问 |
| `CodeAnalysis.tsx` | 代码分析 | 四维质量评估、问题检测、薄弱点关联 |
| `StudentQuiz.tsx` | 学生答题 | 智能组卷、自主选题、错题重练 |
| `UserProfile.tsx` | 用户中心 | 雷达图、趋势分析、个性化学习建议 |
| `TeacherHome.tsx` | 教师工作台 | 班级管理、问题处理、统计数据 |

---

## 🎯 核心算法与逻辑

### 1. 个性化学习路径生成

**薄弱点识别算法：**
```typescript
// 筛选掌握度低于70%的知识点
const weakPoints = knowledgeGraph.filter(node => node.mastery < 70);

// 按掌握度从低到高排序
weakPoints.sort((a, b) => a.mastery - b.mastery);

// 生成学习优先级
const learningPath = weakPoints.map((node, index) => ({
  priority: index + 1,
  knowledgePoint: node.name,
  currentMastery: node.mastery,
  targetMastery: 85,
  recommendedResources: node.resources
}));
```

### 2. 智能组卷算法

**基于薄弱点的题目推荐：**
```typescript
// 获取薄弱知识点
const weakTopics = getWeakTopics(userMastery);

// 分配题目数量（按薄弱程度权重分配）
const questionDistribution = weakTopics.map(topic => ({
  topic: topic.name,
  count: Math.ceil(totalQuestions * (100 - topic.mastery) / sumWeakness)
}));

// 从题库中随机抽取题目
const selectedQuestions = questionDistribution.flatMap(dist => 
  questionBank.filter(q => q.topic === dist.topic)
    .sort(() => Math.random() - 0.5)
    .slice(0, dist.count)
);
```

### 3. 代码质量评分算法

**综合评分计算：**
```typescript
const codeScore = {
  complexity: calculateComplexity(code),      // 25%
  maintainability: calculateMaintainability(code), // 25%
  documentation: calculateDocumentation(code),     // 25%
  testCoverage: calculateTestCoverage(code)       // 25%
};

const totalScore = Object.values(codeScore)
  .reduce((sum, score) => sum + score * 0.25, 0);
```

---

## 🔒 数据隐私

- **本地存储** - 所有用户数据存储在浏览器localStorage
- **无后端依赖** - 前端独立运行，无需服务器
- **模拟数据** - 当前版本使用Mock数据演示功能
- **数据安全** - 不收集、不上传任何个人信息

> ⚠️ **注意**：这是一个高保真前端原型，主要用于功能演示和UI/UX验证。生产环境需要：
> - 接入真实后端API
> - 实现用户认证系统
> - 集成真实的AI服务（如OpenAI、Claude等）
> - 添加数据持久化（数据库）

---

## 🗺️ 开发路线图

### Phase 1: 前端原型 ✅ (当前阶段)
- [x] 完整的UI/UX设计
- [x] 所有核心功能模块
- [x] 双角色系统
- [x] Mock数据演示
- [x] 响应式布局

### Phase 2: 后端集成 🚧 (规划中)
- [ ] 用户认证与授权（JWT）
- [ ] RESTful API开发
- [ ] 数据库设计（PostgreSQL/MongoDB）
- [ ] 文件上传服务（OSS）
- [ ] WebSocket实时通信

### Phase 3: AI集成 💡 (未来)
- [ ] 接入LLM API（智能问答）
- [ ] 知识图谱自动构建（NLP）
- [ ] 代码质量分析（AST解析）
- [ ] 个性化推荐算法
- [ ] 学习路径优化（强化学习）

### Phase 4: 功能增强 💡 (未来)
- [ ] 视频学习模块
- [ ] 实时协作编程
- [ ] 移动端App
- [ ] 学习社区论坛
- [ ] 数据分析看板

---

## 🤝 贡献指南

欢迎提交Issue和Pull Request！

### 开发规范

**代码规范：**
- 使用 TypeScript 编写
- 组件命名：PascalCase
- 函数命名：camelCase
- 类型定义：明确接口类型

**提交规范：**
- feat: 新功能
- fix: 修复bug
- docs: 文档更新
- style: 代码格式调整
- refactor: 代码重构
- test: 测试相关

### 贡献流程

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'feat: Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

---

## 📄 许可证

本项目采用 [MIT License](LICENSE) 开源协议。

### 致谢

本项目使用了以下开源组件：
- [shadcn/ui](https://ui.shadcn.com/) - UI组件库 (MIT License)
- [Radix UI](https://www.radix-ui.com/) - 无障碍组件基础 (MIT License)
- [Lucide Icons](https://lucide.dev/) - 图标库 (ISC License)
- [Recharts](https://recharts.org/) - 图表库 (MIT License)
- [Tailwind CSS](https://tailwindcss.com/) - CSS框架 (MIT License)

---

## 📮 联系方式

- **项目仓库**：[https://github.com/wzfzyjcj/ATDemo](https://github.com/wzfzyjcj/ATDemo)
- **问题反馈**：[GitHub Issues](https://github.com/wzfzyjcj/ATDemo/issues)
- **功能建议**：[GitHub Discussions](https://github.com/wzfzyjcj/ATDemo/discussions)

---

<div align="center">

**⭐ 如果这个项目对你有帮助，请给我们一个 Star！**

**Made with ❤️ for Computer Science Education**

</div>
