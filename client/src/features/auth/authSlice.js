import { createSlice } from "@reduxjs/toolkit";
import { ACCESS_TOKEN } from "../../utils/constants";

const initialState = {
  authenticated: true,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loggedIn: (state, action) => {
      localStorage.setItem(ACCESS_TOKEN, action.payload);
      return {
        ...state,
        authenticated: true,
      };
    },
    logout: (state) => {
      localStorage.removeItem(ACCESS_TOKEN);
      return {
        ...state,
        authenticated: false,
      };
    },
  },
});

export const { loggedIn, logout } = authSlice.actions;
export default authSlice.reducer;
