import { TopicInstance, UserInstance } from "@models";
import { IsNotEmpty, Length, IsIn, Min, Max, IsNumber } from "class-validator";

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
    id: topic.id || "undefined",
    code: topic.ntid,
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

export class createReqTopic {
  @IsNotEmpty()
  public ntid: string;
  @IsNotEmpty()
  majorCode: string;
  @Length(0, 255, {
    message:
      "Topic name must be between $constraint1 and $constraint2 characters",
  })
  @IsNotEmpty()
  topicName: string;
  goal: string;
  requirement: string;
  @IsIn(["TLCN", "KLTN"], {
    message: "Type must be TLCN or KLTN",
  })
  type: Type;

  @IsNumber()
  @Min(2, { message: "Value must be greater than 2" })
  @Max(3, { message: "Value must be less than 3" })
  maxSlot: number;
  students: string[];
}
