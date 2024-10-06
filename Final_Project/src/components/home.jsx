import { useState } from 'react';
import Navbar from '../components/navbar'; 
import Categories from '../components/Categories'; 
import ListingCard from '../components/ListingCards';

const home = () => {
    const [count, setCount] = useState(0);

    return (
      <>
        <Navbar />
        <Categories/>
        <ListingCard/>
      
      </>
    );
  };
export default home;
