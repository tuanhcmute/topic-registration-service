import { Request, Response, NextFunction } from "express";
import { verifyToken } from "@utils/jwt.util";
import { ResponseModelBuilder } from "@interfaces";
import { StatusCode } from "@configs/constants";
import { ErrorMessages } from "@exceptions";
export const authFilterRestrictAccess =
  (role: string) => async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = parseBearerToken(req.headers.authorization);

      if (!token) {
        return res
          .status(401)
          .json(
            new ResponseModelBuilder<null>()
              .withStatusCode(StatusCode.UNAUTHORIZED)
              .withMessage(ErrorMessages.UNAUTHORIZED)
              .withData(null)
              .build()
          );
      }

      const decoded = await verifyToken(token);

      if (!decoded) {
        return res
          .status(401)
          .json(
            new ResponseModelBuilder()
              .withMessage(ErrorMessages.INVALID_TOKEN)
              .withStatusCode(StatusCode.UNAUTHORIZED)
              .withData(null)
              .build()
          );
      }

      const userRole = decoded.role;

      if (userRole !== role) {
        return res
          .status(403)
          .json(
            new ResponseModelBuilder()
              .withMessage("Forbidden")
              .withStatusCode(StatusCode.FORBIDDEN)
              .withData(null)
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

    console.log(req.path);
    if (
      req.path === "/api/v1/oauth2/google" ||
      req.path === "/api/v1/login/oauth2/code/google"
    ) {
      return next();
    }

    if (!token) {
      return res
        .status(401)
        .json(
          new ResponseModelBuilder<null>()
            .withStatusCode(StatusCode.UNAUTHORIZED)
            .withMessage(ErrorMessages.UNAUTHORIZED)
            .withData(null)
            .build()
        );
    } else {
      if (token.toLocaleLowerCase().startsWith("bearer ")) {
        token = token.slice("bearer".length).trim();
      }

      const decoded = await verifyToken(token);

      if (!decoded) {
        return res
          .status(401)
          .json(
            new ResponseModelBuilder<null>()
              .withStatusCode(StatusCode.UNAUTHORIZED)
              .withMessage(ErrorMessages.UNAUTHORIZED)
              .withData(null)
              .build()
          );
      }

      const userId = decoded.id;
      res.locals.userId = userId;
    }
    next();
  } catch (err) {
    console.log(err);
    // Handle errors here
    next(err);
  }
};
