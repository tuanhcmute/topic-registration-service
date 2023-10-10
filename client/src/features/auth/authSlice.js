import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { userService } from "../../services";
import { loadState, saveState } from "../../utils/common/localStorage";
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
    return response;
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState: loadState("auth") || initialState,
  reducers: {
    loggedIn: (state, action) => {
      state = {
        ...state,
        authenticated: true,
        [ACCESS_TOKEN]: action.payload,
      };
      saveState("auth", state);
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
      saveState("auth", state);
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
      saveState("auth", state);
      return state;
    });
    builder.addCase(fetchUserInfo.pending, (state, action) => {
      state.currentUser = {};
      state.errorMessage = "";
      saveState("auth", state);
      return state;
    });
    builder.addCase(fetchUserInfo.rejected, (state, action) => {
      state.errorMessage = action.error.message;
      saveState("auth", state);
      return state;
    });
  },
});

export const { loggedIn, logout } = authSlice.actions;
export default authSlice.reducer;
