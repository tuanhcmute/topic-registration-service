import { createAsyncThunk } from "@reduxjs/toolkit";
import { HttpStatusCode } from "axios";
import _ from "lodash";

import { authService } from "../../services";
import { resetDivisionState } from "../division";
import { resetEnrollmentPeriodState } from "../enrollmentPeriod/enrollmentPeriodAction";
import { resetTopicState } from "../topic/topicAction";
import { removeUserInfo } from "../user";

export const namespace = "auth";
export const userLogin = createAsyncThunk(
  `${namespace}/userLogin`,
  async ({ accessToken, refreshToken, error }, { rejectWithValue }) => {
    if (accessToken && refreshToken) {
      return { accessToken, refreshToken };
    }
    if (error) {
      return rejectWithValue(error);
    }
  }
);

export const userLogout = createAsyncThunk(
  `${namespace}/userLogout`,
  async (data, { dispatch }) => {
    dispatch(removeUserInfo());
    dispatch(resetDivisionState());
    dispatch(resetEnrollmentPeriodState());
    dispatch(resetTopicState());
  }
);

export const refreshToken = createAsyncThunk(
  `${namespace}/refreshToken`,
  async (
    { accessToken, refreshToken, setRefreshToken },
    { dispatch, rejectWithValue }
  ) => {
    const response = await authService.refreshToken({
      refreshToken,
      accessToken,
    });
    setRefreshToken(false);
    if (_.isEqual(response.data?.statusCode, HttpStatusCode.Ok))
      return response.data;
    // if (_.isEqual(response.data?.statusCode, HttpStatusCode.Unauthorized))
    //   dispatch(userLogout());
    return rejectWithValue(response.data);
  }
);
