import { TopicType } from "@configs/constants";
import { TopicInstance } from "@models";
import { IsNotEmpty, IsIn, Min, Max, IsNumber } from "class-validator";

export interface ListTopicResponse {
  topics: TopicInstance[];
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

  @IsNotEmpty({ message: "Topic name is not valid" })
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
