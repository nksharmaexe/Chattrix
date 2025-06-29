// import {Server} from 'socket.io'
// import https from 'https'

// import dotenv from "dotenv";
// dotenv.config();

// import express from 'express'

// const app = express();

// const server = https.createServer(app);
// const io = new Server(server, {
//     cors: {
//         origin: process.env.CLIENT_URL,
//         // methods: ["GET", "POST"],
//     },
// });

// io.on('connection', socket => {
//     console.log('a user connected', socket.id);

//     // socket.on('disconnect', () => {
//     //     console.log('user disconnected');
//     // });
// });

// export {io, server ,app}

import { Server } from "socket.io";
import http from "http"; // changed from https
import dotenv from "dotenv";
dotenv.config();

import express from "express";
const app = express();

const server = http.createServer(app); // use http
const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL,
  },
});

const userSocketMap = {};

io.on("connection", (socket) => {
  // console.log('a user connected', socket.id);
  const userId = socket.handshake.query.userId;

  if (!userId) return;

  userSocketMap[userId] = socket.id;
  io.emit("onlineUsers", Object.keys(userSocketMap));

  socket.on("disconnect", () => {
    delete userSocketMap[userId];
    io.emit("onlineUsers", Object.keys(userSocketMap));
  });
});

const getSocketId = (userId) => userSocketMap[userId];

export { io, server, app, getSocketId };
