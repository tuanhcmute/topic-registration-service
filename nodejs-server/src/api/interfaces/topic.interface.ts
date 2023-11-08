import { TopicInstance, UserInstance } from "@models";

export interface TeacherTopicOut {
  id: string;
  code: string;
  name: string;
  type: string;
  goal: string;
  requirement: string | null;
  status: string;
  maxSlot: number;
  // students: UserInstance[] | undefined;
  lecture: UserInstance;
}

export const mapTopicToDTO = (
  topic: TopicInstance,
  user: UserInstance
): TeacherTopicOut => {
  const topicOut: TeacherTopicOut = {
    id: topic.id,
    code: topic.code,
    name: topic.name,
    type: topic.type || "",
    goal: topic.goal || "",
    requirement: topic.requirement || "",
    status: topic.status || "",
    maxSlot: topic.maxSlot || 2,
    lecture: user,
  };

  return topicOut;
};
