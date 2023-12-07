import { createAsyncThunk } from "@reduxjs/toolkit";
import { HttpStatusCode } from "axios";
import { toast } from "react-toastify";
import { enrollmentPeriodService } from "../../services";

export const namespace = "enrollmentPeriod";
export const fetchEnrollmentPeriodByTopicTypeAndPeriodCode = createAsyncThunk(
  `${namespace}/fetchEnrollmentPeriodByTopicTypeAndPeriodCode`,
  async ({ topicType, periodCode }, { rejectWithValue }) => {
    const response =
      await enrollmentPeriodService.getEnrollmentPeriodByTopicTypeAndPeriodCode(
        topicType,
        periodCode
      );
    if (response?.data?.statusCode !== HttpStatusCode.Ok)
      return rejectWithValue(response?.data);
    return response.data;
  }
);

export const fetchEnrollmentPeriodBySemesterId = createAsyncThunk(
  `${namespace}/fetchEnrollmentPeriodBySemesterId`,
  async (semesterId, { rejectWithValue, dispatch }) => {
    const response =
      await enrollmentPeriodService.fetchEnrollmentPeriodBySemesterId(
        semesterId
      );
    if (response?.data?.statusCode !== HttpStatusCode.Ok)
      return rejectWithValue(response?.data);
    return response.data;
  }
);

export const createEnrollmentPeriod = createAsyncThunk(
  `${namespace}/createEnrollmentPeriod`,
  async (
    { semesterId, data, setOpenAddEnrollmentPeriodModal },
    { rejectWithValue, dispatch }
  ) => {
    const response = await enrollmentPeriodService.createEnrollmentPeriod(
      semesterId,
      data
    );
    if (response?.data?.statusCode === HttpStatusCode.Created) {
      toast.success("Thêm khoảng thời gian thành công");
      setOpenAddEnrollmentPeriodModal(undefined);
      dispatch(fetchEnrollmentPeriodBySemesterId(semesterId));
      return response.data;
    }
    toast.error("Thêm khoảng thời gian thất bại");
    return rejectWithValue(response?.data);
  }
);

export const updateEnrollmentPeriod = createAsyncThunk(
  `${namespace}/updateEnrollmentPeriod`,
  async (
    { id, data, semesterId, setOpenEditEnrollmentPeriodModal },
    { rejectWithValue, dispatch }
  ) => {
    const response = await enrollmentPeriodService.updateEnrollmentPeriod(
      id,
      data
    );
    if (response?.data?.statusCode === HttpStatusCode.Ok) {
      toast.success("Chỉnh sửa khoảng thời gian thành công");
      setOpenEditEnrollmentPeriodModal(undefined);
      dispatch(fetchEnrollmentPeriodBySemesterId(semesterId));
      return response.data;
    }
    toast.error("Thêm khoảng thời gian thất bại");
    return rejectWithValue(response?.data);
  }
);

export const resetEnrollmentPeriodState = createAsyncThunk(
  `${namespace}/resetEnrollmentPeriodState`,
  async () => {
    console.log("resetEnrollmentPeriodState");
    return true;
  }
);
