import { createSlice } from "@reduxjs/toolkit";
import {
  createSemester,
  fetchAllSemesters,
  namespace,
  updateSemester,
} from "./semesterAction";

const initialState = {
  statusCode: null,
  message: "",
  loading: false,
  semesters: [],
};

export const semesterSlice = createSlice({
  name: namespace,
  initialState,
  extraReducers: (builder) => {
    // fetchAllSemesters
    builder.addCase(fetchAllSemesters.fulfilled, (state, action) => {
      return {
        ...state,
        semesters: action.payload?.data?.semesters,
        message: action.payload?.message,
        statusCode: action.payload?.statusCode,
        loading: false,
      };
    });
    builder.addCase(fetchAllSemesters.rejected, (state, action) => {
      return {
        ...state,
        semesters: [],
        message: action.payload?.message,
        statusCode: action.payload?.statusCode,
        loading: false,
      };
    });
    builder.addCase(fetchAllSemesters.pending, (state) => {
      return {
        ...state,
        semesters: [],
        message: "",
        statusCode: null,
        loading: false,
      };
    });

    // createSemester
    builder.addCase(createSemester.fulfilled, (state, action) => {
      return {
        ...state,
        message: action.payload?.message,
        statusCode: action.payload?.statusCode,
        loading: false,
      };
    });
    builder.addCase(createSemester.rejected, (state, action) => {
      return {
        ...state,
        message: action.payload?.message,
        statusCode: action.payload?.statusCode,
        loading: false,
      };
    });
    builder.addCase(createSemester.pending, (state) => {
      return {
        ...state,
        message: "",
        statusCode: null,
        loading: false,
      };
    });

    // updateSemester
    builder.addCase(updateSemester.fulfilled, (state, action) => {
      return {
        ...state,
        message: action.payload?.message,
        statusCode: action.payload?.statusCode,
        loading: false,
      };
    });
    builder.addCase(updateSemester.rejected, (state, action) => {
      return {
        ...state,
        message: action.payload?.message,
        statusCode: action.payload?.statusCode,
        loading: false,
      };
    });

    builder.addCase(updateSemester.pending, (state) => {
      return {
        ...state,
        message: "",
        statusCode: null,
        loading: false,
      };
    });
  },
});

export default semesterSlice.reducer;
