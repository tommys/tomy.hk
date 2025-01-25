// src/data/content/page-2.js
import React from 'react';

const page2 = {
  id: 20230701,
  title: 'Page 2',
  pageTitle: (
    <h1 className="page-2-title">
      Page Title 2
    </h1>
  ),
  content: (
    <div className="page-2-content">
      This is the content of <strong>Page 2</strong> with some <em>JSX</em>, an{" "}
      <a href="https://google.com">external link</a>, and an image:
      <br />

    </div>
        

  ),
  customContent: (
    <div className="custom-content">
      This is some custom content for Page 1.
    </div>
  ),
  slug: 'page-2',
  categories: ['Catego', 'Category', '日本 企業管 治改善'],
  tags: ['Tag 2', 'Tag 4', 'Tag 5', '日本 企業管'],
  date: '2023-05-12',
  showCustomField: false,
};

export default page2;