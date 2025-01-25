// src/data/content/page-3.js
import React from 'react';

const page3 = {
  id: 20230629,
  title: 'Page 3',
  pageTitle: (
    <>
      page 3
    </>
  ),
  content: (
    <div className="page-3-content">
      This is the content of <strong>Page 3</strong> with some <em>JSX</em>, an{" "}
      <a href="https://google.com">external link</a>, and an image:
      <br />
     


     <img src="./images/13137493.png" alt="" />

     <img src="/assets/images/13137480.png" width="200" alt="" />



    </div>
  ),
  customContent: (
    <div className="custom-content">
      This is some custom content for Page 1.
    </div>
  ),
  slug: 'page-3',
  categories: ['Catego', 'Category', '日本治改善'],
  tags: ['Tag 2', 'Tag 3', 'Tag 5', '日本 企業管'],
  date: '2023-05-12',
  showCustomField: false,
};

export default page3;