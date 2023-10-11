import { Request, Response, NextFunction } from "express";
import UserService from "../services/user.service";
import { UserInstance } from "../models/user.model";
import { ResponseModel } from "../interfaces/responseModel";
import constants from "../constants/constants";
import ResponseMessage from "../constants/message";

const statusCode = constants.httpStatusCode;

export default class UserController {
  private userService = new UserService();
  public getProfile = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const user: UserInstance = await this.userService.getProfileUserData("1");
      const userProfile: ResponseModel<UserInstance> = {
        message: ResponseMessage.SUCCESS,
        statusCode: statusCode.OK,
        data: user,
      };
      res.status(200).json(userProfile);
    } catch (error) {
      next(error);
    }
  };
}
