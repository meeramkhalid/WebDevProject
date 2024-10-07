import { useState } from 'react';
import Navbar from '../components/navbar'; 
import Categories from '../components/Categories'; 
import ListingCard from '../components/ListingCards';
import '../components_styles/home.css';
import '../components/Footer'

const home = () => {
    const [count, setCount] = useState(0);
    const listings = [
        {
          image: 'hotel1.jfif',
          title: 'Cozy Apartment in the City Center',
          propertyType: 'Entire home',
          guests: 4,
          bedrooms: 2,
          bathrooms: 1,
          price: 120,
          rating: 4.5,
        },
        {
          image: 'parishotel.jpg',
          title: 'Modern Loft with City Views',
          propertyType: 'Entire apartment',
          guests: 2,
          bedrooms: 1,
          bathrooms: 1,
          price: 150,
          rating: 4.8,
        },
        {
            image: 'hotel1_mountainView.jpg',
            title: 'Cozy Apartment in the City Center',
            propertyType: 'Entire home',
            guests: 4,
            bedrooms: 2,
            bathrooms: 1,
            price: 120,
            rating: 4.5,
          },
          {
            image: 'hotel3.jpg',
            title: 'Modern Loft with City Views',
            propertyType: 'Entire apartment',
            guests: 2,
            bedrooms: 1,
            bathrooms: 1,
            price: 150,
            rating: 4.8,
          },      ];
    return (
      <>
        <Navbar />
        <Categories/>
        {/* <ListingCard/> */}
        <div className="listing-container">
      {listings.map((listing, index) => (
        <ListingCard key={index} {...listing} />
      ))}
    </div>
    <Footer />
      </>
    );
  };
export default home;
