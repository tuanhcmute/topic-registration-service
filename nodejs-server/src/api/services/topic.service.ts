import _ from "lodash";
import { SemesterStatus, TopicType } from "@configs/constants";
import ValidateException from "@exceptions/ValidateFailException";
import { TeacherTopicOut, mapTopicToDTO } from "@interfaces/topic.interface";
import { Semester, Topic, TopicInstance, User } from "@models";

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
}
