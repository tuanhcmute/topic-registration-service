import { createSlice } from "@reduxjs/toolkit";
import {
  createTopicEnrollment,
  deleteTopicEnrollment,
  fetchTopicEnrollmentsByNtid,
  namespace,
} from "./topicEnrollmentAction";

const initialState = {
  topicEnrollments: [],
  statusCode: null,
  message: "",
  loading: false,
};

export const topicEnrollmentSlice = createSlice({
  name: namespace,
  initialState,
  extraReducers: (builder) => {
    // deleteTopicEnrollment
    builder.addCase(deleteTopicEnrollment.fulfilled, (state, action) => {
      return {
        ...state,
        statusCode: action.payload?.data?.statusCode,
        message: action.payload?.data?.message,
        loading: false,
      };
    });
    builder.addCase(deleteTopicEnrollment.pending, (state) => {
      return {
        ...state,
        statusCode: null,
        message: "",
        loading: true,
      };
    });
    builder.addCase(deleteTopicEnrollment.rejected, (state, action) => {
      return {
        ...state,
        statusCode: action.payload?.data?.statusCode,
        message: action.payload?.data?.message,
        loading: false,
      };
    });

    // createTopicEnrollment
    builder.addCase(createTopicEnrollment.fulfilled, (state, action) => {
      return {
        ...state,
        statusCode: action.payload?.data?.statusCode,
        message: action.payload?.data?.message,
        loading: false,
      };
    });
    builder.addCase(createTopicEnrollment.pending, (state) => {
      return {
        ...state,
        statusCode: null,
        message: "",
        loading: true,
      };
    });
    builder.addCase(createTopicEnrollment.rejected, (state, action) => {
      return {
        ...state,
        statusCode: action.payload?.data?.statusCode,
        message: action.payload?.data?.message,
        loading: false,
      };
    });
    // fetchTopicEnrollmentsByNtid
    builder.addCase(fetchTopicEnrollmentsByNtid.fulfilled, (state, action) => {
      return {
        ...state,
        topicEnrollments: action.payload?.data?.topicEnrollments,
        statusCode: action.payload?.data?.statusCode,
        message: action.payload?.data?.message,
        loading: false,
      };
    });
    builder.addCase(fetchTopicEnrollmentsByNtid.pending, (state) => {
      return {
        ...state,
        topicEnrollments: [],
        statusCode: null,
        message: "",
        loading: true,
      };
    });
    builder.addCase(fetchTopicEnrollmentsByNtid.rejected, (state, action) => {
      return {
        ...state,
        topicEnrollments: [],
        statusCode: action.payload?.data?.statusCode,
        message: action.payload?.data?.message,
        loading: false,
      };
    });
  },
});

export default topicEnrollmentSlice.reducer;
