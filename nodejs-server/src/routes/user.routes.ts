import { Router } from "express";
import Routes from "../interfaces/routes.interface";
import UserController from "../controllers/user.controller";

export default class UserRoutes implements Routes {
  public path = "/user";
  public router = Router();
  private userController: UserController = new UserController();

  constructor() {
    this.initializeRoutes();
  }

  public initializeRoutes(): void {
    this.router.get(`${this.path}/profile`, this.userController.getProfile);
  }
}
