import { MONGO_URI } from "@src/config/env";
import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI!);
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
};

export default connectDB;
