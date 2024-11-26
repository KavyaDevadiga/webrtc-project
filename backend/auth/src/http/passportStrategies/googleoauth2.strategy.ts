import {
  GOOGLE_OAUTH_CLIENT_ID,
  GOOGLE_OAUTH_CLIENT_SECRET,
} from "@src/config/env";
import { BaseStrategy } from "@src/http/passportStrategies";
import { UserRepository } from "@src/repository";
import { UserService } from "@src/services";
import { logger } from "@src/utils/logger";
import { Strategy } from "passport-google-oauth20";

export class GoogleStrategy extends BaseStrategy {
  constructor() {
    if (!GOOGLE_OAUTH_CLIENT_ID || !GOOGLE_OAUTH_CLIENT_SECRET) {
      console.log(GOOGLE_OAUTH_CLIENT_SECRET);
      throw new Error("Google OAuth credentials are not set.");
    }
    const strategy = new Strategy(
      {
        clientID: GOOGLE_OAUTH_CLIENT_ID,
        clientSecret: GOOGLE_OAUTH_CLIENT_SECRET,
        callbackURL: "http://localhost:4002/api/v1/auth/google/callback",
      },
      async (
        accessToken: string,
        refreshToken: string,
        profile: any,
        done: (error: any, user?: any) => void
      ) => {
        try {
          // Check if user already exists
          const userRepository = new UserRepository();
          const userService = new UserService(userRepository);
          logger.error("---------------", profile);
          logger.info("---------------", accessToken);
          logger.info("---------------", refreshToken);

          // let user = await userService.getUserByGoogleId(profile.id);
          // if (user) {
          //   return done(null, user);
          // }
          // user = await userService.addUser({
          //   googleId: profile.id,
          //   name: profile.displayName,
          //   email: profile.email,
          // });
          done(null, {
            googleId: profile.id,
            username: profile.displayName,
            thumbnail: profile._json.picture,
            accessToken,
            refreshToken,
          });
        } catch (err) {
          logger.error("error in google strategy", err);
          done(err, null);
        }
      }
    );
    super(strategy);
  }
}
