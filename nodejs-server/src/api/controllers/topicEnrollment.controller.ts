import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

import { logger } from "@configs";
import {
  CreateTopicEnrollmentRequest,
  ResponseModelBuilder,
} from "@interfaces";
import { topicEnrollmentService } from "@services";

class TopicEnrollmentController {
  public async createTopicEnrollment(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      // Get raw topic from client
      const requestData = req.body;
      logger.info("Request data: ", requestData);

      // Convert raw to instance
      const createTopicEnrollmentRequest = plainToInstance(
        CreateTopicEnrollmentRequest,
        requestData
      );

      // Validate instance
      const errors = await validate(createTopicEnrollmentRequest);
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
      logger.info(
        "Create topic enrollment request: ",
        createTopicEnrollmentRequest
      );

      // Handle call service
      const email = res.locals.email;
      res
        .status(StatusCodes.OK)
        .json(
          await topicEnrollmentService.createTopicEnrollment(
            createTopicEnrollmentRequest
          )
        );
    } catch (error) {
      logger.error({ error });
      next(error);
    }
  }
}

export default new TopicEnrollmentController();
