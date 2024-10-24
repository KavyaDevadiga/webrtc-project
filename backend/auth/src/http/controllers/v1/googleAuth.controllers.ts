import { GoogleStrategy } from "@src/http/passportStrategies";
import { successResponse } from "@src/http/responses/api.response";
import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import passport from "passport";

class GoogleAuthController {
  googleLogin = async (
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      new GoogleStrategy();
      passport.authenticate("google", {
        scope: [
          "email",
          "profile",
          "https://www.googleapis.com/auth/calendar.events",
        ],
      })(request, response, next);
    } catch (error) {
      next(error);
    }
  };
  googleCallback = async (
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void> => {
    successResponse(response, "Login Successful", [], StatusCodes.OK);
  };
}
export const googleAuthController = new GoogleAuthController();
