import { userInterface } from "@src/interfaces";
import { IUserRepository } from "@src/interfaces/user.interface";
import { UserModel } from "@src/models";
import { BaseRepository } from "@src/repository/base.repository";

export class UserRepository
  extends BaseRepository<userInterface.IUserModel>
  implements IUserRepository
{
  constructor() {
    super(UserModel);
  }
}
