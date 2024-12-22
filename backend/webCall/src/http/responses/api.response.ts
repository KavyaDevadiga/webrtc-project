import { apiResponseInterface } from "@src/interfaces";
import { Response } from "express";
import { StatusCodes } from "http-status-codes";

export const successResponse = <T>(
  res: Response,
  message: string,
  data: T,
  statusCode: number = StatusCodes.OK
): Response<apiResponseInterface.ApiResponse<T>> => {
  return res.status(statusCode).json({
    success: true,
    message,
    statusCode,
    data,
  });
};

// Handle error response
export const errorResponse = (
  res: Response,
  message: string,
  error: Error,
  statusCode: number = StatusCodes.INTERNAL_SERVER_ERROR
): Response<apiResponseInterface.ApiResponse<null>> => {
  return res.status(statusCode).json({
    success: false,
    message,
    statusCode,
    error,
  });
};
