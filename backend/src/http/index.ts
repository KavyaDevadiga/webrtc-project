import middlewares from "@src/http/middlewares";
import express from "express";

export const initializeHttpServer = (app: express.Express): void => {
  // Apply middlewares
  app.use(middlewares.general);

  // Register routes
  //   app.use("/api", userRoutes);

  app.use(middlewares.errorHandler);
};
