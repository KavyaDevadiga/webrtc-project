import { Request } from "express";

export interface PassportUserInterface extends Request {
  user: {
    googleId: string;
    profile: {
      id: string;
      emails: [{ value: string }];
      displayName: string;
    };
    googleAccessToken: string;
    googleRefreshToken: string;
  };
}
