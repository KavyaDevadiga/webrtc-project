import { BaseError } from "@src/errors";
import { StatusCodes } from "http-status-codes";

export class UnAuthorizedError extends BaseError {
  constructor() {
    super("Unauthorized", StatusCodes.UNAUTHORIZED);
  }
}
