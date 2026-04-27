import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import './FavoritePage.css'
import back_icon from '../assets/turn-left.png'
import delete_icon from "../assets/delete.png";
import reload_icon from "../assets/reload.png";

const FavoritePage = () => {
  const [favorites, setFavorites] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(data);
  }, []);

  const removeFavorite = (cityToRemove) => {
  const updated = favorites.filter(
    (city) => city !== cityToRemove
  );

    setFavorites(updated);
    localStorage.setItem("favorites", JSON.stringify(updated));
  };

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
      <div className="favorite-item" key={index}>
        <img  src={reload_icon}  alt="reload"  className="icon"
          onClick={() => navigate(`/?loc=${city.toLowerCase()}`)} />

        <p className="city-name"
         onClick={() => navigate(`/?loc=${city.toLowerCase()}`)} >
         {city}
        </p>

        <img  src={delete_icon}  alt="delete"  className="icon"
         onClick={() => removeFavorite(city)} />


      </div>
        ))
      )}
    </div>
  );
};

export default FavoritePage;