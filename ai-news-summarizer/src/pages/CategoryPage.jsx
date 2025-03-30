// src/pages/CategoryPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import NewsCard from '../components/NewsCard';
import Sidebar from '../components/Sidebar';
import { motion } from 'framer-motion';
import axios from 'axios';
//change
function CategoryPage() {
  // Get category from URL parameter
  //const { category } = useParams();
  const params = useParams();
  const category = params.category || "general";
  // State to store articles and loading status
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Fetch articles when component mounts or category changes
  useEffect(() => {
    // Set loading to true whenever category changes
    console.log("category change to: ", category);
    setLoading(true);
    
    // Fetch articles from backend API
    axios.get(`http://localhost:5001/api/articles/category/${category}`)
      .then(response => {
        console.log("Data received:", response.data);
        // Store articles in state
        setArticles(response.data);
        // Set loading to false
        setLoading(false);
      })
      .catch(error => {
        console.error(`Error fetching ${category} news:`, error);
        setLoading(false);
      });
  }, [category]); // Re-run when category changes
  
  // Format category for display (capitalize first letter)
  const displayCategory = category.charAt(0).toUpperCase() + category.slice(1);

  return (
    <div className="container">
      <Sidebar />
      <motion.main
        className="main-content"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <h1>{displayCategory} News</h1>
        
        {/* Show loading message or articles */}
        {loading ? (
          <p>Loading {category} news...</p>
        ) : articles.length > 0 ? (
          // Map through articles and render NewsCard for each
          articles.map((article) => (
            <NewsCard 
              key={article._id}
              title={article.title}
              description={article.description}
              url={article.url}
            />
          ))
        ) : (
          // Show message if no articles found
          <p>No articles found for {category}.</p>
        )}
      </motion.main>
    </div>
  );
}

export default CategoryPage;


/*
import React from 'react';
import { useParams } from 'react-router-dom';
import NewsCard from '../components/NewsCard';
import { motion } from 'framer-motion';

function CategoryPage() {
  const { category } = useParams();

  // Example: Fake category-based content (replace with API later)
  const dummyNews = [
    {
      title: `${category} Story Title`,
      summary: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore."
    },
    {
      title: `${category} Update: AI Just Got Smarter`,
      summary: "A new language model breaks previous benchmarks while using fewer parameters. Experts say this is the future of efficient AI."
    },
    {
      title: `${category} Talks Show Hope`,
      summary: "Nations reach surprising agreements at the UN summit to reduce carbon emissions faster than expected."
    }
  ];

  return (
    <motion.main
      className="main-content"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <h1>{category} News</h1>
      {dummyNews.map((news, idx) => (
        <NewsCard key={idx} title={news.title} summary={news.summary} />
      ))}
    </motion.main>
  );
}

export default CategoryPage;
*/
