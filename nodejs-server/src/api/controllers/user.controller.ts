import { Request, Response, NextFunction } from "express";
import { UserService } from "@services";
import { UserInstance } from "@models";
import { IResponseModel } from "@interfaces";
import { StatusCode } from "@configs/constants";
import { IUserProfile } from "@interfaces/user.interface";

export default class UserController {
  private userService = new UserService();
  public getProfile = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const userId = res.locals.userId;
      const user: UserInstance = await this.userService.getProfileUserData(
        userId
      );

      const profile: IUserProfile = {
        profile: user,
      };

      const userProfile: IResponseModel<IUserProfile> = {
        message: "Get user profile successfully.",
        statusCode: StatusCode.OK,
        data: profile,
      };

      res.status(200).json(userProfile);
    } catch (error) {
      next(error);
    }
  };
}
