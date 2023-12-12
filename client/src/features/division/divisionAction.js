import { createAsyncThunk } from "@reduxjs/toolkit";
import { HttpStatusCode } from "axios";
import { toast } from "react-toastify";
import { divisionService } from "../../services";
import {
  fetchAllTopicsApprovedDuringTheLectureEnrollmentPeriod,
  fetchAllTopicsInLectureEnrollmentPeriod,
} from "../topic";

export const namespace = "division";
export const createDivisionByTopicType = createAsyncThunk(
  `${namespace}/createDivisionByTopicType`,
  async ({ type, data, setOpenModal }, { dispatch, rejectWithValue }) => {
    const response = await divisionService.createDivisionByTopicType(
      type,
      data
    );
    if (response?.data?.statusCode === HttpStatusCode.BadRequest)
      return rejectWithValue(response?.data);
    if (response?.data?.statusCode === HttpStatusCode.Created) {
      toast.success("Phân công phản biện thành công");
      dispatch(
        fetchAllTopicsApprovedDuringTheLectureEnrollmentPeriod({ type: type })
      );
      dispatch(fetchAllTopicsInLectureEnrollmentPeriod(type));
      setOpenModal(undefined);
    }
    return response.data;
  }
);

export const fetchDivisionByTopicType = createAsyncThunk(
  `${namespace}/fetchDivisionByTopicType`,
  async (type, { rejectWithValue }) => {
    const response = await divisionService.fetchDivisionByTopicType(type);
    if (response?.data?.statusCode === HttpStatusCode.BadRequest)
      return rejectWithValue(response?.data);
    return response.data;
  }
);

export const resetDivisionState = createAsyncThunk(
  `${namespace}/resetDivisionState`,
  async () => {
    console.log("resetDivisionState");
    return true;
  }
);

export const fetchDivisionByTopic = createAsyncThunk(
  `${namespace}/fetchDivisionByTopic`,
  async (topicId, { rejectWithValue }) => {
    const response = await divisionService.fetchDivisionByTopic(topicId);
    console.log(response);
    if (response?.data?.statusCode === HttpStatusCode.Ok) return response.data;
    return rejectWithValue(response?.data);
  }
);
