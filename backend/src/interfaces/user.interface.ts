import { Document } from "mongoose";

export interface User {
  name: string;
  email: string;
}

export interface UnitUser extends User {
  entityId: string;
}

export interface IUserModel extends Document, UnitUser {
  _id: string;
}

export interface IUserRepository {
  get(): Promise<IUserModel[] | []>;
  add(userData: Partial<UnitUser>): Promise<IUserModel>; // Change this to return Promise<IUserModel>
  // Add other user-specific methods here
}

//ToDo: need to find it's purpose
// export interface Users {
//   [key: string]: UnitUser;
// }
