import { userInterface } from "@src/interfaces";
import { UserRepository } from "@src/repository";

// Sample data just used for setup

export const getAllUsers = async (): Promise<userInterface.UnitUser[] | []> => {
  return await UserRepository.findUsers();
};
