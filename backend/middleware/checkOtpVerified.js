import Otp from "../models/Otp.js";

export const checkOtpVerified = async (req, res, next) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "El email es necesario" });
  }

  const findOtp = await Otp.findOne({ email, isVerified: true });

  if (!findOtp) {
    return res
      .status(400)
      .json({ message: "No tienes otp, no puedes acceder a esta ruta" });
  }

  next();
};
