import { userController } from "@src/http/controllers/v1";
import { routeItemInterface } from "@src/interfaces";

//To-Do: Move interfaces to separate folder

const userRoutes: routeItemInterface.RouteItem[] = [
  // Dummy routes imported
  {
    method: "get",
    path: "/users",
    handler: userController.getAllUsers,
    middlewares: [], // Route-specific middlewares if any
  },
];

export default userRoutes;
