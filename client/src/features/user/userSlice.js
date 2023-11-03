import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { HttpStatusCode } from "axios";
import { userService } from "../../services";

const initialState = {
  currentUser: {},
  statusCode: null,
  message: "",
  loading: false,
};
const namespace = "user";

export const fetchUserInfo = createAsyncThunk(
  `${namespace}/fetchUserInfo`,
  async (data, { rejectWithValue }) => {
    console.log({ rejectWithValue });
    const response = await userService.fetchUserInfo();
    console.log(response);
    if (response?.data?.statusCode === HttpStatusCode.Unauthorized) {
      return rejectWithValue(response.data);
    }
    return response.data;
  }
);

export const removeUserInfo = createAsyncThunk(
  `${namespace}/removeUserInfo`,
  async () => {
    return "Remove user info";
  }
);

export const userSlice = createSlice({
  name: namespace,
  initialState,
  extraReducers: (builder) => {
    // fetchUserInfo
    builder.addCase(fetchUserInfo.fulfilled, (state, action) => {
      console.log({ action });
      return {
        ...state,
        currentUser: action.payload?.data?.profile,
        message: action.payload?.message,
        statusCode: action.payload?.statusCode,
        loading: false,
      };
    });
    builder.addCase(fetchUserInfo.pending, (state) => {
      return {
        ...state,
        currentUser: {},
        message: "",
        statusCode: null,
        loading: true,
      };
    });
    builder.addCase(fetchUserInfo.rejected, (state, action) => {
      console.log({ action });
      return {
        ...state,
        currentUser: {},
        message: action.payload?.data?.message,
        statusCode: action.payload?.data?.statusCode,
        loading: false,
      };
    });
    // removeUserInfo;
    builder.addCase(removeUserInfo.fulfilled, (state) => {
      return {
        ...state,
        ...initialState,
      };
    });
    builder.addCase(removeUserInfo.pending, (state) => {
      return {
        ...state,
        currentUser: {},
        message: "",
        statusCode: null,
        loading: true,
      };
    });
    builder.addCase(removeUserInfo.rejected, (state, action) => {
      return {
        ...state,
        currentUser: {},
        message: action.payload?.data?.message,
        statusCode: action.payload?.data?.statusCode,
        loading: false,
      };
    });
  },
});

export default userSlice.reducer;
