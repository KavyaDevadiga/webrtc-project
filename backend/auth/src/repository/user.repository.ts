import { userInterface } from "@src/interfaces";
import { User } from "@src/models";
import { BaseRepository } from "@src/repository/base.repository";
import { Model } from "sequelize";

export class UserRepository
  extends BaseRepository<
    userInterface.IUserAttributes,
    userInterface.IUserCreationAttributes
  >
  implements userInterface.IUserRepository
{
  constructor() {
    super(User);
  }
  async addGoogleKeys(
    user: User,
    googleKeyData: Partial<userInterface.IGoogleKeysAttributes>
  ): Promise<
    Model<
      userInterface.IGoogleKeysAttributes,
      userInterface.IGoogkeKeyCreationAttributes
    >
  > {
    if (!user.createGoogleKey) {
      throw new Error("User does not have addGoogleKeys method");
    }

    return user.createGoogleKey(googleKeyData);
  }
}
