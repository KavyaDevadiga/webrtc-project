import { NextFunction, Request, Response } from "express";

export interface RouteItem {
  method: "get" | "post" | "put" | "patch" | "delete";
  path: string;
  handler: (
    request: Request,
    response: Response,
    next: NextFunction
  ) => Promise<void>;
  middlewares?: Array<
    (request: Request, response: Response, next: NextFunction) => void
  >;
}
