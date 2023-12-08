import { StatusCodes } from "http-status-codes";
import _ from "lodash";
import { Op } from "sequelize";

import { SemesterStatus, TopicStatus, TopicType } from "@configs/constants";
import ValidateException from "@exceptions/ValidateFailException";
import { Topic, User, Semester, TopicEnrollment, Major, ApprovalHistory } from "@models";
import {
  NewTopicRequest,
  IListTopicResponse,
  ApprovalTopicRequest,
  UpdateTopicRequest
} from "@interfaces/topic.interface";
import { db, logger } from "@configs";
import { CreateTopicEnrollmentRequest, IResponseModel, ResponseModelBuilder } from "@interfaces";
import { UserNotFoundException, ValidateFailException } from "@exceptions";
import InternalServerErrorException from "@exceptions/InternalServerErrorException";
import topicEnrollmentService from "./topicEnrollment.service";

class TopicService {
  // Class implementation goes here
  public getAllTopicsInLectureEnrollmentPeriodByTypeAndLecture = async (
    type: string,
    email: string
  ): Promise<IResponseModel<IListTopicResponse>> => {
    try {
      // Validate type
      if (_.isEmpty(type)) throw new ValidateException("type is not valid");
      const isTypeValid = Object.keys(TopicType).some((item) => item === type.toUpperCase());
      if (!isTypeValid) throw new ValidateException("Topic type is not valid");

      // Validate lecture
      const lecture = await User.findOne({
        where: {
          email: email
        }
      });
      if (_.isNull(lecture) || _.isEmpty(lecture)) throw new ValidateException("Lecture could not be found");

      // Validate current semester
      const currentSemester = await Semester.findOne({
        where: {
          status: SemesterStatus.ACTIVATED
        }
      });
      if (_.isNull(currentSemester) || _.isEmpty(currentSemester))
        throw new ValidateException("Current semester could not be found");

      // Get the list of topics from db
      const topics = await Topic.findAll({
        where: {
          type: type,
          lectureId: lecture.dataValues.id,
          semesterId: currentSemester.dataValues.id
        },
        include: [
          {
            model: User,
            as: "lecture",
            attributes: ["ntid", "name"]
          },
          {
            model: TopicEnrollment,
            as: "topicEnrollments",
            include: [{ model: User, as: "student", attributes: ["ntid", "name"] }],
            attributes: ["id"]
          }
        ],
        attributes: {
          exclude: ["createdBy", "createdDate", "updatedDate", "lectureId"]
        },
        order: ["createdDate"]
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
    if (_.isNull(currentLecture)) throw new UserNotFoundException("Current lecture could not be found");
    if (!_.isEqual(currentLecture?.ntid, request.ntid))
      throw new ValidateFailException("Ntid is not the same with current user");

    // Validate major
    const major = await Major.findOne({ where: { code: request.majorCode } });
    if (_.isNull(major)) throw new ValidateFailException("Major could not be found");

    // Validate semester
    const currentSemester = await Semester.findOne({
      where: { status: SemesterStatus.ACTIVATED }
    });
    if (_.isNull(currentSemester)) throw new ValidateFailException("Current semester could not be found");

    const students = await Promise.all(
      request.students.map(async (item) => {
        const student = await User.findOne({
          where: {
            ntid: item
          }
        });
        if (_.isNull(student)) throw new ValidateFailException(`${item} is not valid`);
        return student;
      })
    );

    // Validate available slot
    if (request.maxSlot < request.students.length)
      throw new ValidateFailException("Max slot could not be less than size of student");

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
          availableSlot: request.maxSlot,
          status: TopicStatus.PENDING
        },
        { transaction }
      );

      // Validate topic
      if (_.isNull(topic)) throw new InternalServerErrorException("Topic could not be saved");
      logger.info(topic.id);

      // Save topic enrollment
      students.forEach(async (item) => {
        await TopicEnrollment.create({
          topicId: topic.id, // Use the ID of the created topic
          studentId: item.id // Use the ID of the fetched student
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

  public async approveTopicInLectureEnrollmentPeriod(request: ApprovalTopicRequest): Promise<IResponseModel<void>> {
    // Get topic status
    const isStatusValid = Object.values(TopicStatus).some((item) => _.isEqual(item, request.status));
    if (!isStatusValid) throw new ValidateFailException("Topic status could not be found");
    const topicStatus = request.status as TopicStatus;

    // Get topic
    const topic = await Topic.findByPk(request.id);
    if (_.isNull(topic)) throw new ValidateFailException("Topic could not be found");

    // Handle if topic is not approved
    if (!_.isEqual(topic.status, TopicStatus.APPROVED)) {
      topic.status = topicStatus;
      await topic.save();
      logger.info("Topic: ", topic.dataValues);

      const approvalHistory = await ApprovalHistory.create({
        reason: request.reason,
        topicId: request.id,
        status: request.status
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
    if (_.isNull(typeRequest) || _.isUndefined(typeRequest) || _.isEmpty(typeRequest))
      throw new ValidateFailException("Topic type is not valid");
    if (_.isNull(statusRequest) || _.isUndefined(statusRequest) || _.isEmpty(statusRequest))
      throw new ValidateFailException("Topic status is not valid");
    const isTypeValid = Object.values(TopicType).some((item) => _.isEqual(item, typeRequest));
    if (!isTypeValid) throw new ValidateFailException("Topic type could not be found");

    const isStatusValid = Object.values(TopicStatus).some((item) => _.isEqual(item, statusRequest));
    if (!isStatusValid) throw new ValidateFailException("Topic status could not be found");

    // Get activated semester
    const semester = await Semester.findOne({
      where: {
        status: SemesterStatus.ACTIVATED
      }
    });
    if (_.isNull(semester)) throw new ValidateFailException("Current semester is not activated");

    // Get head
    const head = await User.findOne({
      where: { email }
    });
    if (_.isNull(head)) throw new ValidateFailException("User could not be found");

    // Query
    const topics = await Topic.findAll({
      where: {
        semesterId: semester.id,
        type: typeRequest,
        status: statusRequest,
        majorId: head.majorId
      }
    });
    // Build data
    const data: IListTopicResponse = { topics };
    return new ResponseModelBuilder<IListTopicResponse>()
      .withStatusCode(StatusCodes.OK)
      .withMessage("Topics have been successfully retrieved")
      .withData(data)
      .build();
  }

  public getAllTopics = async (): Promise<IResponseModel<IListTopicResponse>> => {
    try {
      const topics = await Topic.findAll({
        include: [
          {
            model: User,
            as: "lecture",
            attributes: ["ntid", "name"]
          },
          {
            model: TopicEnrollment,
            as: "topicEnrollments",
            include: [{ model: User, as: "student", attributes: ["ntid", "name"] }],
            attributes: ["id"]
          },
          { model: Major, as: "major", attributes: ["code", "name"] }
        ],
        attributes: {
          exclude: ["createdBy", "createdDate", "updatedDate", "lectureId", "semesterId", "id"]
        },
        order: ["createdDate"]
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

  public async getAllTopicsIsNotApprovedDuringTheLectureEnrollmentPeriod(
    type: string,
    email: string
  ): Promise<IResponseModel<IListTopicResponse>> {
    // Validate type
    const isTypeValid = Object.values(TopicType).some((item) => _.isEqual(item, type));
    if (!isTypeValid) throw new ValidateFailException("Topic type could not be found");

    if (!email) throw new ValidateException("Email is not valid");

    // Get activated semester
    const semester = await Semester.findOne({
      where: {
        status: SemesterStatus.ACTIVATED
      }
    });
    if (_.isNull(semester)) throw new ValidateFailException("Current semester is not activated");

    // Get head
    const head = await User.findOne({
      where: { email }
    });
    if (_.isNull(head)) throw new ValidateFailException("User could not be found");

    const topics = await Topic.findAll({
      where: {
        semesterId: semester.id,
        type: type,
        majorId: head.majorId,
        status: {
          [Op.notIn]: [TopicStatus.APPROVED, TopicStatus.ASSIGNED]
        }
      },
      include: [
        {
          model: User,
          as: "lecture",
          attributes: ["ntid", "name"]
        },
        {
          model: TopicEnrollment,
          as: "topicEnrollments",
          include: [{ model: User, as: "student", attributes: ["ntid", "name"] }],
          attributes: ["id"]
        }
      ]
    });

    // Build data
    const data: IListTopicResponse = { topics };
    return new ResponseModelBuilder<IListTopicResponse>()
      .withStatusCode(StatusCodes.OK)
      .withMessage("Topics have been successfully retrieved")
      .withData(data)
      .build();
  }

  public async getAllTopicsApprovedDuringTheLectureEnrollmentPeriod(
    type: string,
    email: string
  ): Promise<IResponseModel<IListTopicResponse>> {
    // Validate type
    const isTypeValid = Object.values(TopicType).some((item) => _.isEqual(item, type));
    if (!isTypeValid) throw new ValidateFailException("Topic type could not be found");

    if (!email) throw new ValidateException("Email is not valid");

    // Get activated semester
    const semester = await Semester.findOne({
      where: {
        status: SemesterStatus.ACTIVATED
      }
    });
    if (_.isNull(semester)) throw new ValidateFailException("Current semester is not activated");

    // Get head
    const head = await User.findOne({
      where: { email }
    });
    if (_.isNull(head)) throw new ValidateFailException("User could not be found");

    // Get topics by semester, type, major, status = approved
    const topics = await Topic.findAll({
      where: {
        semesterId: semester.id,
        type: type,
        majorId: head.majorId,
        status: {
          [Op.in]: [TopicStatus.APPROVED]
        }
      }
    });

    // Build data
    const data: IListTopicResponse = { topics };
    return new ResponseModelBuilder<IListTopicResponse>()
      .withStatusCode(StatusCodes.OK)
      .withMessage("Topics have been successfully retrieved")
      .withData(data)
      .build();
  }

  public async updateTopicInLectureEnrollmentPeriod(request: UpdateTopicRequest) {
    //        Find topic by id
    const topic = await Topic.findByPk(request.id);
    if (_.isNull(topic)) throw new ValidateFailException("Topic could not be found");

    //        Get current topic enrollment to compare with student request
    let isAllMatch = false;
    const currentTopicEnrollments = await TopicEnrollment.findAll({
      where: { topicId: topic.id },
      order: [["isLeader", "DESC"]],
      include: [{ model: User, as: "student" }]
    });

    if (!_.isEmpty(currentTopicEnrollments)) {
      for (const topicEnrollment of currentTopicEnrollments) {
        for (const ntid of request.students) {
          if (!_.isNull(topicEnrollment.student)) {
            if (_.isEqual(topicEnrollment.student?.ntid, ntid)) {
              const index = request.students.indexOf(ntid);
              request.students.splice(index, 1);
            }
          }
        }
      }
      if (_.isEmpty(request.students)) isAllMatch = true;
    }
    logger.info(request.students);

    if (!isAllMatch) {
      if (_.isUndefined(topic.availableSlot)) throw new ValidateFailException("Available slot is not valid");
      if (topic.availableSlot < request.students.length)
        throw new ValidateFailException("Available slot could not be less than size of student");

      for (const ntid of request.students) {
        // Create enrollment
        const topicEnrollment = {
          ntid,
          topicId: topic.id
        } as CreateTopicEnrollmentRequest;
        await topicEnrollmentService.createTopicEnrollment(topicEnrollment);
      }
    }

    // Update value
    topic.name = request.topicName;
    topic.goal = request.goal;
    topic.requirement = request.requirement;
    topic.maxSlot = request.maxSlot;
    topic.status = TopicStatus.UPDATED;
    await topic.save();

    //        Store approval history
    // Build response
    return new ResponseModelBuilder<void>()
      .withStatusCode(StatusCodes.OK)
      .withMessage("Topics have been successfully updated")
      .build();
  }

  public async getAllApprovedTopicsInStudentEnrollmentPeriod(
    type: string,
    email: string
  ): Promise<IResponseModel<IListTopicResponse>> {
    // Validate type
    const isTypeValid = Object.values(TopicType).some((item) => _.isEqual(item, type));
    if (!isTypeValid) throw new ValidateFailException("Topic type could not be found");
    if (!email) throw new ValidateException("Email is not valid");

    // Get activated semester
    const semester = await Semester.findOne({
      where: {
        status: SemesterStatus.ACTIVATED
      }
    });
    if (_.isNull(semester)) throw new ValidateFailException("Current semester is not activated");

    // Get student
    const student = await User.findOne({
      where: { email }
    });
    if (_.isNull(student)) throw new ValidateFailException("User could not be found");

    const topics = await Topic.findAll({
      where: {
        semesterId: semester.id,
        type: type,
        majorId: student.majorId,
        status: {
          [Op.or]: [TopicStatus.APPROVED, TopicStatus.ASSIGNED]
        }
      },
      include: [
        {
          model: User,
          as: "lecture",
          attributes: ["ntid", "name"]
        },
        {
          model: TopicEnrollment,
          as: "topicEnrollments",
          include: [{ model: User, as: "student", attributes: ["ntid", "name"] }],
          attributes: ["id"]
        }
      ]
    });

    // Build data
    const data: IListTopicResponse = { topics };
    return new ResponseModelBuilder<IListTopicResponse>()
      .withStatusCode(StatusCodes.OK)
      .withMessage("Topics have been successfully retrieved")
      .withData(data)
      .build();
  }

  public async searchTopicsByTitle(title: string): Promise<IResponseModel<IListTopicResponse>> {
    // Validate title
    if (_.isNull(title) || _.isUndefined(title) || _.isEmpty(title))
      throw new ValidateFailException("Title is not valid");

    // Get topics
    const topics = await Topic.findAll({
      where: {
        name: {
          [Op.like]: `%${title}%`
        }
      },
      include: [
        {
          model: User,
          as: "lecture",
          attributes: ["ntid", "name"]
        },
        {
          model: TopicEnrollment,
          as: "topicEnrollments",
          include: [{ model: User, as: "student", attributes: ["ntid", "name"] }],
          attributes: ["id"]
        }
      ]
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
