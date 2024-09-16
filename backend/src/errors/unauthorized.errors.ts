import { BaseError } from "@src/errors";
import { StatusCodes } from "http-status-codes";

export class UnAuthorizedError extends BaseError {
  constructor(message: string) {
    super(message, StatusCodes.UNAUTHORIZED);
  }
}
