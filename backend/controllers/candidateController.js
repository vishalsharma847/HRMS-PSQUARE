import asynchandler from "express-async-handler"
import increaseCount, { decreaseCount } from "../utils/counter.js";
import Candidate from "../model/Candidate.js";
import { rm } from "fs/promises";



export const createCandidate = asynchandler(async (req, res) => {
    const {name,phoneno,email,position,experience } = req.body;
    const candidateExists = await Candidate.findOne({ email });
    if (candidateExists) {
    // throw
    return res.status(400).json({ status: "error", message: "candidte with this email already exist search by email and update its status" });
     }
    // console.log(name, email, phoneno,position.experience)
     if (!req.file) {
      return res.status(400).json({ status: "error", message: "resume not added please addesume" });
    }
    const candidateNo =  await increaseCount("candidate") 
    console.log(candidateNo)
    const candidate = await Candidate.create({
        name, 
        email, 
        phoneno,
        position,
        experience, 
        srno:candidateNo,
        resumeurl: req?.file?.path,
    });
    res.status(201).json({
        status: "success",
        message: "Candidate created successfully",
        candidate
    })
})



// send interview secheduled detail to user email 


// get sigle based on email 
export const getCandidates = asynchandler(async (req, res, next) => {
    const sortDirection = req.query.sort === 'asc' ? -1 : 1;
    const candidates = await Candidate.find()
        .sort({ createdAt: sortDirection })
    const candidatesLength = await Candidate.countDocuments();
    res.status(200).json({
        candidates,
        candidatesLength
    });
})



// get particular candidte based on email
export const getCandidte = asynchandler(async (req, res) => {
    // console.log(req.params);
    const candidate = await Candidate.findOne(req.params.email)
    if (!candidate) {
         return res.status(400).json({ status: "error", message: "candidte with this email not found" });
    }
    res.json({
        status: "success",
        message: "Candidte fetched succcessfully",
        candidate,
    })
})



// get particular candidte based on email to convert into empployee return only particular fileds
export const getCandidaesbyname = asynchandler(async (req, res) => {
    // console.log(req.params);
    const candidate = await Candidate.findOne(req.params.name).select("name position")
    if (!candidate) {
         return res.status(400).json({ status: "error", message: "candidte with this email not found" });
    }
    res.json({
        status: "success",
        message: "Candidte fetched succcessfully",
        candidate,
    })
})






// filter by status get status from paarms
export const getByStatus = asynchandler(async (req, res) => {
    const status = req.params.status
    const candidate = await Candidate.find({status:status})
    res.status(201).json({
        status: "success",
        message: "Candidte according to status fetched successfully",
        candidate,
    })
})


// filter by position 
export const getByPosition = asynchandler(async (req, res) => {
    const position = req.params.position
    const candidate = await Candidate.find({position:position})
    res.status(201).json({
        status: "success",
        message: "Candidte according to Posiiton fetched successfully",
        candidate,
    })
})

// filter by keyword 
export const filterCandidate = asynchandler(async (req, res) => {
    const keyword = req.params.search;
    // console.log(keyword)
    const candidate = await Candidate.find({
        $or: [
            { name: { $regex: keyword, $options: 'i' } },
            { email: { $regex: keyword, $options: 'i' } },
        ],
    })
    if(candidate.length <= 0){
        res.status(201).json({
            status: "success",
            message: "No Candidate Found according to this field",
            candidate : null
        })
    }
    res.status(201).json({
        status: "success",
        message: "Candidate fetched successfully",
        candidate,
    })
})



// update status 
export const updateStatus = asynchandler(async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    // console.log(id)
    // console.log(status)
    const candidate = await Candidate.findByIdAndUpdate(
        id,
        { status },
        { new: true }
    );
    res.status(201).json({
        status: "success",
        message: "Candidate status updated successfully",
        candidate
    })
})


// edit detail  
export const updatedetail = asynchandler(async (req, res) => {
  const { name, phoneno, email,position,experience} = req.body;
 
  const candidteFound = await Candidate.findById(req.params.id);
  if (!candidteFound) {
    throw new Error("Candidate Not Found");
  }
  const updateCandidte = await Candidate.findByIdAndUpdate(req.params.id, {
   name:name || candidteFound.name,
   phoneno:phoneno || candidteFound.phoneno,
   email:email || candidteFound.email,
   position:position || candidteFound.position,
   experience:experience || candidteFound.experience,
  },
  { new: true }
);
  res.status(201).json({
    status: "success",
    message: "Candidate profile data updated successfully",
    updateCandidte,
  });
});




export const updateResume = asynchandler(async (req, res) => { 
  const candidteFound = await Candidate.findById(req.params.id);
  if (!candidteFound) {
    throw new Error("Candidate Not Found");
  }
  rm(candidteFound.resumeurl);
  const updateCandidte = await Candidate.findByIdAndUpdate(req.params.id, {
    resumeurl: req?.file?.path || candidteFound.resumeurl,
  },
  { new: true }
);
  res.status(201).json({
    status: "success",
    message: "Candidte resume updated successfully",
    updateCandidte,
  });
});


// deelete candidate  
export const deleteCandidate = asynchandler(async (req, res) => {
    // console.log(req.params);
    const candidate = await Candidate.findByIdAndDelete(req.params.id);
    await decreaseCount("candidate") 
    res.json({
        status: "success",
        message: "Candidate deleted succcessfully",
        candidate,
    })
})