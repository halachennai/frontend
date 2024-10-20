import React, { useEffect, useState } from "react";
import "./RelatedProducts.css";
import Item from "../Item/Item";

const Popular = () => {
  const [popularProducts, setPopularProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/newcollections")
      .then((response) => response.json())
      .then((data) => setPopularProducts(data));
  }, []);

  // Get the last 4 products from popularProducts array
  const lastFourProducts = popularProducts.slice(-4);

  return (
    <div className="popular">
      <h1>Popular Designs</h1>
      <hr />
      <div className="popular-item">
        {lastFourProducts.map((item, i) => (
          <Item
            key={i}
            id={item.id}
            name={item.name}
            image={item.image}
            new_price={item.new_price}
            old_price={item.old_price}
          />
        ))}
      </div>
    </div>
  );
};

export default Popular;
