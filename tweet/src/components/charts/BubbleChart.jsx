import React from 'react';
import { BubbleData } from '../../types';


const BubbleChart = ({ data }) => {
  // Sort data by value (descending)
  const sortedData = [...data].sort((a, b) => b.value - a.value);
  
  // Calculate total value for scaling
  const totalValue = sortedData.reduce((sum, item) => sum + item.value, 0);
  
  // Chart dimensions
  const width = 600;
  const height = 250;
  
  // Calculate bubble positions using a simple packing algorithm
  const bubbles = packBubbles(sortedData, width, height);
  
  return (
    <div className="w-full h-full overflow-hidden">
      <svg width="100%" height="100%" viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="xMidYMid meet">
        {bubbles.map((bubble, i) => (
          <g key={bubble.id} transform={`translate(${bubble.x}, ${bubble.y})`}>
            <circle
              r={bubble.r}
              fill={bubble.color}
              fillOpacity="0.7"
              stroke={bubble.color}
              strokeWidth="1"
            />
            {bubble.r > 15 && (
              <text
                textAnchor="middle"
                dy=".3em"
                fontSize={Math.min(bubble.r / 2, 12)}
                fill="#FFFFFF"
              >
                {bubble.label}
              </text>
            )}
          </g>
        ))}
      </svg>
    </div>
  );
};

// Simple bubble packing algorithm
function packBubbles(data, width, height) {
  const maxValue = Math.max(...data.map(d => d.value));
  const minRadius = 10;
  const maxRadius = 50;
  
  // Calculate radius for each bubble based on its value
  const bubbles = data.map(d => ({
    ...d,
    r: minRadius + (d.value / maxValue) * (maxRadius - minRadius),
    x: Math.random() * width,
    y: Math.random() * height
  }));
  
  // Simple force-directed layout to prevent overlap
  for (let iteration = 0; iteration < 50; iteration++) {
    for (let i = 0; i < bubbles.length; i++) {
      const bubble = bubbles[i];
      
      // Force to center
      const centerForceX = (width / 2 - bubble.x) * 0.01;
      const centerForceY = (height / 2 - bubble.y) * 0.01;
      
      // Repulsive forces from other bubbles
      let forceX = centerForceX;
      let forceY = centerForceY;
      
      for (let j = 0; j < bubbles.length; j++) {
        if (i === j) continue;
        
        const other = bubbles[j];
        const dx = bubble.x - other.x;
        const dy = bubble.y - other.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const minDistance = bubble.r + other.r;
        
        if (distance < minDistance) {
          const force = (minDistance - distance) / distance * 0.1;
          forceX += dx * force;
          forceY += dy * force;
        }
      }
      
      // Apply forces
      bubble.x += forceX;
      bubble.y += forceY;
      
      // Keep bubbles within bounds
      bubble.x = Math.max(bubble.r, Math.min(width - bubble.r, bubble.x));
      bubble.y = Math.max(bubble.r, Math.min(height - bubble.r, bubble.y));
    }
  }
  
  return bubbles;
}

export default BubbleChart;
