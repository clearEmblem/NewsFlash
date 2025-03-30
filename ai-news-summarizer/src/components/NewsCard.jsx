// src/components/NewsCard.jsx
/*
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
*/

// src/components/NewsCard.jsx
// src/components/NewsCard.jsx
import React from 'react';

function NewsCard({ title, description, url }) {
  return (
    <div className="news-card">
      <h3>{title}</h3>
      <p>{description || "No description available"}</p>
      {url && (
        <a href={url} target="_blank" rel="noopener noreferrer">
          Read more →
        </a>
      )}
    </div>
  );
}

export default NewsCard;