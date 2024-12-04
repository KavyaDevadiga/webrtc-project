import { successResponse } from "@src/http/responses/api.response";
import { passportUserInterface } from "@src/interfaces";
import { UserRepository } from "@src/repository";
import { UserSerializer } from "@src/serializers";
import { TokenService, UserService } from "@src/services";
import { isPassportUserInterface } from "@src/utils";
import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import passport from "passport";

class GoogleAuthController {
  private userService: UserService;

  constructor(userService: UserService) {
    this.userService = userService;
  }
  googleLogin = async (
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
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
    request: Request | passportUserInterface.PassportUserInterface,
    response: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      if (!isPassportUserInterface(request))
        throw new Error("Google user not found");
      let { profile, googleAccessToken, googleRefreshToken } = request.user;
      let user = await this.userService.getUserByGoogleId(profile.id);
      if (!user) {
        user = await this.userService.addUser(
          {
            googleId: profile.id,
            name: profile.displayName,
            email: profile.emails[0].value,
          },
          [
            {
              googleAccessKey: googleAccessToken,
              googleRefreshKey: googleRefreshToken,
            },
          ]
        );
      } else {
        await this.userService.addGoogleKey(user.id as string, [
          {
            googleAccessKey: googleAccessToken,
            googleRefreshKey: googleRefreshToken,
          },
        ]);
      }
      const token = await this.userService.generateAndStoreToken({
        userId: user?.id as string,
      });
      successResponse(
        response,
        "Login Successful",
        { ...user, token },
        StatusCodes.OK
      );
    } catch (error) {
      next(error);
    }
  };
}
const userRepository = new UserRepository();
const userSerializer = new UserSerializer();
const tokenService = new TokenService();
const userService = new UserService(
  userRepository,
  userSerializer,
  tokenService
);
export const googleAuthController = new GoogleAuthController(userService);
