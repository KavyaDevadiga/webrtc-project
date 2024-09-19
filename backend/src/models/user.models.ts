import { UnitUser } from "@src/interfaces/user.interface";
import mongoose, { Document, Schema } from "mongoose";

// Define the schema
const UserSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
});

// Define the TypeScript interface
export interface IUserModel extends Document, UnitUser {
  _id: string;
}

// Create the model
export const UserModel = mongoose.model<IUserModel>("User", UserSchema);
