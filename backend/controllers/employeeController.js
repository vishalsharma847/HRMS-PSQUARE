import asynchandler from "express-async-handler"
import increaseCount, { decreaseCount } from "../utils/counter.js";
import Employee from "../model/Employee.js";



export const createEmployee = asynchandler(async (req, res) => {
    const {name,phoneno,email,position,candidateId } = req.body;
    const employeeExists = await Employee.findOne({ email });
    if (employeeExists) {
    // throw
    return res.status(400).json({ status: "error", message: "Employee with this email already exist search by email and update its status" });
     }
    const employeeNo =  await increaseCount("employee") 
    console.log(employeeNo)
    const employee = await Employee.create({
        name, 
        email, 
        phoneno,
        position,
        candidate:candidateId,
        srno:employeeNo,
    });
    res.status(201).json({
        status: "success",
        message: "Employee created successfully",
        employee
    })
})



// get all
export const getemployees = asynchandler(async (req, res, next) => {
    const sortDirection = req.query.sort === 'asc' ? -1 : 1;
    const employee = await Employee.find()
        .sort({ createdAt: sortDirection })
    const employeesLength = await Employee.countDocuments();
    res.status(200).json({
        employee,
        employeesLength
    });
})



// get particular
export const getEmployee = asynchandler(async (req, res) => {
    // console.log(req.params);
    const employee = await Employee.findOne(req.params.id)
    if (!employee) {
         return res.status(400).json({ status: "error", message: "employee with this email not found" });
    }
    res.json({
        status: "success",
        message: "Employee fetched succcessfully",
        employee,
    })
})

// use in creting task 
// get particular candidte based on email to convert into empployee return only particular fileds
export const getCandidaesbyname = asynchandler(async (req, res) => {
    // console.log(req.params);
    const employee = await Employee.findOne(req.params.name).select("name position department")
    if (!employee) {
         return res.status(400).json({ status: "error", message: "employee with this email not found" });
    }
    res.json({
        status: "success",
        message: "employee fetched succcessfully",
        employee,
    })
})


// filter by position 
export const getByPosition = asynchandler(async (req, res) => {
    const position = req.params.position
    const employee = await Employee.find({position:position})
    res.status(201).json({
        status: "success",
        message: "Employee according to Posiiton fetched successfully",
        employee,
    })
})



// filter by keyword 
export const filterEmployee = asynchandler(async (req, res) => {
    const keyword = req.params.search;
    // console.log(keyword)
    const employee = await Employee.find({
        $or: [
            { name: { $regex: keyword, $options: 'i' } },
            { email: { $regex: keyword, $options: 'i' } },
        ],
    })
    if(employee.length <= 0){
        res.status(201).json({
            status: "success",
            message: "No Employee Found according to this field",
            employee : null
        })
    }
    res.status(201).json({
        status: "success",
        message: "Employee fetched successfully",
        employee,
    })
})




// update status 
export const updateStatus = asynchandler(async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    // console.log(id)
    // console.log(status)
    const employee = await Employee.findByIdAndUpdate(
        id,
        { status },
        { new: true }
    );
    res.status(201).json({
        status: "success",
        message: "Employee status updated successfully",
        employee
    })
})



// edit detail  
export const updatedetail = asynchandler(async (req, res) => {
  const { name, phoneno, email,position,department,joinDate} = req.body;
 
  const employeeFound = await Candidate.findById(req.params.id);
  if (!employeeFound) {
    throw new Error("Employee Not Found");
  }
  const updateEmployee = await Employee.findByIdAndUpdate(req.params.id, {
   name:name || employeeFound.name,
   phoneno:phoneno || employeeFound.phoneno,
   email:email || employeeFound.email,
   position:position || employeeFound.position,
   department:department || employeeFound.department,
   joinDate:joinDate || employeeFound.joinDate 
  },
  { new: true }
);
  res.status(201).json({
    status: "success",
    message: "Employee data updated successfully",
    updateEmployee,
  });
});



// deelete candidate  
export const deleteEmployee = asynchandler(async (req, res) => {
    // console.log(req.params);
    const employee = await Employee.findByIdAndDelete(req.params.id);
    await decreaseCount("employee") 
    res.json({
        status: "success",
        message: "Employee deleted succcessfully",
        employee,
    })
})