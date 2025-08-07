import express from 'express'
import { isLoggedIn } from '../middleware/isLoggedIn.js';
import isAdmin from '../middleware/isAdmin.js';
import { leaveDocupload } from '../middleware/leaveDocsUpload.js';

const leaveRoutes = express.Router();

leaveRoutes.post('/create',isLoggedIn,isAdmin,leaveDocupload,);
leaveRoutes.get('/get-all',isLoggedIn,isAdmin,);
leaveRoutes.get('/get/:email', isLoggedIn,isAdmin,);
// return all dates to highligth dates in frontend calender
leaveRoutes.get('/all-dates', isLoggedIn,isAdmin,);

// filter 
leaveRoutes.get('/filter-status/:status',isLoggedIn,isAdmin)
// by name by reason 
leaveRoutes.get('/filter/:keyword',isLoggedIn,isAdmin,)
// return all users take leave on that date 
leaveRoutes.get('/filter/:keyword',isLoggedIn,isAdmin,)

// pass candidate id in id 
leaveRoutes.put("/upadte-status/:id", isLoggedIn, isAdmin,);
// edit document and reason and date 
leaveRoutes.put("/edit/:id", isLoggedIn, isAdmin,);
leaveRoutes.delete("/delete/:id",isLoggedIn,isAdmin,)


export default leaveRoutes;