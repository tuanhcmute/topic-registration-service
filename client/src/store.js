import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import thunk from "redux-thunk";

import authSlice from "./features/auth/authSlice";
import themeSlice from "./features/theme/themeSlice";
import topicSlice from "./features/topic/topicSlice";
import userSlice from "./features/user/userSlice";

const persistConfig = {
  key: "root",
  storage,
};
const rootReducer = combineReducers({
  auth: authSlice,
  theme: themeSlice,
  topic: topicSlice,
  user: userSlice,
});
const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: [thunk],
});
export const persistor = persistStore(store);
