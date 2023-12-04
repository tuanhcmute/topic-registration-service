import { Router } from "express";
import { topicEnrollmentController } from "@controllers";
import { IRoutes } from "@interfaces";
import { preAuthorizeFilter } from "@middlewares";
import { RoleCode } from "@configs/constants";

class TopicEnrollmentRoutes implements IRoutes {
  public path = "/topic-enrollment";
  public router = Router();
  constructor() {
    this.initializeRoutes();
  }
  private initializeRoutes() {
    // [POST] /api/v1/topic-enrollment
    this.router.post(
      `${this.path}`,
      preAuthorizeFilter([RoleCode.ROLE_STUDENT, RoleCode.ROLE_LECTURE]),
      topicEnrollmentController.createTopicEnrollment
    );

    // [DELETE] /api/v1/topic-enrollment
    this.router.delete(
      `${this.path}`,
      preAuthorizeFilter([RoleCode.ROLE_STUDENT, RoleCode.ROLE_LECTURE]),
      topicEnrollmentController.deleteTopicEnrollment
    );

    // [GET] /api/v1/topic-enrollment
    this.router.get(
      `${this.path}`,
      preAuthorizeFilter([RoleCode.ROLE_STUDENT]),
      topicEnrollmentController.getTopicEnrollmentsByNtid
    );
  }
}

export default new TopicEnrollmentRoutes();
