import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import LoginPage from "./components/LoginPage";
import SignupPage from "./components/SignupPage";
import HomePage from "./components/HomePage";
import NavBar from "./components/NavBar";
import ShoppingList from "./components/SoppingList";
import LoadTableData from "./components/LoadTableData";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [accessToken, setAccessToken] = useState("");

  const handleLogin = async (user, password) => {
    try {
      const response = await fetch("/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: user, password }),
      });

      if (response.ok) {
        const data = await response.json();
        setAccessToken(data.accessToken);
        setIsLoggedIn(true);
        setUser(user);
      } else {
        throw new Error("Failed to login");
      }
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setAccessToken("");
    setUser("");
    setPassword("");
  };

  const handleRegister = async (user, password) => {
    try {
      const response = await fetch("/createUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: user, password }),
      });
      if (response.ok) {
        console.log("User created successfully");
      } else {
        console.log("Failed to create user");
      }
    } catch (error) {
      console.error("Error registering:", error);
    }
  };

  return (
    <Router>
      <div className="NavBar">
        <NavBar isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
      </div>

      <Routes>
        <Route
          path="/login"
          element={
            !isLoggedIn ? (
              <LoginPage handleLogin={handleLogin} />
            ) : (
              <Navigate to="/HomePage" replace />
            )
          }
        />
        <Route
          path="/signup"
          element={<SignupPage handleRegister={handleRegister} />}
        />
        <Route
          path="/HomePage"
          element={
            isLoggedIn ? (
              <HomePage
                user={user}
                password={password}
                accessToken={accessToken}
                handleLogout={handleLogout}
              />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/"
          element={
            isLoggedIn ? (
              <Navigate to="/HomePage" replace />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/ShoppingList"
          element={isLoggedIn ? <ShoppingList /> : <Navigate to="/login" />}
        />

        <Route
          path="/LoadTableData"
          element={isLoggedIn ? <LoadTableData /> : <Navigate to="/login" />}
        />
      </Routes>
    </Router>
  );
};

export default App;
