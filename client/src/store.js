import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./features/auth/authSlice";
import counterSlice from "./features/counter/counterSlice";

export const store = configureStore({
  reducer: {
    counter: counterSlice,
    auth: authSlice,
  },
});
