import { PostgressConnection, RedisConnection } from "@src/database";

import { PORT } from "@src/config/env";
import { startSocketServer } from "@src/sockets";
import { logger } from "@src/utils";

class AppServer {
  private port: number;

  constructor() {
    if (!PORT) {
      logger.error("No port value specified in the environment variables.");
      process.exit(1);
    }
    this.port = PORT;
  }

  public async start(): Promise<void> {
    try {
      const db = await PostgressConnection.getInstance();
      const redis = await RedisConnection.getInstance();

      //not sure whether http server would be usefull
      // initializeHttpServer(this.app);

      // this.app.listen(this.port, () => {
      //   logger.info(`Server is listening on port ${this.port}`);
      // });

      //initiate socket server
      startSocketServer(this.port);

      this.setupGracefulShutdown();
    } catch (error) {
      logger.error("Failed to start the server:", error);
      process.exit(1);
    }
  }

  private setupGracefulShutdown(): void {
    process.on("SIGINT", async () => {
      logger.info("Received SIGINT. Gracefully shutting down...");
      await this.closeResources();
      process.exit(0);
    });

    process.on("SIGTERM", async () => {
      logger.info("Received SIGTERM. Gracefully shutting down...");
      await this.closeResources();
      process.exit(0);
    });

    process.on("unhandledRejection", (reason) => {
      logger.error("Unhandled promise rejection:", reason);
    });

    process.on("uncaughtException", (error) => {
      logger.error("Uncaught exception:", error);
      process.exit(1);
    });
  }

  private async closeResources(): Promise<void> {
    try {
      const db = await PostgressConnection.getInstance();
      await db.closeConnection();
      const redis = await RedisConnection.getInstance();
      await redis.closeConnection();
    } catch (error) {
      logger.error("Error while closing database connection:", error);
    }
  }
}

// Start the server
(async () => {
  const server = new AppServer();
  await server.start();
})();
