import { errorResponse } from "@src/http/responses/api.response";
import { NextFunction, Request, Response } from "express";
import passport from "passport";

export const googleAuthMiddleware = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  passport.authenticate("google", { failureRedirect: "/home", session: false })(
    request,
    response,
    (err: Error) => {
      if (err) {
        errorResponse(response, "Login is unsuccessful", err);
      } else {
        next();
      }
    }
  );
};
