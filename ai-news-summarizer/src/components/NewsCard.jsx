// src/components/NewsCard.jsx
import React from 'react';

function NewsCard({ title, summary }) {
  return (
    <div className="news-card">
      <h3>{title}</h3>
      <p>{summary}</p>
      <a href="#">Read more →</a>
    </div>
  );
}

export default NewsCard;
