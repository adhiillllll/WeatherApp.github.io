import React from 'react'
import { Routes, Route } from "react-router-dom";
import Weather from './components/Weather'
import FavoritePage from "./components/FavoritePage";

const App = () => {
  return (
    <div className='app'>
      <Routes>
        <Route path="/" element={<Weather />} />
        <Route path="/favorites" element={<FavoritePage />} />
      </Routes>
    </div>
  );
};

export default App