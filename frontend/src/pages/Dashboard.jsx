import React, { useState } from "react";
import "./Dashboard.css";
import logo from "/src/assets/logo.jpg";
import { IoMdSearch } from "react-icons/io";
import { IoPersonAdd } from "react-icons/io5";
import { BsPeopleFill } from "react-icons/bs";
import { BsBarChartFill } from "react-icons/bs";
import { BsStars } from "react-icons/bs";
import { TbLogout } from "react-icons/tb";
import Candidates from "./dashboard-sections/Candidates";
import Employees from "./dashboard-sections/Employees";
import Attendance from "./dashboard-sections/Attendance";
import Leaves from "./dashboard-sections/Leaves";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";



const Dashboard = () => {

const [currentTab, setCurrenttab] = useState(() => {
  return localStorage.getItem("activeTab") || "Candidates";
});

const navigate = useNavigate();

const handlelogout = () =>{
  localStorage.clear();
  navigate('/');
  toast.success('Logged out successfully')
  
}

const handleTabChange = (tabName) => {
  setCurrenttab(tabName);
  localStorage.setItem("activeTab", tabName);
};

const rendersection = () =>{
  switch(currentTab){
    case 'Candidates':
      return <Candidates/>
    case 'Employees':
      return <Employees/>
    case 'Attendance':
      return <Attendance/>
    case 'Leaves':
      return <Leaves/>

    default:
      return <Candidates/>
  }
}

  return (
    <div className="dashboard-container">
      <div className="side-bar">
        <div className="logo-box">
          <img src={logo} alt="Logo" className="logo" />
          <span>PSQUARE</span>
        </div>
        <div className="search-box margin-y">
          <IoMdSearch className="icons" />
          <input
            type="text"
            className="transparent-input"
            placeholder="Search"
          />
        </div>
        <p className="grey-text">Recruitment</p>
        <button onClick={()=>handleTabChange('Candidates')} className={`${currentTab==='Candidates'?`side-bar-btn-active`:`side-bar-btn`}`}>
          <IoPersonAdd className="btn-icons-side-bar" />
          <span>Candidates</span>
        </button>
        <p className="grey-text">Organisation</p>
        <button onClick={()=>handleTabChange('Employees')} className={`${currentTab==='Employees'?`side-bar-btn-active`:`side-bar-btn`}`}>
          <BsPeopleFill className="btn-icons-side-bar" />
          <span>Employees</span>
        </button>
        <button onClick={()=>handleTabChange('Attendance')} className={`${currentTab==='Attendance'?`side-bar-btn-active`:`side-bar-btn`}`}>
          <BsBarChartFill className="btn-icons-side-bar" />
          <span>Attendance</span>
        </button>
        <button onClick={()=>handleTabChange('Leaves')} className={`${currentTab==='Leaves'?`side-bar-btn-active`:`side-bar-btn`}`}>
          <BsStars className="btn-icons-side-bar" />
          <span>Leaves</span>
        </button>
        <p className="grey-text">Others</p>
        <button className="side-bar-btn" onClick={handlelogout}>
          <TbLogout className="logout-icon" />
          <span>Logout</span>
        </button>
      </div>
      <div className="content-container">
        <div className="top-section">
          <span>{currentTab}</span>
        </div>
        <div className="bottom-section">
          {rendersection()}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
