// import React from 'react';
// import { SentimentData } from '../../types';
// import PropTypes from 'prop-types';

// const SentimentGauge = ({ data }) => {
//   const total = data.positive + data.neutral + data.negative;
//   const positivePercentage = Math.round((data.positive / total) * 100);
//   const neutralPercentage = Math.round((data.neutral / total) * 100);
//   const negativePercentage = Math.round((data.negative / total) * 100);
  
//   // Calculate sentiment score (-100 to 100)
//   const sentimentScore = Math.round(((data.positive - data.negative) / total) * 100);
  
//   // Gauge dimensions
//   const width = 200;
//   const height = 200;
//   const centerX = width / 2;
//   const centerY = height / 2;
//   const radius = Math.min(width, height) / 2 - 10;
  
//   // Gauge angles
//   const startAngle = -Math.PI * 0.75; // -135 degrees
//   const endAngle = Math.PI * 0.75; // 135 degrees
//   const angleRange = endAngle - startAngle;
  
//   // Calculate needle angle based on sentiment score
//   const normalizedScore = (sentimentScore + 100) / 200; // 0 to 1
//   const needleAngle = startAngle + normalizedScore * angleRange;
  
//   // Generate arc path
//   const generateArc = (startAngle, endAngle) => {
//     const x1 = centerX + radius * Math.cos(startAngle);
//     const y1 = centerY + radius * Math.sin(startAngle);
//     const x2 = centerX + radius * Math.cos(endAngle);
//     const y2 = centerY + radius * Math.sin(endAngle);
    
//     const largeArcFlag = endAngle - startAngle > Math.PI ? 1 : 0;
    
//     return `M ${x1} ${y1} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}`;
//   };
  
//   // Generate needle path
//   const generateNeedle = (angle) => {
//     const needleLength = radius * 0.8;
//     const x = centerX + needleLength * Math.cos(angle);
//     const y = centerY + needleLength * Math.sin(angle);
    
//     return `M ${centerX} ${centerY} L ${x} ${y}`;
//   };
  
//   // Generate tick marks
//   const generateTicks = () => {
//     const ticks = [];
//     const tickCount = 9; // -100, -75, -50, -25, 0, 25, 50, 75, 100
    
//     for (let i = 0; i < tickCount; i++) {
//       const tickAngle = startAngle + (i / (tickCount - 1)) * angleRange;
//       const outerX = centerX + radius * Math.cos(tickAngle);
//       const outerY = centerY + radius * Math.sin(tickAngle);
//       const innerX = centerX + (radius - 10) * Math.cos(tickAngle);
//       const innerY = centerY + (radius - 10) * Math.sin(tickAngle);
      
//       const labelX = centerX + (radius + 15) * Math.cos(tickAngle);
//       const labelY = centerY + (radius + 15) * Math.sin(tickAngle);
      
//       const tickValue = -100 + i * 25;
      
//       ticks.push(
//         <g key={i}>
//           <line
//             x1={innerX}
//             y1={innerY}
//             x2={outerX}
//             y2={outerY}
//             stroke="#9CA3AF"
//             strokeWidth="2"
//           />
//           <text
//             x={labelX}
//             y={labelY}
//             textAnchor="middle"
//             fontSize="10"
//             fill="#9CA3AF"
//             dominantBaseline="middle"
//           >
//             {tickValue}
//           </text>
//         </g>
//       );
//     }
    
//     return ticks;
//   };
  
//   // Get color based on sentiment score
//   const getSentimentColor = (score) => {
//     if (score < -33) return '#EF4444'; // Red for negative
//     if (score < 33) return '#9CA3AF'; // Gray for neutral
//     return '#10B981'; // Green for positive
//   };
  
//   return (
//     <div className="flex flex-col items-center">
//       <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
//         {/* Background arc */}
//         <path
//           d={generateArc(startAngle, endAngle)}
//           fill="none"
//           stroke="#374151"
//           strokeWidth="10"
//           strokeLinecap="round"
//         />
        
//         {/* Negative arc */}
//         <path
//           d={generateArc(startAngle, startAngle + angleRange * 0.33)}
//           fill="none"
//           stroke="#EF4444"
//           strokeWidth="10"
//           strokeLinecap="round"
//         />
        
//         {/* Neutral arc */}
//         <path
//           d={generateArc(startAngle + angleRange * 0.33, startAngle + angleRange * 0.67)}
//           fill="none"
//           stroke="#9CA3AF"
//           strokeWidth="10"
//           strokeLinecap="round"
//         />
        
//         {/* Positive arc */}
//         <path
//           d={generateArc(startAngle + angleRange * 0.67, endAngle)}
//           fill="none"
//           stroke="#10B981"
//           strokeWidth="10"
//           strokeLinecap="round"
//         />
        
//         {/* Tick marks */}
//         {generateTicks()}
        
//         {/* Needle */}
//         <path
//           d={generateNeedle(needleAngle)}
//           stroke={getSentimentColor(sentimentScore)}
//           strokeWidth="3"
//           fill="none"
//         />
        
//         {/* Center circle */}
//         <circle
//           cx={centerX}
//           cy={centerY}
//           r="10"
//           fill={getSentimentColor(sentimentScore)}
//         />
        
//         {/* Sentiment score */}
//         <text
//           x={centerX}
//           y={centerY + radius / 2}
//           textAnchor="middle"
//           fontSize="24"
//           fontWeight="bold"
//           fill={getSentimentColor(sentimentScore)}
//         >
//           {sentimentScore}
//         </text>
//       </svg>
      
//       {/* Legend */}
//       <div className="flex justify-between w-full mt-2">
//         <div className="flex items-center">
//           <div className="w-3 h-3 rounded-full bg-red-500 mr-1"></div>
//           <span className="text-xs text-gray-400">{negativePercentage}%</span>
//         </div>
//         <div className="flex items-center">
//           <div className="w-3 h-3 rounded-full bg-gray-500 mr-1"></div>
//           <span className="text-xs text-gray-400">{neutralPercentage}%</span>
//         </div>
//         <div className="flex items-center">
//           <div className="w-3 h-3 rounded-full bg-green-500 mr-1"></div>
//           <span className="text-xs text-gray-400">{positivePercentage}%</span>
//         </div>
//       </div>
//     </div>
//   );
// };

// SentimentGauge.propTypes = {
//     data: PropTypes.shape(SentimentData).isRequired,
// };


// export default SentimentGauge;






import React, { useEffect, useState } from 'react';
import Plot from 'react-plotly.js';

const SentimentDonutChart = () => {
  const [sentimentData, setSentimentData] = useState(null);

  useEffect(() => {
    fetch('http://localhost:5001/get_sentiment_distribution')
      .then(response => response.json())
      .then(data => setSentimentData(data))
      .catch(error => console.error('Error fetching sentiment distribution:', error));
  }, []);

  if (!sentimentData) {
    return <div>Loading sentiment distribution...</div>;
  }

  // Assuming the API returns normalized values (e.g., 0.3 for positive, 0.5 for neutral, 0.2 for negative)
  const labels = ['Positive', 'Neutral', 'Negative'];
  const values = [
    sentimentData.positive,
    sentimentData.neutral,
    sentimentData.negative
  ];

  // Calculate percentages for the legend (convert to percentage string)
  const positivePercentage = (sentimentData.positive * 100).toFixed(2);
  const neutralPercentage = (sentimentData.neutral * 100).toFixed(2);
  const negativePercentage = (sentimentData.negative * 100).toFixed(2);

  // Define colors for the segments
  const colors = ['#10B981', '#9CA3AF', '#EF4444'];

  return (
    <div style={{ width: '100%', maxWidth: '500px', margin: '0 auto',height:'100%' }}>
      <Plot
        data={[
          {
            type: 'pie',
            labels: labels,
            values: values,
            hole: 0.4, // This creates the donut effect
            marker: { colors: colors },
            textinfo: 'label+percent',
            insidetextorientation: 'radial',
          },
        ]}
        layout={{
          title: 'Sentiment Distribution',
          showlegend: true,
          autosize: true,
        }}
        config={{ responsive: true }}
        style={{ width: '100%', height: '100%' }}
        useResizeHandler={true}
      />
      <div className="flex justify-center mt-4">
        <div className="flex space-x-4">
          <div className="flex items-center">
            <div className="w-4 h-4 rounded-full" style={{ backgroundColor: '#10B981' }}></div>
            <span className="ml-2 text-sm">Positive: {positivePercentage}%</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 rounded-full" style={{ backgroundColor: '#9CA3AF' }}></div>
            <span className="ml-2 text-sm">Neutral: {neutralPercentage}%</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 rounded-full" style={{ backgroundColor: '#EF4444' }}></div>
            <span className="ml-2 text-sm">Negative: {negativePercentage}%</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SentimentDonutChart;
