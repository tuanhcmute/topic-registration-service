import { createAsyncThunk } from "@reduxjs/toolkit";
import { HttpStatusCode } from "axios";
import { toast } from "react-toastify";
import { semesterService } from "../../services";

export const namespace = "semester";

export const fetchAllSemesters = createAsyncThunk(
  `${namespace}/fetchAllSemesters`,
  async (data, { rejectWithValue }) => {
    const response = await semesterService.fetchAllSemesters();
    if (response?.data?.statusCode === HttpStatusCode.Ok) {
      return response?.data;
    }
    return rejectWithValue(response?.data);
  }
);

export const createSemester = createAsyncThunk(
  `${namespace}/createSemester`,
  async ({ data, setOpenModal }, { rejectWithValue, dispatch }) => {
    const response = await semesterService.createSemester(data);
    if (response?.data?.statusCode === HttpStatusCode.Created) {
      toast.success("Thêm học kỳ thành công");
      setOpenModal(undefined);
      dispatch(fetchAllSemesters());
      return response?.data;
    }
    toast.error("Thêm học kỳ thất bại");
    return rejectWithValue(response?.data);
  }
);

export const updateSemester = createAsyncThunk(
  `${namespace}/updateSemester`,
  async ({ id, data, setOpenEditTimeModal }, { rejectWithValue, dispatch }) => {
    const response = await semesterService.updateSemester(id, data);
    if (response?.data?.statusCode === HttpStatusCode.Ok) {
      toast.success("Chỉnh sửa học kỳ thành công");
      setOpenEditTimeModal(undefined);
      dispatch(fetchAllSemesters());
      return response?.data;
    }
    toast.error("Chỉnh sửa học kỳ thất bại");
    return rejectWithValue(response?.data);
  }
);
