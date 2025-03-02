import React, { useEffect, useState } from 'react';
import Plot from 'react-plotly.js';

const BubbleChart = () => {
  const [emotionData, setEmotionData] = useState(null);

  useEffect(() => {
    fetch('http://localhost:5001/get_emotion_analysis')
      .then(response => response.json())
      .then(data => {
        console.log('Fetched emotion analysis data:', data);
        // Use data.polarity directly, since your API returns it at the top level.
        if (data && data.polarity) {
          setEmotionData(data.polarity);
        } else {
          console.error('API response does not have expected polarity data');
        }
      })
      .catch(error => console.error('Error fetching emotion analysis data:', error));
  }, []);

  if (!emotionData) return <div>Loading...</div>;

  // Use summary statistics for polarity as a proxy for the distribution:
  const categories = ['Min', '25%', '50%', '75%', 'Max'];
  const values = [
    emotionData.min,
    emotionData["25%"],
    emotionData["50%"],
    emotionData["75%"],
    emotionData.max
  ];

  const dataPlotly = [
    {
      x: categories,
      y: values,
      type: 'bar',
      marker: { color: '#1f77b4' }
    }
  ];

  const layout = {
    title: 'Polarity Distribution Summary',
    xaxis: { title: 'Percentile' },
    yaxis: { title: 'Polarity Value' },
    autosize: true,
    margin: { l: 50, r: 50, b: 50, t: 50 }
  };

  return (
    <div style={{ width: '100%', height: '250px' }}>
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

export default BubbleChart;
