const asyncHandler = require("express-async-handler");
const User = require("../Models/userModels");

const getAllUsers = asyncHandler(async (req, res) => {
  const user = await User.find();
  res.status(200).json(user);
});

const createUser = asyncHandler(async (req, res) => {
  const {
    firstName,
    lastName,
    username,
    email,
    password,
    phone,
    gender,
    dateOfBirth,
    Subscribe,
  } = req.body;

  if (
    !firstName ||
    !lastName ||
    !username ||
    !email ||
    !password ||
    !phone ||
    !gender ||
    !dateOfBirth ||
    !req.files["profileImage"] ||
    !req.files["resume"] ||
    !Subscribe
  ) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }
  const profileImagePath = req.files["profileImage"][0].path;
  const resumePath = req.files["resume"][0].path;

  const user = await User.create({
    firstName,
    lastName,
    username,
    email,
    password,
    phone,
    gender,
    dateOfBirth,
    File: resumePath,
    Image: profileImagePath,
    Subscribe,
  });

  res.status(201).json({
    message: "User created successfully",
    user,
  });
});
const getSpecificUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    res.status(400);
    throw new Error("User not found");
  }
  res.status(200).json(user);
});
const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    res.status(400);
    throw new Error("User not found");
  }
  const profileImage = req.files?.profileImage?.[0]?.filename;
  const resume = req.files?.resume?.[0]?.filename;

  const {
    firstName,
    lastName,
    username,
    email,
    password,
    phone,
    gender,
    dateOfBirth,
    Subscribe,
  } = req.body;

  const updatedData = {
    firstName,
    lastName,
    username,
    email,
    password,
    phone,
    gender,
    dateOfBirth,
    Subscribe,
  };
  if (profileImage) updatedData.Image = profileImage;
  if (resume) updatedData.File = resume;
  const updatedUser = await User.findByIdAndUpdate(req.params.id, updatedData, {
    new: true,
  });
  res.status(200).json(updatedUser);
});
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    res.status(400);
    throw new Error("User not found");
  }
  await User.findByIdAndDelete(req.params.id);
  res.status(200).json(user);
});
module.exports = {
  getAllUsers,
  createUser,
  getSpecificUser,
  updateUser,
  deleteUser,
};
