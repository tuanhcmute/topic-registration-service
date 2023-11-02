import axios, { HttpStatusCode } from "axios";
import queryString from "query-string";
import { toast } from "react-toastify";
import { API_BASE_URL, headers as headersConstants } from "../utils/constants";

let store;
export const injectStore = (_store) => {
  store = _store;
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
    // Handle token expired
    if (status === HttpStatusCode.Unauthorized) {
      // originalRequest._retry = true;
      // Dispatch logout => return login
      console.log("Unauthorized");
    }
    // Handle not found
    if (status === HttpStatusCode.NotFound) {
      console.log("Not found");
    }
    // Handle error server
    if (status === HttpStatusCode.InternalServerError) {
      console.log("Internal server error");
    }
    // Handle bad request
    if (status === HttpStatusCode.BadRequest) {
      console.log("Bad request");
    }
    // Handle access is denied
    if (status === HttpStatusCode.Forbidden) {
      console.log("Access is denied");
    }
    return { status, data, statusText };
  }
);

export default axiosClient;
