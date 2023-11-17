import { createSlice } from "@reduxjs/toolkit";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../../utils/constants";
import { namespace, refreshToken, userLogin, userLogout } from "./authAction";

const initialState = {
  authenticated: false,
  [ACCESS_TOKEN]: "",
  [REFRESH_TOKEN]: "",
  message: "",
  loading: false,
};

export const authSlice = createSlice({
  name: namespace,
  initialState: initialState,
  extraReducers: (builder) => {
    // userLogin
    builder.addCase(userLogin.fulfilled, (state, action) => {
      return {
        ...state,
        authenticated: true,
        [ACCESS_TOKEN]: action.payload?.accessToken,
        [REFRESH_TOKEN]: action.payload?.refreshToken,
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

    // refreshToken
    builder.addCase(refreshToken.fulfilled, (state, action) => {
      return {
        ...state,
        [ACCESS_TOKEN]: action.payload?.data?.token?.accessToken,
        [REFRESH_TOKEN]: action.payload?.data?.token?.refreshToken,
        message: action.payload?.data?.message,
        loading: false,
      };
    });
    builder.addCase(refreshToken.pending, (state, action) => {
      return {
        ...state,
      };
    });
    builder.addCase(refreshToken.rejected, (state, action) => {
      return {
        ...state,
      };
    });
    // userLogout
    builder.addCase(userLogout.fulfilled, (state) => {
      return {
        ...state,
        authenticated: false,
        [ACCESS_TOKEN]: null,
        [REFRESH_TOKEN]: null,
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
