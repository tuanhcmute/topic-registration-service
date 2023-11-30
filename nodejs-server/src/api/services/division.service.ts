import { logger } from "@configs";
import { SemesterStatus, TopicStatus, TopicType } from "@configs/constants";
import {
  InternalServerErrorException,
  ValidateFailException,
} from "@exceptions";
import {
  CreateDivisionRequest,
  IListDivisionResponse,
  IListTopicResponse,
  IResponseModel,
  ResponseModelBuilder,
} from "@interfaces";
import { Division, DivisionInstance, Semester, Topic, User } from "@models";
import { StatusCodes } from "http-status-codes";
import _ from "lodash";
import moment from "moment";

class DivisionService {
  public async createDivisionByTopicType(
    topicType: string,
    requestData: CreateDivisionRequest,
    email: string
  ): Promise<IResponseModel<void>> {
    // Validate topicType
    if (_.isNull(topicType) || _.isUndefined(topicType) || _.isEmpty(topicType))
      throw new ValidateFailException("Topic type is not valid");
    const isTypeValid = Object.values(TopicType).some((item) =>
      _.isEqual(item, topicType)
    );
    if (!isTypeValid)
      throw new ValidateFailException("Topic type could not be found");

    // Get assigned lecture
    const assignedlecture = await User.findOne({
      where: {
        ntid: requestData.lectureCode,
      },
    });
    if (_.isNull(assignedlecture))
      throw new ValidateFailException("Lecture could not be found");

    // Validate topic
    const topic = await Topic.findOne({ where: { id: requestData.topicId } });
    if (_.isNull(topic))
      throw new ValidateFailException("Topic could not be found");

    if (_.isEqual(topic.status, TopicStatus.ASSIGNED)) {
      throw new ValidateFailException("Topic has been assigned");
    }

    if (!_.isEqual(topic.status, TopicStatus.APPROVED))
      throw new ValidateFailException("Topic hasn't been approved yet");

    // Saved division
    const division = await Division.create({
      place: requestData.place,
      startDate: moment(requestData.startDate, "YYYY-MM-DD").toDate(),
      specifiedTime: requestData.specifiedTime,
      topicId: requestData.topicId,
      lectureId: assignedlecture.id,
    });

    // Validate division
    if (_.isNull(division))
      throw new InternalServerErrorException("Division could not be saved");
    logger.info("Division: ", division);

    // Update topic status
    topic.status = TopicStatus.ASSIGNED;
    topic.save();

    // Build response
    return new ResponseModelBuilder<void>()
      .withStatusCode(StatusCodes.CREATED)
      .withMessage("Division has been created successfully")
      .build();
  }
  public async getDivisionByTopicType(topicType: string, email: string) {
    // Validate topicType
    if (_.isNull(topicType) || _.isUndefined(topicType) || _.isEmpty(topicType))
      throw new ValidateFailException("Topic type is not valid");
    const isTypeValid = Object.values(TopicType).some((item) =>
      _.isEqual(item, topicType)
    );
    if (!isTypeValid)
      throw new ValidateFailException("Topic type could not be found");

    // Get current semester
    const semester = await Semester.findOne({
      where: {
        status: SemesterStatus.ACTIVATED,
      },
    });
    if (_.isNull(semester))
      throw new ValidateFailException("Current semester could not be found");

    // Get current lecture
    const lecture = await User.findOne({ where: { email } });
    if (_.isNull(lecture))
      throw new ValidateFailException("Current lecture could not be found");

    // Get division
    const divisions = await Division.findAll({
      where: {
        lectureId: lecture.id,
      },
      attributes: ["id", "place", "startDate", "specifiedTime", "topicId"],
      include: [
        {
          model: Topic,
          as: "topic",
          attributes: ["goal", "requirement", "id", "name", "type", "status"],
          include: [
            { model: User, as: "lecture", attributes: ["ntid", "name"] },
          ],
        },
      ],
    });

    const data: IListDivisionResponse = {
      divisions,
    };
    return new ResponseModelBuilder<IListDivisionResponse>()
      .withStatusCode(StatusCodes.OK)
      .withMessage("Divisions have been retrieved successfully")
      .withData(data)
      .build();
  }
}

export default new DivisionService();
