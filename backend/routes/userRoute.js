import express from 'express'
import {getProfile,loginUser,registerUser} from '../controllers/userController.js';
import { isLoggedIn } from '../middleware/isLoggedIn.js';

const userRoutes = express.Router();

// auth routes 
userRoutes.post('/register', registerUser);
userRoutes.post('/login', loginUser);
userRoutes.get('/profile', isLoggedIn, getProfile)


export default userRoutes;