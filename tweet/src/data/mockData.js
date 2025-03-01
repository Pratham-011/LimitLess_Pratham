// Mock posts data
export const mockPosts = [
  {
    id: '1',
    content: "Just tried the new AI feature and it's absolutely amazing! #AI #Technology",
    platform: 'Twitter',
    date: '2025-04-15T14:32:00',
    author: '@techEnthusiast',
    likes: 245,
    shares: 87,
    comments: 32,
    sentiment: 'positive'
  },
  {
    id: '2',
    content: 'The latest AI developments are concerning. We need more regulation on this technology.',
    platform: 'Mastodon',
    date: '2025-04-15T10:15:00',
    author: '@policyWatcher',
    likes: 189,
    shares: 56,
    comments: 41,
    sentiment: 'negative'
  },
  {
    id: '3',
    content: 'Check out this tutorial on implementing machine learning models in your projects!',
    platform: 'Telegram',
    date: '2025-04-14T16:45:00',
    author: 'CodeMaster',
    likes: 312,
    shares: 124,
    comments: 18,
    sentiment: 'positive'
  },
  {
    id: '4',
    content: 'AI is neither good nor bad, it depends on how we use it. Let\'s focus on ethical implementation.',
    platform: 'Reddit',
    date: '2025-04-14T09:20:00',
    author: 'u/balancedView',
    likes: 567,
    shares: 98,
    comments: 87,
    sentiment: 'neutral'
  },
  {
    id: '5',
    content: 'New research shows AI can predict climate patterns with 95% accuracy. #ClimateAction',
    platform: 'Twitter',
    date: '2025-04-13T13:10:00',
    author: '@scienceReporter',
    likes: 876,
    shares: 432,
    comments: 65,
    sentiment: 'positive'
  },
  {
    id: '6',
    content: 'AI-generated art won another competition. Is this fair to human artists?',
    platform: 'Mastodon',
    date: '2025-04-13T11:05:00',
    author: '@artCritic',
    likes: 421,
    shares: 187,
    comments: 93,
    sentiment: 'negative'
  },
  {
    id: '7',
    content: 'Our company just launched an AI assistant that helps with daily tasks. Try it now!',
    platform: 'Telegram',
    date: '2025-04-12T15:30:00',
    author: 'ProductLauncher',
    likes: 156,
    shares: 43,
    comments: 27,
    sentiment: 'positive'
  },
  {
    id: '8',
    content: 'I\'ve been using AI tools for a month now. They\'re helpful but still have limitations.',
    platform: 'Reddit',
    date: '2025-04-12T08:45:00',
    author: 'u/practicalReviewer',
    likes: 342,
    shares: 76,
    comments: 54,
    sentiment: 'neutral'
  },
  {
    id: '9',
    content: 'AI ethics conference announced for next month. Important discussions ahead! #AIEthics',
    platform: 'Twitter',
    date: '2025-04-11T17:20:00',
    author: '@ethicsProf',
    likes: 289,
    shares: 134,
    comments: 42,
    sentiment: 'positive'
  },
  {
    id: '10',
    content: 'My job was automated by AI last week. What skills should I learn now?',
    platform: 'Mastodon',
    date: '2025-04-11T14:15:00',
    author: '@careerPivot',
    likes: 523,
    shares: 215,
    comments: 178,
    sentiment: 'negative'
  },
  {
    id: '11',
    content: 'AI-powered healthcare diagnostics saved my life. Technology is truly amazing.',
    platform: 'Telegram',
    date: '2025-04-10T12:40:00',
    author: 'GratefulPatient',
    likes: 987,
    shares: 456,
    comments: 123,
    sentiment: 'positive'
  },
  {
    id: '12',
    content: 'Just finished a course on prompt engineering. It\'s a valuable skill in the AI era.',
    platform: 'Reddit',
    date: '2025-04-10T10:05:00',
    author: 'u/continuousLearner',
    likes: 276,
    shares: 89,
    comments: 37,
    sentiment: 'positive'
  }
];

// Mock topics data for word cloud
export const topicsData = [
  { topic: 'AI', count: 85 },
  { topic: 'Technology', count: 64 },
  { topic: 'Ethics', count: 42 },
  { topic: 'Jobs', count: 38 },
  { topic: 'Automation', count: 35 },
  { topic: 'Machine Learning', count: 31 },
  { topic: 'Regulation', count: 28 },
  { topic: 'Innovation', count: 25 },
  { topic: 'Future', count: 23 },
  { topic: 'Data', count: 21 },
  { topic: 'Privacy', count: 19 },
  { topic: 'Algorithms', count: 17 },
  { topic: 'Research', count: 15 },
  { topic: 'Development', count: 14 },
  { topic: 'Implementation', count: 12 }
];

// Mock time series data
export const timeSeriesData = [
  { date: '2025-04-10', count: 145, platform: 'Twitter' },
  { date: '2025-04-10', count: 87, platform: 'Mastodon' },
  { date: '2025-04-10', count: 65, platform: 'Telegram' },
  { date: '2025-04-10', count: 112, platform: 'Reddit' },
  { date: '2025-04-11', count: 167, platform: 'Twitter' },
  { date: '2025-04-11', count: 93, platform: 'Mastodon' },
  { date: '2025-04-11', count: 71, platform: 'Telegram' },
  { date: '2025-04-11', count: 124, platform: 'Reddit' },
  { date: '2025-04-12', count: 189, platform: 'Twitter' },
  { date: '2025-04-12', count: 102, platform: 'Mastodon' },
  { date: '2025-04-12', count: 78, platform: 'Telegram' },
  { date: '2025-04-12', count: 136, platform: 'Reddit' },
  { date: '2025-04-13', count: 213, platform: 'Twitter' },
  { date: '2025-04-13', count: 115, platform: 'Mastodon' },
  { date: '2025-04-13', count: 86, platform: 'Telegram' },
  { date: '2025-04-13', count: 148, platform: 'Reddit' },
  { date: '2025-04-14', count: 245, platform: 'Twitter' },
  { date: '2025-04-14', count: 127, platform: 'Mastodon' },
  { date: '2025-04-14', count: 94, platform: 'Telegram' },
  { date: '2025-04-14', count: 163, platform: 'Reddit' },
  { date: '2025-04-15', count: 278, platform: 'Twitter' },
  { date: '2025-04-15', count: 142, platform: 'Mastodon' },
  { date: '2025-04-15', count: 103, platform: 'Telegram' },
  { date: '2025-04-15', count: 179, platform: 'Reddit' }
];

// Mock sentiment data
export const sentimentData = {
  positive: 45,
  neutral: 30,
  negative: 25
};

// Mock platform engagement data
export const platformEngagementData = [
  { platform: 'Twitter', likes: 1678, shares: 743, comments: 421 },
  { platform: 'Mastodon', likes: 1133, shares: 458, comments: 312 },
  { platform: 'Telegram', likes: 1455, shares: 623, comments: 168 },
  { platform: 'Reddit', likes: 1185, shares: 263, comments: 578 }
];

// Mock bubble chart data
export const bubbleData = [
  { id: 'AI', value: 85, label: 'AI', color: '#F97316' },
  { id: 'Ethics', value: 42, label: 'Ethics', color: '#C2B6AB' },
  { id: 'Jobs', value: 38, label: 'Jobs', color: '#E5DFD9' },
  { id: 'Technology', value: 64, label: 'Technology', color: '#F97316' },
  { id: 'Automation', value: 35, label: 'Automation', color: '#C2B6AB' },
  { id: 'ML', value: 31, label: 'Machine Learning', color: '#E5DFD9' },
  { id: 'Regulation', value: 28, label: 'Regulation', color: '#F97316' },
  { id: 'Innovation', value: 25, label: 'Innovation', color: '#C2B6AB' }
];
