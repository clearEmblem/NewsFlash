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

dotenv.config();


// import { GoogleGenAI } from "@google/genai";

// Specify path to api key
// require('dotenv').config({ path: '../.env' });

// Categories to fetch
const CATEGORIES = ['general', 'technology', 'sports', 'business', 'entertainment', 'health', 'science'];

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
    try {
      // Direct API call using axios
      const response = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyDUXMvBYHWk6nUtMXktt5a_OcqEmfxD9HM`,
        {
          contents: [
            {
              parts: [
                {
                  text: `Please create a concise, engaging two-sentence summary of this news article. Title: "${title}" Description: "${description}"`
                }
              ]
            }
          ]
        }
      );
      
      // Extract the summary from the response
      if (response.data && 
          response.data.candidates && 
          response.data.candidates[0] && 
          response.data.candidates[0].content && 
          response.data.candidates[0].content.parts && 
          response.data.candidates[0].content.parts[0]) {
        return response.text;
      } else {
        console.warn("Unexpected response structure:", JSON.stringify(response.data));
        return description || title;
      }
    } catch (error) {
      console.error('Error generating summary:', error);
      console.error('Error details:', error.response ? error.response.data : 'No response data');
      return description || title;
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