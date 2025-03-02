import React, { useEffect, useState } from 'react';
import Plot from 'react-plotly.js';

const BehavioralChart = () => {
  const [behavioralData, setBehavioralData] = useState(null);

  useEffect(() => {
    fetch('http://localhost:5001/get_behavioral_keywords')
      .then(response => response.json())
      .then(data => setBehavioralData(data))
      .catch(error => console.error('Error fetching behavioral keywords:', error));
  }, []);

  if (!behavioralData) return <div>Loading...</div>;

  // Prepare data for Plotly bar chart using keys as categories and values as average polarity
  const xValues = Object.keys(behavioralData);
  const yValues = Object.values(behavioralData);
  
  // Colors for each category
  const colors = ['#1f77b4', '#ff7f0e', '#2ca02c', '#d62728'];

  const dataPlotly = [
    {
      type: 'bar',
      x: xValues,
      y: yValues,
      marker: {
        color: colors
      },
      text: yValues.map(val => val.toFixed(2)),
      textposition: 'auto'
    }
  ];

  const layout = {
    title: 'Behavioral Keywords Analysis (Average Polarity)',
    xaxis: { title: 'Category' },
    yaxis: { title: 'Average Polarity' },
    autosize: true
  };

  return (
    <div style={{ width: '100%', maxWidth: '600px', margin: '0 auto', height: '100%' }}>
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

export default BehavioralChart;
