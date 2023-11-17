import { createAsyncThunk } from "@reduxjs/toolkit";
import { HttpStatusCode } from "axios";
import { enrollmentPeriodService } from "../../services";

export const namespace = "enrollmentPeriod";
export const fetchEnrollmentPeriodByTopicTypeAndPeriodCode = createAsyncThunk(
  `${namespace}/fetchEnrollmentPeriodByTopicTypeAndPeriodCode`,
  async ({ topicType, periodCode }, { rejectWithValue }) => {
    const response =
      await enrollmentPeriodService.getEnrollmentPeriodByTopicTypeAndPeriodCode(
        topicType,
        periodCode
      );
    if (response?.data?.statusCode !== HttpStatusCode.Ok)
      return rejectWithValue(response?.data);
    return response.data;
  }
);

export const resetEnrollmentPeriodState = createAsyncThunk(
  `${namespace}/resetEnrollmentPeriodState`,
  async () => {
    console.log("resetEnrollmentPeriodState");
    return true;
  }
);
