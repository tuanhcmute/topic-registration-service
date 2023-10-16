import { Request, Response, NextFunction } from "express";
import { verifyToken } from "@utils/jwt.util";
import { IResponseModel } from "@interfaces";
import { StatusCode } from "@configs/constants";
export const authFilterRestrictAccess =
  (role: string) => async (req: Request, res: Response, next: NextFunction) => {
    try {
      let token = req.headers.authorization;
      if (!token) {
        return res.status(401).json({ message: "Unauthorized, please login" });
      }

      if (token.toLocaleLowerCase().startsWith("bearer ")) {
        token = token.slice("bearer".length).trim();
      }

      const decoded = await verifyToken(token);

      if (!decoded) {
        return res.status(401).json({ message: "Unauthorized, please login" });
      }

      const roleUser = decoded.role;
      if (roleUser !== role) {
        return res
          .status(401)
          .json({ message: "Not enough privileges to access" });
      }

      next();
    } catch (err) {
      throw err;
    }
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

    const responseModel = {
      message: "Unauthorized, please login",
      statusCode: StatusCode.UNAUTHORIZED,
      data: null,
    };

    if (!token) {
      return res.status(401).json(responseModel);
    } else {
      if (token.toLocaleLowerCase().startsWith("bearer ")) {
        token = token.slice("bearer".length).trim();
      }

      const decoded = await verifyToken(token);

      if (!decoded) {
        return res.status(401).json(responseModel);
      }

      const userId = decoded.id;
      res.locals.userId = userId;
    }
    next();
  } catch (err) {
    // Handle errors here
    next(err);
  }
};
