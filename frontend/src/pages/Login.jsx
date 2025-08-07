import React, { useEffect, useState } from "react";
import "./Auth.css";
import logo from "/src/assets/logo.jpg";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "/src/redux/userSlice";
import toast from "react-hot-toast";
import axios from "axios";


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isDisabled, setIsdisabled] = useState(true);

  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (email && password) {
      setIsdisabled(false);
    } else {
      setIsdisabled(true);
    }
  }, [email, password]);

 useEffect(() => {
    if (user) {
      // console.log("This is working");
      if (localStorage.getItem("token")) {
        getUser();
      }
    }
  }, []);

  const getUser = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/admin/profile`,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
          withCredentials: true,
        }
      );
      // console.log(response);
      // console.log(response.data.message);
      // console.log(response.data.user);
      if (response?.data?.user) {
        // console.log(response.data.user)
        dispatch(setUser(response.data.user));
      } else {
        localStorage.clear();
        navigate("/");
      }
    } catch (error) {
      localStorage.clear();
      console.log(error);
      navigate("/");
    }
  };

  const handleLogin = async (e) => {
    localStorage.clear();
    e.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/admin/login`,
        {
          email: email,
          password: password,
        }
      );
      if (response.status === 200) {
        const { token } = response.data;
        toast.success(response.data.message);
        localStorage.setItem("token", token); // Store user data
        getUser();
        navigate("/dashboard");
      }
    } catch (error) {
      toast.error("Something went wrong");
      console.log(error);
      
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
                Email Address<span className="form-star">*</span>
              </label>
              <input
                type="text"
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
              <span className="grey-text">Forget Password?</span>
              <button
                onClick={handleLogin}
                className={`${isDisabled ? `disabled-btn` : `submit-btn`}`}
                disabled={isDisabled}
              >
                Login
              </button>
              <p className="routing-text grey-text">
                Doesn't have an account?{" "}
                <Link to="/register" className="routing-highlight">
                  Register
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
