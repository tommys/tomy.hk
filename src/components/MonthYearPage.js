// src/components/MonthYearPage.js
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import pageData from '../data/pageData';

const MonthYearPage = () => {
  const { year, month } = useParams();
  const relatedPages = pageData.filter((page) => {
    const pageDate = new Date(page.date);
    return (
      pageDate.getFullYear() === parseInt(year, 10) &&
      pageDate.getMonth() === parseInt(month, 10) - 1
    );
  });

  return (
    <div className="month-year-page">
      <h1>
        Articles from {new Date(year, month - 1).toLocaleString('default', { month: 'long' })} {year}
      </h1>
      {relatedPages.length === 0 ? (
        <p>No articles found for this month and year.</p>
      ) : (
        <ul>
          {relatedPages.map((page) => (
            <li key={page.id}>
              <Link to={`/explore/${page.slug}`}>{page.title}</Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MonthYearPage;