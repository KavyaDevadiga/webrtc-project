import { googleAuthController } from "@src/http/controllers/v1";
import { googleAuthMiddleware } from "@src/http/middlewares";
import { routeItemInterface } from "@src/interfaces";

const authRoutes: routeItemInterface.RouteItem[] = [
  {
    method: "get",
    path: "/google/login",
    handler: googleAuthController.googleLogin,
    middlewares: [],
  },
  {
    method: "get",
    path: "/auth/google/callback",
    handler: googleAuthController.googleCallback,
    middlewares: [googleAuthMiddleware],
  },
];

export default authRoutes;
