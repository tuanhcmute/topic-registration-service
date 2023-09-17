import { NextFunction, Response, Request } from "express";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(err.message);
  res.status(500).json({ message: "Internal Server Error" });
};
