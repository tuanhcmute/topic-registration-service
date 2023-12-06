import { Router } from "express";
import { IRoutes } from "@interfaces";
import { approvalHistoryController, semesterController } from "@controllers";
import { preAuthorizeFilter } from "@middlewares";
import { RoleCode } from "@configs/constants";

class SemesterRoutes implements IRoutes {
  public path = "/semester";
  public router = Router();
  constructor() {
    this.initializeRoutes();
  }
  public initializeRoutes(): void {
    this.router.get(
      this.path,
      preAuthorizeFilter([RoleCode.ROLE_ADMIN]),
      semesterController.getAllSemesters
    );
  }
}

export default new SemesterRoutes();
