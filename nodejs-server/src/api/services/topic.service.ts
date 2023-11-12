import _ from "lodash";

import { SemesterStatus, TopicType } from "@configs/constants";
import ValidateException from "@exceptions/ValidateFailException";
import {
  Topic,
  TopicInstance,
  User,
  Semester,
  TopicEnrollment,
  UserInstance,
} from "@models";
import { CreateReqTopic, Data, UpdateTopic } from "@interfaces/topic.interface";
import { db } from "@configs";
import { IResponseModel, ResponseModelBuilder } from "@interfaces";
import { StatusCodes } from "http-status-codes";
import { Enrollment, EnrollmentAttributes } from "@models/enrollment.model";
import { Transaction } from "sequelize";

export default class TopicService {
  // Class implementation goes here
  public getAllTopicsInLectureEnrollmentPeriodByTypeAndLecture = async (
    type: string,
    email: string
  ): Promise<IResponseModel<Data>> => {
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
          },
        ],
        attributes: {
          exclude: ["createdBy", "createdDate", "updatedDate", "lectureId"],
        },
        order: ["createdDate"],
      });
      const data: Data = { topics };
      return new ResponseModelBuilder<Data>()
        .withMessage("Topics have been successfully retrieved")
        .withStatusCode(StatusCodes.OK)
        .withData(data)
        .build();
    } catch (err) {
      console.log(err);
      throw err;
    }
  };

  public createTopic = async (
    newTopic: CreateReqTopic,
    userId: string
  ): Promise<TopicInstance> => {
    let transaction;

    const user = await User.findOne({ where: { id: userId } });
    try {
      // Start a database transaction to ensure data consistency
      transaction = await db.transaction();

      const topic = await Topic.create(
        {
          code: newTopic.ntid,
          majorId: newTopic.majorCode || "",
          name: newTopic.topicName,
          goal: newTopic.goal,
          requirement: newTopic.requirement,
          type: newTopic.type,
          maxSlot: newTopic.maxSlot,
        },
        { transaction }
      );

      for (const code of newTopic.students) {
        const enrollment = new Enrollment();
        enrollment.topicId = topic.id || "";
        enrollment.studentId = code;
        await enrollment.save({ transaction });
      }

      // Commit the transaction to save changes to the database
      await transaction.commit();
      console.info("create topic success");
      return topic;
    } catch (err) {
      // Roll back the transaction in case of an error
      if (transaction) {
        await transaction.rollback();
      }
      console.error(err);
      throw err;
    }
  };

  public updateTeacherTopic = async (
    updateTopic: UpdateTopic
  ): Promise<void> => {
    let transaction: Transaction | null = null;

    try {
      // Start a database transaction to ensure data consistency
      transaction = await db.transaction();

      // Update the Topic
      const [topicUpdatedCount, [updatedTopics]] = await Topic.update(
        updateTopic,
        {
          where: { id: updateTopic.id },
          returning: true,
          transaction,
        }
      );

      // Check if the Topic was found and updated
      if (topicUpdatedCount === 0 || !updatedTopics) {
        throw new Error("Topic not found or not updated");
      }

      // Remove existing enrollments for the Topic
      await Enrollment.destroy({
        where: { topicId: updateTopic.id },
        transaction,
      });

      // Add new enrollments based on the updatedEnrollmentData.students list
      const enrollmentCreates = updateTopic.students.map(async (studentId) => {
        await Enrollment.create(
          {
            topicId: updateTopic.id,
            studentId: studentId,
          },
          { transaction }
        );
      });

      // Commit the transaction to save changes to the database
      await transaction.commit();

      // Wait for all enrollment creations to complete
      await Promise.all(enrollmentCreates);
    } catch (err) {
      console.error("Error in updateTeacherTopic:", err);
      throw err;
    } finally {
      // Roll back the transaction in case of an error
      if (transaction) {
        await transaction.rollback();
      }
    }
  };
}
