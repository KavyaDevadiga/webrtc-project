import { Logger } from "@src/utils";
import { RequestHandler } from "express";
import morgan from "morgan";
export default class MorganLogger {
  public static getMorganMiddleware(): RequestHandler {
    const morganFormat = ":method :url :status :response-time ms";
    const logger = Logger.getInstance();
    const stream = {
      write: (message: string) => {
        const logObject = {
          method: message.split(" ")[0],
          url: message.split(" ")[1],
          status: message.split(" ")[2],
          responseTime: message.split(" ")[3],
        };
        logger.info(JSON.stringify(logObject));
      },
    };

    return morgan(morganFormat, { stream });
  }
}
