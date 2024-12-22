import { UserService } from "@src/services";
import { NextFunction, Request, Response } from "express";

import { successResponse } from "@src/http/responses/api.response";
import { UserRepository } from "@src/repository";
import { UserSerializer } from "@src/serializers";
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
const userSerializer = new UserSerializer();
const userService = new UserService(userRepository, userSerializer, null);
export const userController = new UserController(userService);
