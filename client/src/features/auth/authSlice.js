import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { userService } from "../../services";
import { ACCESS_TOKEN } from "../../utils/constants";

const initialState = {
  authenticated: false,
  currentUser: {},
  [ACCESS_TOKEN]: "",
  errorMessage: "",
};

export const fetchUserInfo = createAsyncThunk(
  "auth/fetchUserInfo",
  async (thunkAPI) => {
    const response = await userService.fetchUserInfo();
    return response.data?.data?.profile;
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    loggedIn: (state, action) => {
      state = {
        ...state,
        authenticated: true,
        [ACCESS_TOKEN]: action.payload,
      };
      return state;
    },
    logout: (state) => {
      state = {
        ...state,
        authenticated: false,
        [ACCESS_TOKEN]: "",
        currentUser: {},
        errorMessage: "",
      };
      return state;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUserInfo.fulfilled, (state, action) => {
      state.currentUser = {
        ...state.currentUser,
        ...action.payload,
      };
      state.errorMessage = "";
      return state;
    });
    builder.addCase(fetchUserInfo.pending, (state) => {
      state.currentUser = {};
      state.errorMessage = "";
      return state;
    });
    builder.addCase(fetchUserInfo.rejected, (state, action) => {
      state.errorMessage = action.error.message;
      return state;
    });
  },
});

export const { loggedIn, logout } = authSlice.actions;
export default authSlice.reducer;
