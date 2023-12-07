import { logger } from "@configs";
import { ValidateFailException } from "@exceptions";
import { NewSemesterRequest, ResponseModelBuilder, UpdateSemesterRequest } from "@interfaces";
import { semesterService } from "@services";
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import _ from "lodash";

class SemesterController {
  public async getAllSemesters(req: Request, res: Response, next: NextFunction) {
    try {
      res.status(StatusCodes.OK).json(await semesterService.getAllSemesters());
    } catch (error) {
      logger.error({ error });
      next(error);
    }
  }

  public async createSemester(req: Request, res: Response, next: NextFunction) {
    try {
      // Get raw topic from client
      const requestData = req.body;
      logger.info("Request data: ", requestData);

      // Convert raw to instance
      const newSemesterRequest = plainToInstance(NewSemesterRequest, requestData);

      // Validate instance
      const errors = await validate(newSemesterRequest);
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
      logger.info("New semester request: ", newSemesterRequest);
      res.status(StatusCodes.OK).json(await semesterService.createSemester(newSemesterRequest));
    } catch (error) {
      logger.error({ error });
      next(error);
    }
  }

  public async getSemesterById(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id as string;
      if (_.isNull(id) || _.isUndefined(id)) throw new ValidateFailException("Semester id is not valid");
      res.status(StatusCodes.OK).json(await semesterService.getSemesterById(id));
    } catch (error) {
      logger.error({ error });
      next(error);
    }
  }

  public async updateSemester(req: Request, res: Response, next: NextFunction) {
    try {
      // Get raw topic from client
      const semesterId = req.params.id as string;
      const requestData = req.body;
      logger.info("Request data: ", requestData);

      // Convert raw to instance
      const updateSemesterRequest = plainToInstance(UpdateSemesterRequest, requestData);

      // Validate instance
      const errors = await validate(updateSemesterRequest);
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
      logger.info("Update semester request: ", updateSemesterRequest);
      res.status(StatusCodes.OK).json(await semesterService.updateSemester(semesterId, updateSemesterRequest));
    } catch (error) {
      logger.error({ error });
      next(error);
    }
  }

  public async updateSemesterStatus(req: Request, res: Response, next: NextFunction) {
    try {
    } catch (error) {
      logger.error({ error });
      next(error);
    }
  }
}

export default new SemesterController();
