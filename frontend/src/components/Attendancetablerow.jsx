import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { BsThreeDotsVertical } from "react-icons/bs";

const Attendancetablerow = ({
  attendees,
  // modalfunction,
  // namefunc,
  // emailfunc,
  // phonefunc,
  // positionfunc,
  // departmentfunc,
  // joindatefunc,
  // idfunc,
}) => {
  const [actionDiv, setActiondiv] = useState(false);

  const [status, setStatus] = useState('Status')

  const handleDeleteEmployee = async () => {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/employee/delete/${employee._id}`,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        toast.success(response.data.message);
        setActiondiv(false);
        window.location.reload();
      }
    } catch (error) {
      toast.error("Something went wrong");
      console.error(error.response?.data || error.message);
      setActiondiv(false);
    }
  };

  const handleEditEmployee = () => {
    modalfunction(true);
    setActiondiv(false);
    namefunc(employee.name);
    emailfunc(employee.email);
    phonefunc(employee.phoneno);
    departmentfunc(employee.department);
    positionfunc(employee.position);
    joindatefunc(formattedDate);
    idfunc(employee._id);
  };
  console.log(attendees);
  


  return (
    <>
      <tr>
        <td></td>
        <td>{attendees.employee.name}</td>
        <td>{attendees.employee.position}</td>
        <td>{attendees.employee.department}</td>
        <td>{attendees.task}</td>
                <td>
          <div className="select-cont">
            <select
              value={status}
              defaultValue={"Status"}
              onChange={(e) => {
                setStatus(e.target.value);
                // handleStatusChange(e.target.value);
              }}
              className="select-option"
            >
              <option value="Status">Status</option>
              <option value="Absent">Absent</option>
              <option value="Present">Present</option>
            </select>
          </div>
        </td>
        <td className="action-data">
          <div onClick={() => setActiondiv(!actionDiv)}>
            <BsThreeDotsVertical />
          </div>
          {actionDiv ? (
            <span className="action-box">
              <button className="action-btn" onClick={handleEditEmployee}>
                Edit
              </button>
              <button
                className="action-btn"
                onClick={
                  handleDeleteEmployee
                }
              >
                Delete
              </button>
            </span>
          ) : (
            ``
          )}
        </td>
      </tr>
    </>
  );
};

export default Attendancetablerow;
