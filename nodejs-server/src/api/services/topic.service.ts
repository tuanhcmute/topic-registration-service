import { TeacherTopicOut, mapTopicToDTO } from "@interfaces/topic.interface";
import { Enrollment, Topic, TopicInstance, User, UserInstance } from "@models";
import { createReqTopic } from "@interfaces/topic.interface";
import { db } from "@configs";

export default class TopicService {
  // Class implementation goes here
  public getAllTopics = async (
    type: string,
    periodId: string,
    lecturerId: string
  ): Promise<TeacherTopicOut[]> => {
    let topics: TopicInstance[] = [];
    try {
      const lecture = await User.findByPk(lecturerId, {
        attributes: ["code", "fullname"],
      });
      if (lecture === null) {
        throw new Error("Lecturer not found");
      }
      topics = await Topic.findAll({
        where: {
          type: type,
          periodId: periodId,
          lecturerId: lecturerId,
        },
        include: [
          {
            model: User,
            as: "students",
            attributes: ["code", "fullname"],
            through: {
              attributes: [],
            },
          },
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
          ntid: newTopic.ntid,
          majorCode: newTopic.majorCode,
          name: newTopic.topicName,
          goal: newTopic.goal,
          requirement: newTopic.requirement,
          type: newTopic.type,
          maxSlot: newTopic.maxSlot,
          lecturerId: user?.code,
        },
        { transaction }
      );

      for (const code of newTopic.students) {
        const student = await User.findOne({
          where: {
            code: code,
          },
          transaction,
        });

        if (student && topic.id && student.id) {
          await Enrollment.create(
            {
              topicId: topic.id, // Use the ID of the created topic
              studentId: student.id, // Use the ID of the fetched student
              // Set other relevant fields as needed
            },
            { transaction }
          );
        }
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
