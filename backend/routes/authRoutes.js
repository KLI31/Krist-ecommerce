import {
  register,
  login,
  sendOtp,
  resetPassword,
} from "../controllers/auth.js";
import express from "express";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/sendotp", sendOtp);
router.post("/resetpassword", resetPassword);

export default router;
