import { SemesterType, TopicType } from "@configs/constants";
import { SemesterInstance } from "@models";
import { IsIn, IsNotEmpty } from "class-validator";

export interface IListSemesterReponse {
  semesters?: SemesterInstance[];
}

export class NewSemesterRequest {
  @IsNotEmpty({ message: "Topic type is not valid" })
  @IsIn([...Object.values(SemesterType)], {
    message: `Semester type is not valid`
  })
  type: string;

  @IsNotEmpty({ message: "Name is not valid" })
  name: string;

  @IsNotEmpty({ message: "Start date is not valid" })
  startDate: string;

  @IsNotEmpty({ message: "End date is not valid" })
  endDate: string;
}

export class UpdateSemesterRequest {
  @IsNotEmpty({ message: "Topic type is not valid" })
  @IsIn([...Object.values(SemesterType)], {
    message: `Semester type is not valid`
  })
  type: string;

  @IsNotEmpty({ message: "Name is not valid" })
  name: string;

  @IsNotEmpty({ message: "Start date is not valid" })
  startDate: string;

  @IsNotEmpty({ message: "End date is not valid" })
  endDate: string;
}
