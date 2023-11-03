import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { HttpStatusCode } from "axios";
import { toast } from "react-toastify";
import topicService from "../../services/topicService";

const initialState = {
  topics: [],
  statusCode: null,
  message: "",
  loading: false,
};
const namespace = "topic";

export const fetchAllTopicsInLectureEnrollmentPeriod = createAsyncThunk(
  `${namespace}/fetchAllTopicsInLectureEnrollmentPeriod`,
  async (type) => {
    const response = await topicService.getAllTopicsInLectureEnrollmentPeriod(
      type
    );
    if (response?.data?.statusCode === HttpStatusCode.Ok) {
      return response.data;
    }
  }
);

export const createNewTopicInLectureEnrollmentPeriod = createAsyncThunk(
  `${namespace}/createNewTopicInLectureEnrollmentPeriod`,
  async ({ data, type, setOpenModal }, { dispatch }) => {
    console.log(data);
    const response = await topicService.createNewTopicInLectureEnrollmentPeriod(
      data
    );
    if (response.data?.statusCode === HttpStatusCode.Created) {
      dispatch(fetchAllTopicsInLectureEnrollmentPeriod(type));
      setOpenModal(undefined);
    }
    return response.data;
  }
);

export const updateTopicInLectureEnrollmentPeriod = createAsyncThunk(
  `${namespace}/updateTopicInLectureEnrollmentPeriod`,
  async ({ data, type, setOpenEditTopicModal }, { dispatch }) => {
    const response = await topicService.updateTopicInLectureEnrollmentPeriod(
      data
    );
    if (response?.data?.statusCode === HttpStatusCode.Ok) {
      setOpenEditTopicModal(undefined);
      dispatch(fetchAllTopicsInLectureEnrollmentPeriod(type));
    }
  }
);

export const topicSlide = createSlice({
  name: namespace,
  initialState,
  extraReducers: (builder) => {
    // fetchAllTopicsInLectureEnrollmentPeriod
    builder.addCase(
      fetchAllTopicsInLectureEnrollmentPeriod.pending,
      (state) => {
        return {
          ...state,
          topics: [],
          message: "",
          statusCode: null,
          loading: true,
        };
      }
    );
    builder.addCase(
      fetchAllTopicsInLectureEnrollmentPeriod.fulfilled,
      (state, action) => {
        return {
          ...state,
          message: action.payload?.message,
          topics: action.payload?.data?.topics,
          statusCode: action.payload?.statusCode,
          loading: false,
        };
      }
    );
    builder.addCase(
      fetchAllTopicsInLectureEnrollmentPeriod.rejected,
      (state) => {
        return {
          ...state,
          topics: [],
          message: "",
          statusCode: null,
          loading: true,
        };
      }
    );
    // createNewTopicInLectureEnrollmentPeriod
    builder.addCase(
      createNewTopicInLectureEnrollmentPeriod.pending,
      (state) => {
        return {
          ...state,
          loading: true,
        };
      }
    );
    builder.addCase(
      createNewTopicInLectureEnrollmentPeriod.fulfilled,
      (state, action) => {
        if (action.payload?.statusCode === HttpStatusCode.Created) {
          toast.success("Tạo đề tài thành công");
        }
        if (action.payload?.statusCode === HttpStatusCode.BadRequest) {
          toast.error("Đã có lỗi xảy ra, vui lòng kiểm tra lại thông tin");
        }
        return {
          ...state,
          message: action.payload?.message,
          loading: false,
        };
      }
    );
    builder.addCase(
      createNewTopicInLectureEnrollmentPeriod.rejected,
      (state, action) => {
        return {
          ...state,
          message: action.payload?.message,
          loading: false,
        };
      }
    );
    // updateTopicInLectureEnrollmentPeriod
    builder.addCase(updateTopicInLectureEnrollmentPeriod.pending, (state) => {
      return {
        ...state,
        loading: true,
      };
    });
    builder.addCase(
      updateTopicInLectureEnrollmentPeriod.fulfilled,
      (state, action) => {
        if (action.payload?.statusCode === HttpStatusCode.Ok) {
          toast.success("Chỉnh sửa đề tài thành công");
        }
        if (action.payload?.statusCode === HttpStatusCode.BadRequest) {
          toast.error("Đã có lỗi xảy ra, vui lòng kiểm tra lại thông tin");
        }
        return {
          ...state,
          message: action.payload?.message,
          loading: false,
        };
      }
    );
    builder.addCase(
      updateTopicInLectureEnrollmentPeriod.rejected,
      (state, action) => {
        return {
          ...state,
          message: action.payload?.message,
          loading: false,
        };
      }
    );
  },
});

export default topicSlide.reducer;
