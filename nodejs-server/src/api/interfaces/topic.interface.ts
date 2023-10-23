import { TopicInstance, UserInstance } from "@models";

export interface TeacherTopicOut {
  id: string;
  code: string;
  name: string;
  type: string;
  goal: string;
  expectation: string | null;
  requirement: string | null;
  status: string;
  maxSlot: number;
  students: UserInstance[] | undefined;
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
    expectation: topic.expectation || "",
    requirement: topic.requirement || "",
    status: topic.status || "",
    maxSlot: topic.maxSlot || 2,
    students: topic.students,
    lecture: user,
  };

  return topicOut;
};
