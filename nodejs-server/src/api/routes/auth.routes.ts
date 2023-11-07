import { IRoutes } from "@interfaces";
import { Router } from "express";
import passport from "passport";
import { AuthController } from "@controllers";

export default class AuthRoutes implements IRoutes {
  public path = "oauth2";
  public router = Router();
  private authController = new AuthController();

  constructor() {
    this.initializeRoutes();
  }
  public initializeRoutes(): void {
    this.router.get(
      `/${this.path}/authorization/google`,
      this.authController.getGoogleLogin
    );
    this.router.get(
      `/login/${this.path}/code/google`,
      passport.authenticate("google", {
        failureRedirect: "/error",
        session: false,
      }),
      this.authController.handleGoogleLogin
    );
  }
}
