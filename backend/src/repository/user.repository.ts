import { UnitUser } from "@src/interfaces/user.interface";
import { IUserModel, UserModel } from "@src/models";

export const createUser = async (userData: UnitUser): Promise<IUserModel> => {
  const user = new UserModel(userData);
  return await user.save();
};

export const findUsers = async (): Promise<IUserModel[] | []> => {
  return UserModel.find();
};
