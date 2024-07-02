
import React, { useState, useEffect } from 'react'
import Home from './components/Home'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Header from "./components/Header";
import Character from "./components/Character";
import Planets from "./components/Planets";
import Films from "./components/Film"

import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <div>
       <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/characters/:id" element={<Character />} />
          <Route path="/" element={<Home />} />
          <Route path="/films/:id" element={<Films />} />
          <Route path="/planets/:id" element={<Planets />} />
        </Routes>
      </BrowserRouter>
     
    </div>
  )
}

export default App
