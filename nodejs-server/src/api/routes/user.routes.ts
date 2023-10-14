import { Router } from "express";
import { IRoutes } from "@interfaces";
import { UserController } from "@controllers";
import { authorizeUser } from "@middlewares";

export default class UserRoutes implements IRoutes {
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
