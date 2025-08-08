import React, { useEffect, useState } from "react";
import { IoMdSearch } from "react-icons/io";
import { BsThreeDotsVertical } from "react-icons/bs";
import axios from "axios";
import toast from "react-hot-toast";
import Employeetablerow from "../../components/Employeetablerow";
import { RxCross2 } from "react-icons/rx";

const Employees = () => {
  const [allemployees, setAllEmployees] = useState();

  const [isModalopen, setIsmodalopen] = useState(false);
  const [type, setType] = useState("New");
  const [employeeId, setEmployeeId] = useState(null);
  const [filterStatus, setFilterstatus] = useState("New");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneno, setPhoneno] = useState("");
  const [position, setPosition] = useState("");
  const [department, setDepartment] = useState("Not assigned yet");
  const [joindate, setJoindate] = useState("");

  console.log(allemployees);

  const getAllEmployees = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/employee/get-all`,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        console.log(response.data);
        setAllEmployees(response.data.employee);
      }
    } catch (error) {
      console.error(error?.response?.data || error?.message);
      toast.error("Something went wrong");
    }
  };

  const handleUpdateEmployee = async (e) => {
    e.preventDefault();
    console.log(employeeId);
    try {
      const response = await axios.put(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/employee/edit/${employeeId}`,
        {
          name,
          phoneno,
          email,
          position,
          department,
          joinDate:joindate
        },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
          withCredentials: true,
        }
      );

      if (response.status === 201) {
        console.log("Candidate updated:", response.data);
        toast.success("Candidate updated successfully");
        setIsmodalopen(false);
        window.location.reload();
        // setFormData({});
      }
    } catch (error) {
      toast.error("Something went wrong");
      console.error(error.response?.data || error.message);
    }
  };

  useEffect(() => {
    getAllEmployees();
  }, []);

  return (
    <>
      <div className="flex btn-section">
        <div className="flex gap-y">
          <div className="select-cont">
            <select name="" id="" className="select-option">
              <option value="">Position</option>
            </select>
          </div>
        </div>
        <div className="flex gap-y">
          <div className="search-box">
            <IoMdSearch className="icons" />
            <input
              type="text"
              className="transparent-input"
              placeholder="Search"
            />
          </div>
        </div>
      </div>
      <div class="table-wrapper">
        <table className="table-cont">
          <thead>
            <tr>
              <th>Profile</th>
              <th>Employee Name</th>
              <th>Email Address</th>
              <th>Phone Number</th>
              <th>Position</th>
              <th>Department</th>
              <th>Date of Joining</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {allemployees?.map((employee, index) => (
              <Employeetablerow
                key={index}
                modalfunction={setIsmodalopen}
                employee={employee}
                namefunc={setName}
                emailfunc={setEmail}
                phonefunc={setPhoneno}
                positionfunc={setPosition}
                departmentfunc={setDepartment}
                joindatefunc={setJoindate}
                idfunc={setEmployeeId}
              />
            ))}
          </tbody>
        </table>
      </div>
      {isModalopen ? (
        <div className="modal-background">
          <div className="form-box">
            <h1 className="modal-heading">
              Add New Candidate{" "}
              <span className="cross" onClick={() => setIsmodalopen(false)}>
                <RxCross2 />
              </span>
            </h1>
            <form className="modal-input-cont">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Full Name"
                className="modal-input"
              />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email Address"
                className="modal-input"
              />
              <input
                type="tel"
                value={phoneno}
                onChange={(e) => setPhoneno(e.target.value)}
                placeholder="Phone Number"
                className="modal-input"
              />
              <input
                type="text"
                value={position}
                onChange={(e) => setPosition(e.target.value)}
                placeholder="Position"
                className="modal-input"
              />
              <div className="modal-input">
                <select value={department} defaultValue={"Not assigned yet"} onChange={(e) => setDepartment(e.target.value)} className="">
                  <option value="Not assigned yet">Not assigned yet</option>
                  <option value="Design">Design</option>
                  <option value="Development">Development</option>
                  <option value="Testing">Testing</option>
                </select>
              </div>
              <input
                type="date"
                value={joindate}
                onChange={(e) => setJoindate(e.target.value)}
                placeholder="Position"
                className="modal-input"
              />
              <span className="full-length save-btn">
                <button
                  onClick={
                       handleUpdateEmployee
                  }
                  className="submit-btn"
                >
                  Save
                </button>
              </span>
            </form>
          </div>
        </div>
      ) : (
        ``
      )}
    </>
  );
};

export default Employees;
