import {
  register,
  login,
  sendOtp,
  resetPassword,
  verifyOtp,
} from "../controllers/auth.js";
import express from "express";
import { checkEmail } from "../middleware/checkEmail.js";
import { checkOtpVerified } from "../middleware/checkOtpVerified.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/sendotp", sendOtp);
router.post("/verifyotp", verifyOtp, checkEmail, checkOtpVerified);
router.post("/resetpassword", resetPassword, checkOtpVerified, resetPassword);

export default router;
