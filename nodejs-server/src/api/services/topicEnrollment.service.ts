import { ValidateFailException } from "@exceptions";
import _ from "lodash";
import {
  CreateTopicEnrollmentRequest,
  ResponseModelBuilder,
} from "@interfaces";
import { Topic, TopicEnrollment, User } from "@models";
import { logger } from "@configs";
import { StatusCodes } from "http-status-codes";

class TopicEnrollmentService {
  public async createTopicEnrollment(request: CreateTopicEnrollmentRequest) {
    logger.info(request);
    //        Get topic
    const topic = await Topic.findByPk(request.topicId);
    if (_.isNull(topic))
      throw new ValidateFailException("Topic could not be found");

    // Get topic enrollment
    const topicEnrollments = await TopicEnrollment.findAll({
      where: { topicId: topic.id },
      order: [["isLeader", "DESC"]],
      include: [{ model: User, as: "student" }],
    });

    if (!_.isEmpty(topicEnrollments)) {
      if (
        _.isEqual(topic.maxSlot, topicEnrollments.length) &&
        _.isEqual(topic.availableSlot, 0)
      ) {
        throw new ValidateFailException("Topic enrollment is full");
      }

      //           Validate user has already existed in topic enrollment
      const isAnyMatch = topicEnrollments.some((item) =>
        _.isEqual(item.student?.ntid, request.ntid)
      );
      if (isAnyMatch)
        throw new ValidateFailException("The student has already enrolled");
    }

    //        Get student
    const student = await User.findOne({ where: { ntid: request.ntid } });
    if (_.isNull(student))
      throw new ValidateFailException("Student could not be found");

    //           Validate user has already existed in another topic enrollment
    const topicEnrollment = await TopicEnrollment.findOne({
      where: { studentId: student.id },
    });
    if (!_.isNull(topicEnrollment))
      throw new ValidateFailException(
        "The student has already enrolled in another topic"
      );

    // Create topic enrollment
    const savedTopicEnrollment = await TopicEnrollment.create({
      topicId: topic.id,
      studentId: student.id,
    });
    if (_.isEmpty(topicEnrollments)) savedTopicEnrollment.isLeader = true;
    await savedTopicEnrollment.save();

    //        Update available slot
    if (topic.availableSlot) topic.availableSlot = topic.availableSlot - 1;

    // Build response
    return new ResponseModelBuilder<void>()
      .withStatusCode(StatusCodes.OK)
      .withMessage("Topic enrollments have been successfully created")
      .build();
  }
}

export default new TopicEnrollmentService();
