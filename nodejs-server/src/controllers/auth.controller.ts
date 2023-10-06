import { NextFunction, Request, Response } from "express";
import { UserInstance } from "../models/user.model";
import { createJwtToken } from "../utils/jwt.util";

export default class AuthController {
  public handleGoogleLogin = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const user = req.user as UserInstance;
      const token = createJwtToken(user.id, user.role);
      res.redirect(`http://localhost:3000/api/v1/home/student?token=${token}`);
    } catch (err) {
      next(err);
    }
  };
}
