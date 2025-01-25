import React, { useState, useRef, useEffect } from 'react';

const SearchBox = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const searchInputRef = useRef(null);

  useEffect(() => {
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchQuery) {
      window.location.href = `https://www.google.com.hk/search?q=${encodeURIComponent(searchQuery)}`;
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        ref={searchInputRef}
        placeholder="Google"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="input-text-color"
      />
    </form>
  );
};

export default SearchBox;