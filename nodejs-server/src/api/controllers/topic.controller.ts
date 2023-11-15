import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";

import { topicService } from "@services";
import {
  IResponseModel,
  ResponseModelBuilder,
  NewTopicRequest,
  IListTopicResponse,
  ApprovalTopicRequest,
} from "@interfaces";
import { logger } from "@configs";
import { ValidateFailException } from "@exceptions";
import _ from "lodash";

class TopicController {
  public async getAllTopicsInLectureEnrollmentPeriodByTypeAndLecture(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const email = res.locals.email;
      const type = req.query.type as string;
      const data: IResponseModel<IListTopicResponse> =
        await topicService.getAllTopicsInLectureEnrollmentPeriodByTypeAndLecture(
          type,
          email
        );
      res.status(StatusCodes.OK).json(data);
    } catch (err) {
      console.log(err);
      next(err);
    }
  }

  public async createNewTopicInLectureEnrollmentPeriod(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      // Get raw topic from client
      const requestData = req.body;
      logger.info("Request data: ", requestData);

      // Convert raw to instance
      const newTopic = plainToInstance(NewTopicRequest, requestData);

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
      logger.info("New topic request: ", newTopic);

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
  }

  public async approveTopicInLectureEnrollmentPeriod(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      // Get request data
      const requestData = req.body;
      logger.info("Request data:", requestData);

      // Convert raw to instance
      const approvalTopicRequest = plainToInstance(
        ApprovalTopicRequest,
        requestData
      );
      // Validate instance
      const errors = await validate(approvalTopicRequest);
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
      logger.info("Approval topic request:", approvalTopicRequest);

      res
        .status(StatusCodes.OK)
        .json(
          await topicService.approveTopicInLectureEnrollmentPeriod(
            approvalTopicRequest
          )
        );
    } catch (error) {
      console.error(error);
      next(error);
    }
  }

  public async getAllTopicsInLectureEnrollmentPeriodByTypeAndTopicStatusAndMajor(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      // Get query
      const typeRequest = req.query["type"] as string;
      const statusRequest = req.query["status"] as string;
      const email = res.locals.email;
      if (
        _.isNull(typeRequest) ||
        _.isUndefined(typeRequest) ||
        _.isEmpty(typeRequest)
      )
        throw new ValidateFailException("Topic type is not valid");
      if (
        _.isNull(statusRequest) ||
        _.isUndefined(statusRequest) ||
        _.isEmpty(statusRequest)
      )
        throw new ValidateFailException("Topic status is not valid");

      // Response
      res
        .status(StatusCodes.OK)
        .json(
          await topicService.getAllTopicsInLectureEnrollmentPeriodByTypeAndTopicStatusAndMajor(
            typeRequest,
            statusRequest,
            email
          )
        );
    } catch (error) {
      logger.error("Error: ", error);
      next(error);
    }
  }

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
