import { createAsyncThunk } from "@reduxjs/toolkit";
import { HttpStatusCode } from "axios";
import { toast } from "react-toastify";
import { userService } from "../../services";

export const namespace = "user";
export const fetchUserInfo = createAsyncThunk(
  `${namespace}/fetchUserInfo`,
  async (data, { rejectWithValue }) => {
    const response = await userService.fetchUserInfo();
    if (response?.data?.statusCode === HttpStatusCode.Unauthorized) {
      return rejectWithValue(response.data);
    }
    return response.data;
  }
);

export const removeUserInfo = createAsyncThunk(
  `${namespace}/removeUserInfo`,
  async () => {
    return true;
  }
);

export const fetchAllLectures = createAsyncThunk(
  `${namespace}/fetchAllLectures`,
  async (majorCode, { rejectWithValue }) => {
    const response = await userService.fetchAllLectures();
    if (response.data?.statusCode === HttpStatusCode.BadRequest)
      return rejectWithValue(response?.data);
    return response.data;
  }
);

export const fetchStudentsNotEnrolledInTopic = createAsyncThunk(
  `${namespace}/fetchStudentsNotEnrolledInTopic`,
  async (data, { rejectWithValue }) => {
    const response = await userService.fetchStudentsNotEnrolledInTopic();
    if (response.data?.statusCode !== HttpStatusCode.Ok)
      return rejectWithValue(response?.data);
    return response?.data;
  }
);

export const updateBiographyInUserProfile = createAsyncThunk(
  `${namespace}/updateBiographyInUserProfile`,
  async (biography, { rejectWithValue, dispatch }) => {
    const response = await userService.updateBiographyInUserProfile({
      biography,
    });
    if (response.data?.statusCode !== HttpStatusCode.Ok) {
      toast.error("Cập nhật tiểu sử thất bại");
      return rejectWithValue(response?.data);
    }
    dispatch(fetchUserInfo());
    toast.success("Cập nhật tiểu sử thành công");
    return response?.data;
  }
);

export const updateAvatarInUserProfile = createAsyncThunk(
  `${namespace}/updateAvatarInUserProfile`,
  async (file, { rejectWithValue, dispatch }) => {
    console.log(file);
    const response = await userService.updateAvatarInUserProfile(file);
    if (response.data?.statusCode !== HttpStatusCode.Ok) {
      toast.error("Cập nhật ảnh đại diện thất bại");
      return rejectWithValue(response?.data);
    }
    dispatch(fetchUserInfo());
    toast.success("Cập nhật ảnh đại diện thành công");
    return response?.data;
  }
);

export const fetchAllUsers = createAsyncThunk(
  `${namespace}/fetchAllUsers`,
  async ({ pageNumber, itemsPerPage, sortBy }, { rejectWithValue }) => {
    const response = await userService.fetchAllUsers(
      pageNumber,
      itemsPerPage,
      sortBy
    );
    console.log(response);
    if (response.data?.statusCode !== HttpStatusCode.Ok)
      return rejectWithValue(response?.data);
    return response.data;
  }
);

export const createUser = createAsyncThunk(
  `${namespace}/createUser`,
  async ({ data, setOpenAddUserModal }, { rejectWithValue, dispatch }) => {
    const response = await userService.createUser(data);
    if (response.data?.statusCode === HttpStatusCode.Created) {
      dispatch(fetchAllUsers());
      setOpenAddUserModal(undefined);
      toast.success("Thêm mới người dùng thành công");
      return response.data;
    }
    toast.error("Thêm mới người dùng thất bại");
    return rejectWithValue(response?.data);
  }
);
