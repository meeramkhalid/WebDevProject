// import React from 'react';
// import { Link } from 'react-router-dom';  // Import Link from react-router-dom
// import '../components_styles/ListingCards.css'; 

// const ListingCard = ({ id, image, title, propertyType, guests, bedrooms, bathrooms, price, rating, location, amenities }) => {
//   return (
//     <div className="listing-card">
//       {/* Make the image clickable by wrapping it in a Link */}
//       <Link to={`/listing/${id}`}>
//         <img src={image} alt={title} className="listing-image" />
//       </Link>
      
//       <div className="listing-details">
//         <h3 className="listing-title">{title}</h3>
//         <p className="listing-type">{propertyType}</p>
//         <p className="listing-info">
//           {guests} guests · {bedrooms} bedrooms · {bathrooms} bathrooms · <br />
//           Location: {location}
//         </p>
//         <div className="listing-footer">
//           <span className="listing-price">${price} per night</span>
//           <span className="listing-rating">{rating} ⭐</span>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ListingCard;
// import React from 'react';
import { Link } from 'react-router-dom';  
import '../components_styles/ListingCards.css'; 
import React, { useState, useEffect } from 'react';

const ListingCards = ({ userRole, isAdmin, onDelete }) => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [showForm, setShowForm] = useState(false); // State to toggle form
  const [newListing, setNewListing] = useState({
    image: '',
    title: '',
    propertyType: '',
    guests: '',
    bedrooms: '',
    bathrooms: '',
    price: '',
    rating: '',
    location: '',
    amenities: '',
    description: ''
  });

  const fetchListings = async () => {
    if (listings.length > 0) return;

    try {
      const response = await fetch('http://localhost:5000/api/listings'); 
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setListings(data);
    } catch (error) {
      console.error('Failed to fetch listings:', error);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const handleAddListing = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/listings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newListing),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const addedListing = await response.json();
      setListings([...listings, addedListing]); // Update listings with new listing
      setShowForm(false); // Hide form after successful addition
    } catch (error) {
      console.error('Failed to add listing:', error);
    }
  };

  useEffect(() => {
    fetchListings();
  }, []);  
  
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Failed to load listings. Please try again later.</div>;
  }
  // const filteredListings = listings.filter((listing) =>
  //   listing.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
  //   listing.location.toLowerCase().includes(searchQuery.toLowerCase())
  // );
  return (
    <div className="listing-container">
      {/* Show "+" button for admin */}
      {isAdmin && (
        <div className="add-listing-container">
          <button className="add-button" onClick={() => setShowForm(!showForm)}>
            + ADD A NEW LISTING
          </button>
          {showForm && (
            <form 
              className="add-listing-form" 
              onSubmit={(e) => { e.preventDefault(); handleAddListing(); }}
            >
              <input
                type="text"
                placeholder="Image URL"
                value={newListing.image}
                onChange={(e) => setNewListing({ ...newListing, image: e.target.value })}
              />
              <input
                type="text"
                placeholder="Title"
                value={newListing.title}
                onChange={(e) => setNewListing({ ...newListing, title: e.target.value })}
              />
              <input
                type="text"
                placeholder="Property Type"
                value={newListing.propertyType}
                onChange={(e) => setNewListing({ ...newListing, propertyType: e.target.value })}
              />
              <input
                type="number"
                placeholder="Guests"
                value={newListing.guests}
                onChange={(e) => setNewListing({ ...newListing, guests: e.target.value })}
              />
              <input
                type="number"
                placeholder="Bedrooms"
                value={newListing.bedrooms}
                onChange={(e) => setNewListing({ ...newListing, bedrooms: e.target.value })}
              />
              <input
                type="number"
                placeholder="Bathrooms"
                value={newListing.bathrooms}
                onChange={(e) => setNewListing({ ...newListing, bathrooms: e.target.value })}
              />
              <input
                type="number"
                placeholder="Price"
                value={newListing.price}
                onChange={(e) => setNewListing({ ...newListing, price: e.target.value })}
              />
              <input
                type="number"
                placeholder="Rating"
                value={newListing.rating}
                onChange={(e) => setNewListing({ ...newListing, rating: e.target.value })}
              />
              <input
                type="text"
                placeholder="Location"
                value={newListing.location}
                onChange={(e) => setNewListing({ ...newListing, location: e.target.value })}
              />
              <input
                type="text"
                placeholder="Amenities (comma-separated)"
                value={newListing.amenities}
                onChange={(e) =>
                  setNewListing({
                    ...newListing,
                    amenities: e.target.value.split(',').map((a) => a.trim()),
                  })
                }
              />
              <textarea
                placeholder="Description"
                value={newListing.description}
                onChange={(e) => setNewListing({ ...newListing, description: e.target.value })}
              />
              <button type="submit">Add Listing</button>
            </form>
          )}
        </div>
      )}
      
      {listings.map((listing) => (
  <div key={listing._id} className="listing-card"> {/* Use a unique key */}
    <Link to={`/listing/${listing._id}`} className="listing-link">
      <img src={listing.image} alt={listing.title} className="listing-image" />
      <div className="listing-details">
        <h3 className="listing-title">{listing.title}</h3>
        <p className="listing-type">{listing.propertyType}</p>
        <p className="listing-info">
          {listing.guests} guests · {listing.bedrooms} bedrooms · {listing.bathrooms} bathrooms
        </p>
        <div className="listing-footer">
          <span className="listing-price">${listing.price} per night</span>
          <span className="listing-rating">{listing.rating} ⭐</span>
        </div>
      </div>
    </Link>
    {isAdmin && (
      <button 
        className="delete-button" 
        onClick={() => onDelete(listing._id)}>
        Delete
      </button>
    )}
  </div>
))}
    </div>
  );
};

export default ListingCards;
