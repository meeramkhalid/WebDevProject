import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../Pages_Styles/listingDetailPages.css';

const ListingDetailsPage = () => {
  const { id } = useParams();  // Get the listing _id from the URL
  const navigate = useNavigate(); 
  const [listing, setListing] = useState(null);  // State to store listing data
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // Fetch the listing data based on the ID from the API
  useEffect(() => {
    const fetchListing = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/listings/${id}`);
        if (!response.ok) {
          throw new Error('Listing not found');
        }
        const data = await response.json();
        setListing(data);  // Set the listing data from API
      } catch (error) {
        console.error(error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchListing();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error || !listing) {
    return <div>Property not found</div>;
  }

  const { image, title, propertyType, guests, bedrooms, bathrooms, price, rating, location } = listing;

  const redirectToBooking = () => {
    navigate(`/booking/${id}`, { state: { listing } });
  };

  const redirectToHome = () => {
    navigate(`/`); 
  };

  return (
    <div className="listing-details-page">
      <div className="listing-detailsforpage">
      <img src={`/${image}`} alt={title} className="listing-imageforpage" />
      <div className="listing-info">
          <h2 className="listing-title">{title}</h2>
          <p className="listing-location">{location}</p>
          <p className="listing-type">{propertyType}</p>
          <p className="listing-info-text">
            {guests} guests · {bedrooms} bedrooms · {bathrooms} bathrooms
          </p>
          <div className="listing-footer">
            <span className="listing-price">${price} per night</span>
            <span className="listing-ratingforpage">{rating} ⭐</span>
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
      </button>
      <br />
      <br />
      <button className="home-btn" onClick={redirectToHome}>
        Home
      </button>
    </div>
  );
};

export default ListingDetailsPage;
