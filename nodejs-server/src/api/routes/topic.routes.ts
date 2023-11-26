import { Router } from "express";
import { IRoutes } from "@interfaces";
import { topicController } from "@controllers";
import { preAuthorizeFilter } from "@middlewares";
import { RoleCode } from "@configs/constants";

class TopicRoutes implements IRoutes {
  public path = "/topic";
  public router = Router();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    // [GET] api/v1/topic/lecture
    this.router.get(
      `${this.path}/lecture`,
      preAuthorizeFilter([RoleCode.ROLE_LECTURE]),
      topicController.getAllTopicsInLectureEnrollmentPeriodByTypeAndLecture
    );

    // [POST] api/v1/topic/lecture
    this.router.post(
      `${this.path}/lecture`,
      preAuthorizeFilter([RoleCode.ROLE_LECTURE]),
      topicController.createNewTopicInLectureEnrollmentPeriod
    );

    // [PUT] api/v1/topic/lecture
    this.router.put(
      `${this.path}/lecture`,
      preAuthorizeFilter([RoleCode.ROLE_LECTURE]),
      topicController.updateTeacherTopic
    );
  }
}

export default new TopicRoutes();
