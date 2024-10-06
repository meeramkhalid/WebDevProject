import React from 'react';
import './ListingCard.css'; // Import the CSS for styling

const ListingCard = ({ image, title, propertyType, guests, bedrooms, bathrooms, price, rating }) => {
  return (
    <div className="listing-card">
      <img src={image} alt={title} className="listing-image" />
      <div className="listing-details">
        <h3 className="listing-title">{title}</h3>
        <p className="listing-type">{propertyType}</p>
        <p className="listing-info">
          {guests} guests · {bedrooms} bedrooms · {bathrooms} bathrooms
        </p>
        <div className="listing-footer">
          <span className="listing-price">${price} per night</span>
          <span className="listing-rating">{rating} ⭐</span>
        </div>
      </div>
    </div>
  );
};

export default ListingCard;
