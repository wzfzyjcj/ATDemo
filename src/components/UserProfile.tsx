import { User, Clock, TrendingUp, Calendar, Award, BookOpen, Code, MessageSquare, FileText, AlertCircle, ArrowRight, X, Plus, CheckCircle } from 'lucide-react';
import RadarChart from './RadarChart';
import TrendChartModal from './TrendChartModal';
import { useState } from 'react';

interface UserProfileProps {
  isTeacher: boolean;
  pendingQuestions: Array<{student: string, question: string, time: string, answer?: string}>;
  selectedCourse: string;
  onCourseChange: (course: string) => void;
}

export default function UserProfile({ isTeacher, pendingQuestions, selectedCourse, onCourseChange }: UserProfileProps) {
  if (isTeacher) {
    return <TeacherDashboard pendingQuestions={pendingQuestions} />;
  }
  
  return <StudentDashboard selectedCourse={selectedCourse} onCourseChange={onCourseChange} />;
}

function StudentDashboard({ selectedCourse, onCourseChange }: { selectedCourse: string; onCourseChange: (course: string) => void }) {
  const courses = ['操作系统', '数据结构', '计算机网络', '数据库原理'];
  const [showTrendChart, setShowTrendChart] = useState(false);
  const [showPersonalizedLearning, setShowPersonalizedLearning] = useState(false);
  const [reviewStep, setReviewStep] = useState<'overview' | 'questions'>('overview');
  const [showOverview, setShowOverview] = useState(false);
  const [recommendedQuestions, setRecommendedQuestions] = useState<any[]>([]);
  const [selectedQuestionsToAdd, setSelectedQuestionsToAdd] = useState<number[]>([]);
  const [addedQuestions, setAddedQuestions] = useState<number[]>([]);
  const [expandedQuestion, setExpandedQuestion] = useState<number | null>(null);
  
  // 根据课程动态生成雷达图数据
  const getRadarDataByCourse = (course: string) => {
    const courseData: { [key: string]: Array<{ topic: string; value: number; average: number }> } = {
      '操作系统': [
        { topic: '进程管理', value: 87, average: 79 },
        { topic: '内存管理', value: 77, average: 75 },
        { topic: '文件系统', value: 96, average: 88 },
        { topic: '设备管理', value: 75, average: 71 },
        { topic: '并发控制', value: 68, average: 73 },
      ],
      '数据结构': [
        { topic: '线性结构', value: 92, average: 85 },
        { topic: '树形结构', value: 85, average: 80 },
        { topic: '图论算法', value: 78, average: 75 },
        { topic: '排序算法', value: 88, average: 82 },
        { topic: '查找算法', value: 90, average: 86 },
      ],
      '计算机网络': [
        { topic: '应用层', value: 88, average: 82 },
        { topic: '传输层', value: 82, average: 78 },
        { topic: '网络层', value: 75, average: 72 },
        { topic: '数据链路层', value: 80, average: 76 },
        { topic: '物理层', value: 85, average: 80 },
      ],
      '数据库原理': [
        { topic: 'SQL语言', value: 90, average: 85 },
        { topic: '关系模型', value: 85, average: 80 },
        { topic: '事务处理', value: 78, average: 75 },
        { topic: '索引优化', value: 82, average: 78 },
        { topic: '并发控制', value: 75, average: 72 },
      ],
    };
    return courseData[course] || courseData['操作系统'];
  };

  // 课程活动数据映射
  type ActivityType = 'code' | 'quiz' | 'qa' | 'knowledge';
  interface Activity {
    date: string;
    activity: string;
    type: ActivityType;
    score?: number;
    replies?: number;
    duration?: number;
  }

  const courseActivitiesData: { [course: string]: Activity[] } = {
    '操作系统': [
      { date: '2月15日', activity: '提交Lab3代码-进程调度', type: 'code', score: 88 },
      { date: '2月14日', activity: '完成操作系统测验', type: 'quiz', score: 85 },
      { date: '2月13日', activity: '提问进程调度问题', type: 'qa', replies: 3 },
      { date: '2月12日', activity: '学习知识点：虚拟内存', type: 'knowledge', duration: 45 },
    ],
    '数据结构': [
      { date: '2月15日', activity: '提交二叉树作业', type: 'code', score: 92 },
      { date: '2月13日', activity: '完成排序算法测验', type: 'quiz', score: 78 },
      { date: '2月11日', activity: '提问红黑树问题', type: 'qa', replies: 2 },
      { date: '2月10日', activity: '学习知识点：AVL树', type: 'knowledge', duration: 38 },
    ],
    '计算机网络': [
      { date: '2月14日', activity: '提交TCP协议分析', type: 'code', score: 85 },
      { date: '2月12日', activity: '完成网络层测验', type: 'quiz', score: 90 },
      { date: '2月11日', activity: '提问HTTP协议问题', type: 'qa', replies: 4 },
      { date: '2月9日', activity: '学习知识点：TCP三次握手', type: 'knowledge', duration: 52 },
    ],
    '数据库原理': [
      { date: '2月15日', activity: '提交SQL查询作业', type: 'code', score: 95 },
      { date: '2月13日', activity: '完成索引优化测验', type: 'quiz', score: 88 },
      { date: '2月10日', activity: '提问事务隔离问题', type: 'qa', replies: 5 },
      { date: '2月8日', activity: '学习知识点：ACID特性', type: 'knowledge', duration: 42 },
    ],
  };

  // 根据课程获取活动数据
  const getActivitiesByCourse = (course: string): Activity[] => {
    return courseActivitiesData[course] || courseActivitiesData['操作系统'];
  };

  const recentActivities = getActivitiesByCourse(selectedCourse);

  return (
    <div className="p-6 space-y-6">
      {/* 趋势图模态框 */}
      <TrendChartModal 
        isOpen={showTrendChart}
        onClose={() => setShowTrendChart(false)}
        selectedCourse={selectedCourse}
      />

      {/* 顶部信息卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* 个人信息 */}
        <div className="bg-white rounded-lg p-6 border border-slate-200">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center">
              <User className="w-8 h-8 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-slate-900">张三</h3>
              <p className="text-sm text-slate-600">学号：202401001</p>
              <div className="relative group mt-1">
                <button className="flex items-center gap-1 text-sm text-slate-600 hover:text-indigo-600 transition-colors">
                  <span>所在课程：{selectedCourse}</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div className="absolute left-0 mt-1 w-40 bg-white rounded-lg shadow-lg border border-slate-200 py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10">
                  {courses.map((course) => (
                    <button
                      key={course}
                      onClick={() => onCourseChange(course)}
                      className={`w-full px-4 py-2 text-left text-sm hover:bg-slate-50 ${
                        selectedCourse === course ? 'text-indigo-600 bg-indigo-50' : 'text-slate-600'
                      }`}
                    >
                      {course}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">理论扎实</span>
            <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">代码规范</span>
          </div>
        </div>

        {/* 学习概览 */}
        <div className="bg-white rounded-lg p-6 border border-slate-200">
          <h4 className="font-semibold text-slate-900 mb-4">学习概览</h4>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-indigo-600" />
                <span className="text-sm text-slate-600">本周学习时间</span>
              </div>
              <span className="font-semibold text-slate-900">12.5小时</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-green-600" />
                <span className="text-sm text-slate-600">连续活跃天数</span>
              </div>
              <span className="font-semibold text-slate-900">15天</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-amber-600" />
                <span className="text-sm text-slate-600">综合掌握度</span>
              </div>
              <span className="font-semibold text-slate-900">82%</span>
            </div>
          </div>
        </div>

        {/* 个性化推荐 */}
        <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg p-6 text-white">
          <h4 className="font-semibold mb-4">个性化推荐</h4>
          <div className="space-y-3">
            <div>
              <p className="text-sm opacity-90 mb-1">待巩固知识点</p>
              <p className="font-semibold">并发控制 · 信号量机制</p>
            </div>
            <div>
              <p className="text-sm opacity-90 mb-1">推荐练习</p>
              <p className="font-semibold">3道相关题目</p>
            </div>
            <button 
              onClick={() => {
                setShowPersonalizedLearning(true);
                setReviewStep('overview');
                setShowOverview(true);
                // 3秒后收束到上方并显示题目
                setTimeout(() => {
                  setShowOverview(false);
                  setReviewStep('questions');
                  setRecommendedQuestions([
                    { id: 201, title: '信号量机制如何解决生产者消费者问题？', type: '选择题', knowledge: '并发控制', source: '知识库', difficulty: 'medium', content: '请详细说明信号量机制在生产者消费者问题中的应用。' },
                    { id: 202, title: '实现一个基于信号量的线程同步程序', type: '编程题', knowledge: '并发控制', source: '网络爬取', difficulty: 'hard', content: '使用信号量实现多线程同步，确保线程安全。' },
                    { id: 203, title: '信号量与互斥锁的区别是什么？', type: '选择题', knowledge: '并发控制', source: '知识库', difficulty: 'easy', content: '请比较信号量和互斥锁的异同点。' },
                  ]);
                }, 3000);
              }}
              className="mt-2 w-full bg-white text-indigo-600 py-2 rounded-lg text-sm font-medium hover:bg-indigo-50 transition-colors"
            >
              开始学习
            </button>
          </div>
        </div>

        {/* 个性化学习弹窗 */}
        {showPersonalizedLearning && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-white">
            <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl border border-slate-200">
              {/* 知识点总览弹窗 - 显示3秒后收束到上方 */}
              {showOverview && (
                <div className="absolute inset-0 bg-white rounded-xl flex items-center justify-center animate-fade-out" style={{ animation: 'fadeOut 0.5s ease-out 2.5s forwards' }}>
                  <div className="text-center">
                    <div className="w-20 h-20 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                      <BookOpen className="w-10 h-10 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-3">个性化推荐知识点</h3>
                    <div className="bg-indigo-50 rounded-lg p-6 mb-4 inline-block">
                      <p className="text-lg font-semibold text-indigo-900">并发控制 · 信号量机制</p>
                      <p className="text-sm text-indigo-700 mt-2">掌握度：68% | 推荐练习：3道相关题目</p>
                    </div>
                    <div className="flex items-center justify-center gap-2 text-sm text-slate-500">
                      <div className="w-5 h-5 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
                      <span>Agent正在从知识库和网络爬取相关题目...</span>
                    </div>
                  </div>
                </div>
              )}

              {/* 主弹窗内容 */}
              <div className="h-full flex flex-col">
                {/* 收束后的知识点总览（固定在顶部） */}
                {reviewStep === 'questions' && (
                  <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-4 border-b border-indigo-300">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold text-lg">并发控制 · 信号量机制</h3>
                        <p className="text-sm opacity-90 mt-1">掌握度：68% | 推荐练习：{recommendedQuestions.length}道相关题目</p>
                      </div>
                      <button
                        onClick={() => {
                          setShowPersonalizedLearning(false);
                          setReviewStep('overview');
                          setShowOverview(false);
                          setRecommendedQuestions([]);
                          setSelectedQuestionsToAdd([]);
                          setExpandedQuestion(null);
                        }}
                        className="text-white hover:text-indigo-200"
                      >
                        <X className="w-6 h-6" />
                      </button>
                    </div>
                  </div>
                )}

                {/* 题目列表区域 */}
                {reviewStep === 'questions' && (
                  <div className="flex-1 overflow-y-auto p-6">
                    <div className="space-y-4">
                      {recommendedQuestions.map((q) => (
                        <div key={q.id} className="bg-white rounded-lg border-2 border-slate-200 hover:border-indigo-300 transition-colors">
                          <div className="p-4">
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <div className="flex items-center gap-3 mb-2">
                                  <h5 className="font-semibold text-slate-900 text-lg">{q.title}</h5>
                                  <span className={`px-2 py-1 rounded text-xs ${
                                    q.type === '编程题' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'
                                  }`}>
                                    {q.type}
                                  </span>
                                  <span className={`px-2 py-1 rounded text-xs ${
                                    q.difficulty === 'hard' ? 'bg-red-100 text-red-700' :
                                    q.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                                    'bg-green-100 text-green-700'
                                  }`}>
                                    {q.difficulty === 'hard' ? '困难' : q.difficulty === 'medium' ? '中等' : '简单'}
                                  </span>
                                </div>
                                <div className="flex items-center gap-3 text-sm text-slate-600 mb-3">
                                  <span>{q.knowledge}</span>
                                  <span>·</span>
                                  <span>来源：{q.source}</span>
                                </div>
                                
                                {/* 展开的题目详情 */}
                                {expandedQuestion === q.id && (
                                  <div className="mt-4 p-4 bg-slate-50 rounded-lg border border-slate-200">
                                    <p className="text-sm text-slate-700 mb-4">{q.content}</p>
                                    <div className="flex items-center gap-3">
                                      <button
                                        onClick={() => {
                                          // 跳转到智能问答
                                          window.location.href = '#qa';
                                        }}
                                        className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 text-sm font-medium flex items-center gap-2"
                                      >
                                        <MessageSquare className="w-4 h-4" />
                                        到智能问答
                                      </button>
                                      <button
                                        onClick={() => {
                                          if (!addedQuestions.includes(q.id)) {
                                            setAddedQuestions([...addedQuestions, q.id]);
                                            alert('已添加到我的题库');
                                          }
                                        }}
                                        disabled={addedQuestions.includes(q.id)}
                                        className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 ${
                                          addedQuestions.includes(q.id)
                                            ? 'bg-green-100 text-green-700 cursor-not-allowed'
                                            : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                                        }`}
                                      >
                                        {addedQuestions.includes(q.id) ? (
                                          <>
                                            <CheckCircle className="w-4 h-4" />
                                            已添加
                                          </>
                                        ) : (
                                          <>
                                            <Plus className="w-4 h-4" />
                                            添加进我的题库
                                          </>
                                        )}
                                      </button>
                                    </div>
                                  </div>
                                )}
                              </div>
                              <div className="ml-4 flex flex-col gap-2">
                                <button
                                  onClick={() => {
                                    if (expandedQuestion === q.id) {
                                      setExpandedQuestion(null);
                                    } else {
                                      setExpandedQuestion(q.id);
                                    }
                                  }}
                                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 text-sm font-medium whitespace-nowrap"
                                >
                                  {expandedQuestion === q.id ? '收起' : '开始做题'}
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 知识点掌握度 */}
      <div className="bg-white rounded-lg p-6 border border-slate-200">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-slate-900">知识点掌握度</h3>
          <span className="text-xs text-slate-500">课程：{selectedCourse}</span>
        </div>
        <div className="relative">
          <RadarChart data={getRadarDataByCourse(selectedCourse)} />
        </div>
      </div>

      {/* 近期活动时间线 */}
      <div className="bg-white rounded-lg p-6 border border-slate-200">
        <h4 className="font-semibold text-slate-900 mb-4">近期活动时间线</h4>
        <div className="space-y-4">
          {recentActivities.length === 0 ? (
            <div className="text-center py-8 text-slate-500">
              <BookOpen className="w-12 h-12 mx-auto mb-2 opacity-50" />
              <p className="text-sm">暂无{selectedCourse}课程的活动记录</p>
            </div>
          ) : (
            recentActivities.map((activity, index) => {
              const icons = {
                code: Code,
                quiz: FileText,
                qa: MessageSquare,
                knowledge: BookOpen,
              };
              const Icon = icons[activity.type as keyof typeof icons];

              return (
                <div key={index} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
                      <Icon className="w-5 h-5 text-indigo-600" />
                    </div>
                    {index < recentActivities.length - 1 && (
                      <div className="w-px h-8 bg-slate-200 my-1"></div>
                    )}
                  </div>
                  <div className="flex-1 pb-4">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm text-slate-500">{activity.date}</span>
                      <span className="text-sm font-medium text-slate-900">{activity.activity}</span>
                    </div>
                    {'score' in activity && (
                      <span className="text-sm text-slate-600">得分: {activity.score}/100</span>
                    )}
                    {'replies' in activity && (
                      <span className="text-sm text-slate-600">获得 {activity.replies} 条回复</span>
                    )}
                    {'duration' in activity && (
                      <span className="text-sm text-slate-600">学习时长: {activity.duration}分钟</span>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}

function TeacherDashboard({ pendingQuestions }: UserProfileProps) {
  const students = [
    { name: '张三', id: '001', course: 'OS', mastery: 85, codeScore: 88, activity: '高' },
    { name: '李四', id: '002', course: 'OS', mastery: 72, codeScore: 75, activity: '中' },
    { name: '王五', id: '003', course: 'OS', mastery: 91, codeScore: 94, activity: '高' },
    { name: '赵六', id: '004', course: 'OS', mastery: 68, codeScore: 70, activity: '低' },
    { name: '钱七', id: '005', course: 'OS', mastery: 79, codeScore: 82, activity: '中' },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* 待处理问题卡片 - 优化版 */}
      {pendingQuestions && pendingQuestions.length > 0 && (
        <div className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-lg border border-orange-200 p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                <AlertCircle className="w-5 h-5 text-orange-600" />
              </div>
              <h3 className="text-sm font-semibold text-slate-900">待解答问题</h3>
            </div>
            <span className="px-2.5 py-1 bg-orange-600 text-white rounded-full text-xs font-medium">
              {pendingQuestions.length}
            </span>
          </div>
          
          <div className="space-y-2">
            {pendingQuestions.slice(0, 2).map((item, index) => (
              <div key={index} className="flex items-start gap-3 p-3 bg-white rounded-lg border border-orange-100 hover:border-orange-300 transition-colors">
                <div className="w-7 h-7 bg-indigo-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs font-medium text-indigo-600">{item.student.charAt(0)}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-medium text-slate-900">{item.student}</span>
                    <span className="text-xs text-slate-500">{item.time}</span>
                  </div>
                  <p className="text-sm text-slate-700 line-clamp-1">{item.question}</p>
                </div>
                <button className="px-3 py-1.5 bg-indigo-600 text-white rounded-md text-xs font-medium hover:bg-indigo-700 transition-colors flex-shrink-0">
                  接取
                </button>
              </div>
            ))}
          </div>
          
          {pendingQuestions.length > 2 && (
            <button className="mt-3 w-full py-2 text-xs text-orange-600 hover:text-orange-700 font-medium flex items-center justify-center gap-1">
              查看全部 {pendingQuestions.length} 个问题
              <ArrowRight className="w-3 h-3" />
            </button>
          )}
        </div>
      )}

      <div className="flex items-center justify-between">
        <h2 className="font-semibold text-slate-900">学生信息汇总</h2>
        <div className="flex gap-2">
          <button className="px-4 py-2 border border-slate-200 rounded-lg text-sm hover:bg-slate-50">
            筛选
          </button>
          <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm hover:bg-indigo-700">
            导出数据
          </button>
        </div>
      </div>

      {/* 学生列表表格 */}
      <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                姓名
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                学号
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                课程
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                掌握度
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                代码评分
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                活跃度
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                操作
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-slate-200">
            {students.map((student, index) => (
              <tr key={index} className="hover:bg-slate-50 cursor-pointer">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center">
                      <span className="text-sm font-medium text-indigo-600">
                        {student.name.charAt(0)}
                      </span>
                    </div>
                    <span className="text-sm font-medium text-slate-900">{student.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                  {student.id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                  {student.course}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden w-20">
                      <div
                        className={`h-full ${
                          student.mastery >= 80 ? 'bg-green-500' : 
                          student.mastery >= 70 ? 'bg-yellow-500' : 'bg-red-500'
                        }`}
                        style={{ width: `${student.mastery}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium text-slate-900">{student.mastery}%</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">
                  {student.codeScore}/100
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    student.activity === '高' ? 'bg-green-100 text-green-700' :
                    student.activity === '中' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-red-100 text-red-700'
                  }`}>
                    {student.activity}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <button className="text-indigo-600 hover:text-indigo-700">
                    查看详情
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 统计卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg p-6 border border-slate-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-slate-600">总学生数</span>
            <User className="w-5 h-5 text-indigo-600" />
          </div>
          <p className="text-2xl font-bold text-slate-900">{students.length}</p>
        </div>
        
        <div className="bg-white rounded-lg p-6 border border-slate-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-slate-600">平均掌握度</span>
            <TrendingUp className="w-5 h-5 text-green-600" />
          </div>
          <p className="text-2xl font-bold text-slate-900">
            {Math.round(students.reduce((acc, s) => acc + s.mastery, 0) / students.length)}%
          </p>
        </div>
        
        <div className="bg-white rounded-lg p-6 border border-slate-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-slate-600">平均代码评分</span>
            <Code className="w-5 h-5 text-blue-600" />
          </div>
          <p className="text-2xl font-bold text-slate-900">
            {Math.round(students.reduce((acc, s) => acc + s.codeScore, 0) / students.length)}/100
          </p>
        </div>
        
        <div className="bg-white rounded-lg p-6 border border-slate-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-slate-600">高活跃学生</span>
            <Award className="w-5 h-5 text-amber-600" />
          </div>
          <p className="text-2xl font-bold text-slate-900">
            {students.filter(s => s.activity === '高').length}
          </p>
        </div>
      </div>
    </div>
  );
}