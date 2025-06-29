import express from "express";
import { isAuthenticated } from "../middlewares/authMiddleware.js";
import { getMessages, sendMessage } from "../controllers/messageController.js";
const router = express.Router({mergeParams: true});

router.post("/send/:receiverId",isAuthenticated, sendMessage);
router.get("/chats/:receiverId",isAuthenticated, getMessages);

export default router;