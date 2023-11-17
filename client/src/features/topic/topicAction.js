import { createAsyncThunk } from "@reduxjs/toolkit";
import { HttpStatusCode } from "axios";
import { toast } from "react-toastify";
import { topicService } from "../../services";
import { topicType } from "../../utils/constants";

export const namespace = "topic";

export const fetchAllTopicsInLectureEnrollmentPeriod = createAsyncThunk(
  `${namespace}/fetchAllTopicsInLectureEnrollmentPeriod`,
  async (type) => {
    const response =
      await topicService.fetchAllTopicsInLectureEnrollmentPeriodByTypeAndLecture(
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
    const response = await topicService.createNewTopicInLectureEnrollmentPeriod(
      data
    );
    if (response.data?.statusCode === HttpStatusCode.Created) {
      dispatch(fetchAllTopicsInLectureEnrollmentPeriod(type));
      setOpenModal(undefined);
      toast.success("Tạo mới đề tài thành công");
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
      if (setOpenEditTopicModal) setOpenEditTopicModal(undefined);
      toast.success("Cập nhật đề tài thành công");
      dispatch(fetchAllTopicsInLectureEnrollmentPeriod(type));
    }
  }
);

export const fetchAllTopicsIsNotApprovedDuringTheLectureEnrollmentPeriod =
  createAsyncThunk(
    `${namespace}/fetchAllTopicsIsNotApprovedDuringTheLectureEnrollmentPeriod`,
    async ({ type }, { rejectWithValue }) => {
      const response =
        await topicService.fetchAllTopicsIsNotApprovedDuringTheLectureEnrollmentPeriod(
          type
        );
      if (response?.data?.statusCode === HttpStatusCode.BadRequest)
        return rejectWithValue(response.data);
      return response?.data;
    }
  );

export const approveTopicInLectureEnrollmentPeriod = createAsyncThunk(
  `${namespace}/approveTopicInLectureEnrollmentPeriod`,
  async ({ values, setOpenEditTopicModal }, { rejectWithValue, dispatch }) => {
    const response = await topicService.approveTopicInLectureEnrollmentPeriod(
      values
    );
    if (response?.data?.statusCode === HttpStatusCode.BadRequest)
      return rejectWithValue(response.data);
    dispatch(
      fetchAllTopicsIsNotApprovedDuringTheLectureEnrollmentPeriod({
        type: topicType.TLCN,
      })
    );
    dispatch(fetchAllTopicsInLectureEnrollmentPeriod(topicType.TLCN));
    toast.success("Xét duyệt đề tài thành công");
    if (setOpenEditTopicModal) setOpenEditTopicModal(undefined);
    return response?.data;
  }
);

export const fetchAllTopicsApprovedDuringTheLectureEnrollmentPeriod =
  createAsyncThunk(
    `${namespace}/fetchAllTopicsApprovedDuringTheLectureEnrollmentPeriod`,
    async ({ type }, { rejectWithValue }) => {
      const response =
        await topicService.fetchAllTopicsApprovedDuringTheLectureEnrollmentPeriod(
          type
        );
      if (response?.data?.statusCode === HttpStatusCode.BadRequest)
        return rejectWithValue(response.data);
      return response?.data;
    }
  );

export const resetTopicState = createAsyncThunk(
  `${namespace}/resetTopicState`,
  async () => {
    console.log("resetTopicState");
    return true;
  }
);
