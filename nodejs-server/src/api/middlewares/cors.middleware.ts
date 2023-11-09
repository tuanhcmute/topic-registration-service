import { Request, Response, NextFunction } from "express";
import {
  ACCESS_CONTROL_ALLOW_HEADERS,
  ACCESS_CONTROL_ALLOW_METHODS,
  ACCESS_CONTROL_ALLOW_ORIGIN,
  AUTHORIZATION,
  CONTENT_TYPE,
  HttpMethod,
} from "../configs/constants";

export const corsMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.setHeader(ACCESS_CONTROL_ALLOW_ORIGIN, "*");
  res.setHeader(
    ACCESS_CONTROL_ALLOW_METHODS,
    `${HttpMethod.GET}, ${HttpMethod.POST}, ${HttpMethod.PUT}, ${HttpMethod.DELETE}`
  );
  res.setHeader(
    ACCESS_CONTROL_ALLOW_HEADERS,
    `${CONTENT_TYPE}, ${AUTHORIZATION}`
  );
  next();
};
