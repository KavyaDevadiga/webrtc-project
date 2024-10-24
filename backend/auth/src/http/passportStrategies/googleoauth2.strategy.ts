import {
  GOOGLE_OAUTH_CLIENT_ID,
  GOOGLE_OAUTH_CLIENT_SECRET,
} from "@src/config/env";
import { BaseStrategy } from "@src/http/passportStrategies";
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
          // let user = await User.findOne({ googleId: profile.id });
          // if (user) {
          //   return done(null, user);
          // }
          // Create a new user if it doesn't exist
          // user = await new User({
          //   googleId: profile.id,
          //   username: profile.displayName,
          //   thumbnail: profile._json.picture,
          // }).save();
          console.log("---------------", accessToken);
          console.log("---------------", refreshToken);
          console.log("---------------", profile);

          done(null, {
            googleId: profile.id,
            username: profile.displayName,
            thumbnail: profile._json.picture,
            accessToken,
            refreshToken,
          });
        } catch (err) {
          logger.error(err);
          done(err, null);
        }
      }
    );
    super(strategy);
  }
}
