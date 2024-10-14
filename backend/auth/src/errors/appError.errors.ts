import {
  BadRequestError,
  ForbiddedError,
  NotFoundError,
  UnAuthorizedError,
} from "@src/errors";
import { InternalServerError } from "./internalServerError.errors";
//factory pattern for error handling
export class AppError {
  create(type: string, ...args: any[]) {
    switch (type) {
      case "not_found":
        return new NotFoundError(args[0]);
      case "forbidded":
        return new ForbiddedError(args[0]);
      case "unauthorized":
        return new UnAuthorizedError();
      case "bad_request":
        return new BadRequestError(args[0]);
      default:
        throw new InternalServerError();
    }
  }
}
