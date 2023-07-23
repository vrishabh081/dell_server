const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const AppError = require("../utils/appError");
const AuthModel = require("../models/authModel");

// Sign up-
const signUp = asyncHandler(async (req, res, next) => {
  const { name, userName, email, password } = req.body;

  // if user with this email exists
  const isEmailExists = await AuthModel.findOne({ email });
  if (isEmailExists) {
    return next(new AppError(`This ${email} already exists please login`, 400));
  }

  // if user with this userName exists
  const isUserNameExists = await AuthModel.findOne({ userName });
  if (isUserNameExists) {
    return next(new AppError(`This ${userName} already exists please login`, 400));
  }

  // if user not exists then create user
  // hash password
  const hashPassword = await bcrypt.hash(
    password,
    Number(process.env.SALT_ROUND)
  );
  // create user
  await AuthModel.create({
    name,
    userName,
    email,
    password: hashPassword,
  });

  // send response
  const response = {
    status: "success",
    message: "Signup Successfully!",
  };

  return res.status(200).json(response);
});

// Login-
const logIn = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  // if user is not exists throw error
  const isUserExists = await AuthModel.findOne({ email });
  if (!isUserExists) {
    next(new AppError(`You have to Signup first`, 404));
    return;
  }
  // if user exists then check password
  const isPassword = await bcrypt.compare(password, isUserExists.password);
  if (!isPassword) {
    next(new AppError(`Invalid credentials`, 400));
    return;
  }
  // if password is match then create jwt token
  const token = jwt.sign({ _id: isUserExists._id }, process.env.SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES,
  });

  // send success response
  const response = {
    status: "success",
    message: "Successfully Login",
    data: {
      token,
      name: isUserExists.name,
      role: isUserExists.role
    },
  };
  return res.status(200).json(response);
});

module.exports = {signUp, logIn};