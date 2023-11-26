import { createSlice } from "@reduxjs/toolkit";
import {
  fetchApprovalHistoryByTopicId,
  namespace,
} from "./approvalHistoryAction";

const initialState = {
  approvalHistories: [],
  statusCode: null,
  message: "",
  loading: false,
};

export const approvalHistorySlice = createSlice({
  name: namespace,
  initialState,
  extraReducers: (builder) => {
    // fetchApprovalHistoryByTopicId
    builder.addCase(
      fetchApprovalHistoryByTopicId.fulfilled,
      (state, action) => {
        return {
          ...state,
          approvalHistories: action.payload?.data?.approvalHistories,
          message: action.payload?.message,
          statusCode: action.payload?.statusCode,
          loading: false,
        };
      }
    );
    builder.addCase(fetchApprovalHistoryByTopicId.pending, (state) => {
      return {
        ...state,
        message: "",
        statusCode: null,
        loading: true,
      };
    });
    builder.addCase(fetchApprovalHistoryByTopicId.rejected, (state, action) => {
      return {
        ...state,
        approvalHistories: [],
        message: action.payload?.data?.message,
        statusCode: action.payload?.data?.statusCode,
        loading: false,
      };
    });
  },
});

export default approvalHistorySlice.reducer;
