import { userInterface } from "@src/interfaces";
import { User } from "@src/models";

export class UserService {
  private userRepository: userInterface.IUserRepository;
  private UserSerializer: userInterface.IUserSerializer;

  constructor(
    userRepository: userInterface.IUserRepository,
    UserSerializer: userInterface.IUserSerializer
  ) {
    this.userRepository = userRepository;
    this.UserSerializer = UserSerializer;
  }

  async getUsers(
    options: userInterface.UserWhereOptionType = {},
    attributes?: string[]
  ): Promise<userInterface.IUserAttributes[]> {
    const users = await this.userRepository.get(options, [
      "id",
      "name",
      "email",
      "googleId",
    ]);
    return users.length > 0
      ? this.UserSerializer.toUserLIst(users as User[])
      : [];
  }

  async getUserByGoogleId(
    profileId: string,
    attributes?: string[]
  ): Promise<userInterface.IUserAttributes | null> {
    const users = await this.userRepository.get({ googleId: profileId }, [
      "id",
    ]);
    if (!users || users.length === 0) {
      throw new Error("User not found");
    }
    return users[0]
      ? this.UserSerializer.toUserDetails(users[0] as User)
      : null;
  }

  async addUser(
    user: userInterface.UserCreationOptionalAttributes,
    googleKeys?: Partial<userInterface.IGoogleKeysAttributes>[]
  ): Promise<userInterface.IUserAttributes | null> {
    const createdUser = await this.userRepository.create(user);
    if (googleKeys && googleKeys.length > 0) {
      await this.userRepository.addGoogleKeys(createdUser, googleKeys[0]);
    }

    return createdUser
      ? this.UserSerializer.toUserDetails(createdUser as User)
      : null;
  }

  async addGoogleKey(
    userId: string,
    googleKeys?: Partial<userInterface.IGoogleKeysAttributes>[]
  ): Promise<void> {
    const users = await this.userRepository.get({ id: userId }, ["id"]);
    if (!users || users.length === 0) {
      throw new Error("User not found");
    }
    if (googleKeys && googleKeys.length > 0) {
      await this.userRepository.addGoogleKeys(users[0], googleKeys[0]);
    }
    return;
  }
}
