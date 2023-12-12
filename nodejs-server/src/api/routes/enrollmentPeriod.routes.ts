import { RoleCode } from "@configs/constants";
import { enrollmentPeriodController } from "@controllers";
import { IRoutes } from "@interfaces";
import { preAuthorizeFilter } from "@middlewares";
import { Router } from "express";

class EnrollmentPeriodRoutes implements IRoutes {
  public path = "/enrollment-period";
  public router = Router();
  constructor() {
    this.initializeRoutes();
  }
  private initializeRoutes() {
    // [GET] /api/v1/enrollment-period?topicType=${topicType}&period=${period}
    this.router.get(
      `${this.path}`,
      preAuthorizeFilter([RoleCode.ROLE_STUDENT, RoleCode.ROLE_LECTURE]),
      enrollmentPeriodController.getActivatedEnrollmentPeriod
    );

    // [GET] /api/v1/enrollment-period/all?semesterId=${semesterId}
    this.router.get(
      `${this.path}/all`,
      preAuthorizeFilter([RoleCode.ROLE_ADMIN]),
      enrollmentPeriodController.getEnrollmentPeriodBySemesterId
    );

    // [POST] /api/v1/enrollment-period?semesterId=${semesterId}
    this.router.post(
      `${this.path}`,
      preAuthorizeFilter([RoleCode.ROLE_ADMIN]),
      enrollmentPeriodController.createEnrollmentPeriod
    );

    // [PUT] /api/v1/enrollment-period/${id}
    this.router.put(
      `${this.path}/:id`,
      preAuthorizeFilter([RoleCode.ROLE_ADMIN]),
      enrollmentPeriodController.udpateEnrollmentPeriod
    );
  }
}

export default new EnrollmentPeriodRoutes();
