// src/components/LazyLoadedComponent.js
import React from 'react';

const LazyLoadedComponent = () => {
  return (
    <div>
      <h1>This is a lazy loaded component</h1>
      <p>
        Content inside this component will only be loaded when the user
        navigates to the corresponding route.
      </p>
    </div>
  );
};

export default LazyLoadedComponent;