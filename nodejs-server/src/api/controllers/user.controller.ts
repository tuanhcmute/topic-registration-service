import { Request, Response, NextFunction } from "express";
import { UserService } from "@services";
import { UserInstance } from "@models";
import { IResponseModel } from "@interfaces";
import { StatusCode } from "@configs/constants";

export default class UserController {
  private userService = new UserService();
  public getProfile = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const user: UserInstance = await this.userService.getProfileUserData("1");
      const userProfile: IResponseModel<UserInstance> = {
        message: "Get user profile successfully.",
        statusCode: StatusCode.OK,
        data: user,
      };
      res.status(200).json(userProfile);
    } catch (error) {
      next(error);
    }
  };
}
