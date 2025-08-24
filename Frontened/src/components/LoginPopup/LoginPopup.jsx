import React, { useState } from "react";
import "./LoginPopup.css";
import { assets } from "../../assets/assets";
import { useNavigate } from "react-router-dom";

const LoginPopup = ({ setShowLogin, handleLoginSuccess  }) => {
  const [currState, setCurrState] = useState("Login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [checkboxMarked, setCheckboxMarked] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
  e.preventDefault();

  if (currState === "Sign Up") {
    try {
      const res = await fetch(`${import.meta.env.VITE_BASE_URL}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, checkboxMarked }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "Something went wrong");
      } else {
        alert(data.message || "User registered successfully!");
        setCurrState("Login");
      }
    } catch (err) {
      alert(err);
    }
  } else {
    try {
      const res = await fetch(`${import.meta.env.VITE_BASE_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "Something went wrong");
      } else {
        alert(data.message || "User Login successfully!");
        alert(JSON.stringify(data,null,2));
        console.log(JSON.stringify(data,null,2));
        setShowLogin(false);
        handleLoginSuccess(data);
        navigate("/");
      }
    } catch (err) {
      alert(err);
    }
  }
};

  return (
    <div className="login-popup">
      <form className="login-popup-container" onSubmit={handleSubmit}>
        <div className="login-popup-title">
          <h2>{currState}</h2>
          <img
            onClick={() => setShowLogin(false)}
            src={assets.cross_icon}
            alt=""
          />
        </div>
        <div className="login-popup-inputs">
          {currState !== "Login" && (
            <input
              type="text"
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          )}
          <input
            type="email"
            placeholder="Your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">
          {currState === "Sign Up" ? "Create account" : "Login"}
        </button>
        {currState !== "Login" && (
          <div className="login-popup-condition">
            <input
              type="checkbox"
              checked={checkboxMarked}
              onChange={(e) => setCheckboxMarked(e.target.checked)}
              required
            />
            <p>By continuing, I agree to the terms of use & privacy policy.</p>
          </div>
        )}
        {currState === "Login" ? (
          <p>
            Create a new account?{" "}
            <span onClick={() => setCurrState("Sign Up")}>Click here</span>
          </p>
        ) : (
          <p>
            Already have an account?{" "}
            <span onClick={() => setCurrState("Login")}>Login here</span>
          </p>
        )}
      </form>
    </div>
  );
};

export default LoginPopup;
