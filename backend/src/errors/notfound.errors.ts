import { BaseError } from "@src/errors";
import { StatusCodes } from "http-status-codes";
// src/errors/BaseError.ts
export class NotFoundError extends BaseError {
  constructor(message: string) {
    super(message, StatusCodes.NOT_FOUND);
  }
}
