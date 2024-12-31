import { useState, useEffect } from 'react';
import Navbar from '../components/navbar'; 
import Categories from '../components/Categories'; 
import ListingCard from '../components/ListingCards';
import '../components_styles/home.css';
import Footer from '../components/Footer';

const Home = () => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);

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

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {/* <Navbar /> */}
      <Categories />
      <div className="listing-container1">
        {listings.map((listing, index) => (
          <ListingCard key={index} {...listing} />
        ))}
      </div>
      <Footer />
    </>
  );
};

export default Home;
