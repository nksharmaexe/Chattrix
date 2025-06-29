import express from "express";
import { getOtherUsers, getProfile, login, logout, register} from "../controllers/userController.js";
import { isAuthenticated } from "../middlewares/authMiddleware.js";
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", isAuthenticated,logout);
router.get("/me", isAuthenticated,getProfile);
router.get("/others", isAuthenticated, getOtherUsers);

export default router;