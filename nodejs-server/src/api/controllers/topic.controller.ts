import { NextFunction, Request, Response } from "express";
import { topicService } from "@services";
import { IResponseModel, ResponseModelBuilder } from "@interfaces";
import { StatusCodes } from "http-status-codes";
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import {
  NewTopicRequest,
  ListTopicResponse,
} from "@interfaces/topic.interface";

class TopicController {
  public getAllTopicsInLectureEnrollmentPeriodByTypeAndLecture = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const email = res.locals.email;
      const type = req.query.type as string;
      const data: IResponseModel<ListTopicResponse> =
        await topicService.getAllTopicsInLectureEnrollmentPeriodByTypeAndLecture(
          type,
          email
        );
      res.status(StatusCodes.OK).json(data);
    } catch (err) {
      console.log(err);
      next(err);
    }
  };

  public createNewTopicInLectureEnrollmentPeriod = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      // Get raw topic from client
      const requestData = req.body;
      console.log({ requestData });
      // Convert raw to instance
      const newTopic = plainToInstance(NewTopicRequest, requestData);
      console.info({ newTopic });
      // Validate instance
      const errors = await validate(newTopic);
      if (errors.length > 0) {
        const firstError = errors[0];
        const errorMessage = firstError.constraints
          ? Object.values(firstError.constraints)[0]
          : "No error message available";
        // Build response
        res
          .status(StatusCodes.BAD_REQUEST)
          .json(
            new ResponseModelBuilder()
              .withMessage(errorMessage)
              .withStatusCode(StatusCodes.BAD_REQUEST)
              .build()
          );
        return;
      }

      // Handle call service
      const email = res.locals.email;
      res
        .status(StatusCodes.OK)
        .json(
          await topicService.createNewTopicInLectureEnrollmentPeriod(
            newTopic,
            email
          )
        );
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

export default new TopicController();
