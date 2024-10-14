import { successResponse } from "@src/http/responses/api.response";
import { UserRepository } from "@src/repository";
import { UserService } from "@src/services";
import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

class UserController {
  private userService: UserService;

  constructor(userService: UserService) {
    this.userService = userService;
  }

  async getAllUsers(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const users = await this.userService.getUsers();
      successResponse(
        response,
        "Users fetched successfully",
        users,
        StatusCodes.OK
      );
    } catch (error) {
      next(error);
    }
  }
}
const userRepository = new UserRepository();
const userService = new UserService(userRepository);
export const userController = new UserController(userService);
