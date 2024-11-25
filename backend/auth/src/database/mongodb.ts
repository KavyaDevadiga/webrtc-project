import { MONGO_URI } from "@src/config/env";
import { Database } from "@src/database";
import { logger } from "@src/utils";
import mongoose from "mongoose";

export class MongoConnection extends Database {
  private constructor() {
    super();
  }
  protected async connect() {
    try {
      await mongoose.connect(MONGO_URI!);
      logger.info("MongoDB connected successfully");
    } catch (error) {
      logger.error("MongoDB connection error:", error);
    }
  }

  // MongoConnection Class

  public async closeConnection(): Promise<void> {
    try {
      await mongoose.disconnect();
      logger.info("MongoDB connection closed successfully.");
    } catch (error) {
      logger.error("Error while closing MongoDB connection:", error);
    }
  }

  // Singleton pattern for MongoConnection
  public static getInstance(): Promise<MongoConnection> {
    return super.getConnection() as Promise<MongoConnection>;
  }
}
