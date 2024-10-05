import React, { useState } from 'react';
import '../components_styles/searchbar.css';

const SearchBar = () => {
  // Step 1: Create state variable for location
  const [location, setLocation] = useState('');

  // Step 3: Function to handle the search button click
  const handleSearch = () => {
    console.log(location); // Print the location to console
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        className="search-input"
        placeholder="Search destinations"
        // Step 2: Update state on input change
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />
      <button className="search-button" onClick={handleSearch}>
        Search
      </button>
    </div>
  );
};

export default SearchBar;
