import axios from "axios";
import queryString from "query-string";
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

axiosClient.interceptors.request.use(async (config) => {
  const accessToken = store.getState()?.auth?.accessToken;
  config.headers.Authorization = `Bearer ${accessToken}`;
  return config;
});
axios.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  }
);

export default axiosClient;
