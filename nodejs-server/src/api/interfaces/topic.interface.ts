import { TopicType } from "@configs/constants";
import { TopicInstance } from "@models";
import { IsNotEmpty, Length, IsIn, Min, Max, IsNumber } from "class-validator";

export interface Data {
  topics: TopicInstance[];
}

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
  type: TopicType;

  @IsNumber()
  @Min(2, { message: "Value must be greater than 2" })
  @Max(3, { message: "Value must be less than 3" })
  maxSlot: number;
  students: string[];
}
