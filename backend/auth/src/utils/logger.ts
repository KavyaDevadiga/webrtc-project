import winston from "winston";

// Custom format for console logging with colors
export class Logger {
  private static instance: winston.Logger;

  private constructor() {}

  public static getInstance(): winston.Logger {
    if (!Logger.instance) {
      Logger.instance = winston.createLogger({
        level: "info",
        format: winston.format.combine(
          winston.format.timestamp(),
          winston.format.json()
        ),
        transports: [
          new winston.transports.Console({
            format: winston.format.combine(
              winston.format.colorize(),
              winston.format.printf(({ level, message, timestamp }) => {
                return `${level}: ${JSON.stringify(message)}`;
              })
            ),
          }),
          new winston.transports.File({
            filename: "app.log",
            format: winston.format.combine(
              winston.format.timestamp(),
              winston.format.json()
            ),
          }),
        ],
      });
    }
    return Logger.instance;
  }
}

export const logger = Logger.getInstance();
