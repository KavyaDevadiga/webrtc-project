import { googleAuthMiddleware } from "@src/http/middlewares/auth/googleAuthenticate";
import errorHandlerMiddleware from "@src/http/middlewares/errorHandler";
import generalMiddleware from "@src/http/middlewares/general";
import requestLogger from "@src/http/middlewares/requestLogger";

export default {
  general: generalMiddleware,
  errorHandler: errorHandlerMiddleware,
  requestLogger: requestLogger,
};
export { googleAuthMiddleware };
