import React, { useState } from 'react'
import Home from './components/Home'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [characters, setCharacters] = useState([]);
  useEffect(() => {
    const fetchChars = async () => {
      try {
        const response = await fetch(`${import.meta.env.SWAPI_URL}/characters`);
        if (!response.ok) {
          throw new Error('Data could not be fetched!');
        }
        const json_response = await response.json();
        setCharacters(json_response);
      }
      catch (e){
        console.error("Error fetching characters:", e);
      }
    };
  }, []);

  return (
    <>
      <Home />
    </>
  )
}

export default App
