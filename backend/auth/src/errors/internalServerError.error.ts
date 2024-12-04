import { BaseError } from "@src/errors";
import { StatusCodes } from "http-status-codes";

export class InternalServerError extends BaseError {
  constructor() {
    super(`Something went wrong`, StatusCodes.INTERNAL_SERVER_ERROR, false);
  }
}
