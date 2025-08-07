import asynchandler from "express-async-handler";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken.js";
import Count from "../model/Count.js";
import Admin from "../model/Admin.js";



// register user by details
export const registerUser = asynchandler(async (req, res) => {
  const { name,email,password } = req.body;
  // check user exists
  const userExists = await Admin.findOne({ email });
  if (userExists) {
    // throw
    throw new Error("User already exists");
  }
  // hash password
  const salt = await bcrypt.genSalt(10);
  const hashedpassword = await bcrypt.hash(password, salt);
  // create the user
  await Admin.create({
    name,
    email,
    password: hashedpassword,
  });
  res.status(201).json({
    message: "Registered successfully",
  });
});


// login controller
export const loginUser = asynchandler(async (req, res) => {
  const { email, password } = req.body;
  // console.log(req.body)
  //Find the user in db by email only
  const userFound = await Admin.findOne({
    email,
  });
  if (userFound && (await bcrypt.compare(password, userFound?.password))) {
    res.status(200).json({
      status: "success",
      message: "User logged in successfully",
      token: generateToken(userFound?._id),
      expiresIn: 2 * 60 * 60,
    });
  } else {
    throw new Error("Invalid login credentials");
  }
});



export const refreshToken = asynchandler(async (req, res) => {
  try {
    const user = req.userAuthId; // get user from middleware
    const newToken = jwt.sign({ id: user.id }, SECRET_KEY, { expiresIn: '2h' });
    res.status(200).json({ token: newToken });
  } catch (err) {
    res.status(500).json({ message: 'Token refresh failed' });
  }
})



//Changed to normal delivery of user data
export const getProfile = asynchandler(async (req, res) => {
  //find the user
  // const userFound = await Admin.findById(req.userAuthId);
  const user = await Admin.findById(req.userAuthId).select(
    "-password -createdAt"
  );
  res.json({
    status: "success",
    message: "User profile fetched successfully",
    user,
  });
});



export const updateProfile = asynchandler(async (req, res) => {
  const { name, password,} = req.body;
  // find user by id
  // const userId = await Admin.findById(req.userAuthId);
  const userFound = await Admin.findById(req.userAuthId);
  if (!userFound) {
    throw new Error("Admin Not Found");
  }
  // hash password
  const salt = await bcrypt.genSalt(10);
  const hashedpassword = await bcrypt.hash(password, salt);
  // create the user
  const updateAdmin = await Admin.findByIdAndUpdate(userId, {
    name: name || userFound.name,
    phoneno: phoneno || userFound.phoneno,
    password: hashedpassword || userFound.password,
  },
  { new: true }
);
  res.status(201).json({
    status: "success",
    message: "Admin profile data updated successfully",
    updateAdmin,
  });
});





// change password 
export const checkOldPassword = asynchandler(async (req, res) => {
  const {oldPassword} = req.body;
  // find user by id
  // const userId = await User.findById(req.userAuthId);
  const adminFound = await Admin.findById(req.userAuthId);
  if (!adminFound) {
    throw new Error("Admin Not Found");
  }
  if (adminFound && (await bcrypt.compare(oldPassword, userFound?.password))) {
    res.status(200).json({
      status: "success",
      message: "enter new password",
    });
  } else {
    throw new Error("Invalid login credentials");
  }
});



// change password 
export const changePassword = asynchandler(async (req, res) => {
  const { password,} = req.body;
  // find user by id
  // const adminId = await Admin.findById(req.userAuthId);
  const adminFound = await Admin.findById(req.userAuthId);
  if (!adminFound) {
    throw new Error("Admin Not Found");
  }
  // hash password
  const salt = await bcrypt.genSalt(10);
  const hashedpassword = await bcrypt.hash(password, salt);
  // create the user
  const updateAdmin = await Admin.findByIdAndUpdate(userId, {
    password: hashedpassword || adminFound.password,
  },
  { new: true }
);
  res.status(201).json({
    status: "success",
    message: "Password updated successfully",
    updateAdmin,
  });
});



export const createCountField = asynchandler(async (req, res) => {
  const {countName} = req.body
  const count = await Count.create({
    countName
  });
  res.status(201).json({
    status: "success",
    message: "Counter Created successfully",
    count,
  });
});


export const allCounts = asynchandler(async (req, res) => {
  const counts = await Count.find({})
  res.status(201).json({
    status: "success",
    message: "All counts fetched successfully",
    counts,
  });
});