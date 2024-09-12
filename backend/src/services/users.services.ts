import { userInterface } from "@src/interfaces";

// Sample data just used for setup
let users: userInterface.UnitUser[] = [
  { id: 1, name: "John Doe", age: 20 },
  { id: 2, name: "Jane Smith", age: 22 },
];
export const getAllUsers = async (): Promise<userInterface.UnitUser[]> => {
  return users;
};
