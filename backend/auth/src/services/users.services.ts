import { userInterface } from "@src/interfaces";

export class UserService {
  private userRepository: userInterface.IUserRepository;
  constructor(userRepository: userInterface.IUserRepository) {
    this.userRepository = userRepository;
  }
  async getUsers(options: userInterface.UserWhereOptionType = {}) {
    const users = await this.userRepository.get(options);
    return users;
  }
  async getUserByGoogleId(profileId: string) {
    const users = await this.userRepository.get({ googleId: profileId });
    return users.length > 0 ? users[0] : null;
  }
  async addUser(user: userInterface.UserCreationOptionalAttributes) {
    return await this.userRepository.add(user);
  }
}
