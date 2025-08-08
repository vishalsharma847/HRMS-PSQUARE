import React, { useEffect, useState } from "react";
import { IoMdSearch } from "react-icons/io";
import { BsThreeDotsVertical } from "react-icons/bs";
import axios from "axios";
import toast from "react-hot-toast";
import Attendancetablerow from "../../components/Attendancetablerow";
import { RxCross2 } from "react-icons/rx";
const Attendance = () => {
  const [allattendees, setAllAttendes] = useState();

  const [isModalopen, setIsmodalopen] = useState(false);
  const [employeeId, setEmployeeId] = useState();

  const [name, setName] = useState("");
  const [position, setPosition] = useState("");
  const [department, setDepartment] = useState("Not assigned yet");
  const [task, setTask] = useState("");
  const [status, setStatus] = useState("");

  const [employeeData, setEmployeedata] = useState("");

  const [allnames, setAllnames] = useState();

  console.log(allattendees);

  const createAttendee = async (e) => {
    e.preventDefault()
    console.log(
      task,
      employeeId,
      name,
    );
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/attendance/create`,
        {
          task,
          employeeId,
          name,
        },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
          withCredentials: true,
        }
      );

      if (response.status === 201) {
        console.log(response.data);
        setIsmodalopen(false);
      }
    } catch (error) {
      console.error(error?.response?.data || error?.message);
      toast.error("Something went wrong");
    }
  };

  const getAllAttendees = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/attendance/get-all`,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        console.log(response.data);
        setAllAttendes(response.data.attendance);
      }
    } catch (error) {
      console.error(error?.response?.data || error?.message);
      toast.error("Something went wrong");
    }
  };
  const getAllEmployeeNames = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/employee/get-names`,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        console.log(response.data);
        setAllnames(response.data.employee);
      }
    } catch (error) {
      console.error(error?.response?.data || error?.message);
      toast.error("Something went wrong");
    }
  };

  // const handleUpdateEmployee = async (e) => {
  //   e.preventDefault();
  //   console.log(employeeId);
  //   try {
  //     const response = await axios.put(
  //       `${import.meta.env.VITE_BACKEND_URL}/employee/edit/${employeeId}`,
  //       {
  //         name,
  //         phoneno,
  //         email,
  //         position,
  //         department,
  //         joinDate: joindate,
  //       },
  //       {
  //         headers: {
  //           Authorization: "Bearer " + localStorage.getItem("token"),
  //         },
  //         withCredentials: true,
  //       }
  //     );

  //     if (response.status === 201) {
  //       console.log("Candidate updated:", response.data);
  //       toast.success("Candidate updated successfully");
  //       setIsmodalopen(false);
  //       window.location.reload();
  //       // setFormData({});
  //     }
  //   } catch (error) {
  //     toast.error("Something went wrong");
  //     console.error(error.response?.data || error.message);
  //   }
  // };

  const fetchEmployeeData = async (id) => {
    console.log(id);

    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/employee/get-name/${id}`,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        // console.log(response.data);
        setEmployeedata(response.data.employee);
      }
    } catch (error) {
      console.error(error?.response?.data || error?.message);
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    getAllAttendees();
  }, []);

  useEffect(() => {
    getAllEmployeeNames();
  }, [isModalopen]);

  useEffect(() => {
    setPosition(employeeData.position);
    setDepartment(employeeData.department);
    setEmployeeId(employeeData._id)
    setName(employeeData.name)
  }, [employeeData]);

  return (
    <>
      <div className="flex btn-section">
        <div className="flex gap-y">
          <div className="select-cont">
            <select name="" id="" className="select-option">
              <option value="">Status</option>
              <option value="">Absent</option>
              <option value="">Ongoing</option>
              <option value="">Selected</option>
              <option value="">Rejected</option>
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
          <button className="purple-btn" onClick={() => setIsmodalopen(true)}>
            Assign Task
          </button>
        </div>
      </div>
      <div class="table-wrapper">
        <table className="table-cont">
          <thead>
            <tr>
              <th>Profile</th>
              <th>Employee Name</th>
              <th>Position</th>
              <th>Department</th>
              <th>Task</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {allattendees?.map((attendees, index) => (
              <Attendancetablerow key={index} attendees={attendees}/>
            ))}
          </tbody>
        </table>
      </div>
      {isModalopen ? (
        <div className="modal-background">
          <div className="form-box">
            <h1 className="modal-heading">
              Assign Task{" "}
              <span
                className="cross"
                onClick={() => {
                  setEmployeedata("");
                  setName("");
                  setIsmodalopen(false);
                }}
              >
                <RxCross2 />
              </span>
            </h1>
            <form className="modal-input-cont">
              <div className="modal-input">
                <select
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    fetchEmployeeData(e.target.value);
                  }}
                  className="modal-select"
                >
                  <option value="">Select Name</option>
                  {allnames.map((object) => (
                    <option key={object._id} value={object._id}>
                      {object.name}
                    </option>
                  ))}
                </select>
              </div>
              <input
                type="text"
                value={task}
                onChange={(e) => setTask(e.target.value)}
                placeholder="Assign task"
                className="modal-input"
              />
              <input
                type="text"
                value={position}
                disabled={true}
                onChange={(e) => setPosition(e.target.value)}
                placeholder="Position"
                className="modal-input"
              />
              <input
                type="text"
                disabled={true}
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                placeholder="Position"
                className="modal-input"
              />
              <div className="modal-input">
                <select
                  value={status}
                  defaultValue={"status"}
                  onChange={(e) => setStatus(e.target.value)}
                  className=""
                >
                  <option value="Status">Status</option>
                  <option value="Present">Present</option>
                  <option value="Absent">Absent</option>
                </select>
              </div>
              <span className="full-length save-btn">
                <button onClick={createAttendee} className="submit-btn">
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

export default Attendance;
