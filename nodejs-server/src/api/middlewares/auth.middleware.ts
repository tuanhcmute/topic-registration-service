import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import _ from "lodash";

import { verifyToken } from "@utils/jwt.util";
import { ResponseModelBuilder } from "@interfaces";
import { Role, User, UserRole } from "@models";

export const preAuthorizeFilter =
  (roles: string[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Check token exist in header
      const token = parseBearerToken(req.headers.authorization);
      if (_.isNull(token))
        return res
          .status(StatusCodes.UNAUTHORIZED)
          .json(
            new ResponseModelBuilder()
              .withStatusCode(StatusCodes.UNAUTHORIZED)
              .withMessage("Token could not be found")
              .build()
          );

      // Decode token and get email from decoded
      let decoded;
      try {
        decoded = await verifyToken(token);
      } catch (err: any) {
        console.error(err.message);
        return res
          .status(StatusCodes.UNAUTHORIZED)
          .json(
            new ResponseModelBuilder()
              .withStatusCode(StatusCodes.UNAUTHORIZED)
              .withMessage(err.message)
              .build()
          );
      }

      // Get user by email
      const email = decoded.email;
      res.locals.email = email;
      console.log("Extracted email: " + email);
      const currentUser = await User.findOne({
        where: {
          email: email,
        },
        include: {
          model: UserRole,
          as: "userRoles",
        },
      });

      // Validate user
      if (
        _.isNull(currentUser) ||
        _.isEmpty(currentUser) ||
        _.isUndefined(currentUser)
      )
        return res
          .status(StatusCodes.BAD_REQUEST)
          .json(
            new ResponseModelBuilder()
              .withStatusCode(StatusCodes.BAD_REQUEST)
              .withMessage("Current user could not be found")
              .build()
          );

      // Get roles of current user
      const authorities = await Promise.all(
        currentUser.userRoles.map(async (item) => {
          const role = await Role.findOne({ where: { id: item.roleId } });
          return role;
        })
      );

      // Check role
      const hasPermission = authorities.some((item) => {
        if (_.isNull(item)) return false;
        return roles.some((role) => _.isEqual(role, item.dataValues.code));
      });
      console.log({ hasPermission });
      if (hasPermission) return next();
      return res
        .status(StatusCodes.FORBIDDEN)
        .json(
          new ResponseModelBuilder()
            .withStatusCode(StatusCodes.FORBIDDEN)
            .withMessage("Access is denied")
            .build()
        );
    } catch (err) {
      next(err);
    }
  };

// Get token from header
const parseBearerToken = (authorizationHeader: string | undefined) => {
  if (!authorizationHeader) return null;
  if (authorizationHeader.toLowerCase().startsWith("bearer ")) {
    return authorizationHeader.slice("bearer".length).trim();
  }
  return null;
};

// Check authorization
export const tokenAuthenticationFilter = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Permit all request
    if (
      req.path === "/api/v1/oauth2/authorization/google" ||
      req.path === "/api/v1/login/oauth2/code/google"
    )
      return next();

    // Check token exist in header
    const token = parseBearerToken(req.headers.authorization);
    if (_.isNull(token))
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json(
          new ResponseModelBuilder()
            .withStatusCode(StatusCodes.UNAUTHORIZED)
            .withMessage("Token could not be found")
            .build()
        );

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
    const email = decoded.email;
    res.locals.email = email;
    next();
  } catch (err) {
    // Handle errors here
    next(err);
  }
};
