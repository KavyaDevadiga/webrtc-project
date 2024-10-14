// Sample data just used for setup

import { userInterface } from "@src/interfaces";

export class UserService {
  private userRepository: userInterface.IUserRepository;
  constructor(userRepository: userInterface.IUserRepository) {
    this.userRepository = userRepository;
  }
  async getUsers() {
    const users = await this.userRepository.get();
    return users;
  }
  async addUser(user: Partial<userInterface.UnitUser>) {
    await this.userRepository.add(user);
  }
}
