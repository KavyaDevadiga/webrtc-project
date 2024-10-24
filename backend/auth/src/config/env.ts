import * as dotenv from "dotenv";

dotenv.config();

export const PORT: number = parseInt(process.env.PORT as string, 10);

//Mongo Credentials
export const MONGO_URI: string = process.env.MONGO_URI as string;

//Google OAuth Credentials
export const GOOGLE_OAUTH_CLIENT_ID: string =
  process.env.GOOGLE_OAUTH_CLIENT_ID ?? "";
export const GOOGLE_OAUTH_CLIENT_SECRET: string =
  process.env.GOOGLE_OAUTH_CLIENT_SECRET ?? "";
