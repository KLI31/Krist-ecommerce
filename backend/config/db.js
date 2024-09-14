import mongoose from "mongoose"; // Corrección del typo

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
    process.exit(1); // Detiene la aplicación en caso de error
  }
};

export default connectDB;
