import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import userService from "../../services/userService";

export const fetchUserProfile = createAsyncThunk(
  "profile/fetchUserProfile",
  async (thunkAPI) => {
    const response = await userService.fetchUserProfile();
    console.log(response);
    return response;
  }
);

const initialState = {
  info: {},
  loading: "idle",
};

export const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUserProfile.fulfilled, (state, action) => {
      console.log({ state, action });
      state.loading = "fulfilled";
      state.info = {
        ...state.info,
        ...action.payload,
      };
    });
  },
});

export default profileSlice.reducer;
