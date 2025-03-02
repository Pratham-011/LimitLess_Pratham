import React, { useEffect, useState } from 'react';
import Plot from 'react-plotly.js';

const Temporal = () => {
  const [temporalData, setTemporalData] = useState(null);

  useEffect(() => {
    fetch('http://localhost:5001/get_temporal_evolution')
      .then(response => response.json())
      .then(data => {
        console.log('Fetched temporal data:', data);
        // Since the API returns the object directly, use it directly.
        if (data && data.Max !== undefined) {
          setTemporalData(data);
        } else {
          console.error('API response does not have expected keys');
        }
      })
      .catch(error => console.error('Error fetching temporal evolution data:', error));
  }, []);

  if (!temporalData) return <div>Loading...</div>;

  // Plot three points: Min, Mean, and Max.
  const xValues = ['Min', 'Mean', 'Max'];
  const yValues = [temporalData.Min, temporalData.Mean, temporalData.Max];

  // Define error bars for the Mean point using the Std value.
  // For "Min" and "Max" points, error is set to 0.
  const errorY = {
    type: 'data',
    array: [0, temporalData.Std, 0],
    visible: true,
  };

  const plotData = [
    {
      x: xValues,
      y: yValues,
      type: 'scatter',
      mode: 'lines+markers',
      error_y: errorY,
      marker: { color: '#1f77b4' },
      line: { shape: 'linear' },
      name: 'Temporal Evolution'
    }
  ];

  const layout = {
    title: 'Temporal Evolution of Polarity',
    xaxis: { title: 'Statistic' },
    yaxis: { title: 'Polarity Value' },
    autosize: true,
    margin: { l: 50, r: 50, b: 50, t: 50 }
  };

  return (
    <div style={{ width: '100%', maxWidth: '800px', margin: '0 auto' }}>
      <Plot
        data={plotData}
        layout={layout}
        config={{ responsive: true }}
        style={{ width: '100%', height: '100%' }}
        useResizeHandler={true}
      />
    </div>
  );
};

export default Temporal;
