import { NextFunction, Request, Response } from "express";
import { User, UserInstance, UserRole } from "@models";
import passport from "passport";

import { createJwtToken } from "@utils/jwt.util";

class AuthController {
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
      const token = createJwtToken(foundUser?.email || "");
      const refreshToken = "12345";
      const redirectUrl = req.query.state;
      console.log(redirectUrl);
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
      let redirectUrl = req.query["redirect-url"];
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

export default new AuthController();
