import { NextFunction, Response, Request } from "express";
import { UserNotFoundException } from "@exceptions";
import { ResponseModelBuilder } from "@interfaces";
import { StatusCode } from "@configs/constants";
import { ValidateFailException } from "@exceptions";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof UserNotFoundException) {
    return res
      .status(404)
      .json(
        new ResponseModelBuilder()
          .withMessage(err.message)
          .withStatusCode(StatusCode.NOT_FOUND)
          .build()
      );
  }

  if (err instanceof ValidateFailException) {
    return res
      .status(400)
      .json(
        new ResponseModelBuilder()
          .withMessage(err.message)
          .withStatusCode(StatusCode.BAD_REQUEST)
          .build()
      );
  }

  res
    .status(500)
    .json(
      new ResponseModelBuilder()
        .withMessage(err.message)
        .withStatusCode(StatusCode.INTERNAL_SERVER_ERROR)
        .build()
    );
  next();
};
