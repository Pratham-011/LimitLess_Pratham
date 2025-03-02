import React, { useState, useEffect } from 'react';

const InteractiveGraph = ({ query }) => {
  const [graphImage, setGraphImage] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!query) return;

    setLoading(true);
    fetch('http://localhost:5000/graph', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ query })
    })
      .then(response => response.json())
      .then(data => {
        setGraphImage(`data:image/png;base64,${data.graphImage}`);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching graph:', error);
        setLoading(false);
      });
  }, [query]);

  return (
    <div className="bg-dark-jet rounded-lg p-4 shadow-lg mb-8">
      <h3 className="text-lg font-semibold text-pale-taupe mb-4">Interactive Network Graph</h3>
      {loading ? (
        <p className="text-light-taupe">Loading graph...</p>
      ) : graphImage ? (
        <img src={graphImage} alt="Interactive Network Graph" className="w-full" />
      ) : (
        <p className="text-light-taupe">Graph not available.</p>
      )}
    </div>
  );
};

export default InteractiveGraph;
