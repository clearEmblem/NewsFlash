import Article from './Article.js';
import axios from 'axios';
import mongoose from 'mongoose';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: path.join(__dirname, '/Users/akash/Projects/HooHacks/ai-news-summarizer/.env') });


// import { GoogleGenAI } from "@google/genai";

// Specify path to api key
// require('dotenv').config({ path: '../.env' });

// Categories to fetch
const CATEGORIES = ['general', 'technology', 'sports', 'entertainment'];

const NEWS_API_KEY = process.env.NEWS_API_KEY;
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

async function fetchNewsByCategory(newscategory) {
  try {
    // Fetch from NewsAPI
    const response = await axios.get('https://newsapi.org/v2/top-headlines', {
      params: {
        category: newscategory,
        pageSize: 4, 
        //apiKey: NEWS_API_KEY
        apiKey: "7c7b309731ee471baabd2964115e3198"
      }
    });
    
    return response.data.articles;
  } catch (error) {
    console.error(`Error fetching ${newscategory} news:`, error);
    return [];
  }
}

async function generateSummary(title, description) {
    const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY});

  try {
    const response = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: 
            `Please create a concise, engaging two-sentence summary of this news article. Title: "${title}" Description: "${description}"`
});
    
    return response.text;

  } catch (error) {
    console.error('Error generating summary:', error);
    return description; // Fallback to the original description
  }
}

async function updateDatabase() {
  try {
    // Connect to MongoDB
    await mongoose.connect('mongodb://localhost:27017/newsaggregator').then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Failed to connect to MongoDB:', err));
    
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
            category: category,
            summary: summary,
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