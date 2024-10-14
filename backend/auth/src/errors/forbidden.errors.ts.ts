import { BaseError } from "@src/errors";
import { StatusCodes } from "http-status-codes";

export class ForbiddedError extends BaseError {
  constructor(resource: string) {
    super(
      `User doesn't have enough permission access this resource: ${resource}`,
      StatusCodes.FORBIDDEN
    );
  }
}
