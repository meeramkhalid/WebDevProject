// import { useState, useEffect } from 'react';
// import Navbar from '../components/navbar'; 
// import Categories from '../components/Categories'; 
// import ListingCard from '../components/ListingCards';
// import '../components_styles/home.css';
// import Footer from '../components/Footer';

// const Dashboard = () => {
//   const [listings, setListings] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // Fetch listings from API
//   useEffect(() => {
//     const fetchListings = async () => {
//       try {
//         const response = await fetch('http://localhost:5000/api/listings');
//         if (!response.ok) {
//           throw new Error('Failed to fetch listings');
//         }
//         const data = await response.json();
//         setListings(data);
//       } catch (error) {
//         console.error(error.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchListings();
//   }, []);

//   const handleDelete = async (listingId) => {
//     const token = localStorage.getItem('token'); 
//     console.log('Token:', token); 

//     try {
//       const response = await fetch(`http://localhost:5000/api/listings/${listingId}`, {
//         method: 'DELETE',
//         headers: {
//           'Authorization': `Bearer ${token}`,
//           'Content-Type': 'application/json',
//         },
//       });
  
//       if (!response.ok) {
//         throw new Error(`Failed to delete listing with ID ${listingId}`);
//       }
  
//       console.log('Listing deleted successfully');
//     } catch (error) {
//       console.error('Error deleting listing:', error.message);
//     }
//   };
  
//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <>
//       ADMIN DASHBOARD
//       {/* <Navbar /> */}
//       <Categories />
//       <div className="listing-container1">
//         {listings.map((listing, index) => (
//          <ListingCard 
//          key={index} 
//          {...listing} 
//          isAdmin={true} 
//          onDelete={handleDelete} 
//        />
       
//         ))}
//       </div>
//       <Footer />
//     </>
//   );
// };

// export default Dashboard;

import { useState, useEffect } from 'react';
import Navbar from '../components/navbar'; 
import Categories from '../components/Categories'; 
import ListingCard from '../components/ListingCards';
import '../components_styles/home.css';
import Footer from '../components/Footer';

const Dashboard = () => {
  const [listings, setListings] = useState([]);  // To hold all listings
  const [bookedItems, setBookedItems] = useState([]);  // To hold booked listings
  const [loading, setLoading] = useState(true);

  // Fetch all listings from API
  useEffect(() => {
    const fetchListings = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/listings');
        if (!response.ok) {
          throw new Error('Failed to fetch listings');
        }
        const data = await response.json();
        setListings(data);
      } catch (error) {
        console.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchListings();
  }, []);

  // Fetch booked listings from API when button is clicked
  const fetchBookedItems = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/bookings');  // Replace with your API endpoint
      if (!response.ok) {
        throw new Error('Failed to fetch booked items');
      }
      const data = await response.json();
      setBookedItems(data);  // Set the booked items data from the API
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleDelete = async (listingId) => {
    const token = localStorage.getItem('token'); 
    console.log('Token:', token); 

    try {
      const response = await fetch(`http://localhost:5000/api/listings/${listingId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        throw new Error(`Failed to delete listing with ID ${listingId}`);
      }
  
      console.log('Listing deleted successfully');
    } catch (error) {
      console.error('Error deleting listing:', error.message);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      ADMIN DASHBOARD
      {/* <Navbar /> */}
      <Categories />
      
      {/* Button to fetch booked items */}
      {/* <button onClick={fetchBookedItems} className="fetch-booked-items-btn">
        Fetch Booked Items
      </button> */}

      <div className="listing-container1">
        {listings.map((listing, index) => (
          <ListingCard 
            key={index} 
            {...listing} 
            isAdmin={true} 
            onDelete={handleDelete} 
          />
        ))}
      </div>

      {/* Display booked items if any */}
      {bookedItems.length > 0 && (
        <div className="booked-items-container">
          <h3>Booked Listings</h3>
          <div className="booked-items">
            {bookedItems.map((item, index) => (
              <div key={index} className="booked-item">
                <h4>{item.title}</h4>
                <p>Booked by: {item.bookedBy}</p>
                <p>Date: {item.bookingDate}</p>
                {/* Add other relevant details here */}
              </div>
            ))}
          </div>
        </div>
      )}

      <Footer />
    </>
  );
};

export default Dashboard;

