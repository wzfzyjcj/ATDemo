import { BookOpen, MessageSquare, Code, FileText, User, ArrowRight } from 'lucide-react';

interface WelcomeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStartTour: () => void;
  isTeacher: boolean;
}

export default function WelcomeModal({ isOpen, onClose, onStartTour, isTeacher }: WelcomeModalProps) {
  if (!isOpen) return null;

  const studentFeatures = [
    {
      icon: BookOpen,
      title: '知识图谱',
      description: '可视化学习路径，掌握知识点之间的关联关系，快速定位薄弱环节',
      color: 'from-blue-500 to-indigo-600',
    },
    {
      icon: MessageSquare,
      title: '智能问答',
      description: 'AI助手7x24小时在线，即时解答问题，还可以向老师提问获得专业指导',
      color: 'from-purple-500 to-pink-600',
    },
    {
      icon: Code,
      title: '代码分析',
      description: '上传代码获得详细质量分析，AI检测生成痕迹，发现代码中的知识薄弱点',
      color: 'from-green-500 to-teal-600',
    },
    {
      icon: FileText,
      title: '问卷测验',
      description: '智能组卷针对性练习，错题本系统化复习，实时追踪学习进度',
      color: 'from-orange-500 to-red-600',
    },
    {
      icon: User,
      title: '个人中心',
      description: '学习数据雷达图，个性化学习建议，完整的学习轨迹记录',
      color: 'from-cyan-500 to-blue-600',
    },
  ];

  const teacherFeatures = [
    {
      icon: BookOpen,
      title: '知识图谱管理',
      description: '上传教材自动构建图谱，语音输入爬取资料，支持多教材切换管理',
      color: 'from-blue-500 to-indigo-600',
    },
    {
      icon: MessageSquare,
      title: '智能问答',
      description: '查看学生提问统计，批量解答常见问题，沉淀优质答案到知识库',
      color: 'from-purple-500 to-pink-600',
    },
    {
      icon: Code,
      title: '代码批阅工作台',
      description: '批量处理学生作业，AI辅助评分建议，检测代码抄袭和AI生成',
      color: 'from-green-500 to-teal-600',
    },
    {
      icon: FileText,
      title: '问卷测验管理',
      description: '智能组卷系统，题库管理，自动批阅，学情分析一站式解决',
      color: 'from-orange-500 to-red-600',
    },
    {
      icon: User,
      title: '学生信息中心',
      description: '查看学生学习肖像，监督学习进度，处理待解答问题',
      color: 'from-cyan-500 to-blue-600',
    },
  ];

  const features = isTeacher ? teacherFeatures : studentFeatures;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-8">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-3xl max-h-[80vh] overflow-y-auto">
        {/* 头部 */}
        <div className="bg-gradient-to-br from-indigo-600 to-purple-700 text-white p-8 rounded-t-2xl">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-lg">
              <span className="text-3xl font-bold text-indigo-600">V</span>
            </div>
            <div>
              <h1 className="text-3xl font-bold mb-1">欢迎来到 Vault CS！</h1>
              <p className="text-indigo-100">
                {isTeacher ? '强大的计算机科学教学管理平台' : '智能化的计算机科学学习平台'}
              </p>
            </div>
          </div>
          
          <div className="bg-white/20 rounded-lg p-4 backdrop-blur border border-white/30">
            <p className="text-sm leading-relaxed text-white">
              {isTeacher 
                ? '这是一个为计算机科学教师设计的智能教学平台。通过AI辅助，您可以更高效地管理课程内容、批阅学生作业、追踪学习进度，以及提供个性化指导。系统整合了知识图谱、智能问答、代码分析、测验管理等核心功能，帮助您减轻工作负担，提升教学质量。'
                : '这是一个为计算机科学学习者打造的智能学习平台。通过可视化知识图谱、AI智能问答、代码质量分析和个性化测验，帮助您系统化学习、快速定位薄弱点、获得即时反馈。平台会追踪您的学习轨迹，提供个性化学习建议，让学习更高效。'
              }
            </p>
          </div>
        </div>

        {/* 功能卡片 */}
        <div className="p-8">
          <h2 className="text-xl font-bold text-slate-900 mb-6 text-center">
            核心功能模块
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="group bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl p-5 hover:shadow-lg transition-all border border-slate-200 hover:border-indigo-300"
                >
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-slate-900 mb-1.5">
                        {feature.title}
                      </h3>
                      <p className="text-sm text-slate-600 leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* 重要提示 */}
          <div className="bg-blue-50 border-l-4 border-blue-500 rounded-lg p-4 mb-6">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center mt-0.5">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-blue-900 mb-1">💡 快速上手建议</h4>
                <ul className="text-sm text-blue-800 space-y-1">
                  {isTeacher ? (
                    <>
                      <li>• 建议首先上传课程资料到知识图谱模块，系统将自动构建知识网络</li>
                      <li>• 在代码分析模块设置作业要求，学生提交后可批量批阅</li>
                      <li>• 定期查看学生信息中心，了解整体学习情况和待处理问题</li>
                    </>
                  ) : (
                    <>
                      <li>• 从知识图谱开始，了解课程整体结构和学习路径</li>
                      <li>• 遇到问题优先使用智能问答，AI助手会即时响应</li>
                      <li>• 完成代码后使用代码分析，发现薄弱点并针对性学习</li>
                    </>
                  )}
                </ul>
              </div>
            </div>
          </div>

          {/* 底部按钮 */}
          <div className="flex items-center gap-4">
            <button
              onClick={onClose}
              className="flex-1 px-6 py-3 border-2 border-slate-300 text-slate-600 rounded-xl font-medium hover:bg-slate-50 transition-colors"
            >
              稍后探索
            </button>
            <button
              onClick={onStartTour}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-medium hover:from-indigo-700 hover:to-purple-700 transition-all flex items-center justify-center gap-2 shadow-lg shadow-indigo-200"
            >
              <span>开始引导教程</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>

          <p className="text-center text-xs text-slate-500 mt-4">
            您随时可以在右上角用户菜单中选择"查看引导"重新观看教程
          </p>
        </div>
      </div>
    </div>
  );
}