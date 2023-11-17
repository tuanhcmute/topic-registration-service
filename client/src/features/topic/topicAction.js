import { createAsyncThunk } from "@reduxjs/toolkit";
import { HttpStatusCode } from "axios";
import { toast } from "react-toastify";
import { topicService } from "../../services";

export const namespace = "topic";

export const fetchAllTopicsInLectureEnrollmentPeriod = createAsyncThunk(
  `${namespace}/fetchAllTopicsInLectureEnrollmentPeriod`,
  async (type) => {
    const response =
      await topicService.getAllTopicsInLectureEnrollmentPeriodByTypeAndLecture(
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

export const fetchTopicsInLectureEnrollmentPeriodByTypeAndTopicStatusAndMajor =
  createAsyncThunk(
    `${namespace}/fetchTopicsInLectureEnrollmentPeriodByTypeAndTopicStatusAndMajor`,
    async ({ type, status }, { rejectWithValue }) => {
      const response =
        await topicService.getAllTopicsInLectureEnrollmentPeriodByTypeAndTopicStatusAndMajor(
          type,
          status
        );
      if (response?.data?.statusCode === HttpStatusCode.BadRequest)
        return rejectWithValue(response.data);
      return response?.data;
    }
  );

export const approveTopicInLectureEnrollmentPeriod = createAsyncThunk(
  `${namespace}/approveTopicInLectureEnrollmentPeriod`,
  async ({ values, setOpenEditTopicModal }, { rejectWithValue }) => {
    const response = await topicService.approveTopicInLectureEnrollmentPeriod(
      values
    );
    console.log(response);
    if (response?.data?.statusCode === HttpStatusCode.BadRequest)
      return rejectWithValue(response.data);
    toast.success("Xét duyệt đề tài thành công");
    if (setOpenEditTopicModal) setOpenEditTopicModal(undefined);
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
