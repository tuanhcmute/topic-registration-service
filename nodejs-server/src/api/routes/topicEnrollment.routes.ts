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
    this.router.post(
      `${this.path}`,
      preAuthorizeFilter([RoleCode.ROLE_STUDENT, RoleCode.ROLE_LECTURE]),
      topicEnrollmentController.createTopicEnrollment
    );
  }
}

export default new TopicEnrollmentRoutes();
