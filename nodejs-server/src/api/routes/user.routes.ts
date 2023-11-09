import { Router } from "express";
import { IRoutes } from "@interfaces";
import { UserController } from "@controllers";
import { preAuthorizeFilter } from "@middlewares";
import { RoleCode } from "@configs/constants";

export default class UserRoutes implements IRoutes {
  public path = "/user";
  public router = Router();
  private userController: UserController = new UserController();

  constructor() {
    this.initializeRoutes();
  }

  public initializeRoutes(): void {
    this.router.get(
      `${this.path}/profile`,
      preAuthorizeFilter([
        RoleCode.ROLE_STUDENT,
        RoleCode.ROLE_LECTURE,
        RoleCode.ROLE_HEAD,
        RoleCode.ROLE_ADMIN,
      ]),
      this.userController.getUserProfile
    );
    this.router.put(`${this.path}/profile`, this.userController.updateUserBio);
  }
}
