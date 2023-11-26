import _, { forEach } from "lodash";

import { SemesterStatus, TopicType } from "@configs/constants";
import ValidateException from "@exceptions/ValidateFailException";
import { Topic, TopicInstance, User, Semester, TopicEnrollment } from "@models";
import { CreateReqTopic, Data, UpdateTopic } from "@interfaces/topic.interface";
import { db } from "@configs";
import { IResponseModel, ResponseModelBuilder } from "@interfaces";
import { StatusCodes } from "http-status-codes";

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
    email: string
  ): Promise<TopicInstance> => {
    let transaction;

    const user = await User.findOne({ where: { email: email } });
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
          lectureId: user?.id || "",
        },
        { transaction }
      );

      for (const id of newTopic.students) {
        const enrollment = new TopicEnrollment();
        enrollment.topicId = topic.id || "";
        enrollment.studentId = id;
        enrollment.createdBy = user?.id || "";
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
      (enrollment) => enrollment.studentId
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
}
