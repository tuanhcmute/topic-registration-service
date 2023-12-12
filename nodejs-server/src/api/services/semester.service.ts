import { StatusCodes } from "http-status-codes";
import { logger } from "@configs";
import {
  IListSemesterReponse,
  IResponseModel,
  NewSemesterRequest,
  ResponseModelBuilder,
  UpdateSemesterRequest
} from "@interfaces";
import { Semester, SemesterInstance } from "@models";
import { SemesterStatus } from "@configs/constants";
import { ValidateFailException } from "@exceptions";
import _ from "lodash";

class SemesterService {
  public async getAllSemesters(): Promise<IResponseModel<IListSemesterReponse>> {
    try {
      const semesters = await Semester.findAll({});
      const data = { semesters } as IListSemesterReponse;

      return new ResponseModelBuilder<IListSemesterReponse>()
        .withMessage("Semesters have been successfully retrieved")
        .withStatusCode(StatusCodes.OK)
        .withData(data)
        .build();
    } catch (error) {
      logger.error({ error });
      throw error;
    }
  }

  public async createSemester(request: NewSemesterRequest) {
    try {
      await Semester.create({
        name: request.name,
        type: request.type,
        startDate: new Date(request.startDate),
        endDate: new Date(request.endDate),
        status: SemesterStatus.SCHEDULED
      });
      return new ResponseModelBuilder<void>()
        .withMessage("Semester has been created successfully")
        .withStatusCode(StatusCodes.CREATED)
        .build();
    } catch (error) {
      logger.error({ error });
      throw error;
    }
  }

  public async getSemesterById(id: string) {
    try {
      const semester = await Semester.findByPk(id);
      if (_.isNull(semester)) throw new ValidateFailException("Semester could not be found");
      return new ResponseModelBuilder<SemesterInstance>()
        .withMessage("Semester has been successfully retrieved")
        .withStatusCode(StatusCodes.OK)
        .withData(semester)
        .build();
    } catch (error) {
      logger.error({ error });
      throw error;
    }
  }

  public async updateSemester(id: string, request: UpdateSemesterRequest) {
    try {
      const semester = await Semester.findByPk(id);
      if (_.isNull(semester)) throw new ValidateFailException("Semester could not be found");
      semester.type = request.type;
      semester.name = request.name;
      semester.startDate = new Date(request.startDate);
      semester.endDate = new Date(request.endDate);
      await semester.save();
      return new ResponseModelBuilder<void>()
        .withMessage("Semester has been successfully updated")
        .withStatusCode(StatusCodes.OK)
        .build();
    } catch (error) {
      logger.error({ error });
      throw error;
    }
  }

  public async getActivatedSemester() {
    try {
      const semester = await Semester.findOne({
        where: {
          status: SemesterStatus.ACTIVATED.toString()
        }
      });
      if (_.isNull(semester)) throw new ValidateFailException("Activated semester could not be found");
      return semester;
    } catch (error) {
      logger.error({ error });
      throw error;
    }
  }
}

export default new SemesterService();
