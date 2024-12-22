import { POSTGRESS_URI } from "@src/config/env";
import { Database } from "@src/database";
import { initializeModel } from "@src/models";
import { logger } from "@src/utils";
import { Sequelize } from "sequelize";

export class PostgressConnection extends Database {
  private sequelize: Sequelize | null;
  private constructor() {
    super();
    this.sequelize = null;
  }
  protected async connect() {
    try {
      this.sequelize = new Sequelize(POSTGRESS_URI!, {
        logging: (message) => logger.debug(message),
      });
      await this.sequelize.authenticate();
      logger.info("Postgres connection established successfully");
      this.initializeModels();
      await this.syncDatabase();
      logger.info("Postgres connected successfully");
    } catch (error) {
      logger.error("Postgres connection error:", error);
    }
  }

  private async initializeModels() {
    try {
      initializeModel.forEach(
        (initializeModel: (sequelize: Sequelize) => void) =>
          initializeModel(this.sequelize!)
      );

      Object.values(this.sequelize!.models).forEach((model: any) => {
        if (typeof model.associate === "function") {
          model.associate();
        }
      });
      logger.info("Postgres models initialized successfully");
    } catch (error) {
      logger.error("Postgres models sync error:", error);
    }
  }

  private async syncDatabase() {
    try {
      await this.sequelize!.sync();
      logger.info("Postgres database synced successfully");
    } catch (error) {
      logger.error("Postgres database sync error:", error);
    }
  }

  public async closeConnection(): Promise<void> {
    try {
      if (this.sequelize) {
        await this.sequelize.close();
        logger.info("Postgres connection closed successfully.");
      } else {
        logger.warn("No Postgres connection found to close.");
      }
    } catch (error) {
      logger.error("Error while closing Postgres connection:", error);
    }
  }

  // Singleton pattern for MongoConnection
  public static getInstance(): Promise<PostgressConnection> {
    return super.getConnection() as Promise<PostgressConnection>;
  }
}
