import { useState } from 'react';
import { Home, BookOpen, MessageSquare, Code, FileText, Search, User, Users } from 'lucide-react';
import KnowledgeGraph from './components/KnowledgeGraph';
import SmartQA from './components/SmartQA';
import CodeAnalysis from './components/CodeAnalysis';
import QuizModule from './components/QuizModule';
import StudentQuiz from './components/StudentQuiz';
import UserProfile from './components/UserProfile';
import TeacherHome from './components/TeacherHome';
import GuidedTour from './components/GuidedTour';
import WelcomeModal from './components/WelcomeModal';
import Login from './components/Login';

type ModuleType = 'home' | 'profile' | 'knowledge' | 'qa' | 'code' | 'quiz';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentModule, setCurrentModule] = useState<ModuleType>('home');
  const [isTeacher, setIsTeacher] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [qaPrefilledQuestion, setQaPrefilledQuestion] = useState('');
  const [pendingQuestions, setPendingQuestions] = useState<Array<{student: string, question: string, time: string, answer?: string}>>([]);
  const [showTour, setShowTour] = useState(false); // Changed to false by default
  const [showWelcome, setShowWelcome] = useState(true); // 欢迎弹窗
  const [selectedCourse, setSelectedCourse] = useState('操作系统'); // 当前选择的课程

  const handleLogin = (username: string, password: string, role: 'student' | 'teacher') => {
    // 这里应该调用实际的登录API
    setIsTeacher(role === 'teacher');
    setIsLoggedIn(true);
  };

  if (!isLoggedIn) {
    return <Login onLogin={handleLogin} />;
  }
  
  const courses = ['操作系统', '数据结构', '计算机网络', '数据库原理'];

  const handleNavigateToQA = (question: string) => {
    setQaPrefilledQuestion(question);
    setCurrentModule('qa');
  };

  const handleAskTeacher = (question: string) => {
    // 添加到待处理问题列表
    setPendingQuestions(prev => [...prev, {
      student: '张三', // 这里应该是当前登录学生的名字
      question: question,
      time: '刚刚',
    }]);
  };

  // 根据角色动态调整导航菜单
  const getModules = () => {
    if (isTeacher) {
      return [
        { id: 'home' as ModuleType, name: '用户', icon: Home },
        { id: 'profile' as ModuleType, name: '学生画像', icon: Users },
        { id: 'knowledge' as ModuleType, name: '知识图谱', icon: BookOpen },
        { id: 'qa' as ModuleType, name: '智能问答', icon: MessageSquare },
        { id: 'code' as ModuleType, name: '代码分析', icon: Code },
        { id: 'quiz' as ModuleType, name: '问卷测验', icon: FileText },
      ];
    } else {
      return [
        { id: 'home' as ModuleType, name: '用户', icon: Home },
        { id: 'knowledge' as ModuleType, name: '知识图谱', icon: BookOpen },
        { id: 'qa' as ModuleType, name: '智能问答', icon: MessageSquare },
        { id: 'code' as ModuleType, name: '代码分析', icon: Code },
        { id: 'quiz' as ModuleType, name: '问卷测验', icon: FileText },
      ];
    }
  };

  const modules = getModules();

  const renderModule = () => {
    switch (currentModule) {
      case 'home':
        return isTeacher ? (
          <TeacherHome pendingQuestions={pendingQuestions} />
        ) : (
          <UserProfile isTeacher={isTeacher} pendingQuestions={pendingQuestions} selectedCourse={selectedCourse} onCourseChange={setSelectedCourse} />
        );
      case 'profile':
        return <UserProfile isTeacher={isTeacher} pendingQuestions={pendingQuestions} selectedCourse={selectedCourse} onCourseChange={setSelectedCourse} />;
      case 'knowledge':
        return <KnowledgeGraph isTeacher={isTeacher} onNavigateToQA={handleNavigateToQA} onAskTeacher={handleAskTeacher} selectedCourse={selectedCourse} />;
      case 'qa':
        return <SmartQA isTeacher={isTeacher} prefilledQuestion={qaPrefilledQuestion} onClearPrefilled={() => setQaPrefilledQuestion('')} pendingQuestions={pendingQuestions} setPendingQuestions={setPendingQuestions} />;
      case 'code':
        return <CodeAnalysis isTeacher={isTeacher} />;
      case 'quiz':
        return isTeacher ? (
          <QuizModule isTeacher={isTeacher} selectedCourse={selectedCourse} />
        ) : (
          <StudentQuiz />
        );
      default:
        return <UserProfile isTeacher={isTeacher} pendingQuestions={pendingQuestions} selectedCourse={selectedCourse} onCourseChange={setSelectedCourse} />;
    }
  };

  return (
    <div className="flex h-screen bg-slate-50">
      {/* 欢迎弹窗 */}
      <WelcomeModal 
        isOpen={showWelcome}
        onClose={() => setShowWelcome(false)}
        onStartTour={() => {
          setShowWelcome(false);
          setShowTour(true);
        }}
        isTeacher={isTeacher}
      />

      {/* 新用户导览 */}
      <GuidedTour 
        isOpen={showTour}
        onClose={() => setShowTour(false)}
        onComplete={() => {
          setShowTour(false);
          localStorage.setItem('tourCompleted', 'true');
        }}
        isTeacher={isTeacher}
      />
      
      {/* 左侧导航 */}
      <aside 
        className={`bg-white border-r border-slate-200 transition-all duration-300 ${
          sidebarCollapsed ? 'w-16' : 'w-56'
        }`}
      >
        {/* Logo区域 */}
        <div className="h-16 border-b border-slate-200 flex items-center px-4">
          {!sidebarCollapsed && (
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">V</span>
              </div>
              <span className="font-semibold text-slate-900">Vault CS</span>
            </div>
          )}
          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="ml-auto p-1 hover:bg-slate-100 rounded"
          >
            <svg
              className={`w-5 h-5 transition-transform ${sidebarCollapsed ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        </div>

        {/* 导航菜单 */}
        <nav className="p-2 space-y-1 flex-1">
          {modules.map((module) => {
            const Icon = module.icon;
            return (
              <button
                key={module.id}
                data-tour={module.id}
                onClick={() => setCurrentModule(module.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                  currentModule === module.id
                    ? 'bg-indigo-50 text-indigo-600'
                    : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                {!sidebarCollapsed && <span>{module.name}</span>}
              </button>
            );
          })}
        </nav>

        {/* 搜索框和用户信息区域 */}
        <div className="border-t border-slate-200 p-2 space-y-2">
          {/* 全局搜索框 */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder={sidebarCollapsed ? "" : "全局检索..."}
              className={`w-full ${sidebarCollapsed ? 'pl-9 pr-2' : 'pl-9 pr-3'} py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm`}
            />
          </div>

          {/* 用户头像和菜单 */}
          <div className="relative group">
            <button className={`w-full flex items-center ${sidebarCollapsed ? 'justify-center' : 'gap-2 px-2'} py-2 rounded-lg hover:bg-slate-50 transition-colors`}>
              <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center flex-shrink-0">
                <User className="w-5 h-5 text-indigo-600" />
              </div>
              {!sidebarCollapsed && (
                <span className="text-sm text-slate-700 font-medium truncate">张三</span>
              )}
            </button>
            
            {/* 向上显示的下拉菜单 */}
            <div className={`absolute ${sidebarCollapsed ? 'left-full ml-2' : 'left-0'} bottom-full mb-2 w-48 bg-white rounded-lg shadow-lg border border-slate-200 py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50`}>
              <button
                onClick={() => setIsTeacher(!isTeacher)}
                className="w-full px-4 py-2 text-left text-sm hover:bg-slate-50 flex items-center justify-between"
              >
                <span>切换角色</span>
                <span className="text-xs text-slate-500">
                  {isTeacher ? '教师' : '学生'}
                </span>
              </button>
              <div className="border-t border-slate-200"></div>
              <button 
                onClick={() => setShowTour(true)}
                className="w-full px-4 py-2 text-left text-sm hover:bg-slate-50 text-slate-600"
              >
                查看引导
              </button>
              <button className="w-full px-4 py-2 text-left text-sm hover:bg-slate-50 text-slate-600">
                设置
              </button>
              <button className="w-full px-4 py-2 text-left text-sm hover:bg-slate-50 text-red-600">
                退出登录
              </button>
            </div>
          </div>
        </div>
      </aside>

      {/* 主内容区 */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* 顶部导航栏 - 已移除搜索框和用户头像 */}
        <header className="h-16 bg-white border-b border-slate-200">
        </header>

        {/* 主内容 */}
        <main className="flex-1 overflow-auto">
          {renderModule()}
        </main>
      </div>
    </div>
  );
}