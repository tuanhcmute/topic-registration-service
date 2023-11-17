import { createAsyncThunk } from "@reduxjs/toolkit";
import { HttpStatusCode } from "axios";
import { userService } from "../../services";

export const namespace = "user";
export const fetchUserInfo = createAsyncThunk(
  `${namespace}/fetchUserInfo`,
  async (data, { rejectWithValue }) => {
    const response = await userService.fetchUserInfo();
    if (response?.data?.statusCode === HttpStatusCode.Unauthorized) {
      return rejectWithValue(response.data);
    }
    return response.data;
  }
);

export const removeUserInfo = createAsyncThunk(
  `${namespace}/removeUserInfo`,
  async () => {
    return true;
  }
);

export const fetchLecturesByMajor = createAsyncThunk(
  `${namespace}/fetchLecturesByMajor`,
  async (majorCode, { rejectWithValue }) => {
    const response = await userService.fetchLecturesByMajor(majorCode);
    if (response.data?.statusCode === HttpStatusCode.BadRequest)
      return rejectWithValue(response?.data);
    return response.data;
  }
);

export const fetchStudentsNotEnrolledInTopic = createAsyncThunk(
  `${namespace}/fetchStudentsNotEnrolledInTopic`,
  async (data, { rejectWithValue }) => {
    const response = await userService.getStudentsNotEnrolledInTopic();
    if (response.data?.statusCode !== HttpStatusCode.Ok)
      return rejectWithValue(response?.data);
    return response?.data;
  }
);
