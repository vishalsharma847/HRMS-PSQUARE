import express from 'express'
import { isLoggedIn } from '../middleware/isLoggedIn.js';
import { createAttendance, deleteAttendance, filterAttendance, getAllAttendance, getByStatus, updatedetail, updateStatus } from '../controllers/attendanceController.js';


const attendanceRoutes = express.Router();

// auth routes 
attendanceRoutes.post('/create',isLoggedIn,createAttendance);
attendanceRoutes.get('/get-all',isLoggedIn,getAllAttendance);

// filter 
attendanceRoutes.get('/filter-status/:status',isLoggedIn,getByStatus)
// search by task 
attendanceRoutes.get('/filter/:search',isLoggedIn,filterAttendance)

// pass attendance id 
attendanceRoutes.put("/upadte-status/:id", isLoggedIn,updateStatus);
attendanceRoutes.put("/edit-task/:id", isLoggedIn, updatedetail);
attendanceRoutes.delete("/delete/:id",isLoggedIn,deleteAttendance)



export default attendanceRoutes;