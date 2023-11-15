import { createSlice } from "@reduxjs/toolkit";
import {
  fetchEnrollmentPeriodByTopicTypeAndPeriodCode,
  namespace,
} from "./enrollmentPeriodAction";

const initialState = {
  statusCode: null,
  message: "",
  loading: false,
  enrollmentPeriod: {},
};

export const enrollmentPeriodSlide = createSlice({
  name: namespace,
  initialState,
  extraReducers: (builder) => {
    // fetchEnrollmentPeriodByTopicTypeAndPeriodCode
    builder.addCase(
      fetchEnrollmentPeriodByTopicTypeAndPeriodCode.fulfilled,
      (state, action) => {
        return {
          ...state,
          enrollmentPeriod: action.payload?.data?.enrollmentPeriod,
          message: action.payload?.message,
          statusCode: action.payload?.statusCode,
          loading: false,
        };
      }
    );
    builder.addCase(
      fetchEnrollmentPeriodByTopicTypeAndPeriodCode.rejected,
      (state, action) => {
        return {
          ...state,
          enrollmentPeriod: {},
          message: action.payload?.message,
          statusCode: action.payload?.statusCode,
          loading: false,
        };
      }
    );
    builder.addCase(
      fetchEnrollmentPeriodByTopicTypeAndPeriodCode.pending,
      (state) => {
        return {
          ...state,
          enrollmentPeriod: {},
          message: "",
          statusCode: null,
          loading: false,
        };
      }
    );
  },
});

export default enrollmentPeriodSlide.reducer;
