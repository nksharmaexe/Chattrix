import dotenv from "dotenv";
dotenv.config();

import {app , server } from './socket/socket.js';
import express from "express";
import connectDB from "./db/connectionDb.js";
import cookieParser from "cookie-parser";
import cors from "cors";

const PORT = process.env.PORT || 8080;
connectDB();


app.use(cors({
    origin:[process.env.CLIENT_URL],
    credentials: true
}))
app.use(express.json());
app.use(cookieParser());

// root
app.get("/",(req,res)=>{
    res.send({
        activeStatus:true,
        message:"Server is running"
    })
})

// routes
import userRoute from "./routes/userRoute.js";
import messageRoute from "./routes/messageRoute.js";
app.use("/api/message", messageRoute);
app.use("/api/user", userRoute);

// middlewares
import errorMiddleware from "./middlewares/errorMiddleware.js";
app.use(errorMiddleware);


server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
