import express from 'express'
import { isLoggedIn } from '../middleware/isLoggedIn.js';
import { resumeupload } from '../middleware/resumeUpload.js';
import { createCandidate, deleteCandidate, filterCandidate, getByPosition, getByStatus, getCandidaesbyname, getCandidates, getCandidte, updatedetail, updateResume, updateStatus } from '../controllers/candidateController.js';

const candidateRoutes = express.Router();



candidateRoutes.post('/create',isLoggedIn,resumeupload,createCandidate);
// send interview scheduled email to candidate 
// candidateRoutes.post('/send-mail/:email',isLoggedIn,isAdmin,);

candidateRoutes.get('/get-all',isLoggedIn,getCandidates);
candidateRoutes.get('/get/:email', isLoggedIn,getCandidte);
candidateRoutes.get('/get/:name', isLoggedIn,getCandidaesbyname);

// filter 
candidateRoutes.get('/filter-status/:status',isLoggedIn,getByStatus)
candidateRoutes.get('/filter-position/:position',isLoggedIn,getByPosition)
candidateRoutes.get('/filter/:search',isLoggedIn,filterCandidate)

// pass candidate id in id 
candidateRoutes.put("/update-status/:id", isLoggedIn,updateStatus);
candidateRoutes.put("/edit/:id", isLoggedIn,updatedetail);
candidateRoutes.put("/update-resume/:id", isLoggedIn,resumeupload,updateResume);
candidateRoutes.delete("/delete/:id",isLoggedIn,deleteCandidate)

export default candidateRoutes;