import React, { useState } from 'react';
import Header from './components/Header';
import Dashboard from './components/Dashboard';

function App() {
  const [searchQuery, setSearchQuery] = useState('Artificial Intelligence');
  const [selectedPlatforms, setSelectedPlatforms] = useState(['Twitter', 'Mastodon', 'Telegram', 'Reddit']);

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handlePlatformChange = (platforms) => {
    setSelectedPlatforms(platforms);
  };

  return (
    <div className="min-h-screen bg-jet-black text-light-taupe">
      <Header onSearch={handleSearch} onPlatformChange={handlePlatformChange} />
      <Dashboard />
    </div>
  );
}

export default App;
