import { Router } from "express";
import { IRoutes } from "@interfaces";
import { semesterController } from "@controllers";
import { preAuthorizeFilter } from "@middlewares";
import { RoleCode } from "@configs/constants";

class SemesterRoutes implements IRoutes {
  public path = "/semester";
  public router = Router();
  constructor() {
    this.initializeRoutes();
  }
  public initializeRoutes(): void {
    // [GET] /api/v1/semester
    this.router.get(this.path, preAuthorizeFilter([RoleCode.ROLE_ADMIN]), semesterController.getAllSemesters);

    // [POST] /api/v1/semester
    this.router.post(this.path, preAuthorizeFilter([RoleCode.ROLE_ADMIN]), semesterController.createSemester);

    // [GET] /api/v1/semester/:id
    this.router.get(`${this.path}/:id`, preAuthorizeFilter([RoleCode.ROLE_ADMIN]), semesterController.getSemesterById);

    // [PUT] /api/v1/semester/:id
    this.router.put(`${this.path}/:id`, preAuthorizeFilter([RoleCode.ROLE_ADMIN]), semesterController.updateSemester);

    // [PUT] /api/v1/semester/:id/status
    this.router.put(
      `${this.path}/:id`,
      preAuthorizeFilter([RoleCode.ROLE_ADMIN]),
      semesterController.updateSemesterStatus
    );
  }
}

export default new SemesterRoutes();
