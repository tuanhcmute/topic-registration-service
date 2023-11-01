import { NextFunction, Request, Response, query } from "express";
import { TopicService } from "@services";
import { error } from "console";
import { TeacherTopicOut, createReqTopic } from "@interfaces/topic.interface";
import { plainToClass, plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { StatusCode } from "@configs/constants";
import { STATUS_CODES } from "http";
import { StatusCodes } from "http-status-codes";
import { ResponseModelBuilder } from "@interfaces";

export default class TopicController {
  private topicService: TopicService = new TopicService();

  public getAllTopics = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const userId = res.locals.userId;
      const type = req.query.type as string;
      const periodId = req.query["enrollment-period"] as string;
      const topics: TeacherTopicOut[] = await this.topicService.getAllTopics(
        type,
        periodId,
        userId
      );
      res.status(200).json(topics);
    } catch (err) {
      console.log(error);
      next(err);
    }
  };

  public createTopic = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const rawTopic = req.body;
      console.log(rawTopic);
      const newTopic = plainToInstance(createReqTopic, rawTopic);
      console.info(newTopic);

      const errors = await validate(newTopic);
      if (errors.length > 0) {
        const firstError = errors[0];

        const errorMessage = firstError.constraints
          ? Object.values(firstError.constraints)[0]
          : "No error message available";

        res
          .status(StatusCodes.BAD_REQUEST)
          .json(
            new ResponseModelBuilder()
              .withMessage(errorMessage)
              .withStatusCode(StatusCodes.BAD_REQUEST)
              .build()
          );
      } else {
        const userId = res.locals.userId;
        await this.topicService.createTopic(newTopic, userId);
        res
          .status(StatusCodes.CREATED)
          .json(
            new ResponseModelBuilder()
              .withMessage("Topic has been created successfully")
              .withStatusCode(StatusCode.CREATED)
              .build()
          );
      }
    } catch (err) {
      console.log(err);
      next(err);
    }
  };

  //   public async getTopicById(req: Request, res: Response): Promise<void> {
  //     const { id } = req.params;

  //     try {
  //       const topic: Topic | null = await Topic.findById(id);
  //       if (topic) {
  //         res.status(200).json(topic);
  //       } else {
  //         res.status(404).json({ message: "Topic not found" });
  //       }
  //     } catch (err) {
  //       res.status(500).json({ message: err.message });
  //     }
  //   }

  //   public async updateTopic(req: Request, res: Response): Promise<void> {
  //     const { id } = req.params;
  //     const { name, description } = req.body;

  //     try {
  //       const updatedTopic: Topic | null = await Topic.findByIdAndUpdate(
  //         id,
  //         { name, description },
  //         { new: true }
  //       );
  //       if (updatedTopic) {
  //         res.status(200).json(updatedTopic);
  //       } else {
  //         res.status(404).json({ message: "Topic not found" });
  //       }
  //     } catch (err) {
  //       res.status(500).json({ message: err.message });
  //     }
  //   }

  //   public async deleteTopic(req: Request, res: Response): Promise<void> {
  //     const { id } = req.params;

  //     try {
  //       const deletedTopic: Topic | null = await Topic.findByIdAndDelete(id);
  //       if (deletedTopic) {
  //         res.status(200).json(deletedTopic);
  //       } else {
  //         res.status(404).json({ message: "Topic not found" });
  //       }
  //     } catch (err) {
  //       res.status(500).json({ message: err.message });
  //     }
  //   }
}
