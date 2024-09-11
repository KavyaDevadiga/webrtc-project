import express, { Request, Response, NextFunction } from "express";
import apiRoutesV1 from "@src/http/routes/v1/api";
import expressAsyncHandler from "express-async-handler";

// Define route configuration
export const routeConfig = {
  api: {
    prefix: "/api/v1",
    routes: () => processRoutes(apiRoutesV1),
  },
};

//To-Do: Move interfaces to separate file
interface RouteItem {
  method: "get" | "post" | "put" | "patch" | "delete";
  path: string;
  handler: (req: Request, res: Response, next: NextFunction) => Promise<void>;
  middlewares?: Array<
    (req: Request, res: Response, next: NextFunction) => void
  >;
}

function processRoutes(routes: RouteItem[]) {
  const router = express.Router();

  routes.forEach((routeItem) => {
    const { method, path, handler, middlewares = [] } = routeItem;

    // Combine route-specific middlewares and async handler for the route
    const allMiddlewares = [...middlewares, expressAsyncHandler(handler)];

    switch (method) {
      case "get":
        router.get(path, ...allMiddlewares);
        break;
      case "post":
        router.post(path, ...allMiddlewares);
        break;
      case "put":
        router.put(path, ...allMiddlewares);
        break;
      case "patch":
        router.patch(path, ...allMiddlewares);
        break;
      case "delete":
        router.delete(path, ...allMiddlewares);
        break;
      default:
        throw new Error(`Method ${method} not supported`);
    }
  });

  return router;
}
