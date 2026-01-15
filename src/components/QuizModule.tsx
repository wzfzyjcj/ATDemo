import { useState } from 'react';
import { 
  BookOpen, Plus, Search, Filter, Download, Tag, Edit, Trash2, Eye, 
  Users, BarChart3, CheckCircle, Clock, TrendingUp, Target, Award,
  FileText, Lightbulb, ArrowRight, ChevronDown, X, Upload, MessageSquare
} from 'lucide-react';

interface QuizModuleProps {
  isTeacher: boolean;
  selectedCourse: string;
}

export default function QuizModule({ isTeacher, selectedCourse }: QuizModuleProps) {
  if (isTeacher) {
    return <TeacherQuizWorkbench selectedCourse={selectedCourse} />;
  }
  
  return <StudentQuizModule selectedCourse={selectedCourse} />;
}

// 教师端问卷测验工作台
function TeacherQuizWorkbench({ selectedCourse }: { selectedCourse: string }) {
  const [activeTab, setActiveTab] = useState<'bank' | 'compose' | 'grading' | 'analytics'>('bank');

  return (
    <div className="h-full flex flex-col bg-slate-50">
      {/* 顶部导航 */}
      <div className="bg-white border-b border-slate-200 px-6 py-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-slate-900">问卷测验工作台</h2>
          <div className="text-sm text-slate-600">课程：{selectedCourse}</div>
        </div>
        
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('bank')}
            className={`px-6 py-2.5 rounded-lg text-sm font-medium transition-all ${
              activeTab === 'bank'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <BookOpen className="w-4 h-4 inline mr-2" />
            题库管理
          </button>
          <button
            onClick={() => setActiveTab('compose')}
            className={`px-6 py-2.5 rounded-lg text-sm font-medium transition-all ${
              activeTab === 'compose'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <FileText className="w-4 h-4 inline mr-2" />
            智能组卷
          </button>
          <button
            onClick={() => setActiveTab('grading')}
            className={`px-6 py-2.5 rounded-lg text-sm font-medium transition-all ${
              activeTab === 'grading'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Edit className="w-4 h-4 inline mr-2" />
            测验批阅
          </button>
          <button
            onClick={() => setActiveTab('analytics')}
            className={`px-6 py-2.5 rounded-lg text-sm font-medium transition-all ${
              activeTab === 'analytics'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <BarChart3 className="w-4 h-4 inline mr-2" />
            学情分析
          </button>
        </div>
      </div>

      {/* 内容区域 */}
      <div className="flex-1 overflow-auto">
        {activeTab === 'bank' && <QuestionBankPanel />}
        {activeTab === 'compose' && <ComposePaperPanel />}
        {activeTab === 'grading' && <GradingPanel />}
        {activeTab === 'analytics' && <AnalyticsPanel selectedCourse={selectedCourse} />}
      </div>
    </div>
  );
}

// 题库管理面板
function QuestionBankPanel() {
  const [searchQuery, setSearchQuery] = useState('');
  const [knowledgeFilter, setKnowledgeFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [difficultyFilter, setDifficultyFilter] = useState('all');
  const [sourceFilter, setSourceFilter] = useState('all');
  const [selectedQuestion, setSelectedQuestion] = useState<any>(null);
  const [showNewQuestionModal, setShowNewQuestionModal] = useState(false);
  const [selectedQuestions, setSelectedQuestions] = useState<number[]>([]);

  const questions = [
    { id: 1, content: '进程和线程的主要区别是什么？', type: '简答题', knowledge: '进程管理', difficulty: '中等', source: '教师出题', created: '2024-02-10', usage: 15, avgCorrect: 78 },
    { id: 2, content: '虚拟内存的主要作用是？', type: '单选题', knowledge: '内存管理', difficulty: '简单', source: 'AI生成', created: '2024-02-12', usage: 23, avgCorrect: 85 },
    { id: 3, content: '实现LRU页面置换算法', type: '编程题', knowledge: '内存管理', difficulty: '困难', source: '教师出题', created: '2024-02-08', usage: 8, avgCorrect: 62 },
    { id: 4, content: '以下哪些属于死锁的必要条件？', type: '多选题', knowledge: '进程管理', difficulty: '中等', source: '题库导入', created: '2024-02-11', usage: 19, avgCorrect: 72 },
    { id: 5, content: '解释文件系统的inode结构', type: '简答题', knowledge: '文件系统', difficulty: '困难', source: '教师出题', created: '2024-02-09', usage: 12, avgCorrect: 68 },
  ];

  const stats = {
    total: questions.length,
    pending: 2,
    newThisMonth: 3,
    coverage: 85,
  };

  return (
    <div className="p-6 space-y-6">
      {/* 统计卡片 */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-white rounded-lg p-4 border border-slate-200">
          <div className="text-sm text-slate-600 mb-1">总题目数</div>
          <div className="text-2xl font-bold text-slate-900">{stats.total}</div>
        </div>
        <div className="bg-white rounded-lg p-4 border border-slate-200">
          <div className="text-sm text-slate-600 mb-1">待审核题目</div>
          <div className="text-2xl font-bold text-orange-600">{stats.pending}</div>
        </div>
        <div className="bg-white rounded-lg p-4 border border-slate-200">
          <div className="text-sm text-slate-600 mb-1">本月新增</div>
          <div className="text-2xl font-bold text-green-600">{stats.newThisMonth}</div>
        </div>
        <div className="bg-white rounded-lg p-4 border border-slate-200">
          <div className="text-sm text-slate-600 mb-1">知识点覆盖率</div>
          <div className="text-2xl font-bold text-indigo-600">{stats.coverage}%</div>
        </div>
      </div>

      {/* 筛选栏 */}
      <div className="bg-white rounded-lg p-4 border border-slate-200">
        <div className="grid grid-cols-5 gap-4">
          <div className="col-span-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="搜索题目内容..."
                className="w-full pl-9 pr-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>
          <select
            value={knowledgeFilter}
            onChange={(e) => setKnowledgeFilter(e.target.value)}
            className="px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="all">全部知识点</option>
            <option value="process">进程管理</option>
            <option value="memory">内存管理</option>
            <option value="file">文件系统</option>
          </select>
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="all">全部题型</option>
            <option value="single">单选题</option>
            <option value="multiple">多选题</option>
            <option value="short">简答题</option>
            <option value="code">编程题</option>
          </select>
          <select
            value={difficultyFilter}
            onChange={(e) => setDifficultyFilter(e.target.value)}
            className="px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="all">全部难度</option>
            <option value="easy">简单</option>
            <option value="medium">中等</option>
            <option value="hard">困难</option>
          </select>
          <select
            value={sourceFilter}
            onChange={(e) => setSourceFilter(e.target.value)}
            className="px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="all">全部来源</option>
            <option value="teacher">教师出题</option>
            <option value="ai">AI生成</option>
            <option value="import">题库导入</option>
          </select>
        </div>
        <div className="flex items-center gap-2 mt-4">
          <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm hover:bg-indigo-700 flex items-center gap-2">
            <Plus className="w-4 h-4" />
            新建题目
          </button>
          <button className="px-4 py-2 border border-slate-200 rounded-lg text-sm text-slate-600 hover:bg-slate-50 flex items-center gap-2">
            <Upload className="w-4 h-4" />
            导入题库
          </button>
          <button className="px-4 py-2 border border-slate-200 rounded-lg text-sm text-slate-600 hover:bg-slate-50 flex items-center gap-2">
            <Lightbulb className="w-4 h-4" />
            AI生成题目
          </button>
        </div>
      </div>

      {/* 题目列表 */}
      <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="px-4 py-3 text-left">
                <input type="checkbox" className="rounded" />
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase">ID</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase">题目预览</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase">题型</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase">知识点</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase">难度</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase">来源</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase">使用次数</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase">正确率</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase">操作</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {questions.map((q) => (
              <tr key={q.id} className="hover:bg-slate-50">
                <td className="px-4 py-3">
                  <input type="checkbox" className="rounded" />
                </td>
                <td className="px-4 py-3 text-sm text-slate-600">{q.id}</td>
                <td className="px-4 py-3 text-sm text-slate-900 max-w-md truncate">{q.content}</td>
                <td className="px-4 py-3">
                  <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs">{q.type}</span>
                </td>
                <td className="px-4 py-3 text-sm text-slate-600">{q.knowledge}</td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    q.difficulty === '简单' ? 'bg-green-100 text-green-700' :
                    q.difficulty === '中等' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-red-100 text-red-700'
                  }`}>{q.difficulty}</span>
                </td>
                <td className="px-4 py-3 text-sm text-slate-600">{q.source}</td>
                <td className="px-4 py-3 text-sm text-slate-600">{q.usage}次</td>
                <td className="px-4 py-3 text-sm text-slate-600">{q.avgCorrect}%</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => setSelectedQuestion(q)}
                      className="text-indigo-600 hover:text-indigo-700 text-xs"
                    >
                      预览
                    </button>
                    <button className="text-slate-600 hover:text-slate-700 text-xs">编辑</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 批量操作 */}
      <div className="flex items-center gap-2">
        <button className="px-4 py-2 border border-slate-200 rounded-lg text-sm text-slate-600 hover:bg-slate-50 flex items-center gap-2">
          <Tag className="w-4 h-4" />
          批量修改知识点
        </button>
        <button className="px-4 py-2 border border-slate-200 rounded-lg text-sm text-slate-600 hover:bg-slate-50 flex items-center gap-2">
          <Filter className="w-4 h-4" />
          批量调整难度
        </button>
        <button className="px-4 py-2 border border-slate-200 rounded-lg text-sm text-slate-600 hover:bg-slate-50 flex items-center gap-2">
          <Download className="w-4 h-4" />
          批量导出
        </button>
        <button className="px-4 py-2 border border-slate-200 rounded-lg text-sm text-red-600 hover:bg-red-50 flex items-center gap-2">
          <Trash2 className="w-4 h-4" />
          批量删除
        </button>
      </div>

      {/* 题目预览模态框 */}
      {selectedQuestion && (
        <QuestionPreviewModal 
          question={selectedQuestion}
          onClose={() => setSelectedQuestion(null)}
        />
      )}

      {/* 新建题目模态框 */}
      {showNewQuestionModal && (
        <NewQuestionModal 
          onClose={() => setShowNewQuestionModal(false)}
        />
      )}
    </div>
  );
}

// 题目预览模态框
function QuestionPreviewModal({ question, onClose }: { question: any; onClose: () => void }) {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-8">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-slate-200">
          <h3 className="font-semibold text-slate-900">题目预览</h3>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-6 space-y-4">
          <div>
            <div className="text-sm text-slate-600 mb-2">题目类型：{question.type}</div>
            <div className="text-lg font-medium text-slate-900 mb-4">{question.content}</div>
          </div>
          <div className="bg-slate-50 rounded-lg p-4">
            <div className="text-sm font-medium text-slate-700 mb-2">参考答案</div>
            <p className="text-sm text-slate-600">【此处显示参考答案】</p>
          </div>
          <div className="bg-blue-50 rounded-lg p-4">
            <div className="text-sm font-medium text-blue-900 mb-2">答案��析</div>
            <p className="text-sm text-blue-700">【此处显示答案解析】</p>
          </div>
          <div className="flex items-center gap-4 text-sm text-slate-600">
            <span>使用次数：{question.usage}次</span>
            <span>平均正确率：{question.avgCorrect}%</span>
          </div>
        </div>
        <div className="p-6 border-t border-slate-200 flex gap-3">
          <button className="flex-1 px-4 py-2 border border-slate-200 rounded-lg hover:bg-slate-50">
            编辑题目
          </button>
          <button className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
            添加到试卷
          </button>
        </div>
      </div>
    </div>
  );
}

// 新建题目模态框
function NewQuestionModal({ onClose }: { onClose: () => void }) {
  const [questionType, setQuestionType] = useState('single');
  const [questionContent, setQuestionContent] = useState('');
  const [questionKnowledge, setQuestionKnowledge] = useState('process');
  const [questionDifficulty, setQuestionDifficulty] = useState('medium');
  const [questionSource, setQuestionSource] = useState('teacher');
  const [questionAnswer, setQuestionAnswer] = useState('');
  const [questionAnalysis, setQuestionAnalysis] = useState('');

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-8">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full">
        <div className="flex items-center justify-between p-6 border-b border-slate-200">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center">
              <Plus className="w-5 h-5 text-indigo-600" />
            </div>
            <h3 className="font-semibold text-slate-900">新建题目</h3>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="p-6 space-y-4">
          <div>
            <label className="text-sm font-medium text-slate-700 mb-2 block">题目类型</label>
            <select
              value={questionType}
              onChange={(e) => setQuestionType(e.target.value)}
              className="w-full px-3 py-2 border border-slate-200 rounded-lg"
            >
              <option value="single">单选题</option>
              <option value="multiple">多选题</option>
              <option value="short">简答题</option>
              <option value="code">编程题</option>
            </select>
          </div>

          <div>
            <label className="text-sm font-medium text-slate-700 mb-2 block">题目内容</label>
            <textarea
              value={questionContent}
              onChange={(e) => setQuestionContent(e.target.value)}
              placeholder="输入题目内容..."
              rows={4}
              className="w-full px-3 py-2 border border-slate-200 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-slate-700 mb-2 block">知识点</label>
            <select
              value={questionKnowledge}
              onChange={(e) => setQuestionKnowledge(e.target.value)}
              className="w-full px-3 py-2 border border-slate-200 rounded-lg"
            >
              <option value="process">进程管理</option>
              <option value="memory">内存管理</option>
              <option value="file">文件系统</option>
            </select>
          </div>

          <div>
            <label className="text-sm font-medium text-slate-700 mb-2 block">难度</label>
            <select
              value={questionDifficulty}
              onChange={(e) => setQuestionDifficulty(e.target.value)}
              className="w-full px-3 py-2 border border-slate-200 rounded-lg"
            >
              <option value="easy">简单</option>
              <option value="medium">中等</option>
              <option value="hard">困难</option>
            </select>
          </div>

          <div>
            <label className="text-sm font-medium text-slate-700 mb-2 block">来源</label>
            <select
              value={questionSource}
              onChange={(e) => setQuestionSource(e.target.value)}
              className="w-full px-3 py-2 border border-slate-200 rounded-lg"
            >
              <option value="teacher">教师出题</option>
              <option value="ai">AI生成</option>
              <option value="import">题库导入</option>
            </select>
          </div>

          <div>
            <label className="text-sm font-medium text-slate-700 mb-2 block">参考答案</label>
            <textarea
              value={questionAnswer}
              onChange={(e) => setQuestionAnswer(e.target.value)}
              placeholder="输入参考答案..."
              rows={4}
              className="w-full px-3 py-2 border border-slate-200 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-slate-700 mb-2 block">答案解析</label>
            <textarea
              value={questionAnalysis}
              onChange={(e) => setQuestionAnalysis(e.target.value)}
              placeholder="输入答案解析..."
              rows={4}
              className="w-full px-3 py-2 border border-slate-200 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <button className="w-full px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 flex items-center justify-center gap-2">
            <Plus className="w-5 h-5" />
            创建题目
          </button>
        </div>
      </div>
    </div>
  );
}

// 智能组卷面板
function ComposePaperPanel() {
  const [showAIAssistant, setShowAIAssistant] = useState(false);
  const [paperTitle, setPaperTitle] = useState('');
  const [selectedQuestions, setSelectedQuestions] = useState<any[]>([]);

  return (
    <div className="h-full flex gap-6 p-6">
      {/* 左侧：题库池 */}
      <div className="w-80 bg-white rounded-lg border border-slate-200 p-4 flex flex-col">
        <h3 className="font-semibold text-slate-900 mb-4">题库池</h3>
        <div className="flex-1 overflow-auto space-y-3">
          {[1, 2, 3, 4, 5].map((id) => (
            <div key={id} className="p-3 border border-slate-200 rounded-lg hover:border-indigo-300 cursor-pointer">
              <div className="flex items-start gap-2 mb-2">
                <span className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded text-xs">单选</span>
                <span className="px-2 py-0.5 bg-yellow-100 text-yellow-700 rounded text-xs">中等</span>
              </div>
              <p className="text-sm text-slate-700">进程和线程的主要区别是什么？</p>
            </div>
          ))}
        </div>
      </div>

      {/* 中间：试卷编辑区 */}
      <div className="flex-1 bg-white rounded-lg border border-slate-200 p-6 flex flex-col">
        <div className="mb-4">
          <input
            type="text"
            value={paperTitle}
            onChange={(e) => setPaperTitle(e.target.value)}
            placeholder="输入试卷标题..."
            className="w-full px-4 py-2 border border-slate-200 rounded-lg font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="flex-1 overflow-auto space-y-3 mb-4">
          {selectedQuestions.length === 0 ? (
            <div className="h-full flex items-center justify-center text-slate-400">
              从左侧拖拽题目到此处，或点击"AI组卷"快速生成
            </div>
          ) : (
            selectedQuestions.map((q, idx) => (
              <div key={idx} className="p-4 border border-slate-200 rounded-lg">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="font-medium text-slate-900 mb-2">题目 {idx + 1}</div>
                    <p className="text-sm text-slate-600">{q.content}</p>
                  </div>
                  <button className="text-red-600 hover:text-red-700">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="bg-slate-50 rounded-lg p-4">
          <div className="grid grid-cols-4 gap-4 text-sm">
            <div>
              <span className="text-slate-600">总题数：</span>
              <span className="font-semibold text-slate-900">{selectedQuestions.length}</span>
            </div>
            <div>
              <span className="text-slate-600">总分值：</span>
              <span className="font-semibold text-slate-900">100</span>
            </div>
            <div>
              <span className="text-slate-600">预估时长：</span>
              <span className="font-semibold text-slate-900">60分钟</span>
            </div>
            <div>
              <span className="text-slate-600">难度：</span>
              <span className="font-semibold text-yellow-600">中等</span>
            </div>
          </div>
        </div>
      </div>

      {/* 右侧：试卷设置 */}
      <div className="w-80 bg-white rounded-lg border border-slate-200 p-4 space-y-4">
        <h3 className="font-semibold text-slate-900">试卷设置</h3>
        
        <div>
          <label className="text-sm font-medium text-slate-700 mb-2 block">考试时长（分钟）</label>
          <input type="number" defaultValue={60} className="w-full px-3 py-2 border border-slate-200 rounded-lg" />
        </div>

        <div>
          <label className="text-sm font-medium text-slate-700 mb-2 block">开放时间</label>
          <input type="datetime-local" className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm" />
        </div>

        <div>
          <label className="text-sm font-medium text-slate-700 mb-2 block">结束时间</label>
          <input type="datetime-local" className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm" />
        </div>

        <div>
          <label className="text-sm font-medium text-slate-700 mb-2 block">发布班级</label>
          <div className="space-y-2">
            <label className="flex items-center gap-2">
              <input type="checkbox" className="rounded" />
              <span className="text-sm text-slate-600">操作系统A班</span>
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" className="rounded" />
              <span className="text-sm text-slate-600">操作系统B班</span>
            </label>
          </div>
        </div>

        <details className="border-t border-slate-200 pt-4">
          <summary className="text-sm font-medium text-slate-700 cursor-pointer">高级设置</summary>
          <div className="mt-3 space-y-3">
            <label className="flex items-center gap-2">
              <input type="checkbox" className="rounded" />
              <span className="text-sm text-slate-600">题目随机乱序</span>
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" className="rounded" />
              <span className="text-sm text-slate-600">允许重考</span>
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" className="rounded" />
              <span className="text-sm text-slate-600">考后显示答案</span>
            </label>
          </div>
        </details>

        <div className="space-y-2 pt-4 border-t border-slate-200">
          <button 
            onClick={() => setShowAIAssistant(true)}
            className="w-full px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 flex items-center justify-center gap-2"
          >
            <Lightbulb className="w-4 h-4" />
            AI组卷助手
          </button>
          <button className="w-full px-4 py-2 border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50">
            保存为模板
          </button>
          <button className="w-full px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
            发布测验
          </button>
        </div>
      </div>

      {/* AI组卷助手 */}
      {showAIAssistant && (
        <AIAssistantModal onClose={() => setShowAIAssistant(false)} />
      )}
    </div>
  );
}

// AI组卷助手模态框
function AIAssistantModal({ onClose }: { onClose: () => void }) {
  const [prompt, setPrompt] = useState('');

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-8">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full">
        <div className="flex items-center justify-between p-6 border-b border-slate-200">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
              <Lightbulb className="w-5 h-5 text-purple-600" />
            </div>
            <h3 className="font-semibold text-slate-900">AI组卷助手</h3>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="p-6 space-y-4">
          <div>
            <label className="text-sm font-medium text-slate-700 mb-2 block">描述您的需求</label>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="例如：生成一份关于进程管理的测验，包含5道选择题、2道简答题，难度中等"
              rows={4}
              className="w-full px-3 py-2 border border-slate-200 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <button className="w-full px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 flex items-center justify-center gap-2">
            <Lightbulb className="w-5 h-5" />
            生成试卷
          </button>

          <div className="bg-purple-50 rounded-lg p-4">
            <div className="text-sm font-medium text-purple-900 mb-2">💡 推荐模板</div>
            <div className="space-y-2">
              <button className="w-full text-left px-3 py-2 bg-white rounded-lg text-sm text-slate-700 hover:bg-purple-100">
                期中考试标准模板（10道选择+3道简答+1道编程）
              </button>
              <button className="w-full text-left px-3 py-2 bg-white rounded-lg text-sm text-slate-700 hover:bg-purple-100">
                快速测验模板（5道选择+1道简答）
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// 测验批阅面板
function GradingPanel() {
  const [selectedQuiz, setSelectedQuiz] = useState<any>(null);

  const quizzes = [
    { id: 1, name: 'Lab3测验-进程调度', class: '操作系统A班', submitted: 28, total: 30, pending: 5, published: '2024-02-15' },
    { id: 2, name: '期中测验', class: '操作系统A班', submitted: 30, total: 30, pending: 0, published: '2024-02-10' },
    { id: 3, name: '内存管理专题测验', class: '操作系统B班', submitted: 25, total: 28, pending: 3, published: '2024-02-12' },
  ];

  return (
    <div className="p-6 space-y-6">
      <div>
        <h3 className="font-semibold text-slate-900 mb-4">测验列表</h3>
        <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">测验名称</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">发布班级</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">提交情况</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">待批改数</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {quizzes.map((quiz) => (
                <tr key={quiz.id} className="hover:bg-slate-50">
                  <td className="px-6 py-4 text-sm font-medium text-slate-900">{quiz.name}</td>
                  <td className="px-6 py-4 text-sm text-slate-600">{quiz.class}</td>
                  <td className="px-6 py-4 text-sm text-slate-600">{quiz.submitted}/{quiz.total}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      quiz.pending === 0 ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'
                    }`}>
                      {quiz.pending}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button 
                      onClick={() => setSelectedQuiz(quiz)}
                      className="text-indigo-600 hover:text-indigo-700 text-sm font-medium"
                    >
                      进入批阅
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {selectedQuiz && (
        <GradingInterface quiz={selectedQuiz} onClose={() => setSelectedQuiz(null)} />
      )}
    </div>
  );
}

// 批阅界面
function GradingInterface({ quiz, onClose }: { quiz: any; onClose: () => void }) {
  const [currentStudentIndex, setCurrentStudentIndex] = useState(0);
  const students = ['张三', '李四', '王五'];

  return (
    <div className="fixed inset-0 bg-slate-50 z-50 overflow-auto">
      <div className="bg-white border-b border-slate-200 px-6 py-4 sticky top-0">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold text-slate-900">{quiz.name} - 批阅</h2>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setCurrentStudentIndex(Math.max(0, currentStudentIndex - 1))}
              disabled={currentStudentIndex === 0}
              className="px-4 py-2 border border-slate-200 rounded-lg text-sm disabled:opacity-50"
            >
              ← 上一个学生
            </button>
            <span className="text-sm text-slate-600">
              {students[currentStudentIndex]} ({currentStudentIndex + 1}/{students.length})
            </span>
            <button
              onClick={() => setCurrentStudentIndex(Math.min(students.length - 1, currentStudentIndex + 1))}
              disabled={currentStudentIndex === students.length - 1}
              className="px-4 py-2 border border-slate-200 rounded-lg text-sm disabled:opacity-50"
            >
              下一个学生 →
            </button>
            <button onClick={onClose} className="px-4 py-2 bg-slate-200 rounded-lg text-sm">
              返回列表
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-6 space-y-6">
        {/* 题目批阅区 */}
        <div className="bg-white rounded-lg border border-slate-200 p-6">
          <h3 className="font-semibold text-slate-900 mb-4">题目1：进程和线程的主要区别</h3>
          
          <div className="mb-4">
            <div className="text-sm font-medium text-slate-700 mb-2">学生答案：</div>
            <div className="p-4 bg-slate-50 rounded-lg">
              <p className="text-sm text-slate-700">
                进程是资源分配的基本单位，线程是CPU调度的基本单位...
              </p>
            </div>
          </div>

          <details className="mb-4">
            <summary className="text-sm font-medium text-slate-700 cursor-pointer">查看参考答案</summary>
            <div className="mt-2 p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-900">【参考答案内容】</p>
            </div>
          </details>

          <div className="space-y-3">
            <div>
              <label className="text-sm font-medium text-slate-700 mb-2 block">评分</label>
              <div className="flex items-center gap-4">
                <input
                  type="range"
                  min="0"
                  max="10"
                  defaultValue="8"
                  className="flex-1"
                />
                <input
                  type="number"
                  min="0"
                  max="10"
                  defaultValue="8"
                  className="w-20 px-3 py-2 border border-slate-200 rounded-lg text-center"
                />
                <span className="text-slate-600">/10</span>
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-slate-700 mb-2 block">评语</label>
              <textarea
                rows={3}
                placeholder="输入评语..."
                className="w-full px-3 py-2 border border-slate-200 rounded-lg resize-none"
              />
            </div>
          </div>
        </div>

        {/* 底部操作栏 */}
        <div className="flex gap-3">
          <button className="flex-1 px-6 py-3 border border-slate-200 rounded-lg hover:bg-slate-50">
            暂存批注
          </button>
          <button className="flex-1 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
            保存并下一份
          </button>
        </div>
      </div>
    </div>
  );
}

// 学情分析面板
function AnalyticsPanel({ selectedCourse }: { selectedCourse: string }) {
  return (
    <div className="p-6 space-y-6">
      {/* 测验选择 */}
      <div className="bg-white rounded-lg p-4 border border-slate-200">
        <select className="w-full px-4 py-2 border border-slate-200 rounded-lg">
          <option>选择测验进行分析</option>
          <option>Lab3测验-进程调度</option>
          <option>期中测验</option>
        </select>
      </div>

      {/* 概览卡片 */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-white rounded-lg p-6 border border-slate-200">
          <div className="flex items-center gap-2 mb-2">
            <Award className="w-5 h-5 text-indigo-600" />
            <span className="text-sm text-slate-600">平均分</span>
          </div>
          <div className="text-3xl font-bold text-slate-900">78.5</div>
        </div>
        <div className="bg-white rounded-lg p-6 border border-slate-200">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-5 h-5 text-green-600" />
            <span className="text-sm text-slate-600">最高分</span>
          </div>
          <div className="text-3xl font-bold text-slate-900">95</div>
        </div>
        <div className="bg-white rounded-lg p-6 border border-slate-200">
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle className="w-5 h-5 text-blue-600" />
            <span className="text-sm text-slate-600">完成率</span>
          </div>
          <div className="text-3xl font-bold text-slate-900">93%</div>
        </div>
        <div className="bg-white rounded-lg p-6 border border-slate-200">
          <div className="flex items-center gap-2 mb-2">
            <Clock className="w-5 h-5 text-orange-600" />
            <span className="text-sm text-slate-600">平均用时</span>
          </div>
          <div className="text-3xl font-bold text-slate-900">45min</div>
        </div>
      </div>

      {/* 分数分布 */}
      <div className="bg-white rounded-lg p-6 border border-slate-200">
        <h3 className="font-semibold text-slate-900 mb-4">分数段分布</h3>
        <div className="space-y-3">
          {[
            { range: '90-100分', count: 5, percent: 20, color: 'bg-green-500' },
            { range: '80-89分', count: 8, percent: 32, color: 'bg-blue-500' },
            { range: '70-79分', count: 10, percent: 40, color: 'bg-yellow-500' },
            { range: '60-69分', count: 2, percent: 8, color: 'bg-orange-500' },
          ].map((item) => (
            <div key={item.range}>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm text-slate-600">{item.range}</span>
                <span className="text-sm text-slate-600">{item.count}人 ({item.percent}%)</span>
              </div>
              <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                <div className={`h-full ${item.color}`} style={{ width: `${item.percent}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 知识点掌握热力图 */}
      <div className="bg-white rounded-lg p-6 border border-slate-200">
        <h3 className="font-semibold text-slate-900 mb-4">知识点掌握热力图</h3>
        <div className="grid grid-cols-5 gap-3">
          {['进程管理', '内存管理', '文件系统', '设备管理', '并发控制'].map((topic, idx) => {
            const scores = [85, 72, 90, 68, 75];
            return (
              <div
                key={topic}
                className={`p-4 rounded-lg text-center ${
                  scores[idx] >= 80 ? 'bg-green-100' :
                  scores[idx] >= 70 ? 'bg-yellow-100' :
                  'bg-red-100'
                }`}
              >
                <div className="text-sm font-medium text-slate-900 mb-1">{topic}</div>
                <div className="text-xl font-bold">{scores[idx]}%</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// 学生端问卷测验
function StudentQuizModule({ selectedCourse }: { selectedCourse: string }) {
  const [selectedQuiz, setSelectedQuiz] = useState<any>(null);

  const quizzes = [
    { id: 1, title: 'Lab3测验-进程调度', deadline: '2024-02-20 23:59', status: 'pending', questions: 8, duration: 60 },
    { id: 2, title: '期中测验', deadline: '2024-02-18 23:59', status: 'completed', score: 85, questions: 15, duration: 90 },
    { id: 3, title: '内存管理专题测验', deadline: '2024-02-25 23:59', status: 'available', questions: 10, duration: 45 },
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-slate-900">问卷测验</h2>
        <div className="text-sm text-slate-600">课程：{selectedCourse}</div>
      </div>

      {/* 测验列表 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {quizzes.map((quiz) => (
          <div key={quiz.id} className="bg-white rounded-lg border border-slate-200 p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="font-semibold text-slate-900 mb-1">{quiz.title}</h3>
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <Clock className="w-4 h-4" />
                  <span>{quiz.duration}分钟</span>
                  <span>·</span>
                  <span>{quiz.questions}道题</span>
                </div>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                quiz.status === 'completed' ? 'bg-green-100 text-green-700' :
                quiz.status === 'pending' ? 'bg-orange-100 text-orange-700' :
                'bg-blue-100 text-blue-700'
              }`}>
                {quiz.status === 'completed' ? '已完成' :
                 quiz.status === 'pending' ? '待批改' : '可参加'}
              </span>
            </div>

            <div className="text-sm text-slate-600 mb-4">
              截止时间：{quiz.deadline}
            </div>

            {quiz.status === 'completed' && quiz.score && (
              <div className="bg-green-50 rounded-lg p-3 mb-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-green-700">得分</span>
                  <span className="text-2xl font-bold text-green-700">{quiz.score}/100</span>
                </div>
              </div>
            )}

            <button className={`w-full px-4 py-2 rounded-lg font-medium ${
              quiz.status === 'completed' ? 'bg-slate-100 text-slate-600' :
              'bg-indigo-600 text-white hover:bg-indigo-700'
            }`}>
              {quiz.status === 'completed' ? '查看结果' :
               quiz.status === 'pending' ? '等待批改' : '开始测验'}
            </button>
          </div>
        ))}
      </div>

      {/* 错题本 */}
      <div className="bg-white rounded-lg border border-slate-200 p-6">
        <h3 className="font-semibold text-slate-900 mb-4">我的错题本</h3>
        <div className="space-y-3">
          {[1, 2].map((id) => (
            <div key={id} className="p-4 bg-red-50 rounded-lg border border-red-100">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="text-sm font-medium text-slate-900 mb-1">进程调度算法相关题目</div>
                  <div className="text-sm text-slate-600">来源：Lab3测验 · 错误次数：1次</div>
                </div>
                <button className="text-indigo-600 hover:text-indigo-700 text-sm font-medium">
                  再次练习
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}