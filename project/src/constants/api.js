// API Configuration
export const API_URLS = {
  LEETCODE: 'https://leetcode-api.herokuapp.com',
  CODECHEF: 'https://codechef-api.herokuapp.com'
};

// Mock data for demonstration
export const MOCK_DATA = {
  leetcode: {
    username: 'john_coder',
    ranking: 15420,
    rating: 1847,
    stars: 4,
    totalSolved: 342,
    easySolved: 156,
    mediumSolved: 132,
    hardSolved: 54,
    contestRating: [
      { contest: 1, rating: 1200 },
      { contest: 2, rating: 1350 },
      { contest: 3, rating: 1420 },
      { contest: 4, rating: 1580 },
      { contest: 5, rating: 1690 },
      { contest: 6, rating: 1750 },
      { contest: 7, rating: 1820 },
      { contest: 8, rating: 1847 }
    ]
  },
  codechef: {
    username: 'john_chef',
    ranking: 8342,
    rating: 2156,
    stars: 5,
    contestRating: [
      { contest: 1, rating: 1400 },
      { contest: 2, rating: 1580 },
      { contest: 3, rating: 1720 },
      { contest: 4, rating: 1890 },
      { contest: 5, rating: 2020 },
      { contest: 6, rating: 2156 }
    ]
  }
};