import React, { useState } from "react";
import Logo from "./LogoCheckOut.png";
import back from "./back.mp4";

import { Link } from "react-router-dom";
import "./LoginPage.css";

const LoginPage = ({ handleLogin }) => {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (user === "" || password === "") {
      setError("שם משתמש וסיסמה הם שדות חובה");
    } else {
      handleLogin(user, password);
    }
  };

  return (
    <div className="page">
      <video loop autoPlay muted className="bg-video">
        <source src={back} type="video/mp4" />
      </video>
      <form className="login-page" onSubmit={handleSubmit}>
        <img src={Logo} alt="Logo" />
        <div className="titl">
          <h1>דף כניסה</h1>
        </div>
        <div className="input-username">
          <label htmlFor="username">: שם משתמש</label>
          <input
            type="text"
            id="username"
            value={user}
            onChange={(e) => setUser(e.target.value)}
          />
        </div>
        <div className="input-password">
          <label htmlFor="password">: סיסמא</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="error">{error && <p className="error">{error}</p>}</div>
        <div className="button-loding">
          <button type="submit" className="btn">
            התחבר
          </button>
        </div>
        <nav className="button-signup">
          <Link to="/signup">הירשם עכשיו</Link>
        </nav>
      </form>
    </div>
    // <div className="login-page">
    //   <h2>דף כניסה</h2>

    //   <form onSubmit={handleSubmit}>
    //     <div className="username">
    //       <label htmlFor="username">שם משתמש:</label>
    //       <input
    //         type="text"
    //         id="username"
    //         value={user}
    //         onChange={(e) => setUser(e.target.value)}
    //       />
    //     </div>
    //     <div className="password">
    // <label htmlFor="password">סיסמה:</label>
    // <input
    //   type="password"
    //   id="password"
    //   value={password}
    //   onChange={(e) => setPassword(e.target.value)}
    // />
    //     </div>
    //     <div className="error">{error && <p className="error">{error}</p>}</div>

    // <button type="submit" className="btn">
    //   התחבר
    // </button>
    //     <nav>
    //       <Link to="/signup">הירשם עכשיו</Link>
    //     </nav>
    //   </form>
    // </div>
  );
};

export default LoginPage;
