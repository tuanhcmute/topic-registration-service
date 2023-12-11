import { createSlice } from "@reduxjs/toolkit";
import {
  namespace,
  approveTopicInLectureEnrollmentPeriod,
  createNewTopicInLectureEnrollmentPeriod,
  fetchAllTopicsApprovedDuringTheLectureEnrollmentPeriod,
  fetchAllTopicsInLectureEnrollmentPeriod,
  fetchAllTopicsIsNotApprovedDuringTheLectureEnrollmentPeriod,
  resetTopicState,
  updateTopicInLectureEnrollmentPeriod,
  fetchAllApprovedTopicsInStudentEnrollmentPeriod,
  fetchAllTopics,
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
          message: "",
          statusCode: null,
        };
      }
    );
    builder.addCase(
      createNewTopicInLectureEnrollmentPeriod.fulfilled,
      (state, action) => {
        return {
          ...state,
          message: action.payload?.message,
          loading: false,
          statusCode: action?.payload?.statusCode,
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
          statusCode: action?.payload?.statusCode,
        };
      }
    );
    // updateTopicInLectureEnrollmentPeriod
    builder.addCase(updateTopicInLectureEnrollmentPeriod.pending, (state) => {
      return {
        ...state,
        loading: true,
        message: "",
        statusCode: null,
      };
    });
    builder.addCase(
      updateTopicInLectureEnrollmentPeriod.fulfilled,
      (state, action) => {
        return {
          ...state,
          message: action.payload?.message,
          statusCode: action?.payload?.statusCode,
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
          statusCode: action?.payload?.statusCode,
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
          loading: true,
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
    // fetchAllApprovedTopicsInStudentEnrollmentPeriod
    builder.addCase(
      fetchAllApprovedTopicsInStudentEnrollmentPeriod.pending,
      (state) => {
        return {
          ...state,
          approvedTopics: [],
          message: "",
          statusCode: null,
          loading: true,
        };
      }
    );
    builder.addCase(
      fetchAllApprovedTopicsInStudentEnrollmentPeriod.fulfilled,
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
      fetchAllApprovedTopicsInStudentEnrollmentPeriod.rejected,
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
    // fetchAllTopics
    builder.addCase(fetchAllTopics.pending, (state) => {
      return {
        ...state,
        topics: [],
        message: "",
        statusCode: null,
        loading: true,
      };
    });
    builder.addCase(fetchAllTopics.fulfilled, (state, action) => {
      return {
        ...state,
        topics: action.payload?.data?.topics,
        message: action.payload?.message,
        statusCode: action.payload?.statusCode,
        loading: false,
      };
    });
    builder.addCase(fetchAllTopics.rejected, (state, action) => {
      return {
        ...state,
        message: action.payload?.message,
        statusCode: action.payload?.statusCode,
        loading: false,
      };
    });
  },
});

export default topicSlide.reducer;
