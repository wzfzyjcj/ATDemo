import { AlertCircle, Clock, User, ArrowRight, Bell, Construction, ChevronDown } from 'lucide-react';
import { useState } from 'react';

interface TeacherHomeProps {
  pendingQuestions: Array<{student: string, question: string, time: string, answer?: string}>;
}

export default function TeacherHome({ pendingQuestions }: TeacherHomeProps) {
  const [selectedClass, setSelectedClass] = useState('计科2201班');
  const [showClassDropdown, setShowClassDropdown] = useState(false);

  const classes = [
    { id: '1', name: '计科2201班', studentCount: 45, pendingCount: 3 },
    { id: '2', name: '计科2202班', studentCount: 42, pendingCount: 1 },
    { id: '3', name: '软工2201班', studentCount: 48, pendingCount: 2 },
    { id: '4', name: '软工2202班', studentCount: 46, pendingCount: 0 },
  ];

  // 根据班级筛选问题（实际应用中这里会从后端获取数据）
  const getQuestionsByClass = (className: string) => {
    // 模拟不同班级的问题数据
    const questionsByClass: { [key: string]: Array<{student: string, question: string, time: string, answer?: string}> } = {
      '计科2201班': [
        { student: '张三', question: '进程调度算法中，时间片轮转算法的时间片大小如何确定？', time: '5分钟前' },
        { student: '李四', question: '死锁的四个必要条件能否详细解释一下？', time: '15分钟前' },
        { student: '王五', question: 'LRU页面置换算法的具体实现方式是什么？', time: '1小时前' },
      ],
      '计科2202班': [
        { student: '赵六', question: '虚拟内存和物理内存的区别是什么？', time: '30分钟前' },
      ],
      '软工2201班': [
        { student: '孙七', question: '进程和线程的本质区别在哪里？', time: '2小时前' },
        { student: '周八', question: '信号量机制如何解决生产者消费者问题？', time: '3小时前' },
      ],
      '软工2202班': [],
    };
    return questionsByClass[className] || [];
  };

  const currentClassData = classes.find(c => c.name === selectedClass);
  const currentQuestions = getQuestionsByClass(selectedClass);

  return (
    <div className="h-full bg-slate-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* 顶部标题 + 班级选择器 */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold mb-2">教师工作台</h1>
              <p className="text-sm opacity-90">管理课程、监督学习、解答问题</p>
            </div>
            
            {/* 班级切换器 */}
            <div className="relative">
              <button
                onClick={() => setShowClassDropdown(!showClassDropdown)}
                className="flex items-center gap-3 bg-white/20 hover:bg-white/30 backdrop-blur border border-white/30 rounded-lg px-4 py-3 transition-colors"
              >
                <div className="text-left">
                  <div className="text-xs opacity-75">当前班级</div>
                  <div className="font-semibold text-lg">{selectedClass}</div>
                </div>
                <ChevronDown className={`w-5 h-5 transition-transform ${showClassDropdown ? 'rotate-180' : ''}`} />
              </button>

              {/* 下拉菜单 */}
              {showClassDropdown && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl border border-slate-200 py-2 z-50">
                  <div className="px-4 py-2 border-b border-slate-200">
                    <h3 className="text-sm font-semibold text-slate-700">选择班级</h3>
                  </div>
                  {classes.map((classItem) => (
                    <button
                      key={classItem.id}
                      onClick={() => {
                        setSelectedClass(classItem.name);
                        setShowClassDropdown(false);
                      }}
                      className={`w-full px-4 py-3 text-left hover:bg-slate-50 transition-colors ${
                        selectedClass === classItem.name ? 'bg-indigo-50' : ''
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <div className={`font-semibold ${
                            selectedClass === classItem.name ? 'text-indigo-600' : 'text-slate-900'
                          }`}>
                            {classItem.name}
                          </div>
                          <div className="text-xs text-slate-500 mt-0.5">
                            {classItem.studentCount} 名学生
                          </div>
                        </div>
                        {classItem.pendingCount > 0 && (
                          <span className="px-2 py-1 bg-orange-100 text-orange-700 rounded-full text-xs font-medium">
                            {classItem.pendingCount} 个待处理
                          </span>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* 班级统计信息 */}
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-white/10 backdrop-blur rounded-lg p-3 border border-white/20">
              <div className="text-2xl font-bold">{currentClassData?.studentCount || 0}</div>
              <div className="text-xs opacity-90">班级人数</div>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-lg p-3 border border-white/20">
              <div className="text-2xl font-bold">{currentQuestions.length}</div>
              <div className="text-xs opacity-90">待解决问题</div>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-lg p-3 border border-white/20">
              <div className="text-2xl font-bold">85%</div>
              <div className="text-xs opacity-90">平均出勤率</div>
            </div>
          </div>
        </div>

        {/* 待解决问题 */}
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                <Bell className="w-5 h-5 text-orange-600" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-slate-900">待解决问题</h2>
                <p className="text-sm text-slate-600">学生提问，等待您的解答</p>
              </div>
            </div>
            {currentQuestions.length > 0 && (
              <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm font-medium">
                {currentQuestions.length} 个待处理
              </span>
            )}
          </div>

          {currentQuestions.length > 0 ? (
            <div className="space-y-3">
              {currentQuestions.map((q, index) => (
                <div 
                  key={index} 
                  className="flex items-start gap-4 p-4 bg-orange-50 border border-orange-200 rounded-lg hover:shadow-md transition-shadow"
                >
                  <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <User className="w-5 h-5 text-indigo-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold text-slate-900">{q.student}</span>
                      <div className="flex items-center gap-1 text-xs text-slate-500">
                        <Clock className="w-3 h-3" />
                        {q.time}
                      </div>
                    </div>
                    <p className="text-sm text-slate-700 mb-3">{q.question}</p>
                    <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 text-sm font-medium">
                      回答问题
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="font-semibold text-slate-900 mb-2">暂无待处理问题</h3>
              <p className="text-sm text-slate-600">所有学生问题已处理完毕</p>
            </div>
          )}
        </div>

        {/* 其他功能待开发 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center">
                <Construction className="w-5 h-5 text-slate-400" />
              </div>
              <h3 className="font-semibold text-slate-900">课程管理</h3>
            </div>
            <p className="text-sm text-slate-600 mb-4">管理课程内容、调整教学计划</p>
            <div className="text-xs text-orange-600 font-medium">🚧 功能开发中</div>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center">
                <Construction className="w-5 h-5 text-slate-400" />
              </div>
              <h3 className="font-semibold text-slate-900">学习分析</h3>
            </div>
            <p className="text-sm text-slate-600 mb-4">查看学生学习数据、掌握情况</p>
            <div className="text-xs text-orange-600 font-medium">🚧 功能开发中</div>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center">
                <Construction className="w-5 h-5 text-slate-400" />
              </div>
              <h3 className="font-semibold text-slate-900">资源库</h3>
            </div>
            <p className="text-sm text-slate-600 mb-4">管理教学资源、题库素材</p>
            <div className="text-xs text-orange-600 font-medium">🚧 功能开发中</div>
          </div>
        </div>

        {/* 提示信息 */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="text-sm font-semibold text-blue-900 mb-1">功能提示</h4>
              <p className="text-xs text-blue-800">
                当前页面为教师工作台首页，显示待解决的学生问题。其他功能模块正在开发中，敬请期待。
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}