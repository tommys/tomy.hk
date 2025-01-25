// src/components/CategoryPage.js
import React from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import pageData from '../data/pageData';

const CategoryPage = () => {
  const { category } = useParams();
  const decodedCategory = category.replace(/-/g, ' ');
  const relatedPages = pageData.filter(page => page.categories.includes(decodedCategory));

  return (

    <div className="category-page">
        <Helmet>
        <title>{decodedCategory} - Szwsaoyika</title>
      </Helmet>
      <h1>Category: {decodedCategory}</h1>
      {relatedPages.length === 0 ? (
        <p>No articles found in this category.</p>
      ) : (
        <ul>
          {relatedPages.map((page, index) => (
            <li key={index}>
              <a href={`/explore/${page.slug}`}>{page.title}</a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CategoryPage;