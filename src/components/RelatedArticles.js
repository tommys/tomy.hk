// src/components/RelatedArticles.js
import React from 'react';
import { Link } from 'react-router-dom';
import pageData from '../data/pageData';

const RelatedArticles = ({ currentArticle }) => {
  const relatedPages = pageData.filter(
    (page) =>
      page.id !== currentArticle.id &&
      (page.categories.some((category) =>
        currentArticle.categories.includes(category)
      ) ||
        page.tags.some((tag) => currentArticle.tags.includes(tag)))
  );

  // Function to shuffle an array
  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const randomRelatedPages = shuffleArray(relatedPages).slice(0, 5);

  return (
    <div className="related-articles">
      <h2>Related Articles</h2>
      {randomRelatedPages.length === 0 ? (
        <p>No related articles found.</p>
      ) : (
        <ul>
          {randomRelatedPages.map((page) => (
            <li key={page.id}>
              <Link to={`/explore/${page.slug}`}>{page.title}</Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default RelatedArticles;