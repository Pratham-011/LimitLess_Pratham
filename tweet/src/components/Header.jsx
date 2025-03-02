import React, { useState } from 'react';
import { Search, Home, Settings, Bell, Menu, X } from 'lucide-react';

const Header = ({ onSearch, onPlatformChange }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPlatforms, setSelectedPlatforms] = useState(['Twitter', 'Mastodon', 'Telegram', 'Reddit']);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(searchQuery);  // Pass the search query to parent component
  };

  const togglePlatform = (platform) => {
    const newSelection = selectedPlatforms.includes(platform)
      ? selectedPlatforms.filter(p => p !== platform)
      : [...selectedPlatforms, platform];
    
    setSelectedPlatforms(newSelection);
    onPlatformChange(newSelection);
  };

  return (
    <header className="bg-dark-jet text-light-taupe py-4 px-6 shadow-md">
      <div className="container mx-auto">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-pale-taupe mr-8">Trend Analyzer</h1>
            <nav className="hidden md:flex space-x-6">
              <a href="#" className="flex items-center text-light-taupe hover:text-pale-taupe transition-colors">
                <Home size={18} className="mr-1" />
                <span>Home</span>
              </a>
              <a href="#" className="flex items-center text-light-taupe hover:text-pale-taupe transition-colors">
                <Bell size={18} className="mr-1" />
                <span>Alerts</span>
              </a>
              <a href="#" className="flex items-center text-light-taupe hover:text-pale-taupe transition-colors">
                <Settings size={18} className="mr-1" />
                <span>Settings</span>
              </a>
            </nav>
          </div>

          {/* Mobile menu button */}
          <button 
            className="md:hidden text-light-taupe"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Search form */}
          <form onSubmit={handleSearch} className="hidden md:flex items-center">
            <div className="relative">
              <input
                type="text"
                placeholder="Search topics, trends, news..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-jet-black border border-gray-700 rounded-lg py-2 px-4 pl-10 w-64 focus:outline-none focus:ring-1 focus:ring-pale-taupe text-light-taupe"
              />
              <Search size={18} className="absolute left-3 top-2.5 text-gray-500" />
            </div>
            <button 
              type="submit" 
              className="ml-2 bg-accent hover:bg-accent/90 text-white py-2 px-4 rounded-lg transition-colors"
            >
              Search
            </button>
          </form>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4">
            <nav className="flex flex-col space-y-4 mb-4">
              <a href="#" className="flex items-center text-light-taupe hover:text-pale-taupe transition-colors">
                <Home size={18} className="mr-2" />
                <span>Home</span>
              </a>
              <a href="#" className="flex items-center text-light-taupe hover:text-pale-taupe transition-colors">
                <Bell size={18} className="mr-2" />
                <span>Alerts</span>
              </a>
              <a href="#" className="flex items-center text-light-taupe hover:text-pale-taupe transition-colors">
                <Settings size={18} className="mr-2" />
                <span>Settings</span>
              </a>
            </nav>
            <form onSubmit={handleSearch} className="flex items-center">
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder="Search topics, trends, news..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-jet-black border border-gray-700 rounded-lg py-2 px-4 pl-10 w-full focus:outline-none focus:ring-1 focus:ring-pale-taupe text-light-taupe"
                />
                <Search size={18} className="absolute left-3 top-2.5 text-gray-500" />
              </div>
              <button 
                type="submit" 
                className="ml-2 bg-accent hover:bg-accent/90 text-white py-2 px-4 rounded-lg transition-colors"
              >
                Search
              </button>
            </form>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
