import { BaseError } from "@src/errors";
import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { errorResponse } from "@src/http/responses/api.response";

const errorHandler = (
  error: any,
  request: Request,
  response: Response,
  next: NextFunction
) => {
  let statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
  let message = "An unexpected error occurred";

  if (error instanceof BaseError) {
    statusCode = error.statusCode;
    message = error.message;
  } else {
    //Initial an email as it is unoperational
  }
  console.error("Error:", error);
  errorResponse(response, message, error, statusCode);
};

export default errorHandler;
