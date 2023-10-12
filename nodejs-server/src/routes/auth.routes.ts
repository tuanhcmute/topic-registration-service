import Routes from "../interfaces/routes.interface";
import { Router } from "express";
import passport from "passport";
import AuthController from "../controllers/auth.controller";

export default class AuthRoutes implements Routes {
  public path = "oauth2";
  public router = Router();
  private authController = new AuthController();

  constructor() {
    this.initializeRoutes();
  }
  public initializeRoutes(): void {
    this.router.get(
      `/${this.path}/google`,
      passport.authenticate("google", { scope: ["profile"] })
    );
    this.router.get(
      `/login/${this.path}/code/google`,
      passport.authenticate("google"),
      this.authController.handleGoogleLogin
    );
  }
}
