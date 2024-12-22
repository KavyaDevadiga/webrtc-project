import {
  RedisClientType,
  RedisFunctions,
  RedisModules,
  RedisScripts,
  createClient,
} from "redis";

import { REDIS_URI } from "@src/config/env";
import { Database } from "@src/database";
import { logger } from "@src/utils";

export class RedisConnection extends Database {
  private redisClient: RedisClientType<
    RedisModules,
    RedisFunctions,
    RedisScripts
  > | null;
  private constructor() {
    super();
    this.redisClient = null;
  }

  protected async connect() {
    try {
      // Adjusted to handle extended Redis client types (e.g., RedisGraph)
      this.redisClient = await createClient({ url: REDIS_URI! }).connect();
      logger.info("Redis connected successfully");
    } catch (error) {
      logger.error("Redis connection error:", error);
    }
  }

  public async closeConnection(): Promise<void> {
    try {
      if (this.redisClient) {
        await this.redisClient.disconnect();
        logger.info("Redis connection closed successfully.");
      } else {
        logger.warn("Redis client is not initialized.");
      }
    } catch (error) {
      logger.error("Error while closing Redis connection:", error);
    }
  }

  // Singleton pattern for RedisConnection
  public static getInstance(): Promise<RedisConnection> {
    return super.getConnection() as Promise<RedisConnection>;
  }

  public getRedisClient(): RedisClientType<
    RedisModules,
    RedisFunctions,
    RedisScripts
  > | null {
    return this.redisClient;
  }
}
