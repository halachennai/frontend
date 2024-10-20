import React, { useContext, useState } from "react";
import "./ProductDisplay.css";
import star_icon from "../Assets/Frontend_Assets/star_icon.png";
import star_dull_icon from "../Assets/Frontend_Assets/star_dull_icon.png";
import { ShopContext } from "../../Context/ShopContext";

const ProductDisplay = (props) => {
  const { product } = props;
  const { addToCart } = useContext(ShopContext);

  const [customizationInput, setCustomizationInput] = useState("-");
  const [selectedSize, setSelectedSize] = useState(""); // Add state for size selection

  // Function to handle Add to Cart including customization details
  const handleAddToCart = () => {
    if (selectedSize === "") {
      alert("Please select a size.");
      return;
    }

    // Add to cart with product id, customization name, and size
    addToCart(product.id, customizationInput, selectedSize);

    // Clear the customization input and size selection
    setCustomizationInput("-");
    setSelectedSize("");
  };

  return (
    <div className="productdisplay">
      <div className="productdisplay-left">
        <div className="productdisplay-img-list">
          <img src={product.image} alt="" />
          <img
            src={product.subimage1 ? product.subimage1 : product.image}
            alt="Product Image 1"
          />
          <img
            src={product.subimage2 ? product.subimage2 : product.image}
            alt="Product Image 2"
          />
          <img
            src={product.subimage3 ? product.subimage3 : product.image}
            alt="Product Image 3"
          />
        </div>
        <div className="productdisplay-img">
          <img className="productdisplay-main-img" src={product.image} alt="" />
        </div>
      </div>
      <div className="productdisplay-right">
        <h1>{product.name}</h1>
        <div className="productdisplay-right-stars">
          <img src={star_icon} alt="" />
          <img src={star_icon} alt="" />
          <img src={star_icon} alt="" />
          <img src={star_icon} alt="" />
          <img src={star_dull_icon} alt="" />
          <p>(122)</p>
        </div>
        <div className="productdisplay-right-prices">
          <div className="productdisplay-right-price-old">
            ${product.old_price}
          </div>
          <div className="productdisplay-right-price-new">
            ${product.new_price}
          </div>
        </div>
        <div className="productdisplay-right-description">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi
          quia quibusdam molestias facilis amet libero id ducimus non hic
        </div>
        <div className="productdisplay-right-size">
          <h1>Select Size</h1>
          <div className="productdisplay-right-sizes">
            {["S", "M", "L", "XL", "XXL"].map((size) => (
              <div
                key={size}
                className={selectedSize === size ? "size-selected" : ""}
                onClick={() => setSelectedSize(size)}
              >
                {size}
              </div>
            ))}
          </div>

          {/* Customization Box */}
          <div className="customization-box">
            <h2>Customization</h2>
            <p>Enter your Name & Number (Max 18 letters and 2 numbers)</p>
            <input
              type="text"
              maxLength={20}
              placeholder="Enter Name and Number"
              value={customizationInput}
              onChange={(e) => setCustomizationInput(e.target.value || "-")}
            />
            <p>₹300.00</p>
          </div>

          {/* Add to Cart Button */}
          <button onClick={handleAddToCart}>ADD TO CART</button>
        </div>
      </div>
    </div>
  );
};

export default ProductDisplay;

// import React, { useContext, useState } from "react";
// import "./ProductDisplay.css";
// import star_icon from "../Assets/Frontend_Assets/star_icon.png";
// import star_dull_icon from "../Assets/Frontend_Assets/star_dull_icon.png";
// import { ShopContext } from "../../Context/ShopContext";

// const ProductDisplay = (props) => {
//   const { product } = props;
//   const { addToCart } = useContext(ShopContext);

//   // State to capture combined Name and Number in a single input
//   const [customizationInput, setCustomizationInput] = useState("");

//   // Function to handle Add to Cart including customization details
//   const handleAddToCart = () => {
//     const productDetails = {
//       productId: product.id,
//       name: product.name,
//       price: product.new_price,
//       customization: customizationInput, // Store customization input
//     };

//     // Add the product to cart including the customization details
//     addToCart(product.id, customizationInput);

//     // Clear the customization input after adding to cart
//     setCustomizationInput("");
//   };

//   return (
//     <div className="productdisplay">
//       <div className="productdisplay-left">
//         <div className="productdisplay-img-list">
//           <img src={product.image} alt="" />
//           <img src={product.image} alt="" />
//           <img src={product.image} alt="" />
//           <img src={product.image} alt="" />
//         </div>
//         <div className="productdisplay-img">
//           <img className="productdisplay-main-img" src={product.image} alt="" />
//         </div>
//       </div>
//       <div className="productdisplay-right">
//         <h1>{product.name}</h1>
//         <div className="productdisplay-right-stars">
//           <img src={star_icon} alt="" />
//           <img src={star_icon} alt="" />
//           <img src={star_icon} alt="" />
//           <img src={star_icon} alt="" />
//           <img src={star_dull_icon} alt="" />
//           <p>(122)</p>
//         </div>
//         <div className="productdisplay-right-prices">
//           <div className="productdisplay-right-price-old">
//             ${product.old_price}
//           </div>
//           <div className="productdisplay-right-price-new">
//             ${product.new_price}
//           </div>
//         </div>
//         <div className="productdisplay-right-description">
//           Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi
//           quia quibusdam molestias facilis amet libero id ducimus non hic
//         </div>
//         <div className="productdisplay-right-size">
//           <h1>Select Size</h1>
//           <div className="productdisplay-right-sizes">
//             <div>S</div>
//             <div>M</div>
//             <div>L</div>
//             <div>XL</div>
//             <div>XXL</div>
//           </div>

//           {/* Customization Box */}
//           <div className="customization-box">
//             <h2>Customization</h2>
//             <p>Enter your Name & Number (Max 18 letters and 2 numbers)</p>
//             <input
//               type="text"
//               maxLength={20}
//               placeholder="Enter Name and Number"
//               value={customizationInput}
//               onChange={(e) => setCustomizationInput(e.target.value)}
//             />
//             <p>₹300.00</p>
//           </div>

//           {/* Add to Cart Button */}
//           <button onClick={handleAddToCart}>ADD TO CART</button>
//           <p className="productdisplay-right-category"></p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductDisplay;

// import React from "react";
// import "./ProductDisplay.css";
// import star_icon from "../Assets/Frontend_Assets/star_icon.png";
// import star_dull_icon from "../Assets/Frontend_Assets/star_dull_icon.png";
// import { ShopContext } from "../../Context/ShopContext";
// import { useContext, useState } from "react";

// const ProductDisplay = (props) => {
//   const { product } = props;
//   const { addToCart } = useContext(ShopContext);

//   const [customName, setCustomName] = useState(""); // State for name input
//   const [customNumber, setCustomNumber] = useState(""); // State for number input

//   const handleAddToCart = () => {
//     const productDetails = {
//       name: "Product Name", // assuming it's fetched from the product object
//       price: 899, // assuming a fixed price for now
//       customization: { customName, customNumber },
//     };

//     // Here you would pass the productDetails to your cart or context
//     console.log("Product added to cart: ", productDetails);
//   };

//   return (
//     <div className="productdisplay">
//       <div className="productdisplay-left">
//         <div className="productdisplay-img-list">
//           <img src={product.image} alt="" />
//           <img src={product.image} alt="" />
//           <img src={product.image} alt="" />
//           <img src={product.image} alt="" />
//         </div>
//         <div className="productdisplay-img">
//           <img className="productdisplay-main-img" src={product.image} alt="" />
//         </div>
//       </div>
//       <div className="productdisplay-right">
//         <h1>{product.name}</h1>
//         <div className="productdisplay-right-stars">
//           <img src={star_icon} alt="" />
//           <img src={star_icon} alt="" />
//           <img src={star_icon} alt="" />
//           <img src={star_icon} alt="" />
//           <img src={star_dull_icon} alt="" />
//           <p>(122)</p>
//         </div>
//         <div className="productdisplay-right-prices">
//           <div className="productdisplay-right-price-old">
//             ${product.old_price}
//           </div>
//           <div className="productdisplay-right-price-new">
//             ${product.new_price}
//           </div>
//         </div>
//         <div className="productdisplay-right-description">
//           Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi
//           quia quibusdam molestias facilis amet libero id ducimus non hic
//         </div>
//         <div className="productdisplay-right-size">
//           <h1>Select Size</h1>
//           <div className="productdisplay-right-sizes">
//             <div>S</div>
//             <div>M</div>
//             <div>L</div>
//             <div>XL</div>
//             <div>XXL</div>
//           </div>
//           <button
//             onClick={() => {
//               addToCart(product.id);
//             }}
//           >
//             ADD TO CART
//           </button>
//           <p className="productdisplay-right-category"></p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductDisplay;

// // import React, { useContext, useState } from "react";
// // import "./ProductDisplay.css";
// // import star_icon from "../Assets/Frontend_Assets/star_icon.png";
// // import star_dull_icon from "../Assets/Frontend_Assets/star_dull_icon.png";
// // import { ShopContext } from "../../Context/ShopContext";

// // const ProductDisplay = (props) => {
// //   const { product } = props;
// //   const { addToCart } = useContext(ShopContext);

// //   // State to capture combined Name and Number in a single input
// //   const [customizationInput, setCustomizationInput] = useState("");

// //   // Function to handle Add to Cart including customization details
// //   const handleAddToCart = () => {
// //     const productDetails = {
// //       productId: product.id,
// //       name: product.name,
// //       price: product.new_price,
// //       customization: customizationInput, // Store customization input
// //     };

// //     // Add the product to cart including the customization details
// //     addToCart(productDetails);

// //     // Clear the customization input after adding to cart
// //     setCustomizationInput("");
// //   };

// //   return (
// //     <div className="productdisplay">
// //       <div className="productdisplay-left">
// //         <div className="productdisplay-img-list">
// //           <img src={product.image} alt="" />
// //           <img src={product.image} alt="" />
// //           <img src={product.image} alt="" />
// //           <img src={product.image} alt="" />
// //         </div>
// //         <div className="productdisplay-img">
// //           <img className="productdisplay-main-img" src={product.image} alt="" />
// //         </div>
// //       </div>
// //       <div className="productdisplay-right">
// //         <h1>{product.name}</h1>
// //         <div className="productdisplay-right-stars">
// //           <img src={star_icon} alt="" />
// //           <img src={star_icon} alt="" />
// //           <img src={star_icon} alt="" />
// //           <img src={star_icon} alt="" />
// //           <img src={star_dull_icon} alt="" />
// //           <p>(122)</p>
// //         </div>
// //         <div className="productdisplay-right-prices">
// //           <div className="productdisplay-right-price-old">
// //             ${product.old_price}
// //           </div>
// //           <div className="productdisplay-right-price-new">
// //             ${product.new_price}
// //           </div>
// //         </div>
// //         <div className="productdisplay-right-description">
// //           Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi
// //           quia quibusdam molestias facilis amet libero id ducimus non hic
// //         </div>
// //         <div className="productdisplay-right-size">
// //           <h1>Select Size</h1>
// //           <div className="productdisplay-right-sizes">
// //             <div>S</div>
// //             <div>M</div>
// //             <div>L</div>
// //             <div>XL</div>
// //             <div>XXL</div>
// //           </div>

// //           {/* Customization Box */}
// //           <div className="customization-box">
// //             <h2>Customization</h2>
// //             <p>Enter your Name & Number (Max 18 letters and 2 numbers)</p>
// //             <input
// //               type="text"
// //               maxLength={20}
// //               placeholder="Enter Name and Number"
// //               value={customizationInput}
// //               onChange={(e) => setCustomizationInput(e.target.value)}
// //             />
// //             <p>₹250.00</p>
// //           </div>

// //           {/* Add to Cart Button */}
// //           <button onClick={handleAddToCart}>
// //             ADD TO CART
// //           </button>
// //           <p className="productdisplay-right-category"></p>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default ProductDisplay;
