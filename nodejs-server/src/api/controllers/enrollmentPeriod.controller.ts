import { logger } from "@configs";
import { ValidateFailException } from "@exceptions";
import { enrollmentPeriodService } from "@services";
import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import _ from "lodash";

class EnrollmentPeriodController {
  public async getEnrollmentPeriod(req: Request, res: Response, next: NextFunction): Promise<void> {
    const topicType = req.query?.type as string;
    const period = req.query?.period as string;
    if (_.isNull(topicType) || _.isUndefined(topicType)) throw new ValidateFailException("Type parameter is empty");
    if (_.isNull(period) || _.isUndefined(period)) throw new ValidateFailException("Period parameter is empty");
    try {
      res.status(StatusCodes.OK).json(await enrollmentPeriodService.getEnrollmentPeriod(topicType, period));
    } catch (error) {
      next(error);
    }
  }
  public async getEnrollmentPeriodBySemesterId(req: Request, res: Response, next: NextFunction) {
    try {
      const semesterId = req.query["semesterId"] as string;
      console.log(semesterId);
      res.status(StatusCodes.OK).json(await enrollmentPeriodService.getEnrollmentPeriodBySemesterId(semesterId));
    } catch (error) {
      logger.error({ error });
      next(error);
    }
  }
}

export default new EnrollmentPeriodController();
