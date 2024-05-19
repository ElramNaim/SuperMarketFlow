import React, { useState } from "react";
import productsData from "../products.json";
import { Link } from "react-router-dom";

import "./ShoppingList.css";

function ShoppingList() {
  const [shoppingList, setShoppingList] = useState([]);

  const handleAddToShoppingList = (product) => {
    const existingProduct = shoppingList.find((p) => p.id === product.id);
    if (existingProduct) {
      const updatedList = shoppingList.map((p) =>
        p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p
      );
      setShoppingList(updatedList);
    } else {
      const newProduct = { ...product, quantity: 1 };
      setShoppingList([...shoppingList, newProduct]);
    }
  };

  const handleRemoveFromShoppingList = (product) => {
    const existingProduct = shoppingList.find((p) => p.id === product.id);
    if (existingProduct && existingProduct.quantity > 1) {
      const updatedList = shoppingList.map((p) =>
        p.id === product.id ? { ...p, quantity: p.quantity - 1 } : p
      );
      setShoppingList(updatedList);
    } else {
      const filteredList = shoppingList.filter((p) => p.id !== product.id);
      setShoppingList(filteredList);
    }
  };

  const getFilteredProducts = (searchTerm) => {
    // Filter the list of products based on the search term
    const filteredProducts = productsData.filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Only return the filtered products if a search term has been entered
    return searchTerm.length > 0 ? filteredProducts : [];
  };

  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="container">
      <div className="search-container">
        <input
          type="text"
          className="search-bar"
          placeholder="Search for a product to add to your shopping list"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="product-list-container">
        {/* <h2 className="product-list-title">Product List</h2> */}
        <div className="product-list">
          {getFilteredProducts(searchTerm).map((product) => (
            <div className="product" key={product.id}>
              <p className="product-name">{product.name}</p>
              <button
                className="add-to-cart"
                onClick={() => handleAddToShoppingList(product)}
              >
                Add to Shopping List
              </button>
            </div>
          ))}
        </div>
      </div>
      {shoppingList.length > 0 && (
        <div className="shopping-list-container">
          <h2 className="shopping-list-title">My Shopping List</h2>
          {/* <div className="shopping-list">
            {shoppingList.map((product) => (
              <div className="shopping-list-item" key={product.id}>
                <span className="product-name">{product.name}</span>
                <span className="product-quantity">x{product.quantity}</span>
                <button
                  className="remove-from-cart"
                  onClick={() => handleRemoveFromShoppingList(product)}
                >
                  Remove
                </button>
                <button className="Missing-item">Missing item</button>
              </div>
            ))}
          </div> */}
          <div className="shopping-list">
            {shoppingList.map((product) => (
              <div className="shopping-list-item" key={product.id}>
                <div
                  className={`product-mark ${product.checked ? "checked" : ""}`}
                  onClick={() => {
                    const updatedList = shoppingList.map((p) =>
                      p.id === product.id ? { ...p, checked: !p.checked } : p
                    );
                    setShoppingList(updatedList);
                  }}
                >
                  {product.checked && (
                    <span className="check-mark">&#10003;</span>
                  )}
                </div>
                <div className="product-details">
                  <p
                    className={`product-name ${
                      product.checked ? "line-through" : ""
                    }`}
                  >
                    {product.name}
                  </p>
                  <span className="product-quantity">x{product.quantity}</span>
                </div>
                <div className="product-actions">
                  <button
                    className="remove-from-cart"
                    onClick={() => handleRemoveFromShoppingList(product)}
                  >
                    Remove
                  </button>
                  <button className="Missing-item">Missing item</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      <nav className="back">
        <Link to="/">back Home </Link>
      </nav>
    </div>
  );
}

export default ShoppingList;

// import React, { useState } from "react";
// import productsData from "../products.json";
// import "./ShoppingList.css";

// function ShoppingList() {
//   const [shoppingList, setShoppingList] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");

//   function handleSearchTermChange(event) {
//     setSearchTerm(event.target.value);
//   }

//   function handleAddToShoppingList(product) {
//     const existingProduct = shoppingList.find((p) => p.id === product.id);
//     if (existingProduct) {
//       // If the product already exists in the shopping list, increase its quantity by 1
//       const updatedShoppingList = shoppingList.map((p) =>
//         p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p
//       );
//       setShoppingList(updatedShoppingList);
//     } else {
//       // If the product does not exist in the shopping list, add it with a quantity of 1
//       const newProduct = { ...product, quantity: 1 };
//       setShoppingList([...shoppingList, newProduct]);
//     }
//   }

//   function getFilteredProducts() {
//     // Filter the list of products based on the search term
//     const filteredProducts = productsData.filter((product) =>
//       product.name.toLowerCase().includes(searchTerm.toLowerCase())
//     );

//     // Only return the filtered products if a search term has been entered
//     return searchTerm.length > 0 ? filteredProducts : [];
//   }

//   return (
//     <div className="container">
//       <h1 className="title">Shopping List</h1>
//       <input
//         type="text"
//         className="search-bar"
//         placeholder="Search for a product to add to your shopping list"
//         value={searchTerm}
//         onChange={handleSearchTermChange}
//       />

//       <div className="product-list">
//         {getFilteredProducts().map((product) => (
//           <div className="product" key={product.id}>
//             <p className="product-name">{product.name}</p>
//             <button
//               className="add-to-cart"
//               onClick={() => handleAddToShoppingList(product)}
//             >
//               Add to Shopping List
//             </button>
//           </div>
//         ))}
//       </div>

//       {shoppingList.length > 0 && (
//         <div>
//           <h2 className="list-title">My Shopping List</h2>
//           <ul className="list">
//             {shoppingList.map((product) => (
//               <li className="list-item" key={product.id}>
//                 {product.name} x{product.quantity}
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}
//     </div>
//   );
// }

// export default ShoppingList;
///aaaa
// import React, { useState } from "react";
// import productsData from "../products.json";
// import "./ShoppingList.css";

// function ShoppingList() {
//   const [shoppingList, setShoppingList] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");

//   function handleSearchTermChange(event) {
//     setSearchTerm(event.target.value);
//   }

//   function handleAddToShoppingList(product) {
//     setShoppingList([...shoppingList, product]);
//   }

//   function handleRemoveFromShoppingList(product) {
//     const updatedList = shoppingList.filter((item) => item.id !== product.id);
//     setShoppingList(updatedList);
//   }

//   function getFilteredProducts() {
//     // Filter the list of products based on the search term
//     const filteredProducts = productsData.filter((product) =>
//       product.name.toLowerCase().includes(searchTerm.toLowerCase())
//     );

//     // Only return the filtered products if a search term has been entered
//     return searchTerm.length > 0 ? filteredProducts : [];
//   }

//   return (
//     <div className="container">
//       <h1 className="title">Shopping List</h1>
//       <input
//         type="text"
//         className="search-bar"
//         placeholder="Search for a product to add to your shopping list"
//         value={searchTerm}
//         onChange={handleSearchTermChange}
//       />

//       <div className="product-list">
//         {getFilteredProducts().map((product) => (
//           <div className="product" key={product.id}>
//             <p className="product-name">{product.name}</p>
//             <button
//               className="add-to-cart"
//               onClick={() => handleAddToShoppingList(product)}
//             >
//               Add to Shopping List
//             </button>
//             <button
//               className="remove-from-cart"
//               onClick={() => handleRemoveFromShoppingList(product)}
//             >
//               Remove from Shopping List
//             </button>
//           </div>
//         ))}
//       </div>

//       {shoppingList.length > 0 && (
//         <div>
//           <h2 className="list-title">My Shopping List</h2>
//           <ul className="list">
//             {shoppingList.map((product) => (
//               <li className="list-item" key={product.id}>
//                 {product.name}
//                 <button
//                   className="remove-from-cart"
//                   onClick={() => handleRemoveFromShoppingList(product)}
//                 >
//                   Remove
//                 </button>
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}
//     </div>
//   );
// }

// export default ShoppingList;
