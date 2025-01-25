// src/components/OnePizza.js
import React from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import pageData from '../data/pageData';
import RelatedArticles from './RelatedArticles';
import '../css/OnePizza.css';

const shareToTwitter = (title, url) => {
  const text = encodeURIComponent(`Check this out: ${title}`);
  const shareUrl = `https://twitter.com/intent/tweet?text=${text}&url=${encodeURIComponent(url)}`;
  window.open(shareUrl, '_blank', 'noopener noreferrer');
};

const OnePizza = () => {
  const { slug } = useParams();
  const location = useLocation();
  const page = pageData.find(page => page.slug === slug);
  const date = new Date(page.date);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;

  if (!page) {
    return <h2>Page not found</h2>;
  }

  const handleShareClick = () => {
    const currentUrl = window.location.origin + location.pathname;
    shareToTwitter(page.title, currentUrl); // Use `page.title` instead of `page.pageTitle`
  };

  return (
    <div className="fullscreen center">
      <Helmet>
        <title>{page.title} - Szwsaoyika</title>
      </Helmet>
      <div id="OnePizza">
      <h1>{page.pageTitle}</h1>
      <div>
        <strong>Date:</strong>{" "}
        <Link to={`/explore/date/${year}/${month}`}>
          {date.toLocaleDateString()}
        </Link>
      </div>
      <div>
        <strong>Categories:</strong>{" "}
        {page.categories.map((category, index) => (
          <span key={index}>
            {index !== 0 && ", "}
            <Link to={`/explore/category/${category.replace(/ /g, '-')}`}>{category}</Link>
          </span>
        ))}
      </div>
      <div>
        <strong>Tags:</strong>{" "}
        {page.tags.map((tag, index) => (
          <span key={index}>
            {index !== 0 && ", "}
            <Link to={`/explore/tag/${tag.replace(/ /g, '-')}`}>{tag}</Link>
          </span>
        ))}
      </div>

      <div>{page.content}</div>
      {page.showCustomField && (
          <div className="custom-field-container">{page.customContent}</div>
        )}
      <button onClick={handleShareClick} className="share-button">
          Share on Twitter
        </button>

        <RelatedArticles currentArticle={page} />

        <div>
        <strong>All Articles:</strong>{" "}
        <Link to="/explore/archive">View all articles</Link>
      </div>

    </div>
    </div>
  );
};

export default OnePizza;




