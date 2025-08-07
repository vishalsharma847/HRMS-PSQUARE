import React, { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setUser } from "../redux/userSlice";
import toast from "react-hot-toast";

function PublicRoute(props) {
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

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
      console.log(response);

      if (response?.data?.user) {
        // console.log(response.data.user)
        dispatch(setUser(response?.data?.user));
      } else {
        console.log("Set user not worked");
        localStorage.clear();
        navigate("/");
      }
    } catch (error) {
      console.log("Get user failed");

      localStorage.clear();
      console.log(error);
      navigate("/");
    }
  };

  useEffect(() => {
    if (!user && localStorage.getItem("token")) {
      getUser();
    }
  }, []);

  useEffect(() => {
    if (user && localStorage.getItem("token")) {
      navigate("/dashboard");
    }
  }, [user]);

  return props.children;
}

export default PublicRoute;
