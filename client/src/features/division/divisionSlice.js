import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { HttpStatusCode } from "axios";
import { divisionService } from "../../services";

const initialState = {
  divisions: [],
  statusCode: null,
  message: "",
  loading: false,
};
const namespace = "division";

export const createDivisionByTopicType = createAsyncThunk(
  `${namespace}/createDivisionByTopicType`,
  async ({ type, data, setOpenModal }, { dispatch, rejectWithValue }) => {
    const response = await divisionService.createDivisionByTopicType(
      type,
      data
    );
    console.log(response);
    if (response?.data?.statusCode === HttpStatusCode.BadRequest)
      return rejectWithValue(response?.data);
    if (response?.data?.statusCode === HttpStatusCode.Ok) {
      dispatch(fetchDivisionByTopicType(type));
      setOpenModal(undefined);
    }
    return response.data;
  }
);

export const fetchDivisionByTopicType = createAsyncThunk(
  `${namespace}/fetchDivisionByTopicType`,
  async (type, { rejectWithValue }) => {
    const response = await divisionService.fetchDivisionByTopicType(type);
    if (response?.data?.statusCode === HttpStatusCode.BadRequest)
      return rejectWithValue(response?.data);
    return response.data;
  }
);

export const divisionSlice = createSlice({
  name: namespace,
  initialState,
  extraReducers: (builder) => {
    // createDivisionByTopicType
    builder.addCase(createDivisionByTopicType.fulfilled, (state, action) => {
      return {
        ...state,
        message: action.payload?.message,
        statusCode: action.payload?.statusCode,
        loading: false,
      };
    });
    builder.addCase(createDivisionByTopicType.pending, (state) => {
      return {
        ...state,
        message: "",
        statusCode: null,
        loading: true,
      };
    });
    builder.addCase(createDivisionByTopicType.rejected, (state, action) => {
      return {
        ...state,
        message: action.payload?.data?.message,
        statusCode: action.payload?.data?.statusCode,
        loading: false,
      };
    });
    // fetchDivisionByTopicType
    builder.addCase(fetchDivisionByTopicType.fulfilled, (state, action) => {
      return {
        ...state,
        divisions: action.payload?.data?.divisions,
        message: action.payload?.message,
        statusCode: action.payload?.statusCode,
        loading: false,
      };
    });
    builder.addCase(fetchDivisionByTopicType.pending, (state) => {
      return {
        ...state,
        message: "",
        divisions: [],
        statusCode: null,
        loading: true,
      };
    });
    builder.addCase(fetchDivisionByTopicType.rejected, (state, action) => {
      return {
        ...state,
        divisions: [],
        message: action.payload?.data?.message,
        statusCode: action.payload?.data?.statusCode,
        loading: false,
      };
    });
  },
});

export default divisionSlice.reducer;
