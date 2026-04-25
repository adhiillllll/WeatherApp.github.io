import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import './FavoritePage.css'
import back_icon from '../assets/turn-left.png'

const FavoritePage = () => {
  const [favorites, setFavorites] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(data);
  }, []);

  return (
    <div className="favorites-page">

      <div className="back-container">
        <img src={back_icon} alt="back-icon"  className="back-button"   onClick={() => navigate("/")} />
      </div>

      <h2>Favorite Cities</h2>

      {favorites.length === 0 ? (
        <p>No favorites yet</p>
      ) : (
        favorites.map((city, index) => (
          <p key={index}>{city}</p>
        ))
      )}
    </div>
  );
};

export default FavoritePage;