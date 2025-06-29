import User from "../models/userModel.js";
import asyncHandler from "../utilities/asyncHandler.js";
import { errorHandler } from "../utilities/errorHandler.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = asyncHandler(async (req, res, next) => {
  let { fullname, gender, email, username, password } = req.body;
  if (!fullname || !email || !username || !password || !gender) {
    return next(new errorHandler("All fields are require", 400));
  }
  const user = await User.findOne({ username });
  if (user) {
    return next(new errorHandler("User already exist", 400));
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const avtarType = gender === "male" ? "boy" : "girl";
  const avtar = `https://avatar.iran.liara.run/public/${avtarType}?username=${username}`;

  const newUser = await User.create({
    fullname,
    gender,
    email,
    username,
    password: hashedPassword,
    avtar,
  });

  const tokenData = {
    _id: newUser._id,
  };

  const token = jwt.sign(tokenData, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  res
    .status(200)
    .cookie("token", token, {
      expires: new Date(
        Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
      ),
      httpOnly: true,
      secure:true,
      sameSite: "None",
    })
    .json({
      success: true,
      responseData: { newUser, token },
    });
});

export const login = asyncHandler(async (req, res, next) => {
  let { username, password } = req.body;

  if (!username || !password) {
    return next(
      new errorHandler("Please enter a valid username or password", 400)
    );
  }

  const user = await User.findOne({ username });

  if (!user) {
    return next(
      new errorHandler("Please enter a valid username or password", 400)
    );
  }

  const isValidPassword = await bcrypt.compare(password, user.password);

  if (!isValidPassword) {
    return next(
      new errorHandler("Please enter a valid username or password", 400)
    );
  }

  const tokenData = {
    _id: user._id,
  };

  const token = jwt.sign(tokenData, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  res
    .status(200)
    .cookie("token", token, {
      expires: new Date(
        Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
      ),
      httpOnly: true,
      secure: true,
      sameSite: "None",
    })
    .json({
      success: true,
      responseData: user,
    });
});

export const getProfile = asyncHandler(async (req, res, next) => {
  const userID = req.user._id;
  // console.log(req.user._id);
  const profile = await User.findById(userID);
  // console.log("profile", profile);
  res.status(200).json({
    success: true,
    responseData: profile,
  });
});

export const logout = asyncHandler(async (req, res, next) => {
  res
    .status(200)
    .cookie("token", "", {
      expires: new Date(Date.now()),
      httpOnly: true,
      secure:true,
      sameSite: "None",
    })
    .json({
      success: true,
      responseData: " Logout soccessfully",
    });
});

export const getOtherUsers = asyncHandler(async (req, res, next) => {
  const otherUsers = await User.find({ _id: { $ne: req.user._id } });
  // console.log("otherUsers", otherUsers);
  res.status(200).json({
    success: true,
    responseData: otherUsers,
  });
});
