// src/components/AllArticlesPage.js
import React from 'react';
import { Link } from 'react-router-dom';
import pageData from '../data/pageData';

const AllArticlesPage = () => {
  return (
    <div className="all-articles-page">
      <h1>All Articles</h1>
      <ul>
        {pageData.map((page) => (
          <li key={page.id}>
            <Link to={`/explore/${page.slug}`}>{page.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AllArticlesPage;