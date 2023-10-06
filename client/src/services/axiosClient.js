import axios from "axios";
import queryString from "query-string";
import { ACCESS_TOKEN } from "../utils/constants";
import { API_BASE_URL, headers as headersConstants } from "../utils/constants";

// Config axiosClient
const axiosClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": headersConstants.APPLICATION_JSON,
  },
  paramsSerializer: (param) => queryString.stringify(param),
});

axiosClient.interceptors.request.use(async (config) => {
  config.headers.Authorization = localStorage.getItem(ACCESS_TOKEN);
  return config;
});

export default axiosClient;
