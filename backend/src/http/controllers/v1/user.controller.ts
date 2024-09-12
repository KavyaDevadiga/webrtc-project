import { successResponse } from "@src/http/responses/api.response";
import { userServices } from "@src/services";
import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

// Get all users
export const getAllUsers = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const users = await userServices.getAllUsers();
  successResponse(
    response,
    "Users fetched successfully",
    users,
    StatusCodes.OK
  );
};
