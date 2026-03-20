import React from "react";
import "../App.css";

function Card({ product }) {
  return (
    <div className="card">
      <h3 className="card-header">{product.title}</h3>
      <div className="card-body">
        <p>{product.description}</p>
      </div>
    </div>
  );
}

export default Card;
