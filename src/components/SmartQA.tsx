import { useState, useEffect } from 'react';
import { Send, User, Bot, Sparkles, Tag, History, Search, ChevronLeft, ChevronRight, Plus, X } from 'lucide-react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  sources?: string[];
}

interface Conversation {
  id: string;
  title: string;
  date: string;
  messages: Message[];
  preview: string;
}

interface SmartQAProps {
  isTeacher: boolean;
  prefilledQuestion?: string;
  onClearPrefilled?: () => void;
  pendingQuestions?: Array<{student: string, question: string, time: string, answer?: string}>;
  setPendingQuestions?: (questions: Array<{student: string, question: string, time: string, answer?: string}>) => void;
}

export default function SmartQA({ isTeacher, prefilledQuestion, onClearPrefilled, pendingQuestions, setPendingQuestions }: SmartQAProps) {
  const [currentConversationId, setCurrentConversationId] = useState<string>('current');
  const [conversations, setConversations] = useState<Conversation[]>([
    {
      id: '1',
      title: '进程调度算法比较',
      date: '今天 14:30',
      preview: '什么是进程调度？',
      messages: [
        { id: '1-1', role: 'user', content: '什么是进程调度？', timestamp: new Date(Date.now() - 7200000) },
        { id: '1-2', role: 'assistant', content: '**进程调度**是操作系统中的核心概念，指的是操作系统按照一定的调度算法，从就绪队列中选择一个进程分配CPU的过程。\n\n**主要调度算法包括：**\n1. **先来先服务(FCFS)**：按进程到达顺序调度\n2. **短作业优先(SJF)**：优先调度执行时间最短的进程\n3. **优先级调度**：根据进程优先级调度\n4. **时间片轮转(RR)**：每个进程分配固定时间片\n\n**相关知识点：**\n- 进程状态转换\n- 上下文切换\n- 调度性能指标\n\n来源：[知识图谱 - 进程管理 - 多进程调度] [《操作系统概念》第5章]', timestamp: new Date(Date.now() - 7200000), sources: ['知识图谱', '教材库', '代码示例库'] },
      ],
    },
    {
      id: '2',
      title: '虚拟内存工作原理',
      date: '今天 10:15',
      preview: '虚拟内存的工作原理是什么？',
      messages: [
        { id: '2-1', role: 'user', content: '虚拟内存的工作原理是什么？', timestamp: new Date(Date.now() - 14400000) },
        { id: '2-2', role: 'assistant', content: '**虚拟内存**是计算机系统内存管理的一种技术，它使得应用程序认为它拥有连续可用的内存空间，而实际上这个空间被分隔成多个物理内存碎片，甚至部分数据存储在外部磁盘上。\n\n**核心机制：**\n1. **地址映射**：虚拟地址 → 物理地址\n2. **按需分页**：只加载需要的页面\n3. **页面置换**：内存不足时替换页面\n\n**优势：**\n✅ 突破物理内存限制\n✅ 进程间内存隔离\n✅ 简化内存管理\n\n**前置知识：**需要先理解分页机制\n\n来源：[知识图谱 - 内存管理 - 虚拟内存] [《操作系统概念》第9章]', timestamp: new Date(Date.now() - 14400000), sources: ['知识图谱', '教材库'] },
      ],
    },
    {
      id: '3',
      title: 'FCFS和优先级调度',
      date: '昨天 16:20',
      preview: 'FCFS和优先级调度算法有什么区别？',
      messages: [
        { id: '3-1', role: 'user', content: 'FCFS和优先级调度算法有什么区别？', timestamp: new Date(Date.now() - 86400000) },
        { id: '3-2', role: 'assistant', content: '这是一个很好的问题！让我基于知识图谱为你解答。\n\n**FCFS（先来先服务）vs 优先级调度：**\n\n**FCFS调度：**\n- 原理：按进程到达顺序执行\n- 优点：实现简单，公平\n- 缺点：可能导致"护航效应"，平均等待时间长\n- 适用场景：批处理系统\n\n**优先级调度：**\n- 原理：根据优先级选择进程\n- 优点：重要任务优先处理\n- 缺点：可能导致"饥饿"问题\n- 适用场景：实时系统\n\n**关键区别：**\n- FCFS不考虑进程特性，优先级调度考虑进程重要性\n- FCFS无抢占，优先级调度可抢占\n\n来源：[知识图谱 - 进程管理 - 多进程调度]', timestamp: new Date(Date.now() - 86400000), sources: ['知识图谱'] },
      ],
    },
  ]);

  const [currentMessages, setCurrentMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: '你好！我是 Vault CS 智能助教。我可以帮你解答计算机科学相关的问题，基于知识图谱为你提供准确的答案。有什么我可以帮助你的吗？',
      timestamp: new Date(Date.now() - 300000),
    },
  ]);

  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showHistory, setShowHistory] = useState(true);
  const [historySearch, setHistorySearch] = useState('');

  const exampleQuestions = isTeacher
    ? [
        '张三最近的代码提交情况如何？',
        '本周有多少学生完成了操作系统测验？',
        '哪些学生在进程管理知识点上掌握度较低？',
      ]
    : [
        '什么是进程调度？',
        '虚拟内存的工作原理是什么？',
        'FCFS和优先级调度算法有什么区别？',
      ];

  const mockResponses = isTeacher
    ? {
        default: '根据学生数据库检索，张三同学在过去一周提交了3次代码作业。\n\n**详细信息：**\n- 2月13日：提交Lab2，得分85/100\n- 2月14日：提交Lab3第一版，得分78/100\n- 2月15日：提交Lab3修改版，得分88/100\n\n**代码质量分析：**\n✅ 代码规范性良好\n⚠️ 需要改进：注释覆盖率偏低\n\n数据来源：[学生代码提交记录] [代码质量分析系统]',
      }
    : {
        进程: '**进程调度**是操作系统中的核心概念，指的是操作系统按照一定的调度算法，从就绪队列中选择一个进程分配CPU的过程。\n\n**主要调度算法包括：**\n1. **先来先服务(FCFS)**：按进程到达顺序调度\n2. **短作业优先(SJF)**：优先调度执行时间最短的进程\n3. **优先级调度**：根据进程优先级调度\n4. **时间片轮转(RR)**：每个进程分配固定时间片\n\n**相关知识点：**\n- 进程状态转换\n- 上下文切换\n- 调度性能指标\n\n来源：[知识图谱 - 进程管理 - 多进程调度] [《操作系统概念》第5章]',
        虚拟: '**虚拟内存**是计算机系统内存管理的一种技术，它使得应用程序认为它拥有连续可用的内存空间，而实际上这个空间被分隔成多个物理内存碎片，甚至部分数据存储在外部磁盘上。\n\n**核心机制：**\n1. **地址映射**：虚拟地址 → 物理地址\n2. **按需分页**：只加载需要的页面\n3. **页面置换**：内存不足时替换页面\n\n**优势：**\n✅ 突破物理内存限制\n✅ 进程间内存隔离\n✅ 简化内存管理\n\n**前置知识：**需要先理解分页机制\n\n来源：[知识图谱 - 内存管理 - 虚拟内存] [《操作系统概念》第9章]',
        default: '这是一个很好的问题！让我基于知识图谱为你解答。\n\n**FCFS（先来先服务）vs 优先级调度：**\n\n**FCFS调度：**\n- 原理：按进程到达顺序执行\n- 优点：实现简单，公平\n- 缺点：可能导致"护航效应"，平均等待时间长\n- 适用场景：批处理系统\n\n**优先级调度：**\n- 原理：根据优先级选择进程\n- 优点：重要任务优先处理\n- 缺点：可能导致"饥饿"问题\n- 适用场景：实时系统\n\n**关键区别：**\n- FCFS不考虑进程特性，优先级调度考虑进程重要性\n- FCFS无抢占，优先级调度可抢占\n\n来源：[知识图谱 - 进程管理 - 多进程调度]',
      };

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date(),
    };

    setCurrentMessages((prev) => [...prev, userMessage]);
    const questionInput = input;
    setInput('');
    setIsTyping(true);

    // 模拟AI响应
    setTimeout(() => {
      let responseContent = mockResponses.default;
      
      if (!isTeacher) {
        if (questionInput.includes('进程') || questionInput.includes('调度')) {
          responseContent = mockResponses.进程;
        } else if (questionInput.includes('虚拟') || questionInput.includes('内存')) {
          responseContent = mockResponses.虚拟;
        }
      }

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: responseContent,
        sources: ['知识图谱', '教材库', '代码示例库'],
        timestamp: new Date(),
      };

      setCurrentMessages((prev) => [...prev, assistantMessage]);
      setIsTyping(false);

      // 如果是新对话（超过2条消息），保存到历史
      if (currentMessages.length >= 2 && currentConversationId === 'current') {
        const newConversation: Conversation = {
          id: Date.now().toString(),
          title: questionInput.substring(0, 20) + (questionInput.length > 20 ? '...' : ''),
          date: '刚刚',
          preview: questionInput,
          messages: [...currentMessages, userMessage, assistantMessage],
        };
        setConversations(prev => [newConversation, ...prev]);
        setCurrentConversationId(newConversation.id);
      }
    }, 1500);
  };

  const handleExampleClick = (question: string) => {
    setInput(question);
  };

  const handleConversationClick = (id: string) => {
    const conversation = conversations.find(c => c.id === id);
    if (conversation) {
      setCurrentMessages(conversation.messages);
      setCurrentConversationId(id);
    }
  };

  const handleNewChat = () => {
    setCurrentMessages([
      {
        id: '1',
        role: 'assistant',
        content: '你好！我是 Vault CS 智能助教。我可以帮你解答计算机科学相关的问题，基于知识图谱为你提供准确的答案。有什么我可以帮助你的吗？',
        timestamp: new Date(),
      },
    ]);
    setCurrentConversationId('current');
  };

  const filteredConversations = conversations.filter((conv) =>
    conv.title.toLowerCase().includes(historySearch.toLowerCase()) ||
    conv.preview.toLowerCase().includes(historySearch.toLowerCase())
  );

  useEffect(() => {
    if (prefilledQuestion) {
      setInput(prefilledQuestion);
      setTimeout(() => {
        handleSend();
      }, 100);
      if (onClearPrefilled) {
        onClearPrefilled();
      }
    }
  }, [prefilledQuestion]);

  return (
    <div className="h-full flex bg-white">
      {/* 左侧历史对话栏 */}
      <div className={`${showHistory ? 'w-80' : 'w-0'} border-r border-slate-200 flex flex-col transition-all duration-300 overflow-hidden`}>
        <div className="p-4 border-b border-slate-200">
          <button
            onClick={handleNewChat}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            <Plus className="w-5 h-5" />
            新建对话
          </button>
        </div>

        <div className="p-4 border-b border-slate-200">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={historySearch}
              onChange={(e) => setHistorySearch(e.target.value)}
              placeholder="搜索历史对话..."
              className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-2">
          {/* 今天 */}
          {filteredConversations.filter(c => c.date.includes('今天')).length > 0 && (
            <div className="mb-4">
              <div className="px-3 py-2 text-xs font-medium text-slate-500">今天</div>
              <div className="space-y-1">
                {filteredConversations
                  .filter(c => c.date.includes('今天'))
                  .map((conv) => (
                    <button
                      key={conv.id}
                      onClick={() => handleConversationClick(conv.id)}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm hover:bg-slate-100 transition-colors ${
                        currentConversationId === conv.id ? 'bg-indigo-50 text-indigo-600' : 'text-slate-700'
                      }`}
                    >
                      <div className="font-medium truncate">{conv.title}</div>
                      <div className="text-xs text-slate-500 truncate mt-1">{conv.preview}</div>
                    </button>
                  ))}
              </div>
            </div>
          )}

          {/* 昨天 */}
          {filteredConversations.filter(c => c.date.includes('昨天')).length > 0 && (
            <div className="mb-4">
              <div className="px-3 py-2 text-xs font-medium text-slate-500">昨天</div>
              <div className="space-y-1">
                {filteredConversations
                  .filter(c => c.date.includes('昨天'))
                  .map((conv) => (
                    <button
                      key={conv.id}
                      onClick={() => handleConversationClick(conv.id)}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm hover:bg-slate-100 transition-colors ${
                        currentConversationId === conv.id ? 'bg-indigo-50 text-indigo-600' : 'text-slate-700'
                      }`}
                    >
                      <div className="font-medium truncate">{conv.title}</div>
                      <div className="text-xs text-slate-500 truncate mt-1">{conv.preview}</div>
                    </button>
                  ))}
              </div>
            </div>
          )}

          {/* 更早 */}
          {filteredConversations.filter(c => !c.date.includes('今天') && !c.date.includes('昨天')).length > 0 && (
            <div className="mb-4">
              <div className="px-3 py-2 text-xs font-medium text-slate-500">更早</div>
              <div className="space-y-1">
                {filteredConversations
                  .filter(c => !c.date.includes('今天') && !c.date.includes('昨天'))
                  .map((conv) => (
                    <button
                      key={conv.id}
                      onClick={() => handleConversationClick(conv.id)}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm hover:bg-slate-100 transition-colors ${
                        currentConversationId === conv.id ? 'bg-indigo-50 text-indigo-600' : 'text-slate-700'
                      }`}
                    >
                      <div className="font-medium truncate">{conv.title}</div>
                      <div className="text-xs text-slate-500 truncate mt-1">{conv.preview}</div>
                    </button>
                  ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 主聊天区域 */}
      <div className="flex-1 flex flex-col">
        {/* 顶部工具栏 */}
        <div className="px-4 py-3 border-b border-slate-200 flex items-center justify-between">
          <button
            onClick={() => setShowHistory(!showHistory)}
            className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
          >
            {showHistory ? <ChevronLeft className="w-5 h-5 text-slate-600" /> : <ChevronRight className="w-5 h-5 text-slate-600" />}
          </button>
          <h2 className="font-semibold text-slate-900">
            {isTeacher ? '教师智能助手' : '智能问答'}
          </h2>
          <div className="w-9"></div>
        </div>

        {/* 聊天消息区域 */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {currentMessages.length === 1 && (
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl mb-4">
                  <Sparkles className="w-8 h-8 text-white" />
                </div>
                <h2 className="font-semibold text-slate-900 mb-2">
                  {isTeacher ? '教师智能助手' : '智能问答助手'}
                </h2>
                <p className="text-sm text-slate-600">
                  {isTeacher 
                    ? '基于学生数据和知识图谱，帮助你快速了解学生学习情况'
                    : '基于知识图谱的RAG增强，为你提供准确、有来源的答案'
                  }
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {exampleQuestions.map((question, index) => (
                  <button
                    key={index}
                    onClick={() => handleExampleClick(question)}
                    className="p-4 bg-slate-50 rounded-lg text-left text-sm text-slate-700 hover:bg-slate-100 transition-colors border border-slate-200"
                  >
                    {question}
                  </button>
                ))}
              </div>
            </div>
          )}

          {currentMessages.map((message) => (
            <div
              key={message.id}
              className={`flex gap-4 ${
                message.role === 'user' ? 'flex-row-reverse' : 'flex-row'
              }`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                  message.role === 'user'
                    ? 'bg-indigo-600'
                    : 'bg-gradient-to-br from-indigo-500 to-purple-600'
                }`}
              >
                {message.role === 'user' ? (
                  <User className="w-5 h-5 text-white" />
                ) : (
                  <Bot className="w-5 h-5 text-white" />
                )}
              </div>

              <div
                className={`flex-1 max-w-3xl ${
                  message.role === 'user' ? 'flex justify-end' : ''
                }`}
              >
                <div
                  className={`rounded-2xl px-4 py-3 ${
                    message.role === 'user'
                      ? 'bg-indigo-600 text-white'
                      : 'bg-slate-50 text-slate-900'
                  }`}
                >
                  <div className="whitespace-pre-wrap text-sm leading-relaxed">
                    {message.content}
                  </div>

                  {message.sources && (
                    <div className="mt-3 pt-3 border-t border-slate-200">
                      <div className="flex items-center gap-2 mb-2">
                        <Tag className="w-3 h-3 text-slate-500" />
                        <span className="text-xs text-slate-500">信息来源</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {message.sources.map((source, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-white border border-slate-200 rounded text-xs text-slate-600"
                          >
                            {source}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className={`mt-2 text-xs ${message.role === 'user' ? 'opacity-80' : 'opacity-60'}`}>
                    {message.timestamp.toLocaleTimeString('zh-CN', {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </div>
                </div>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center flex-shrink-0">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div className="bg-slate-50 rounded-2xl px-4 py-3">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* 输入区域 */}
        <div className="border-t border-slate-200 p-4 bg-white">
          <div className="max-w-4xl mx-auto">
            <div className="flex gap-3">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder={isTeacher ? "输入问题，如：张三的代码提交情况..." : "输入你的问题..."}
                className="flex-1 px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
              <button
                onClick={handleSend}
                disabled={!input.trim()}
                className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:bg-slate-300 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
              >
                <Send className="w-5 h-5" />
                发送
              </button>
            </div>
            <div className="mt-2 text-xs text-slate-500 text-center">
              基于知识图谱的RAG增强 · 所有回答均标注信息来源
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
