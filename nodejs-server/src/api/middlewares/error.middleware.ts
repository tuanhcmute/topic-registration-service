import { NextFunction, Response, Request } from "express";
import { IResponseModel } from "@interfaces";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errorResponse: IResponseModel<{}> = {
    message: "Internal server error",
    statusCode: 500,
  };
  console.log(err.message);
  res.status(500).json(errorResponse);
  next();
};
