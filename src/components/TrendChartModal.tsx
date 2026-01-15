import { X, TrendingUp, TrendingDown } from 'lucide-react';

interface TrendChartModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedCourse: string;
}

export default function TrendChartModal({ isOpen, onClose, selectedCourse }: TrendChartModalProps) {
  if (!isOpen) return null;

  const trendData = [
    { week: '第1周', process: 65, memory: 60, file: 70, device: 55, sync: 50 },
    { week: '第2周', process: 72, memory: 68, file: 75, device: 60, sync: 55 },
    { week: '第3周', process: 78, memory: 72, file: 82, device: 68, sync: 58 },
    { week: '第4周', process: 82, memory: 75, file: 88, device: 72, sync: 62 },
    { week: '第5周', process: 85, memory: 77, file: 90, device: 75, sync: 65 },
    { week: '第6周', process: 87, memory: 77, file: 92, device: 78, sync: 68 },
  ];

  const topics = [
    { key: 'process', name: '进程管理', color: 'rgb(59, 130, 246)' },
    { key: 'memory', name: '内存管理', color: 'rgb(168, 85, 247)' },
    { key: 'file', name: '文件系统', color: 'rgb(34, 197, 94)' },
    { key: 'device', name: '设备管理', color: 'rgb(251, 146, 60)' },
    { key: 'sync', name: '并发控制', color: 'rgb(236, 72, 153)' },
  ];

  const maxValue = 100;
  const chartHeight = 300;
  const chartWidth = 600;
  const padding = { top: 20, right: 20, bottom: 40, left: 50 };

  const getY = (value: number) => {
    return chartHeight - padding.bottom - ((value / maxValue) * (chartHeight - padding.top - padding.bottom));
  };

  const getX = (index: number) => {
    const availableWidth = chartWidth - padding.left - padding.right;
    return padding.left + (index / (trendData.length - 1)) * availableWidth;
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-8">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[75vh] overflow-y-auto">
        {/* 头部 */}
        <div className="flex items-center justify-between p-6 border-b border-slate-200">
          <div>
            <h2 className="text-xl font-bold text-slate-900">知识点掌握度趋势</h2>
            <p className="text-sm text-slate-600 mt-1">课程：{selectedCourse}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-slate-500" />
          </button>
        </div>

        {/* 图表 */}
        <div className="p-6">
          <div className="bg-slate-50 rounded-xl p-6 mb-6">
            <svg width={chartWidth} height={chartHeight} className="w-full">
              {/* 网格线 */}
              {[0, 25, 50, 75, 100].map((value) => (
                <g key={value}>
                  <line
                    x1={padding.left}
                    y1={getY(value)}
                    x2={chartWidth - padding.right}
                    y2={getY(value)}
                    stroke="#e2e8f0"
                    strokeWidth="1"
                  />
                  <text
                    x={padding.left - 10}
                    y={getY(value) + 4}
                    textAnchor="end"
                    className="text-xs fill-slate-500"
                  >
                    {value}%
                  </text>
                </g>
              ))}

              {/* X轴标签 */}
              {trendData.map((data, index) => (
                <text
                  key={index}
                  x={getX(index)}
                  y={chartHeight - padding.bottom + 20}
                  textAnchor="middle"
                  className="text-xs fill-slate-600"
                >
                  {data.week}
                </text>
              ))}

              {/* 趋势线 */}
              {topics.map((topic) => {
                const points = trendData.map((data, index) => ({
                  x: getX(index),
                  y: getY(data[topic.key as keyof typeof data] as number),
                }));

                const pathData = points
                  .map((point, index) => `${index === 0 ? 'M' : 'L'} ${point.x} ${point.y}`)
                  .join(' ');

                return (
                  <g key={topic.key}>
                    <path
                      d={pathData}
                      fill="none"
                      stroke={topic.color}
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    {points.map((point, index) => (
                      <circle
                        key={index}
                        cx={point.x}
                        cy={point.y}
                        r="4"
                        fill={topic.color}
                        stroke="white"
                        strokeWidth="2"
                        className="cursor-pointer hover:r-6 transition-all"
                      />
                    ))}
                  </g>
                );
              })}
            </svg>

            {/* 图例 */}
            <div className="flex flex-wrap gap-4 justify-center mt-4">
              {topics.map((topic) => (
                <div key={topic.key} className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: topic.color }}
                  />
                  <span className="text-sm text-slate-600">{topic.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 统计卡片 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-green-50 rounded-lg p-4 border border-green-200">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="text-xs text-green-700 mb-1">进步最快</div>
                  <div className="font-semibold text-green-900">文件系统</div>
                  <div className="text-xs text-green-600">+22%</div>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
                <div>
                  <div className="text-xs text-blue-700 mb-1">平均进步</div>
                  <div className="font-semibold text-blue-900">+15.8%</div>
                  <div className="text-xs text-blue-600">6周内</div>
                </div>
              </div>
            </div>

            <div className="bg-orange-50 rounded-lg p-4 border border-orange-200">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center">
                  <TrendingDown className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="text-xs text-orange-700 mb-1">需要关注</div>
                  <div className="font-semibold text-orange-900">并发控制</div>
                  <div className="text-xs text-orange-600">+13%</div>
                </div>
              </div>
            </div>
          </div>

          {/* 详细数据表格 */}
          <div className="mt-6">
            <h3 className="font-semibold text-slate-900 mb-3">详细数据</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-slate-100">
                  <tr>
                    <th className="px-4 py-2 text-left font-medium text-slate-700">周次</th>
                    {topics.map((topic) => (
                      <th key={topic.key} className="px-4 py-2 text-left font-medium text-slate-700">
                        {topic.name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {trendData.map((data, index) => (
                    <tr key={index} className="hover:bg-slate-50">
                      <td className="px-4 py-2 font-medium text-slate-900">{data.week}</td>
                      {topics.map((topic) => {
                        const value = data[topic.key as keyof typeof data] as number;
                        const prevValue = index > 0 ? (trendData[index - 1][topic.key as keyof typeof trendData[0]] as number) : value;
                        const change = value - prevValue;

                        return (
                          <td key={topic.key} className="px-4 py-2">
                            <div className="flex items-center gap-2">
                              <span className="font-medium">{value}%</span>
                              {index > 0 && change !== 0 && (
                                <span className={`text-xs ${change > 0 ? 'text-green-600' : 'text-red-600'}`}>
                                  {change > 0 ? '+' : ''}{change}%
                                </span>
                              )}
                            </div>
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* 底部 */}
        <div className="p-6 border-t border-slate-200 bg-slate-50 rounded-b-2xl">
          <div className="flex items-center justify-between">
            <div className="text-sm text-slate-600">
              💡 持续学习，保持进步！
            </div>
            <button
              onClick={onClose}
              className="px-6 py-2 bg-indigo-600 text-white rounded-lg text-sm hover:bg-indigo-700 transition-colors"
            >
              关闭
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}