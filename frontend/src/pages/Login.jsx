import React, { useEffect, useState } from "react";
import "./Auth.css";
import logo from "/src/assets/logo.jpg";
import { Link } from "react-router-dom";

const Login = () => {
  const [loginform, setLoginform] = useState(false);
  const [isDisabled, setIsdisabled] = useState(true);

  return (
    <div className="auth-wrapper">
      <div className="logo-box">
        <img src={logo} alt="Logo" className="logo" />
        <span>PSQUARE</span>
      </div>
      <div className="auth-box">
        <div className="slides-container"></div>
        <div className="auth-container">
          <div className="form-wrapper">
            <p className="heading">Welcome to Dashboard</p>
              <form className="form">
                <label className="form-label">
                  Email Address<span className="form-star">*</span>
                </label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="Email Address"
                />
                <label className="form-label">
                  Password<span className="form-star">*</span>
                </label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="Password"
                />
                <span className="grey-text">Forget Password?</span>
                <button className={`${isDisabled?`disabled-btn`:`submit-btn`}`} disabled={isDisabled}>
                  Login
                </button>
                <p className="routing-text grey-text">
                  Doesn't have an account?{" "}
                  <Link to='/register' className="routing-highlight">Register</Link>
                </p>
              </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
