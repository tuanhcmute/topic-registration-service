import { StatusCodes } from "http-status-codes";
import _ from "lodash";
import { EnrollmentPeriodCode, SemesterStatus, TopicType } from "@configs/constants";
import { ValidateFailException } from "@exceptions";
import {
  IResponseModel,
  ResponseModelBuilder,
  IEnrollmentPeriodResponse,
  IListEnrollmentPeriodResponse,
  NewEnrollmentPeriodRequest,
  UpdateEnrollmentPeriodRequest
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

  public async createEnrollmentPeriod(semesterId: string, request: NewEnrollmentPeriodRequest) {
    try {
      const semester = await Semester.findByPk(semesterId);
      if (_.isNull(semester)) throw new ValidateFailException("Semester could not be found");
      await EnrollmentPeriod.create({
        semesterId: semester.id,
        code: request.code,
        name: request.name,
        startDate: new Date(request.startDate),
        endDate: new Date(request.endDate),
        type: request.type,
        status: SemesterStatus.SCHEDULED
      });
      return new ResponseModelBuilder<void>()
        .withMessage("Enrollment periods have been successfully created")
        .withStatusCode(StatusCodes.CREATED)
        .build();
    } catch (error) {
      logger.error({ error });
      throw error;
    }
  }
  public async updateEnrollmentPeriod(id: string, request: UpdateEnrollmentPeriodRequest) {
    try {
      const enrollmentPeriod = await EnrollmentPeriod.findByPk(id);
      if (_.isNull(enrollmentPeriod)) throw new ValidateFailException("Enrollment period could not be found");
      enrollmentPeriod.type = request.type;
      enrollmentPeriod.name = request.name;
      enrollmentPeriod.code = request.code;
      enrollmentPeriod.startDate = new Date(request.startDate);
      enrollmentPeriod.endDate = new Date(request.endDate);
      await enrollmentPeriod.save();
      return new ResponseModelBuilder<void>()
        .withMessage("Enrollment periods have been successfully updated")
        .withStatusCode(StatusCodes.OK)
        .build();
    } catch (error) {
      logger.error({ error });
      throw error;
    }
  }
}

export default new EnrollmentPeriodService();
