import transporter from "../config/mailer.js";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import Otp from "../models/Otp.js";
import { generateOtp } from "../utils/generateOtp.js";
import fs from "fs";
import jwt from "jsonwebtoken";
import crypto from "crypto";

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Informacion incorrecta" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ message: "Contraseña Incorrecta, intente nuevamente" });
    }

    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    const refreshToken = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(200).json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        profilePic: user.profilePic,
        token,
        refreshToken,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error en el servidor" });
  }
};

export const register = async (req, res) => {
  try {
    const { name, lastName, isAdmin, email, password, profilePic } = req.body;
    const userExist = await User.findOne({ email });
    const hashedPassword = await bcrypt.hash(password, 10);

    if (userExist) {
      return res
        .status(400)
        .json({ message: "El usuario ya existe, por favor inicie sesión" });
    }

    const user = await User.create({
      name,
      lastName,
      email,
      isAdmin,
      password: hashedPassword,
      profilePic,
    });

    const token = jwt.sign(
      { id: user._id, email: user.email, isAdmin: user.isAdmin },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({ token, user });
  } catch (error) {
    console.log(error);
    res.status(500).json(error, { message: "Error en el servidor" });
  }
};

export const sendOtp = async (req, res) => {
  const { email } = req.body;
  const template = fs.readFileSync("./template/index.html", "utf-8");

  if (!email) {
    return res
      .status(400)
      .json({ message: "El correo electronico es requerido" });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ message: "Si el correo existe, se envió un OTP" });
    }

    const { otp, hashedOtp } = generateOtp();
    const emailContent = template.replace("{{OTP_CODE}}", otp);

    const newOtp = new Otp({
      email,
      otp: hashedOtp,
    });
    await newOtp.save();

    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: "Código de verificación",
      html: emailContent,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return res.status(500).json({ message: error.message });
      }
      res.status(200).json({ message: "Se envió un OTP a tu correo" });
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export const verifyOtp = async (req, res) => {
  const { email, otp } = req.body;

  if (!otp || !email) {
    return res.status(400).json({ message: "El OTP es requerido" });
  }

  try {
    const isMatch = crypto.createHash("sha256").update(otp).digest("hex");
    const existingOtp = await Otp.findOne({ email, otp: isMatch });
    if (!existingOtp) {
      return res.status(400).json({ message: "OTP incorrecto o expirado" });
    }

    existingOtp.isVerified = true;
    await existingOtp.save();

    res.status(200).json({ message: "OTP correcto" });
  } catch (error) {
    console.log(error);
  }
};

export const resetPassword = async (req, res) => {
  const { email, newPassword } = req.body;

  if (!email || !newPassword) {
    return res.status(400).json({ message: "Todos los campos son requeridos" });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "No se encontro un usuario" });
    }

    const existingOtp = await Otp.findOne({ email, isVerified: true });
    console.log(existingOtp);
    if (!existingOtp) {
      return res.status(400).json({ message: "No se ha verificado el OTP" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    await User.updateOne({ email }, { password: hashedPassword });
    await Otp.deleteOne({ _id: existingOtp._id });
    res.status(200).json({ message: "Contraseña actualizada con éxito" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error en el servidor" });
  }
};
