import { BaseError } from "@src/errors";
import { StatusCodes } from "http-status-codes";
export class NotFoundError extends BaseError {
  constructor(resource: string) {
    super(`Resource "${resource}" not found`, StatusCodes.NOT_FOUND);
  }
}
