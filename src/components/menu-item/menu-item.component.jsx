import React from "react";
import "./menu-item.styles.scss";

const MenuItem = ({ title, imageUrl, size }) => (
  <div className={`${size} menu-item`}>
    <div
      className="background-image"
      //it composes in a dynamic way style and class name, the size is a config setted in the data,
      //if it is present the class will heave the attribute large and take its style, if not it will not change
      style={{ backgroundImage: `url(${imageUrl}` }}
    ></div>
    <div className="content">
      <h1 className="title">{title.toUpperCase()} </h1>
      <span className="subtitle">SHOP NOW </span>
    </div>
  </div>
);

export default MenuItem;
