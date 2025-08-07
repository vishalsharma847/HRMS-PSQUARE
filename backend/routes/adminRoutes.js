import express from 'express'
import { isLoggedIn } from '../middleware/isLoggedIn.js';
import { allCounts, changePassword, checkOldPassword, createCountField, getProfile, loginUser, refreshToken, registerUser, updateProfile } from '../controllers/adminController.js';

const adminRoutes = express.Router();

// auth routes 
adminRoutes.post('/register', registerUser);
adminRoutes.post('/login', loginUser);
adminRoutes.get('/profile', isLoggedIn, getProfile)
adminRoutes.put('/edit-profile', isLoggedIn, updateProfile)
adminRoutes.get('/refresh-token', isLoggedIn, refreshToken)
// change password 
adminRoutes.get('/check-old-password', isLoggedIn, checkOldPassword)
adminRoutes.put('/change-password', isLoggedIn, changePassword)


// not for frontend use 
adminRoutes.post('/counter-create',createCountField )
adminRoutes.get('/counters',allCounts )



export default adminRoutes;