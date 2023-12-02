import { TopicEnrollmentInstance } from "@models";
import { IsNotEmpty } from "class-validator";

export class CreateTopicEnrollmentRequest {
  @IsNotEmpty({ message: "Ntid is not valid" })
  ntid: string;

  @IsNotEmpty({ message: "Topic id is not valid" })
  topicId: string;
}

export interface IListTopicEnrollmentResponse {
  topicEnrollments: TopicEnrollmentInstance[];
}
