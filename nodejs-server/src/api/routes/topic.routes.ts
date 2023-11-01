import { Router } from "express";
import { IRoutes } from "@interfaces";
import { TopicController } from "@controllers";
import { User } from "@models";
import { authFilterRestrictAccess } from "@middlewares";
import { Role } from "@configs/constants";

export default class TopicRoutes implements IRoutes {
  public path = "/topic";
  public router = Router();
  public topicController = new TopicController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(
      `${this.path}/`,
      authFilterRestrictAccess("ADMIN"),
      this.topicController.getAllTopics
    );
    // this.router.get("/topics/:id", this.topicController.getTopicById);
    this.router.post(`${this.path}/`, this.topicController.createTopic);
    // this.router.put("/topics/:id", this.topicController.updateTopic);
    // this.router.delete("/topics/:id", this.topicController.deleteTopic);
  }
}
