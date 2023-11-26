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
    //
    this.router.get(
      `${this.path}`,
      preAuthorizeFilter([RoleCode.ROLE_STUDENT, RoleCode.ROLE_LECTURE]),
      enrollmentPeriodController.getEnrollmentPeriod
    );
  }
}

export default new EnrollmentPeriodRoutes();
