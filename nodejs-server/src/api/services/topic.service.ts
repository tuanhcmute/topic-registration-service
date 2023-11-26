import { StatusCodes } from "http-status-codes";
import _, { forEach } from "lodash";

import { SemesterStatus, TopicStatus, TopicType } from "@configs/constants";
import ValidateException from "@exceptions/ValidateFailException";

import {
  NewTopicRequest,
  IListTopicResponse,
  ApprovalTopicRequest,
  UpdateTopic,
} from "@interfaces/topic.interface";
import { db, logger } from "@configs";
import {
  Topic,
  TopicInstance,
  User,
  Semester,
  TopicEnrollment,
  Major,
  ApprovalHistory,
} from "@models";
import { IResponseModel, ResponseModelBuilder } from "@interfaces";
import { UserNotFoundException, ValidateFailException } from "@exceptions";
import InternalServerErrorException from "@exceptions/InternalServerErrorException";

class TopicService {
  // Class implementation goes here
  public getAllTopicsInLectureEnrollmentPeriodByTypeAndLecture = async (
    type: string,
    email: string
  ): Promise<IResponseModel<IListTopicResponse>> => {
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
      const data: IListTopicResponse = { topics };
      return new ResponseModelBuilder<IListTopicResponse>()
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
      if (transaction) {
        await transaction.rollback();
      }
      throw err;
    }
  };

  private updateTopicStudent = async (
    topic: TopicInstance,
    updateTopic: UpdateTopic
  ) => {
    const newStudents: string[] = updateTopic.students;
    const enrollments = await TopicEnrollment.findAll({
      where: {
        topicId: topic.id,
      },
    });

    const existingStudentIds = enrollments.map(
      (enrollment) => enrollment.studentId || ""
    );
    console.log(existingStudentIds);
    const enrollmentsToDelete = existingStudentIds.filter(
      (id) => !newStudents.includes(id)
    );

    console.log(enrollmentsToDelete);

    const enrollmentsToCreateOrUpdate = newStudents.filter(
      (studentId) => !existingStudentIds.includes(studentId)
    );

    console.log(enrollmentsToCreateOrUpdate);

    const transaction = await db.transaction(); // Begin a transaction

    try {
      // Delete enrollments not present in newStudents within the transaction
      for (const studentId of enrollmentsToDelete) {
        await TopicEnrollment.destroy({
          where: {
            topicId: topic.id,
            studentId: studentId,
          },
          transaction: transaction,
        });
      }

      // Create or update enrollments for newStudents within the transaction
      const bulkCreateData = enrollmentsToCreateOrUpdate.map((studentId) => ({
        topicId: topic.id || "",
        studentId,
        createdBy: topic.lectureId,
      }));
      await TopicEnrollment.bulkCreate(bulkCreateData, { transaction });

      // If everything went well, commit the transaction
      await transaction.commit();
      console.log("Transaction committed successfully.");
    } catch (error) {
      // If any operation fails, rollback the transaction
      await transaction.rollback();
      console.error(`Transaction rolled back due to error: ${error}`);
      // Handle the error accordingly
    }
  };

  public updateTeacherTopic = async (
    updateTopic: UpdateTopic,
    topic: TopicInstance
  ): Promise<void> => {
    try {
      if (_.isNull(topic) || _.isEmpty(topic))
        throw new ValidateException("Topic could not be found");

      topic.name = updateTopic.topicName;
      topic.goal = updateTopic.goal;
      topic.requirement = updateTopic.requirement;
      topic.maxSlot = updateTopic.maxSlot;
      this.updateTopicStudent(topic, updateTopic);
      await topic.save();
    } catch (err) {
      console.log(err);
      throw err;
    }
  };

  public async approveTopicInLectureEnrollmentPeriod(
    request: ApprovalTopicRequest
  ): Promise<IResponseModel<void>> {
    // Get topic status
    const isStatusValid = Object.values(TopicStatus).some((item) =>
      _.isEqual(item, request.status)
    );
    if (!isStatusValid)
      throw new ValidateFailException("Topic status could not be found");
    const topicStatus = request.status as TopicStatus;

    // Get topic
    const topic = await Topic.findByPk(request.id);
    if (_.isNull(topic))
      throw new ValidateFailException("Topic could not be found");

    // Handle if topic is not approved
    if (!_.isEqual(topic.status, TopicStatus.APPROVED)) {
      topic.status = topicStatus;
      await topic.save();
      logger.info("Topic: ", topic.dataValues);

      const approvalHistory = await ApprovalHistory.create({
        reason: request.reason,
        topicId: request.id,
        status: request.status,
      });
      logger.info("Approval history: ", approvalHistory.dataValues);
    }

    return new ResponseModelBuilder<void>()
      .withStatusCode(StatusCodes.OK)
      .withMessage("Topic has been updated successfully")
      .build();
  }

  public async getAllTopicsInLectureEnrollmentPeriodByTypeAndTopicStatusAndMajor(
    typeRequest: string,
    statusRequest: string,
    email: string
  ): Promise<IResponseModel<IListTopicResponse>> {
    // Validate
    if (
      _.isNull(typeRequest) ||
      _.isUndefined(typeRequest) ||
      _.isEmpty(typeRequest)
    )
      throw new ValidateFailException("Topic type is not valid");
    if (
      _.isNull(statusRequest) ||
      _.isUndefined(statusRequest) ||
      _.isEmpty(statusRequest)
    )
      throw new ValidateFailException("Topic status is not valid");
    const isTypeValid = Object.values(TopicType).some((item) =>
      _.isEqual(item, typeRequest)
    );
    if (!isTypeValid)
      throw new ValidateFailException("Topic type could not be found");

    const isStatusValid = Object.values(TopicStatus).some((item) =>
      _.isEqual(item, statusRequest)
    );
    if (!isStatusValid)
      throw new ValidateFailException("Topic status could not be found");

    // Get activated semester
    const semester = await Semester.findOne({
      where: {
        status: SemesterStatus.ACTIVATED,
      },
    });
    if (_.isNull(semester))
      throw new ValidateFailException("Current semester is not activated");

    // Get head
    const head = await User.findOne({
      where: { email },
    });
    if (_.isNull(head))
      throw new ValidateFailException("User could not be found");

    // Query
    const topics = await Topic.findAll({
      where: {
        semesterId: semester.id,
        type: typeRequest,
        status: statusRequest,
        majorId: head.majorId,
      },
    });
    // Build data
    const data: IListTopicResponse = { topics };
    return new ResponseModelBuilder<IListTopicResponse>()
      .withStatusCode(StatusCodes.OK)
      .withMessage("Topics have been successfully retrieved")
      .withData(data)
      .build();
  }
}

export default new TopicService();
