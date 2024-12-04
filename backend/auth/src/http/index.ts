import middlewares from "@src/http/middlewares";
import { GoogleStrategy } from "@src/http/passportStrategies";
import { routeConfig } from "@src/http/routes";
import express, { Request, Response } from "express";
import path from "path";

export const initializeHttpServer = (app: express.Express): void => {
  // Apply middlewares
  middlewares.general(app);
  new GoogleStrategy();

  //FE testing to be removed once tested
  ///////////////////////////////
  app.use(express.static(path.join(__dirname, "public")));
  app.get("/home", (request: Request, response: Response) => {
    return response.sendFile(path.join(__dirname, "public", "index.html"));
  });
  app.get("/favicon.ico", (req, res) => res.status(204));
  //////////////////////

  app.use(middlewares.requestLogger.getMorganMiddleware());
  // Register routes
  app.use(routeConfig.api.prefix, routeConfig.api.routes());
  app.use(middlewares.errorHandler);
};
