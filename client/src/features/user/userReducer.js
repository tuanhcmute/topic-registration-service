import { createSlice } from "@reduxjs/toolkit";
import {
  fetchAllUsers,
  fetchAllLectures,
  fetchStudentsNotEnrolledInTopic,
  fetchUserInfo,
  removeUserInfo,
  updateAvatarInUserProfile,
  updateBiographyInUserProfile,
  namespace,
  createUser,
} from "./userAction";

const initialState = {
  pageData: {
    users: [],
    totalPages: 0,
  },
  lectures: [],
  currentUser: {},
  statusCode: null,
  message: "",
  loading: false,
  studentsNotEnrolledInTopic: [],
};

export const userSlice = createSlice({
  name: namespace,
  initialState,
  extraReducers: (builder) => {
    // fetchUserInfo
    builder.addCase(fetchUserInfo.fulfilled, (state, action) => {
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
    // fetchLecturesByMajor
    builder.addCase(fetchAllLectures.fulfilled, (state, action) => {
      return {
        ...state,
        lectures: action.payload?.data?.lectures,
        message: action.payload?.data?.message,
        statusCode: action.payload?.data?.statusCode,
        loading: false,
      };
    });
    builder.addCase(fetchAllLectures.rejected, (state, action) => {
      return {
        ...state,
        lectures: [],
        message: action.payload?.data?.message,
        statusCode: action.payload?.data?.statusCode,
        loading: false,
      };
    });
    builder.addCase(fetchAllLectures.pending, (state) => {
      return {
        ...state,
        lectures: [],
        message: "",
        statusCode: null,
        loading: true,
      };
    });
    // fetchStudentsNotEnrolledInTopic
    builder.addCase(
      fetchStudentsNotEnrolledInTopic.fulfilled,
      (state, action) => {
        const data = action.payload?.data?.students?.map((item) => ({
          value: item?.ntid,
          label: item?.name,
        }));
        return {
          ...state,
          studentsNotEnrolledInTopic: data,
          message: action.payload?.data?.message,
          statusCode: action.payload?.data?.statusCode,
          loading: false,
        };
      }
    );
    builder.addCase(
      fetchStudentsNotEnrolledInTopic.rejected,
      (state, action) => {
        return {
          ...state,
          studentsNotEnrolledInTopic: [],
          message: action.payload?.data?.message,
          statusCode: action.payload?.data?.statusCode,
          loading: false,
        };
      }
    );
    builder.addCase(fetchStudentsNotEnrolledInTopic.pending, (state) => {
      return {
        ...state,
        studentsNotEnrolledInTopic: [],
        message: "",
        statusCode: null,
        loading: true,
      };
    });
    // updateBiographyInUserProfile
    builder.addCase(updateBiographyInUserProfile.fulfilled, (state, action) => {
      return {
        ...state,
        message: action.payload?.data?.message,
        statusCode: action.payload?.data?.statusCode,
        loading: false,
      };
    });
    builder.addCase(updateBiographyInUserProfile.pending, (state) => {
      return {
        ...state,
        loading: true,
        statusCode: null,
        message: "",
      };
    });
    builder.addCase(updateBiographyInUserProfile.rejected, (state, action) => {
      return {
        ...state,
        message: action.payload?.data?.message,
        statusCode: action.payload?.data?.statusCode,
        loading: false,
      };
    });
    //updateAvatarInUserProfile
    builder.addCase(updateAvatarInUserProfile.fulfilled, (state, action) => {
      return {
        ...state,
        message: action.payload?.data?.message,
        statusCode: action.payload?.data?.statusCode,
        loading: false,
      };
    });
    builder.addCase(updateAvatarInUserProfile.pending, (state) => {
      return {
        ...state,
        loading: true,
        statusCode: null,
        message: "",
      };
    });
    builder.addCase(updateAvatarInUserProfile.rejected, (state, action) => {
      return {
        ...state,
        message: action.payload?.data?.message,
        statusCode: action.payload?.data?.statusCode,
        loading: false,
      };
    });
    // fetchAllUsers
    builder.addCase(fetchAllUsers.fulfilled, (state, action) => {
      return {
        ...state,
        pageData: {
          ...state.pageData,
          totalPages: action.payload?.data?.pageData?.totalPages,
          users: action.payload?.data?.pageData?.content,
        },
        message: action.payload?.data?.message,
        statusCode: action.payload?.data?.statusCode,
        loading: false,
      };
    });
    builder.addCase(fetchAllUsers.pending, (state) => {
      return {
        ...state,
        loading: true,
        statusCode: null,
        message: "",
      };
    });
    builder.addCase(fetchAllUsers.rejected, (state, action) => {
      return {
        ...state,
        message: action.payload?.data?.message,
        statusCode: action.payload?.data?.statusCode,
        loading: false,
      };
    });
    // createUser
    builder.addCase(createUser.fulfilled, (state, action) => {
      return {
        ...state,
        message: action.payload?.data?.message,
        statusCode: action.payload?.data?.statusCode,
        loading: false,
      };
    });
    builder.addCase(createUser.pending, (state) => {
      return {
        ...state,
        loading: true,
        statusCode: null,
        message: "",
      };
    });
    builder.addCase(createUser.rejected, (state, action) => {
      return {
        ...state,
        message: action.payload?.data?.message,
        statusCode: action.payload?.data?.statusCode,
        loading: false,
      };
    });
  },
});

export default userSlice.reducer;
