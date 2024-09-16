import middlewares from "@src/http/middlewares";
import express from "express";

export const initializeHttpServer = (app: express.Express): void => {
  // Apply middlewares
  app.use(middlewares.general);
  app.use(middlewares.requestLogger.getMorganMiddleware());

  // Register routes
  //   app.use("/api", userRoutes);

  app.use(middlewares.errorHandler);
};
