import { useState } from 'react';
import { ChevronRight, ChevronDown, BookOpen, Video, FileText, Code, Link2, Plus, Upload, Mic, X, MessageSquare } from 'lucide-react';
import AskTeacherModal from './AskTeacherModal';

interface KnowledgeGraphProps {
  isTeacher: boolean;
  onNavigateToQA?: (question: string) => void;
  onAskTeacher?: (question: string) => void;
  selectedCourse: string;
}

interface KnowledgeNode {
  id: string;
  name: string;
  level: number; // 1: 一级知识点, 2: 二级知识点, 3: 三级知识点
  mastery?: number;
  prerequisites: string[];
  related: string[];
  nextTopics?: string[];
  children?: KnowledgeNode[];
  resources: {
    type: 'textbook' | 'video' | 'exercise' | 'code';
    title: string;
  }[];
}

// 课程知识点数据
const courseKnowledgeData: { [course: string]: { topics: { [key: string]: any } } } = {
  '操作系统': {
    topics: {
      process: {
        name: '进程管理',
        nodes: [
          {
            id: 'p1',
            name: '进程基础',
            level: 1,
            mastery: 88,
            children: [
              { id: 'p1-1', name: '进程概念', level: 2, mastery: 92 },
              { id: 'p1-2', name: '进程控制块PCB', level: 2, mastery: 85 },
              { id: 'p1-3', name: '进程创建与终止', level: 2, mastery: 87,
                children: [
                  { id: 'p1-3-1', name: 'fork()系统调用', level: 3, mastery: 90 },
                  { id: 'p1-3-2', name: 'exec()系列函数', level: 3, mastery: 82 },
                  { id: 'p1-3-3', name: '进程终止方式', level: 3, mastery: 88 },
                ]
              },
            ]
          },
          {
            id: 'p2',
            name: '进程调度',
            level: 1,
            mastery: 76,
            children: [
              { id: 'p2-1', name: '调度算法概述', level: 2, mastery: 80 },
              { id: 'p2-2', name: 'FCFS调度', level: 2, mastery: 85,
                children: [
                  { id: 'p2-2-1', name: 'FCFS原理', level: 3, mastery: 88 },
                  { id: 'p2-2-2', name: 'FCFS优缺点', level: 3, mastery: 82 },
                ]
              },
              { id: 'p2-3', name: 'SJF调度', level: 2, mastery: 72 },
              { id: 'p2-4', name: '优先级调度', level: 2, mastery: 68 },
              { id: 'p2-5', name: '时间片轮转RR', level: 2, mastery: 75,
                children: [
                  { id: 'p2-5-1', name: '时间片大小选择', level: 3, mastery: 70 },
                  { id: 'p2-5-2', name: 'RR性能分析', level: 3, mastery: 68 },
                ]
              },
            ]
          },
          {
            id: 'p3',
            name: '进程通信',
            level: 1,
            mastery: 82,
            children: [
              { id: 'p3-1', name: '管道通信', level: 2, mastery: 85 },
              { id: 'p3-2', name: '消息队列', level: 2, mastery: 78 },
              { id: 'p3-3', name: '共享内存', level: 2, mastery: 80 },
              { id: 'p3-4', name: '信号量', level: 2, mastery: 82 },
            ]
          },
        ],
      },
      memory: {
        name: '内存管理',
        nodes: [
          {
            id: 'm1',
            name: '内存基础',
            level: 1,
            mastery: 85,
            children: [
              { id: 'm1-1', name: '物理地址与逻辑地址', level: 2, mastery: 90 },
              { id: 'm1-2', name: '内存分配方式', level: 2, mastery: 82 },
              { id: 'm1-3', name: '碎片问题', level: 2, mastery: 83 },
            ]
          },
          {
            id: 'm2',
            name: '分页与分段',
            level: 1,
            mastery: 77,
            children: [
              { id: 'm2-1', name: '分页机制', level: 2, mastery: 82,
                children: [
                  { id: 'm2-1-1', name: '页表结构', level: 3, mastery: 85 },
                  { id: 'm2-1-2', name: '多级页表', level: 3, mastery: 75 },
                  { id: 'm2-1-3', name: 'TLB快表', level: 3, mastery: 70 },
                ]
              },
              { id: 'm2-2', name: '分段机制', level: 2, mastery: 78 },
              { id: 'm2-3', name: '段页式管理', level: 2, mastery: 72 },
            ]
          },
          {
            id: 'm3',
            name: '虚拟内存',
            level: 1,
            mastery: 73,
            children: [
              { id: 'm3-1', name: '虚拟内存概念', level: 2, mastery: 80 },
              { id: 'm3-2', name: '页面置换算法', level: 2, mastery: 68,
                children: [
                  { id: 'm3-2-1', name: 'FIFO算法', level: 3, mastery: 75 },
                  { id: 'm3-2-2', name: 'LRU算法', level: 3, mastery: 65 },
                  { id: 'm3-2-3', name: 'Clock算法', level: 3, mastery: 60 },
                ]
              },
              { id: 'm3-3', name: '工作集模型', level: 2, mastery: 70 },
            ]
          },
        ],
      },
      file: {
        name: '文件系统',
        nodes: [
          {
            id: 'f1',
            name: '文件组织',
            level: 1,
            mastery: 92,
            children: [
              { id: 'f1-1', name: '文件结构', level: 2, mastery: 95 },
              { id: 'f1-2', name: '目录结构', level: 2, mastery: 90 },
            ]
          },
          {
            id: 'f2',
            name: '文件系统实现',
            level: 1,
            mastery: 88,
            children: [
              { id: 'f2-1', name: 'inode结构', level: 2, mastery: 90 },
              { id: 'f2-2', name: '空间分配方法', level: 2, mastery: 85 },
            ]
          },
        ],
      },
      device: {
        name: '设备管理',
        nodes: [
          {
            id: 'd1',
            name: 'I/O系统',
            level: 1,
            mastery: 78,
            children: [
              { id: 'd1-1', name: 'I/O控制方式', level: 2, mastery: 82 },
              { id: 'd1-2', name: 'DMA技术', level: 2, mastery: 75 },
            ]
          },
        ],
      },
      sync: {
        name: '并发控制',
        nodes: [
          {
            id: 's1',
            name: '同步互斥',
            level: 1,
            mastery: 70,
            children: [
              { id: 's1-1', name: '临界区问题', level: 2, mastery: 75 },
              { id: 's1-2', name: '互斥锁', level: 2, mastery: 68 },
              { id: 's1-3', name: '条件变量', level: 2, mastery: 65 },
            ]
          },
          {
            id: 's2',
            name: '死锁',
            level: 1,
            mastery: 68,
            children: [
              { id: 's2-1', name: '死锁条件', level: 2, mastery: 72 },
              { id: 's2-2', name: '死锁预防', level: 2, mastery: 65 },
              { id: 's2-3', name: '死锁避免', level: 2, mastery: 66 },
              { id: 's2-4', name: '死锁检测', level: 2, mastery: 68 },
            ]
          },
        ],
      },
    },
  },
  '数据结构': {
    topics: {
      linear: {
        name: '线性结构',
        nodes: [
          {
            id: 'ds1',
            name: '数组与链表',
            level: 1,
            mastery: 90,
            children: [
              { id: 'ds1-1', name: '顺序表', level: 2, mastery: 92 },
              { id: 'ds1-2', name: '单链表', level: 2, mastery: 88 },
              { id: 'ds1-3', name: '双向链表', level: 2, mastery: 85 },
            ]
          },
          {
            id: 'ds2',
            name: '栈与队列',
            level: 1,
            mastery: 87,
            children: [
              { id: 'ds2-1', name: '栈的实现', level: 2, mastery: 90 },
              { id: 'ds2-2', name: '队列的实现', level: 2, mastery: 85 },
              { id: 'ds2-3', name: '优先队列', level: 2, mastery: 82 },
            ]
          },
        ],
      },
      tree: {
        name: '树形结构',
        nodes: [
          {
            id: 'ds3',
            name: '二叉树',
            level: 1,
            mastery: 82,
            children: [
              { id: 'ds3-1', name: '二叉树遍历', level: 2, mastery: 88 },
              { id: 'ds3-2', name: '二叉搜索树', level: 2, mastery: 78 },
              { id: 'ds3-3', name: '平衡二叉树', level: 2, mastery: 75 },
            ]
          },
        ],
      },
    },
  },
};

export default function KnowledgeGraph({ isTeacher, onNavigateToQA, onAskTeacher, selectedCourse }: KnowledgeGraphProps) {
  const [selectedTopic, setSelectedTopic] = useState('process');
  const [selectedNode, setSelectedNode] = useState<KnowledgeNode | null>(null);
  const [expandedTopics, setExpandedTopics] = useState<string[]>(['process']);
  const [expandedNodes, setExpandedNodes] = useState<string[]>(['p1', 'p2', 'p3']);
  const [showAskModal, setShowAskModal] = useState(false);

  const currentCourseData = courseKnowledgeData[selectedCourse] || courseKnowledgeData['操作系统'];

  const handleNavigateToQA = () => {
    if (selectedNode && onNavigateToQA) {
      onNavigateToQA(`请解释"${selectedNode.name}"的概念和应用`);
    }
  };

  const handleAskTeacherSubmit = (question: string) => {
    if (onAskTeacher) {
      onAskTeacher(question);
    }
    setShowAskModal(false);
  };

  const toggleTopic = (topicId: string) => {
    setExpandedTopics(prev =>
      prev.includes(topicId)
        ? prev.filter(id => id !== topicId)
        : [...prev, topicId]
    );
  };

  const toggleNode = (nodeId: string) => {
    setExpandedNodes(prev =>
      prev.includes(nodeId)
        ? prev.filter(id => id !== nodeId)
        : [...prev, nodeId]
    );
  };

  const selectNode = (node: KnowledgeNode) => {
    // 根据节点ID动态设置关联关系
    const relationshipMap: { [key: string]: { prerequisites: string[]; related: string[]; nextTopics: string[] } } = {
      'p1': { prerequisites: [], related: ['线程管理', '内存管理'], nextTopics: ['进程调度', '进程通信'] },
      'p1-1': { prerequisites: [], related: ['程序', '任务'], nextTopics: ['进程控制块PCB'] },
      'p1-2': { prerequisites: ['进程概念'], related: ['任务描述符', '上下文'], nextTopics: ['进程创建'] },
      'p1-3': { prerequisites: ['进程概念', 'PCB'], related: ['系统调用', '内核'], nextTopics: ['进程状态转换'] },
      'p1-3-1': { prerequisites: ['系统调用'], related: ['clone()', 'vfork()'], nextTopics: ['exec()函数'] },
      'p1-3-2': { prerequisites: ['fork()'], related: ['execve()', 'execl()'], nextTopics: ['进程终止'] },
      'p1-3-3': { prerequisites: ['进程创建'], related: ['exit()', '_exit()'], nextTopics: [] },
      
      'p2': { prerequisites: ['进程基础'], related: ['CPU调度', '优先级'], nextTopics: ['上下文切换', '多道程序设计'] },
      'p2-1': { prerequisites: ['进程概念'], related: ['调度策略', '时间片'], nextTopics: ['FCFS', 'SJF'] },
      'p2-2': { prerequisites: ['调度概述'], related: ['非抢占式', '先来先服务'], nextTopics: ['SJF调度'] },
      'p2-2-1': { prerequisites: ['FCFS'], related: ['队列', 'FIFO'], nextTopics: ['FCFS优缺点'] },
      'p2-2-2': { prerequisites: ['FCFS原理'], related: ['平均等待时间', '护航效应'], nextTopics: [] },
      'p2-3': { prerequisites: ['FCFS'], related: ['最短作业优先', '抢占式'], nextTopics: ['优先级调度'] },
      'p2-4': { prerequisites: ['SJF'], related: ['静态优先级', '动态优先级'], nextTopics: ['时间片轮转'] },
      'p2-5': { prerequisites: ['优先级'], related: ['Round Robin', '抢占式'], nextTopics: ['多级反馈队列'] },
      'p2-5-1': { prerequisites: ['RR'], related: ['响应时间', '上下文切换开销'], nextTopics: ['性能分析'] },
      'p2-5-2': { prerequisites: ['时间片选择'], related: ['吞吐量', '响应时间'], nextTopics: [] },
      
      'p3': { prerequisites: ['进程基础'], related: ['IPC', '同步机制'], nextTopics: ['进程同步', '线程通信'] },
      'p3-1': { prerequisites: ['文件描述符'], related: ['半双工', '匿名管道'], nextTopics: ['消息队列'] },
      'p3-2': { prerequisites: ['管道'], related: ['队列结构', 'System V IPC'], nextTopics: ['共享内存'] },
      'p3-3': { prerequisites: ['消息队列'], related: ['内存映射', 'mmap()'], nextTopics: ['信号量'] },
      'p3-4': { prerequisites: ['共享内存'], related: ['P操作', 'V操作'], nextTopics: ['死锁'] },
      
      'm1': { prerequisites: ['计算机组成'], related: ['存储层次', '地址空间'], nextTopics: ['分页管理', '分段管理'] },
      'm1-1': { prerequisites: ['地址总线'], related: ['虚拟地址', 'MMU'], nextTopics: ['地址转换'] },
      'm1-2': { prerequisites: ['内存基础'], related: ['连续分配', '非连续分配'], nextTopics: ['碎片问题'] },
      'm1-3': { prerequisites: ['内存分配'], related: ['内部碎片', '外部碎片'], nextTopics: ['紧缩技术'] },
      
      'm2': { prerequisites: ['内存基础'], related: ['虚拟内存', '地址映射'], nextTopics: ['页面置换', 'TLB'] },
      'm2-1': { prerequisites: ['逻辑地址'], related: ['页号', '页内偏移'], nextTopics: ['多级页表', 'TLB'] },
      'm2-1-1': { prerequisites: ['分页'], related: ['页表项', 'PTE'], nextTopics: ['多级页表'] },
      'm2-1-2': { prerequisites: ['页表'], related: ['二级页表', '三级页表'], nextTopics: ['TLB'] },
      'm2-1-3': { prerequisites: ['多级页表'], related: ['快表', 'Cache'], nextTopics: ['地址转换加速'] },
      'm2-2': { prerequisites: ['逻辑地址'], related: ['段号', '段内偏移'], nextTopics: ['段页式'] },
      'm2-3': { prerequisites: ['分页', '分段'], related: ['Intel 80386'], nextTopics: ['虚拟内存'] },
      
      'm3': { prerequisites: ['分页管理'], related: ['请求分页', '缺页中断'], nextTopics: ['页面置换算法', '工作集'] },
      'm3-1': { prerequisites: ['分页'], related: ['覆盖', '交换'], nextTopics: ['请求分页'] },
      'm3-2': { prerequisites: ['虚拟内存'], related: ['缺页', '页面调度'], nextTopics: ['抖动'] },
      'm3-2-1': { prerequisites: ['页面置换'], related: ['队列', '先进先出'], nextTopics: ['LRU'] },
      'm3-2-2': { prerequisites: ['FIFO'], related: ['最近最少使用', '栈算法'], nextTopics: ['Clock'] },
      'm3-2-3': { prerequisites: ['LRU'], related: ['二次机会', '时钟算法'], nextTopics: ['改进Clock'] },
      'm3-3': { prerequisites: ['页面置换'], related: ['局部性原理', '驻留集'], nextTopics: ['抖动控制'] },
      
      'f1': { prerequisites: ['文件概念'], related: ['目录', '索引'], nextTopics: ['文件操作', '文件系统实现'] },
      'f1-1': { prerequisites: ['文件'], related: ['顺序文件', '索引文件'], nextTopics: ['目录结构'] },
      'f1-2': { prerequisites: ['文件结构'], related: ['树形目录', '路径'], nextTopics: ['文件共享'] },
      
      'f2': { prerequisites: ['文件组织'], related: ['磁盘管理', 'I/O'], nextTopics: ['磁盘调度', '空闲空间管理'] },
      'f2-1': { prerequisites: ['文件系统'], related: ['索引节点', 'Unix'], nextTopics: ['文件分配'] },
      'f2-2': { prerequisites: ['inode'], related: ['连续分配', '链接分配'], nextTopics: ['索引分配'] },
      
      'd1': { prerequisites: ['设备管理'], related: ['驱动程序', '设备控制器'], nextTopics: ['磁盘管理', '缓冲技术'] },
      'd1-1': { prerequisites: ['I/O系统'], related: ['轮询', '中断', 'DMA'], nextTopics: ['设备驱动'] },
      'd1-2': { prerequisites: ['I/O控制'], related: ['直接内存访问', '总线主控'], nextTopics: ['通道技术'] },
      
      's1': { prerequisites: ['并发控制'], related: ['竞态条件', '临界资源'], nextTopics: ['信号量', '管程'] },
      's1-1': { prerequisites: ['并发'], related: ['互斥', '原子操作'], nextTopics: ['互斥锁'] },
      's1-2': { prerequisites: ['临界区'], related: ['锁', 'mutex'], nextTopics: ['条件变量'] },
      's1-3': { prerequisites: ['互斥锁'], related: ['等待队列', '唤醒机制'], nextTopics: ['管程'] },
      
      's2': { prerequisites: ['同步互斥'], related: ['资源分配', '循环等待'], nextTopics: ['银行家算法', '资源分配图'] },
      's2-1': { prerequisites: ['死锁'], related: ['互斥', '持有并等待'], nextTopics: ['死锁预防'] },
      's2-2': { prerequisites: ['死锁条件'], related: ['破坏循环等待'], nextTopics: ['死锁避免'] },
      's2-3': { prerequisites: ['死锁条件'], related: ['安全状态', '银行家算法'], nextTopics: ['死锁检测'] },
      's2-4': { prerequisites: ['死锁避免'], related: ['资源分配图', 'RAG'], nextTopics: ['死锁恢复'] },
      
      // 数据结构课程
      'ds1': { prerequisites: ['程序设计基础'], related: ['数组', '指针'], nextTopics: ['栈与队列', '树'] },
      'ds1-1': { prerequisites: ['数组'], related: ['静态分配', '随机访问'], nextTopics: ['单链表'] },
      'ds1-2': { prerequisites: ['顺序表'], related: ['动态分配', '指针'], nextTopics: ['双向链表'] },
      'ds1-3': { prerequisites: ['单链表'], related: ['前驱指针', '后继指针'], nextTopics: ['循环链表'] },
      
      'ds2': { prerequisites: ['数组与链表'], related: ['LIFO', 'FIFO'], nextTopics: ['栈的应用', '队列应用'] },
      'ds2-1': { prerequisites: ['线性表'], related: ['后进先出', 'push/pop'], nextTopics: ['栈的应用'] },
      'ds2-2': { prerequisites: ['线性表'], related: ['先进先出', 'enqueue/dequeue'], nextTopics: ['循环队列'] },
      'ds2-3': { prerequisites: ['队列'], related: ['堆', 'heap'], nextTopics: ['堆排序'] },
      
      'ds3': { prerequisites: ['栈与队列'], related: ['树的概念', '递归'], nextTopics: ['二叉搜索树', 'AVL树'] },
      'ds3-1': { prerequisites: ['二叉树'], related: ['前序', '中序', '后序'], nextTopics: ['层序遍历'] },
      'ds3-2': { prerequisites: ['二叉树遍历'], related: ['BST', '查找'], nextTopics: ['AVL树'] },
      'ds3-3': { prerequisites: ['BST'], related: ['旋转', '平衡因子'], nextTopics: ['红黑树'] },
    };

    const relationships = relationshipMap[node.id] || {
      prerequisites: [],
      related: [],
      nextTopics: []
    };

    setSelectedNode({
      ...node,
      prerequisites: relationships.prerequisites,
      related: relationships.related,
      nextTopics: relationships.nextTopics,
      resources: [
        { type: 'textbook', title: `《${selectedCourse}》相关章节` },
        { type: 'video', title: `${node.name}视频讲解（25分钟）` },
        { type: 'exercise', title: `${node.name}练习题（12道）` },
        { type: 'code', title: `${node.name}代码示例` },
      ]
    });
  };

  const renderNodeTree = (nodes: KnowledgeNode[], depth: number = 0) => {
    return nodes.map((node) => (
      <div key={node.id} className={`${depth > 0 ? 'ml-4' : ''}`}>
        <button
          onClick={() => {
            if (node.children && node.children.length > 0) {
              toggleNode(node.id);
            }
            selectNode(node);
          }}
          className={`w-full flex items-center justify-between px-3 py-1.5 text-sm rounded transition-colors ${
            selectedNode?.id === node.id
              ? 'bg-indigo-50 text-indigo-600'
              : 'text-slate-600 hover:bg-slate-50'
          }`}
        >
          <div className="flex items-center gap-2">
            {node.children && node.children.length > 0 && (
              expandedNodes.includes(node.id) ? (
                <ChevronDown className="w-3.5 h-3.5 flex-shrink-0" />
              ) : (
                <ChevronRight className="w-3.5 h-3.5 flex-shrink-0" />
              )
            )}
            <span className={node.level === 1 ? 'font-medium' : ''}>{node.name}</span>
          </div>
          {!isTeacher && node.mastery && (
            <span className={`text-xs ${
              node.mastery >= 80 ? 'text-green-600' :
              node.mastery >= 70 ? 'text-yellow-600' :
              'text-red-600'
            }`}>
              {node.mastery}%
            </span>
          )}
        </button>

        {node.children && expandedNodes.includes(node.id) && (
          <div className="mt-1 space-y-1">
            {renderNodeTree(node.children, depth + 1)}
          </div>
        )}
      </div>
    ));
  };

  const resourceIcons = {
    textbook: BookOpen,
    video: Video,
    exercise: FileText,
    code: Code,
  };

  return (
    <>
      <AskTeacherModal 
        isOpen={showAskModal}
        onClose={() => setShowAskModal(false)}
        knowledgePointName={selectedNode?.name || ''}
        onSubmit={handleAskTeacherSubmit}
      />
      
      <div className="h-full flex">
        {/* 左侧树状导航 */}
        <div className="w-80 bg-white border-r border-slate-200 overflow-y-auto">
          <div className="p-4 border-b border-slate-200">
            <h3 className="font-semibold text-slate-900">知识领域</h3>
            <p className="text-xs text-slate-500 mt-1">当前课程：{selectedCourse}</p>
          </div>
          
          <div className="p-2">
            <div className="ml-2 space-y-1">
              {Object.entries(currentCourseData.topics).map(([topicId, topic]) => (
                <div key={topicId}>
                  <button
                    onClick={() => {
                      toggleTopic(topicId);
                      setSelectedTopic(topicId);
                    }}
                    className={`w-full flex items-center gap-2 px-3 py-2 text-sm rounded-lg transition-colors ${
                      selectedTopic === topicId
                        ? 'bg-indigo-50 text-indigo-600 font-medium'
                        : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    {expandedTopics.includes(topicId) ? (
                      <ChevronDown className="w-4 h-4" />
                    ) : (
                      <ChevronRight className="w-4 h-4" />
                    )}
                    <BookOpen className="w-4 h-4" />
                    {topic.name}
                  </button>

                  {expandedTopics.includes(topicId) && (
                    <div className="ml-4 mt-1 space-y-1">
                      {renderNodeTree(topic.nodes)}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {isTeacher && (
            <div className="p-4 border-t border-slate-200">
              <button className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm hover:bg-indigo-700">
                <Plus className="w-4 h-4" />
                添加知识点
              </button>
            </div>
          )}
        </div>

        {/* 中间知识点网络图 */}
        <div className="flex-1 bg-slate-50 overflow-hidden">
          <div className="h-full flex flex-col">
            <div className="p-4 bg-white border-b border-slate-200">
              <h3 className="font-semibold text-slate-900">知识点关联网络</h3>
              <p className="text-xs text-slate-500 mt-1">点击节点查看详细信息</p>
            </div>

            <div className="flex-1 p-8 overflow-auto flex items-center justify-center">
              {selectedNode ? (
                <div className="relative w-full h-[500px]">
                  <svg className="w-full h-full">
                    {/* 中心节点 */}
                    <circle cx="400" cy="250" r="60" fill="#6366f1" />
                    <text x="400" y="250" textAnchor="middle" fill="white" className="text-sm font-semibold" dy="0.3em">
                      {selectedNode.name}
                    </text>
                    
                    {/* 前置知识点 - 左上方 */}
                    {selectedNode.prerequisites && selectedNode.prerequisites.map((prereq, idx) => {
                      const angle = -120 + idx * 30;
                      const rad = (angle * Math.PI) / 180;
                      const x = 400 + 180 * Math.cos(rad);
                      const y = 250 + 180 * Math.sin(rad);
                      return (
                        <g key={`prereq-${idx}`}>
                          <line x1={x} y1={y} x2="360" y2="220" stroke="#10b981" strokeWidth="2" markerEnd="url(#arrowhead)" />
                          <circle cx={x} cy={y} r="40" fill="#10b981" className="cursor-pointer hover:opacity-80" />
                          <text x={x} y={y} textAnchor="middle" fill="white" className="text-xs pointer-events-none" dy="0.3em">
                            {prereq}
                          </text>
                        </g>
                      );
                    })}
                    
                    {/* 相关知识点 - 右侧分布 */}
                    {selectedNode.related && selectedNode.related.map((rel, idx) => {
                      const angle = -60 + idx * 60;
                      const rad = (angle * Math.PI) / 180;
                      const x = 400 + 200 * Math.cos(rad);
                      const y = 250 + 200 * Math.sin(rad);
                      return (
                        <g key={`rel-${idx}`}>
                          <line x1="400" y1="250" x2={x} y2={y} stroke="#cbd5e1" strokeWidth="2" strokeDasharray="5,5" />
                          <circle cx={x} cy={y} r="40" fill="#f59e0b" className="cursor-pointer hover:opacity-80" />
                          <text x={x} y={y} textAnchor="middle" fill="white" className="text-xs pointer-events-none" dy="0.3em">
                            {rel}
                          </text>
                        </g>
                      );
                    })}
                    
                    {/* 后续知识点 - 下方 */}
                    {selectedNode.nextTopics && selectedNode.nextTopics.map((next, idx) => {
                      const x = 300 + idx * 120;
                      const y = 420;
                      return (
                        <g key={`next-${idx}`}>
                          <line x1="400" y1="310" x2={x} y2={y - 40} stroke="#8b5cf6" strokeWidth="2" markerEnd="url(#arrowhead-purple)" />
                          <circle cx={x} cy={y} r="35" fill="#8b5cf6" className="cursor-pointer hover:opacity-80" />
                          <text x={x} y={y} textAnchor="middle" fill="white" className="text-xs pointer-events-none" dy="0.3em">
                            {next}
                          </text>
                        </g>
                      );
                    })}
                    
                    {/* 箭头定义 */}
                    <defs>
                      <marker id="arrowhead" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
                        <polygon points="0 0, 10 3, 0 6" fill="#10b981" />
                      </marker>
                      <marker id="arrowhead-purple" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
                        <polygon points="0 0, 10 3, 0 6" fill="#8b5cf6" />
                      </marker>
                    </defs>
                  </svg>
                  
                  <div className="absolute bottom-4 left-4 bg-white rounded-lg p-3 shadow-lg border border-slate-200">
                    <div className="text-xs font-semibold text-slate-900 mb-2">图例</div>
                    <div className="space-y-1.5 text-xs">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-indigo-600"></div>
                        <span className="text-slate-600">当前知识点</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                        <span className="text-slate-600">前置知识</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                        <span className="text-slate-600">相关知识</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-purple-600"></div>
                        <span className="text-slate-600">后续知识</span>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto bg-indigo-100 rounded-full flex items-center justify-center mb-4">
                    <BookOpen className="w-8 h-8 text-indigo-600" />
                  </div>
                  <p className="text-slate-600 mb-2">点击左侧知识点查看关联网络</p>
                  <p className="text-sm text-slate-500">网络图将展示知识点之间的关系</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 右侧详情面板 */}
        {selectedNode && (
          <div className="w-96 bg-white border-l border-slate-200 overflow-y-auto">
            <div className="p-6 space-y-6">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <h3 className="font-semibold text-slate-900">{selectedNode.name}</h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      {selectedNode.level === 1 ? '一级知识点' : 
                       selectedNode.level === 2 ? '二级知识点' : '三级知识点'}
                    </p>
                  </div>
                  <button 
                    onClick={() => setSelectedNode(null)}
                    className="p-1 hover:bg-slate-100 rounded"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                {!isTeacher && selectedNode.mastery && (
                  <div>
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span className="text-slate-600">掌握度</span>
                      <span className="font-semibold text-slate-900">{selectedNode.mastery}%</span>
                    </div>
                    <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${
                          selectedNode.mastery >= 80 ? 'bg-green-500' :
                          selectedNode.mastery >= 70 ? 'bg-yellow-500' :
                          'bg-red-500'
                        }`}
                        style={{ width: `${selectedNode.mastery}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>

              <div>
                <h4 className="text-sm font-semibold text-slate-900 mb-2">学习资源</h4>
                <div className="space-y-2">
                  {selectedNode.resources.map((resource, index) => {
                    const Icon = resourceIcons[resource.type];
                    return (
                      <div
                        key={index}
                        className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg hover:bg-slate-100 cursor-pointer transition-colors"
                      >
                        <Icon className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-slate-700">{resource.title}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {isTeacher && (
                <button className="w-full flex items-center justify-center gap-2 px-4 py-2 border-2 border-dashed border-slate-300 rounded-lg text-sm text-slate-600 hover:border-indigo-400 hover:text-indigo-600 transition-colors">
                  <Plus className="w-4 h-4" />
                  添加学习资源
                </button>
              )}

              {/* 学生端快捷操作栏 */}
              {!isTeacher && (
                <div className="pt-4 border-t border-slate-200">
                  <div className="grid grid-cols-2 gap-2">
                    <button 
                      onClick={handleNavigateToQA}
                      className="flex items-center justify-center gap-2 px-4 py-3 bg-indigo-600 text-white rounded-lg text-sm hover:bg-indigo-700 transition-colors"
                    >
                      <MessageSquare className="w-4 h-4" />
                      智能问答
                    </button>
                    <button 
                      onClick={() => setShowAskModal(true)}
                      className="flex items-center justify-center gap-2 px-4 py-3 border-2 border-indigo-600 text-indigo-600 rounded-lg text-sm hover:bg-indigo-50 transition-colors"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                      </svg>
                      向老师提问
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
}