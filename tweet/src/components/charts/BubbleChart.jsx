import React, { useEffect, useState } from 'react';
import Plot from 'react-plotly.js';

const BubbleChart = () => {
  const [emotionData, setEmotionData] = useState(null);

  useEffect(() => {
    fetch('http://localhost:5001/get_emotion_analysis')
      .then(response => response.json())
      .then(data => {
        console.log('Fetched emotion analysis data:', data);
        // Use data.polarity directly, since the API returns it at the top level.
        if (data && data.polarity) {
          setEmotionData(data.polarity);
        } else {
          console.error('API response does not have expected polarity data');
        }
      })
      .catch(error => console.error('Error fetching emotion analysis data:', error));
  }, []);

  if (!emotionData) return <div>Loading...</div>;

  // Using the summary statistics to approximate a histogram:
  // We have overall count, and quartile values: min, 25%, 50%, 75%, max.
  // Here, we assume each quartile bin holds roughly 1/4th of the total count.
  const totalCount = emotionData.count;
  const approxBinCount = totalCount / 4;

  const bins = [
    { range: `${emotionData.min.toFixed(2)} to ${emotionData["25%"].toFixed(2)}`, count: approxBinCount },
    { range: `${emotionData["25%"].toFixed(2)} to ${emotionData["50%"].toFixed(2)}`, count: approxBinCount },
    { range: `${emotionData["50%"].toFixed(2)} to ${emotionData["75%"].toFixed(2)}`, count: approxBinCount },
    { range: `${emotionData["75%"].toFixed(2)} to ${emotionData.max.toFixed(2)}`, count: approxBinCount },
  ];

  const dataPlotly = [
    {
      x: bins.map(bin => bin.range),
      y: bins.map(bin => bin.count),
      type: 'bar',
      marker: { color: '#1f77b4' }
    }
  ];

  const layout = {
    title: 'Approximate Polarity Histogram',
    xaxis: { title: 'Polarity Range' },
    yaxis: { title: 'Estimated Count' },
    autosize: true,
    margin: { l: 50, r: 50, b: 100, t: 50 }
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
