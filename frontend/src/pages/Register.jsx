import React, { useEffect, useState } from "react";
import "./Auth.css";
import logo from "/src/assets/logo.jpg";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Loading from "../components/Loading";
import { useDispatch } from "react-redux";
import axios from "axios";

const Register = () => {
  const [isDisabled, setIsdisabled] = useState(true);

  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("");

  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    if (fullname && email && password && cpassword && password === cpassword) {
      setIsdisabled(false);
    } else {
      setIsdisabled(true);
    }
  }, [fullname, email, password, cpassword]);

  const handleRegister = async (e) => {
    e.preventDefault();
    if (fullname && email && password && cpassword && password === cpassword) {
      // set register data in user register state
      // console.log(registerData)
      localStorage.clear("token");
      try {
        const resp = await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/admin/register`,
          {
            name: fullname,
            email: email,
            password: password,
          }
        );
        if (resp.status === 201) {
          toast.success(resp.data.message);
          navigate("/");
        }
      } catch (error) {
        //console.error('There was an error saving the form data!', error.response.data.message);
        toast.error(error.response);
        console.log(error);
        setLoading(false);
      }
    }
  };

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
                Full Name<span className="form-star">*</span>
              </label>
              <input
                type="text"
                className="form-input"
                placeholder="Full Name"
                value={fullname}
                onChange={(e) => setFullname(e.target.value)}
              />
              <label className="form-label">
                Email Address<span className="form-star">*</span>
              </label>
              <input
                type="email"
                className="form-input"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <label className="form-label">
                Password<span className="form-star">*</span>
              </label>
              <input
                type="text"
                className="form-input"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <label className="form-label">
                Confirm Password<span className="form-star">*</span>
              </label>
              <input
                type="text"
                className="form-input"
                placeholder="Confirm Password"
                value={cpassword}
                onChange={(e) => setCpassword(e.target.value)}
              />
              <span className="grey-text">Forget Password?</span>
              <button
                className={`${isDisabled ? `disabled-btn` : `submit-btn`}`}
                disabled={isDisabled}
                onClick={handleRegister}
              >
                Register
              </button>
              <p className="routing-text grey-text">
                Already have an account?{" "}
                <Link to="/" className="routing-highlight">
                  Login
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
