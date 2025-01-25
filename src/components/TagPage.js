// src/components/TagPage.js
import React from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import pageData from '../data/pageData';

const TagPage = () => {
  const { tag } = useParams();
  const decodedTag = tag.replace(/-/g, ' ');
  const relatedPages = pageData.filter(page => page.tags.includes(decodedTag));

  return (
    <div className="tag-page">
            <Helmet>
        <title>{decodedTag} - Szwsaoyika</title>
      </Helmet>
      <h1>Tag: {decodedTag}</h1>
      {relatedPages.length === 0 ? (
        <p>No articles found with this tag.</p>
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

export default TagPage;