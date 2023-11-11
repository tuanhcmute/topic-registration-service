import { Router } from "express";
import { IRoutes } from "@interfaces";
import { userController } from "@controllers";
import { preAuthorizeFilter } from "@middlewares";
import { RoleCode } from "@configs/constants";

class UserRoutes implements IRoutes {
  public path = "/user";
  public router = Router();

  constructor() {
    this.initializeRoutes();
  }

  public initializeRoutes(): void {
    // [GET] /api/v1/user/profile
    this.router.get(
      `${this.path}/profile`,
      preAuthorizeFilter([
        RoleCode.ROLE_STUDENT,
        RoleCode.ROLE_LECTURE,
        RoleCode.ROLE_HEAD,
        RoleCode.ROLE_ADMIN,
      ]),
      userController.getUserProfile
    );

    // [PUT] /api/v1/user/profile
    this.router.put(
      `${this.path}/profile`,
      preAuthorizeFilter([
        RoleCode.ROLE_STUDENT,
        RoleCode.ROLE_LECTURE,
        RoleCode.ROLE_HEAD,
        RoleCode.ROLE_ADMIN,
      ]),
      userController.updateUserBio
    );

    // [GET] /api/v1/user/student
    this.router.get(
      `${this.path}/student`,
      preAuthorizeFilter([
        RoleCode.ROLE_STUDENT,
        RoleCode.ROLE_LECTURE,
        RoleCode.ROLE_HEAD,
        RoleCode.ROLE_ADMIN,
      ]),
      userController.getStudentsNotEnrolledInTopic
    );
  }
}

export default new UserRoutes();
