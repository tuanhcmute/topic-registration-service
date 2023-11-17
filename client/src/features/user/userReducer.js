import { createSlice } from "@reduxjs/toolkit";
import { namespace } from "../division";
import {
  fetchLecturesByMajor,
  fetchStudentsNotEnrolledInTopic,
  fetchUserInfo,
  removeUserInfo,
} from "./userAction";

const initialState = {
  lectures: [],
  currentUser: {},
  statusCode: null,
  message: "",
  loading: false,
  studentsNotEnrolledInTopic: [],
};

export const userSlice = createSlice({
  name: namespace,
  initialState,
  extraReducers: (builder) => {
    // fetchUserInfo
    builder.addCase(fetchUserInfo.fulfilled, (state, action) => {
      return {
        ...state,
        currentUser: action.payload?.data?.profile,
        message: action.payload?.message,
        statusCode: action.payload?.statusCode,
        loading: false,
      };
    });
    builder.addCase(fetchUserInfo.pending, (state) => {
      return {
        ...state,
        currentUser: {},
        message: "",
        statusCode: null,
        loading: true,
      };
    });
    builder.addCase(fetchUserInfo.rejected, (state, action) => {
      return {
        ...state,
        currentUser: {},
        message: action.payload?.data?.message,
        statusCode: action.payload?.data?.statusCode,
        loading: false,
      };
    });
    // removeUserInfo;
    builder.addCase(removeUserInfo.fulfilled, (state) => {
      return {
        ...state,
        ...initialState,
      };
    });
    builder.addCase(removeUserInfo.pending, (state) => {
      return {
        ...state,
        currentUser: {},
        message: "",
        statusCode: null,
        loading: true,
      };
    });
    builder.addCase(removeUserInfo.rejected, (state, action) => {
      return {
        ...state,
        currentUser: {},
        message: action.payload?.data?.message,
        statusCode: action.payload?.data?.statusCode,
        loading: false,
      };
    });
    // fetchLecturesByMajor
    builder.addCase(fetchLecturesByMajor.fulfilled, (state, action) => {
      return {
        ...state,
        lectures: action.payload?.data?.lectures,
        message: action.payload?.data?.message,
        statusCode: action.payload?.data?.statusCode,
        loading: false,
      };
    });
    builder.addCase(fetchLecturesByMajor.rejected, (state, action) => {
      return {
        ...state,
        lectures: [],
        message: action.payload?.data?.message,
        statusCode: action.payload?.data?.statusCode,
        loading: false,
      };
    });
    builder.addCase(fetchLecturesByMajor.pending, (state) => {
      return {
        ...state,
        lectures: [],
        message: "",
        statusCode: null,
        loading: true,
      };
    });
    // fetchStudentsNotEnrolledInTopic
    builder.addCase(
      fetchStudentsNotEnrolledInTopic.fulfilled,
      (state, action) => {
        const data = action.payload?.data?.students?.map((item) => ({
          value: item?.ntid,
          label: item?.name,
        }));
        return {
          ...state,
          studentsNotEnrolledInTopic: data,
          message: action.payload?.data?.message,
          statusCode: action.payload?.data?.statusCode,
          loading: false,
        };
      }
    );
    builder.addCase(
      fetchStudentsNotEnrolledInTopic.rejected,
      (state, action) => {
        return {
          ...state,
          studentsNotEnrolledInTopic: [],
          message: action.payload?.data?.message,
          statusCode: action.payload?.data?.statusCode,
          loading: false,
        };
      }
    );
    builder.addCase(fetchStudentsNotEnrolledInTopic.pending, (state) => {
      return {
        ...state,
        studentsNotEnrolledInTopic: [],
        message: "",
        statusCode: null,
        loading: true,
      };
    });
  },
});

export default userSlice.reducer;
