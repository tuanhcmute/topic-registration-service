import { TeacherTopicOut, mapTopicToDTO } from "@interfaces/topic.interface";
import { Topic, TopicInstance, User } from "@models";

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
}
