import { logger } from "@configs";
import { ValidateFailException } from "@exceptions";
import { NewEnrollmentPeriodRequest, ResponseModelBuilder, UpdateEnrollmentPeriodRequest } from "@interfaces";
import { enrollmentPeriodService } from "@services";
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import _ from "lodash";

class EnrollmentPeriodController {
  public async getActivatedEnrollmentPeriod(req: Request, res: Response, next: NextFunction): Promise<void> {
    const topicType = req.query?.type as string;
    if (_.isNull(topicType) || _.isUndefined(topicType)) throw new ValidateFailException("Type parameter is empty");
    try {
      res.status(StatusCodes.OK).json(await enrollmentPeriodService.getActivatedEnrollmentPeriod(topicType));
    } catch (error) {
      next(error);
    }
  }
  public async getEnrollmentPeriodBySemesterId(req: Request, res: Response, next: NextFunction) {
    try {
      const semesterId = req.query["semesterId"] as string;
      logger.info({ semesterId });
      res.status(StatusCodes.OK).json(await enrollmentPeriodService.getEnrollmentPeriodBySemesterId(semesterId));
    } catch (error) {
      logger.error({ error });
      next(error);
    }
  }

  public async createEnrollmentPeriod(req: Request, res: Response, next: NextFunction) {
    try {
      const semesterId = req.query["semesterId"] as string;
      // Get raw request from client
      const requestData = req.body;

      logger.info({ semesterId });
      logger.info("Request data: ", requestData);

      // Convert raw to instance
      const newEnrollmentPeriodRequest = plainToInstance(NewEnrollmentPeriodRequest, requestData);

      // Validate instance
      const errors = await validate(newEnrollmentPeriodRequest);
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
      logger.info("New enrollment period request: ", newEnrollmentPeriodRequest);
      res
        .status(StatusCodes.OK)
        .json(await enrollmentPeriodService.createEnrollmentPeriod(semesterId, newEnrollmentPeriodRequest));
    } catch (error) {
      logger.error({ error });
      next(error);
    }
  }
  public async udpateEnrollmentPeriod(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id as string;
      // Get raw request from client
      const requestData = req.body;

      logger.info({ id });
      logger.info("Request data: ", requestData);

      // Convert raw to instance
      const updateEnrollmentPeriodRequest = plainToInstance(UpdateEnrollmentPeriodRequest, requestData);

      // Validate instance
      const errors = await validate(updateEnrollmentPeriodRequest);
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
      logger.info("New enrollment period request: ", updateEnrollmentPeriodRequest);
      res
        .status(StatusCodes.OK)
        .json(await enrollmentPeriodService.updateEnrollmentPeriod(id, updateEnrollmentPeriodRequest));
    } catch (error) {
      logger.error({ error });
      next(error);
    }
  }
}

export default new EnrollmentPeriodController();
