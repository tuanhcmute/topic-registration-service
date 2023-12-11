import { createSlice } from "@reduxjs/toolkit";
import {
  createDivisionByTopicType,
  fetchDivisionByTopic,
  fetchDivisionByTopicType,
  namespace,
  resetDivisionState,
} from "./divisionAction";

const initialState = {
  divisions: [],
  statusCode: null,
  message: "",
  loading: false,
};

export const divisionSlice = createSlice({
  name: namespace,
  initialState,
  extraReducers: (builder) => {
    // createDivisionByTopicType
    builder.addCase(createDivisionByTopicType.fulfilled, (state, action) => {
      return {
        ...state,
        message: action.payload?.message,
        statusCode: action.payload?.statusCode,
        loading: false,
      };
    });
    builder.addCase(createDivisionByTopicType.pending, (state) => {
      return {
        ...state,
        message: "",
        statusCode: null,
        loading: true,
      };
    });
    builder.addCase(createDivisionByTopicType.rejected, (state, action) => {
      return {
        ...state,
        message: action.payload?.data?.message,
        statusCode: action.payload?.data?.statusCode,
        loading: false,
      };
    });
    // fetchDivisionByTopicType
    builder.addCase(fetchDivisionByTopicType.fulfilled, (state, action) => {
      return {
        ...state,
        divisions: action.payload?.data?.divisions,
        message: action.payload?.message,
        statusCode: action.payload?.statusCode,
        loading: false,
      };
    });
    builder.addCase(fetchDivisionByTopicType.pending, (state) => {
      return {
        ...state,
        message: "",
        divisions: [],
        statusCode: null,
        loading: true,
      };
    });
    builder.addCase(fetchDivisionByTopicType.rejected, (state, action) => {
      return {
        ...state,
        divisions: [],
        message: action.payload?.data?.message,
        statusCode: action.payload?.data?.statusCode,
        loading: false,
      };
    });
    // fetchDivisionByTopic
    builder.addCase(fetchDivisionByTopic.fulfilled, (state, action) => {
      return {
        ...state,
        divisions: action.payload?.data?.divisions,
        message: action.payload?.message,
        statusCode: action.payload?.statusCode,
        loading: false,
      };
    });
    builder.addCase(fetchDivisionByTopic.pending, (state) => {
      return {
        ...state,
        message: "",
        divisions: [],
        statusCode: null,
        loading: true,
      };
    });
    builder.addCase(fetchDivisionByTopic.rejected, (state, action) => {
      return {
        ...state,
        divisions: [],
        message: action.payload?.data?.message,
        statusCode: action.payload?.data?.statusCode,
        loading: false,
      };
    });
    // resetDivisionState
    builder.addCase(resetDivisionState.fulfilled, () => {
      return initialState;
    });
  },
});

export default divisionSlice.reducer;
