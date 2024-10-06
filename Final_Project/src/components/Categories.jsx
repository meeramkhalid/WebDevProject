import React, { useRef } from 'react';
import '../components_styles/categories.css';

const categoriesData = [
  { name: 'Beachfront', icon: '🏖️' }, 
  { name: 'Cabins', icon: '🏡' },
  { name: 'Trending', icon: '🔥' },
  { name: 'Mountains', icon: '⛰️' }, 
  { name: 'Luxe', icon: '💎' },
  { name: 'Caves', icon: '🕳️' },
  { name: 'Historical Homes', icon: '🏰' },
  { name: 'Deserts', icon: '🏜️' },
  { name: 'Tropical', icon: '🌴' },
  { name: 'Boats', icon: '⛵' },
  { name: 'Countryside', icon: '🌾' },
  { name: 'Camping', icon: '🏕️' },
  { name: 'Skiing', icon: '🎿' },
  { name: 'Vineyards', icon: '🍇' },
  { name: 'Tiny Homes', icon: '🏠' }
];

const Categories = () => {
  const scrollRef = useRef(null);

  const scrollLeft = () => {
    scrollRef.current.scrollLeft -= 200; // Adjust the value to scroll more or less
  };

  const scrollRight = () => {
    scrollRef.current.scrollLeft += 200; // Adjust the value to scroll more or less
  };

  return (
    <div className="categories-container">
      <button className="scroll-arrow left" onClick={scrollLeft}>←</button>
      
      <div className="categories-list" ref={scrollRef}>
        {categoriesData.map((category, index) => (
          <div key={index} className="category-item">
            <div className="category-icon">{category.icon}</div>
            <div className="category-name">{category.name}</div>
          </div>
        ))}
      </div>

      <button className="scroll-arrow right" onClick={scrollRight}>→</button>
    </div>
  );
};

export default Categories;
