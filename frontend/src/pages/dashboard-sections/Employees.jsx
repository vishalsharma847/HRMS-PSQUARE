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
    const [candidateId, setCandidateId] = useState(null);
    const [filterStatus, setFilterstatus] = useState("New");
  
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phoneno, setPhoneno] = useState("");
    const [position, setPosition] = useState("");
    const [experience, setExperience] = useState(0);
    const [resumeFile, setResumeFile] = useState(null);
    const [checkbox, setCheckbox] = useState(false);

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
                experiencefunc={setExperience}
                resumefunc={setResumeFile}
                typefunc={setType}
                idfunc={setCandidateId}
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
              <input
                type="tel"
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
                maxLength={2}
                placeholder="Experience"
                className="modal-input"
              />
              <input
                type="file"
                accept="application/pdf"
                onChange={(e) => setResumeFile(e.target.files[0])}
                placeholder="Resume"
                className="modal-input"
              />
              <span className="full-length">
                <input
                  type="checkbox"
                  value={checkbox}
                  onClick={(e) => setCheckbox(e.target.checked)}
                />{" "}
                I hereby declare that the above information is true to the best
                of my knowledge and belief.
              </span>
              <span className="full-length save-btn">
                <button
                  // onClick={
                  //   type === "New"
                  //     ? handleCreateCandidate
                  //     : handleUpdateCandidate
                  // }
                  className={`${checkbox ? `submit-btn` : `disabled-btn`}`}
                  disabled={!checkbox}
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
