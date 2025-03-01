import React from 'react';
import { TimeSeriesData } from '../../types';


const TimeSeriesChart = ({ data }) => {
  // Group data by platform
  const platforms = Array.from(new Set(data.map(item => item.platform)));
  const dates = Array.from(new Set(data.map(item => item.date))).sort();
  
  // Calculate max value for scaling
  const maxCount = Math.max(...data.map(item => item.count));
  
  // Chart dimensions
  const height = 250;
  const width = 600;
  const padding = { top: 20, right: 30, bottom: 30, left: 40 };
  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;
  
  // Calculate scales
  const xScale = (date) => {
    const index = dates.indexOf(date);
    return padding.left + (index / (dates.length - 1)) * chartWidth;
  };
  
  const yScale = (count) => {
    return height - padding.bottom - (count / maxCount) * chartHeight;
  };
  
  // Generate line paths for each platform
  const generateLinePath = (platform) => {
    const platformData = data.filter(item => item.platform === platform).sort((a, b) => dates.indexOf(a.date) - dates.indexOf(b.date));
    
    if (platformData.length === 0) return '';
    
    let path = `M ${xScale(platformData[0].date)} ${yScale(platformData[0].count)}`;
    
    for (let i = 1; i < platformData.length; i++) {
      path += ` L ${xScale(platformData[i].date)} ${yScale(platformData[i].count)}`;
    }
    
    return path;
  };
  
  // Platform colors
  const platformColors = {
    'Twitter': '#1DA1F2',
    'Mastodon': '#6364FF',
    'Telegram': '#0088CC',
    'Reddit': '#FF4500'
  };
  
  return (
    <div className="w-full h-full overflow-hidden">
      <svg width="100%" height="100%" viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="xMidYMid meet">
        {/* X-axis */}
        <line
          x1={padding.left}
          y1={height - padding.bottom}
          x2={width - padding.right}
          y2={height - padding.bottom}
          stroke="#4B5563"
          strokeWidth="1"
        />
        
        {/* Y-axis */}
        <line
          x1={padding.left}
          y1={padding.top}
          x2={padding.left}
          y2={height - padding.bottom}
          stroke="#4B5563"
          strokeWidth="1"
        />
        
        {/* X-axis labels (dates) */}
        {dates.filter((_, i) => i % 2 === 0).map((date, i) => (
          <text
            key={date}
            x={xScale(date)}
            y={height - 10}
            textAnchor="middle"
            fontSize="10"
            fill="#9CA3AF"
          >
            {date.split('-')[2]}
          </text>
        ))}
        
        {/* Y-axis labels */}
        {[0, maxCount / 2, maxCount].map((value, i) => (
          <text
            key={i}
            x={padding.left - 10}
            y={yScale(value) + 5}
            textAnchor="end"
            fontSize="10"
            fill="#9CA3AF"
          >
            {value}
          </text>
        ))}
        
        {/* Grid lines */}
        {[0, maxCount / 4, maxCount / 2, maxCount * 3 / 4, maxCount].map((value, i) => (
          <line
            key={i}
            x1={padding.left}
            y1={yScale(value)}
            x2={width - padding.right}
            y2={yScale(value)}
            stroke="#374151"
            strokeWidth="1"
            strokeDasharray="4"
          />
        ))}
        
        {/* Lines for each platform */}
        {platforms.map(platform => (
          <path
            key={platform}
            d={generateLinePath(platform)}
            fill="none"
            stroke={platformColors[platform] || '#C2B6AB'}
            strokeWidth="2"
          />
        ))}
        
        {/* Data points */}
        {data.map((item, i) => (
          <circle
            key={i}
            cx={xScale(item.date)}
            cy={yScale(item.count)}
            r="3"
            fill={platformColors[item.platform] || '#C2B6AB'}
          />
        ))}
        
        {/* Legend */}
        {platforms.map((platform, i) => (
          <g key={platform} transform={`translate(${padding.left + i * 100}, ${padding.top - 5})`}>
            <rect width="10" height="10" fill={platformColors[platform] || '#C2B6AB'} />
            <text x="15" y="9" fontSize="10" fill="#E5DFD9">{platform}</text>
          </g>
        ))}
      </svg>
    </div>
  );
};

export default TimeSeriesChart;
