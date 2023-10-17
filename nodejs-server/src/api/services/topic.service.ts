import { Topic, TopicInstance } from "@models";

export default class TopicService {
  // Class implementation goes here
  public getAllTopics = async (
    type: string,
    periodId: string
  ): Promise<TopicInstance[]> => {
    let topics: TopicInstance[] = [];
    const attributes = [
      "id",
      "code",
      "name",
      "type",
      "goal",
      "expectation",
      "requirement",
      "status",
      "maxSlot",
    ];

    try {
      topics = await Topic.findAll({
        where: {
          type: type,
          periodId: periodId,
        },
        attributes: attributes,
      });
      return topics;
    } catch (err) {
      throw err;
    }
  };
}
