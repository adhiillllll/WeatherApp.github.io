import React from "react";
import "./Favorite.css";
import favorite_icon from "../assets/favorite.png";

const Favorite = () => {
  return (
    <div className="favorite-container">
      <img src={favorite_icon} alt="favorite" className="favorite-icon" />
    </div>
  );
};

export default Favorite;