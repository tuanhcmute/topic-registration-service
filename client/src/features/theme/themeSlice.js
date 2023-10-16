import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  darkMode: false,
};

export const themeSlice = createSlice({
  name: "theme",
  initialState: initialState,
  reducers: {
    toggleTheme: (state) => {
      state = {
        ...state,
        darkMode: !state.darkMode,
      };
      return state;
    },
  },
});

export const { toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;
