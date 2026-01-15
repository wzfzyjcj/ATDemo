import { useState } from 'react';
import { X, Send } from 'lucide-react';

interface AskTeacherModalProps {
  isOpen: boolean;
  onClose: () => void;
  knowledgePointName: string;
  onSubmit: (question: string) => void;
}

export default function AskTeacherModal({ isOpen, onClose, knowledgePointName, onSubmit }: AskTeacherModalProps) {
  const [question, setQuestion] = useState(`关于"${knowledgePointName}"的问题：`);
  const [showSuccess, setShowSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = () => {
    onSubmit(question);
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      onClose();
      setQuestion(`关于"${knowledgePointName}"的问题：`);
    }, 2000);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl mx-4">
        <div className="flex items-center justify-between p-6 border-b border-slate-200">
          <h3 className="font-semibold text-slate-900">向老师提问</h3>
          <button
            onClick={onClose}
            className="p-1 hover:bg-slate-100 rounded transition-colors"
          >
            <X className="w-5 h-5 text-slate-500" />
          </button>
        </div>

        {!showSuccess ? (
          <>
            <div className="p-6">
              <div className="mb-4">
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  问题内容
                </label>
                <textarea
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  className="w-full h-32 px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
                  placeholder="请输入你想问老师的问题..."
                />
              </div>
              <div className="text-sm text-slate-500">
                <p>💡 提示：清晰描述你的问题，老师会在24小时内回复</p>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 p-6 border-t border-slate-200 bg-slate-50">
              <button
                onClick={onClose}
                className="px-4 py-2 border border-slate-200 rounded-lg text-sm text-slate-600 hover:bg-white transition-colors"
              >
                取消
              </button>
              <button
                onClick={handleSubmit}
                disabled={!question.trim()}
                className="px-6 py-2 bg-indigo-600 text-white rounded-lg text-sm hover:bg-indigo-700 disabled:bg-slate-300 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
              >
                <Send className="w-4 h-4" />
                发送给授课教师
              </button>
            </div>
          </>
        ) : (
          <div className="p-12 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h4 className="font-semibold text-slate-900 mb-2">问题已提交！</h4>
            <p className="text-sm text-slate-600">教师将在24小时内回复，回复将显示在消息中心</p>
          </div>
        )}
      </div>
    </div>
  );
}
