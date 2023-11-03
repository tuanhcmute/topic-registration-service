import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ACCESS_TOKEN } from "../../utils/constants";
import { removeUserInfo } from "../user/userSlice";

const initialState = {
  authenticated: false,
  [ACCESS_TOKEN]: "",
  message: "",
  loading: false,
};

const namespace = "auth";

export const userLogin = createAsyncThunk(
  `${namespace}/userLogin`,
  async ({ accessToken, error }, { rejectWithValue }) => {
    if (accessToken) {
      return { accessToken };
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
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  extraReducers: (builder) => {
    // userLogin
    builder.addCase(userLogin.fulfilled, (state, action) => {
      return {
        ...state,
        authenticated: true,
        [ACCESS_TOKEN]: action.payload?.accessToken,
        message: "Đăng nhập thành công",
        loading: false,
      };
    });
    builder.addCase(userLogin.pending, (state) => {
      return {
        ...state,
        authenticated: false,
        [ACCESS_TOKEN]: null,
        message: "",
        loading: true,
      };
    });
    builder.addCase(userLogin.rejected, (state) => {
      return {
        ...state,
        authenticated: false,
        [ACCESS_TOKEN]: null,
        message: "Đã có lỗi xảy ra vui lòng đăng nhập lại",
        loading: false,
      };
    });
    // userLogout
    builder.addCase(userLogout.fulfilled, (state) => {
      return {
        ...state,
        authenticated: false,
        [ACCESS_TOKEN]: null,
        message: "Đăng xuất thành công",
        loading: false,
      };
    });
    builder.addCase(userLogout.pending, (state) => {
      return {
        ...state,
        authenticated: false,
        [ACCESS_TOKEN]: null,
        message: "",
        loading: true,
      };
    });
    builder.addCase(userLogout.rejected, (state) => {
      return {
        ...state,
        authenticated: false,
        [ACCESS_TOKEN]: null,
        message: "Đã có lỗi xảy ra vui lòng đăng nhập lại",
        loading: false,
      };
    });
  },
});

export default authSlice.reducer;
