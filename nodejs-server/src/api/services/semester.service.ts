import { StatusCodes } from "http-status-codes";
import { logger } from "@configs";
import {
  IListSemesterReponse,
  IResponseModel,
  ResponseModelBuilder,
} from "@interfaces";
import { Semester } from "@models";

class SemesterService {
  public async getAllSemesters(): Promise<
    IResponseModel<IListSemesterReponse>
  > {
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
}

export default new SemesterService();
