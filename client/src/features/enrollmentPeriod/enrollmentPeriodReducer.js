import { createSlice } from "@reduxjs/toolkit";
import {
  createEnrollmentPeriod,
  fetchEnrollmentPeriodBySemesterId,
  fetchActivatedEnrollmentPeriod,
  namespace,
  resetEnrollmentPeriodState,
  updateEnrollmentPeriod,
} from "./enrollmentPeriodAction";

const initialState = {
  statusCode: null,
  message: "",
  loading: false,
  enrollmentPeriod: {},
  enrollmentPeriods: [],
};

export const enrollmentPeriodSlide = createSlice({
  name: namespace,
  initialState,
  extraReducers: (builder) => {
    // fetchEnrollmentPeriodByTopicTypeAndPeriodCode
    builder.addCase(
      fetchActivatedEnrollmentPeriod.fulfilled,
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
      fetchActivatedEnrollmentPeriod.rejected,
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
    builder.addCase(fetchActivatedEnrollmentPeriod.pending, (state) => {
      return {
        ...state,
        enrollmentPeriod: {},
        message: "",
        statusCode: null,
        loading: false,
      };
    });
    // resetEnrollmentPeriodState
    builder.addCase(resetEnrollmentPeriodState.fulfilled, () => {
      return initialState;
    });
    // fetchEnrollmentPeriodBySemesterId
    builder.addCase(
      fetchEnrollmentPeriodBySemesterId.fulfilled,
      (state, action) => {
        return {
          ...state,
          enrollmentPeriods: action.payload?.data?.enrollmentPeriods,
          message: action.payload?.message,
          statusCode: action.payload?.statusCode,
          loading: false,
        };
      }
    );
    builder.addCase(
      fetchEnrollmentPeriodBySemesterId.rejected,
      (state, action) => {
        return {
          ...state,
          enrollmentPeriods: [],
          message: action.payload?.message,
          statusCode: action.payload?.statusCode,
          loading: false,
        };
      }
    );
    builder.addCase(fetchEnrollmentPeriodBySemesterId.pending, (state) => {
      return {
        ...state,
        enrollmentPeriods: [],
        message: "",
        statusCode: null,
        loading: false,
      };
    });
    // createEnrollmentPeriod
    builder.addCase(createEnrollmentPeriod.fulfilled, (state, action) => {
      return {
        ...state,
        message: action.payload?.message,
        statusCode: action.payload?.statusCode,
        loading: false,
      };
    });
    builder.addCase(createEnrollmentPeriod.rejected, (state, action) => {
      return {
        ...state,
        message: action.payload?.message,
        statusCode: action.payload?.statusCode,
        loading: false,
      };
    });
    builder.addCase(createEnrollmentPeriod.pending, (state) => {
      return {
        ...state,
        message: "",
        statusCode: null,
        loading: false,
      };
    });
    // updateEnrollmentPeriod
    builder.addCase(updateEnrollmentPeriod.fulfilled, (state, action) => {
      return {
        ...state,
        message: action.payload?.message,
        statusCode: action.payload?.statusCode,
        loading: false,
      };
    });
    builder.addCase(updateEnrollmentPeriod.rejected, (state, action) => {
      return {
        ...state,
        message: action.payload?.message,
        statusCode: action.payload?.statusCode,
        loading: false,
      };
    });
    builder.addCase(updateEnrollmentPeriod.pending, (state) => {
      return {
        ...state,
        message: "",
        statusCode: null,
        loading: false,
      };
    });
  },
});

export default enrollmentPeriodSlide.reducer;
