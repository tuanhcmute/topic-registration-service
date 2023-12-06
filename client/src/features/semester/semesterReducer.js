import { createSlice } from "@reduxjs/toolkit";
import { fetchAllSemesters, namespace } from "./semesterAction";

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
  },
});

export default semesterSlice.reducer;
