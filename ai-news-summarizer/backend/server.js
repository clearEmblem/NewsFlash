// backend/server.js
// backend/server.js
import express from 'express';
import mongoose from 'mongoose';
import Article from './Article.js';
import cors from 'cors';

const app = express();
app.use(cors());

// Get articles for homepage (general category)
app.get('/api/articles', async (req, res) => {
  try {
    await mongoose.connect('mongodb://localhost:27017/newsaggregator');
    const articles = await Article.find({ 
      category: { $regex: new RegExp('^general$', 'i') } 
    }).sort({_id: -1}).limit(6);
    res.json(articles);
  } catch (error) {
    console.error('Error fetching general news:', error);
    res.status(500).json({ error: 'Failed to fetch articles' });
  }
});

// Get articles by category
app.get('/api/articles/category/:category', async (req, res) => {
  try {
    // Connect to MongoDB
    await mongoose.connect('mongodb://localhost:27017/newsaggregator');
    
    // Get the category from URL parameter
    const { category } = req.params;
    
    // Make category matching case-insensitive
    const articles = await Article.find({ 
      category: { $regex: new RegExp(`^${category}$`, 'i') }
    }).sort({_id: -1}).limit(6);
    
    // Send articles as JSON response
    res.json(articles);
  } catch (error) {
    console.error(`Error fetching ${req.params.category} news:`, error);
    res.status(500).json({ error: 'Failed to fetch articles' });
  }
});

// Start server on port 5001
app.listen(5001, () => {
  console.log('Server running on port 5001');
});
/*
import express from 'express';
import mongoose from 'mongoose';
import Article from './Article.js';
import cors from 'cors';

const app = express();
app.use(cors());

// Get articles by category
app.get('/api/articles/category/:category', async (req, res) => {
  try {
    // Connect to MongoDB
    await mongoose.connect('mongodb://localhost:27017/newsaggregator');
    
    // Get the category from URL parameter
    const { category } = req.params;
    
    // Query MongoDB for articles of this category
    const articles = await Article.find({ 
      category: category 
    }).sort({_id: -1}).limit(6);
    
    // Send articles as JSON response
    res.json(articles);
  } catch (error) {
    console.error(`Error fetching ${req.params.category} news:`, error);
    res.status(500).json({ error: 'Failed to fetch articles' });
  }
});

// Start server on port 5000
app.listen(5001, () => {
  console.log('Server running on port 5001');
});
*/