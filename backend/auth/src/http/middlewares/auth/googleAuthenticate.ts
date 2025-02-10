import { NextFunction, Request, Response } from "express";

import { CLIENT_HOST } from "@src/config/env";
import { errorResponse } from "@src/http/responses/api.response";
import passport from "passport";

export const googleAuthMiddleware = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  passport.authenticate("google", {
    failureRedirect: `${CLIENT_HOST}/landing`,
    session: false,
  })(request, response, (err: Error) => {
    if (err) {
      errorResponse(response, "Login is unsuccessful", err);
    } else {
      next();
    }
  });
};
