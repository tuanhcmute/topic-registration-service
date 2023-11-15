import { DivisionInstance } from "@models";
import { IsNotEmpty } from "class-validator";

export class CreateDivisionRequest {
  @IsNotEmpty({ message: "Topic id is not valid" })
  topicId: string;

  @IsNotEmpty({ message: "Lecture code is not valid" })
  lectureCode: string;

  @IsNotEmpty({ message: "Specified time is not valid" })
  specifiedTime: string;

  @IsNotEmpty({ message: "Start date is not valid" })
  startDate: string;

  @IsNotEmpty({ message: "Place is not valid" })
  place: string;
}

export interface IListDivisionResponse {
  divisions?: DivisionInstance[];
}
