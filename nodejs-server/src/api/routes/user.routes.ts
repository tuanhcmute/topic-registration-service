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
      preAuthorizeFilter([RoleCode.ROLE_STUDENT, RoleCode.ROLE_LECTURE, RoleCode.ROLE_HEAD, RoleCode.ROLE_ADMIN]),
      userController.getUserProfile
    );

    // [PUT] /api/v1/user/profile
    this.router.put(
      `${this.path}/profile`,
      preAuthorizeFilter([RoleCode.ROLE_STUDENT, RoleCode.ROLE_LECTURE, RoleCode.ROLE_HEAD, RoleCode.ROLE_ADMIN]),
      userController.updateUserBio
    );

    // [PUT] /api/v1/user/profile/upload
    this.router.put(
      `${this.path}/profile/upload`,
      preAuthorizeFilter([RoleCode.ROLE_STUDENT, RoleCode.ROLE_LECTURE, RoleCode.ROLE_HEAD, RoleCode.ROLE_ADMIN]),
      userController.updateUserBio
    );

    // [GET] /api/v1/user/student
    this.router.get(
      `${this.path}/student`,
      preAuthorizeFilter([RoleCode.ROLE_STUDENT, RoleCode.ROLE_LECTURE, RoleCode.ROLE_HEAD, RoleCode.ROLE_ADMIN]),
      userController.getStudentsNotEnrolledInTopic
    );

    // [GET] /api/v1/user/lecture
    this.router.get(
      `${this.path}/lecture`,
      preAuthorizeFilter([RoleCode.ROLE_LECTURE]),
      userController.getLecturesByMajor
    );

    // [GET] /api/v1/user/admin
    this.router.get(
      `${this.path}/admin`,
      preAuthorizeFilter([RoleCode.ROLE_ADMIN]),
      userController.getAllUsers
    );
  }
}

export default new UserRoutes();
