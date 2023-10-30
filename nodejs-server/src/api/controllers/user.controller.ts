import { Request, Response, NextFunction } from "express";
import { UserService } from "@services";
import { UserInstance } from "@models";
import {
  IResponseModel,
  ResponseModelBuilder,
  UpdatedBio,
  IUserProfile,
} from "@interfaces";
import { StatusCode } from "@configs/constants";
import { ValidateFailException } from "@exceptions";
import { validate } from "class-validator";

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

  public updateUserBio = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const userId = res.locals.userId;
      const bio = req.body as UpdatedBio;

      // Validate bio
      const errors = await validate(bio);
      if (errors.length > 0) {
        throw new ValidateFailException(errors.toString());
      } else {
        console.info("Validation succeeded");
      }

      console.log(bio.biography.length);
      const result: boolean = await this.userService.updateUserBio(
        userId,
        bio.biography
      );
      if (result) {
        return res
          .status(200)
          .json(
            new ResponseModelBuilder()
              .withMessage("Update user bio successfully.")
              .withStatusCode(StatusCode.OK)
              .build()
          );
      }
    } catch (error) {
      next(error);
    }
  };
}
