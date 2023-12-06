import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import thunk from "redux-thunk";

import { authReducer } from "./features/auth";
import { themeReducer } from "./features/theme";
import { divisionReducer } from "./features/division";
import { enrollmentPeriodReducer } from "./features/enrollmentPeriod";
import { topicReducer } from "./features/topic";
import { userReducer } from "./features/user";
import { approvalHistoryReducer } from "./features/approvalHistory";
import { topicEnrollmentReducer } from "./features/topicEnrollment";
import { semesterReducer } from "./features/semester";

const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  auth: authReducer,
  theme: themeReducer,
  topic: topicReducer,
  user: userReducer,
  division: divisionReducer,
  enrollmentPeriod: enrollmentPeriodReducer,
  approvalHistory: approvalHistoryReducer,
  topicEnrollment: topicEnrollmentReducer,
  semester: semesterReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: [thunk],
});
export const persistor = persistStore(store);
