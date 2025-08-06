import asynchandler from "express-async-handler";
import User from "../model/User.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken.js";

// register user by details
export const registerUser = asynchandler(async (req, res) => {
  const { fullname, email, password } = req.body;
  // check user exists
  const userExists = await User.findOne({ email });
  if (userExists) {
    // throw
    throw new Error("User already exists");
  }
  // hash password
  const salt = await bcrypt.genSalt(10);
  const hashedpassword = await bcrypt.hash(password, salt);


  // create the user
  await User.create({
    fullname,
    email,
    password: hashedpassword,
  });
  res.status(200).json({
    message: "Registered successfully",
  });
});

// login controller
export const loginUser = asynchandler(async (req, res) => {
  const { email, password } = req.body;
  // console.log(req.body)
  //Find the user in db by email only
  const userFound = await User.findOne({
    email,
  });
  if (userFound && (await bcrypt.compare(password, userFound?.password))) {
    res.status(200).json({
      status: "success",
      message: "User logged in successfully",
      token: generateToken(userFound?._id),
    });
  } else {
    throw new Error("Invalid login credentials");
  }
});

//Changed to normal delivery of user data
export const getProfile = asynchandler(async (req, res) => {
  //find the user
  const userFound = await User.findById(req.userAuthId);
  const user = await User.findById(req.userAuthId).select(
    "-password -createdAt -updatedAt"
  );
  res.json({
    status: "success",
    message: "User profile fetched successfully",
    user,
  });
});
