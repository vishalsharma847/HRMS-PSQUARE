import asynchandler from "express-async-handler"
import increaseCount, { decreaseCount } from "../utils/counter.js";
import Attendance from "../model/Attendance.js";




export const createAttendance = asynchandler(async (req, res) => {
    const {task,employeeId, name} = req.body;
    const attendanceNo =  await increaseCount("attendence") 
    console.log(attendanceNo)
    const attendance = await Attendance.create({
        employee:employeeId,
        name,
        task,
        srno:attendanceNo,
    });
    // send task to employy on email 
    res.status(201).json({
        status: "success",
        message: "Task created successfully",
        attendance
    })
})




export const getAllAttendance = asynchandler(async (req, res, next) => {
    const sortDirection = req.query.sort === 'asc' ? 1 : -1;
    const attendance = await Attendance.find().populate({
            path: 'employee', 
            select: 'name department position'
        })
        .sort({ createdAt: sortDirection })
    const attendanceLength = await Attendance.countDocuments();
    res.status(200).json({
        attendance,
        attendanceLength
    });
})



// filter by status 
export const getByStatus = asynchandler(async (req, res) => {
    const status = req.params.status
    const attendances = await Attendance.find({status:status}).populate({
            path: 'employee', 
            select: 'name photourl department position'
        })
    res.status(201).json({
        status: "success",
        message: "All attendance according to status fetched successfully",
        attendances
    })
})



// filter by keyword 
export const filterAttendance = asynchandler(async (req, res) => {
    const keyword = req.params.search;
    // console.log(keyword)
    const attendance = await Attendance.find({
        $or: [
            { task: { $regex: keyword, $options: 'i' } },
            { name: { $regex: keyword, $options: 'i' } },
        ],
    }).populate({
            path: 'employee', 
            select: 'name photourl department position'
        })
    if(attendance.length <= 0){
        res.status(201).json({
            status: "success",
            message: "No task or employye Found according to this field",
            attendance : null
        })
    }
    res.status(201).json({
        status: "success",
        message: "Attendance fetched successfully",
        attendance,
    })
})




// update status 
export const updateStatus = asynchandler(async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    // console.log(id)
    // console.log(status)
    const attendance = await Attendance.findByIdAndUpdate(
        id,
        { status },
        { new: true }
    );
    res.status(201).json({
        status: "success",
        message: "Attendance status updated successfully",
        attendance
    })
})



// edit detail  
export const updatedetail = asynchandler(async (req, res) => {
  const { task,status} = req.body;
 
  const attendanceFound = await Attendance.findById(req.params.id);
  if (!attendanceFound) {
    throw new Error("Attendance Not Found");
  }
  const updatedAttendance = await Attendance.findByIdAndUpdate(req.params.id, {
     task:task || attendanceFound.task,
     status:status || attendanceFound.status
  },
  { new: true }
);
  res.status(201).json({
    status: "success",
    message: "Attendance data updated successfully",
    updatedAttendance,
  });
});



// delete candidate  
export const deleteAttendance = asynchandler(async (req, res) => {
    // console.log(req.params);
    const attendance = await Attendance.findByIdAndDelete(req.params.id);
    await decreaseCount("attendence") 
    res.json({
        status: "success",
        message: "Attendance deleted succcessfully",
        attendance,
    })
})