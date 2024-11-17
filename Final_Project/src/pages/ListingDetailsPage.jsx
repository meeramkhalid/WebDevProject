import React from 'react';
import { useParams, useNavigate } from 'react-router-dom'; 
import listings from '../Backend/data/listings.json';  
import '../Pages_Styles/listingDetailPages.css';

const ListingDetailsPage = () => {
  const { id } = useParams();  // Get the listing ID from the URL
  const navigate = useNavigate(); 

  const listing = listings.find(item => item.id === id);

  if (!listing) {
    return <div>Property not found</div>;
  }

  const { image, title, propertyType, guests, bedrooms, bathrooms, price, rating, location } = listing;

  const redirectToBooking = () => {
    navigate(`/booking/${id}`); 
  };
  const redirectToHome = () => {
    navigate(`/`); 
  };
  return (
    <div className="listing-details-page">
      <div className="listing-details">
      <img src={`/images/${image}`} alt={title} className="listing-image" />
      <div className="listing-info">
          <h2 className="listing-title">{title}</h2>
          <p className="listing-location">{location}</p>
          <p className="listing-type">{propertyType}</p>
          <p className="listing-info-text">
            {guests} guests · {bedrooms} bedrooms · {bathrooms} bathrooms
          </p>
          <div className="listing-footer">
            <span className="listing-price">${price} per night</span>
            <span className="listing-rating">{rating} ⭐</span>
          </div>
        </div>
      </div>
      <div className="listing-amenities">
        <h3>Amenities</h3>
        <ul>
          <li>Free WiFi</li>
          <li>Air Conditioning</li>
          <li>Heating</li>
          <li>Kitchen</li>
          <li>Parking</li>
        </ul>
      </div>
      <button className="book-now-btn" onClick={redirectToBooking}>
        Book Now
      </button> <br></br>
      <br></br>
      <button className="home-btn" onClick={redirectToHome}>
        Home
      </button>
    </div>
  );
};

export default ListingDetailsPage;
