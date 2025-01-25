// src/components/WebsiteCards.js
import React from 'react';
import '../css/WebsiteCards.css';

const DEFAULT_IMAGE_URL = '/assets/images/sites/default-image.png';

const WebsiteCards = ({ websites }) => {
  const renderWebsites = () => {
    return websites.map((website) => (
      <div key={website.websitename} id={website.websitename} className="website-card">
        <a href={website.weburl} rel="noopener noreferrer">
          <div className="imgbox"><img
            src={website.webimg}
            alt={website.websitename}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = DEFAULT_IMAGE_URL;
            }}
          /></div>
          <p>{website.websitename}</p>
        </a>
      </div>
    ));
  };

  return <div className="cardsContainer">{renderWebsites()}</div>;
};

export default WebsiteCards;