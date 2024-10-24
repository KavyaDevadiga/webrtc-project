import authRoutes from "@src/http/routes/v1/auth.routes";
import userRoutes from "@src/http/routes/v1/user.routes";

export default [
  //Dummy route imported
  ...userRoutes,
  ...authRoutes,
];
