import { createAsyncThunk } from "@reduxjs/toolkit";
import { HttpStatusCode } from "axios";
import { toast } from "react-toastify";
import { topicEnrollmentService } from "../../services";

export const namespace = "topicEnrollment";

export const deleteTopicEnrollment = createAsyncThunk(
  `${namespace}/deleteTopicEnrollment`,
  async (ntid, { rejectWithValue }) => {
    const response = await topicEnrollmentService.deleteTopicEnrollment(ntid);
    if (response?.data?.statusCode !== HttpStatusCode.Ok)
      return rejectWithValue(response.data);
    toast.success("Xóa SVTH thành công");
    return response.data;
  }
);

export const createTopicEnrollment = createAsyncThunk(
  `${namespace}/createTopicEnrollment`,
  async ({ data, setOpenModal }, { dispatch, rejectWithValue }) => {
    const response = await topicEnrollmentService.createTopicEnrollment(data);
    console.log(response);
    if (response?.data?.statusCode !== HttpStatusCode.Created)
      return rejectWithValue(response.data);
    setOpenModal(undefined);
    dispatch(fetchTopicEnrollmentsByNtid());
    return response.data;
  }
);

export const fetchTopicEnrollmentsByNtid = createAsyncThunk(
  `${namespace}/fetchTopicEnrollmentsByNtid`,
  async (data, { rejectWithValue }) => {
    const response = await topicEnrollmentService.fetchTopicEnrollmentsByNtid();
    if (response?.data?.statusCode !== HttpStatusCode.Ok)
      return rejectWithValue(response.data);
    return response.data;
  }
);
