// Define the interfaces as objects or export classes in JavaScript
// Note: JavaScript does not have a direct equivalent to TypeScript interfaces.
//       We can use export classes or objects to represent similar structures.

export class Post {
  constructor(id, content, platform, date, author, likes, shares, comments, sentiment) {
    this.id = id;
    this.content = content;
    this.platform = platform;
    this.date = date;
    this.author = author;
    this.likes = likes;
    this.shares = shares;
    this.comments = comments;
    this.sentiment = sentiment;
  }
}

export class TopicData {
  constructor(topic, count) {
    this.topic = topic;
    this.count = count;
  }
}

export class TimeSeriesData {
  constructor(date, count, platform) {
    this.date = date;
    this.count = count;
    this.platform = platform;
  }
}

export class SentimentData {
  constructor(positive, neutral, negative) {
    this.positive = positive;
    this.neutral = neutral;
    this.negative = negative;
  }
}

export class PlatformEngagement {
  constructor(platform, likes, shares, comments) {
    this.platform = platform;
    this.likes = likes;
    this.shares = shares;
    this.comments = comments;
  }
}

export class BubbleData {
  constructor(id, value, label, color) {
    this.id = id;
    this.value = value;
    this.label = label;
    this.color = color;
  }
}

