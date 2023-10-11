import { NextFunction, Response, Request } from "express";
import { ResponseModel } from "../interfaces/responseModel";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errorResponse: ResponseModel<{}> = {
    message: "Internal server error",
    statusCode: 500,
  };
  res.status(500).json(errorResponse);
  next();
};
