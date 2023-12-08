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
  UpdateTopicRequest
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
        await topicService.getAllTopicsInLectureEnrollmentPeriodByTypeAndLecture(type, email);
      res.status(StatusCodes.OK).json(data);
    } catch (err) {
      console.log(err);
      next(err);
    }
  }

  public async createNewTopicInLectureEnrollmentPeriod(req: Request, res: Response, next: NextFunction): Promise<void> {
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
          .json(new ResponseModelBuilder().withMessage(errorMessage).withStatusCode(StatusCodes.BAD_REQUEST).build());
        return;
      }
      logger.info("New topic request: ", newTopic);

      // Handle call service
      const email = res.locals.email;
      res.status(StatusCodes.OK).json(await topicService.createNewTopicInLectureEnrollmentPeriod(newTopic, email));
    } catch (err) {
      console.log(err);
      next(err);
    }
  }

  public async approveTopicInLectureEnrollmentPeriod(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      // Get request data
      const requestData = req.body;
      logger.info("Request data:", requestData);

      // Convert raw to instance
      const approvalTopicRequest = plainToInstance(ApprovalTopicRequest, requestData);
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
          .json(new ResponseModelBuilder().withMessage(errorMessage).withStatusCode(StatusCodes.BAD_REQUEST).build());
        return;
      }
      logger.info("Approval topic request:", approvalTopicRequest);

      res.status(StatusCodes.OK).json(await topicService.approveTopicInLectureEnrollmentPeriod(approvalTopicRequest));
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
      if (_.isNull(typeRequest) || _.isUndefined(typeRequest) || _.isEmpty(typeRequest))
        throw new ValidateFailException("Topic type is not valid");
      if (_.isNull(statusRequest) || _.isUndefined(statusRequest) || _.isEmpty(statusRequest))
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

  public async getAllTopicsIsNotApprovedDuringTheLectureEnrollmentPeriod(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const typeRequest = req.query["type"] as string;
      const email = res.locals.email as string;

      // Validate type
      if (_.isNull(typeRequest) || _.isUndefined(typeRequest) || _.isEmpty(typeRequest))
        throw new ValidateFailException("Topic type is not valid");

      // Validate email
      if (_.isNull(email) || _.isUndefined(email) || _.isEmpty(email))
        throw new ValidateFailException("Email is not valid");

      res
        .status(StatusCodes.OK)
        .json(await topicService.getAllTopicsIsNotApprovedDuringTheLectureEnrollmentPeriod(typeRequest, email));
    } catch (error) {
      logger.error({ error });
      next(error);
    }
  }

  public async getAllTopicsApprovedDuringTheLectureEnrollmentPeriod(req: Request, res: Response, next: NextFunction) {
    try {
      const typeRequest = req.query["type"] as string;
      const email = res.locals.email as string;

      // Validate type
      if (_.isNull(typeRequest) || _.isUndefined(typeRequest) || _.isEmpty(typeRequest))
        throw new ValidateFailException("Topic type is not valid");

      // Validate email
      if (_.isNull(email) || _.isUndefined(email) || _.isEmpty(email))
        throw new ValidateFailException("Email is not valid");

      res
        .status(StatusCodes.OK)
        .json(await topicService.getAllTopicsApprovedDuringTheLectureEnrollmentPeriod(typeRequest, email));
    } catch (error) {
      logger.error({ error });
      next(error);
    }
  }
  public async updateTopicInLectureEnrollmentPeriod(req: Request, res: Response, next: NextFunction) {
    try {
      // Get raw topic from client
      const requestData = req.body;
      logger.info("Request data: ", requestData);
      // Convert raw to instance
      const updateTopic = plainToInstance(UpdateTopicRequest, requestData);

      // Validate instance
      const errors = await validate(updateTopic);
      if (errors.length > 0) {
        const firstError = errors[0];
        const errorMessage = firstError.constraints
          ? Object.values(firstError.constraints)[0]
          : "No error message available";
        // Build response
        res
          .status(StatusCodes.BAD_REQUEST)
          .json(new ResponseModelBuilder().withMessage(errorMessage).withStatusCode(StatusCodes.BAD_REQUEST).build());
        return;
      }
      logger.info("Update topic request: ", updateTopic);

      // Handle call service
      const email = res.locals.email;
      res.status(StatusCodes.OK).json(await topicService.updateTopicInLectureEnrollmentPeriod(updateTopic));
    } catch (error) {
      logger.error({ error });
      next(error);
    }
  }

  public async getAllApprovedTopicsInStudentEnrollmentPeriod(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const email = res.locals.email as string;
      const type = req.query.type as string;
      res.status(StatusCodes.OK).json(await topicService.getAllApprovedTopicsInStudentEnrollmentPeriod(type, email));
    } catch (error) {
      logger.error({ error });
      next(error);
    }
  }
  public getAllTopics = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data: IResponseModel<IListTopicResponse> = await topicService.getAllTopics();
      res.status(StatusCodes.OK).json(data);
    } catch (err) {
      next(err);
    }
  };
}

export default new TopicController();
