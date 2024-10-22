import middlewares from "@src/http/middlewares";
import { routeConfig } from "@src/http/routes";
import express from "express";

export const initializeHttpServer = (app: express.Express): void => {
  // Apply middlewares
  app.use(middlewares.general);
  app.use(middlewares.requestLogger.getMorganMiddleware());

  // Register routes
  app.use(routeConfig.api.prefix, routeConfig.api.routes());

  app.use(middlewares.errorHandler);
};
