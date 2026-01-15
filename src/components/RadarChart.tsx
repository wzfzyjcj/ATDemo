import { useState } from 'react';

interface RadarChartProps {
  data: Array<{
    topic: string;
    value: number;
    average?: number;
  }>;
  size?: number;
}

export default function RadarChart({ data, size = 300 }: RadarChartProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  
  const centerX = size / 2;
  const centerY = size / 2;
  const maxRadius = size / 2 - 60;
  const levels = 4;
  
  // 计算每个点的坐标
  const getPoint = (value: number, index: number) => {
    const angle = (Math.PI * 2 * index) / data.length - Math.PI / 2;
    const radius = (value / 100) * maxRadius;
    return {
      x: centerX + radius * Math.cos(angle),
      y: centerY + radius * Math.sin(angle),
    };
  };

  // 计算标签位置
  const getLabelPoint = (index: number) => {
    const angle = (Math.PI * 2 * index) / data.length - Math.PI / 2;
    const radius = maxRadius + 30;
    return {
      x: centerX + radius * Math.cos(angle),
      y: centerY + radius * Math.sin(angle),
    };
  };

  // 生成多边形路径
  const generatePath = (values: number[]) => {
    const points = values.map((value, index) => getPoint(value, index));
    const pathData = points.map((point, index) => 
      `${index === 0 ? 'M' : 'L'} ${point.x} ${point.y}`
    ).join(' ') + ' Z';
    return pathData;
  };

  // 生成网格环
  const generateGridLevels = () => {
    return Array.from({ length: levels }, (_, i) => {
      const levelValue = ((i + 1) / levels) * 100;
      const points = data.map((_, index) => getPoint(levelValue, index));
      const pathData = points.map((point, index) => 
        `${index === 0 ? 'M' : 'L'} ${point.x} ${point.y}`
      ).join(' ') + ' Z';
      return { pathData, levelValue };
    });
  };

  const userPath = generatePath(data.map(d => d.value));
  const averagePath = data.some(d => d.average !== undefined) 
    ? generatePath(data.map(d => d.average || 0))
    : null;

  return (
    <div className="relative">
      <svg width={size} height={size} className="overflow-visible">
        {/* 背景网格 */}
        {generateGridLevels().map((level, i) => (
          <path
            key={i}
            d={level.pathData}
            fill="none"
            stroke="#e2e8f0"
            strokeWidth="1"
            opacity={0.5}
          />
        ))}

        {/* 轴线 */}
        {data.map((_, index) => {
          const endPoint = getPoint(100, index);
          return (
            <line
              key={index}
              x1={centerX}
              y1={centerY}
              x2={endPoint.x}
              y2={endPoint.y}
              stroke="#cbd5e1"
              strokeWidth="1"
            />
          );
        })}

        {/* 班级平均线（虚线） */}
        {averagePath && (
          <path
            d={averagePath}
            fill="rgba(148, 163, 184, 0.1)"
            stroke="#94a3b8"
            strokeWidth="2"
            strokeDasharray="5,5"
          />
        )}

        {/* 用户数据填充区域 */}
        <path
          d={userPath}
          fill="rgba(59, 130, 246, 0.2)"
          stroke="#3b82f6"
          strokeWidth="3"
          className="transition-all duration-300"
        />

        {/* 数据点 */}
        {data.map((item, index) => {
          const point = getPoint(item.value, index);
          const isHovered = hoveredIndex === index;
          
          return (
            <g key={index}>
              <circle
                cx={point.x}
                cy={point.y}
                r={isHovered ? 8 : 5}
                fill="#3b82f6"
                stroke="white"
                strokeWidth="2"
                className="transition-all duration-200 cursor-pointer"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              />
            </g>
          );
        })}

        {/* 标签 */}
        {data.map((item, index) => {
          const labelPoint = getLabelPoint(index);
          const isHovered = hoveredIndex === index;
          
          return (
            <g key={index}>
              <text
                x={labelPoint.x}
                y={labelPoint.y}
                textAnchor="middle"
                dominantBaseline="middle"
                className={`text-xs transition-all duration-200 ${
                  isHovered ? 'font-bold fill-indigo-600' : 'fill-slate-700'
                }`}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {item.topic}
              </text>
              <text
                x={labelPoint.x}
                y={labelPoint.y + 12}
                textAnchor="middle"
                className={`text-xs transition-all duration-200 ${
                  isHovered ? 'font-bold fill-indigo-600' : 'fill-slate-500'
                }`}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {item.value}%
              </text>
            </g>
          );
        })}
      </svg>

      {/* 悬停提示 */}
      {hoveredIndex !== null && (
        <div className="absolute top-4 right-4 bg-white rounded-lg shadow-lg border border-slate-200 p-3 min-w-[200px]">
          <div className="text-sm font-medium text-slate-900 mb-1">
            {data[hoveredIndex].topic}
          </div>
          <div className="text-xs text-slate-600 space-y-1">
            <div className="flex items-center justify-between">
              <span>你的掌握度：</span>
              <span className="font-semibold text-indigo-600">
                {data[hoveredIndex].value}%
              </span>
            </div>
            {data[hoveredIndex].average !== undefined && (
              <div className="flex items-center justify-between">
                <span>班级平均：</span>
                <span className="font-semibold text-slate-600">
                  {data[hoveredIndex].average}%
                </span>
              </div>
            )}
            <div className="mt-2 pt-2 border-t border-slate-100">
              <span className={`text-xs font-medium ${
                data[hoveredIndex].value >= 90 ? 'text-green-600' :
                data[hoveredIndex].value >= 80 ? 'text-blue-600' :
                data[hoveredIndex].value >= 70 ? 'text-yellow-600' :
                'text-red-600'
              }`}>
                {data[hoveredIndex].value >= 90 ? '优秀' :
                 data[hoveredIndex].value >= 80 ? '良好' :
                 data[hoveredIndex].value >= 70 ? '中等' :
                 '需加强'}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* 图例 */}
      <div className="mt-4 flex items-center justify-center gap-6 text-xs">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-indigo-600 rounded-full"></div>
          <span className="text-slate-600">你的掌握度轮廓</span>
        </div>
        {data.some(d => d.average !== undefined) && (
          <div className="flex items-center gap-2">
            <div className="w-3 h-0.5 bg-slate-400 border-dashed border-t-2"></div>
            <span className="text-slate-600">班级平均线</span>
          </div>
        )}
      </div>

      {/* 主要发现 */}
      <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-100">
        <div className="text-xs font-medium text-blue-900 mb-2">💡 主要发现</div>
        <div className="text-xs text-blue-700 space-y-1">
          {data.filter(d => d.value >= 90).length > 0 && (
            <div>
              ▸ 优势领域：{data.filter(d => d.value >= 90).map(d => d.topic).join('、')}
            </div>
          )}
          {data.filter(d => d.value < 70).length > 0 && (
            <div>
              ▸ 关注领域：{data.filter(d => d.value < 70).map(d => d.topic).join('、')}
            </div>
          )}
          <div className="mt-1 text-blue-600">
            💡 建议：点击薄弱项获取个性化练习
          </div>
        </div>
      </div>
    </div>
  );
}
