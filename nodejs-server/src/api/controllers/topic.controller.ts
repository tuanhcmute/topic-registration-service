import { NextFunction, Request, Response } from "express";
import { TopicService } from "@services";
import { IResponseModel, ResponseModelBuilder } from "@interfaces";
import { StatusCodes } from "http-status-codes";
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { CreateReqTopic, Data, UpdateTopic } from "@interfaces/topic.interface";

export default class TopicController {
  private topicService: TopicService = new TopicService();

  public getAllTopicsInLectureEnrollmentPeriodByTypeAndLecture = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const email = res.locals.email;
      const type = req.query.type as string;
      const data: IResponseModel<Data> =
        await this.topicService.getAllTopicsInLectureEnrollmentPeriodByTypeAndLecture(
          type,
          email
        );
      res.status(StatusCodes.OK).json(data);
    } catch (err) {
      console.log(err);
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
      const newTopic = plainToInstance(CreateReqTopic, rawTopic);
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
              .withStatusCode(StatusCodes.CREATED)
              .build()
          );
      }
    } catch (err) {
      console.log(err);
      next(err);
    }
  };

  public updateTeacherTopic = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const updatedTopic = plainToInstance(UpdateTopic, req.body);
      const errors = await validate(updatedTopic);

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
        await this.topicService.updateTeacherTopic(updatedTopic);
        res
          .status(StatusCodes.OK)
          .json(
            new ResponseModelBuilder()
              .withMessage("Topic has been updated successfully")
              .withStatusCode(StatusCodes.OK)
              .build()
          );
      }
    } catch (err) {
      console.log(err);
      next(err);
    }
  };
}
