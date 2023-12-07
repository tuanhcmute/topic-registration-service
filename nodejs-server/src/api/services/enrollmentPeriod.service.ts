import { StatusCodes } from "http-status-codes";
import _ from "lodash";
import { EnrollmentPeriodCode, SemesterStatus, TopicType } from "@configs/constants";
import { ValidateFailException } from "@exceptions";
import {
  IResponseModel,
  ResponseModelBuilder,
  IEnrollmentPeriodResponse,
  IListEnrollmentPeriodResponse
} from "@interfaces";
import { EnrollmentPeriod, Semester } from "@models";
import { logger } from "@configs";

class EnrollmentPeriodService {
  public async getEnrollmentPeriod(type: string, period: string): Promise<IResponseModel<IEnrollmentPeriodResponse>> {
    // Validate request data
    if (_.isNull(type) || _.isUndefined(type)) throw new ValidateFailException("Type parameter is empty");
    if (_.isNull(period) || _.isUndefined(period)) throw new ValidateFailException("Period parameter is empty");

    // Validate topic type
    const isTypeValid = Object.values(TopicType).some((item) => _.isEqual(item, type));
    if (!isTypeValid) throw new ValidateFailException("Topic type is not valid");

    // Validate Enrollment Period Code
    const isMatchEnrollmentPeriodCode = Object.values(EnrollmentPeriodCode).some((item) => _.isEqual(item, period));
    if (!isMatchEnrollmentPeriodCode) throw new ValidateFailException("Enrollment Period is not valid");

    // Get parameters from ENUM
    const topicType = type as TopicType;
    const enrollmentPeriodCode = period as EnrollmentPeriodCode;
    const semesterStatus = SemesterStatus.ACTIVATED;

    try {
      // Get Enrollment Period based on Topic type, Enrollment Period with Activated
      const enrollmentPeriod = await EnrollmentPeriod.findOne({
        where: {
          type: topicType.toString(),
          code: enrollmentPeriodCode.toString(),
          status: semesterStatus.toString()
        },
        attributes: ["code", "name", "startDate", "endDate", "type"],
        include: [{ model: Semester, as: "semester", attributes: ["id", "name"] }]
      });
      if (_.isNull(enrollmentPeriod)) throw new ValidateFailException("nrollment Period could not be found");

      const data: IEnrollmentPeriodResponse = {
        enrollmentPeriod
      };

      // Build response
      return new ResponseModelBuilder<IEnrollmentPeriodResponse>()
        .withMessage("Enrollment period has been successfully retrieved")
        .withStatusCode(StatusCodes.OK)
        .withData(data)
        .build();
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  public async getEnrollmentPeriodBySemesterId(semesterId: string) {
    try {
      if (_.isNull(semesterId) || _.isUndefined(semesterId)) {
        throw new ValidateFailException("Semester id is not valid");
      }
      const enrollmentPeriods = await EnrollmentPeriod.findAll({
        where: { semesterId }
      });
      const data = { enrollmentPeriods } as IListEnrollmentPeriodResponse;

      return new ResponseModelBuilder<IListEnrollmentPeriodResponse>()
        .withMessage("Enrollment periods have been successfully retrieved")
        .withStatusCode(StatusCodes.OK)
        .withData(data)
        .build();
    } catch (error) {
      logger.error({ error });
      throw error;
    }
  }
}

export default new EnrollmentPeriodService();
