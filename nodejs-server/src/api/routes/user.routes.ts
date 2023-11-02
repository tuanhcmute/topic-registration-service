import { Router } from "express";
import { IRoutes } from "@interfaces";
import { UserController } from "@controllers";

export default class UserRoutes implements IRoutes {
  public path = "/user";
  public router = Router();
  private userController: UserController = new UserController();

  constructor() {
    this.initializeRoutes();
  }

  public initializeRoutes(): void {
    this.router.get(`${this.path}/profile`, this.userController.getProfile);
    this.router.put(`${this.path}/profile`, this.userController.updateUserBio);
  }
}
