import { BaseError } from "@src/errors";
import { StatusCodes } from "http-status-codes";

export class ForbiddedError extends BaseError {
  constructor(message: string) {
    super(message, StatusCodes.FORBIDDEN);
  }
}
