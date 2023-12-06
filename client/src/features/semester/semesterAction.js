import { createAsyncThunk } from "@reduxjs/toolkit";
import { HttpStatusCode } from "axios";
import { semesterService } from "../../services";

export const namespace = "semester";

export const fetchAllSemesters = createAsyncThunk(
  `${namespace}/fetchAllSemesters`,
  async ({}, { rejectWithValue }) => {
    const response = await semesterService.fetchAllSemesters();
    if (response?.data?.statusCode !== HttpStatusCode.Ok) {
      return response?.data;
    }
    return rejectWithValue(response?.data);
  }
);
