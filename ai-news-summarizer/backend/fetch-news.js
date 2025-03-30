// fetchDailyNews.js
const axios = require('axios');
const mongoose = require('mongoose');
const Article = require('./models/Article');

// Categories to fetch
const CATEGORIES = ['general', 'technology', 'sports', 'entertainment'];
const NEWS_API_KEY = 'your-newsapi-key';
const GEMINI_API_KEY = 'your-gemini-key';

async function fetchNewsByCategory(category) {
  try {
    // Fetch from NewsAPI
    const response = await axios.get('https://newsapi.org/v2/top-headlines', {
      params: {
        country: 'us',
        category: category,
        pageSize: 3, // 3 articles per category
        apiKey: NEWS_API_KEY
      }
    });
    
    return response.data.articles;
  } catch (error) {
    console.error(`Error fetching ${category} news:`, error);
    return [];
  }
}

async function generateSummary(title, description) {
  try {
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`,
      {
        contents: [{
          parts: [{
            text: `Please create a concise, engaging one-sentence summary of this news article. Title: "${title}" Description: "${description}"`
          }]
        }]
      }
    );
    
    return response.data.candidates[0].content.parts[0].text;
  } catch (error) {
    console.error('Error generating summary:', error);
    return description; // Fallback to the original description
  }
}

async function updateDatabase() {
  try {
    // Connect to MongoDB
    await mongoose.connect('mongodb+srv://adminJoe:karthikjoeakash@news-cluster.xku1vza.mongodb.net/');
    
    // Process each category
    for (const category of CATEGORIES) {
      const articles = await fetchNewsByCategory(category);
      
      for (const article of articles) {
        // Check if article already exists (by URL)
        const existingArticle = await Article.findOne({ url: article.url });
        
        if (!existingArticle) {
          // Generate summary with Gemini
          const summary = await generateSummary(article.title, article.description);
          
          // Create new article in database
          await Article.create({
            title: article.title,
            description: article.description,
            url: article.url,
            imageUrl: article.urlToImage,
            category: category,
            summary: summary,
            publishedAt: new Date(article.publishedAt),
            createdAt: new Date()
          });
        }
      }
    }
    
    console.log('Database updated successfully');
  } catch (error) {
    console.error('Error updating database:', error);
  } finally {
    mongoose.disconnect();
  }
}

// Execute the update
updateDatabase();