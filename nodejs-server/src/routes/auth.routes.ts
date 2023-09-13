import AuthController from "../controllers/auth.controller";
import Routes from "../interfaces/routes.interface";
import { Router } from "express";

export default class AuthRoutes implements Routes {
  public path = "/auth";
  public router = Router();
  private authController = new AuthController();

  constructor() {
    this.intitializeRoutes();
  }

  private intitializeRoutes = (): void => {
    this.router.post(`${this.path}/login`, this.authController.login);
    this.router.post(`${this.path}/register`, this.authController.register);
    this.router.post(
      `${this.path}/forgot-passord`,
      this.authController.forgotPassword
    );
    this.router.post(
      `${this.path}/confirm-account`,
      this.authController.confirmAccount
    );
  };
}
