import {
  GOOGLE_OAUTH_CLIENT_ID,
  GOOGLE_OAUTH_CLIENT_SECRET,
  SERVER_URL,
} from "@src/config/env";
import { BaseStrategy } from "@src/http/passportStrategies";
import { logger } from "@src/utils/logger";
import { Strategy } from "passport-google-oauth20";

export class GoogleStrategy extends BaseStrategy {
  constructor() {
    if (!GOOGLE_OAUTH_CLIENT_ID || !GOOGLE_OAUTH_CLIENT_SECRET) {
      throw new Error("Google OAuth credentials are not set.");
    }
    const strategy = new Strategy(
      {
        clientID: GOOGLE_OAUTH_CLIENT_ID,
        clientSecret: GOOGLE_OAUTH_CLIENT_SECRET,
        callbackURL: `${SERVER_URL}/api/v1/auth/google/callback`,
        scope: [
          "email",
          "profile",
          "https://www.googleapis.com/auth/calendar.events",
        ],
      },
      async (
        accessToken: string,
        refreshToken: string,
        profile: any,
        done: (error: any, user?: any) => void
      ) => {
        try {
          done(null, {
            googleId: profile.id,
            profile,
            googleAccessToken: accessToken,
            googleRefreshToken: refreshToken,
          });
        } catch (err) {
          logger.error("error in google strategy", err);
          done(err, null);
        }
      }
    );
    strategy.authorizationParams = () => ({
      access_type: "offline", // Request a refresh token
      prompt: "consent", // Force consent screen to get refreshToken
    });
    super(strategy);
  }
}
