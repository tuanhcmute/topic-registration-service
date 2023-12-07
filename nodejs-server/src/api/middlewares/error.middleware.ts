import { NextFunction, Response, Request } from "express";
import { StatusCodes } from "http-status-codes";
import { UserNotFoundException } from "@exceptions";
import { ResponseModelBuilder } from "@interfaces";
import { ValidateFailException } from "@exceptions";

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof UserNotFoundException) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json(new ResponseModelBuilder().withMessage(err.message).withStatusCode(StatusCodes.NOT_FOUND).build());
  }

  if (err instanceof ValidateFailException) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json(new ResponseModelBuilder().withMessage(err.message).withStatusCode(StatusCodes.BAD_REQUEST).build());
  }

  res
    .status(StatusCodes.INTERNAL_SERVER_ERROR)
    .json(
      new ResponseModelBuilder().withMessage(err.message).withStatusCode(StatusCodes.INTERNAL_SERVER_ERROR).build()
    );
  next();
};
