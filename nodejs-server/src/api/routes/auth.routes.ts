import { Router } from "express";
import passport from "passport";
import { IRoutes } from "@interfaces";
import { authController } from "@controllers";

class AuthRoutes implements IRoutes {
  public path = "oauth2";
  public router = Router();

  constructor() {
    this.initializeRoutes();
  }
  public initializeRoutes(): void {
    this.router.get(
      `/${this.path}/authorization/google`,
      authController.getGoogleLogin
    );
    this.router.get(
      `/login/${this.path}/code/google`,
      passport.authenticate("google", {
        failureRedirect: "/error",
        session: false,
      }),
      authController.handleGoogleLogin
    );
  }
}

export default new AuthRoutes();
