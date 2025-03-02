import React, { useState } from 'react';
import { BarChart, LineChart, PieChart, Activity, Filter } from 'lucide-react';
import { mockPosts, topicsData, timeSeriesData, sentimentData, platformEngagementData, bubbleData } from '../data/mockData';
import { Post } from '../types';
import PostList from './PostList';
import TimeSeriesChart from './charts/TimeSeriesChart';
import BubbleChart from './charts/BubbleChart';
import Temporal from './charts/Temporal';
import SentimentGauge from './charts/SentimentGauge';
import EngagementChart from './charts/EngagementChart';
import Behavioral from './charts/Behavioral';
import ResponsePattern from './charts/ResponsePattern';
const Dashboard = () => {
  const [posts, setPosts] = useState(mockPosts);
  const [dateFilter, setDateFilter] = useState('all');
  const [platformFilter, setPlatformFilter] = useState('all');
  const [engagementFilter, setEngagementFilter] = useState('all');
  const [showFilters, setShowFilters] = useState(false);

  const applyFilters = () => {
    let filteredPosts = [...mockPosts];
    
    // Apply date filter
    if (dateFilter !== 'all') {
      filteredPosts = filteredPosts.filter(post => {
        const postDate = new Date(post.date).toISOString().split('T')[0];
        return postDate === dateFilter;
      });
    }
    
    // Apply platform filter
    if (platformFilter !== 'all') {
      filteredPosts = filteredPosts.filter(post => post.platform === platformFilter);
    }
    
    // Apply engagement filter
    if (engagementFilter !== 'all') {
      filteredPosts = filteredPosts.sort((a, b) => {
        const engagementA = a.likes + a.shares + a.comments;
        const engagementB = b.likes + b.shares + a.comments;
        return engagementFilter === 'high' ? engagementB - engagementA : engagementA - engagementB;
      });
    }
    
    setPosts(filteredPosts);
  };

  const resetFilters = () => {
    setDateFilter('all');
    setPlatformFilter('all');
    setEngagementFilter('all');
    setPosts(mockPosts);
  };

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Dashboard title */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-pale-taupe">Dashboard Overview</h2>
        <p className="text-gray-400">Analyzing trends for "Artificial Intelligence" across platforms</p>
      </div>
      
      {/* Data visualization section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Time-Series Trends */}
        <div className="bg-dark-jet rounded-lg p-4 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-pale-taupe">Time-Series Trends</h3>
            <LineChart size={20} className="text-accent" />
          </div>
          <div className="h-64">
            <TimeSeriesChart data={timeSeriesData} />
          </div>
        </div>

        <div className="bg-dark-jet rounded-lg p-4 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-pale-taupe">Time-Series Trends</h3>
            <LineChart size={20} className="text-accent" />
          </div>
          <div className="h-64">
            <ResponsePattern data={timeSeriesData} />
          </div>
        </div>
        
        {/* Key Topics Bubble Chart */}
        <div className="bg-dark-jet rounded-lg p-4 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-pale-taupe">Key Topics</h3>
            <Activity size={20} className="text-accent" />
          </div>
          <div className="h-64">
            <BubbleChart data={bubbleData} />
          </div>
        </div>


        <div className="bg-dark-jet rounded-lg p-4 shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-pale-taupe">Temporal Evolution</h3>
        <Activity size={20} className="text-accent" />
      </div>
      <div className="h-64">
        <Temporal />
      </div>
    </div>
        
        {/* Sentiment Analysis */}
        <div className="bg-dark-jet rounded-lg p-4 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-pale-taupe">Sentiment Analysis</h3>
            <PieChart size={20} className="text-accent" />
          </div>
          <div className="h-64 flex items-center justify-center">
            <SentimentGauge data={sentimentData} />
          </div>
        </div>
        
        {/* Engagement Metrics */}
        <div className="bg-dark-jet rounded-lg p-4 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-pale-taupe">Engagement Metrics</h3>
            <BarChart size={20} className="text-accent" />
          </div>
          <div className="h-64">
            <EngagementChart data={platformEngagementData} />
          </div>
        </div>
        <div className="bg-dark-jet rounded-lg p-4 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-pale-taupe">Engagement Metrics</h3>
            <BarChart size={20} className="text-accent" />
          </div>
          <div className="h-64">
            <Behavioral data={platformEngagementData} />
          </div>
        </div>
      </div>
      
      {/* Search and Query Results Section */}
      <div className="bg-dark-jet rounded-lg p-4 shadow-lg mb-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-pale-taupe">Search Results</h3>
          <button 
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center text-light-taupe hover:text-pale-taupe"
          >
            <Filter size={18} className="mr-1" />
            <span>Filters</span>
          </button>
        </div>
        
        {/* Filter options */}
        {showFilters && (
          <div className="mb-6 p-4 bg-jet-black rounded-lg">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Date</label>
                <select
                  value={dateFilter}
                  onChange={(e) => setDateFilter(e.target.value)}
                  className="w-full bg-dark-jet border border-gray-700 rounded-md py-2 px-3 text-light-taupe focus:outline-none focus:ring-1 focus:ring-pale-taupe"
                >
                  <option value="all">All Dates</option>
                  <option value="2025-04-15">April 15, 2025</option>
                  <option value="2025-04-14">April 14, 2025</option>
                  <option value="2025-04-13">April 13, 2025</option>
                  <option value="2025-04-12">April 12, 2025</option>
                  <option value="2025-04-11">April 11, 2025</option>
                  <option value="2025-04-10">April 10, 2025</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Platform</label>
                <select
                  value={platformFilter}
                  onChange={(e) => setPlatformFilter(e.target.value)}
                  className="w-full bg-dark-jet border border-gray-700 rounded-md py-2 px-3 text-light-taupe focus:outline-none focus:ring-1 focus:ring-pale-taupe"
                >
                  <option value="all">All Platforms</option>
                  <option value="Twitter">Twitter</option>
                  <option value="Mastodon">Mastodon</option>
                  <option value="Telegram">Telegram</option>
                  <option value="Reddit">Reddit</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Engagement</label>
                <select
                  value={engagementFilter}
                  onChange={(e) => setEngagementFilter(e.target.value)}
                  className="w-full bg-dark-jet border border-gray-700 rounded-md py-2 px-3 text-light-taupe focus:outline-none focus:ring-1 focus:ring-pale-taupe"
                >
                  <option value="all">All Engagement</option>
                  <option value="high">Highest First</option>
                  <option value="low">Lowest First</option>
                </select>
              </div>
            </div>
            
            <div className="flex justify-end space-x-2">
              <button
                onClick={resetFilters}
                className="px-4 py-2 border border-gray-700 rounded-md text-light-taupe hover:bg-gray-800 transition-colors"
              >
                Reset
              </button>
              <button
                onClick={applyFilters}
                className="px-4 py-2 bg-accent hover:bg-accent/90 text-white rounded-md transition-colors"
              >
                Apply Filters
              </button>
            </div>
          </div>
        )}
        
        {/* Post list */}
        <PostList posts={posts} />
      </div>
      
      {/* AI-Generated Insights */}
      <div className="bg-dark-jet rounded-lg p-4 shadow-lg mb-8">
        <h3 className="text-lg font-semibold text-pale-taupe mb-4">AI-Generated Insights</h3>
        <div className="p-4 bg-jet-black rounded-lg">
          <h4 className="text-md font-medium text-accent mb-2">Trend Summary</h4>
          <p className="text-light-taupe mb-4">
            Analysis shows a 32% increase in AI-related discussions over the past week, with sentiment shifting from predominantly negative to more balanced. Key topics include ethical concerns, job automation, and technological advancements.
          </p>
          
          <h4 className="text-md font-medium text-accent mb-2">Potential Misinformation</h4>
          <p className="text-light-taupe mb-4">
            Several claims about "AI replacing 75% of jobs by 2026" are circulating without credible sources. These claims originated from a misinterpreted research paper and have been amplified across platforms.
          </p>
          
          <h4 className="text-md font-medium text-accent mb-2">Emerging Narratives</h4>
          <p className="text-light-taupe">
            A new narrative around "AI-assisted healthcare" is gaining traction, with positive sentiment dominating these discussions. This represents an opportunity for educational content on the realistic applications of AI in medical settings.
          </p>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="bg-dark-jet rounded-lg p-4 shadow-lg">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-gray-400 text-sm">© 2025 Trend Analyzer Dashboard</p>
          </div>
          <div className="flex space-x-4">
            <a href="#" className="text-light-taupe hover:text-pale-taupe text-sm">Help & Documentation</a>
            <a href="#" className="text-light-taupe hover:text-pale-taupe text-sm">Feedback</a>
            <a href="#" className="text-light-taupe hover:text-pale-taupe text-sm">Privacy Policy</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;


// import React, { useState } from 'react';
// import { BarChart, LineChart, PieChart, Activity, Filter } from 'lucide-react';
// import { mockPosts, timeSeriesData, sentimentData, platformEngagementData, bubbleData } from '../data/mockData';
// import PostList from './PostList';
// import TimeSeriesChart from './charts/TimeSeriesChart';
// import BubbleChart from './charts/BubbleChart';
// import SentimentGauge from './charts/SentimentGauge';
// import EngagementChart from './charts/EngagementChart';
// import InteractiveGraph from './InteractiveGraph';
// import Header from './Header';

// const Dashboard = () => {
//   const [posts, setPosts] = useState(mockPosts);
//   const [dateFilter, setDateFilter] = useState('all');
//   const [platformFilter, setPlatformFilter] = useState('all');
//   const [engagementFilter, setEngagementFilter] = useState('all');
//   const [showFilters, setShowFilters] = useState(false);
//   // Manage the search query from the header.
//   const [searchQuery, setSearchQuery] = useState("Artificial Intelligence");

//   const applyFilters = () => {
//     let filteredPosts = [...mockPosts];
//     if (dateFilter !== 'all') {
//       filteredPosts = filteredPosts.filter(post => {
//         const postDate = new Date(post.date).toISOString().split('T')[0];
//         return postDate === dateFilter;
//       });
//     }
//     if (platformFilter !== 'all') {
//       filteredPosts = filteredPosts.filter(post => post.platform === platformFilter);
//     }
//     if (engagementFilter !== 'all') {
//       filteredPosts = filteredPosts.sort((a, b) => {
//         const engagementA = a.likes + a.shares + a.comments;
//         const engagementB = b.likes + b.shares + b.comments;
//         return engagementFilter === 'high' ? engagementB - engagementA : engagementA - engagementB;
//       });
//     }
//     setPosts(filteredPosts);
//   };

//   const resetFilters = () => {
//     setDateFilter('all');
//     setPlatformFilter('all');
//     setEngagementFilter('all');
//     setPosts(mockPosts);
//   };

//   // Handle new search queries coming from the Header component.
//   const handleSearch = (query) => {
//     setSearchQuery(query);
//   };

//   return (
//     <div className="container mx-auto px-4 py-6">
//       {/* Include the Header with search input */}
//       <Header onSearch={handleSearch} onPlatformChange={() => {}} />

//       {/* Dashboard title */}
//       <div className="mb-6">
//         <h2 className="text-2xl font-bold text-pale-taupe">Dashboard Overview</h2>
//         <p className="text-gray-400">
//           Analyzing trends for "{searchQuery}" across platforms
//         </p>
//       </div>

//       {/* Data visualization section */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
//         <div className="bg-dark-jet rounded-lg p-4 shadow-lg">
//           <div className="flex items-center justify-between mb-4">
//             <h3 className="text-lg font-semibold text-pale-taupe">Time-Series Trends</h3>
//             <LineChart size={20} className="text-accent" />
//           </div>
//           <div className="h-64">
//             <TimeSeriesChart data={timeSeriesData} />
//           </div>
//         </div>
//         <div className="bg-dark-jet rounded-lg p-4 shadow-lg">
//           <div className="flex items-center justify-between mb-4">
//             <h3 className="text-lg font-semibold text-pale-taupe">Key Topics</h3>
//             <Activity size={20} className="text-accent" />
//           </div>
//           <div className="h-64">
//             <BubbleChart data={bubbleData} />
//           </div>
//         </div>
//         <div className="bg-dark-jet rounded-lg p-4 shadow-lg">
//           <div className="flex items-center justify-between mb-4">
//             <h3 className="text-lg font-semibold text-pale-taupe">Sentiment Analysis</h3>
//             <PieChart size={20} className="text-accent" />
//           </div>
//           <div className="h-64 flex items-center justify-center">
//             <SentimentGauge data={sentimentData} />
//           </div>
//         </div>
//         <div className="bg-dark-jet rounded-lg p-4 shadow-lg">
//           <div className="flex items-center justify-between mb-4">
//             <h3 className="text-lg font-semibold text-pale-taupe">Engagement Metrics</h3>
//             <BarChart size={20} className="text-accent" />
//           </div>
//           <div className="h-64">
//             <EngagementChart data={platformEngagementData} />
//           </div>
//         </div>
//       </div>

//       {/* Search and Query Results Section */}
//       <div className="bg-dark-jet rounded-lg p-4 shadow-lg mb-8">
//         <div className="flex items-center justify-between mb-4">
//           <h3 className="text-lg font-semibold text-pale-taupe">Search Results</h3>
//           <button 
//             onClick={() => setShowFilters(!showFilters)}
//             className="flex items-center text-light-taupe hover:text-pale-taupe"
//           >
//             <Filter size={18} className="mr-1" />
//             <span>Filters</span>
//           </button>
//         </div>
//         {showFilters && (
//           <div className="mb-6 p-4 bg-jet-black rounded-lg">
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-400 mb-1">Date</label>
//                 <select
//                   value={dateFilter}
//                   onChange={(e) => setDateFilter(e.target.value)}
//                   className="w-full bg-dark-jet border border-gray-700 rounded-md py-2 px-3 text-light-taupe focus:outline-none focus:ring-1 focus:ring-pale-taupe"
//                 >
//                   <option value="all">All Dates</option>
//                   <option value="2025-04-15">April 15, 2025</option>
//                   <option value="2025-04-14">April 14, 2025</option>
//                   <option value="2025-04-13">April 13, 2025</option>
//                   <option value="2025-04-12">April 12, 2025</option>
//                   <option value="2025-04-11">April 11, 2025</option>
//                   <option value="2025-04-10">April 10, 2025</option>
//                 </select>
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-400 mb-1">Platform</label>
//                 <select
//                   value={platformFilter}
//                   onChange={(e) => setPlatformFilter(e.target.value)}
//                   className="w-full bg-dark-jet border border-gray-700 rounded-md py-2 px-3 text-light-taupe focus:outline-none focus:ring-1 focus:ring-pale-taupe"
//                 >
//                   <option value="all">All Platforms</option>
//                   <option value="Twitter">Twitter</option>
//                   <option value="Mastodon">Mastodon</option>
//                   <option value="Telegram">Telegram</option>
//                   <option value="Reddit">Reddit</option>
//                 </select>
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-400 mb-1">Engagement</label>
//                 <select
//                   value={engagementFilter}
//                   onChange={(e) => setEngagementFilter(e.target.value)}
//                   className="w-full bg-dark-jet border border-gray-700 rounded-md py-2 px-3 text-light-taupe focus:outline-none focus:ring-1 focus:ring-pale-taupe"
//                 >
//                   <option value="all">All Engagement</option>
//                   <option value="high">Highest First</option>
//                   <option value="low">Lowest First</option>
//                 </select>
//               </div>
//             </div>
//             <div className="flex justify-end space-x-2">
//               <button
//                 onClick={resetFilters}
//                 className="px-4 py-2 border border-gray-700 rounded-md text-light-taupe hover:bg-gray-800 transition-colors"
//               >
//                 Reset
//               </button>
//               <button
//                 onClick={applyFilters}
//                 className="px-4 py-2 bg-accent hover:bg-accent/90 text-white rounded-md transition-colors"
//               >
//                 Apply Filters
//               </button>
//             </div>
//           </div>
//         )}
//         <PostList posts={posts} />
//       </div>

//       {/* --- Interactive Graph Section --- */}
//       <InteractiveGraph query={searchQuery} />

//       {/* AI-Generated Insights */}
//       <div className="bg-dark-jet rounded-lg p-4 shadow-lg mb-8">
//         <h3 className="text-lg font-semibold text-pale-taupe mb-4">AI-Generated Insights</h3>
//         <div className="p-4 bg-jet-black rounded-lg">
//           <h4 className="text-md font-medium text-accent mb-2">Trend Summary</h4>
//           <p className="text-light-taupe mb-4">
//             Analysis shows a 32% increase in AI-related discussions over the past week, with sentiment shifting from predominantly negative to more balanced. Key topics include ethical concerns, job automation, and technological advancements.
//           </p>
//           <h4 className="text-md font-medium text-accent mb-2">Potential Misinformation</h4>
//           <p className="text-light-taupe mb-4">
//             Several claims about "AI replacing 75% of jobs by 2026" are circulating without credible sources. These claims originated from a misinterpreted research paper and have been amplified across platforms.
//           </p>
//           <h4 className="text-md font-medium text-accent mb-2">Emerging Narratives</h4>
//           <p className="text-light-taupe">
//             A new narrative around "AI-assisted healthcare" is gaining traction, with positive sentiment dominating these discussions. This represents an opportunity for educational content on the realistic applications of AI in medical settings.
//           </p>
//         </div>
//       </div>

//       {/* Footer */}
//       <footer className="bg-dark-jet rounded-lg p-4 shadow-lg">
//         <div className="flex flex-col md:flex-row justify-between items-center">
//           <div className="mb-4 md:mb-0">
//             <p className="text-gray-400 text-sm">© 2025 Trend Analyzer Dashboard</p>
//           </div>
//           <div className="flex space-x-4">
//             <a href="#" className="text-light-taupe hover:text-pale-taupe text-sm">Help & Documentation</a>
//             <a href="#" className="text-light-taupe hover:text-pale-taupe text-sm">Feedback</a>
//             <a href="#" className="text-light-taupe hover:text-pale-taupe text-sm">Privacy Policy</a>
//           </div>
//         </div>
//       </footer>
//     </div>
//   );
// };

// export default Dashboard;
