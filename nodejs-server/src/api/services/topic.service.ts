import _ from "lodash";

import { SemesterStatus, TopicStatus, TopicType } from "@configs/constants";
import ValidateException from "@exceptions/ValidateFailException";
import { Topic, User, Semester, TopicEnrollment, Major } from "@models";
import {
  NewTopicRequest,
  ListTopicResponse,
} from "@interfaces/topic.interface";
import { db } from "@configs";
import { IResponseModel, ResponseModelBuilder } from "@interfaces";
import { StatusCodes } from "http-status-codes";
import { UserNotFoundException, ValidateFailException } from "@exceptions";
import InternalServerErrorException from "@exceptions/InternalServerErrorException";

class TopicService {
  // Class implementation goes here
  public getAllTopicsInLectureEnrollmentPeriodByTypeAndLecture = async (
    type: string,
    email: string
  ): Promise<IResponseModel<ListTopicResponse>> => {
    try {
      // Validate type
      if (_.isEmpty(type)) throw new ValidateException("type is not valid");
      const isTypeValid = Object.keys(TopicType).some(
        (item) => item === type.toUpperCase()
      );
      if (!isTypeValid) throw new ValidateException("Topic type is not valid");

      // Validate lecture
      const lecture = await User.findOne({
        where: {
          email: email,
        },
      });
      if (_.isNull(lecture) || _.isEmpty(lecture))
        throw new ValidateException("Lecture could not be found");

      // Validate current semester
      const currentSemester = await Semester.findOne({
        where: {
          status: SemesterStatus.ACTIVATED,
        },
      });
      if (_.isNull(currentSemester) || _.isEmpty(currentSemester))
        throw new ValidateException("Current semester could not be found");

      // Get the list of topics from db
      const topics = await Topic.findAll({
        where: {
          type: type,
          lectureId: lecture.dataValues.id,
          semesterId: currentSemester.dataValues.id,
        },
        include: [
          {
            model: User,
            as: "lecture",
            attributes: ["ntid", "name"],
          },
          {
            model: TopicEnrollment,
            as: "topicEnrollments",
            include: [
              { model: User, as: "student", attributes: ["ntid", "name"] },
            ],
            attributes: ["id"],
          },
        ],
        attributes: {
          exclude: ["createdBy", "createdDate", "updatedDate", "lectureId"],
        },
        order: ["createdDate"],
      });
      const data: ListTopicResponse = { topics };
      return new ResponseModelBuilder<ListTopicResponse>()
        .withMessage("Topics have been successfully retrieved")
        .withStatusCode(StatusCodes.OK)
        .withData(data)
        .build();
    } catch (err) {
      console.log(err);
      throw err;
    }
  };

  public createNewTopicInLectureEnrollmentPeriod = async (
    request: NewTopicRequest,
    email: string
  ): Promise<IResponseModel<void>> => {
    // Get lecture
    const currentLecture = await User.findOne({ where: { email } });
    // Validate lecture
    if (_.isNull(currentLecture))
      throw new UserNotFoundException("Current lecture could not be found");
    if (!_.isEqual(currentLecture?.ntid, request.ntid))
      throw new ValidateFailException("Ntid is not the same with current user");

    // Validate major
    const major = await Major.findOne({ where: { code: request.majorCode } });
    if (_.isNull(major))
      throw new ValidateFailException("Major could not be found");

    // Validate semester
    const currentSemester = await Semester.findOne({
      where: { status: SemesterStatus.ACTIVATED },
    });
    if (_.isNull(currentSemester))
      throw new ValidateFailException("Current semester could not be found");

    const students = await Promise.all(
      request.students.map(async (item) => {
        const student = await User.findOne({
          where: {
            ntid: item,
          },
        });
        if (_.isNull(student))
          throw new ValidateFailException(`${item} is not valid`);
        return student;
      })
    );

    // Validate available slot
    if (request.maxSlot < request.students.length)
      throw new ValidateFailException(
        "Max slot could not be less than size of student"
      );
    const availableSlot = request.maxSlot - request.students.length;

    let transaction;
    try {
      transaction = await db.transaction();
      // Save topic
      const topic = await Topic.create(
        {
          name: request.topicName,
          goal: request.goal,
          requirement: request.requirement,
          maxSlot: request.maxSlot,
          majorId: major.id,
          type: request.type,
          lectureId: currentLecture.id,
          semesterId: currentSemester.id,
          availableSlot: availableSlot,
          status: TopicStatus.PENDING,
        },
        { transaction }
      );

      // Validate topic
      if (_.isNull(topic))
        throw new InternalServerErrorException("Topic could not be saved");
      console.info(topic.id);

      // Save topic enrollment
      students.forEach(async (item) => {
        await TopicEnrollment.create({
          topicId: topic.id, // Use the ID of the created topic
          studentId: item.id, // Use the ID of the fetched student
          // Set other relevant fields as needed
        });
      });

      // Commit the transaction to save changes to the database
      await transaction.commit();

      return new ResponseModelBuilder<void>()
        .withMessage("Topic has been created successfully")
        .withStatusCode(StatusCodes.CREATED)
        .build();
    } catch (err) {
      // Roll back the transaction in case of an error
      if (transaction) await transaction.rollback();
      console.error(err);
      throw err;
    }
  };
}

export default new TopicService();
