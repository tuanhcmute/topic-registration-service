import { TopicType } from "@configs/constants";
import { TopicInstance } from "@models";
import { IsNotEmpty, IsIn, Min, Max, IsNumber, Length } from "class-validator";

export interface IListTopicResponse {
  topics: TopicInstance[];
}

export class ApprovalTopicRequest {
  @IsNotEmpty({ message: "Topic id is not valid" })
  id: string;

  @IsNotEmpty({ message: "Status is not valid" })
  status: string;

  @IsNotEmpty({ message: "Reason is not valid" })
  reason: string;
}

export class NewTopicRequest {
  @IsNotEmpty({ message: "Topic type is not valid" })
  @IsIn([TopicType.TLCN, TopicType.KLTN], {
    message: `Topic type must be ${TopicType.TLCN} or ${TopicType.KLTN}`,
  })
  type: string;

  @IsNotEmpty({ message: "Major code is not valid" })
  majorCode: string;

  @IsNotEmpty({ message: "Ntid is not valid" })
  public ntid: string;

  @Length(0, 255, {
    message:
      "Topic name must be between $constraint1 and $constraint2 characters",
  })
  @IsNotEmpty()
  topicName: string;

  @IsNotEmpty({ message: "Goal is not valid" })
  goal: string;

  @IsNotEmpty({ message: "Requirement is not valid" })
  requirement: string;
  @IsNumber()
  @Min(1, { message: "Max slot must be greater than 1" })
  @Max(2, { message: "Max slot must be less than 2" })
  maxSlot: number;

  students: string[];
}

export class UpdateTopic {
  @IsNotEmpty()
  id: string;
  @Length(0, 255, {
    message:
      "Topic name must be between $constraint1 and $constraint2 characters",
  })
  @IsNotEmpty()
  topicName: string;
  goal: string;
  requirement: string;
  @IsNumber()
  @Min(2, { message: "Value must be greater than 2" })
  @Max(3, { message: "Value must be less than 3" })
  maxSlot: number;
  students: string[];
}
