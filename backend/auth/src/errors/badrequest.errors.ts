import { BaseError } from "@src/errors/base.errors";
import { StatusCodes } from "http-status-codes";

export class BadRequestError extends BaseError {
  constructor(message: string) {
    super(message, StatusCodes.BAD_REQUEST);
  }
}
