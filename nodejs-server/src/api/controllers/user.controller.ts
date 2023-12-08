import { Request, Response, NextFunction } from "express";
import _ from "lodash";
import { StatusCodes } from "http-status-codes";
import { validate } from "class-validator";
import { plainToInstance } from "class-transformer";
import multer, { Multer } from "multer";

import { userService } from "@services";
import { ResponseModelBuilder, UpdatedBio, UserRequest } from "@interfaces";
import { ValidateFailException } from "@exceptions";
import { logger, storage } from "@configs";

const upload: Multer = multer({ storage: storage });

class UserController {
  public getUserProfile = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const email = res.locals.email;
      if (_.isNull(email)) throw new ValidateFailException("Email could not be found");
      res.status(StatusCodes.OK).json(await userService.getUserProfile(email));
    } catch (error) {
      next(error);
    }
  };

  public getStudentsNotEnrolledInTopic = async (req: Request, res: Response, next: NextFunction) => {
    try {
      res.status(StatusCodes.OK).json(await userService.getStudentsNotEnrolledInTopic());
    } catch (error) {
      console.error(error);
      next(error);
    }
  };

  public async getLecturesByMajor(req: Request, res: Response, next: NextFunction) {
    // Get and validate Major code
    const majorCodeRequest = req.query["majorCode"] as string;
    if (_.isNull(majorCodeRequest) || _.isUndefined(majorCodeRequest) || _.isEmpty(majorCodeRequest))
      throw new ValidateFailException("Major code is not valid");

    try {
      // Reponse
      res.status(StatusCodes.OK).json(await userService.getLecturesByMajor(majorCodeRequest));
    } catch (error) {
      logger.error("Error: ", error);
      next(error);
    }
  }

  public updateUserBio = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const email = res.locals.email;
      const bio = req.body;

      const updatedBio = plainToInstance(UpdatedBio, bio);

      // Validate bio
      const errors = await validate(updatedBio);
      console.info(errors.length);
      if (errors.length > 0) {
        const firstError = errors[0]; // Get the first validation error
        const errorMessage = firstError.constraints
          ? Object.values(firstError.constraints)[0]
          : "No error message available";
        throw new ValidateFailException(errorMessage);
      } else {
        console.info("Validation succeeded");
      }

      console.log(bio.biography.length);
      const result: boolean = await userService.updateUserBio(email, bio.biography);
      if (result) {
        return res
          .status(200)
          .json(
            new ResponseModelBuilder()
              .withMessage("Update user bio successfully.")
              .withStatusCode(StatusCodes.OK)
              .build()
          );
      }
    } catch (error) {
      next(error);
    }
  };

  public getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
      res.status(StatusCodes.OK).json(await userService.getAllUsers());
    } catch (error) {
      next(error);
    }
  };

  public async updateAvatarInUserProfile(req: Request, res: Response, next: NextFunction) {
    try {
      const file = req.file;
      logger.info(file);
      res.status(StatusCodes.OK).json("ok");
    } catch (error) {
      logger.error({ error });
      next(error);
    }
  }

  public async findUserByName(req: Request, res: Response, next: NextFunction) {
    try {
      const name = req.query["name"] as string;
      if (_.isNull(name) || _.isUndefined(name) || _.isEmpty(name))
        throw new ValidateFailException("Name is not valid");
      res.status(StatusCodes.OK).json(await userService.findUserByName(name));
    } catch (error) {
      logger.error({ error });
      next(error);
    }
  }

  public async createUser(req: Request, res: Response, next: NextFunction) {
    try {
      const user = req.body;
      const requestData = plainToInstance(UserRequest, user);

      const errors = await validate(requestData);
      if (errors.length > 0) {
        const firstError = errors[0];
        const errorMessage = firstError.constraints
          ? Object.values(firstError.constraints)[0]
          : "No error message available";

        return res
          .status(StatusCodes.BAD_REQUEST)
          .json(new ResponseModelBuilder().withMessage(errorMessage).withStatusCode(StatusCodes.BAD_REQUEST).build());
      }

      const result = await userService.createUser(user);
      if (result) {
        return res
          .status(StatusCodes.CREATED)
          .json(
            new ResponseModelBuilder().withMessage("Create user successfully.").withStatusCode(StatusCodes.OK).build()
          );
      }
    } catch (error) {
      next(error);
    }
  }
}

export default new UserController();
