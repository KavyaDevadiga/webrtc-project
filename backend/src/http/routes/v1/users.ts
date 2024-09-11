import { NextFunction, Request, Response } from "express";

//To-Do: Move interfaces to separate folder
interface RouteItem {
  method: "get" | "post" | "put" | "patch" | "delete";
  path: string;
  handler: (req: Request, res: Response, next: NextFunction) => Promise<void>;
  middlewares?: Array<
    (req: Request, res: Response, next: NextFunction) => void
  >;
}

const userRoutes: RouteItem[] = [
  // Dummy routes imported
  {
    method: "get",
    path: "/users",
    handler: async (req: Request, res: Response, next: NextFunction) => {},
    middlewares: [], // Route-specific middlewares if any
  },
];

export default userRoutes;
