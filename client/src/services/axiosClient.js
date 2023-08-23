import axios from "axios";
import queryString from "query-string";

// Config axiosClient
const axiosClient = axios.create({
  baseURL: "http://localhost:8080/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
  paramsSerializer: (param) => queryString.stringify(param),
});

axiosClient.interceptors.request.use(async (config) => {
  config.headers.Authorization = localStorage.getItem("accessToken");
  return config;
});

export default axiosClient;
