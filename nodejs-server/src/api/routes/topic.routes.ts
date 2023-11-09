import { Router } from "express";
import { IRoutes } from "@interfaces";
import { TopicController } from "@controllers";
import { preAuthorizeFilter } from "@middlewares";
import { RoleCode } from "@configs/constants";

export default class TopicRoutes implements IRoutes {
  public path = "/topic";
  public router = Router();
  public topicController = new TopicController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(
      `${this.path}/lecture`,
      preAuthorizeFilter([RoleCode.ROLE_LECTURE]),
      this.topicController.getAllTopicsInLectureEnrollmentPeriodByTypeAndLecture
    );
    // this.router.get("/topics/:id", this.topicController.getTopicById);
    this.router.post(
      `${this.path}/`,
      preAuthorizeFilter([RoleCode.ROLE_LECTURE]),
      this.topicController.createTopic
    );
    // this.router.put("/topics/:id", this.topicController.updateTopic);
    // this.router.delete("/topics/:id", this.topicController.deleteTopic);
  }
}
