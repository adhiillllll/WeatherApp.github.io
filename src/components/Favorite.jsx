import React from "react";
import "./Favorite.css";
import favorite_icon from "../assets/favorite.png";

const Favorite = ({ onClick }) => {
  return (
    <div className="favorite-container">
      <img
        src={favorite_icon}    alt="favorite"    className="favorite-icon"
        onClick={onClick}
      />
    </div>
  );
};

export default Favorite;