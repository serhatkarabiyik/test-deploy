import React, { useState } from "react";
import Timer from "../components/Timer";
import { Link, useNavigate } from "react-router-dom";

const HomePage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));
  const [userId, setUserId] = useState(localStorage.getItem("userId"));
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/");
  };

  return (
    <div>
      {isLoggedIn ? (
        <div>
          <h1>Welcome to the Timer App</h1>
          <button onClick={handleLogout}>Logout</button>
          <Timer userId={userId} />
        </div>
      ) : (
        <div>
          <h1 data-testid="login-register-header">Please Login or Register</h1>
          <Link to="/login" data-testid="login-link">
            Login
          </Link>
          <br />
          <Link to="/register" data-testid="register-link">
            Register
          </Link>
        </div>
      )}
    </div>
  );
};

export default HomePage;
