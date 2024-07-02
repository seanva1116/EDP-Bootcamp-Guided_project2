import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './components/Home';
import Character from './components/Character';
import './App.css';

function App() {
  return (
    <>
      <BrowserRouter>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/characters/:id" element={<Character />} />
          {/* <Route path="/films/:id" element={<Films />} />
          <Route path="/planets/:id" element={<Planets />} /> */}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App
