import { NextFunction, Request, Response } from "express";
import { User, UserInstance, UserRole } from "@models";
import { createJwtToken } from "@utils/jwt.util";
import passport from "passport";

export default class AuthController {
  public handleGoogleLogin = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const user = req.user as UserInstance;
      // find user role by id
      const foundUser = await User.findByPk(user.id, {
        include: {
          model: UserRole,
          as: "userRoles",
        },
      });
      const token = createJwtToken(user.email || "");
      const refreshToken = "12345";
      const redirectUrl = req.query.state;
      res.redirect(
        `${redirectUrl}?accessToken=${token}&refreshToken=${refreshToken}`
      );
    } catch (err) {
      console.log(err);
      next(err);
    }
  };

  public getGoogleLogin = (req: Request, res: Response, next: NextFunction) => {
    try {
      let redirectUrl = req.query.redirectUrl;
      if (!redirectUrl) {
        redirectUrl = "http://localhost:3000";
      }
      // Pass the redirectUrl as a query parameter to the Google authentication
      passport.authenticate("google", {
        scope: ["profile", "email"],
        state: String(redirectUrl), // Pass the redirectUrl as state
      })(req, res, next);
    } catch (err) {
      console.log("error");
      next(err);
    }
  };
}
