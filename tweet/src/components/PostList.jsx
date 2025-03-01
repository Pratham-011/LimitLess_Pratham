import React from 'react';
import { ThumbsUp, Share2, MessageCircle } from 'lucide-react';

const PostList = ({ posts }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const getSentimentColor = (sentiment) => {
    switch (sentiment) {
      case 'positive':
        return 'bg-green-500';
      case 'negative':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getPlatformIcon = (platform) => {
    switch (platform) {
      case 'Twitter':
        return '𝕏';
      case 'Mastodon':
        return '🐘';
      case 'Telegram':
        return '✈️';
      case 'Reddit':
        return '🔴';
      default:
        return '🌐';
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-700">
        <thead className="bg-jet-black">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
              Post
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider hidden md:table-cell">
              Platform
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider hidden sm:table-cell">
              Date
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
              Engagement
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider hidden lg:table-cell">
              Sentiment
            </th>
          </tr>
        </thead>
        <tbody className="bg-dark-jet divide-y divide-gray-700">
          {posts.map((post) => (
            <tr key={post.id} className="hover:bg-jet-black/50 transition-colors">
              <td className="px-6 py-4">
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 hidden sm:block">
                    <div className="w-10 h-10 rounded-full bg-pale-taupe/20 flex items-center justify-center text-lg">
                      {getPlatformIcon(post.platform)}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-light-taupe">{post.author}</div>
                    <div className="text-sm text-gray-400 mt-1">{post.content}</div>
                    <div className="mt-1 sm:hidden text-xs text-gray-500">
                      {post.platform} • {formatDate(post.date)}
                    </div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 hidden md:table-cell">
                <span className="px-2 py-1 text-xs rounded-full bg-jet-black text-light-taupe">
                  {post.platform}
                </span>
              </td>
              <td className="px-6 py-4 text-sm text-gray-400 hidden sm:table-cell">
                {formatDate(post.date)}
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center space-x-3 text-sm text-gray-400">
                  <div className="flex items-center">
                    <ThumbsUp size={14} className="mr-1" />
                    {post.likes}
                  </div>
                  <div className="flex items-center">
                    <Share2 size={14} className="mr-1" />
                    {post.shares}
                  </div>
                  <div className="flex items-center">
                    <MessageCircle size={14} className="mr-1" />
                    {post.comments}
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 hidden lg:table-cell">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getSentimentColor(post.sentiment)} text-white`}>
                  {post.sentiment.charAt(0).toUpperCase() + post.sentiment.slice(1)}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
      {posts.length === 0 && (
        <div className="text-center py-8 text-gray-400">
          No posts found matching your filters.
        </div>
      )}
      
      <div className="mt-4 flex justify-between items-center text-sm text-gray-400">
        <div>
          Showing {posts.length} of {posts.length} results
        </div>
        <div className="flex space-x-2">
          <button className="px-3 py-1 border border-gray-700 rounded hover:bg-jet-black transition-colors">
            Previous
          </button>
          <button className="px-3 py-1 bg-accent text-white rounded hover:bg-accent/90 transition-colors">
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostList;
