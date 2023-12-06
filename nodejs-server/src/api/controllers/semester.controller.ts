import { logger } from "@configs";
import { ValidateFailException } from "@exceptions";
import { approvalHistoryService, semesterService } from "@services";
import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import _ from "lodash";

class SemesterController {
  public async getAllSemesters(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      res.status(StatusCodes.OK).json(await semesterService.getAllSemesters());
    } catch (error) {
      logger.error({ error });
      next(error);
    }
  }
}

export default new SemesterController();
