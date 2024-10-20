import { useEffect, useState } from "react";
import React, { createContext } from "react";
// import all_product from "../Components/Assets/Frontend_Assets/all_product";

export const ShopContext = createContext(null);

const getDefaultCart = () => {
  let cart = {};
  for (let index = 0; index < 300 + 1; index++) {
    cart[index] = 0;
  }
  return cart;
};

const ShopContextProvider = (props) => {
  const [all_product, setAll_product] = useState([]);
  const [cartItems, setCartItems] = useState(getDefaultCart());

  useEffect(() => {
    fetch("http://localhost:4000/allproducts")
      .then((response) => response.json())
      .then((data) => setAll_product(data));

    if (localStorage.getItem("auth-token")) {
      fetch("http://localhost:4000/getcart", {
        method: "POST",
        headers: {
          Accept: "application/form-data",
          "auth-token": `${localStorage.getItem("auth-token")}`,
          "Content-Type": "application/json",
        },
        body: "",
      })
        .then((response) => response.json())
        .then((data) => setCartItems(data));
    }
  }, []);

  // const addToCart = (itemId) => {
  //   setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
  //   if (localStorage.getItem("auth-token")) {
  //     fetch("http://localhost:4000/addtocart", {
  //       method: "POST",
  //       headers: {
  //         Accept: "application/form-data",
  //         "auth-token": `${localStorage.getItem("auth-token")}`,
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ itemId: itemId }),
  //     })
  //       .then((response) => response.json())
  //       .then((data) => console.log(data));
  //   }
  // };
  const addToCart = (itemId, customization, size) => {
    setCartItems((prev) => {
      const updatedCart = { ...prev };

      // Initialize cart data for the item if not present
      if (!updatedCart[itemId]) {
        updatedCart[itemId] = [0, []];
      }

      // Increase quantity
      updatedCart[itemId][0] += 1;

      // Add customization
      if (customization && size) {
        updatedCart[itemId][1].push([customization, size]);
      }

      return updatedCart;
    });

    if (localStorage.getItem("auth-token")) {
      fetch("http://localhost:4000/addtocart", {
        method: "POST",
        headers: {
          Accept: "application/form-data",
          "auth-token": `${localStorage.getItem("auth-token")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ itemId: itemId, customization, size }),
      })
        .then((response) => response.json())
        .then((data) => console.log(data));
    }
  };

  // const removeFromCart = (itemId) => {
  //   setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
  //   if (localStorage.getItem("auth-token")) {
  //     fetch("http://localhost:4000/removefromcart", {
  //       method: "POST",
  //       headers: {
  //         Accept: "application/form-data",
  //         "auth-token": `${localStorage.getItem("auth-token")}`,
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ itemId: itemId }),
  //     })
  //       .then((response) => response.json())
  //       .then((data) => console.log(data));
  //   }
  // };

  const removeFromCart = (itemId, customName, customSize) => {
    // Fetch API call to remove item from the cart
    fetch("http://localhost:4000/removefromcart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("auth-token"),
      },
      body: JSON.stringify({
        itemId: itemId,
        customName: customName,
        customSize: customSize,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json(); // This will work correctly now
      })
      .then((data) => {
        console.log(data.message); // Access the message from the response
        // Update the state based on the successful removal
        setCartItems((prevCart) => {
          const currentCustomizations = prevCart[itemId][1];
          const updatedCustomizations = currentCustomizations.filter(
            ([name, size]) => !(name === customName && size === customSize)
          );

          const updatedQuantity = updatedCustomizations.length;

          if (updatedQuantity === 0) {
            const { [itemId]: _, ...rest } = prevCart; // Remove the item if no customizations left
            return rest;
          }

          return {
            ...prevCart,
            [itemId]: [updatedQuantity, updatedCustomizations],
          };
        });
      })
      .catch((error) => console.error("Error:", error));
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;

    for (const item in cartItems) {
      if (cartItems[item] && cartItems[item][0] > 0) {
        // Find the product information for the current item
        let itemInfo = all_product.find(
          (product) => product.id === Number(item)
        );

        // Ensure that itemInfo and itemPrice are valid
        if (itemInfo && itemInfo.new_price !== undefined) {
          let itemPrice = itemInfo.new_price;

          // Get customizations for the current item
          const customizations = cartItems[item][1];

          // Loop through each customization for this product
          customizations.forEach(([name, size]) => {
            // Determine if this specific customization should have the extra charge
            const hasCustomizations = name !== "-";

            // Add the base price; include the customization charge if applicable
            totalAmount += itemPrice + (hasCustomizations ? 300 : 0);
          });
        }
      }
    }

    return totalAmount;
  };

  // const getTotalCartItems = () => {
  //   let totalItem = 0;
  //   for (const item in cartItems) {
  //     if (cartItems[item] > 0) {
  //       totalItem += cartItems[item];
  //     }
  //   }
  //   return totalItem;
  // };

  // const getTotalCartAmount = () => {
  //   let totalAmount = 0;
  //   for (const item in cartItems) {
  //     if (cartItems[item] && cartItems[item][0] > 0) {
  //       // Check if item exists and quantity is greater than 0
  //       let itemInfo = all_product.find(
  //         (product) => product.id === Number(item)
  //       );

  //       // Base price for this item
  //       let itemPrice = itemInfo.new_price;

  //       // Check customizations
  //       const customizations = cartItems[item][1];

  //       // Determine if customization charge should be added
  //       const hasCustomizations = customizations.some(
  //         ([name, size]) => name !== "-" // Check if any customization name is not "-"
  //       );

  //       // Add the base price; include customization charge if applicable
  //       totalAmount +=
  //         (itemPrice + (hasCustomizations ? 300 : 0)) * cartItems[item][0];
  //     }
  //   }
  //   return totalAmount;
  // };

  const getTotalCartItems = () => {
    let totalItem = 0;
    for (const item in cartItems) {
      if (cartItems[item] && cartItems[item][0] > 0) {
        totalItem += cartItems[item][0]; // Add the quantity of this item
      }
    }
    return totalItem;
  };

  const contextValue = {
    getTotalCartItems,
    getTotalCartAmount,
    all_product,
    cartItems,
    addToCart,
    removeFromCart,
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;

// import { useEffect, useState } from "react";
// import React, { createContext } from "react";
// // import all_product from "../Components/Assets/Frontend_Assets/all_product";

// export const ShopContext = createContext(null);

// const getDefaultCart = () => {
//   let cart = {};
//   for (let index = 0; index < 300 + 1; index++) {
//     cart[index] = {
//       quantity: 0,
//       customization: null, // Default is no customization
//     };
//   }
//   return cart;
// };

// const ShopContextProvider = (props) => {
//   const [all_product, setAll_product] = useState([]);
//   const [cartItems, setCartItems] = useState(getDefaultCart());

// useEffect(() => {
//   fetch("http://localhost:4000/allproducts")
//     .then((response) => response.json())
//     .then((data) => setAll_product(data));

//   if (localStorage.getItem("auth-token")) {
//     fetch("http://localhost:4000/getcart", {
//       method: "POST",
//       headers: {
//         Accept: "application/form-data",
//         "auth-token": `${localStorage.getItem("auth-token")}`,
//         "Content-Type": "application/json",
//       },
//       body: "",
//     })
//       .then((response) => response.json())
//       .then((data) => setCartItems(data));
//   }
// }, []);

//   // Updated addToCart to handle customization
//   const addToCart = (itemId, customization = null) => {
//     setCartItems((prev) => ({
//       ...prev,
//       [itemId]: {
//         quantity: prev[itemId].quantity + 1,
//         customization: customization || prev[itemId].customization,
//       },
//     }));
//     if (localStorage.getItem("auth-token")) {
//       fetch("http://localhost:4000/addtocart", {
//         method: "POST",
//         headers: {
//           Accept: "application/form-data",
//           "auth-token": `${localStorage.getItem("auth-token")}`,
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ itemId: itemId }),
//       })
//         .then((response) => response.json())
//         .then((data) => console.log(data));
//     }
//   };

//   const removeFromCart = (itemId) => {
//     setCartItems((prev) => ({
//       ...prev,
//       [itemId]: {
//         ...prev[itemId],
//         quantity: prev[itemId].quantity - 1,
//       },
//     }));
// if (localStorage.getItem("auth-token")) {
//   fetch("http://localhost:4000/removefromcart", {
//     method: "POST",
//     headers: {
//       Accept: "application/form-data",
//       "auth-token": `${localStorage.getItem("auth-token")}`,
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({ itemId: itemId }),
//   })
//     .then((response) => response.json())
//     .then((data) => console.log(data));
// }
//   };

//   // Updated getTotalCartAmount to handle customization charges
//   const getTotalCartAmount = () => {
//     let totalAmount = 0;
//     for (const item in cartItems) {
//       if (cartItems[item].quantity > 0) {
//         let itemInfo = all_product.find(
//           (product) => product.id === Number(item)
//         );
//         const basePrice = itemInfo.new_price * cartItems[item].quantity;
//         const customizationCharge = cartItems[item].customization ? 300 : 0;
//         totalAmount += basePrice + customizationCharge; // Add customization fee if exists
//       }
//     }
//     return totalAmount;
//   };

//   const getTotalCartItems = () => {
//     let totalItem = 0;
//     for (const item in cartItems) {
//       if (cartItems[item].quantity > 0) {
//         totalItem += cartItems[item].quantity;
//       }
//     }
//     return totalItem;
//   };

//   const contextValue = {
//     getTotalCartItems,
//     getTotalCartAmount,
//     all_product,
//     cartItems,
//     addToCart,
//     removeFromCart,
//   };

//   return (
//     <ShopContext.Provider value={contextValue}>
//       {props.children}
//     </ShopContext.Provider>
//   );
// };

// export default ShopContextProvider;
