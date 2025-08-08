import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { BsThreeDotsVertical } from "react-icons/bs";

const Candidatetablerow = ({
  candidate,
  modalfunction,
  namefunc,
  emailfunc,
  phonefunc,
  positionfunc,
  experiencefunc,
  resumefunc,
  typefunc,
  idfunc,
}) => {
  const [actionDiv, setActiondiv] = useState(false);

  const [status, setStatus] = useState(candidate.status);
  console.log(candidate);

  const handleStatusChange = async (newStatus) => {
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/candidate/update-status/${
          candidate._id
        }`,
        { status: newStatus },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
          withCredentials: true,
        }
      );

      
      if (response.status === 201 && newStatus === "Selected") {
        try {
          const response = await axios.post(
            `${import.meta.env.VITE_BACKEND_URL}/employee/create`,
            {
              name: candidate.name,
              phoneno: candidate.phoneno,
              email: candidate.email,
              position: candidate.position,
              candidateId: candidate._id,
            },
            {
              headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
              },
              withCredentials: true,
            }
          );

          if (response.status === 201) {
            console.log("Employee created:", response.data);
            toast.success("Employee created successfully");
            window.location.reload();
          }
        } catch (error) {
          toast.error("Something went wrong");
          console.error(error.response?.data || error.message);
        }
      }
      if (response.status === 201) {
        toast.success(response.data.message);
        window.location.reload();
      }
    } catch (error) {
      toast.error("Something went wrong");
      console.error(error.response?.data || error.message);
    }
  };

  const handleDeleteCandidate = async () => {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/candidate/delete/${candidate._id}`,
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

  const handleEditCandidate = () => {
    modalfunction(true);
    setActiondiv(false);
    namefunc(candidate.name);
    emailfunc(candidate.email);
    phonefunc(candidate.phoneno);
    positionfunc(candidate.position);
    experiencefunc(candidate.experience);
    resumefunc(candidate.resume);
    typefunc("Edit");
    idfunc(candidate._id);
  };

  console.log(status);

  return (
    <>
      <tr>
        <td>{candidate.srno}</td>
        <td>{candidate.name}</td>
        <td>{candidate.email}</td>
        <td>{candidate.phoneno}</td>
        <td>{candidate.position}</td>
        <td>
          <div className="select-cont">
            <select
              value={status}
              onChange={(e) => {
                setStatus(e.target.value);
                handleStatusChange(e.target.value);
              }}
              className="select-option"
            >
              <option value="New">New</option>
              <option value="Scheduled">Scheduled</option>
              <option value="Ongoing">Ongoing</option>
              <option value="Selected">Selected</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>
        </td>
        <td>{candidate.experience} Years</td>
        <td className="action-data">
          <div onClick={() => setActiondiv(!actionDiv)}>
            <BsThreeDotsVertical />
          </div>
          {actionDiv ? (
            <span className="action-box">
              <button className="action-btn" onClick={handleEditCandidate}>
                Edit
              </button>
              <button
                className="action-btn"
                onClick={
                  handleDeleteCandidate
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

export default Candidatetablerow;
