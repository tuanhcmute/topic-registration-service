import { EnrollmentPeriodCode, SemesterType, TopicType } from "@configs/constants";
import { EnrollmentPeriodInstance } from "@models";
import { IsIn, IsNotEmpty } from "class-validator";

export interface IEnrollmentPeriodResponse {
  enrollmentPeriod?: EnrollmentPeriodInstance;
}

export interface IListEnrollmentPeriodResponse {
  enrollmentPeriods?: EnrollmentPeriodInstance[];
}

export class NewEnrollmentPeriodRequest {
  @IsNotEmpty({ message: "Topic type is not valid" })
  @IsIn([...Object.values(TopicType)], {
    message: `Enrollment period type is not valid`
  })
  type: string;

  @IsNotEmpty({ message: "Name is not valid" })
  name: string;

  @IsNotEmpty({ message: "Code is not valid" })
  @IsIn([...Object.values(EnrollmentPeriodCode)], {
    message: `Enrollment period code is not valid`
  })
  code: string;

  @IsNotEmpty({ message: "Start date is not valid" })
  startDate: string;

  @IsNotEmpty({ message: "End date is not valid" })
  endDate: string;
}

export class UpdateEnrollmentPeriodRequest {
  @IsNotEmpty({ message: "Topic type is not valid" })
  @IsIn([...Object.values(TopicType)], {
    message: `Enrollment period type is not valid`
  })
  type: string;

  @IsNotEmpty({ message: "Name is not valid" })
  name: string;

  @IsNotEmpty({ message: "Code is not valid" })
  @IsIn([...Object.values(EnrollmentPeriodCode)], {
    message: `Enrollment period code is not valid`
  })
  code: string;

  @IsNotEmpty({ message: "Start date is not valid" })
  startDate: string;

  @IsNotEmpty({ message: "End date is not valid" })
  endDate: string;
}
