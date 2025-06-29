import asyncHandler from "../utilities/asyncHandler.js";
import { errorHandler } from "../utilities/errorHandler.js";
import User from "../models/userModel.js";
import jwt from "jsonwebtoken";

export const isAuthenticated = asyncHandler(async (req, res, next) => {
    const token = req.cookies.token;
    if(!token) {
        return next(new errorHandler("Please login to access this resource", 401));
    }

    const tokenData = jwt.verify(token, process.env.JWT_SECRET);
    req.user = tokenData;
    next();

});