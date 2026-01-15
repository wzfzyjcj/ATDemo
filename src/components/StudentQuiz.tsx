import { useState } from 'react';
import { Clock, CheckCircle, AlertCircle, BookOpen, Target, Zap, Search, ChevronRight, Play, RotateCcw, Sparkles, Filter, Code, Circle, XCircle, TrendingUp, Award, Brain } from 'lucide-react';

export default function StudentQuiz() {
  const [activeMode, setActiveMode] = useState<'class' | 'homework' | 'practice'>('class');
  const [selectedQuiz, setSelectedQuiz] = useState<any>(null);
  const [showPracticeOptions, setShowPracticeOptions] = useState(false);
  const [practiceMode, setPracticeMode] = useState<'smart' | 'select' | 'retry' | null>(null);

  return (
    <div className="h-full flex flex-col bg-slate-50">
      {/* 顶部模式选择 */}
      <div className="bg-white border-b border-slate-200 px-6 py-4">
        <div className="flex items-center gap-4">
          <h2 className="text-lg font-semibold text-slate-900">问卷测验</h2>
          <div className="flex items-center bg-slate-100 rounded-lg p-1">
            <button
              onClick={() => {
                setActiveMode('class');
                setSelectedQuiz(null);
                setShowPracticeOptions(false);
              }}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeMode === 'class'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Clock className="w-4 h-4 inline mr-2" />
              课堂检测
            </button>
            <button
              onClick={() => {
                setActiveMode('homework');
                setSelectedQuiz(null);
                setShowPracticeOptions(false);
              }}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeMode === 'homework'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <BookOpen className="w-4 h-4 inline mr-2" />
              课后作业
            </button>
            <button
              onClick={() => {
                setActiveMode('practice');
                setSelectedQuiz(null);
                setShowPracticeOptions(true);
              }}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeMode === 'practice'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Target className="w-4 h-4 inline mr-2" />
              自主练习
            </button>
          </div>
        </div>
      </div>

      {/* 内容区域 */}
      <div className="flex-1 overflow-auto">
        {selectedQuiz ? (
          <QuizTakingInterface quiz={selectedQuiz} onExit={() => setSelectedQuiz(null)} />
        ) : activeMode === 'class' ? (
          <ClassTestList onSelectQuiz={setSelectedQuiz} />
        ) : activeMode === 'homework' ? (
          <HomeworkList onSelectQuiz={setSelectedQuiz} />
        ) : showPracticeOptions ? (
          <PracticeOptions 
            onSelectMode={(mode) => {
              setPracticeMode(mode);
              setShowPracticeOptions(false);
            }} 
          />
        ) : practiceMode === 'smart' ? (
          <SmartCompose onStart={setSelectedQuiz} onBack={() => setShowPracticeOptions(true)} />
        ) : practiceMode === 'select' ? (
          <QuestionBank onStart={setSelectedQuiz} onBack={() => setShowPracticeOptions(true)} />
        ) : practiceMode === 'retry' ? (
          <WrongQuestionBook onStart={setSelectedQuiz} onBack={() => setShowPracticeOptions(true)} />
        ) : null}
      </div>
    </div>
  );
}

// 课堂检测列表
function ClassTestList({ onSelectQuiz }: { onSelectQuiz: (quiz: any) => void }) {
  const tests = [
    { 
      id: 1, 
      title: 'Lab3随堂测验-进程调度', 
      status: 'ongoing', 
      timeLeft: '15:23',
      duration: 30,
      questions: 5,
      startTime: '14:30',
      difficulty: 'medium'
    },
    { 
      id: 2, 
      title: '虚拟内存快速测验', 
      status: 'completed', 
      score: 88,
      duration: 20,
      questions: 4,
      completedTime: '2024-02-14',
      difficulty: 'hard'
    },
  ];

  return (
    <div className="p-6 space-y-4">
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <Clock className="w-5 h-5 text-blue-600 mt-0.5" />
          <div>
            <h3 className="font-semibold text-blue-900 mb-1">课堂检测说明</h3>
            <p className="text-sm text-blue-700">
              课堂检测由教师在课上发起，有时间限制，需在规定时间内完成。系统自动保存进度，可随时继续作答。
            </p>
          </div>
        </div>
      </div>

      {tests.map((test) => (
        <div key={test.id} className={`bg-white rounded-lg border-2 p-6 ${
          test.status === 'ongoing' ? 'border-orange-300 bg-orange-50' : 'border-slate-200'
        }`}>
          <div className="flex items-start justify-between mb-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <h3 className="font-semibold text-slate-900 text-lg">{test.title}</h3>
                {test.status === 'ongoing' && (
                  <span className="px-2 py-1 bg-orange-100 text-orange-700 rounded text-xs font-medium animate-pulse">
                    进行中
                  </span>
                )}
                {test.status === 'completed' && (
                  <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-medium">
                    已完成
                  </span>
                )}
              </div>
              <div className="flex items-center gap-4 text-sm text-slate-600">
                <span>📝 {test.questions} 题</span>
                <span>⏱️ {test.duration} 分钟</span>
                <span className={`px-2 py-0.5 rounded text-xs ${
                  test.difficulty === 'hard' ? 'bg-red-100 text-red-700' :
                  test.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                  'bg-green-100 text-green-700'
                }`}>
                  {test.difficulty === 'hard' ? '困难' : test.difficulty === 'medium' ? '中等' : '简单'}
                </span>
              </div>
            </div>
            {test.status === 'completed' && (
              <div className="text-right">
                <div className="text-3xl font-bold text-green-600">{test.score}</div>
                <div className="text-xs text-slate-500">分</div>
              </div>
            )}
          </div>

          {test.status === 'ongoing' && (
            <div className="mb-4">
              <div className="flex items-center justify-between text-sm mb-2">
                <span className="text-slate-600">剩余时间</span>
                <span className="font-semibold text-orange-600 text-lg">{test.timeLeft}</span>
              </div>
              <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                <div className="h-full bg-orange-500 animate-pulse" style={{ width: '51%' }} />
              </div>
            </div>
          )}

          <button
            onClick={() => onSelectQuiz({
              ...test,
              mode: 'class',
              questions: generateQuestions(test.questions)
            })}
            className={`w-full px-6 py-3 rounded-lg font-medium ${
              test.status === 'ongoing'
                ? 'bg-orange-600 text-white hover:bg-orange-700'
                : 'bg-indigo-600 text-white hover:bg-indigo-700'
            }`}
          >
            {test.status === 'ongoing' ? '继续作答' : '查看详情'}
          </button>
        </div>
      ))}
    </div>
  );
}

// 课后作业列表
function HomeworkList({ onSelectQuiz }: { onSelectQuiz: (quiz: any) => void }) {
  const homeworks = [
    { 
      id: 1, 
      title: 'Lab3课后作业-进程与线程', 
      status: 'pending',
      deadline: '2024-02-20 23:59',
      questions: 8,
      difficulty: 'medium',
      tags: ['进程管理', '线程同步']
    },
    { 
      id: 2, 
      title: 'Lab2课后作业-内存管理', 
      status: 'completed',
      score: 92,
      questions: 6,
      completedTime: '2024-02-15 18:30',
      difficulty: 'hard',
      tags: ['虚拟内存', '页面置换']
    },
  ];

  return (
    <div className="p-6 space-y-4">
      <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <BookOpen className="w-5 h-5 text-purple-600 mt-0.5" />
          <div>
            <h3 className="font-semibold text-purple-900 mb-1">课后作业说明</h3>
            <p className="text-sm text-purple-700">
              课后作业由教师布置，有截止时间但不限制答题时长。可多次保存，在截止前提交即可。
            </p>
          </div>
        </div>
      </div>

      {homeworks.map((hw) => (
        <div key={hw.id} className="bg-white rounded-lg border border-slate-200 p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <h3 className="font-semibold text-slate-900 text-lg">{hw.title}</h3>
                {hw.status === 'pending' && (
                  <span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded text-xs font-medium">
                    待完成
                  </span>
                )}
                {hw.status === 'completed' && (
                  <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-medium">
                    已完成
                  </span>
                )}
              </div>
              <div className="flex items-center gap-4 text-sm text-slate-600 mb-3">
                <span>📝 {hw.questions} 题</span>
                <span className={`px-2 py-0.5 rounded text-xs ${
                  hw.difficulty === 'hard' ? 'bg-red-100 text-red-700' :
                  hw.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                  'bg-green-100 text-green-700'
                }`}>
                  {hw.difficulty === 'hard' ? '困难' : hw.difficulty === 'medium' ? '中等' : '简单'}
                </span>
              </div>
              <div className="flex flex-wrap gap-2 mb-3">
                {hw.tags.map((tag, idx) => (
                  <span key={idx} className="px-2 py-1 bg-indigo-50 text-indigo-700 rounded text-xs">
                    {tag}
                  </span>
                ))}
              </div>
              {hw.status === 'pending' && (
                <div className="text-sm">
                  <span className="text-slate-600">截止时间：</span>
                  <span className="font-semibold text-orange-600">{hw.deadline}</span>
                </div>
              )}
              {hw.status === 'completed' && (
                <div className="text-sm text-slate-600">
                  完成时间：{hw.completedTime}
                </div>
              )}
            </div>
            {hw.status === 'completed' && (
              <div className="text-right ml-4">
                <div className="text-3xl font-bold text-green-600">{hw.score}</div>
                <div className="text-xs text-slate-500">分</div>
              </div>
            )}
          </div>

          <button
            onClick={() => onSelectQuiz({
              ...hw,
              mode: 'homework',
              questions: generateQuestions(hw.questions)
            })}
            className="w-full px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-medium"
          >
            {hw.status === 'pending' ? '开始作答' : '查看详情'}
          </button>
        </div>
      ))}
    </div>
  );
}

// 自主练习选项
function PracticeOptions({ onSelectMode }: { onSelectMode: (mode: 'smart' | 'select' | 'retry') => void }) {
  return (
    <div className="p-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Target className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-2">自主练习</h2>
          <p className="text-slate-600">选择练习方式，巩固知识点掌握</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* 智能组卷 */}
          <div 
            onClick={() => onSelectMode('smart')}
            className="bg-white rounded-xl border-2 border-slate-200 p-6 hover:border-indigo-400 hover:shadow-lg transition-all cursor-pointer group"
          >
            <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-semibold text-slate-900 text-lg mb-2">智能组卷</h3>
            <p className="text-sm text-slate-600 mb-4">
              AI分析你的薄弱点，自动生成个性化练习题
            </p>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <CheckCircle className="w-4 h-4 text-green-500" />
                基于薄弱知识点
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <CheckCircle className="w-4 h-4 text-green-500" />
                难度自适应调整
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <CheckCircle className="w-4 h-4 text-green-500" />
                AI实时生成题目
              </div>
            </div>
          </div>

          {/* 自主选题 */}
          <div 
            onClick={() => onSelectMode('select')}
            className="bg-white rounded-xl border-2 border-slate-200 p-6 hover:border-green-400 hover:shadow-lg transition-all cursor-pointer group"
          >
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-teal-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Search className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-semibold text-slate-900 text-lg mb-2">自主选题</h3>
            <p className="text-sm text-slate-600 mb-4">
              从题库中筛选题目，自由组合练习内容
            </p>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <CheckCircle className="w-4 h-4 text-green-500" />
                按知识点筛选
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <CheckCircle className="w-4 h-4 text-green-500" />
                按难度筛选
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <CheckCircle className="w-4 h-4 text-green-500" />
                按题型筛选
              </div>
            </div>
          </div>

          {/* 错题重练 */}
          <div 
            onClick={() => onSelectMode('retry')}
            className="bg-white rounded-xl border-2 border-slate-200 p-6 hover:border-orange-400 hover:shadow-lg transition-all cursor-pointer group"
          >
            <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <RotateCcw className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-semibold text-slate-900 text-lg mb-2">错题重练</h3>
            <p className="text-sm text-slate-600 mb-4">
              重新练习历史错题，巩固薄弱环节
            </p>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <CheckCircle className="w-4 h-4 text-green-500" />
                历史错题回顾
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <CheckCircle className="w-4 h-4 text-green-500" />
                相似题目推荐
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <CheckCircle className="w-4 h-4 text-green-500" />
                掌握度追踪
              </div>
            </div>
          </div>
        </div>

        {/* 学习进度概览 */}
        <div className="mt-8 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl p-6 text-white">
          <h3 className="font-semibold mb-4">📊 你的学习进度</h3>
          <div className="grid grid-cols-3 gap-6">
            <div>
              <div className="text-3xl font-bold mb-1">126</div>
              <div className="text-sm opacity-90">已完成题目</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-1">85%</div>
              <div className="text-sm opacity-90">平均正确率</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-1">12</div>
              <div className="text-sm opacity-90">错题待复习</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// 智能组卷
function SmartCompose({ onStart, onBack }: { onStart: (quiz: any) => void; onBack: () => void }) {
  const [questionCount, setQuestionCount] = useState(10);
  const [difficulty, setDifficulty] = useState('adaptive');
  const [focusAreas, setFocusAreas] = useState(['并发控制', '内存管理']);

  const weaknessAreas = [
    { name: '并发控制', mastery: 45, questions: 23 },
    { name: '内存管理', mastery: 62, questions: 18 },
    { name: '页面置换算法', mastery: 58, questions: 15 },
    { name: '进程调度', mastery: 78, questions: 12 },
  ];

  return (
    <div className="p-6">
      <div className="max-w-4xl mx-auto">
        <button onClick={onBack} className="flex items-center gap-2 text-slate-600 hover:text-slate-900 mb-6">
          <ChevronRight className="w-4 h-4 rotate-180" />
          返回选择
        </button>

        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl p-6 text-white mb-6">
          <h2 className="text-2xl font-bold mb-2">🤖 AI智能组卷</h2>
          <p className="text-sm opacity-90">基于你的学习数据，AI将生成最适合你的练习题</p>
        </div>

        <div className="bg-white rounded-lg border border-slate-200 p-6 mb-6">
          <h3 className="font-semibold text-slate-900 mb-4">你的薄弱知识点</h3>
          <div className="space-y-3">
            {weaknessAreas.map((area, index) => (
              <div key={index} className="flex items-center gap-4">
                <input
                  type="checkbox"
                  checked={focusAreas.includes(area.name)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setFocusAreas([...focusAreas, area.name]);
                    } else {
                      setFocusAreas(focusAreas.filter(a => a !== area.name));
                    }
                  }}
                  className="w-4 h-4"
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-slate-900">{area.name}</span>
                    <span className="text-xs text-slate-500">{area.questions} 道题可选</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div 
                        className={`h-full ${area.mastery >= 70 ? 'bg-green-500' : area.mastery >= 50 ? 'bg-yellow-500' : 'bg-red-500'}`}
                        style={{ width: `${area.mastery}%` }}
                      />
                    </div>
                    <span className="text-xs font-medium text-slate-600">{area.mastery}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg border border-slate-200 p-6 mb-6">
          <h3 className="font-semibold text-slate-900 mb-4">组卷设置</h3>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-slate-700 mb-2 block">题目数量</label>
              <div className="flex items-center gap-4">
                <input
                  type="range"
                  min="5"
                  max="30"
                  value={questionCount}
                  onChange={(e) => setQuestionCount(Number(e.target.value))}
                  className="flex-1"
                />
                <span className="text-lg font-semibold text-slate-900 w-12 text-center">{questionCount}</span>
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-slate-700 mb-2 block">难度设置</label>
              <div className="grid grid-cols-4 gap-3">
                {['adaptive', 'easy', 'medium', 'hard'].map((level) => (
                  <button
                    key={level}
                    onClick={() => setDifficulty(level)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      difficulty === level
                        ? 'bg-indigo-600 text-white'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {level === 'adaptive' ? '自适应' : level === 'easy' ? '简单' : level === 'medium' ? '中等' : '困难'}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <h4 className="text-sm font-semibold text-blue-900 mb-2">✨ AI组卷特色</h4>
          <ul className="text-xs text-blue-800 space-y-1">
            <li>• 智能分析你的薄弱点，重点强化</li>
            <li>• 难度自适应调整，循序渐进</li>
            <li>• 题目来源：教师题库 + AI生成 + AI检索</li>
            <li>• 实时生成，每次练习都不重复</li>
          </ul>
        </div>

        <button
          onClick={() => onStart({
            title: 'AI智能组卷练习',
            mode: 'practice',
            type: 'smart',
            questions: generateQuestions(questionCount),
            difficulty,
            focusAreas
          })}
          className="w-full px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-medium flex items-center justify-center gap-2"
        >
          <Zap className="w-5 h-5" />
          开始智能练习
        </button>
      </div>
    </div>
  );
}

// 题库选择
function QuestionBank({ onStart, onBack }: { onStart: (quiz: any) => void; onBack: () => void }) {
  const [selectedKnowledge, setSelectedKnowledge] = useState('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedQuestions, setSelectedQuestions] = useState<number[]>([]);

  const questions = [
    { id: 1, title: '解释进程与线程的区别', type: '选择题', difficulty: 'easy', knowledge: '进程管理', source: '教师出题' },
    { id: 2, title: '实现一个简单的生产者消费者模型', type: '编程题', difficulty: 'hard', knowledge: '并发控制', source: 'AI生成' },
    { id: 3, title: 'LRU页面置换算法的工作原理', type: '选择题', difficulty: 'medium', knowledge: '内存管理', source: 'AI检索' },
    { id: 4, title: '分析死锁产生的四个必要条件', type: '选择题', difficulty: 'medium', knowledge: '并发控制', source: '教师出题' },
  ];

  const filteredQuestions = questions.filter(q => {
    if (selectedKnowledge !== 'all' && q.knowledge !== selectedKnowledge) return false;
    if (selectedDifficulty !== 'all' && q.difficulty !== selectedDifficulty) return false;
    if (selectedType !== 'all' && q.type !== selectedType) return false;
    return true;
  });

  return (
    <div className="p-6">
      <div className="max-w-6xl mx-auto">
        <button onClick={onBack} className="flex items-center gap-2 text-slate-600 hover:text-slate-900 mb-6">
          <ChevronRight className="w-4 h-4 rotate-180" />
          返回选择
        </button>

        <div className="bg-gradient-to-r from-green-500 to-teal-600 rounded-xl p-6 text-white mb-6">
          <h2 className="text-2xl font-bold mb-2">📚 题库选择</h2>
          <p className="text-sm opacity-90">从题库中选择题目，自由组合练习内容</p>
        </div>

        {/* 筛选器 */}
        <div className="bg-white rounded-lg border border-slate-200 p-4 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="text-xs text-slate-600 mb-1 block">知识点</label>
              <select
                value={selectedKnowledge}
                onChange={(e) => setSelectedKnowledge(e.target.value)}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm"
              >
                <option value="all">全部</option>
                <option value="进程管理">进程管理</option>
                <option value="并发控制">并发控制</option>
                <option value="内存管理">内存管理</option>
              </select>
            </div>

            <div>
              <label className="text-xs text-slate-600 mb-1 block">难度</label>
              <select
                value={selectedDifficulty}
                onChange={(e) => setSelectedDifficulty(e.target.value)}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm"
              >
                <option value="all">全部</option>
                <option value="easy">简单</option>
                <option value="medium">中等</option>
                <option value="hard">困难</option>
              </select>
            </div>

            <div>
              <label className="text-xs text-slate-600 mb-1 block">题型</label>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm"
              >
                <option value="all">全部</option>
                <option value="选择题">选择题</option>
                <option value="编程题">编程题</option>
              </select>
            </div>

            <div className="flex items-end">
              <div className="text-sm text-slate-600">
                已选：<span className="font-semibold text-indigo-600">{selectedQuestions.length}</span> / {filteredQuestions.length}
              </div>
            </div>
          </div>
        </div>

        {/* 题目列表 */}
        <div className="bg-white rounded-lg border border-slate-200 mb-6">
          <div className="divide-y divide-slate-200">
            {filteredQuestions.map((q) => (
              <div key={q.id} className="p-4 hover:bg-slate-50">
                <div className="flex items-start gap-4">
                  <input
                    type="checkbox"
                    checked={selectedQuestions.includes(q.id)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedQuestions([...selectedQuestions, q.id]);
                      } else {
                        setSelectedQuestions(selectedQuestions.filter(id => id !== q.id));
                      }
                    }}
                    className="mt-1"
                  />
                  <div className="flex-1">
                    <h4 className="font-medium text-slate-900 mb-2">{q.title}</h4>
                    <div className="flex items-center gap-3 text-xs">
                      <span className={`px-2 py-1 rounded ${
                        q.type === '编程题' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'
                      }`}>
                        {q.type}
                      </span>
                      <span className={`px-2 py-1 rounded ${
                        q.difficulty === 'hard' ? 'bg-red-100 text-red-700' :
                        q.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-green-100 text-green-700'
                      }`}>
                        {q.difficulty === 'hard' ? '困难' : q.difficulty === 'medium' ? '中等' : '简单'}
                      </span>
                      <span className="text-slate-500">{q.knowledge}</span>
                      <span className="text-slate-400">来源：{q.source}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={() => {
            if (selectedQuestions.length > 0) {
              onStart({
                title: '自主选题练习',
                mode: 'practice',
                type: 'select',
                questions: generateQuestions(selectedQuestions.length)
              });
            }
          }}
          disabled={selectedQuestions.length === 0}
          className="w-full px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-slate-300 font-medium"
        >
          开始练习 ({selectedQuestions.length} 题)
        </button>
      </div>
    </div>
  );
}

// 错题本
function WrongQuestionBook({ onStart, onBack }: { onStart: (quiz: any) => void; onBack: () => void }) {
  const wrongQuestions = [
    { 
      id: 1, 
      title: '解释死锁的四个必要条件', 
      type: '选择题',
      knowledge: '并发控制',
      wrongCount: 3,
      lastWrong: '2024-02-14',
      source: '课后作业',
      mastered: false
    },
    { 
      id: 2, 
      title: 'LRU算法实现', 
      type: '编程题',
      knowledge: '内存管理',
      wrongCount: 2,
      lastWrong: '2024-02-15',
      source: '课堂检测',
      mastered: false
    },
    { 
      id: 3, 
      title: '进程调度算法比较', 
      type: '选择题',
      knowledge: '进程管理',
      wrongCount: 1,
      lastWrong: '2024-02-10',
      source: '自主练习',
      mastered: true
    },
  ];

  const [selectedWrong, setSelectedWrong] = useState<number[]>([]);

  return (
    <div className="p-6">
      <div className="max-w-6xl mx-auto">
        <button onClick={onBack} className="flex items-center gap-2 text-slate-600 hover:text-slate-900 mb-6">
          <ChevronRight className="w-4 h-4 rotate-180" />
          返回选择
        </button>

        <div className="bg-gradient-to-r from-orange-500 to-red-600 rounded-xl p-6 text-white mb-6">
          <h2 className="text-2xl font-bold mb-2">📖 错题本</h2>
          <p className="text-sm opacity-90">重新练习历史错题，AI推荐相似题目</p>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-lg border border-slate-200 p-4">
            <div className="text-3xl font-bold text-orange-600 mb-1">{wrongQuestions.length}</div>
            <div className="text-sm text-slate-600">错题总数</div>
          </div>
          <div className="bg-white rounded-lg border border-slate-200 p-4">
            <div className="text-3xl font-bold text-green-600 mb-1">
              {wrongQuestions.filter(q => q.mastered).length}
            </div>
            <div className="text-sm text-slate-600">已掌握</div>
          </div>
          <div className="bg-white rounded-lg border border-slate-200 p-4">
            <div className="text-3xl font-bold text-red-600 mb-1">
              {wrongQuestions.filter(q => !q.mastered).length}
            </div>
            <div className="text-sm text-slate-600">待复习</div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-slate-200 mb-6">
          <div className="divide-y divide-slate-200">
            {wrongQuestions.map((q) => (
              <div key={q.id} className={`p-4 ${q.mastered ? 'bg-green-50' : ''}`}>
                <div className="flex items-start gap-4">
                  <input
                    type="checkbox"
                    checked={selectedWrong.includes(q.id)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedWrong([...selectedWrong, q.id]);
                      } else {
                        setSelectedWrong(selectedWrong.filter(id => id !== q.id));
                      }
                    }}
                    className="mt-1"
                  />
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-medium text-slate-900">{q.title}</h4>
                      {q.mastered && (
                        <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-medium">
                          已掌握
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-3 text-xs mb-2">
                      <span className={`px-2 py-1 rounded ${
                        q.type === '编程题' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'
                      }`}>
                        {q.type}
                      </span>
                      <span className="text-slate-500">{q.knowledge}</span>
                      <span className="text-slate-400">来源：{q.source}</span>
                    </div>
                    <div className="flex items-center gap-4 text-xs text-slate-600">
                      <span>❌ 错误 {q.wrongCount} 次</span>
                      <span>最近错误：{q.lastWrong}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={() => {
              if (selectedWrong.length > 0) {
                onStart({
                  title: '错题重练',
                  mode: 'practice',
                  type: 'retry',
                  questions: generateQuestions(selectedWrong.length)
                });
              }
            }}
            disabled={selectedWrong.length === 0}
            className="px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 disabled:bg-slate-300 font-medium"
          >
            重练选中题目 ({selectedWrong.length})
          </button>
          <button
            onClick={() => {
              onStart({
                title: 'AI推荐相似题目',
                mode: 'practice',
                type: 'retry-similar',
                questions: generateQuestions(5)
              });
            }}
            className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-medium flex items-center justify-center gap-2"
          >
            <Sparkles className="w-4 h-4" />
            AI推荐相似题
          </button>
        </div>
      </div>
    </div>
  );
}

// 答题界面
function QuizTakingInterface({ quiz, onExit }: { quiz: any; onExit: () => void }) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<{ [key: number]: any }>({});
  const [showSubmitConfirm, setShowSubmitConfirm] = useState(false);
  const [timeLeft, setTimeLeft] = useState(quiz.mode === 'class' ? 923 : null); // 15:23 in seconds
  const [codeInput, setCodeInput] = useState('');

  const currentQuestion = quiz.questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / quiz.questions.length) * 100;

  const handleAnswer = (answer: any) => {
    setAnswers({ ...answers, [currentQuestionIndex]: answer });
  };

  const handleNext = () => {
    if (currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  return (
    <div className="h-full flex flex-col bg-slate-50">
      {/* 顶部信息栏 */}
      <div className="bg-white border-b border-slate-200 px-6 py-4">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h2 className="font-semibold text-slate-900 text-lg">{quiz.title}</h2>
            <p className="text-sm text-slate-600">
              {quiz.mode === 'class' ? '课堂检测' : quiz.mode === 'homework' ? '课后作业' : '自主练习'}
            </p>
          </div>
          <div className="flex items-center gap-4">
            {timeLeft !== null && (
              <div className="text-right">
                <div className="text-2xl font-bold text-orange-600">
                  {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
                </div>
                <div className="text-xs text-slate-500">剩余时间</div>
              </div>
            )}
            <button
              onClick={onExit}
              className="px-4 py-2 bg-slate-200 text-slate-700 rounded-lg hover:bg-slate-300"
            >
              退出
            </button>
          </div>
        </div>

        {/* 进度条 */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-600">
              题目 {currentQuestionIndex + 1} / {quiz.questions.length}
            </span>
            <span className="text-slate-600">
              已完成 {Object.keys(answers).length} 题
            </span>
          </div>
          <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-indigo-600 transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      {/* 主体区域 */}
      <div className="flex-1 overflow-auto">
        <div className="max-w-4xl mx-auto p-6">
          {/* 题目卡片 */}
          <div className="bg-white rounded-lg border border-slate-200 p-6 mb-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center font-semibold">
                  {currentQuestionIndex + 1}
                </span>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      currentQuestion.type === 'choice' ? 'bg-blue-100 text-blue-700' : 'bg-purple-100 text-purple-700'
                    }`}>
                      {currentQuestion.type === 'choice' ? '选择题' : '编程题'}
                    </span>
                    <span className="text-xs text-slate-500">{currentQuestion.knowledge}</span>
                  </div>
                </div>
              </div>
              <div className="text-right text-sm text-slate-600">
                {currentQuestion.points} 分
              </div>
            </div>

            <h3 className="text-lg font-medium text-slate-900 mb-6">
              {currentQuestion.title}
            </h3>

            {/* 选择题 */}
            {currentQuestion.type === 'choice' && (
              <div className="space-y-3">
                {currentQuestion.options.map((option: any, index: number) => (
                  <label
                    key={index}
                    className={`flex items-start gap-3 p-4 rounded-lg border-2 cursor-pointer transition-all ${
                      answers[currentQuestionIndex] === option.id
                        ? 'border-indigo-500 bg-indigo-50'
                        : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    <input
                      type="radio"
                      name={`question-${currentQuestionIndex}`}
                      checked={answers[currentQuestionIndex] === option.id}
                      onChange={() => handleAnswer(option.id)}
                      className="mt-1"
                    />
                    <div className="flex-1">
                      <div className="font-medium text-slate-900 mb-1">{option.label}</div>
                      <div className="text-sm text-slate-600">{option.text}</div>
                    </div>
                  </label>
                ))}
              </div>
            )}

            {/* 编程题 */}
            {currentQuestion.type === 'code' && (
              <div>
                <div className="bg-slate-900 rounded-lg p-4 mb-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs text-slate-400">代码编辑器</span>
                    <div className="flex items-center gap-2">
                      <Code className="w-4 h-4 text-slate-400" />
                      <span className="text-xs text-slate-400">C</span>
                    </div>
                  </div>
                  <textarea
                    value={answers[currentQuestionIndex] || codeInput}
                    onChange={(e) => {
                      setCodeInput(e.target.value);
                      handleAnswer(e.target.value);
                    }}
                    placeholder="// 在此输入代码..."
                    className="w-full bg-slate-800 text-green-400 font-mono text-sm p-4 rounded border-none focus:outline-none resize-none"
                    rows={12}
                  />
                </div>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                  <p className="text-xs text-blue-800">
                    💡 提示：{currentQuestion.hint}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* 题目导航 */}
          <div className="bg-white rounded-lg border border-slate-200 p-6 mb-6">
            <h4 className="font-semibold text-slate-900 mb-4">题目导航</h4>
            <div className="grid grid-cols-10 gap-2">
              {quiz.questions.map((q: any, index: number) => (
                <button
                  key={index}
                  onClick={() => setCurrentQuestionIndex(index)}
                  className={`w-10 h-10 rounded-lg font-medium text-sm transition-all ${
                    index === currentQuestionIndex
                      ? 'bg-indigo-600 text-white'
                      : answers[index]
                      ? 'bg-green-100 text-green-700 border-2 border-green-300'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          </div>

          {/* 操作按钮 */}
          <div className="flex items-center justify-between gap-4">
            <button
              onClick={handlePrev}
              disabled={currentQuestionIndex === 0}
              className="px-6 py-3 bg-slate-200 text-slate-700 rounded-lg hover:bg-slate-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              上一题
            </button>

            <button
              onClick={() => setShowSubmitConfirm(true)}
              className="px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium"
            >
              提交答卷
            </button>

            {currentQuestionIndex < quiz.questions.length - 1 ? (
              <button
                onClick={handleNext}
                className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
              >
                下一题
              </button>
            ) : (
              <button
                onClick={() => setShowSubmitConfirm(true)}
                className="px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700"
              >
                完成答题
              </button>
            )}
          </div>
        </div>
      </div>

      {/* 提交确认弹窗 */}
      {showSubmitConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6">
            <h3 className="text-xl font-bold text-slate-900 mb-4">确认提交？</h3>
            <div className="mb-6">
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="bg-slate-50 rounded-lg p-3">
                  <div className="text-2xl font-bold text-indigo-600">{quiz.questions.length}</div>
                  <div className="text-xs text-slate-600">总题数</div>
                </div>
                <div className="bg-slate-50 rounded-lg p-3">
                  <div className="text-2xl font-bold text-green-600">{Object.keys(answers).length}</div>
                  <div className="text-xs text-slate-600">已作答</div>
                </div>
              </div>
              {Object.keys(answers).length < quiz.questions.length && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                  <p className="text-sm text-yellow-800">
                    还有 {quiz.questions.length - Object.keys(answers).length} 题未作答，确定要提交吗？
                  </p>
                </div>
              )}
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setShowSubmitConfirm(false)}
                className="flex-1 px-6 py-3 bg-slate-200 text-slate-700 rounded-lg hover:bg-slate-300"
              >
                继续答题
              </button>
              <button
                onClick={() => {
                  // 提交逻辑
                  alert('答卷已提交！');
                  onExit();
                }}
                className="flex-1 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
              >
                确认提交
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// 生成模拟题目
function generateQuestions(count: number) {
  const questions = [];
  for (let i = 0; i < count; i++) {
    if (i % 2 === 0) {
      questions.push({
        id: i + 1,
        type: 'choice',
        title: `关于进程调度算法的描述，下列哪项是正确的？（题目 ${i + 1}）`,
        knowledge: '进程调度',
        points: 10,
        options: [
          { id: 'A', label: 'A', text: 'FCFS算法是抢占式调度算法' },
          { id: 'B', label: 'B', text: 'SJF算法可能导致长作业饥饿' },
          { id: 'C', label: 'C', text: '时间片轮转算法不会发生进程切换' },
          { id: 'D', label: 'D', text: '优先级调度算法总是选择最短作业' },
        ],
      });
    } else {
      questions.push({
        id: i + 1,
        type: 'code',
        title: `实现一个简单的LRU页面置换算法（题目 ${i + 1}）`,
        knowledge: '内存管理',
        points: 20,
        hint: '使用链表或队列来维护页面访问顺序',
      });
    }
  }
  return questions;
}
