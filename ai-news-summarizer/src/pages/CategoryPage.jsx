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
