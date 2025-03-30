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

import React from 'react';

function NewsCard({ title, summary, url }) {
  return (
    <div className="news-card">
      <h3>{title}</h3>
      <p>{summary}</p>
      {/* Link to original article if URL is available */}
      {url && (
        <a href={url} target="_blank" rel="noopener noreferrer">
          Read more →
        </a>
      )}
    </div>
  );
}

export default NewsCard;