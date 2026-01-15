import { useState, useEffect } from 'react';
import { X, ChevronRight, ChevronLeft } from 'lucide-react';

interface TourStep {
  title: string;
  description: string;
  target: string; // CSS selector
  position: 'top' | 'bottom' | 'left' | 'right';
}

interface GuidedTourProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: () => void;
  isTeacher: boolean;
}

export default function GuidedTour({ isOpen, onClose, onComplete, isTeacher }: GuidedTourProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [targetRect, setTargetRect] = useState<DOMRect | null>(null);

  const studentSteps: TourStep[] = [
    {
      title: '欢迎来到 Vault CS！',
      description: '这是一个智能化的计算机科学学习平台，让我们快速了解主要功能。',
      target: '',
      position: 'bottom',
    },
    {
      title: '知识图谱',
      description: '在这里查看完整的知识点网络，了解知识点之间的关联关系，追踪学习进度。',
      target: '[data-tour="knowledge"]',
      position: 'right',
    },
    {
      title: '智能问答',
      description: '遇到问题？使用AI助手快速获得解答，所有答案都会标注知识来源。',
      target: '[data-tour="qa"]',
      position: 'right',
    },
    {
      title: '代码分析',
      description: '上传你的代码，获得详细的质量分析报告和改进建议。',
      target: '[data-tour="code"]',
      position: 'right',
    },
    {
      title: '问卷测验',
      description: '完成智能组卷测验，系统会根据你的学习情况推荐个性化题目。',
      target: '[data-tour="quiz"]',
      position: 'right',
    },
    {
      title: '个人中心',
      description: '查看学习数据、知识掌握度雷达图、以及个性化学习建议。',
      target: '[data-tour="user"]',
      position: 'right',
    },
  ];

  const teacherSteps: TourStep[] = [
    {
      title: '欢迎来到 Vault CS 教师端！',
      description: '强大的教学管理平台，帮助您更高效地进行教学和评估。',
      target: '',
      position: 'bottom',
    },
    {
      title: '知识图谱管理',
      description: '上传教学资料，系统自动构建知识图谱。支持多教材、语音输入等功能。',
      target: '[data-tour="knowledge"]',
      position: 'right',
    },
    {
      title: '智能问答',
      description: '查看学生提问，提供解答。系统会自动整理常见问题和优质答案。',
      target: '[data-tour="qa"]',
      position: 'right',
    },
    {
      title: '代码批阅工作台',
      description: '批量处理学生代码作业，查看AI分析报告，添加评分和评语。',
      target: '[data-tour="code"]',
      position: 'right',
    },
    {
      title: '问卷测验管理',
      description: '智能组卷、题库管理、自动批阅、学情分析，一站式测验管理。',
      target: '[data-tour="quiz"]',
      position: 'right',
    },
    {
      title: '学生信息中心',
      description: '查看学生学习肖像、处理待解答问题、追踪学习进度。',
      target: '[data-tour="user"]',
      position: 'right',
    },
  ];

  const steps = isTeacher ? teacherSteps : studentSteps;

  useEffect(() => {
    if (isOpen && currentStep > 0 && steps[currentStep].target) {
      const target = document.querySelector(steps[currentStep].target);
      if (target) {
        const rect = target.getBoundingClientRect();
        setTargetRect(rect);
        // 滚动到目标元素
        target.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    } else {
      setTargetRect(null);
    }
  }, [currentStep, isOpen]); // Removed 'steps' from dependencies to prevent infinite loop

  if (!isOpen) return null;

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete();
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSkip = () => {
    onClose();
  };

  const getTooltipStyle = () => {
    if (!targetRect || currentStep === 0) {
      return {
        position: 'fixed' as const,
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
      };
    }

    const position = steps[currentStep].position;
    const offset = 20;

    let style: React.CSSProperties = {
      position: 'fixed' as const,
    };

    switch (position) {
      case 'right':
        style.left = targetRect.right + offset;
        style.top = targetRect.top + targetRect.height / 2;
        style.transform = 'translateY(-50%)';
        break;
      case 'left':
        style.right = window.innerWidth - targetRect.left + offset;
        style.top = targetRect.top + targetRect.height / 2;
        style.transform = 'translateY(-50%)';
        break;
      case 'top':
        style.left = targetRect.left + targetRect.width / 2;
        style.bottom = window.innerHeight - targetRect.top + offset;
        style.transform = 'translateX(-50%)';
        break;
      case 'bottom':
        style.left = targetRect.left + targetRect.width / 2;
        style.top = targetRect.bottom + offset;
        style.transform = 'translateX(-50%)';
        break;
    }

    return style;
  };

  return (
    <div className={`fixed inset-0 z-[9999] transition-opacity ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
      {/* 半透明背景遮罩 */}
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />

      {/* 高亮区域（镂空效果） */}
      {targetRect && currentStep > 0 && (
        <div
          className="absolute border-4 border-indigo-500 rounded-lg pointer-events-none animate-pulse"
          style={{
            left: targetRect.left - 8,
            top: targetRect.top - 8,
            width: targetRect.width + 16,
            height: targetRect.height + 16,
            boxShadow: '0 0 0 9999px rgba(0, 0, 0, 0.5)',
          }}
        />
      )}

      {/* 引导卡片 */}
      <div
        className="bg-white rounded-xl shadow-2xl border-2 border-indigo-500 p-6 z-[9999] max-w-md"
        style={getTooltipStyle()}
        onClick={(e) => e.stopPropagation()}
      >
        {/* 关闭按钮 */}
        <button
          onClick={handleSkip}
          className="absolute top-4 right-4 p-1 hover:bg-slate-100 rounded-full transition-colors"
        >
          <X className="w-5 h-5 text-slate-500" />
        </button>

        {/* 步骤指示器 */}
        <div className="flex items-center gap-1 mb-4">
          {steps.map((_, index) => (
            <div
              key={index}
              className={`h-1.5 flex-1 rounded-full transition-all ${
                index <= currentStep ? 'bg-indigo-600' : 'bg-slate-200'
              }`}
            />
          ))}
        </div>

        {/* 内容 */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-2">
            {steps[currentStep].title}
          </h3>
          <p className="text-sm text-slate-600 leading-relaxed">
            {steps[currentStep].description}
          </p>
        </div>

        {/* 底部按钮 */}
        <div className="flex items-center justify-between">
          <div className="text-sm text-slate-500">
            {currentStep + 1} / {steps.length}
          </div>
          
          <div className="flex items-center gap-3">
            <button
              onClick={handleSkip}
              className="text-sm text-slate-600 hover:text-slate-900 transition-colors"
            >
              {currentStep === 0 ? '稍后提醒' : '跳过'}
            </button>
            
            {currentStep > 0 && (
              <button
                onClick={handlePrev}
                className="px-4 py-2 border border-slate-200 rounded-lg text-sm text-slate-600 hover:bg-slate-50 transition-colors flex items-center gap-1"
              >
                <ChevronLeft className="w-4 h-4" />
                上一步
              </button>
            )}
            
            <button
              onClick={handleNext}
              className="px-6 py-2 bg-indigo-600 text-white rounded-lg text-sm hover:bg-indigo-700 transition-colors flex items-center gap-1"
            >
              {currentStep === steps.length - 1 ? '开始使用' : '下一步'}
              {currentStep < steps.length - 1 && <ChevronRight className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}