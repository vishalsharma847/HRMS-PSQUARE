import React, { useEffect, useState } from "react";
import { IoMdSearch } from "react-icons/io";
import Candidatetablerow from "../../components/Candidatetablerow";
import { RxCross2 } from "react-icons/rx";
import toast from "react-hot-toast";
import axios from "axios";

const Candidates = () => {
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

  const [allcandidates, setAllCandidates] = useState();

  // console.log(checkbox);
  // console.log(allcandidates);
  console.log(candidateId);

  const getAllCandidates = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/candidate/get-all`,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        setAllCandidates(response.data.candidates);
      }
    } catch (error) {
      toast.error("Something went wrong");
      console.error(error.response?.data || error.message);
    }
  };

  const handleCreateCandidate = async (e) => {
    e.preventDefault();
    // console.log(resumeFile);
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("phoneno", phoneno);
    formData.append("position", position);
    formData.append("experience", experience);
    formData.append("resume", resumeFile);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/candidate/create`,
        formData,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
          withCredentials: true,
        }
      );

      if (response.status === 201) {
        console.log("Candidate created:", response.data);
        toast.success("Candidate created successfully");
        setIsmodalopen(false);
        window.location.reload();
        // setFormData({});
      }
    } catch (error) {
      toast.error("Something went wrong");
      console.error(error.response?.data || error.message);
    }
  };

  const handleUpdateCandidate = async (e) => {
    e.preventDefault();
    console.log(candidateId);
    try {
      const response = await axios.put(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/candidate/update-status/${candidateId}`,
        {
          name,
          phoneno,
          email,
          position,
          experience,
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
    getAllCandidates();
  }, []);

  return (
    <>
      <div className="flex btn-section">
        <div className="flex gap-y">
          <div className="select-cont">
            <select value={filterStatus} onChange={(e)=>setFilterstatus(e.target.value)} className="select-option">
              <option value="New">New</option>
              <option value="Scheduled">Scheduled</option>
              <option value="Ongoing">Ongoing</option>
              <option value="Selected">Selected</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>
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
          <button onClick={() => setIsmodalopen(true)} className="purple-btn">
            Add Candidate
          </button>
        </div>
      </div>
      <div className="table-wrapper">
        <table className="table-cont">
          <thead>
            <tr>
              <th>S.No.</th>
              <th>Candidate Name</th>
              <th>Email Address</th>
              <th>Phone Number</th>
              <th>Position</th>
              <th>Status</th>
              <th>Experience</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {allcandidates
              ?.map((candidate, index) =>
                candidate?.status === filterStatus ? (
                  <Candidatetablerow
                    key={index}
                    modalfunction={setIsmodalopen}
                    candidate={candidate}
                    namefunc={setName}
                    emailfunc={setEmail}
                    phonefunc={setPhoneno}
                    positionfunc={setPosition}
                    experiencefunc={setExperience}
                    resumefunc={setResumeFile}
                    typefunc={setType}
                    idfunc={setCandidateId}
                  />
                ) : null
              )}
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
                  onClick={
                    type === "New"
                      ? handleCreateCandidate
                      : handleUpdateCandidate
                  }
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

export default Candidates;
