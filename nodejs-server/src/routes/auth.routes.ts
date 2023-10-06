import Routes from "../interfaces/routes.interface";
import { Router } from "express";
import passport from "passport";
import AuthController from "../controllers/auth.controller";
import { UserInstance } from "models/user.model";

export default class AuthRoutes implements Routes {
  public path = "/auth";
  public router = Router();
  private authController = new AuthController();

  constructor() {
    this.initializeRoutes();
  }
  public initializeRoutes(): void {
    this.router.get(
      `${this.path}/google`,
      passport.authenticate("google", { scope: ["profile"] })
    );
    this.router.get(
      `${this.path}/google/redirect`,
      passport.authenticate("google"),
      this.authController.handleGoogleLogin
    );
  }
}
