import { createAsyncThunk } from "@reduxjs/toolkit";
import { HttpStatusCode } from "axios";
import { approvalHistoryService } from "../../services";

export const namespace = "approvalHistory";

export const fetchApprovalHistoryByTopicId = createAsyncThunk(
  `${namespace}/fetchApprovalHistoryByTopicId`,
  async (topicId, { rejectWithValue }) => {
    const response = await approvalHistoryService.getApprovalHistoryByTopicId(
      topicId
    );
    console.log(response);
    if (response?.data?.statusCode === HttpStatusCode.BadRequest)
      return rejectWithValue(response?.data);
    return response.data;
  }
);
