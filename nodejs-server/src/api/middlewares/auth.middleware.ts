import { Request, Response, NextFunction } from "express";
import { StatusCodes, ReasonPhrases } from "http-status-codes";

import { verifyToken } from "@utils/jwt.util";
import { ResponseModelBuilder } from "@interfaces";

export const authFilterRestrictAccess =
  (role: string) => async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Check token exist in header
      const token = parseBearerToken(req.headers.authorization);
      if (!token) {
        return res
          .status(StatusCodes.UNAUTHORIZED)
          .json(
            new ResponseModelBuilder<null>()
              .withStatusCode(StatusCodes.UNAUTHORIZED)
              .withMessage(ReasonPhrases.UNAUTHORIZED)
              .build()
          );
      }
      // Verify token
      let decoded;
      try {
        decoded = await verifyToken(token);
      } catch (err: any) {
        return res
          .status(StatusCodes.UNAUTHORIZED)
          .json(
            new ResponseModelBuilder()
              .withStatusCode(StatusCodes.UNAUTHORIZED)
              .withMessage(err.message)
              .build()
          );
      }
      next();
    } catch (err) {
      next(err);
    }
  };

const parseBearerToken = (authorizationHeader: string | undefined) => {
  if (!authorizationHeader) return null;
  if (authorizationHeader.toLowerCase().startsWith("bearer ")) {
    return authorizationHeader.slice("bearer".length).trim();
  }
  return null;
};

export const authorizeUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let token = req.headers.authorization;
    // Permit all request
    if (
      req.path === "/api/v1/oauth2/authorization/google" ||
      req.path === "/api/v1/login/oauth2/code/google"
    ) {
      return next();
    }
    if (!token) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json(
          new ResponseModelBuilder()
            .withStatusCode(StatusCodes.UNAUTHORIZED)
            .withMessage(ReasonPhrases.UNAUTHORIZED)
            .build()
        );
    } else {
      if (token.toLocaleLowerCase().startsWith("bearer ")) {
        token = token.slice("bearer".length).trim();
      }

      let decoded;
      try {
        decoded = await verifyToken(token);
      } catch (err: any) {
        return res
          .status(StatusCodes.UNAUTHORIZED)
          .json(
            new ResponseModelBuilder()
              .withStatusCode(StatusCodes.UNAUTHORIZED)
              .withMessage(err.message)
              .build()
          );
      }
      const email = decoded.email;
      res.locals.email = email;
    }
    next();
  } catch (err) {
    // Handle errors here
    next(err);
  }
};
