import { createSlice } from "@reduxjs/toolkit";
import { HttpStatusCode } from "axios";
import { toast } from "react-toastify";
import {
  namespace,
  approveTopicInLectureEnrollmentPeriod,
  createNewTopicInLectureEnrollmentPeriod,
  fetchAllTopicsApprovedDuringTheLectureEnrollmentPeriod,
  fetchAllTopicsInLectureEnrollmentPeriod,
  fetchAllTopicsIsNotApprovedDuringTheLectureEnrollmentPeriod,
  resetTopicState,
  updateTopicInLectureEnrollmentPeriod,
} from "./topicAction";

const initialState = {
  approvedTopics: [],
  notApprovedTopics: [],
  topics: [],
  statusCode: null,
  message: "",
  loading: false,
};

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
    // approveTopicInLectureEnrollmentPeriod
    builder.addCase(
      approveTopicInLectureEnrollmentPeriod.fulfilled,
      (state, action) => {
        return {
          ...state,
          message: action.payload?.message,
          statusCode: action.payload?.statusCode,
          loading: false,
        };
      }
    );
    builder.addCase(approveTopicInLectureEnrollmentPeriod.pending, (state) => {
      return {
        ...state,
        message: "",
        statusCode: null,
        loading: false,
      };
    });
    builder.addCase(
      approveTopicInLectureEnrollmentPeriod.rejected,
      (state, action) => {
        return {
          ...state,
          message: action.payload?.message,
          statusCode: action.payload?.statusCode,
          loading: false,
        };
      }
    );
    // fetchAllTopicsIsNotApprovedDuringTheLectureEnrollmentPeriod
    builder.addCase(
      fetchAllTopicsIsNotApprovedDuringTheLectureEnrollmentPeriod.pending,
      (state) => {
        return {
          ...state,
          notApprovedTopics: [],
          message: "",
          statusCode: null,
          loading: false,
        };
      }
    );
    builder.addCase(
      fetchAllTopicsIsNotApprovedDuringTheLectureEnrollmentPeriod.fulfilled,
      (state, action) => {
        return {
          ...state,
          notApprovedTopics: action.payload?.data?.topics,
          message: action.payload?.message,
          statusCode: action.payload?.statusCode,
          loading: false,
        };
      }
    );
    builder.addCase(
      fetchAllTopicsIsNotApprovedDuringTheLectureEnrollmentPeriod.rejected,
      (state, action) => {
        return {
          ...state,
          notApprovedTopics: [],
          message: action.payload?.message,
          statusCode: action.payload?.statusCode,
          loading: false,
        };
      }
    );
    // fetchAllTopicsApprovedDuringTheLectureEnrollmentPeriod
    builder.addCase(
      fetchAllTopicsApprovedDuringTheLectureEnrollmentPeriod.pending,
      (state) => {
        return {
          ...state,
          approvedTopics: [],
          message: "",
          statusCode: null,
          loading: false,
        };
      }
    );
    builder.addCase(
      fetchAllTopicsApprovedDuringTheLectureEnrollmentPeriod.fulfilled,
      (state, action) => {
        return {
          ...state,
          approvedTopics: action.payload?.data?.topics,
          message: action.payload?.message,
          statusCode: action.payload?.statusCode,
          loading: false,
        };
      }
    );
    builder.addCase(
      fetchAllTopicsApprovedDuringTheLectureEnrollmentPeriod.rejected,
      (state, action) => {
        return {
          ...state,
          approvedTopics: [],
          message: action.payload?.message,
          statusCode: action.payload?.statusCode,
          loading: false,
        };
      }
    );
    builder.addCase(resetTopicState.fulfilled, () => {
      return initialState;
    });
  },
});

export default topicSlide.reducer;
