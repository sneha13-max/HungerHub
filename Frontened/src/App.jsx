import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar/Navbar";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Cart from "./pages/Cart/Cart";
import PlaceOrder from "./pages/PlaceOrder/PlaceOrder";
import Footer from "./components/Footer/Footer";
import LoginPopup from "./components/LoginPopup/LoginPopup";

const App = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const [data, setData] = useState("aaaa");
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    const savedLogin = localStorage.getItem("isLoggedIn");
    const savedName = localStorage.getItem("userName");
    if (savedLogin === "true" && savedName) {
      setIsLoggedIn(true);
      setUserName(savedName);
    }
  }, []);

  const handleLoginSuccess = (data) => {
    setData(data);
    const name = data?.name || "name";
    const email = data?.email || "example@domain.com";
    setIsLoggedIn(true);
    setShowLogin(false);
    setUserName(name);
    setUserEmail(email);
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("userName", name);
    localStorage.setItem("userEmail", email);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserName("");
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userName");
    localStorage.removeItem("userEmail");
  };

  return (
    <>
      {showLogin && (
        <LoginPopup
          setShowLogin={setShowLogin}
          handleLoginSuccess={handleLoginSuccess}
        />
      )}
      <div className="app">
        <Navbar
          setShowLogin={setShowLogin}
          isLoggedIn={isLoggedIn}
          userName={userName}
          handleLogout={handleLogout}
        />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart isLoggedIn={isLoggedIn} />} />
          <Route
            path="/order"
            element={<PlaceOrder name={userName} email={userEmail} />}
          />
        </Routes>
      </div>
      <Footer />
    </>
  );
};

export default App;
