import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import Navbar from './components/navbar'; 
import Categories from './components/Categories'; 
import Home from './components/home'

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      {/* Render Navbar at the top */}
      <Home/>


      
    </>
  );
}

export default App;
