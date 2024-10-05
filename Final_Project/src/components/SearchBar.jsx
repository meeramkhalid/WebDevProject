import React from 'react';
import '../components_styles/searchbar.css'; 

const SearchBar = () => {
  return (
    <div className="search-bar">
      <input
        type="text"
        className="search-input"
        placeholder="Search destinations"
      />
      <button className="search-button">Search</button>
    </div>
  );
};

export default SearchBar;
