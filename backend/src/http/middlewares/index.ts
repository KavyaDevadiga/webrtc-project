import generalMiddleware from "@src/http/middlewares/general";
import errorHandlerMiddleware from "@src/http/middlewares/errorHandler";

export default {
  general: generalMiddleware,
  errorHandler: errorHandlerMiddleware,
};
