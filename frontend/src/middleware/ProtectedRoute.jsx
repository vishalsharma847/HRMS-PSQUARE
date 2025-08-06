import React, { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setUser } from "../redux/userSlice";
import { hideLoading, showLoading } from "../redux/alertsSlice";
import toast from "react-hot-toast";

function ProtectedRoute(props) {
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const getUser = async () => {
    try {
      dispatch(showLoading());
      
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/user/profile`,
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
      dispatch(hideLoading());
      console.log(response);
      
      if (response?.data?.user) {
        // console.log(response.data.user)
        dispatch(setUser(response?.data?.user));
      } else {
        console.log('Set user not worked');
        localStorage.clear();
        navigate("/");
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log('Get user failed');
      
      localStorage.clear();
      console.log(error);
      navigate("/");
    }
  };

  useEffect(() => {
    if (!user) {
      // console.log("This is working");
      if (localStorage.getItem("token")) {
        getUser();
      }
    }
  }, []);
  
  if (localStorage.getItem("token")) {
    return props.children;
  }else{
    toast.error("Login first to access your dashboard or get quotation")
    return <Navigate to="/login" />
  }
}

export default ProtectedRoute;
