import { RoleCode } from "@configs/constants";
import { divisionController } from "@controllers";
import { IRoutes } from "@interfaces";
import { preAuthorizeFilter } from "@middlewares";
import { Router } from "express";

class DivisionRoutes implements IRoutes {
  public path = "/division";
  public router = Router();

  constructor() {
    this.initializeRoutes();
  }
  initializeRoutes() {
    // [GET] /api/v1/division
    this.router.get(
      `${this.path}`,
      preAuthorizeFilter([RoleCode.ROLE_LECTURE]),
      divisionController.getDivisionByTopicType
    );

    // [POST] /api/v1/division
    this.router.post(
      `${this.path}`,
      preAuthorizeFilter([RoleCode.ROLE_HEAD]),
      divisionController.createDivisionByTopicType
    );
  }
}

export default new DivisionRoutes();