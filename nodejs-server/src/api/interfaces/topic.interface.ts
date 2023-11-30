import { TopicType } from "@configs/constants";
import { TopicInstance } from "@models";
import {
  IsNotEmpty,
  IsIn,
  Min,
  Max,
  IsNumber,
  IsNumberString,
} from "class-validator";

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

export class UpdateTopicRequest {
  @IsNotEmpty({ message: "Topic id is not valid" })
  id: string;

  @IsNotEmpty({ message: "Topic name is not valid" })
  topicName: string;

  @IsNotEmpty({ message: "Goal is not valid" })
  goal: string;

  @IsNotEmpty({ message: "requirement is not valid" })
  requirement: string;

  // @IsNumberString({ no_symbols: true })
  @Min(1, { message: "The max slot must be greater than or equal 1" })
  @Max(2, { message: "The max slot must be less than or equal 2" })
  maxSlot: number;

  students: string[] = [];
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
