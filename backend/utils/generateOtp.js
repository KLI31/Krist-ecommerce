import crypto from "crypto";

export const generateOtp = () => {
  const otp = Math.floor(10000 + Math.random() * 90000).toString();
  const hashedOtp = crypto.createHash("sha256").update(otp).digest("hex");
  return { otp, hashedOtp };
};
