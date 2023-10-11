import { NextFunction, Request, Response } from "express";
import { User, UserInstance } from "../models/user.model";
import { createJwtToken } from "../utils/jwt.util";
import constants from "../constants/constants";

export default class AuthController {
  public handleGoogleLogin = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const user = req.user as UserInstance;
      // find user role by id
      const foundUser = await User.findByPk(user.id);
      const token = createJwtToken(
        user.id,
        foundUser?.role || constants.role.STUDENT
      );
      console.log(token);
      res.redirect(`http://localhost:3000/api/v1/home/student?token=${token}`);
    } catch (err) {
      next(err);
    }
  };
}
