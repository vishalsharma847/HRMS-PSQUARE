import React from "react";
import { IoMdSearch } from "react-icons/io";

const Leaves = () => {
  return (
    <>
      <div className="flex btn-section">
        <div className="flex gap-y">
          <div className="select-cont">
            <select name="" id="" className="select-option">
              <option value="">New</option>
              <option value="">Scheduled</option>
              <option value="">Ongoing</option>
              <option value="">Selected</option>
              <option value="">Rejected</option>
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
          <button className="purple-btn">Add Candidate</button>
        </div>
      </div>
      <div class="table-wrapper">
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
            <tr>
              <td>1</td>
              <td>John Doe</td>
              <td>john@example.com</td>
              <td>1234567890</td>
              <td>Developer</td>
              <td>Selected</td>
              <td>3 years</td>
              <td>Edit/Delete</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Leaves;
