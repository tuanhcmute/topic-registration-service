import { Router } from "express";
import Routes from "../interfaces/routes.interface";
import UserController from "../controllers/user.controller";

export default class UserRoutes implements Routes {
  public path = "/users";
  public router = Router();
  private userController: UserController = new UserController();

  constructor() {
    this.initializeRoutes();
  }

  public initializeRoutes(): void {
    this.router.get(`${this.path}/`, this.userController.getUsers);
  }
}
