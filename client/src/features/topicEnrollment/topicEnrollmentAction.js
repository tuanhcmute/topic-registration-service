import { createAsyncThunk } from "@reduxjs/toolkit";
import { HttpStatusCode } from "axios";
import { toast } from "react-toastify";
import { topicEnrollmentService } from "../../services";
import { topicType } from "../../utils/constants";
import { fetchAllApprovedTopicsInStudentEnrollmentPeriod } from "../topic/topicAction";

export const namespace = "topicEnrollment";

export const deleteTopicEnrollment = createAsyncThunk(
  `${namespace}/deleteTopicEnrollment`,
  async (ntid, { rejectWithValue, dispatch }) => {
    const response = await topicEnrollmentService.deleteTopicEnrollment(ntid);
    if (response?.data?.statusCode === HttpStatusCode.Ok) {
      toast.success("Xóa đăng ký đề tài thành công");
      dispatch(
        fetchAllApprovedTopicsInStudentEnrollmentPeriod({
          type: topicType.TLCN,
        })
      );
      return response.data;
    }
    toast.error("Xóa đăng ký đề tài thất bại");
    return rejectWithValue(response.data);
  }
);

export const createTopicEnrollment = createAsyncThunk(
  `${namespace}/createTopicEnrollment`,
  async ({ data, setOpenModal }, { dispatch, rejectWithValue }) => {
    const response = await topicEnrollmentService.createTopicEnrollment(data);
    console.log(response);
    if (response?.data?.statusCode === HttpStatusCode.Created) {
      toast.success("Đăng ký đề tài thành công");
      setOpenModal(undefined);
      dispatch(fetchTopicEnrollmentsByNtid());
      dispatch(
        fetchAllApprovedTopicsInStudentEnrollmentPeriod({
          type: topicType.TLCN,
        })
      );
      return response.data;
    }

    toast.error("Đăng ký đề tài thất bại");
    return rejectWithValue(response.data);
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
