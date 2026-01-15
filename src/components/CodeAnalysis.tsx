import { useState } from 'react';
import { Upload, Github, FileCode, AlertTriangle, CheckCircle, Info, Download, BookOpen, GitBranch, Code2, Lightbulb, Target, TrendingUp, Users, Search, Layers, MessageSquare, Network, Zap, Eye } from 'lucide-react';

interface CodeAnalysisProps {
  isTeacher: boolean;
}

export default function CodeAnalysis({ isTeacher }: CodeAnalysisProps) {
  if (isTeacher) {
    return <TeacherCodeAnalysis />;
  }
  
  return <StudentCodeAnalysis />;
}

// 教师端：双视图切换
function TeacherCodeAnalysis() {
  const [viewMode, setViewMode] = useState<'grading' | 'analysis'>('grading');
  
  return (
    <div className="h-full flex flex-col">
      {/* 顶部视图切换控件 */}
      <div className="bg-white border-b border-slate-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h2 className="text-lg font-semibold text-slate-900">代码分析</h2>
            <div className="flex items-center bg-slate-100 rounded-lg p-1">
              <button
                onClick={() => setViewMode('grading')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  viewMode === 'grading'
                    ? 'bg-white text-slate-900 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Users className="w-4 h-4 inline mr-2" />
                批阅作业
              </button>
              <button
                onClick={() => setViewMode('analysis')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  viewMode === 'analysis'
                    ? 'bg-white text-slate-900 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Code2 className="w-4 h-4 inline mr-2" />
                分析代码
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 内容区域 */}
      <div className="flex-1 overflow-auto">
        {viewMode === 'grading' ? <GradingMode /> : <AnalysisMode isTeacher={true} />}
      </div>
    </div>
  );
}

// 批阅作业模式
function GradingMode() {
  const [selectedCourse, setSelectedCourse] = useState('操作系统');
  const [selectedAssignment, setSelectedAssignment] = useState('Lab3-进程调度');
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStudent, setSelectedStudent] = useState<any>(null);

  const courses = ['操作系统', '数据结构', '计算机网络'];
  const assignments = ['Lab1-系统调用', 'Lab2-内存管理', 'Lab3-进程调度', 'Lab4-文件系统'];
  
  const submissions = [
    { id: 1, student: '张三', studentId: '202401001', submitTime: '2024-02-15 14:30', status: 'pending', score: null, aiRisk: 72 },
    { id: 2, student: '李四', studentId: '202401002', submitTime: '2024-02-15 16:45', status: 'graded', score: 88, aiRisk: 45 },
    { id: 3, student: '王五', studentId: '202401003', submitTime: '2024-02-14 22:10', status: 'ai-detected', score: null, aiRisk: 85 },
    { id: 4, student: '赵六', studentId: '202401004', submitTime: '2024-02-15 09:20', status: 'pending', score: null, aiRisk: 38 },
    { id: 5, student: '钱七', studentId: '202401005', submitTime: '2024-02-15 18:00', status: 'graded', score: 92, aiRisk: 25 },
  ];

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending': return '待批阅';
      case 'graded': return '已批阅';
      case 'ai-detected': return 'AI检测中';
      default: return status;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-700';
      case 'graded': return 'bg-green-100 text-green-700';
      case 'ai-detected': return 'bg-red-100 text-red-700';
      default: return 'bg-slate-100 text-slate-700';
    }
  };

  const filteredSubmissions = submissions.filter(sub => {
    if (statusFilter !== 'all' && sub.status !== statusFilter) return false;
    if (searchQuery && !sub.student.includes(searchQuery) && !sub.studentId.includes(searchQuery)) return false;
    return true;
  });

  return (
    <div className="p-6">
      {/* 功能栏 */}
      <div className="bg-white rounded-lg border border-slate-200 p-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="text-xs text-slate-600 mb-1 block">课程</label>
            <select
              value={selectedCourse}
              onChange={(e) => setSelectedCourse(e.target.value)}
              className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              {courses.map(course => (
                <option key={course} value={course}>{course}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-xs text-slate-600 mb-1 block">作业</label>
            <select
              value={selectedAssignment}
              onChange={(e) => setSelectedAssignment(e.target.value)}
              className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              {assignments.map(assignment => (
                <option key={assignment} value={assignment}>{assignment}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-xs text-slate-600 mb-1 block">状态</label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="all">全部</option>
              <option value="pending">待批阅</option>
              <option value="graded">已批阅</option>
              <option value="ai-detected">AI检测中</option>
            </select>
          </div>

          <div>
            <label className="text-xs text-slate-600 mb-1 block">搜索</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="学生姓名/学号"
                className="w-full pl-9 pr-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-6 mt-4 pt-4 border-t border-slate-200">
          <div className="text-sm">
            <span className="text-slate-600">总提交：</span>
            <span className="font-semibold text-slate-900">{submissions.length}</span>
          </div>
          <div className="text-sm">
            <span className="text-slate-600">待批阅：</span>
            <span className="font-semibold text-yellow-600">{submissions.filter(s => s.status === 'pending').length}</span>
          </div>
          <div className="text-sm">
            <span className="text-slate-600">已批阅：</span>
            <span className="font-semibold text-green-600">{submissions.filter(s => s.status === 'graded').length}</span>
          </div>
          <div className="text-sm">
            <span className="text-slate-600">平均分：</span>
            <span className="font-semibold text-slate-900">
              {Math.round(submissions.filter(s => s.score).reduce((acc, s) => acc + (s.score || 0), 0) / submissions.filter(s => s.score).length)}
            </span>
          </div>
        </div>
      </div>

      {/* 学生作业列表 */}
      <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase">
                <input type="checkbox" className="rounded" />
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase">学生</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase">学号</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase">提交时间</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase">状态</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase">AI风险</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase">分数</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase">操作</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {filteredSubmissions.map((sub) => (
              <tr key={sub.id} className="hover:bg-slate-50">
                <td className="px-4 py-3">
                  <input type="checkbox" className="rounded" />
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center">
                      <span className="text-sm font-medium text-indigo-600">{sub.student.charAt(0)}</span>
                    </div>
                    <span className="text-sm font-medium text-slate-900">{sub.student}</span>
                  </div>
                </td>
                <td className="px-4 py-3 text-sm text-slate-600">{sub.studentId}</td>
                <td className="px-4 py-3 text-sm text-slate-600">{sub.submitTime}</td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(sub.status)}`}>
                    {getStatusText(sub.status)}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden w-16">
                      <div
                        className={`h-full ${
                          sub.aiRisk >= 70 ? 'bg-red-500' :
                          sub.aiRisk >= 50 ? 'bg-yellow-500' : 'bg-green-500'
                        }`}
                        style={{ width: `${sub.aiRisk}%` }}
                      />
                    </div>
                    <span className="text-xs font-medium text-slate-600">{sub.aiRisk}%</span>
                  </div>
                </td>
                <td className="px-4 py-3">
                  {sub.score !== null ? (
                    <span className="text-sm font-medium text-slate-900">{sub.score}/100</span>
                  ) : (
                    <span className="text-sm text-slate-400">-</span>
                  )}
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => setSelectedStudent(sub)}
                      className="text-xs text-indigo-600 hover:text-indigo-700 font-medium"
                    >
                      查看详情
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 批阅详情模态框 */}
      {selectedStudent && (
        <GradingDetailModal 
          student={selectedStudent}
          onClose={() => setSelectedStudent(null)}
        />
      )}
    </div>
  );
}

// 批阅详情模态框
function GradingDetailModal({ student, onClose }: { student: any; onClose: () => void }) {
  const [score, setScore] = useState(student.score || 85);
  const [comment, setComment] = useState('');

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-slate-200">
          <div>
            <h2 className="text-xl font-bold text-slate-900">{student.student} 的作业</h2>
            <p className="text-sm text-slate-600 mt-1">学号：{student.studentId} · 提交时间：{student.submitTime}</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-lg">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg p-6 text-white">
            <h3 className="font-semibold mb-4">系统自动分析</h3>
            <div className="grid grid-cols-4 gap-4">
              <div>
                <div className="text-sm opacity-90">代码质量</div>
                <div className="text-2xl font-bold">85/100</div>
              </div>
              <div>
                <div className="text-sm opacity-90">完成度</div>
                <div className="text-2xl font-bold">92%</div>
              </div>
              <div>
                <div className="text-sm opacity-90">AI检测</div>
                <div className="text-2xl font-bold">{student.aiRisk}%</div>
              </div>
              <div>
                <div className="text-sm opacity-90">问题数</div>
                <div className="text-2xl font-bold">3</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 border border-slate-200">
            <h4 className="font-semibold text-slate-900 mb-4">教师批阅</h4>
            
            <div className="mb-4">
              <label className="text-sm font-medium text-slate-700 mb-2 block">综合评分</label>
              <div className="flex items-center gap-4">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={score}
                  onChange={(e) => setScore(Number(e.target.value))}
                  className="flex-1"
                />
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={score}
                  onChange={(e) => setScore(Number(e.target.value))}
                  className="w-20 px-3 py-2 border border-slate-200 rounded-lg text-center"
                />
                <span className="text-slate-600">/100</span>
              </div>
            </div>

            <div className="mb-4">
              <label className="text-sm font-medium text-slate-700 mb-2 block">评语</label>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="输入评语..."
                rows={4}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div className="flex gap-3">
              <button className="flex-1 px-6 py-3 bg-slate-200 text-slate-600 rounded-lg hover:bg-slate-300">
                保存草稿
              </button>
              <button className="flex-1 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
                提交评分
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// 分析代码模式 - 适用于教师和学生
function AnalysisMode({ isTeacher }: { isTeacher: boolean }) {
  return <RepoAnalysisComponent isTeacher={isTeacher} />;
}

// 代码仓库分析组件（DeepWiki风格）
function RepoAnalysisComponent({ isTeacher }: { isTeacher: boolean }) {
  const [repoUrl, setRepoUrl] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<any>(null);
  const [activeDoc, setActiveDoc] = useState('overview');
  const [chatMessages, setChatMessages] = useState<any[]>([]);
  const [chatInput, setChatInput] = useState('');

  const userWeaknesses = ['并发控制', '内存管理', '页面置换算法'];

  const handleAnalyze = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setAnalysisResult({
        repoName: 'os-scheduler-implementation',
        description: '操作系统课程项目 - 进程调度器实现',
        language: 'C',
        fileCount: 12,
        lineCount: 2340,
        commitCount: 47,
        structure: {
          modules: [
            { 
              name: 'scheduler', 
              files: ['scheduler.c', 'scheduler.h'], 
              lines: 856, 
              description: '进程调度核心模块',
              weaknessRelated: !isTeacher,
              weakness: '并发控制',
              aiGenerated: isTeacher ? 52 : undefined,
              issues: isTeacher ? ['第45-89行代码结构高度规范，疑似AI生成'] : ['未实现线程安全机制', '缺少并发控制']
            },
            { 
              name: 'process', 
              files: ['process.c', 'process.h'], 
              lines: 634, 
              description: '进程管理模块',
              weaknessRelated: false,
              aiGenerated: isTeacher ? 38 : undefined,
              issues: isTeacher ? [] : ['进程创建逻辑完整']
            },
            { 
              name: 'memory', 
              files: ['memory.c', 'memory.h'], 
              lines: 523, 
              description: '内存分配模块',
              weaknessRelated: !isTeacher,
              weakness: '内存管理',
              aiGenerated: isTeacher ? 65 : undefined,
              issues: isTeacher ? ['内存分配函数异常完善，超出课程要求'] : ['缺少页面置换算法实现', '内存碎片处理不完善']
            },
          ],
        },
        documentation: {
          overview: `# OS Scheduler 项目\n\n这是一个操作系统进程调度器的实现项目，包含了以下核心功能：\n\n## 核心模块\n- **进程调度器**：实现FCFS、SJF、优先级调度算法\n- **进程管理**：进程创建、终止、状态转换\n- **内存管理**：内存分配与回收\n\n## 技术要点\n- 使用链表管理就绪队列\n- 实现时间片轮转\n- 支持优先级动态调整`,
          apis: [
            { name: 'schedule_init()', desc: '初始化调度器', file: 'scheduler.c', line: 45 },
            { name: 'add_process()', desc: '添加进程到就绪队列', file: 'scheduler.c', line: 78 },
            { name: 'get_next_process()', desc: '获取下一个执行进程', file: 'scheduler.c', line: 156 },
          ]
        },
        studentAnalysis: !isTeacher ? {
          weaknessMatch: [
            {
              module: 'scheduler',
              weakness: '并发控制',
              severity: 'high',
              details: '调度器模块涉及大量并发控制知识，但代码中未实现互斥锁和临界区保护',
              suggestions: [
                '学习互斥锁的使用方法',
                '理解临界区概念',
                '参考教材第6章并发控制'
              ],
              relatedCode: [
                { file: 'scheduler.c', lines: '45-89', issue: '未使用mutex保护共享队列' },
              ]
            },
          ],
          strengths: ['进程创建逻辑清晰', '基本数据结构使用正确'],
          improvements: ['加强并发控制学习', '补充内存管理知识']
        } : undefined,
        teacherAnalysis: isTeacher ? {
          aiDetection: [
            {
              file: 'scheduler.c',
              lines: '45-89',
              risk: 78,
              reason: '代码结构高度规范化，变量命名统一，错误处理完善，疑似AI生成',
              evidence: ['命名规范性98%', '代码风格一致性95%']
            },
          ],
          codeQuality: {
            issues: [
              { type: 'critical', file: 'scheduler.c', line: 78, msg: '空指针未检查' },
            ],
            overallScore: 85
          }
        } : undefined
      });
      setIsAnalyzing(false);
    }, 3000);
  };

  const handleSendMessage = () => {
    if (!chatInput.trim()) return;
    
    const userMsg = { role: 'user', content: chatInput };
    setChatMessages([...chatMessages, userMsg]);
    
    setTimeout(() => {
      const aiResponse = {
        role: 'assistant',
        content: `关于"${chatInput}"：\n\n在 scheduler.c 的第78行，add_process() 函数负责将新进程添加到就绪队列。具体实现如下：\n\n\`\`\`c\nvoid add_process(Process* p) {\n    if (ready_queue == NULL) {\n        ready_queue = p;\n    }\n}\n\`\`\`\n\n建议改进：添加互斥锁保护，确保线程安全。`,
      };
      setChatMessages(prev => [...prev, aiResponse]);
    }, 1000);
    
    setChatInput('');
  };

  if (!analysisResult) {
    return (
      <div className="flex-1 flex items-center justify-center p-6 bg-slate-50">
        <div className="max-w-2xl w-full">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Github className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">
              {isTeacher ? 'AI生成检测 & 代码诊断' : '智能代码分析助手'}
            </h2>
            <p className="text-slate-600">
              {isTeacher 
                ? '输入学生仓库地址，自动检测AI生成痕迹并生成评估报告'
                : '输入代码仓库地址，自动生成文档、分析薄弱点并提供学习建议'}
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-6">
            <label className="block text-sm font-medium text-slate-700 mb-2">
              GitHub / GitLab 仓库地址
            </label>
            <input
              type="text"
              value={repoUrl}
              onChange={(e) => setRepoUrl(e.target.value)}
              placeholder="https://github.com/username/repository"
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-4"
            />
            
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
              <h4 className="text-sm font-semibold text-blue-900 mb-2">✨ 分析功能</h4>
              <ul className="text-xs text-blue-800 space-y-1">
                {isTeacher ? (
                  <>
                    <li>• AI生成代码检测（基于多维度特征分析）</li>
                    <li>• 代码质量评估（复杂度、规范性、问题检测）</li>
                    <li>• 学生代码能力诊断</li>
                  </>
                ) : (
                  <>
                    <li>• 自动生成项目文档（概览、API、架构）</li>
                    <li>• 可视化架构图、依赖图、调用图</li>
                    <li>• 智能匹配你的薄弱知识点</li>
                    <li>• AI助手对话式解答代码疑问</li>
                  </>
                )}
              </ul>
            </div>

            <button
              onClick={handleAnalyze}
              disabled={isAnalyzing || !repoUrl.trim()}
              className="w-full px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:bg-slate-300 font-medium"
            >
              {isAnalyzing ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  分析中...
                </span>
              ) : (
                '开始深度分析'
              )}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // DeepWiki风格分析报告界面
  return (
    <div className="flex h-full bg-slate-50">
      {/* 左侧导航 */}
      <div className="w-64 bg-white border-r border-slate-200 overflow-y-auto">
        <div className="p-4 border-b border-slate-200">
          <h3 className="font-semibold text-slate-900">{analysisResult.repoName}</h3>
          <p className="text-xs text-slate-500 mt-1">{analysisResult.description}</p>
        </div>

        <div className="p-2">
          <nav className="space-y-1">
            <button
              onClick={() => setActiveDoc('overview')}
              className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors ${
                activeDoc === 'overview' ? 'bg-indigo-50 text-indigo-600' : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              项目概览
            </button>

            <button
              onClick={() => setActiveDoc('structure')}
              className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors ${
                activeDoc === 'structure' ? 'bg-indigo-50 text-indigo-600' : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              <Layers className="w-4 h-4" />
              模块结构
            </button>

            <button
              onClick={() => setActiveDoc('api')}
              className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors ${
                activeDoc === 'api' ? 'bg-indigo-50 text-indigo-600' : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              <Code2 className="w-4 h-4" />
              API文档
            </button>

            <button
              onClick={() => setActiveDoc('visualization')}
              className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors ${
                activeDoc === 'visualization' ? 'bg-indigo-50 text-indigo-600' : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              <Network className="w-4 h-4" />
              可视化图表
            </button>

            {!isTeacher && analysisResult.studentAnalysis && (
              <button
                onClick={() => setActiveDoc('weakness')}
                className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors ${
                  activeDoc === 'weakness' ? 'bg-orange-50 text-orange-600' : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <AlertTriangle className="w-4 h-4" />
                <span className="flex-1 text-left">薄弱点分析</span>
                <span className="px-1.5 py-0.5 bg-orange-100 text-orange-700 rounded text-xs font-medium">
                  {analysisResult.studentAnalysis.weaknessMatch.length}
                </span>
              </button>
            )}

            {isTeacher && analysisResult.teacherAnalysis && (
              <button
                onClick={() => setActiveDoc('ai-detection')}
                className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors ${
                  activeDoc === 'ai-detection' ? 'bg-purple-50 text-purple-600' : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <Eye className="w-4 h-4" />
                <span className="flex-1 text-left">AI检测</span>
                <span className="px-1.5 py-0.5 bg-purple-100 text-purple-700 rounded text-xs font-medium">
                  {analysisResult.teacherAnalysis.aiDetection.length}
                </span>
              </button>
            )}

            <button
              onClick={() => setActiveDoc('chat')}
              className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors ${
                activeDoc === 'chat' ? 'bg-green-50 text-green-600' : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              <MessageSquare className="w-4 h-4" />
              AI助手对话
            </button>
          </nav>
        </div>
      </div>

      {/* 右侧内容区 */}
      <div className="flex-1 overflow-y-auto bg-white">
        <div className="max-w-4xl mx-auto p-8">
          {activeDoc === 'overview' && (
            <div>
              <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg p-6 text-white mb-6">
                <h1 className="text-2xl font-bold mb-2">{analysisResult.repoName}</h1>
                <p className="text-sm opacity-90 mb-4">{analysisResult.description}</p>
                <div className="flex items-center gap-4 text-sm">
                  <span>语言：{analysisResult.language}</span>
                  <span>•</span>
                  <span>文件数：{analysisResult.fileCount}</span>
                  <span>•</span>
                  <span>总行数：{analysisResult.lineCount}</span>
                  <span>•</span>
                  <span>提交次数：{analysisResult.commitCount}</span>
                </div>
              </div>

              <div className="whitespace-pre-wrap text-slate-700 bg-slate-50 rounded-lg p-6 border border-slate-200">
                {analysisResult.documentation.overview}
              </div>
            </div>
          )}

          {activeDoc === 'structure' && (
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">模块结构</h2>
              {analysisResult.structure.modules.map((module: any, index: number) => (
                <div 
                  key={index} 
                  className={`p-6 rounded-lg border-2 ${
                    module.weaknessRelated && !isTeacher
                      ? 'bg-orange-50 border-orange-300'
                      : module.aiGenerated && module.aiGenerated > 60 && isTeacher
                      ? 'bg-purple-50 border-purple-300'
                      : 'bg-white border-slate-200'
                  }`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
                        <Code2 className="w-5 h-5 text-indigo-600" />
                        {module.name}
                        {module.weaknessRelated && !isTeacher && (
                          <span className="px-2 py-1 bg-orange-100 text-orange-700 rounded text-xs font-medium">
                            薄弱点：{module.weakness}
                          </span>
                        )}
                        {module.aiGenerated && module.aiGenerated > 60 && isTeacher && (
                          <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded text-xs font-medium">
                            AI风险：{module.aiGenerated}%
                          </span>
                        )}
                      </h3>
                      <p className="text-sm text-slate-600 mt-1">{module.description}</p>
                    </div>
                    <span className="text-sm text-slate-500">{module.lines} 行</span>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-3">
                    {module.files.map((file: string, idx: number) => (
                      <span key={idx} className="px-2 py-1 bg-slate-100 text-slate-700 rounded text-xs font-mono">
                        {file}
                      </span>
                    ))}
                  </div>

                  {module.issues.length > 0 && (
                    <div className="mt-3 pt-3 border-t border-slate-200">
                      <h4 className="text-sm font-semibold text-slate-700 mb-2">
                        {isTeacher ? 'AI检测结果' : '代码问题'}
                      </h4>
                      <ul className="space-y-1">
                        {module.issues.map((issue: string, idx: number) => (
                          <li key={idx} className="text-sm text-slate-600 flex items-start gap-2">
                            <AlertTriangle className="w-4 h-4 mt-0.5 flex-shrink-0 text-amber-600" />
                            {issue}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {activeDoc === 'api' && (
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">API文档</h2>
              {analysisResult.documentation.apis.map((api: any, index: number) => (
                <div key={index} className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                  <div className="font-mono text-indigo-600 font-semibold mb-2">{api.name}</div>
                  <p className="text-sm text-slate-700 mb-2">{api.desc}</p>
                  <div className="flex items-center gap-4 text-xs text-slate-500">
                    <span>📄 {api.file}</span>
                    <span>行 {api.line}</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeDoc === 'visualization' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">可视化图表</h2>
              <div className="bg-white rounded-lg border border-slate-200 p-6">
                <h3 className="font-semibold text-slate-900 mb-4">系统架构图</h3>
                <div className="relative h-64 bg-slate-50 rounded-lg flex items-center justify-center">
                  <p className="text-slate-500">架构图可视化区域</p>
                </div>
              </div>
            </div>
          )}

          {activeDoc === 'weakness' && !isTeacher && analysisResult.studentAnalysis && (
            <div className="space-y-6">
              <div className="bg-gradient-to-r from-orange-500 to-red-600 rounded-lg p-6 text-white">
                <h2 className="text-2xl font-bold mb-2">💡 个性化学习建议</h2>
                <p className="text-sm opacity-90">
                  系统检测到你的代码中涉及了 <strong>{analysisResult.studentAnalysis.weaknessMatch.length}</strong> 个你的薄弱知识点
                </p>
              </div>

              {analysisResult.studentAnalysis.weaknessMatch.map((weakness: any, index: number) => (
                <div key={index} className="bg-orange-50 border-2 border-orange-300 rounded-lg p-6">
                  <div className="flex items-start gap-3 mb-4">
                    <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center flex-shrink-0">
                      <AlertTriangle className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-900 text-lg">{weakness.weakness}</h3>
                      <p className="text-sm text-orange-700 font-medium">薄弱模块：{weakness.module}</p>
                    </div>
                  </div>

                  <div className="bg-white rounded-lg p-4 mb-4">
                    <h4 className="text-sm font-semibold text-slate-700 mb-2">问题详情</h4>
                    <p className="text-sm text-slate-600">{weakness.details}</p>
                  </div>

                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <h4 className="text-sm font-semibold text-green-800 mb-2 flex items-center gap-2">
                      <Lightbulb className="w-4 h-4" />
                      学习建议
                    </h4>
                    <ul className="space-y-1.5">
                      {weakness.suggestions.map((suggestion: string, idx: number) => (
                        <li key={idx} className="text-sm text-green-700 flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                          {suggestion}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeDoc === 'ai-detection' && isTeacher && analysisResult.teacherAnalysis && (
            <div className="space-y-6">
              <div className="bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg p-6 text-white">
                <h2 className="text-2xl font-bold mb-2">🤖 AI生成检测报告</h2>
                <p className="text-sm opacity-90">
                  检测到 <strong>{analysisResult.teacherAnalysis.aiDetection.length}</strong> 处可疑代码段
                </p>
              </div>

              {analysisResult.teacherAnalysis.aiDetection.map((detection: any, index: number) => (
                <div key={index} className={`rounded-lg p-6 border-2 ${
                  detection.risk >= 70 ? 'bg-red-50 border-red-300' : 'bg-yellow-50 border-yellow-300'
                }`}>
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-mono text-sm text-indigo-600">{detection.file}</span>
                        <span className="text-xs text-slate-500">行 {detection.lines}</span>
                      </div>
                      <p className="text-sm text-slate-700">{detection.reason}</p>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-purple-600">{detection.risk}%</div>
                      <div className="text-xs text-slate-600">AI风险</div>
                    </div>
                  </div>

                  <div className="bg-white rounded-lg p-4">
                    <h4 className="text-sm font-semibold text-slate-700 mb-2">检测依据</h4>
                    <div className="grid grid-cols-3 gap-3">
                      {detection.evidence.map((evidence: string, idx: number) => (
                        <div key={idx} className="text-xs text-slate-600 bg-slate-50 rounded px-2 py-1">
                          {evidence}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeDoc === 'chat' && (
            <div className="space-y-4">
              <div className="bg-gradient-to-r from-green-500 to-teal-600 rounded-lg p-6 text-white">
                <h2 className="text-2xl font-bold mb-2">💬 AI助手对话</h2>
                <p className="text-sm opacity-90">基于RAG技术，精准回答代码相关问题</p>
              </div>

              <div className="bg-slate-50 rounded-lg border border-slate-200 p-4 h-96 overflow-y-auto space-y-4">
                {chatMessages.length === 0 && (
                  <div className="text-center text-slate-500 py-12">
                    <MessageSquare className="w-12 h-12 mx-auto mb-3 opacity-50" />
                    <p className="text-sm">开始提问，AI助手将为你解答代码疑问</p>
                  </div>
                )}
                
                {chatMessages.map((msg, idx) => (
                  <div key={idx} className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    {msg.role === 'assistant' && (
                      <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center flex-shrink-0">
                        <MessageSquare className="w-5 h-5 text-white" />
                      </div>
                    )}
                    <div className={`max-w-[70%] rounded-lg px-4 py-3 ${
                      msg.role === 'user' 
                        ? 'bg-indigo-600 text-white' 
                        : 'bg-white border border-slate-200'
                    }`}>
                      <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex gap-2">
                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="输入你的问题..."
                  className="flex-1 px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <button
                  onClick={handleSendMessage}
                  className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                >
                  发送
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// 学生端代码分析
function StudentCodeAnalysis() {
  return (
    <div className="h-full flex flex-col">
      {/* 顶部标题 */}
      <div className="bg-white border-b border-slate-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h2 className="text-lg font-semibold text-slate-900">代码分析</h2>
          </div>
        </div>
      </div>

      {/* 内容区域 */}
      <div className="flex-1 overflow-auto">
        <AnalysisMode isTeacher={false} />
      </div>
    </div>
  );
}

// 文件上传模式（学生端）
function FileUploadMode() {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<any>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedFile(file);
      setIsAnalyzing(true);
      
      // 模拟分析过程
      setTimeout(() => {
        setAnalysisResult({
          fileName: file.name,
          fileSize: (file.size / 1024).toFixed(2) + ' KB',
          language: file.name.endsWith('.c') ? 'C' : file.name.endsWith('.py') ? 'Python' : 'Unknown',
          score: 85,
          quality: {
            complexity: 72,
            maintainability: 88,
            documentation: 65,
            testCoverage: 45,
          },
          issues: [
            { type: 'warning', line: 23, message: '变量命名不规范：建议使用驼峰命名法', severity: 'medium' },
            { type: 'error', line: 45, message: '潜在的空指针引用', severity: 'high' },
            { type: 'info', line: 67, message: '可以优化的循环结构', severity: 'low' },
          ],
          weaknesses: [
            { topic: '并发控制', detail: '缺少线程安全机制', suggestion: '建议学习互斥锁的使用' },
            { topic: '内存管理', detail: '存在内存泄漏风险', suggestion: '检查所有malloc是否有对应的free' },
          ],
          strengths: [
            '代码结构清晰',
            '变量命名基本规范',
            '注释较为完整',
          ],
          timeline: [
            { time: '2024-02-10', event: '创建文件', type: 'create' },
            { time: '2024-02-12', event: '添加进程调度函数', type: 'feature' },
            { time: '2024-02-14', event: '修复内存泄漏', type: 'fix' },
            { time: '2024-02-15', event: '优化算法性能', type: 'optimize' },
          ],
        });
        setIsAnalyzing(false);
      }, 2000);
    }
  };

  if (!analysisResult) {
    return (
      <div className="flex items-center justify-center h-full p-6">
        <div className="max-w-2xl w-full">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Upload className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">上传代码文件</h2>
            <p className="text-slate-600">上传你的代码文件，获取详细的质量分析和个性化学习建议</p>
          </div>

          <div className="bg-white rounded-xl border-2 border-dashed border-slate-300 p-12 text-center hover:border-indigo-400 transition-colors">
            <input
              type="file"
              id="file-upload"
              className="hidden"
              onChange={handleFileUpload}
              accept=".c,.cpp,.py,.java,.js,.ts"
            />
            <label htmlFor="file-upload" className="cursor-pointer">
              {uploadedFile ? (
                <div className="space-y-3">
                  <FileCode className="w-16 h-16 text-indigo-600 mx-auto" />
                  <div>
                    <p className="font-medium text-slate-900">{uploadedFile.name}</p>
                    <p className="text-sm text-slate-500">
                      {(uploadedFile.size / 1024).toFixed(2)} KB
                    </p>
                  </div>
                  {isAnalyzing && (
                    <div className="flex items-center justify-center gap-2 text-indigo-600">
                      <div className="w-5 h-5 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
                      <span className="text-sm">分析中...</span>
                    </div>
                  )}
                </div>
              ) : (
                <div className="space-y-3">
                  <Upload className="w-16 h-16 text-slate-400 mx-auto" />
                  <div>
                    <p className="text-lg font-medium text-slate-900">点击上传文件</p>
                    <p className="text-sm text-slate-500 mt-1">
                      支持 C, C++, Python, Java, JavaScript, TypeScript
                    </p>
                  </div>
                </div>
              )}
            </label>
          </div>

          <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="text-sm font-semibold text-blue-900 mb-2">📊 分析内容</h4>
            <ul className="text-xs text-blue-800 space-y-1">
              <li>• 代码质量评分（复杂度、可维护性、文档完整度）</li>
              <li>• 潜在问题检测（错误、警告、优化建议）</li>
              <li>• 个性化薄弱点分析</li>
              <li>• 学习建议和资源推荐</li>
            </ul>
          </div>
        </div>
      </div>
    );
  }

  // 显示分析结果
  return (
    <div className="p-6 space-y-6">
      {/* 顶部文件信息 */}
      <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg p-6 text-white">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-2">{analysisResult.fileName}</h2>
            <div className="flex items-center gap-4 text-sm opacity-90">
              <span>大小：{analysisResult.fileSize}</span>
              <span>•</span>
              <span>语言：{analysisResult.language}</span>
            </div>
          </div>
          <div className="text-right">
            <div className="text-4xl font-bold">{analysisResult.score}</div>
            <div className="text-sm opacity-90">综合得分</div>
          </div>
        </div>
      </div>

      {/* 代码质量指标 */}
      <div className="bg-white rounded-lg border border-slate-200 p-6">
        <h3 className="font-semibold text-slate-900 mb-4">代码质量指标</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Object.entries(analysisResult.quality).map(([key, value]) => (
            <div key={key} className="text-center">
              <div className="text-3xl font-bold mb-2" style={{ color: (value as number) >= 70 ? '#10b981' : (value as number) >= 50 ? '#f59e0b' : '#ef4444' }}>
                {value as number}
              </div>
              <div className="text-sm text-slate-600 capitalize">
                {key === 'complexity' ? '复杂度' : 
                 key === 'maintainability' ? '可维护性' :
                 key === 'documentation' ? '文档完整度' : '测试覆盖率'}
              </div>
              <div className="mt-2 h-2 bg-slate-100 rounded-full overflow-hidden">
                <div 
                  className={`h-full ${(value as number) >= 70 ? 'bg-green-500' : (value as number) >= 50 ? 'bg-yellow-500' : 'bg-red-500'}`}
                  style={{ width: `${value}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 代码问题 */}
      <div className="bg-white rounded-lg border border-slate-200 p-6">
        <h3 className="font-semibold text-slate-900 mb-4">代码问题</h3>
        <div className="space-y-3">
          {analysisResult.issues.map((issue: any, index: number) => (
            <div 
              key={index} 
              className={`flex items-start gap-3 p-4 rounded-lg border ${
                issue.severity === 'high' ? 'bg-red-50 border-red-200' :
                issue.severity === 'medium' ? 'bg-yellow-50 border-yellow-200' :
                'bg-blue-50 border-blue-200'
              }`}
            >
              {issue.severity === 'high' ? (
                <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              ) : issue.severity === 'medium' ? (
                <AlertTriangle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
              ) : (
                <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              )}
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className={`text-xs font-medium px-2 py-0.5 rounded ${
                    issue.severity === 'high' ? 'bg-red-100 text-red-700' :
                    issue.severity === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-blue-100 text-blue-700'
                  }`}>
                    {issue.type.toUpperCase()}
                  </span>
                  <span className="text-xs text-slate-500">行 {issue.line}</span>
                </div>
                <p className="text-sm text-slate-700">{issue.message}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 薄弱点分析 */}
      <div className="bg-white rounded-lg border border-slate-200 p-6">
        <h3 className="font-semibold text-slate-900 mb-4">💡 个性化薄弱点分析</h3>
        <div className="space-y-4">
          {analysisResult.weaknesses.map((weakness: any, index: number) => (
            <div key={index} className="bg-orange-50 border border-orange-200 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Target className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-slate-900 mb-1">{weakness.topic}</h4>
                  <p className="text-sm text-slate-700 mb-2">{weakness.detail}</p>
                  <div className="bg-white rounded px-3 py-2 text-sm text-green-700 border border-green-200">
                    <Lightbulb className="w-4 h-4 inline mr-1" />
                    {weakness.suggestion}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 代码优势 */}
      <div className="bg-white rounded-lg border border-slate-200 p-6">
        <h3 className="font-semibold text-slate-900 mb-4">✅ 代码优势</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {analysisResult.strengths.map((strength: string, index: number) => (
            <div key={index} className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-lg">
              <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
              <span className="text-sm text-slate-700">{strength}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 开发时间线 */}
      <div className="bg-white rounded-lg border border-slate-200 p-6">
        <h3 className="font-semibold text-slate-900 mb-4">📅 开发时间线</h3>
        <div className="space-y-3">
          {analysisResult.timeline.map((event: any, index: number) => (
            <div key={index} className="flex items-start gap-3">
              <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                event.type === 'create' ? 'bg-blue-500' :
                event.type === 'feature' ? 'bg-green-500' :
                event.type === 'fix' ? 'bg-red-500' : 'bg-purple-500'
              }`} />
              <div className="flex-1 pb-4 border-l border-slate-200 pl-4 -ml-1">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-slate-900">{event.event}</span>
                  <span className="text-xs text-slate-500">{event.time}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 操作按钮 */}
      <div className="flex gap-4">
        <button
          onClick={() => {
            setUploadedFile(null);
            setAnalysisResult(null);
          }}
          className="flex-1 px-6 py-3 bg-slate-200 text-slate-700 rounded-lg hover:bg-slate-300 font-medium"
        >
          重新上传
        </button>
        <button className="flex-1 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-medium">
          <Download className="w-5 h-5 inline mr-2" />
          下载分析报告
        </button>
      </div>
    </div>
  );
}