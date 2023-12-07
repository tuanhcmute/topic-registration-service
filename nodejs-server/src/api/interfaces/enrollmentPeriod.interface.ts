import { EnrollmentPeriodInstance } from "@models";

export interface IEnrollmentPeriodResponse {
  enrollmentPeriod?: EnrollmentPeriodInstance;
}

export interface IListEnrollmentPeriodResponse {
  enrollmentPeriods?: EnrollmentPeriodInstance[];
}
