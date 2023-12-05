import axios, { HttpStatusCode } from "axios";
import queryString from "query-string";
import { toast } from "react-toastify";
import { refreshToken } from "../features/auth";
import {
  ACCESS_TOKEN,
  API_BASE_URL,
  headers as headersConstants,
  REFRESH_TOKEN,
} from "../utils/constants";

let store;
let isRefreshToken = false;
export const injectStore = (_store) => {
  store = _store;
};
export const setRefreshToken = (_isRefreshToken) => {
  isRefreshToken = _isRefreshToken;
};

// Config axiosClient
const axiosClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    [headersConstants.CONTENT_TYPE]: headersConstants.APPLICATION_JSON,
    Accept: headersConstants.APPLICATION_JSON,
  },
  paramsSerializer: (param) => queryString.stringify(param),
});

// axiosRetry(axiosClient, {
//   retries: 1,
//   retryCondition: (error) => {
//     console.log({ error });
//     return error.response.status === HttpStatusCode.Unauthorized;
//   },
// });

// Config Authorization header
axiosClient.interceptors.request.use(async (config) => {
  const accessToken = store.getState()?.auth?.accessToken;
  config.headers.Authorization = `Bearer ${accessToken}`;
  return config;
});

// Config axios response
axiosClient.interceptors.response.use(
  (response) => {
    const { data, status, statusText } = response;
    return { data, status, statusText };
  },
  (error) => {
    if (error.code === "ERR_NETWORK" && !error.response) {
      toast.error("Mạng lỗi, vui lòng thử lại sau...");
      return Promise.reject(error);
    }
    const { status, data, statusText } = error.response;
    const originalConfig = error.config;
    console.log({ originalConfig });
    // Handle token expired
    if (status === HttpStatusCode.Unauthorized) {
      if (!isRefreshToken) {
        setRefreshToken(true);
        store?.dispatch(
          refreshToken({
            [ACCESS_TOKEN]: store.getState()?.auth?.accessToken,
            [REFRESH_TOKEN]: store.getState()?.auth?.refreshToken,
            setRefreshToken,
          })
        );
        return axiosClient(originalConfig);
      }
    }
    // Handle not found
    if (status === HttpStatusCode.NotFound) {
      toast.warn("Không tìm thấy tài nguyên");
    }
    // Handle error server
    if (status === HttpStatusCode.InternalServerError) {
      toast.warn("Đã có lỗi xảy ra");
    }
    // Handle bad request
    if (status === HttpStatusCode.BadRequest) {
      toast.warn("Yêu cầu không hợp lệ");
    }
    // Handle access is denied
    if (status === HttpStatusCode.Forbidden) {
      toast.warn("Không có quyền truy câp");
    }
    return { status, data, statusText };
  }
);

export default axiosClient;
