import { userInterface } from "@src/interfaces";
import { User } from "@src/models";

export class UserSerializer implements userInterface.IUserSerializer {
  toUserLIst(users: User[]): userInterface.IUserAttributes[] {
    return users.map((user) => ({
      id: user.id,
      name: user.name,
      email: user.email,
      googleId: user.googleId,
    }));
  }

  toUserDetails(user: User): userInterface.IUserAttributes {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      googleId: user.googleId,
    };
  }
  toResponseWithGoogleKey(
    user: User,
    googleKeyData: Partial<userInterface.IGoogleKeysAttributes>[]
  ): userInterface.IUserAttributesWithGoogleKeys {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      googleId: user.googleId,
      googleKeys: googleKeyData.map((key) => ({
        id: key.id,
        googleAccessKey: key.googleAccessKey,
        googleRefreshKey: key.googleRefreshKey,
      })),
    };
  }
}
