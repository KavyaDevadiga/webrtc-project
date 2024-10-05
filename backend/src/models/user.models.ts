import { userInterface } from "@src/interfaces";
import mongoose, { Schema } from "mongoose";

// Define the schema
const UserSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
});

// Create the model
export const UserModel = mongoose.model<userInterface.IUserModel>(
  "User",
  UserSchema
);
