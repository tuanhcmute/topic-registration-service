import _ from "lodash";
import { SemesterStatus, TopicType } from "@configs/constants";
import ValidateException from "@exceptions/ValidateFailException";
import { TeacherTopicOut, mapTopicToDTO } from "@interfaces/topic.interface";
import { TopicEnrollment, Topic, TopicInstance, User, UserInstance, Semester } from "@models";
import { createReqTopic } from "@interfaces/topic.interface";
import { db } from "@configs";

export default class TopicService {
  // Class implementation goes here
  public getAllTopicsInLectureEnrollmentPeriodByTypeAndLecture = async (
    type: string,
    email: string
  ): Promise<TeacherTopicOut[]> => {
    let topics: TopicInstance[] = [];
    try {
      // Validate type
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
      topics = await Topic.findAll({
        where: {
          type: type,
          lectureId: lecture.id,
          semesterId: currentSemester.id,
        },
        include: [
          // {
          //   model: User,
          //   as: "students",
          //   attributes: ["code", "name"],
          //   through: {
          //     attributes: [],
          //   },
          // },
        ],
      });

      const topicData = topics.map((topic) => mapTopicToDTO(topic, lecture));
      return topicData;
    } catch (err) {
      console.log(err);
      throw err;
    }
  };

  public createTopic = async (
    newTopic: createReqTopic,
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
          majorCode: newTopic.majorCode || "",
          name: newTopic.topicName,
          goal: newTopic.goal,
          requirement: newTopic.requirement,
          type: newTopic.type,
          maxSlot: newTopic.maxSlot,
        },
        { transaction }
      );

      for (const code of newTopic.students) {
        const student = await User.findOne({
          where: {
            ntid: code,
          },
          transaction,
        });

        // if (student && topic.id && student.id) {
        //   await TopicEnrollment.create(
        //     {
        //       topicId: topic.id, // Use the ID of the created topic
        //       studentId: student.id, // Use the ID of the fetched student
        //       // Set other relevant fields as needed
        //     },
        //     { transaction }
        //   );
        // }
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
}
