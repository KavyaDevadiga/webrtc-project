import { Request, Response, NextFunction } from "express";

// Custom error handler middleware
const errorHandler = (
  error: any,
  request: Request,
  response: Response,
  next: NextFunction
) => {
  console.error(error.stack); // Log the error stack for debugging
};

export default errorHandler;
