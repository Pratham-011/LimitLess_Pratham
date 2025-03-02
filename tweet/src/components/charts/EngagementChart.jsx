import React, { useEffect, useState } from 'react';
import Plot from 'react-plotly.js';

const EngagementChart = () => {
  const [metrics, setMetrics] = useState(null);

  useEffect(() => {
    fetch('http://localhost:5001/get_engagement_metrics')
      .then(response => response.json())
      .then(data => setMetrics(data))
      .catch(error => console.error('Error fetching engagement metrics:', error));
  }, []);

  if (!metrics) return <div>Loading...</div>;

  // Prepare data for Plotly bar chart
  const xValues = ['Average Likes', 'Average Retweets', 'Total Tweets'];
  const yValues = [
    metrics['Average Likes'],
    metrics['Average Retweets'],
    metrics['Total Tweets']
  ];

  const dataPlotly = [
    {
      type: 'bar',
      x: xValues,
      y: yValues,
      marker: {
        color: ['#F97316', '#C2B6AB', '#E5DFD9']
      },
      text: yValues.map(val => Math.round(val).toString()),
      textposition: 'auto'
    }
  ];

  const layout = {
    title: 'Engagement Metrics',
    xaxis: { title: 'Metric' },
    yaxis: { title: 'Value' },
    autosize: true
  };

  return (
    <div style={{ width: '100%', maxWidth: '600px', margin: '0 auto',height:'100%' }}>
      <Plot
        data={dataPlotly}
        layout={layout}
        config={{ responsive: true }}
        style={{ width: '100%', height: '100%' }}
        useResizeHandler={true}
      />
    </div>
  );
};

export default EngagementChart;
