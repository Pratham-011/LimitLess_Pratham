import React, { useEffect, useState } from 'react';
import Plot from 'react-plotly.js';

const ResponsePattern = () => {
  const [patternData, setPatternData] = useState(null);

  useEffect(() => {
    fetch('http://localhost:5001/get_response_patterns')
      .then(response => response.json())
      .then(data => setPatternData(data))
      .catch(error => console.error('Error fetching response patterns:', error));
  }, []);

  if (!patternData) return <div>Loading...</div>;

  // Expecting patternData to have the structure:
  // { mean: { Early: value, Mid: value, Late: value }, std: { Early: value, Mid: value, Late: value } }
  const periods = Object.keys(patternData.mean);
  const meanValues = periods.map(period => patternData.mean[period]);
  const stdValues = periods.map(period => patternData.std[period]);

  const dataPlotly = [
    {
      type: 'scatter',
      mode: 'lines+markers',
      x: periods,
      y: meanValues,
      name: 'Mean Sentiment Polarity',
      error_y: {
        type: 'data',
        array: stdValues,
        visible: true,
      },
      line: { shape: 'linear' },
    }
  ];

  const layout = {
    title: 'Response Patterns (Sentiment Polarity by Period)',
    xaxis: { title: 'Period' },
    yaxis: { title: 'Mean Sentiment Polarity' },
    autosize: true,
  };

  return (
    <div style={{ width: '100%', height: '100%', minHeight: '300px' }}>
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

export default ResponsePattern;
