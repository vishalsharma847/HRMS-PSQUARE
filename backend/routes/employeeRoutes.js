import express from 'express'
import { isLoggedIn } from '../middleware/isLoggedIn.js';
import { employeeprofilepic } from '../middleware/employesProfileuploads.js';
import { createEmployee, deleteEmployee, filterEmployee, getByPosition, getEmployee, getemployees, updatedetail, updateStatus } from '../controllers/employeeController.js';

const employeeRoutes = express.Router();

employeeRoutes.post('/create',isLoggedIn,createEmployee);
employeeRoutes.get('/get-all',isLoggedIn,getemployees);
employeeRoutes.get('/get/:id', isLoggedIn,getEmployee);

// filter 
employeeRoutes.get('/filter-position/:position',isLoggedIn,getByPosition)
// send name email phone in keywordd 
employeeRoutes.get('/filter/:search',isLoggedIn,filterEmployee)


employeeRoutes.put("/upadte-status/:id", isLoggedIn,updateStatus);
employeeRoutes.put("/edit/:id", isLoggedIn,updatedetail);
employeeRoutes.delete("/delete/:id",isLoggedIn,deleteEmployee)



export default employeeRoutes;