import cors from "cors";
import express from "express";
import helmet from "helmet";

export default (app: express.Express): void => {
  app.use(express.urlencoded({ extended: true }));
  app.use(cors());
  app.use(helmet());
  app.use(express.json());
  app.use(
    cors({
      origin: "*",
      methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"],
    })
  );
};
