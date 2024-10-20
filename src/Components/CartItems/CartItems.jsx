import React, { useContext, useEffect, useState } from "react";
import "./CartItems.css";
import { ShopContext } from "../../Context/ShopContext";
import remove_icon from "../Assets/Frontend_Assets/cart_cross_icon.png";
import RazorpayButton from "./RazorpayButton";

const CartItems = () => {
  const { getTotalCartAmount, all_product, cartItems, removeFromCart } =
    useContext(ShopContext);

  const [cartItemsArray, setCartItemsArray] = useState([]);

  const logCartItemsArray = () => {
    const cartArray = all_product
      .map((product) => {
        if (cartItems[product.id] && cartItems[product.id][0] > 0) {
          const [quantity, customizations] = cartItems[product.id];
          return customizations.map((customization) => ({
            productName: product.name,
            price: product.new_price,
            quantity: 1,
            customization: customization[0],
            size: customization[1],
            totalPrice: product.new_price * quantity,
          }));
        }
        return null;
      })
      .flat()
      .filter((item) => item !== null);

    console.log(cartArray); // Log the array
    return cartArray; // Return the array for further use if needed
  };

  useEffect(() => {
    // Log the cart items array when the component mounts
    const itemsArray = logCartItemsArray(); // Get the cart items array
    setCartItemsArray(itemsArray); // Update the state
  }, [cartItems, all_product]); // Dependencies that trigger this effect when changed

  // Log the cartItemsArray whenever it updates
  useEffect(() => {
    console.log("Cart Items Array: ", cartItemsArray);
  }, [cartItemsArray]); // Dependencies that trigger this effect when changed

  return (
    <div className="cartitems">
      <div className="cartitems-format-main">
        <p>Products</p>
        <p>Title</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>Total</p>
        <p>Remove</p>
      </div>
      <hr />
      {all_product.map((product) => {
        if (cartItems[product.id] && cartItems[product.id][0] > 0) {
          // Extracting quantity and customizations from cartItems
          const [quantity, customizations] = cartItems[product.id];

          return (
            <div key={product.id}>
              {customizations.map((customization, index) => {
                const [customName, customSize] = customization;

                // Check if customization name is "-"
                const isCustomized = customName.trim() !== "-";
                // Price logic: Add ₹300 only if customized (i.e., name is not "-")
                const priceWithCustomization = isCustomized
                  ? product.new_price + 300
                  : product.new_price;

                return (
                  <div key={`${product.id}-${index}`}>
                    <div className="cartitems-format cartitems-format-main">
                      <img
                        src={product.image}
                        alt=""
                        className="carticon-product-icon"
                      />
                      <p>{product.name}</p>
                      <p>Rs.{priceWithCustomization}</p>
                      <button className="cartitems-quantity">1</button>
                      <p>Rs.{priceWithCustomization}</p>
                      <img
                        className="cartitems-remove-icon"
                        src={remove_icon}
                        onClick={() => {
                          removeFromCart(product.id, customName, customSize);
                        }}
                      />
                    </div>
                    <div className="custom-details">
                      {/* Display customization */}
                      <p>Customization: {customName ? customName : "-"}</p>
                      <p>Size: {customSize}</p>
                    </div>
                    <hr />
                  </div>
                );
              })}
            </div>
          );
        }
        return null;
      })}
      <div className="cartitems-down">
        <div className="cartitems-total">
          <h1>Cart Totals</h1>
          <div>
            <div className="cartitems-total-item">
              <p>Subtotal</p>
              <p>Rs.{getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cartitems-total-item">
              <p>Shipping Fee</p>
              <p>Free</p>
            </div>
            <hr />
            <div className="cartitems-total-item">
              <h3>Total</h3>
              <h3>Rs.{getTotalCartAmount()}</h3>
            </div>
          </div>
          <RazorpayButton
            amount={getTotalCartAmount()}
            cartValues={cartItemsArray}
          />
        </div>
      </div>
    </div>
  );
};

export default CartItems;

// import React, { useContext } from "react";
// import "./CartItems.css";
// import { ShopContext } from "../../Context/ShopContext";
// import remove_icon from "../Assets/Frontend_Assets/cart_cross_icon.png";

// const CartItems = () => {
//   const { getTotalCartAmount, all_product, cartItems, removeFromCart } =
//     useContext(ShopContext);

//   return (
//     <div className="cartitems">
//       <div className="cartitems-format-main">
//         <p>Products</p>
//         <p>Title</p>
//         <p>Price</p>
//         <p>Quantity</p>
//         <p>Total</p>
//         <p>Remove</p>
//       </div>
//       <hr />
//       {all_product.map((e) => {
//         if (cartItems[e.id] > 0) {
//           return (
//             <div>
//               <div className="cartitems-format cartitems-format-main">
//                 <img src={e.image} alt="" className="carticon-product-icon" />
//                 <p>{e.name}</p>
//                 <p>Rs.{e.new_price}</p>
//                 <button className="cartitems-quantity">
//                   {cartItems[e.id]}
//                 </button>
//                 <p>Rs.{e.new_price * cartItems[e.id]}</p>
//                 <img
//                   className="cartitems-remove-icon"
//                   src={remove_icon}
//                   onClick={() => {
//                     removeFromCart(e.id);
//                   }}
//                 />
//               </div>
//               <hr />
//             </div>
//           );
//         }
//         return null;
//       })}
//       <div className="cartitems-down">
//         <div className="cartitems-total">
//           <h1>Cart Totals</h1>
//           <div>
//             <div className="cartitems-total-item">
//               <p>Subtotal</p>
//               <p>Rs.{getTotalCartAmount()}</p>
//             </div>
//             <hr />
//             <div className="cartitems-total-item">
//               <p>Shipping Fee</p>
//               <p>Free</p>
//             </div>
//             <hr />
//             <div className="cartitems-total-item">
//               <h3>Total</h3>
//               <h3>Rs.{getTotalCartAmount()}</h3>
//             </div>
//           </div>
//           <button>PROCEED TO CHECKOUT</button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CartItems;

// import React, { useContext } from "react";
// import "./CartItems.css";
// import { ShopContext } from "../../Context/ShopContext";
// import remove_icon from "../Assets/Frontend_Assets/cart_cross_icon.png";

// const CartItems = () => {
//   const { getTotalCartAmount, all_product, cartItems, removeFromCart } =
//     useContext(ShopContext);

//   // Function to calculate the total amount for a product, including customization if applicable
//   const calculateProductTotal = (e) => {
//     const baseTotal = e.new_price * cartItems[e.id].quantity;
//     const customizationCharge = cartItems[e.id].customization ? 300 : 0;
//     return baseTotal + customizationCharge;
//   };

//   // Function to calculate the overall total cart amount, including customization charges
//   const getTotalCartWithCustomization = () => {
//     return all_product.reduce((total, e) => {
//       if (cartItems[e.id] && cartItems[e.id].quantity > 0) {
//         const productTotal = calculateProductTotal(e);
//         total += productTotal;
//       }
//       return total;
//     }, 0);
//   };

//   return (
//     <div className="cartitems">
//       <div className="cartitems-format-main">
//         <p>Products</p>
//         <p>Title</p>
//         <p>Customization</p>
//         <p>Price</p>
//         <p>Quantity</p>
//         <p>Total</p>
//         <p>Remove</p>
//       </div>
//       <hr />
//       {all_product.map((e) => {
//         if (cartItems[e.id] && cartItems[e.id].quantity > 0) {
//           return (
//             <div key={e.id}>
//               <div className="cartitems-format cartitems-format-main">
//                 <img src={e.image} alt="" className="carticon-product-icon" />
//                 <p>{e.name}</p>

//                 {/* Customization Display */}
//                 <p>
//                   {cartItems[e.id].customization
//                     ? cartItems[e.id].customization
//                     : "-"}
//                 </p>

//                 <p>Rs.{e.new_price}</p>

//                 <button className="cartitems-quantity">
//                   {cartItems[e.id].quantity}
//                 </button>

//                 {/* Calculate Total with Customization */}
//                 <p>Rs.{calculateProductTotal(e)}</p>

//                 <img
//                   className="cartitems-remove-icon"
//                   src={remove_icon}
//                   alt="remove"
//                   onClick={() => removeFromCart(e.id)}
//                 />
//               </div>
//               <hr />
//             </div>
//           );
//         }
//         return null;
//       })}
//       <div className="cartitems-down">
//         <div className="cartitems-total">
//           <h1>Cart Totals</h1>
//           <div>
//             <div className="cartitems-total-item">
//               <p>Subtotal</p>
//               <p>Rs.{getTotalCartWithCustomization()}</p>
//             </div>
//             <hr />
//             <div className="cartitems-total-item">
//               <p>Shipping Fee</p>
//               <p>Free</p>
//             </div>
//             <hr />
//             <div className="cartitems-total-item">
//               <h3>Total</h3>
//               <h3>Rs.{getTotalCartWithCustomization()}</h3>
//             </div>
//           </div>
//           <button>PROCEED TO CHECKOUT</button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CartItems;
