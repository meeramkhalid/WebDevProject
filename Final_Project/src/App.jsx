import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import Navbar from './components/navbar'; // Correct import of Navbar

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      {/* Render Navbar at the top */}
      <Navbar />
      
      
    </>
  );
}

export default App;
