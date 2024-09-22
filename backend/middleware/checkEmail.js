export const checkEmail = (req, res, next) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "El correo es necesario" });
  }

  next();
};
