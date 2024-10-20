import React, { useEffect, useState } from "react";
import "./Popular.css";
// import data_product from "../Assets/Frontend_Assets/data";
import Item from "../Item/Item";

const PopularProducts = ({ popularProducts }) => {
  const [randomProducts, setRandomProducts] = useState([]);

  useEffect(() => {
    if (popularProducts.length > 0) {
      // Shuffle the array and pick 4 random items
      const shuffled = [...popularProducts].sort(() => 0.5 - Math.random());
      setRandomProducts(shuffled.slice(0, 4));
    }
  }, [popularProducts]);

  return (
    <div className="popular-item">
      {randomProducts.map((item, i) => (
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
  );
};

export default PopularProducts;
