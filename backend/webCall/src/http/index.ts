import express from "express";

import middlewares from "@src/http/middlewares";
import { routeConfig } from "@src/http/routes";

export const initializeHttpServer = (app: express.Express): void => {
  // Apply middlewares
  middlewares.general(app);

  app.use(middlewares.requestLogger.getMorganMiddleware());
  // Register routes
  app.use(routeConfig.api.prefix, routeConfig.api.routes());
  app.use(middlewares.errorHandler);
};
