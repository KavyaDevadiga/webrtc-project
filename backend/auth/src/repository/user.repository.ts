import { userInterface } from "@src/interfaces";
import { models } from "@src/models";
import { BaseRepository } from "@src/repository/base.repository";

export class UserRepository
  extends BaseRepository<
    userInterface.IUserAttributes,
    userInterface.IUserCreationAttributes
  >
  implements userInterface.IUserRepository
{
  constructor() {
    super(models.User);
  }
}
