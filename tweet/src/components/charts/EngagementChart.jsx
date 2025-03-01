import React from 'react';

const EngagementChart = ({ data }) => {
  // Chart dimensions
  const width = 600;
  const height = 250;
  const padding = { top: 20, right: 30, bottom: 50, left: 60 };
  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;
  
  // Calculate max value for scaling
  const maxEngagement = Math.max(
    ...data.flatMap(item => [item.likes, item.shares, item.comments])
  );
  
  // Bar properties
  const platforms = data.map(item => item.platform);
  const barCategories = ['likes', 'shares', 'comments'];
  const barWidth = chartWidth / (platforms.length * barCategories.length + platforms.length - 1);
  const groupWidth = barWidth * barCategories.length;
  const groupPadding = barWidth;
  
  // Calculate scales
  const xScale = (platformIndex, categoryIndex) => {
    return padding.left + platformIndex * (groupWidth + groupPadding) + categoryIndex * barWidth;
  };
  
  const yScale = (value) => {
    return height - padding.bottom - (value / maxEngagement) * chartHeight;
  };
  
  // Bar colors
  const barColors = {
    'likes': '#F97316',
    'shares': '#C2B6AB',
    'comments': '#E5DFD9'
  };
  
  return (
    <div className="w-full h-full overflow-hidden">
      <svg width="100%" height="100%" viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="xMidYMid meet">
        {/* Y-axis */}
        <line
          x1={padding.left}
          y1={padding.top}
          x2={padding.left}
          y2={height - padding.bottom}
          stroke="#4B5563"
          strokeWidth="1"
        />
        
        {/* X-axis */}
        <line
          x1={padding.left}
          y1={height - padding.bottom}
          x2={width - padding.right}
          y2={height - padding.bottom}
          stroke="#4B5563"
          strokeWidth="1"
        />
        
        {/* Y-axis labels */}
        {[0, maxEngagement / 4, maxEngagement / 2, maxEngagement * 3 / 4, maxEngagement].map((value, i) => (
          <g key={i}>
            <text
              x={padding.left - 10}
              y={yScale(value) + 5}
              textAnchor="end"
              fontSize="10"
              fill="#9CA3AF"
            >
              {Math.round(value)}
            </text>
            <line
              x1={padding.left}
              y1={yScale(value)}
              x2={width - padding.right}
              y2={yScale(value)}
              stroke="#374151"
              strokeWidth="1"
              strokeDasharray="4"
            />
          </g>
        ))}
        
        {/* Bars */}
        {data.map((platform, platformIndex) => (
          <g key={platform.platform}>
            {/* Platform label */}
            <text
              x={xScale(platformIndex, 1)}
              y={height - padding.bottom + 20}
              textAnchor="middle"
              fontSize="10"
              fill="#9CA3AF"
            >
              {platform.platform}
            </text>
            
            {/* Bars for each category */}
            {barCategories.map((category, categoryIndex) => {
              const value = platform[category];
              return (
                <g key={category}>
                  <rect
                    x={xScale(platformIndex, categoryIndex)}
                    y={yScale(value)}
                    width={barWidth - 2}
                    height={height - padding.bottom - yScale(value)}
                    fill={barColors[category]}
                    rx="2"
                  />
                  <text
                    x={xScale(platformIndex, categoryIndex) + barWidth / 2}
                    y={yScale(value) - 5}
                    textAnchor="middle"
                    fontSize="8"
                    fill="#E5DFD9"
                  >
                    {value}
                  </text>
                </g>
              );
            })}
          </g>
        ))}
        
        {/* Legend */}
        {barCategories.map((category, i) => (
          <g key={category} transform={`translate(${padding.left + i * 80}, ${height - 15})`}>
            <rect width="10" height="10" fill={barColors[category]} />
            <text x="15" y="9" fontSize="10" fill="#E5DFD9">
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
};

export default EngagementChart;
