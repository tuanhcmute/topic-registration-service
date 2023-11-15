import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

import { logger } from "@configs";
import { CreateDivisionRequest, ResponseModelBuilder } from "@interfaces";
import { divisionService } from "@services";
import _ from "lodash";
import { ValidateFailException } from "@exceptions";

class DivisionController {
  public async getDivisionByTopicType(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      // Validate topic type
      const topicTypeRequest = req.query["topicType"]
        ?.toString()
        .trim() as string;
      if (_.isUndefined(topicTypeRequest) || _.isEmpty(topicTypeRequest))
        throw new ValidateFailException("Topic type is not valid");
      logger.info("Topic type request: ", topicTypeRequest);

      const email = res.locals.email;
      if (_.isUndefined(email) || _.isEmpty(email))
        throw new ValidateFailException("Email is not valid");
      logger.info({ email });

      // Response
      res
        .status(StatusCodes.OK)
        .json(
          await divisionService.getDivisionByTopicType(topicTypeRequest, email)
        );
    } catch (error) {
      logger.error(error);
      next(error);
    }
  }

  public async createDivisionByTopicType(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      // Validate topic type
      const topicTypeRequest = req.query["topicType"] as string;
      if (
        _.isNull(topicTypeRequest) ||
        _.isUndefined(topicTypeRequest) ||
        _.isEmpty(topicTypeRequest)
      )
        throw new ValidateFailException("Topic type is not valid");
      logger.info("Topic type request: ", topicTypeRequest);

      // Get request body
      const requestData = req.body;
      logger.info("Request data: ", requestData);

      // Plain to instance
      const createDivisionRequest = plainToInstance(
        CreateDivisionRequest,
        requestData
      );

      // Validate instance
      const errors = await validate(createDivisionRequest);
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
      logger.info("Create division request: ", createDivisionRequest);
      const email = res.locals.email;
      res
        .status(StatusCodes.OK)
        .json(
          await divisionService.createDivisionByTopicType(
            topicTypeRequest,
            createDivisionRequest,
            email
          )
        );
    } catch (error) {
      next(error);
    }
  }
}

export default new DivisionController();
