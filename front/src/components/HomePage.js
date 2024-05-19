// import React from "react";
// import { Link } from "react-router-dom";
// import "./HomePage.css";
// const HomePage = ({ user }) => {
//   return (
//     <div>
//       <h1> Hello {user}</h1>
//       <h4> ? מה תרצה לעשות</h4>
//       <div className="choice">
//         <nav>
//           <Link to="/ShoppingList">ShoppingList</Link>
//         </nav>
//         <nav>
//           <Link to="/LoadTableData">LoadTableData</Link>
//         </nav>
//       </div>
//     </div>
//   );
// };

// export default HomePage;
import React from "react";
import { Link } from "react-router-dom";
import "./HomePage.css";

const HomePage = ({ user }) => {
  return (
    <div className="page">
      <div className="home-page">
        <h1 className="home-page__title">Hello {user}</h1>
        <h4 className="home-page__subtitle">? מה תרצה לעשות</h4>
        <div className="home-page__choice">
          <nav className="home-page__nav">
            <Link to="/ShoppingList" className="home-page__link">
              לרשימת שלי
            </Link>
          </nav>
          <nav className="home-page__nav">
            <Link to="/LoadTableData" className="home-page__link">
              עומסים
            </Link>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
