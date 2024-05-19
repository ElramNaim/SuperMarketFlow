import React, { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "./LogoCheckOut.png";
import back from "./back.mp4";
import "./SignupPage.css"; // קובץ ה-css המכיל את עיצוב הדף

const SignupPage = ({ handleRegister }) => {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    // עריכת בדיקת תקינות שם משתמש וסיסמה (למשל, אורך מינימלי, חוקיות תווים, התאמה בין סיסמאות וכו')
    if (user === "" || password === "" || confirmPassword === "") {
      setError("שם משתמש, סיסמה ואישור סיסמה הם שדות חובה");
    } else if (password !== confirmPassword) {
      setError("סיסמה ואישור סיסמה אינם תואמים");
    } else {
      setSuccess("!נרשמת בהצלחה");
      // קריאה ל-API לבדיקת הרשמה
      // אם הרשמה מוצלחת, קריאה לפונקציה handleSignup שקיבלנו כפרופס ומעדכנת את המצב isLoggedIn ל-true
      handleRegister(user, password);
    }
  };

  return (
    <div className="page">
      <video loop autoPlay muted className="bg-video">
        <source src={back} type="video/mp4" />
      </video>
      <form className="signup-page" onSubmit={handleSubmit}>
        <img src={Logo} alt="Logo" />
        <div className="titl">
          <h1>דף הרשמה </h1>
        </div>
        <div className="form-group">
          <label htmlFor="username">שם משתמש:</label>
          <input
            type="text"
            id="username"
            value={user}
            onChange={(e) => setUser(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">סיסמה:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="confirmPassword">אישור סיסמה:</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <div className="error">{error && <p>{error}</p>}</div>
        <div className="success">
          {success && (
            <p>
              {success}
              <nav>
                <Link to="/login">התחבר עכשיו</Link>
              </nav>
            </p>
          )}
        </div>
        <div className="button-signup">
          <button type="submit" className="btn">
            הרשם
          </button>
        </div>
      </form>
    </div>

    // <div className="page">
    //   \
    //   <form className="signup-page" onSubmit={handleSubmit}>
    //     <img src={Logo} alt="Logo" />
    //     <div className="titl">
    //       <h1>דף הרשמה</h1>
    //     </div>
    // <div className="form-group">
    //   <label htmlFor="username">שם משתמש:</label>
    //   <input
    //     type="text"
    //     id="username"
    //     value={user}
    //     onChange={(e) => setUser(e.target.value)}
    //   />
    // </div>
    // <div className="form-group">
    //   <label htmlFor="password">סיסמה:</label>
    //   <input
    //     type="password"
    //     id="password"
    //     value={password}
    //     onChange={(e) => setPassword(e.target.value)}
    //   />
    // </div>
    // <div className="form-group">
    //   <label htmlFor="confirmPassword">אישור סיסמה:</label>
    //   <input
    //     type="password"
    //     id="confirmPassword"
    //     value={confirmPassword}
    //     onChange={(e) => setConfirmPassword(e.target.value)}
    //   />
    // </div>
    //     {error && <p className="error">{error}</p>}
    // {success && (
    //   <p className="setSuccess">
    //     {success}
    //     <nav>
    //       <Link to="/login">התחבר עכשיו</Link>
    //     </nav>
    //   </p>
    // )}
    // <button type="submit" className="btn">
    //   הרשם
    // </button>
    //   </form>
    // </div>
  );
};

export default SignupPage;
